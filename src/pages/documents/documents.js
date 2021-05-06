var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, style, transition, animate } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, Events } from 'ionic-angular';
import { FilterdocumentsPage } from '../../pages/filterdocuments/filterdocuments';
import { NewdocumentPage } from '../../pages/newdocument/newdocument';
import { ServiceProvider } from '../../providers/service/service';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { DocumentviewPage } from '../../pages/documentview/documentview';
import { StorageProvider } from '../../providers/storage/storage';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate';
/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DocumentsPage = /** @class */ (function () {
    function DocumentsPage(navCtrl, navParams, modalCtrl, popoverCtrl, events, storage, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.storage = storage;
        this.service = service;
        this.currentPage = 1;
        this.pageLimit = 15;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.showSpinner = true;
        this.documents = [];
        this.isOnScroll = false;
        this.isFilterApplied = false;
        events.subscribe('documentsfilter:invoked', function () {
            console.log('documentsfilter:invoked');
            _this.storage.getStorage('appliedDocumentsFilters').then(function (documentfilter) {
                console.log(documentfilter);
                _this.filters = documentfilter;
                _this.clearAndGetDocuments();
            });
        });
    }
    DocumentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DocumentsPage');
    };
    DocumentsPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter DocumentsPage');
        this.clearAndGetDocuments();
        this.service.getFcmToken("Documents");
        this.service.watchFcmNotifications();
    };
    DocumentsPage.prototype.clearAndGetDocuments = function () {
        this.currentPage = 1;
        this.documents = [];
        this.getDocuments();
        this.checkIsFilterApplied();
    };
    DocumentsPage.prototype.checkIsFilterApplied = function () {
        var _this = this;
        this.isFilterApplied = false;
        this.storage.getStorage('appliedDocumentsFilters').then(function (filters) {
            if (filters) {
                _this.isFilterApplied = true;
            }
        });
    };
    DocumentsPage.prototype.resetFilter = function () {
        var _this = this;
        this.storage.removeStorage('appliedDocumentsFilters').then(function (response) {
            _this.filters = "";
            _this.clearAndGetDocuments();
        });
    };
    DocumentsPage.prototype.getDocuments = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.documents(this.currentPage, this.filters).then(function (response) {
                console.log(response);
                _this.documents = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinner = false;
            }).catch(function (error) {
                _this.showSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    DocumentsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.documents(this.currentPage, this.filters).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.documents.push(item);
                    });
                    infiniteScroll.complete();
                }).catch(function (error) {
                    _this.showSpinner = false;
                    console.log(error);
                    infiniteScroll.complete();
                });
            }
        }
        catch (e) {
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    DocumentsPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.currentPage = 0;
        this.clearAndGetDocuments();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    DocumentsPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FilterdocumentsPage, characterNum, opts);
        filtermodal.present();
    };
    DocumentsPage.prototype.createnewDocuments = function () {
        this.navCtrl.push(NewdocumentPage);
    };
    DocumentsPage.prototype.openDocumentsModal = function (pmaId) {
        var opts = {
            cssClass: 'documentViewModal',
        };
        var filtermodal = this.modalCtrl.create(DocumentviewmodalPage, { pmaId: pmaId }, opts);
        filtermodal.present();
    };
    DocumentsPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    DocumentsPage.prototype.editDcoument = function (document) {
        if (document.doc_id != 0) {
            this.navCtrl.push(NewdocumentupdatePage, { documentId: document.doc_id });
        }
    };
    DocumentsPage.prototype.viewDocument = function (document) {
        console.log(document);
        if (document.pma_id != 0) {
            this.openDocumentsModal(document.pma_id);
        }
        else if (document.doc_id != 0) {
            this.navCtrl.push(DocumentviewPage, { documentId: document.doc_id });
        }
    };
    DocumentsPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    DocumentsPage = __decorate([
        Component({
            selector: 'page-documents',
            templateUrl: 'documents.html',
            animations: [
                trigger('enterAnimation', [
                    transition(':enter', [
                        style({ height: 0 }),
                        animate('0.5s', style({ height: 103 }))
                    ]),
                    transition(':leave', [
                        style({ height: 103 }),
                        animate('0.5s', style({ height: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            PopoverController,
            Events,
            StorageProvider,
            ServiceProvider])
    ], DocumentsPage);
    return DocumentsPage;
}());
export { DocumentsPage };
//# sourceMappingURL=documents.js.map