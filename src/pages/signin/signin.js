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
import { TabsPage } from '../../pages/tabs/tabs';
import { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
import { StartNowPage } from '../home-search/start-now/start-now';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SigninPage = /** @class */ (function () {
    function SigninPage(navCtrl, navParams, service, formBuilder, fb, googlePlus, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.formBuilder = formBuilder;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.storage = storage;
        this.passwordType = 'password';
        this.passwordText = 'Show Password';
        this.login = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });
    }
    SigninPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SigninPage');
    };
    SigninPage.prototype.signUp = function () {
        this.navCtrl.push(SignupPage);
    };
    SigninPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordText = this.passwordText === 'Show Password' ? 'Hide Password' : 'Show Password';
    };
    SigninPage.prototype.forgetpassword = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    SigninPage.prototype.goToStartnow = function () {
        this.navCtrl.push(StartNowPage);
    };
    SigninPage.prototype.doLogin = function () {
        var _this = this;
        //this.navCtrl.push(TabsPage);   
        //this.service.loading.present();
        console.log(JSON.stringify(this.login.value));
        this.service.showload();
        this.service.login(this.login.value).then(function (response) {
            console.log(JSON.stringify(response));
            _this.storage.setStorage('auth_user_tokens', response).then(function (result) {
                console.log("auth_user_tokens", response);
                _this.navCtrl.push(TabsPage);
                _this.service.loading.dismiss();
            });
        }).catch(function (e) {
            console.log(e);
            console.log(JSON.stringify(e));
            _this.service.loading.dismiss();
            _this.service.toast(e.error.message, 3000, 'middle');
            _this.service.clearAuthDatas();
        });
    };
    SigninPage.prototype.fbLogin = function () {
        var fbthis = this;
        var params = new Array();
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            console.log(JSON.stringify(res));
            fbthis.fb.api("/me?fields=name,email", params)
                .then(function (user) {
                var passData = { email: user.email, id: user.id, name: user.name };
                console.log(JSON.stringify(user));
                console.log(user.email);
                fbthis.service.showload();
                fbthis.service.facebookLogin(passData).then(function (response) {
                    /*console.log(response);*/
                    fbthis.storage.setStorage('auth_user_tokens', response).then(function (result) {
                        console.log("auth_user_tokens", response);
                        fbthis.navCtrl.push(TabsPage);
                        fbthis.service.loading.dismiss();
                    });
                    //this.service.loading.dismiss();
                }).catch(function (error) {
                    /*console.log(JSON.stringify(error));*/
                    try {
                        fbthis.service.toast(error.error.message, 3000, 'middle');
                        fbthis.service.clearAuthDatas();
                        fbthis.service.loading.dismiss();
                    }
                    catch (e) {
                        fbthis.service.loading.dismiss();
                        fbthis.service.toast("Your facebook account does not exist. Please sign up", 3000, 'middle');
                    }
                });
            }).catch(function (error) {
                fbthis.service.toast("Your facebook account does not exist. Please sign up", 3000, 'bottom');
            });
        }).catch(function (e) {
            fbthis.service.serverError();
        });
    };
    SigninPage.prototype.googlePlusLogin = function () {
        var gplus = this;
        var params = new Array();
        this.googlePlus.login({
            // necessary for iOS 9+
            'webClientId': "776010082610-vl3l775hgcuhtkvc0ie35skhfi6gog7s.apps.googleusercontent.com"
        })
            .then(function (res) {
            var passData = { email: res.email, id: res.userId, name: res.displayName };
            console.log(JSON.stringify(res));
            gplus.service.showload();
            gplus.service.GPlusLogin(passData).then(function (response) {
                /*console.log(response);*/
                gplus.storage.setStorage('auth_user_tokens', response).then(function (result) {
                    console.log("auth_user_tokens", response);
                    gplus.navCtrl.push(TabsPage);
                    gplus.service.loading.dismiss();
                });
                //this.service.loading.dismiss();
            }).catch(function (error) {
                /*console.log(JSON.stringify(error));*/
                try {
                    gplus.service.toast(error.error.message, 3000, 'middle');
                    gplus.service.clearAuthDatas();
                    gplus.service.loading.dismiss();
                }
                catch (e) {
                    gplus.service.loading.dismiss();
                    gplus.service.toast("Your facebook account does not exist. Please sign up", 3000, 'middle');
                }
            });
        })
            .catch(function (err) {
            console.error(JSON.stringify(err));
            gplus.service.toast(JSON.stringify(err), 3000, 'middle');
        });
    };
    SigninPage = __decorate([
        Component({
            selector: 'page-signin',
            templateUrl: 'signin.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            FormBuilder,
            Facebook,
            GooglePlus,
            StorageProvider])
    ], SigninPage);
    return SigninPage;
}());
export { SigninPage };
//# sourceMappingURL=signin.js.map