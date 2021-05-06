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
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the DocumentviewmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DocumentviewmodalPage = /** @class */ (function () {
    function DocumentviewmodalPage(navCtrl, service, storage, navParams) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.storage = storage;
        this.navParams = navParams;
        this.showSpinner = false;
        this.documentData = "";
        this.pmaId = 0;
        this.pmaId = this.navParams.get('pmaId');
    }
    DocumentviewmodalPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewDidLoad DocumentviewmodalPage');
        this.clearAndGetPma();
    };
    DocumentviewmodalPage.prototype.clearAndGetPma = function () {
        this.documentData = "";
        this.getPma();
    };
    DocumentviewmodalPage.prototype.getPma = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.pma(this.pmaId).then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                _this.documentData = response.data;
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
    DocumentviewmodalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DocumentviewmodalPage');
    };
    DocumentviewmodalPage.prototype.viewProperties = function (propertyId) {
        this.navCtrl.push(PropertyviewPage, { propertyId: propertyId });
    };
    DocumentviewmodalPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DocumentviewmodalPage = __decorate([
        Component({
            selector: 'page-documentviewmodal',
            templateUrl: 'documentviewmodal.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            StorageProvider,
            NavParams])
    ], DocumentviewmodalPage);
    return DocumentviewmodalPage;
}());
export { DocumentviewmodalPage };
//# sourceMappingURL=documentviewmodal.js.map