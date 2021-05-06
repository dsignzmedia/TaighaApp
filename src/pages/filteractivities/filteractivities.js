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
 * Generated class for the FilteractivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilteractivitiesPage = /** @class */ (function () {
    function FilteractivitiesPage(navCtrl, modalCtrl, navParams, service, storage, events) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.service = service;
        this.storage = storage;
        this.events = events;
        this.showSpinner = false;
        this.filterOptions = "";
        this.selectedFilters = { categories: [], range: "" };
        this.resetFilters = { categories: [], range: "" };
        this.testString = 1;
    }
    FilteractivitiesPage.prototype.openCalendar = function () {
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
                _this.selectedFilters.range = start_date[1] + "/" + start_date[2] + "/" + start_date[0] + "-" + end_date[1] + "/" + end_date[2] + "/" + end_date[0];
            }
        });
    };
    FilteractivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilteractivitiesPage');
    };
    FilteractivitiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter FilteractivitiesPage');
        return this.storage.getStorage('appliedActivityFilters').then(function (appliedFilters) {
            //console.log(appliedTicketFilters);
            if (appliedFilters) {
                _this.selectedFilters = appliedFilters;
            }
            _this.storage.getStorage('activitycalanderapplied').then(function (appliedcalender) {
                console.log(appliedcalender);
                if (appliedcalender) {
                    _this.selectedFilters = appliedcalender;
                    _this.storage.removeStorage('activitycalanderapplied');
                }
                else {
                    _this.getActivityFilterOptions();
                    console.log(_this.testString);
                    _this.service.getFcmToken("Activity Filter");
                    _this.service.watchFcmNotifications();
                }
            });
        });
    };
    FilteractivitiesPage.prototype.getActivityFilterOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.activityFilterOptions().then(function (response) {
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
    FilteractivitiesPage.prototype.applyFilter = function () {
        var _this = this;
        console.log(this.selectedFilters);
        this.storage.setStorage('appliedActivityFilters', this.selectedFilters).then(function (response) {
            _this.events.publish('activitiesfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FilteractivitiesPage.prototype.clearFilter = function () {
        this.storage.removeStorage('appliedActivityFilters');
        this.selectedFilters = this.resetFilters;
    };
    FilteractivitiesPage.prototype.goBack = function () {
        var _this = this;
        this.storage.removeStorage('activitycalanderapplied');
        this.storage.removeStorage('appliedActivityFilters').then(function (res) {
            _this.events.publish('activitiesfilter:revoked');
            _this.navCtrl.pop();
        });
    };
    FilteractivitiesPage = __decorate([
        Component({
            selector: 'page-filteractivities',
            templateUrl: 'filteractivities.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams,
            ServiceProvider,
            StorageProvider,
            Events])
    ], FilteractivitiesPage);
    return FilteractivitiesPage;
}());
export { FilteractivitiesPage };
//# sourceMappingURL=filteractivities.js.map