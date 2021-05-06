var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, Events, Platform, Content } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FilteractivitiesPage } from '../../pages/filteractivities/filteractivities';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewPage } from '../../pages/documentview/documentview';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActivitiesPage = /** @class */ (function () {
    function ActivitiesPage(navCtrl, navParams, modalCtrl, service, popoverCtrl, events, platform, fcm, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.platform = platform;
        this.fcm = fcm;
        this.storage = storage;
        this.hidemeNotified = false;
        this.currentPage = 1;
        this.pageLimit = 15;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.showSpinner = true;
        this.activities = [];
        this.isOnScroll = false;
        this.filters = "";
        this.isFilterApplied = false;
        this.shownGroup = null;
        events.subscribe('activitiesfilter:invoked', function () {
            console.log('activitiesfilter:invoked');
            _this.storage.getStorage('appliedActivityFilters').then(function (filters) {
                console.log(filters);
                _this.filters = filters;
                _this.clearAndGetActivities();
            });
        });
        events.subscribe('activitiesfilter:revoked', function () {
            console.log('activitiesfilter:revoked');
            _this.filters = "";
            _this.clearAndGetActivities();
        });
    }
    ActivitiesPage.prototype.hideNotified = function () {
        this.hidemeNotified = !this.hidemeNotified;
    };
    ActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    ActivitiesPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FilteractivitiesPage, characterNum, opts);
        filtermodal.present();
    };
    ActivitiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter MypropertiesPage');
        this.storage.getStorage('appliedActivityFilters').then(function (filters) {
            if (filters) {
                _this.filters = filters;
            }
            _this.clearAndGetActivities();
            _this.service.getFcmToken("Activities");
            _this.service.watchFcmNotifications();
        });
    };
    ActivitiesPage.prototype.checkIsFilterApplied = function () {
        var _this = this;
        this.isFilterApplied = false;
        this.storage.getStorage('appliedActivityFilters').then(function (filters) {
            console.log("ticketfilter", filters);
            if (filters) {
                _this.isFilterApplied = true;
            }
        });
    };
    ActivitiesPage.prototype.clearAndGetActivities = function () {
        this.currentPage = 1;
        this.activities = [];
        this.getActivities();
        this.checkIsFilterApplied();
    };
    ActivitiesPage.prototype.resetFilter = function () {
        var _this = this;
        this.storage.removeStorage('appliedActivityFilters').then(function (response) {
            _this.filters = "";
            _this.clearAndGetActivities();
        });
    };
    ActivitiesPage.prototype.getActivities = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.activities(this.currentPage, this.filters).then(function (response) {
                console.log(response);
                _this.activities = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinner = false;
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
    ActivitiesPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.activities(this.currentPage, this.filters).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.activities.push(item);
                    });
                    infiniteScroll.complete();
                }).catch(function (error) {
                    _this.showSpinner = false;
                    console.log(error);
                    infiniteScroll.complete();
                });
            }
        }
        catch (e) {
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    ActivitiesPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.currentPage = 0;
        this.clearAndGetActivities();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    ActivitiesPage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity) {
            if (activity.sub_activity_checked) {
                activity.sub_activity_checked = false;
            }
            else {
                activity.sub_activity_checked = true;
            }
        }
    };
    ActivitiesPage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    ActivitiesPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    ActivitiesPage.prototype.scrollTo = function (element) {
        var elem = document.getElementById(element);
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var top = box.top + scrollTop - clientTop;
        var cDim = this.content.getContentDimensions();
        var scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;
        this.content.scrollTo(0, scrollOffset, 1000);
        console.log(element);
    };
    ActivitiesPage.prototype.goToCorrespondActivity = function (activity) {
        switch (activity.eloquent) {
            case "ticket":
                this.navCtrl.push(TicketviewPage, { ticketId: activity.eloquent_id });
                break;
            case "mail":
                this.navCtrl.push(MailviewPage, { emailId: activity.eloquent_id });
                break;
            case "document":
                this.navCtrl.push(DocumentviewPage, { documentId: activity.eloquent_id });
                break;
            case "property":
                this.navCtrl.push(PropertyviewPage, { propertyId: activity.eloquent_id });
                break;
            default:
                // code...
                break;
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ActivitiesPage.prototype, "content", void 0);
    ActivitiesPage = __decorate([
        Component({
            selector: 'page-activities',
            templateUrl: 'activities.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            ServiceProvider,
            PopoverController,
            Events,
            Platform,
            FCM,
            StorageProvider])
    ], ActivitiesPage);
    return ActivitiesPage;
}());
export { ActivitiesPage };
//# sourceMappingURL=activities.js.map