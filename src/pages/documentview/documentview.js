var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { DocumentsPage } from '../../pages/documents/documents';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate';
/**
 * Generated class for the DocumentviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DocumentviewPage = /** @class */ (function () {
    function DocumentviewPage(navCtrl, service, storage, navParams) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.storage = storage;
        this.navParams = navParams;
        this.showSpinner = false;
        this.document = "";
        this.documentId = 0;
        this.documentId = this.navParams.get('documentId');
    }
    DocumentviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewDidLoad DocumentviewPage');
        this.clearAndGetDocument();
        this.service.getFcmToken("Document View : " + this.documentId);
        this.service.watchFcmNotifications();
    };
    DocumentviewPage.prototype.clearAndGetDocument = function () {
        this.document = "";
        this.getDocument();
    };
    DocumentviewPage.prototype.getDocument = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.document(this.documentId).then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                _this.document = response.data.document;
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
    DocumentviewPage.prototype.goToDocument = function () {
        this.navCtrl.push(DocumentsPage);
    };
    DocumentviewPage.prototype.editDcoument = function (document) {
        this.navCtrl.push(NewdocumentupdatePage, { documentId: document.id });
    };
    DocumentviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DocumentviewPage');
    };
    DocumentviewPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentviewPage = __decorate([
        Component({
            selector: 'page-documentview',
            templateUrl: 'documentview.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            StorageProvider,
            NavParams])
    ], DocumentviewPage);
    return DocumentviewPage;
}());
export { DocumentviewPage };
//# sourceMappingURL=documentview.js.map