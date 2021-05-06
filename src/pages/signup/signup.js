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
import { Validators, FormBuilder } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../../pages/tabs/tabs';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, service, formBuilder, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.timeframe = [];
        this.source = [];
        this.interested_in = [];
        this.showSpinner = false;
        this.additional_comments = false;
        this.referred_person = false;
        this.errors = [];
        this.errors = [];
        this.login = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone_number: ['', Validators.compose([Validators.required, Validators.minLength(13)])],
            password: ['', Validators.required],
            interested_in: ['', Validators.required],
            timeframe: [''],
            source: [''],
            comments: [''],
            signup_referred_person: [''],
        });
    }
    SignupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter FiltermailsPage');
        try {
            this.showSpinner = true;
            this.service.tsi().then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                _this.timeframe = response.data.timeframe;
                _this.source = response.data.sources;
                _this.interested_in = response.data.interested_in;
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
    SignupPage.prototype.toggleRefer = function () {
        if (this.login.value['source'] == "Referral") {
            this.referred_person = true;
        }
        else {
            this.referred_person = false;
        }
    };
    SignupPage.prototype.doSignUp = function () {
        var _this = this;
        console.log(JSON.stringify(this.login.value));
        this.errors = [];
        this.service.showload();
        this.service.signup(this.login.value).then(function (response) {
            console.log(JSON.stringify(response));
            _this.service.loading.dismiss();
            _this.storage.setStorage('auth_user_tokens', response).then(function (result) {
                console.log("auth_user_tokens", response);
                //this.service.loading.dismiss();
                _this.navCtrl.push(TabsPage);
            });
        }).catch(function (e) {
            console.log(e);
            //console.log(JSON.stringify(e));
            _this.service.loading.dismiss();
            //console.log(e.error.errors);
            for (var key in e.error.errors) {
                var error = e.error.errors[key];
                error.forEach(function (message) {
                    _this.errors.push(message);
                });
            }
            console.log(_this.errors);
            _this.service.clearAuthDatas();
        });
    };
    SignupPage.prototype.toggleComment = function () {
        this.additional_comments = (this.additional_comments) ? false : true;
        console.log(this.additional_comments);
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signIn = function () {
        this.navCtrl.push(SigninPage);
    };
    SignupPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            FormBuilder,
            StorageProvider])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map