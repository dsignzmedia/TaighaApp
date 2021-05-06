var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, trigger, style, transition, animate } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, Events, Platform, Content, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewPage } from '../../pages/documentview/documentview';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate';
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { SigninPage } from '../../pages/signin/signin';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(iab, navCtrl, navParams, modalCtrl, service, popoverCtrl, events, platform, fcm, storage, menuCtrl) {
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.platform = platform;
        this.fcm = fcm;
        this.storage = storage;
        this.menuCtrl = menuCtrl;
        this.expandAll = false;
        this.showTaskList = false;
        this.showAcitivity = false;
        this.showContactList = false;
        this.showTicket = false;
        this.showEmail = false;
        this.showProperty = false;
        this.showDocument = false;
        this.activitycurrentPage = 1;
        this.activitypageLimit = 15;
        this.activitytotalPages = 0;
        this.activitytotalRecords = 0;
        this.activityshowSpinner = true;
        this.activities = [];
        this.taskcurrentPage = 1;
        this.taskpageLimit = 15;
        this.tasktotalPages = 0;
        this.tasktotalRecords = 0;
        this.taskshowSpinner = true;
        this.tasks = [];
        this.ticketcurrentPage = 1;
        this.ticketpageLimit = 15;
        this.tickettotalPages = 0;
        this.tickettotalRecords = 0;
        this.ticketshowSpinner = true;
        this.tickets = [];
        this.mailcurrentPage = 1;
        this.mailpageLimit = 15;
        this.mailtotalPages = 0;
        this.mailtotalRecords = 0;
        this.mailshowSpinner = true;
        this.emails = [];
        this.propertycurrentPage = 1;
        this.propertypageLimit = 15;
        this.propertytotalPages = 0;
        this.propertytotalRecords = 0;
        this.propertyshowSpinner = true;
        this.properties = [];
        this.documentcurrentPage = 1;
        this.documentpageLimit = 15;
        this.documenttotalPages = 0;
        this.documenttotalRecords = 0;
        this.documentshowSpinner = true;
        this.documents = [];
        this.name = "";
        this.contactshowSpinner = true;
        this.contacts = [];
        this.contacttotalRecords = 0;
        this.hasEmailVerified = false;
        this.linksent = false;
        this.verifyName = "Resend Email?";
        this.menuCtrl.enable(true, 'isHomeSearchMoreMenu');
        this.menuCtrl.enable(true, 'homesearchMenu');
        this.menuCtrl.enable(true, 'mainmenumore');
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.service.getFcmToken("Dashboard");
        this.service.watchFcmNotifications();
        this.chechEmailVerified();
    };
    // openInAppBrowser(url){
    // const browser = this.iab.create(url,'_blank',this.options);
    // <code>browser.executeScript(...); <span style="color: #3366ff;">//use to execute additional script</span>
    // browser.insertCSS(...); <span style="color: #3366ff;">//use to execute additional css</span>
    // browser.on(<span class="hljs-string">'loadstop'</span>).subscribe(<span class="hljs-function"><span class="hljs-params">event</span> =></span> {
    //    browser.insertCSS({ code: <span class="hljs-string">"body{color: red;"</span> });
    // });//<span class="hljs-string">loadstop - </span>identify when browser closed</code>
    // } 
    HomePage.prototype.viewdoc = function (link) {
        this.iab.create(link + "?token=dHJhbnomob", "_system", "beforeload=yes");
        // Add beforeload event handler which is called before each new URL is loaded into the InAppBrowser Webview
        // iabRef.addEventListener('beforeload', function(params, callback){
        //     // If the URL being loaded is a PDF
        //     if(params.url.match(".pdf")){
        //         // Open PDFs in system browser (instead of InAppBrowser)
        //         cordova.InAppBrowser.open(params.url, "_system");
        //     }else{
        //         // Invoke callback to load this URL in InAppBrowser
        //         callback(params.url);
        //     }
        // });
    };
    HomePage.prototype.resendVerifyEmail = function () {
        var _this = this;
        try {
            this.service.getFcmToken("Verify Email");
            this.verifyName = "Please wait..";
            this.service.resendVerifyEmail().then(function (response) {
                console.log(response);
                _this.verifyName = "Resend Email?";
                _this.linksent = true;
            }).catch(function (error) {
                console.log(error);
                _this.verifyName = "Resend Email?";
            });
        }
        catch (e) {
            this.verifyName = "Resend Email?";
            this.service.serverError();
        }
    };
    HomePage.prototype.chechEmailVerified = function () {
        var _this = this;
        this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            if (auth_user_token) {
                _this.storageToken = auth_user_token;
                if (auth_user_token.is_email_verified == 1) {
                    _this.hasEmailVerified = true;
                    _this.resetAll();
                }
                else {
                    _this.getProfile();
                }
            }
        });
    };
    HomePage.prototype.resetAll = function () {
        this.getProfile();
        this.clearAndGetActivities();
        this.clearAndGetTasks();
        this.clearAndGetTickets();
        this.clearAndGetEmails();
        this.clearAndGetProperties();
        this.clearAndGetDocuments();
        this.getContacts();
    };
    HomePage.prototype.getProfile = function () {
        var _this = this;
        try {
            this.service.profile().then(function (response) {
                console.log(response);
                var user = response.data;
                _this.name = user.first_name + " " + user.last_name;
                console.log("email_verified_status" + user.email_verified_status);
                if (user.email_verified_status == 1) {
                    _this.storageToken.is_email_verified = 1;
                    _this.storage.setStorage('auth_user_tokens', _this.storageToken);
                }
                if (!_this.hasEmailVerified && user.email_verified_status == 1) {
                    _this.hasEmailVerified = true;
                    _this.resetAll();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    HomePage.prototype.ecAll = function () {
        if (this.expandAll) {
            this.expandAll = false;
            this.showTaskList = this.showAcitivity = this.showContactList = this.showTicket = this.showEmail = this.showProperty = this.showDocument = false;
        }
        else {
            this.expandAll = true;
            this.showTaskList = this.showAcitivity = this.showContactList = this.showTicket = this.showEmail = this.showProperty = this.showDocument = true;
        }
    };
    HomePage.prototype.toggleCardLayout = function (type) {
        if (type == 'tasklist') {
            this.showTaskList = (this.showTaskList) ? false : true;
        }
        if (type == 'activity') {
            this.showAcitivity = (this.showAcitivity) ? false : true;
        }
        if (type == 'contactlist') {
            this.showContactList = (this.showContactList) ? false : true;
        }
        if (type == 'ticket') {
            this.showTicket = (this.showTicket) ? false : true;
        }
        if (type == 'mail') {
            this.showEmail = (this.showEmail) ? false : true;
        }
        if (type == 'property') {
            this.showProperty = (this.showProperty) ? false : true;
        }
        if (type == 'document') {
            this.showDocument = (this.showDocument) ? false : true;
        }
    };
    //Activities Start
    HomePage.prototype.clearAndGetActivities = function () {
        this.activitycurrentPage = 1;
        this.activities = [];
        this.getActivities();
    };
    HomePage.prototype.getContacts = function () {
        var _this = this;
        this.contacts = [];
        try {
            this.contactshowSpinner = true;
            this.service.contacts().then(function (response) {
                console.log(response);
                _this.contacts = response.data;
                _this.contactshowSpinner = false;
                _this.contacttotalRecords = _this.contacts.length;
            }).catch(function (error) {
                _this.contactshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.contactshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.getActivities = function () {
        var _this = this;
        try {
            this.activityshowSpinner = true;
            this.service.activities(this.activitycurrentPage, "").then(function (response) {
                console.log(response);
                _this.activities = response.data;
                _this.activitytotalPages = response.totalPages;
                _this.activitytotalRecords = response.totalRecords;
                _this.activityshowSpinner = false;
            }).catch(function (error) {
                _this.activityshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.activityshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity) {
            if (activity.sub_activity_checked) {
                activity.sub_activity_checked = false;
            }
            else {
                activity.sub_activity_checked = true;
            }
        }
    };
    HomePage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    HomePage.prototype.goToCorrespondActivity = function (activity) {
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
    HomePage.prototype.loadMoreActivites = function () {
        var _this = this;
        try {
            if (this.activitycurrentPage <= this.activitytotalPages) {
                this.activitycurrentPage++;
                this.activityshowSpinner = true;
                this.service.activities(this.activitycurrentPage, "").then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.activities.push(item);
                    });
                    _this.activityshowSpinner = false;
                }).catch(function (error) {
                    _this.activityshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.activityshowSpinner = false;
            this.service.serverError();
        }
    };
    //Activities End
    //Tasks Start
    HomePage.prototype.clearAndGetTasks = function () {
        this.taskcurrentPage = 1;
        this.tasks = [];
        this.getTasks();
    };
    HomePage.prototype.getTasks = function () {
        var _this = this;
        try {
            this.taskshowSpinner = true;
            this.service.tasks(this.taskcurrentPage, "", 'not_completed').then(function (response) {
                console.log(response);
                console.log(response.data);
                _this.tasks = response.data;
                _this.tasktotalPages = response.totalPages;
                _this.tasktotalRecords = response.totalRecords;
                _this.taskshowSpinner = false;
            }).catch(function (error) {
                _this.taskshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.taskshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.loadMoreTasks = function () {
        var _this = this;
        try {
            if (this.taskcurrentPage <= this.tasktotalPages) {
                this.taskshowSpinner = true;
                this.taskcurrentPage++;
                this.service.tasks(this.taskcurrentPage, "", 'not_completed').then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.tasks.push(item);
                    });
                    _this.taskshowSpinner = false;
                }).catch(function (error) {
                    _this.taskshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.taskshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.toggleGroupTask = function (activity) {
        if (activity.sub_activity_checked) {
            activity.sub_activity_checked = false;
        }
        else {
            activity.sub_activity_checked = true;
        }
    };
    HomePage.prototype.toggleNotifyTask = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    HomePage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverpagePage, {}, { cssClass: 'customPopover' });
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.goToCorrespondTask = function (task) {
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
    HomePage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    //Tasks End
    //Tickets Start
    HomePage.prototype.clearAndGetTickets = function () {
        this.ticketcurrentPage = 1;
        this.tickets = [];
        this.getTickets();
    };
    HomePage.prototype.getTickets = function () {
        var _this = this;
        try {
            this.ticketshowSpinner = true;
            this.service.tickets(this.ticketcurrentPage, "").then(function (response) {
                console.log(response);
                _this.tickets = response.data;
                _this.tickettotalPages = response.totalPages;
                _this.tickettotalRecords = response.totalRecords;
                _this.ticketshowSpinner = false;
            }).catch(function (error) {
                _this.ticketshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.ticketshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.loadMoreTickets = function () {
        var _this = this;
        try {
            if (this.ticketcurrentPage <= this.tickettotalPages) {
                this.ticketshowSpinner = true;
                this.ticketcurrentPage++;
                this.service.tickets(this.ticketcurrentPage, "").then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.tickets.push(item);
                    });
                    _this.ticketshowSpinner = false;
                }).catch(function (error) {
                    _this.ticketshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.ticketshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.ticketview = function (ticketId) {
        this.navCtrl.push(TicketviewPage, { ticketId: ticketId });
    };
    //Tickets End
    //Mails Start
    HomePage.prototype.clearAndGetEmails = function () {
        this.mailcurrentPage = 1;
        this.emails = [];
        this.getEmails();
    };
    HomePage.prototype.getEmails = function () {
        var _this = this;
        try {
            this.mailshowSpinner = true;
            this.service.emails(this.mailcurrentPage, "").then(function (response) {
                console.log(response);
                _this.emails = response.data;
                _this.mailtotalPages = response.totalPages;
                _this.mailtotalRecords = response.totalRecords;
                _this.mailshowSpinner = false;
            }).catch(function (error) {
                _this.mailshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.mailshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.loadMoreEmails = function () {
        var _this = this;
        try {
            if (this.mailcurrentPage <= this.mailtotalPages) {
                this.mailcurrentPage++;
                this.mailshowSpinner = true;
                this.service.emails(this.mailcurrentPage, "").then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.emails.push(item);
                    });
                    _this.mailshowSpinner = false;
                }).catch(function (error) {
                    _this.mailshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.mailshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.mailsview = function (email) {
        if (email.email_from == 'tickets') {
            this.navCtrl.push(TicketviewPage, { ticketId: email.ticket_id });
        }
        else {
            this.navCtrl.push(MailviewPage, { emailId: email.id });
        }
    };
    //Mails End
    //Properties Start
    HomePage.prototype.clearAndGetProperties = function () {
        this.propertycurrentPage = 1;
        this.properties = [];
        this.getProperties();
    };
    HomePage.prototype.getProperties = function () {
        var _this = this;
        try {
            this.propertyshowSpinner = true;
            this.service.properties(this.propertycurrentPage, "").then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.propertytotalPages = response.totalPages;
                _this.propertytotalRecords = response.totalRecords;
                _this.propertyshowSpinner = false;
            }).catch(function (error) {
                _this.propertyshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.propertyshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.editProperty = function (property) {
        this.navCtrl.push(NewpropertiesPage, { propertyId: property.id });
    };
    HomePage.prototype.loadMoreProperties = function () {
        var _this = this;
        try {
            if (this.propertycurrentPage <= this.propertytotalPages) {
                this.propertyshowSpinner = true;
                this.propertycurrentPage++;
                this.service.properties(this.propertycurrentPage, "").then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.properties.push(item);
                    });
                    _this.propertyshowSpinner = false;
                }).catch(function (error) {
                    _this.propertyshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.propertyshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.viewProperties = function (property) {
        this.navCtrl.push(PropertyviewPage, { propertyId: property.id });
    };
    //Properties End
    //Documents Start
    HomePage.prototype.clearAndGetDocuments = function () {
        this.documentcurrentPage = 1;
        this.documents = [];
        this.getDocuments();
    };
    HomePage.prototype.getDocuments = function () {
        var _this = this;
        try {
            this.documentshowSpinner = true;
            this.service.documents(this.documentcurrentPage, "").then(function (response) {
                console.log(response);
                _this.documents = response.data;
                _this.documenttotalPages = response.totalPages;
                _this.documenttotalRecords = response.totalRecords;
                _this.documentshowSpinner = false;
            }).catch(function (error) {
                _this.documentshowSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.documentshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.loadMoreDocuments = function () {
        var _this = this;
        try {
            if (this.documentcurrentPage <= this.documenttotalPages) {
                this.documentshowSpinner = true;
                this.documentcurrentPage++;
                this.service.documents(this.documentcurrentPage, "").then(function (response) {
                    console.log(response);
                    var nextTickets = response.data;
                    nextTickets.forEach(function (item, index) {
                        //console.log(item); // 9, 2, 5
                        _this.documents.push(item);
                    });
                    _this.documentshowSpinner = false;
                }).catch(function (error) {
                    _this.documentshowSpinner = false;
                    console.log(error);
                });
            }
        }
        catch (e) {
            this.documentshowSpinner = false;
            this.service.serverError();
        }
    };
    HomePage.prototype.openDocumentsModal = function (pmaId) {
        var opts = {
            cssClass: 'documentViewModal',
        };
        var filtermodal = this.modalCtrl.create(DocumentviewmodalPage, { pmaId: pmaId }, opts);
        filtermodal.present();
    };
    HomePage.prototype.viewDocument = function (document) {
        if (document.pma_id != 0) {
            this.openDocumentsModal(document.pma_id);
        }
        else if (document.doc_id != 0) {
            this.navCtrl.push(DocumentviewPage, { documentId: document.doc_id });
        }
    };
    HomePage.prototype.editDcoument = function (document) {
        if (document.doc_id != 0) {
            this.navCtrl.push(NewdocumentupdatePage, { documentId: document.doc_id });
        }
    };
    //Documents End
    HomePage.prototype.scrollTo = function (element) {
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
    HomePage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    HomePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.resetAll();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.logout = function () {
        this.service.getFcmToken("Logout");
        this.service.watchFcmNotifications();
        this.service.clearAuthDatas();
        this.navCtrl.setRoot(SigninPage);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
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
        __metadata("design:paramtypes", [InAppBrowser, NavController,
            NavParams,
            ModalController,
            ServiceProvider,
            PopoverController,
            Events,
            Platform,
            FCM,
            StorageProvider,
            MenuController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map