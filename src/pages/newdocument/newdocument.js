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
import { NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { DocumentsPage } from '../../pages/documents/documents';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FormBuilder } from '@angular/forms';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
var NewdocumentPage = /** @class */ (function () {
    function NewdocumentPage(navCtrl, service, storage, formBuilder, camera, platform, transfer, file, filePath, toastCtrl, actionSheetCtrl, loadingCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.properties = "";
        this.showSpinner = false;
        this.imageurl = "";
        this.lastImage = null;
        this.headerToken = "";
        this.imageurlpreview = "";
        this.fileName = "";
        this.name = "";
        this.property_id = "0";
        this.urls = new Array();
        this.multiple = false;
        this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            _this.headerToken = auth_user_token.token_type + " " + auth_user_token.access_token;
        });
    }
    NewdocumentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewdocumentPage');
    };
    NewdocumentPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter NewdocumentPage');
        this.clearAndGetOptions();
    };
    NewdocumentPage.prototype.clearAndGetOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.userByProperties().then(function (response) {
                console.log(response);
                _this.properties = response.data.properties;
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
    NewdocumentPage.prototype.changeListener = function (event) {
        var _this = this;
        this.urls = [];
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
    };
    NewdocumentPage.prototype.storeDocument = function () {
        var _this = this;
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        console.log(fileCount);
        var formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (var i = 0; i < fileCount; i++) {
                formData.append('file[]', inputEl.files.item(i));
            }
        }
        console.log(this.name);
        formData.append('name', this.name);
        formData.append('property_id', this.property_id);
        this.service.showload();
        this.service.documentstore(formData).then(function (response) {
            console.log("response", JSON.stringify(response));
            _this.service.loading.dismiss();
            _this.navCtrl.pop();
        }).catch(function (error) {
            _this.service.loading.dismiss();
            console.log("error", JSON.stringify(error));
            _this.service.toast(error.error.message, 3000, 'middle');
        });
    };
    NewdocumentPage.prototype.back = function () {
        this.navCtrl.push(DocumentsPage);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NewdocumentPage.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], NewdocumentPage.prototype, "inputEl", void 0);
    NewdocumentPage = __decorate([
        Component({
            selector: 'page-newdocument',
            templateUrl: 'newdocument.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            StorageProvider,
            FormBuilder,
            Camera,
            Platform,
            FileTransfer,
            File,
            FilePath,
            ToastController,
            ActionSheetController,
            LoadingController,
            NavParams])
    ], NewdocumentPage);
    return NewdocumentPage;
}());
export { NewdocumentPage };
//# sourceMappingURL=newdocument.js.map