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
import { SigninPage } from '../../pages/signin/signin';
import { ProfilePage } from '../../pages/profile/profile';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the PopoverpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopoverpagePage = /** @class */ (function () {
    function PopoverpagePage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
    }
    PopoverpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverpagePage');
    };
    PopoverpagePage.prototype.goToProfile = function () {
        this.navCtrl.push(ProfilePage);
    };
    PopoverpagePage.prototype.goToLogout = function () {
        this.service.clearAuthDatas();
        this.navCtrl.push(SigninPage);
    };
    PopoverpagePage = __decorate([
        Component({
            selector: 'page-popoverpage',
            templateUrl: 'popoverpage.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider])
    ], PopoverpagePage);
    return PopoverpagePage;
}());
export { PopoverpagePage };
//# sourceMappingURL=popoverpage.js.map