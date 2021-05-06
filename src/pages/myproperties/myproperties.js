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
import { FilterpropertiesPage } from '../../pages/filterproperties/filterproperties';
import { ServiceProvider } from '../../providers/service/service';
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the MypropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MypropertiesPage = /** @class */ (function () {
    function MypropertiesPage(navCtrl, navParams, modalCtrl, popoverCtrl, events, storage, service) {
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
        this.properties = [];
        this.isOnScroll = false;
        this.showBottomInfo = false;
        this.show = false;
        this.text = 'More Info';
        this.filters = "";
        this.isFilterApplied = false;
        events.subscribe('propertiesfilter:invoked', function () {
            console.log('propertiesfilter:invoked');
            _this.storage.getStorage('appliedPropertyFilters').then(function (propertyfilter) {
                console.log(propertyfilter);
                _this.filters = propertyfilter;
                _this.clearAndGetProperties();
            });
        });
    }
    MypropertiesPage.prototype.changeText = function () {
        if (this.text === 'More Info') {
            this.text = 'Less Info';
        }
        else {
            this.text = 'More Info';
        }
    };
    MypropertiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MypropertiesPage');
    };
    MypropertiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter MypropertiesPage');
        this.storage.getStorage('appliedPropertyFilters').then(function (propertyfilter) {
            _this.filters = propertyfilter;
            _this.clearAndGetProperties();
            _this.service.getFcmToken("Properties");
            _this.service.watchFcmNotifications();
        });
    };
    MypropertiesPage.prototype.clearAndGetProperties = function () {
        this.currentPage = 1;
        this.properties = [];
        this.getProperties();
        this.checkIsFilterApplied();
    };
    MypropertiesPage.prototype.checkIsFilterApplied = function () {
        var _this = this;
        this.isFilterApplied = false;
        this.storage.getStorage('appliedPropertyFilters').then(function (filters) {
            if (filters) {
                _this.isFilterApplied = true;
            }
        });
    };
    MypropertiesPage.prototype.resetFilter = function () {
        var _this = this;
        this.storage.removeStorage('appliedPropertyFilters').then(function (response) {
            _this.filters = "";
            _this.clearAndGetProperties();
        });
    };
    MypropertiesPage.prototype.getProperties = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.properties(this.currentPage, this.filters).then(function (response) {
                console.log(response);
                _this.properties = response.data;
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
    MypropertiesPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.properties(this.currentPage, this.filters).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.properties.push(item);
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
    MypropertiesPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.currentPage = 0;
        this.clearAndGetProperties();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    MypropertiesPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FilterpropertiesPage, characterNum, opts);
        filtermodal.present();
    };
    MypropertiesPage.prototype.createnewProperties = function () {
        this.navCtrl.push(NewpropertiesPage, { propertyId: 0 });
    };
    MypropertiesPage.prototype.viewProperties = function (property) {
        this.navCtrl.push(PropertyviewPage, { propertyId: property.id });
    };
    MypropertiesPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    MypropertiesPage.prototype.editProperty = function (property) {
        this.navCtrl.push(NewpropertiesPage, { propertyId: property.id });
    };
    MypropertiesPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    MypropertiesPage = __decorate([
        Component({
            selector: 'page-myproperties',
            templateUrl: 'myproperties.html',
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
    ], MypropertiesPage);
    return MypropertiesPage;
}());
export { MypropertiesPage };
//# sourceMappingURL=myproperties.js.map