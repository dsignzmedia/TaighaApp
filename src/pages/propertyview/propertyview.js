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
import { NavController, NavParams, ModalController, LoadingController, Content } from 'ionic-angular';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { ServiceProvider } from '../../providers/service/service';
import { DocumentviewPage } from '../../pages/documentview/documentview';
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate';
/**
 * Generated class for the PropertyviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PropertyviewPage = /** @class */ (function () {
    function PropertyviewPage(navCtrl, modalCtrl, navParams, loadingCtrl, service) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.service = service;
        this.workoutProgress = "0%";
        this.hidemeNotified = false;
        this.property = "";
        this.propertyId = 0;
        this.showSpinner = false;
        this.showProperty = false;
        this.showActivity = false;
        this.showMails = false;
        this.showDocument = false;
        this.showTicket = false;
        this.showTask = false;
        this.expandAll = false;
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
        this.checklists_completed_count = 0;
        this.checklists_count = 0;
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
        this.documentcurrentPage = 1;
        this.documentpageLimit = 15;
        this.documenttotalPages = 0;
        this.documenttotalRecords = 0;
        this.documentshowSpinner = true;
        this.documents = [];
        this.propertyId = this.navParams.get('propertyId');
    }
    PropertyviewPage_1 = PropertyviewPage;
    PropertyviewPage.prototype.hideNotified = function () {
        this.hidemeNotified = !this.hidemeNotified;
    };
    PropertyviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PropertyviewPage');
    };
    PropertyviewPage.prototype.ecAll = function () {
        if (this.expandAll) {
            this.showProperty = this.showTask = this.showActivity = this.showDocument = this.showMails = this.showTicket = false;
        }
        else {
            this.showProperty = this.showTask = this.showActivity = this.showDocument = this.showMails = this.showTicket = true;
        }
        this.expandAll = this.expandAll ? false : true;
    };
    PropertyviewPage.prototype.toggleShowHide = function (type) {
        if (type == 'property') {
            this.showProperty = (this.showProperty) ? false : true;
        }
        if (type == 'activity') {
            this.showActivity = (this.showActivity) ? false : true;
        }
        if (type == 'document') {
            this.showDocument = (this.showDocument) ? false : true;
        }
        if (type == 'mails') {
            this.showMails = (this.showMails) ? false : true;
        }
        if (type == 'ticket') {
            this.showTicket = (this.showTicket) ? false : true;
        }
        if (type == 'task') {
            this.showTask = (this.showTask) ? false : true;
        }
    };
    PropertyviewPage.prototype.toggleTileTexts = function (row) {
        if (row.showmore) {
            row.showmore = false;
            row.showmoretext = "More Info";
        }
        else {
            row.showmore = true;
            row.showmoretext = "Less Info";
        }
    };
    PropertyviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter PropertyPage');
        this.clearAndGetProperty();
        this.service.getFcmToken("Property View : " + this.propertyId);
        this.service.watchFcmNotifications();
    };
    PropertyviewPage.prototype.clearAndGetProperty = function () {
        this.property = '';
        this.tickets = [];
        this.activities = [];
        this.emails = [];
        this.documents = [];
        this.getProperty();
    };
    PropertyviewPage.prototype.getProperty = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.property(this.propertyId).then(function (response) {
                console.log(response);
                _this.property = response.data.property;
                _this.showSpinner = false;
                _this.clearAndGetActivities();
                _this.clearAndGetTasks();
                _this.clearAndGetTickets();
                _this.clearAndGetEmails();
                _this.clearAndGetDocuments();
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
    PropertyviewPage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity) {
            if (activity.sub_activity_checked) {
                activity.sub_activity_checked = false;
            }
            else {
                activity.sub_activity_checked = true;
            }
        }
    };
    PropertyviewPage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    PropertyviewPage.prototype.toggleEmail = function (activity) {
        if (activity.activity_checked) {
            activity.activity_checked = false;
        }
        else {
            activity.activity_checked = true;
        }
    };
    PropertyviewPage.prototype.viewTicket = function (ticket) {
        this.navCtrl.push(TicketviewPage, { ticketId: ticket.id });
    };
    PropertyviewPage.prototype.viewMail = function (email) {
        if (email.email_from == 'tickets') {
            this.navCtrl.push(TicketviewPage, { ticketId: email.ticket_id });
        }
        else {
            this.navCtrl.push(MailviewPage, { emailId: email.id });
        }
    };
    PropertyviewPage.prototype.viewDocuments = function () {
        this.navCtrl.push(DocumentviewmodalPage);
    };
    PropertyviewPage.prototype.editProperty = function () {
        this.navCtrl.push(NewpropertiesPage, { propertyId: this.property.id });
    };
    PropertyviewPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.clearAndGetProperty();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    PropertyviewPage.prototype.openDocumentsModal = function (pmaId) {
        var opts = {
            cssClass: 'documentViewModal',
        };
        var filtermodal = this.modalCtrl.create(DocumentviewmodalPage, { pmaId: pmaId }, opts);
        filtermodal.present();
    };
    PropertyviewPage.prototype.viewDocument = function (document) {
        if (document.pma_id != 0) {
            this.openDocumentsModal(document.pma_id);
        }
        else if (document.doc_id != 0) {
            this.navCtrl.push(DocumentviewPage, { documentId: document.doc_id });
        }
    };
    PropertyviewPage.prototype.editDcoument = function (document) {
        if (document.doc_id != 0) {
            this.navCtrl.push(NewdocumentupdatePage, { documentId: document.doc_id });
        }
    };
    PropertyviewPage.prototype.toggleGroupTask = function (activity) {
        if (activity.sub_activity_checked) {
            activity.sub_activity_checked = false;
        }
        else {
            activity.sub_activity_checked = true;
        }
    };
    PropertyviewPage.prototype.updateChecklistStatus = function (checklist) {
        var _this = this;
        if (checklist.is_completed == 0) {
            checklist.is_completed = 1;
        }
        else {
            checklist.is_completed = 0;
        }
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            duration: 5000
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
        this.service.toggleChecklist(checklist).then(function (response) {
            loading.dismiss();
            _this.clearAndGetProperty();
        }).catch(function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    PropertyviewPage.prototype.updateProgress = function (val) {
        // Update percentage value where the above is a decimal
        this.workoutProgress = (val) + '%';
    };
    PropertyviewPage.prototype.goToCorrespondTask = function (task) {
        switch (task.checklist_type) {
            case "ticket":
                this.navCtrl.push(TicketviewPage, { ticketId: task.ticket_id });
                break;
            case "property":
                this.navCtrl.push(PropertyviewPage_1, { propertyId: task.property_id });
                break;
            default:
                // code...
                break;
        }
    };
    PropertyviewPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    PropertyviewPage.prototype.scrollTo = function (element) {
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
    //ActivitiesStart
    PropertyviewPage.prototype.clearAndGetActivities = function () {
        this.activitycurrentPage = 1;
        this.activities = [];
        this.getActivities();
    };
    PropertyviewPage.prototype.getActivities = function () {
        var _this = this;
        try {
            this.activityshowSpinner = true;
            this.service.propertyactivities(this.property.id, this.activitycurrentPage).then(function (response) {
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
    PropertyviewPage.prototype.loadMoreActivites = function () {
        var _this = this;
        try {
            if (this.activitycurrentPage <= this.activitytotalPages) {
                this.activitycurrentPage++;
                this.activityshowSpinner = true;
                this.service.propertyactivities(this.property.id, this.activitycurrentPage).then(function (response) {
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
    //ActivitiesEnd
    //Tasks Start
    PropertyviewPage.prototype.clearAndGetTasks = function () {
        this.taskcurrentPage = 1;
        this.tasks = [];
        this.getTasks();
    };
    PropertyviewPage.prototype.getTasks = function () {
        var _this = this;
        try {
            this.taskshowSpinner = true;
            this.service.tasks(this.taskcurrentPage, { property: this.property.id }, 'all').then(function (response) {
                console.log(response);
                console.log(response.data);
                _this.tasks = response.data;
                _this.tasktotalPages = response.totalPages;
                _this.tasktotalRecords = response.totalRecords;
                _this.taskshowSpinner = false;
                _this.checklists_count = response.checklists_count;
                _this.checklists_completed_count = response.checklists_completed_count;
                _this.updateProgress(response.checklist_count_percentage);
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
    PropertyviewPage.prototype.loadMoreTasks = function () {
        var _this = this;
        try {
            if (this.taskcurrentPage <= this.tasktotalPages) {
                this.taskshowSpinner = true;
                this.taskcurrentPage++;
                this.service.tasks(this.taskcurrentPage, { property: this.property.id }, 'all').then(function (response) {
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
    //Tasks End
    //Tickets Start
    PropertyviewPage.prototype.clearAndGetTickets = function () {
        this.ticketcurrentPage = 1;
        this.tickets = [];
        this.getTickets();
    };
    PropertyviewPage.prototype.getTickets = function () {
        var _this = this;
        try {
            this.ticketshowSpinner = true;
            this.service.tickets(this.ticketcurrentPage, { property: this.property.id }).then(function (response) {
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
    PropertyviewPage.prototype.loadMoreTickets = function () {
        var _this = this;
        try {
            if (this.ticketcurrentPage <= this.tickettotalPages) {
                this.ticketshowSpinner = true;
                this.ticketcurrentPage++;
                this.service.tickets(this.ticketcurrentPage, { property: this.property.id }).then(function (response) {
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
    //Tickets End
    //Mails Start
    PropertyviewPage.prototype.clearAndGetEmails = function () {
        this.mailcurrentPage = 1;
        this.emails = [];
        this.getEmails();
    };
    PropertyviewPage.prototype.getEmails = function () {
        var _this = this;
        try {
            this.mailshowSpinner = true;
            this.service.emails(this.mailcurrentPage, { property: this.property.id }).then(function (response) {
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
    PropertyviewPage.prototype.loadMoreEmails = function () {
        var _this = this;
        try {
            if (this.mailcurrentPage <= this.mailtotalPages) {
                this.mailcurrentPage++;
                this.mailshowSpinner = true;
                this.service.emails(this.mailcurrentPage, { property: this.property.id }).then(function (response) {
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
    //Mails End
    //Documents Start
    PropertyviewPage.prototype.clearAndGetDocuments = function () {
        this.documentcurrentPage = 1;
        this.documents = [];
        this.getDocuments();
    };
    PropertyviewPage.prototype.getDocuments = function () {
        var _this = this;
        try {
            this.documentshowSpinner = true;
            this.service.documents(this.documentcurrentPage, { property: this.property.id }).then(function (response) {
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
    PropertyviewPage.prototype.loadMoreDocuments = function () {
        var _this = this;
        try {
            if (this.documentcurrentPage <= this.documenttotalPages) {
                this.documentshowSpinner = true;
                this.documentcurrentPage++;
                this.service.documents(this.documentcurrentPage, { property: this.property.id }).then(function (response) {
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
    var PropertyviewPage_1;
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], PropertyviewPage.prototype, "content", void 0);
    PropertyviewPage = PropertyviewPage_1 = __decorate([
        Component({
            selector: 'page-propertyview',
            templateUrl: 'propertyview.html',
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
            ModalController,
            NavParams,
            LoadingController,
            ServiceProvider])
    ], PropertyviewPage);
    return PropertyviewPage;
}());
export { PropertyviewPage };
//# sourceMappingURL=propertyview.js.map