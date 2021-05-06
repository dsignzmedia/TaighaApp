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
import { SignupPage } from '../../pages/signup/signup';
import { Validators, FormBuilder } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { SigninPage } from '../../pages/signin/signin';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgetPasswordPage = /** @class */ (function () {
    function ForgetPasswordPage(navCtrl, navParams, service, formBuilder, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.resetsent = false;
        this.success = false;
        this.message = false;
        this.login = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.doReset = function () {
        var _this = this;
        //this.navCtrl.push(TabsPage);   
        //this.service.loading.present();
        //console.log(JSON.stringify(this.login.value));
        this.service.showload();
        this.resetsent = false;
        this.service.resetPassword(this.login.value).then(function (response) {
            //console.log(JSON.stringify(response));
            _this.resetsent = true;
            _this.message = response.message;
            if (response.error == 1) {
                _this.success = false;
            }
            else {
                _this.success = true;
            }
            _this.service.loading.dismiss();
        }).catch(function (e) {
            //console.log(e);
            //console.log(JSON.stringify(e));
            _this.resetsent = false;
            _this.service.loading.dismiss();
            _this.service.toast(e.error.message, 3000, 'middle');
        });
    };
    ForgetPasswordPage.prototype.signIn = function () {
        this.navCtrl.push(SigninPage);
    };
    ForgetPasswordPage.prototype.signUp = function () {
        this.navCtrl.push(SignupPage);
    };
    ForgetPasswordPage = __decorate([
        Component({
            selector: 'page-forget-password',
            templateUrl: 'forget-password.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            FormBuilder,
            StorageProvider])
    ], ForgetPasswordPage);
    return ForgetPasswordPage;
}());
export { ForgetPasswordPage };
//# sourceMappingURL=forget-password.js.map