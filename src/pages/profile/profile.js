var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { TabsPage } from '../../pages/tabs/tabs';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, service, storage, formBuilder, camera, platform, transfer, file, filePath, toastCtrl, actionSheetCtrl, loadingCtrl, navParams) {
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
        this.showSpinner = false;
        this.user = "";
        this.errors = [];
        this.hasError = 0;
        this.lastImage = null;
        this.headerToken = "";
        this.profile = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            password: [''],
            phone_number: ['', Validators.required],
            alternate_email_1: [''],
            alternate_phone_number_1: [''],
            current_address: [''],
            owner_two_first_name: [''],
            owner_two_last_name: [''],
            owner_two_nick_name: [''],
            owner_two_email: [''],
            owner_two_password: [''],
            owner_two_alternate_email: [''],
            owner_two_phone_number: [''],
            owner_two_alternate_phone_number: [''],
            owner_three_first_name: [''],
            owner_three_last_name: [''],
            owner_three_nick_name: [''],
            owner_three_email: [''],
            owner_three_password: [''],
            owner_three_alternate_email: [''],
            owner_three_phone_number: [''],
            owner_three_alternate_phone_number: ['']
        });
        this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            _this.headerToken = auth_user_token.token_type + " " + auth_user_token.access_token;
        });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter ProfilePage');
        this.clearAndGetProfile();
        this.service.getFcmToken("Profile");
        this.service.watchFcmNotifications();
    };
    ProfilePage.prototype.clearAndGetProfile = function () {
        this.user = "";
        this.getProfile();
    };
    ProfilePage.prototype.getProfile = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.profile().then(function (response) {
                console.log(response);
                _this.user = response.data;
                _this.profile.patchValue(response.data);
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
    ProfilePage.prototype.updateProfile = function () {
        var _this = this;
        try {
            this.hasError = 0;
            this.showSpinner = true;
            this.service.updateprofile(this.profile.value).then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                console.log(response);
                _this.hasError = 0;
            }).catch(function (error) {
                _this.showSpinner = false;
                _this.hasError = 1;
                console.log(_this.errors);
                if (error.error.error == 1) {
                    _this.errors = error.error.errors;
                    console.log(_this.errors.first_name);
                }
            });
        }
        catch (e) {
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    ProfilePage.prototype.chooseImage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.actionHandler(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.actionHandler(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.actionHandler = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    ProfilePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ProfilePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            _this.uploadImage();
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    ProfilePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    ProfilePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ProfilePage.prototype.uploadImage = function () {
        var _this = this;
        if (this.headerToken) {
            // Destination URL
            var url = this.service.apiUploadUserAvatar;
            // File for Upload
            var targetPath = this.pathForImage(this.lastImage);
            // File name only
            var filename = this.lastImage;
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                headers: { 'Authorization': this.headerToken },
                params: { 'type': 'Profile', 'file': filename, 'fileName': filename },
            };
            var fileTransfer = this.transfer.create();
            this.loading = this.loadingCtrl.create({
                content: 'Uploading...',
            });
            this.loading.present();
            // Use the FileTransfer to upload the image
            console.log(targetPath);
            fileTransfer.upload(targetPath, encodeURI(url), options).then(function (data) {
                if (data.response) {
                    console.log("Image", JSON.stringify(data));
                    console.log("Image", JSON.parse(data.response).data.avatar);
                    _this.user.avatar = JSON.parse(data.response).data.avatar;
                }
                console.log(JSON.stringify(data));
                _this.loading.dismissAll();
                _this.presentToast('Image succesful uploaded.');
            }, function (err) {
                console.log(JSON.stringify(err));
                _this.loading.dismissAll();
                _this.presentToast('Error while uploading file.');
            });
        }
    };
    ProfilePage.prototype.back = function () {
        this.navCtrl.push(TabsPage);
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
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
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map