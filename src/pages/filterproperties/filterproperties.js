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
 * Generated class for the FilterpropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilterpropertiesPage = /** @class */ (function () {
    function FilterpropertiesPage(navCtrl, navParams, service, storage, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.showSpinner = false;
        this.filterOptions = "";
        this.selectedFilters = { address: "", property_type: [], year: "", sqft: "", beds: "", baths: "", garage: "", created_at: "", updated_by: [], updated_at: '' };
        this.resetFilters = { address: "", property_type: [], year: "", sqft: "", beds: "", baths: "", garage: "", created_at: "", updated_by: [], updated_at: '' };
    }
    FilterpropertiesPage.prototype.openCalendar = function () {
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
                _this.selectedFilters.created_at = start_date[1] + "/" + start_date[2] + "/" + start_date[0] + "-" + end_date[1] + "/" + end_date[2] + "/" + end_date[0];
            }
        });
    };
    FilterpropertiesPage.prototype.openCalendarUpdated = function () {
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
    FilterpropertiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterpropertiesPage');
    };
    FilterpropertiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter FilterpropertiesPage');
        return this.storage.getStorage('appliedPropertyFilters').then(function (appliedEmailFilters) {
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
                    _this.getFilterOptions();
                    _this.service.getFcmToken("Property Filter");
                    _this.service.watchFcmNotifications();
                }
            });
        });
    };
    FilterpropertiesPage.prototype.getFilterOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.propertyFilterOptions().then(function (response) {
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
    FilterpropertiesPage.prototype.applyFilter = function () {
        var _this = this;
        console.log(this.selectedFilters);
        this.storage.setStorage('appliedPropertyFilters', this.selectedFilters).then(function (response) {
            _this.events.publish('propertiesfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FilterpropertiesPage.prototype.clearFilter = function () {
        this.storage.removeStorage('appliedPropertyFilters');
        this.selectedFilters = this.resetFilters;
    };
    FilterpropertiesPage.prototype.goBack = function () {
        var _this = this;
        this.storage.removeStorage('appliedPropertyFilters').then(function (res) {
            _this.events.publish('propertiesfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FilterpropertiesPage = __decorate([
        Component({
            selector: 'page-filterproperties',
            templateUrl: 'filterproperties.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            StorageProvider,
            ModalController,
            Events])
    ], FilterpropertiesPage);
    return FilterpropertiesPage;
}());
export { FilterpropertiesPage };
//# sourceMappingURL=filterproperties.js.map