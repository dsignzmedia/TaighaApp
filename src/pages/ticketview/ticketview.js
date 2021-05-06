var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the TicketviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketviewPage = /** @class */ (function () {
    function TicketviewPage(navCtrl, service, formBuilder, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.urls = new Array();
        this.multiple = false;
        this.toggleUpdateFields = false;
        this.dropdownFields = false;
        this.workoutProgress = '20' + '%';
        this.hidemeNotified = false;
        this.showSpinner = true;
        this.ticket = "";
        this.properties = [];
        this.customer = "";
        this.priorities = [];
        this.ticketId = 0;
        this.disableUpdate = true;
        this.existingTicket = "";
        this.priority = "";
        this.property_id = "";
        this.body = "";
        this.editpriorityfield = false;
        this.editpropertyfield = false;
        this.formData = new FormData();
        this.showSubject = false;
        this.showActivity = false;
        this.showEmails = false;
        this.showTasklist = false;
        this.expandAll = false;
        this.taskcurrentPage = 1;
        this.taskpageLimit = 15;
        this.tasktotalPages = 0;
        this.tasktotalRecords = 0;
        this.taskshowSpinner = true;
        this.tasks = [];
        this.checklists_completed_count = 0;
        this.checklists_count = 0;
        this.activitycurrentPage = 1;
        this.activitypageLimit = 15;
        this.activitytotalPages = 0;
        this.activitytotalRecords = 0;
        this.activityshowSpinner = true;
        this.activities = [];
        this.showReply = false;
        this.toolbarOptions = this.service.toolbarOptions;
        this.config = this.service.ckeImageUploadOptions;
        this.ticketId = this.navParams.get('ticketId');
        this.replyticket = this.formBuilder.group({
            priority: ['', Validators.required],
            property_id: [''],
            body: [''],
            id: ['']
        });
        this.replyticket.patchValue({ id: this.ticketId });
    }
    TicketviewPage.prototype.hideNotified = function () {
        this.hidemeNotified = !this.hidemeNotified;
    };
    TicketviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TicketviewPage');
    };
    TicketviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter TicketsPage');
        this.clearAndGetTicket();
        this.service.getFcmToken("Tickets View : " + this.ticketId);
        this.service.watchFcmNotifications();
    };
    TicketviewPage.prototype.ecAll = function () {
        if (this.expandAll) {
            this.showSubject = this.showActivity = this.showEmails = this.showTasklist = false;
        }
        else {
            this.showSubject = this.showActivity = this.showEmails = this.showTasklist = true;
        }
        this.expandAll = this.expandAll ? false : true;
    };
    TicketviewPage.prototype.toggleShowHide = function (type) {
        if (type == 'subject') {
            this.showSubject = (this.showSubject) ? false : true;
        }
        if (type == 'activity') {
            this.showActivity = (this.showActivity) ? false : true;
        }
        if (type == 'emails') {
            this.showEmails = (this.showEmails) ? false : true;
        }
        if (type == 'tasklist') {
            this.showTasklist = (this.showTasklist) ? false : true;
        }
    };
    TicketviewPage.prototype.getEditorContent = function (editorInstance) {
        this.body = editorInstance.html;
    };
    TicketviewPage.prototype.getEditorInstance = function (editorInstance) {
        this.quillEditorRef = editorInstance;
        console.log(this.quillEditorRef);
        var toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.imageHandler.bind(this));
        this.quill = editorInstance;
    };
    TicketviewPage.prototype.imageHandler = function () {
        var _this = this;
        var Imageinput = document.createElement('input');
        Imageinput.setAttribute('type', 'file');
        Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        Imageinput.classList.add('ql-image');
        Imageinput.addEventListener('change', function () {
            var file = Imageinput.files[0];
            if (Imageinput.files != null && Imageinput.files[0] != null) {
                var loading_1 = _this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_1.present();
                var fd = new FormData();
                fd.append('image', file);
                _this.service.quillimageupload(fd).then(function (res) {
                    console.log(res);
                    _this.pushImageToEditor(res);
                    loading_1.dismiss();
                }).catch(function (error) {
                    loading_1.dismiss();
                });
            }
        });
        Imageinput.click();
    };
    TicketviewPage.prototype.pushImageToEditor = function (res) {
        var range = this.quill.getSelection(true);
        var index = range.index + range.length;
        this.quill.insertEmbed(range.index, 'image', res.url);
    };
    TicketviewPage.prototype.clearAndGetTicket = function () {
        this.ticket = '';
        this.editpropertyfield = this.editpriorityfield = false;
        this.disableUpdate = true;
        this.properties = [];
        this.priorities = [];
        this.customer = "";
        this.getTicket();
    };
    TicketviewPage.prototype.getTicket = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.ticket(this.ticketId).then(function (response) {
                console.log(response);
                _this.ticket = response.data.ticket;
                _this.properties = response.data.properties;
                _this.priorities = response.data.priorities;
                _this.customer = _this.ticket.customer;
                _this.updateProgress(_this.ticket.checklist_count_percentage);
                _this.property_id = _this.ticket.property_id;
                _this.priority = _this.ticket.priority;
                _this.body = response.data.signature;
                _this.showSpinner = false;
                _this.clearAndGetTasks();
                _this.clearAndGetActivities();
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
    TicketviewPage.prototype.changeListener = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                var reader = new FileReader();
                reader.onload = function (e) {
                    _this.urls.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
        console.log(JSON.stringify(this.urls));
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        if (fileCount > 0) { // a file was selected
            for (var i = 0; i < fileCount; i++) {
                this.formData.append('attachments[]', inputEl.files.item(i));
            }
        }
    };
    TicketviewPage.prototype.reply = function () {
        var _this = this;
        try {
            this.service.showload();
            this.formData.append('priority', this.priority);
            this.formData.append('property_id', this.property_id);
            this.formData.append('body', this.body);
            this.formData.append('id', this.ticket.id);
            this.service.ticketreply(this.formData).then(function (response) {
                console.log(JSON.stringify(response));
                _this.service.loading.dismiss();
                _this.navCtrl.pop();
            }).catch(function (e) {
                console.log(e);
                console.log(JSON.stringify(e));
                _this.service.loading.dismiss();
                _this.service.toast(e.error.message, 3000, 'middle');
            });
        }
        catch (e) {
            this.showSpinner = false;
            this.service.serverError();
            this.service.loading.dismiss();
        }
    };
    TicketviewPage.prototype.updateTicket = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            duration: 5000
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
        this.service.updateTicket(this.ticket).then(function (response) {
            console.log(response);
            loading.dismiss();
            _this.clearAndGetTicket();
        }).catch(function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    TicketviewPage.prototype.updateChecklistStatus = function (checklist) {
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
        this.service.updateChecklist(this.ticketId, checklist).then(function (response) {
            loading.dismiss();
            _this.clearAndGetTicket();
        }).catch(function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    TicketviewPage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity) {
            if (activity.sub_activity_checked) {
                activity.sub_activity_checked = false;
            }
            else {
                activity.sub_activity_checked = true;
            }
        }
    };
    TicketviewPage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    TicketviewPage.prototype.toggleEmail = function (activity) {
        if (activity.activity_checked) {
            activity.activity_checked = false;
        }
        else {
            activity.activity_checked = true;
        }
    };
    TicketviewPage.prototype.toggleFields = function () {
        if (this.toggleUpdateFields) {
            this.toggleUpdateFields = false;
        }
        else {
            this.toggleUpdateFields = true;
        }
    };
    TicketviewPage.prototype.updateDropdown = function () {
        if (this.dropdownFields) {
            this.dropdownFields = false;
        }
        else {
            this.dropdownFields = true;
        }
    };
    TicketviewPage.prototype.updateProgress = function (val) {
        // Update percentage value where the above is a decimal
        this.workoutProgress = (val) + '%';
    };
    TicketviewPage.prototype.enableDisableStatus = function () {
        this.disableUpdate = false;
    };
    TicketviewPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.clearAndGetTicket();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    TicketviewPage.prototype.toggleTopHeaderUpdate = function (type) {
        console.log(type);
        if (type == 'property') {
            this.editpropertyfield = (this.editpropertyfield) ? false : true;
        }
        else {
            this.editpriorityfield = (this.editpriorityfield) ? false : true;
        }
        console.log(this.editpropertyfield);
    };
    TicketviewPage.prototype.back = function () {
        //TicketsPage
        this.navCtrl.pop();
    };
    TicketviewPage.prototype.scrollTo = function (element) {
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
    //Tasks Start
    TicketviewPage.prototype.clearAndGetTasks = function () {
        this.taskcurrentPage = 1;
        this.tasks = [];
        this.getTasks();
    };
    TicketviewPage.prototype.getTasks = function () {
        var _this = this;
        try {
            this.taskshowSpinner = true;
            this.service.tasks(this.taskcurrentPage, { ticket: this.ticket.id }, 'all').then(function (response) {
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
    TicketviewPage.prototype.loadMoreTasks = function () {
        var _this = this;
        try {
            if (this.taskcurrentPage <= this.tasktotalPages) {
                this.taskshowSpinner = true;
                this.taskcurrentPage++;
                this.service.tasks(this.taskcurrentPage, { ticket: this.ticket.id }, 'all').then(function (response) {
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
    //ActivitiesStart
    TicketviewPage.prototype.clearAndGetActivities = function () {
        this.activitycurrentPage = 1;
        this.activities = [];
        this.getActivities();
    };
    TicketviewPage.prototype.getActivities = function () {
        var _this = this;
        try {
            this.activityshowSpinner = true;
            this.service.ticketactivities(this.ticket.id, this.activitycurrentPage).then(function (response) {
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
    TicketviewPage.prototype.loadMoreActivites = function () {
        var _this = this;
        try {
            if (this.activitycurrentPage <= this.activitytotalPages) {
                this.activitycurrentPage++;
                this.activityshowSpinner = true;
                this.service.ticketactivities(this.ticket.id, this.activitycurrentPage).then(function (response) {
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
    TicketviewPage.prototype.replyToggle = function () {
        this.showReply = (this.showReply) ? false : true;
    };
    TicketviewPage.prototype.showEmailReply = function () {
        var _this = this;
        this.showReply = true;
        if (this.showEmails) {
            this.showEmails = true;
            this.scrollTo('quilleditorid');
        }
        else {
            this.showEmails = true;
            setTimeout(function () {
                _this.scrollTo('quilleditorid');
            }, 100);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TicketviewPage.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], TicketviewPage.prototype, "inputEl", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], TicketviewPage.prototype, "content", void 0);
    TicketviewPage = __decorate([
        Component({
            selector: 'page-ticketview',
            templateUrl: 'ticketview.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            FormBuilder,
            NavParams,
            LoadingController])
    ], TicketviewPage);
    return TicketviewPage;
}());
export { TicketviewPage };
//# sourceMappingURL=ticketview.js.map