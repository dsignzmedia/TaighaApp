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
import { NavController, NavParams, ModalController, PopoverController, Events } from 'ionic-angular';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the MailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MailsPage = /** @class */ (function () {
    function MailsPage(navCtrl, navParams, modalCtrl, popoverCtrl, events, storage, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.storage = storage;
        this.service = service;
        this.currentPage = 1;
        this.pageLimit = 15;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.showSpinner = true;
        this.emails = [];
        this.isOnScroll = false;
        this.filters = "";
        this.isFilterApplied = false;
        //public showBottomInfo: boolean = false;
        this.show = false;
        this.text = 'More Info';
        events.subscribe('emailsfilter:invoked', function () {
            console.log('emailsfilter:invoked');
            _this.storage.getStorage('appliedEmailFilters').then(function (filters) {
                console.log(filters);
                _this.filters = filters;
                _this.clearAndGetEmails();
            });
        });
    }
    MailsPage.prototype.changeText = function () {
        if (this.text === 'More Info') {
            this.text = 'Less Info';
        }
        else {
            this.text = 'More Info';
        }
    };
    MailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MailsPage');
    };
    MailsPage.prototype.openfilterModal = function (characterNum) {
        var opts = {
            cssClass: 'filterModal',
        };
        this.storage.removeStorage('activitycalanderapplied');
        var filtermodal = this.modalCtrl.create(FiltermailsPage, characterNum, opts);
        filtermodal.present();
    };
    MailsPage.prototype.createnewMails = function () {
        this.navCtrl.push(NewmailPage);
    };
    MailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter EmailPage');
        this.storage.getStorage('appliedEmailFilters').then(function (filters) {
            _this.filters = filters;
            _this.clearAndGetEmails();
            _this.service.getFcmToken("Emails");
            _this.service.watchFcmNotifications();
        });
    };
    MailsPage.prototype.clearAndGetEmails = function () {
        this.currentPage = 1;
        this.emails = [];
        this.getEmails();
        this.checkIsFilterApplied();
    };
    MailsPage.prototype.checkIsFilterApplied = function () {
        var _this = this;
        this.isFilterApplied = false;
        this.storage.getStorage('appliedEmailFilters').then(function (filters) {
            if (filters) {
                _this.isFilterApplied = true;
            }
        });
    };
    MailsPage.prototype.resetFilter = function () {
        var _this = this;
        this.storage.removeStorage('appliedEmailFilters').then(function (response) {
            _this.filters = "";
            _this.clearAndGetEmails();
        });
    };
    MailsPage.prototype.getEmails = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.emails(this.currentPage, this.filters).then(function (response) {
                console.log(response);
                _this.emails = response.data;
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
    MailsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                this.isOnScroll = true;
                this.service.emails(this.currentPage, this.filters).then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.emails.push(item);
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
    MailsPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.currentPage = 0;
        this.clearAndGetEmails();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    MailsPage.prototype.mailsview = function (email) {
        if (email.email_from == 'tickets') {
            this.navCtrl.push(TicketviewPage, { ticketId: email.ticket_id });
        }
        else {
            this.navCtrl.push(MailviewPage, { emailId: email.id });
        }
    };
    MailsPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    MailsPage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    MailsPage = __decorate([
        Component({
            selector: 'page-mails',
            templateUrl: 'mails.html',
            animations: [
                trigger('enterAnimation', [
                    transition(':enter', [
                        style({ height: 0 }),
                        animate('0.5s', style({ height: 88 }))
                    ]),
                    transition(':leave', [
                        style({ height: 88 }),
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
            StorageProvider,
            ServiceProvider])
    ], MailsPage);
    return MailsPage;
}());
export { MailsPage };
//# sourceMappingURL=mails.js.map