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
 * Generated class for the FilterdocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilterdocumentsPage = /** @class */ (function () {
    function FilterdocumentsPage(navCtrl, navParams, service, storage, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.showSpinner = false;
        this.filterOptions = "";
        this.selectedFilters = { property_id: [], name: [], created_at: "", created_by: [], updated_by: [], updated_at: '' };
        this.resetFilters = { property_id: [], name: [], created_at: "", created_by: [], updated_by: [], updated_at: '' };
    }
    FilterdocumentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterdocumentsPage');
    };
    FilterdocumentsPage.prototype.openCalendar = function () {
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
    FilterdocumentsPage.prototype.openCalendarUpdated = function () {
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
    FilterdocumentsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter FilterpropertiesPage');
        return this.storage.getStorage('appliedDocumentsFilters').then(function (appliedEmailFilters) {
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
    FilterdocumentsPage.prototype.getFilterOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.documentFilterOptions().then(function (response) {
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
    FilterdocumentsPage.prototype.applyFilter = function () {
        var _this = this;
        console.log(this.selectedFilters);
        this.storage.setStorage('appliedDocumentsFilters', this.selectedFilters).then(function (response) {
            _this.events.publish('documentsfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FilterdocumentsPage.prototype.clearFilter = function () {
        this.storage.removeStorage('appliedDocumentsFilters');
        this.selectedFilters = this.resetFilters;
    };
    FilterdocumentsPage.prototype.goBack = function () {
        var _this = this;
        this.storage.removeStorage('appliedDocumentsFilters').then(function (res) {
            _this.events.publish('documentsfilter:invoked');
            _this.navCtrl.pop();
        });
    };
    FilterdocumentsPage = __decorate([
        Component({
            selector: 'page-filterdocuments',
            templateUrl: 'filterdocuments.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ServiceProvider,
            StorageProvider,
            ModalController,
            Events])
    ], FilterdocumentsPage);
    return FilterdocumentsPage;
}());
export { FilterdocumentsPage };
//# sourceMappingURL=filterdocuments.js.map