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
import { TabsPage } from '../../pages/tabs/tabs';
import { Validators, FormBuilder } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactusPage = /** @class */ (function () {
    function ContactusPage(navCtrl, formBuilder, service, storage, navParams) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.service = service;
        this.storage = storage;
        this.navParams = navParams;
        this.contactus = this.formBuilder.group({
            subject: ['', Validators.required],
            body: ['', Validators.required]
        });
    }
    ContactusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactusPage');
    };
    ContactusPage.prototype.convertToTicket = function () {
        var _this = this;
        this.service.showload();
        this.service.convertToTicket(this.contactus.value).then(function (response) {
            console.log(JSON.stringify(response));
            _this.service.loading.dismiss();
            _this.back();
        }).catch(function (e) {
            console.log(e);
            console.log(JSON.stringify(e));
            _this.service.loading.dismiss();
            _this.service.toast(e.error.message, 3000, 'middle');
        });
    };
    ContactusPage.prototype.back = function () {
        this.navCtrl.push(TabsPage);
    };
    ContactusPage = __decorate([
        Component({
            selector: 'page-contactus',
            templateUrl: 'contactus.html',
        }),
        __metadata("design:paramtypes", [NavController,
            FormBuilder,
            ServiceProvider,
            StorageProvider,
            NavParams])
    ], ContactusPage);
    return ContactusPage;
}());
export { ContactusPage };
//# sourceMappingURL=contactus.js.map