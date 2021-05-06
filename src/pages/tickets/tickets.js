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
import { NavController, NavParams, ModalController, PopoverController, Events, AlertController, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FilterticketsPage } from '../../pages/filtertickets/filtertickets';
import { NewticketsPage } from '../../pages/newtickets/newtickets';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketsPage = /** @class */ (function () {
    function TicketsPage(navCtrl, navParams, modalCtrl, popoverCtrl, events, platform, fcm, alertCtrl, storage, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.platform = platform;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.service = service;
        this.currentPage = 1;
        this.pageLimit = 15;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.showSpinner = true;
        this.tickets = [];
        this.isOnScroll = false;
        this.showBottomInfo = false;
        this.show = false;
        this.text = 'More Info';
        this.filters = "";
        this.isFilterApplied = false;
        this.menuState = 'out';
        console.log("Tickets Pages");
        events.subscribe('ticketsfilter:invoked', function () {
            console.log('ticketsfilter:invoked');
            _this.storage.getStorage('appliedTicketFilters').then(function (ticketfilter) {
                console.log(ticketfilter);
                _this.filters = ticketfilter;
                _this.clearAndGetTickets();
            });
        });
    }
    TicketsPage.prototype.changeText = function () {
        if (this.text === 'More Info') {
            this.text = 'Less Info';
        }
        else {
            this.text = 'More Info';
        }
    };
    TicketsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TicketsPage');
    };
    TicketsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter TicketsPage');
        this.storage.getStorage('appliedTicketFilters').then(function (ticketfilter) {
            _this.filters = ticketfilter;
            _this.clearAndGetTickets();
            _this.service.getFcmToken("Tickets");
            _this.service.watchFcmNotifications();
        });
    };
    TicketsPage.prototype.checkIsFilterApplied = function () {
        var _this = this;
        this.isFilterApplied = false;
        this.storage.getStorage('appliedTicketFilters').then(function (ticketfilter) {
            console.log("ticketfilter", ticketfilter);
            if (ticketfilter) {
                _this.isFilterApplied = true;
            }
        });
    };
    TicketsPage.prototype.clearAndGetTickets = function () {
        this.currentPage = 1;
        this.tickets = [];
        this.getTickets();
        this.checkIsFilterApplied();
    };
    TicketsPage.prototype.resetFilter = function () {
        this.storage.removeStorage('appliedTicketFilters');
        this.filters = "";
        this.clearAndGetTickets();
    };
    TicketsPage.prototype.getTickets = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            console.log(this.filters);
            this.service.tickets(this.currentPage, this.filters).then(function (response) {
                console.log(response);
                _this.tickets = response.data;
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
    TicketsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.tickets(this.currentPage, this.filters).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.tickets.push(item);
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
    TicketsPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.clearAndGetTickets();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    TicketsPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FilterticketsPage, characterNum, opts);
        filtermodal.present();
    };
    TicketsPage.prototype.createnewTickets = function () {
        this.navCtrl.push(NewticketsPage);
    };
    TicketsPage.prototype.ticketview = function (ticketId) {
        this.navCtrl.push(TicketviewPage, { ticketId: ticketId });
    };
    TicketsPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    TicketsPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    TicketsPage.prototype.openBottom = function () {
        //this.show = true;
        // if(this.showBottomInfo) {
        //      this.showBottomInfo = false;
        //    } else {
        //      this.showBottomInfo = true;
        //    }
        //this.showBottomInfo = !this.showBottomInfo;
        //this.show ? 'Toggle!' : 'some text';
        //this.menuState = this.menuState === 'out' ? 'in' : 'out';
    };
    TicketsPage = __decorate([
        Component({
            selector: 'page-tickets',
            templateUrl: 'tickets.html',
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
            PopoverController,
            Events,
            Platform,
            FCM,
            AlertController,
            StorageProvider,
            ServiceProvider])
    ], TicketsPage);
    return TicketsPage;
}());
export { TicketsPage };
//# sourceMappingURL=tickets.js.map