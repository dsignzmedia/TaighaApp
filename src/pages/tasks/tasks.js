var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, style, transition, animate } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, Events, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FilteractivitiesPage } from '../../pages/filteractivities/filteractivities';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TasksPage = /** @class */ (function () {
    function TasksPage(navCtrl, navParams, modalCtrl, service, popoverCtrl, events, platform, fcm, storage) {
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
        this.filterstatus = 'not_completed';
        this.currentPage = 1;
        this.pageLimit = 15;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.showSpinner = true;
        this.tasks = [];
        this.isOnScroll = false;
        this.filters = "";
        this.isFilterApplied = false;
        this.shownGroup = null;
        events.subscribe('tasksfilter:invoked', function () {
            console.log('tasksfilter:invoked');
            _this.storage.getStorage('appliedTasksFilters').then(function (filters) {
                console.log(filters);
                _this.filters = filters;
                _this.clearAndGetTasks();
            });
        });
        events.subscribe('tasksfilter:revoked', function () {
            console.log('tasksfilter:revoked');
            _this.filters = "";
            _this.clearAndGetTasks();
        });
    }
    TasksPage.prototype.hideNotified = function () {
        this.hidemeNotified = !this.hidemeNotified;
    };
    TasksPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    TasksPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FilteractivitiesPage, characterNum, opts);
        filtermodal.present();
    };
    TasksPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter MypropertiesPage');
        this.storage.getStorage('appliedTasksFilters').then(function (filters) {
            if (filters) {
                _this.filters = filters;
            }
            _this.clearAndGetTasks();
            _this.service.getFcmToken("Tasks");
            _this.service.watchFcmNotifications();
        });
    };
    TasksPage.prototype.clearAndGetTasks = function () {
        this.currentPage = 1;
        this.tasks = [];
        this.getTasks();
    };
    TasksPage.prototype.getTasks = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.tasks(this.currentPage, this.filters, this.filterstatus).then(function (response) {
                console.log(response);
                console.log(response.data);
                _this.tasks = response.data;
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
    TasksPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.tasks(this.currentPage, this.filters, this.filterstatus).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.tasks.push(item);
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
    TasksPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.currentPage = 0;
        this.clearAndGetTasks();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    TasksPage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity_checked) {
            activity.sub_activity_checked = false;
        }
        else {
            activity.sub_activity_checked = true;
        }
    };
    TasksPage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    TasksPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    TasksPage.prototype.goToCorrespondActivity = function (task) {
        switch (task.checklist_type) {
            case "ticket":
                this.navCtrl.push(TicketviewPage, { ticketId: task.ticket_id });
                break;
            case "property":
                this.navCtrl.push(PropertyviewPage, { propertyId: task.property_id });
                break;
            default:
                // code...
                break;
        }
    };
    TasksPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    TasksPage = __decorate([
        Component({
            selector: 'page-tasks',
            templateUrl: 'tasks.html',
            animations: [
                trigger('enterAnimation', [
                    transition(':enter', [
                        style({ height: 0 }),
                        animate('0.5s', style({ height: 147 }))
                    ]),
                    transition(':leave', [
                        style({ height: 147 }),
                        animate('0.5s', style({ height: 0 }))
                    ])
                ])
            ]
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
    ], TasksPage);
    return TasksPage;
}());
export { TasksPage };
//# sourceMappingURL=tasks.js.map