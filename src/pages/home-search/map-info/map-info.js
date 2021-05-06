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
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
/**
 * Generated class for the MapInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapInfoPage = /** @class */ (function () {
    function MapInfoPage(navCtrl, navParams, viewCtrl, modalCtrl, menuCtrl, service, storage, localstorage, popover) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.service = service;
        this.storage = storage;
        this.localstorage = localstorage;
        this.popover = popover;
        this.property = [];
        this.propertyRmls = [];
        this.propertyImage = [];
        this.searchArray = new Array();
        this.paraArray = "";
        this.showSearchAll = 'flex';
        this.showSearchMore = 'none';
        this.clickMorescroll = 'none';
        this.showSpinner = true;
        this.properties = [];
        this.showSpinnerProperty = false;
        this.currentPage = 1;
        this.searchArrayLast = new Array();
        this.totalPages = 0;
        this.totalRecords = 0;
        console.log(this.navParams.get('propertyId'));
        this.propertyId = this.navParams.get('propertyId');
        this.getProperty();
    }
    MapInfoPage.prototype.ngOnInit = function () {
    };
    MapInfoPage.prototype.ClosePopover = function () {
        //  this.popover.dismiss();
    };
    MapInfoPage.prototype.bodyAction = function () {
        //  this.modalCtrl.dismiss();
        // this.popover.dismiss();
        // if (this.popoverCtrl.dismiss());
    };
    MapInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapInfoPage');
    };
    MapInfoPage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    // openProperty(){
    // 	this.navCtrl.push(PropertyDetailPage, { propertyId : this.propertyId}); 
    // }
    MapInfoPage.prototype.openProperty = function () {
        var _this = this;
        var openArray = this.searchArray;
        // this.navCtrl.push(PropertyDetailPage, { propertyId : propertyId, openArray : openArray}); 
        var addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId: this.propertyId, openArray: openArray });
        addWeatherModal.present();
        //  addWeatherModal.dismiss();
        addWeatherModal.onDidDismiss(function (data) {
            console.log("Data =>", data); //This will log the form entered by user in add modal.
            _this.showSearchMore = 'none';
            _this.showSearchAll = 'none';
            if (data == undefined) {
                _this.showSearchMore = 'none';
                _this.showSearchAll = 'flex';
                _this.clickMorescroll = '';
                console.log(_this.searchArray);
            }
            else {
                _this.showSpinnerProperty = true;
                console.log(data);
                _this.paraArray = data;
                _this.searchArray = data.searchArraydata;
                // if (this.searchArray.indexOf(val) === -1) this.searchArray.push(val);
                console.log(_this.searchArray);
                if (_this.searchArray.length <= 1) {
                    _this.showSearchMore = 'none';
                    _this.showSearchAll = 'flex';
                    _this.clickMorescroll = '';
                }
                else {
                    _this.showSearchMore = 'flex';
                    _this.clickMorescroll = 'click-more-scroll';
                    _this.showSearchAll = 'none';
                    console.log(_this.searchArray.length);
                    _this.searchArrayLast = [];
                    var last = _this.searchArray[_this.searchArray.length - 1];
                    if (_this.searchArrayLast.indexOf(last) === -1)
                        _this.searchArrayLast.push(last);
                    console.log(_this.searchArrayLast);
                }
                try {
                    _this.currentPage = 1;
                    console.log(_this.paraArray);
                    _this.showSpinner = true;
                    _this.service.homesearchproperties(_this.currentPage, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.properties = response.data;
                        _this.totalPages = response.totalPages;
                        _this.totalRecords = response.totalRecords;
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                    }).catch(function (error) {
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                        // console.log(error);
                    });
                }
                catch (e) {
                    _this.showSpinnerProperty = false;
                    _this.showSpinner = false;
                    _this.service.serverError();
                }
            }
        });
        //   addWeatherModal.present();
        // //  addWeatherModal.dismiss();
        //   addWeatherModal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
        //       console.log("Data =>", data) //This will log the form entered by user in add modal.
        //       this.showSpinnerProperty = true;
        //       // if (this.paraArray == undefined) {
        //       // }else{selectedBeds
        //         this.paraArray = data.paraArray;
        //          try {
        //     console.log(this.paraArray);
        //    // this.showSpinner = true;
        //    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then( (response : any) => {
        //       console.log( response );
        //      this.properties = response.data;
        //      this.totalPages = response.totalPages;
        //      this.totalRecords = response.totalRecords;
        //      this.showSpinnerProperty = false;
        //    }).catch( error => {
        //        this.showSpinnerProperty = false; 
        //       // console.log(error);
        //    })
        //  } catch(e) {
        //    this.showSpinnerProperty = false;
        //       this.service.serverError();
        //   }
        // })
    };
    MapInfoPage.prototype.getProperty = function () {
        var _this = this;
        try {
            this.service.singleproperty(this.propertyId).then(function (response) {
                console.log(response);
                _this.property = response.data;
                _this.propertyRmls = response.data.rmls_property;
                _this.propertyImage = response.data.rmls_property_images;
                _this.propertyimg = _this.propertyImage[0].image;
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    MapInfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-map-info',
            templateUrl: 'map-info.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            ModalController,
            MenuController,
            ServiceProvider,
            StorageProvider,
            Storage,
            PopoverController])
    ], MapInfoPage);
    return MapInfoPage;
}());
export { MapInfoPage };
//# sourceMappingURL=map-info.js.map