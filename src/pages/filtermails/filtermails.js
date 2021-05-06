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
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { CalendarModal } from "ion2-calendar";
/**
 * Generated class for the FiltermailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiltermailsPage = /** @class */ (function () {
    function FiltermailsPage(navCtrl, navParams, service, storage, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.showSpinner = false;
        this.filterOptions = "";
        this.selectedFilters = { subject: "", group: [], staffs: [], status: [], priorities: [], updated_by: [], updated_at: '' };
        this.resetFilters = { subject: "", group: [], staffs: [], status: [], priorities: [], updated_by: [], updated_at: '' };
    }
    FiltermailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FiltermailsPage');
    };
    FiltermailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter FiltermailsPage');
        return this.storage.getStorage('appliedEmailFilters').then(function (appliedEmailFilters) {
            console.log(appliedEmailFilters);
            if (appliedEmailFilters) {
                _this.selectedFilters = appliedEmailFilters;
            }
            _this.storage.getStorage('activitycalanderapplied').then(function (appliedcalender) {
                console.log(appliedcalender);
                if (appliedcalender) {
                    _this.selectedFilters = appliedcalender;
                    _this.storage.removeStorage('activitycalanderapplied');
                }
                else {
                    _this.getEmailFilterOptions();
                    _this.service.getFcmToken("Email Filter");
                    _this.service.watchFcmNotifications();
                }
            });
        });
    };
    FiltermailsPage.prototype.getEmailFilterOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.emailFilterOptions().then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                _this.filterOptions = response.data;
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
    FiltermailsPage.prototype.openCalendar = function () {
        var _this = this;
        var options = {
            pickMode: 'range',
            title: 'RANGE',
            format: 'MM/DD/YYYY',
            canBackwardsSelected: true
        };
        var myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options
        });
        this.storage.setStorage('activitycalanderapplied', this.selectedFilters);
        myCalendar.present();
        myCalendar.onDidDismiss(function (date, type) {
            console.log(date);
            if (date) {
                var start_date = date.from['string'].split('-');
                var end_date = date.to['string'].split('-');
                console.log(start_date);
                console.log(end_date);
                _this.selectedFilters.updated_at = start_date[1] + "/" + start_date[2] + "/" + start_date[0] + "-" + end_date[1] + "/" + end_date[2] + "/" + end_date[0];
            }
        });
    };
    FiltermailsPage.prototype.applyFilter = function () {
        var _this = this;
        console.log(this.selectedFilters);
        this.storage.setStorage('appliedEmailFilters', this.selectedFilters).then(function (response) {
            _this.events.publish('emailsfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FiltermailsPage.prototype.clearFilter = function () {
        this.storage.removeStorage('appliedEmailFilters');
        this.selectedFilters = this.resetFilters;
    };
    FiltermailsPage.prototype.goBack = function () {
        var _this = this;
        this.storage.removeStorage('appliedEmailFilters').then(function (res) {
            _this.events.publish('emailsfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FiltermailsPage = __decorate([
        Component({
            selector: 'page-filtermails',
            templateUrl: 'filtermails.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            StorageProvider,
            ModalController,
            Events])
    ], FiltermailsPage);
    return FiltermailsPage;
}());
export { FiltermailsPage };
//# sourceMappingURL=filtermails.js.map