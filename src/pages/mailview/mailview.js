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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the MailviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MailviewPage = /** @class */ (function () {
    function MailviewPage(navCtrl, service, loadingCtrl, formBuilder, navParams) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.urls = new Array();
        this.multiple = false;
        this.toggleUpdateFields = false;
        this.dropdownFields = false;
        this.workoutProgress = '20' + '%';
        this.hidemeNotified = false;
        this.items = [];
        this.showSpinner = true;
        this.email = "";
        this.properties = [];
        this.customer = "";
        this.priorities = [];
        this.emailId = 0;
        this.disableUpdate = true;
        this.editpriorityfield = false;
        this.editpropertyfield = false;
        this.formData = new FormData();
        this.priority = "";
        this.property_id = "";
        this.body = "";
        this.showSubject = false;
        this.showEmails = false;
        this.expandAll = false;
        this.showReply = false;
        this.shownGroup = null;
        this.toolbarOptions = this.service.toolbarOptions;
        this.config = this.service.ckeImageUploadOptions;
        this.emailId = this.navParams.get('emailId');
        this.replyemail = this.formBuilder.group({
            priority: ['', Validators.required],
            property_id: [''],
            body: [''],
            id: ['']
        });
        this.replyemail.patchValue({ id: this.emailId });
    }
    MailviewPage.prototype.hideNotified = function () {
        this.hidemeNotified = !this.hidemeNotified;
    };
    MailviewPage.prototype.ecAll = function () {
        if (this.expandAll) {
            this.showSubject = this.showEmails = false;
        }
        else {
            this.showSubject = this.showEmails = true;
        }
        this.expandAll = this.expandAll ? false : true;
    };
    MailviewPage.prototype.toggleShowHide = function (type) {
        if (type == 'subject') {
            this.showSubject = (this.showSubject) ? false : true;
        }
        if (type == 'emails') {
            this.showEmails = (this.showEmails) ? false : true;
        }
    };
    MailviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter MailviewPage');
        this.clearAndGetEmail();
        this.service.getFcmToken("Email View : " + this.emailId);
        this.service.watchFcmNotifications();
    };
    MailviewPage.prototype.clearAndGetEmail = function () {
        this.email = '';
        this.disableUpdate = true;
        this.properties = [];
        this.priorities = [];
        this.customer = "";
        this.getEmail();
    };
    MailviewPage.prototype.getEditorContent = function (editorInstance) {
        this.body = editorInstance.html;
    };
    MailviewPage.prototype.getEditorInstance = function (editorInstance) {
        this.quillEditorRef = editorInstance;
        console.log(this.quillEditorRef);
        var toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.imageHandler.bind(this));
        this.quill = editorInstance;
    };
    MailviewPage.prototype.imageHandler = function () {
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
    MailviewPage.prototype.pushImageToEditor = function (res) {
        var range = this.quill.getSelection(true);
        var index = range.index + range.length;
        this.quill.insertEmbed(range.index, 'image', res.url);
    };
    MailviewPage.prototype.getEmail = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.email(this.emailId).then(function (response) {
                console.log(response);
                _this.email = response.data.email;
                _this.property_id = _this.email.property_id;
                _this.priority = _this.email.email_priority;
                _this.properties = response.data.properties;
                _this.priorities = response.data.priorities;
                _this.body = response.data.signature;
                _this.customer = _this.email.customer;
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
    MailviewPage.prototype.updateEmail = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            duration: 5000
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
        this.service.updateEmail(this.email).then(function (response) {
            console.log(response);
            loading.dismiss();
            _this.clearAndGetEmail();
        }).catch(function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    MailviewPage.prototype.changeListener = function (event) {
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
    MailviewPage.prototype.reply = function () {
        var _this = this;
        try {
            this.service.showload();
            this.formData.append('priority', this.priority);
            this.formData.append('property_id', this.property_id);
            this.formData.append('body', this.body);
            this.formData.append('id', this.email.id);
            this.service.emailreply(this.formData).then(function (response) {
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
    MailviewPage.prototype.toggleGroup = function (activity) {
        if (activity.sub_activity) {
            if (activity.sub_activity_checked) {
                activity.sub_activity_checked = false;
            }
            else {
                activity.sub_activity_checked = true;
            }
        }
    };
    MailviewPage.prototype.toggleNotify = function (activity) {
        if (activity.notified_users_checked) {
            activity.notified_users_checked = false;
        }
        else {
            activity.notified_users_checked = true;
        }
    };
    MailviewPage.prototype.toggleFields = function () {
        if (this.toggleUpdateFields) {
            this.toggleUpdateFields = false;
        }
        else {
            this.toggleUpdateFields = true;
        }
    };
    MailviewPage.prototype.toggleEmail = function (activity) {
        if (activity.activity_checked) {
            activity.activity_checked = false;
        }
        else {
            activity.activity_checked = true;
        }
    };
    MailviewPage.prototype.enableDisableStatus = function () {
        this.disableUpdate = false;
    };
    MailviewPage.prototype.updateDropdown = function () {
        if (this.dropdownFields) {
            this.dropdownFields = false;
        }
        else {
            this.dropdownFields = true;
        }
    };
    MailviewPage.prototype.updateProgress = function (val) {
        // Update percentage value where the above is a decimal
        this.workoutProgress = Math.min((val * 100), 100) + '%';
    };
    MailviewPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.clearAndGetEmail();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    MailviewPage.prototype.toggleTopHeaderUpdate = function (type) {
        console.log(type);
        if (type == 'property') {
            this.editpropertyfield = (this.editpropertyfield) ? false : true;
        }
        else {
            this.editpriorityfield = (this.editpriorityfield) ? false : true;
        }
        console.log(this.editpropertyfield);
    };
    MailviewPage.prototype.back = function () {
        //this.navCtrl.push(MailsPage); 
        this.navCtrl.pop();
    };
    MailviewPage.prototype.replyToggle = function () {
        this.showReply = (this.showReply) ? false : true;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MailviewPage.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], MailviewPage.prototype, "inputEl", void 0);
    MailviewPage = __decorate([
        Component({
            selector: 'page-mailview',
            templateUrl: 'mailview.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            LoadingController,
            FormBuilder,
            NavParams])
    ], MailviewPage);
    return MailviewPage;
}());
export { MailviewPage };
//# sourceMappingURL=mailview.js.map