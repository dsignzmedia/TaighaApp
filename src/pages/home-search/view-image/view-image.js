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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ServiceProvider } from '../../../providers/service/service';
/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewImagePage = /** @class */ (function () {
    function ViewImagePage(navCtrl, navParams, modalCtrl, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.propertyshowSpinner = false;
        this.propertyImage = [];
        this.propertyId = this.navParams.get('propertyId');
        console.log(this.propertyId);
        this.propertyshowSpinner = true;
        this.getProperty();
    }
    ViewImagePage.prototype.getProperty = function () {
        var _this = this;
        try {
            this.service.singleproperty(this.propertyId).then(function (response) {
                console.log(response);
                _this.propertyImage = response.data.rmls_property_images;
                _this.propertyshowSpinner = false;
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    ViewImagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewImagePage');
    };
    ViewImagePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ViewImagePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-view-image',
            templateUrl: 'view-image.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ModalController,
            ServiceProvider])
    ], ViewImagePage);
    return ViewImagePage;
}());
export { ViewImagePage };
//# sourceMappingURL=view-image.js.map