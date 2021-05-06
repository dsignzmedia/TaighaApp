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
import { StorageProvider } from '../../providers/storage/storage';
import { MailsPage } from '../../pages/mails/mails';
import { Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the NewmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewmailPage = /** @class */ (function () {
    function NewmailPage(navCtrl, service, storage, formBuilder, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.urls = new Array();
        this.multiple = false;
        this.priorities = "";
        this.properties = "";
        this.showSpinner = false;
        this.priority = "";
        this.subject = "";
        this.property_id = "";
        this.body = "";
        this.formData = new FormData();
        this.toolbarOptions = this.service.toolbarOptions;
        this.email = this.formBuilder.group({
            priority: ['', Validators.required],
            property_id: [''],
            subject: ['', Validators.required],
            body: ['']
        });
        this.config = this.service.ckeImageUploadOptions;
    }
    NewmailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewMailPage');
    };
    NewmailPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter MailsPage');
        this.clearAndGetOptions();
    };
    NewmailPage.prototype.clearAndGetOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.emailcreate().then(function (response) {
                _this.priorities = response.data.priorities;
                _this.properties = response.data.properties;
                console.log(response);
                _this.body = response.data.signature;
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
    NewmailPage.prototype.back = function () {
        this.navCtrl.push(MailsPage);
    };
    NewmailPage.prototype.getEditorContent = function (editorInstance) {
        this.body = editorInstance.html;
    };
    NewmailPage.prototype.getEditorInstance = function (editorInstance) {
        this.quillEditorRef = editorInstance;
        console.log(this.quillEditorRef);
        var toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.imageHandler.bind(this));
        this.quill = editorInstance;
    };
    NewmailPage.prototype.imageHandler = function () {
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
    NewmailPage.prototype.pushImageToEditor = function (res) {
        var range = this.quill.getSelection(true);
        var index = range.index + range.length;
        this.quill.insertEmbed(range.index, 'image', res.url);
    };
    NewmailPage.prototype.changeListener = function (event) {
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
    NewmailPage.prototype.storeEmail = function () {
        var _this = this;
        this.service.showload();
        this.formData.append('priority', this.priority);
        this.formData.append('property_id', this.property_id);
        this.formData.append('body', this.body);
        this.formData.append('subject', this.subject);
        this.service.emailstore(this.formData).then(function (response) {
            console.log(JSON.stringify(response));
            _this.service.loading.dismiss();
            _this.navCtrl.pop();
        }).catch(function (e) {
            console.log(e);
            console.log(JSON.stringify(e));
            _this.service.loading.dismiss();
            _this.service.toast(e.error.message, 3000, 'middle');
        });
    };
    NewmailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NewmailPage.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], NewmailPage.prototype, "inputEl", void 0);
    NewmailPage = __decorate([
        Component({
            selector: 'page-newmail',
            templateUrl: 'newmail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            StorageProvider,
            FormBuilder,
            LoadingController,
            NavParams])
    ], NewmailPage);
    return NewmailPage;
}());
export { NewmailPage };
//# sourceMappingURL=newmail.js.map