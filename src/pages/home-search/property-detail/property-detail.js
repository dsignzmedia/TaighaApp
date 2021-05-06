var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewImagePage } from '../view-image/view-image';
import { RequestTourPage } from '../request-tour/request-tour';
import { ServiceProvider } from '../../../providers/service/service';
var PropertyDetailPage = /** @class */ (function () {
    function PropertyDetailPage(viewCtrl, navCtrl, navParams, modalCtrl, service) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        // financial
        this.requestType = 'listings';
        this.generalClicked = true;
        this.residenceClicked = false;
        this.featuresClicked = false;
        this.historyClicked = false;
        this.comparableClicked = false;
        this.financialClicked = false;
        this.propertyshowSpinner = false;
        this.property = [];
        this.propertyRmls = [];
        this.propertyHistories = [];
        this.propertySimilar = [];
        this.propertyImage = [];
        this.showContent = 'block';
        this.openArray = new Array();
        this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
        this.residencecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        this.featurescollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        this.historycollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        this.comparablecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        this.financialcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        this.propertyId = this.navParams.get('propertyId');
        this.openArray = this.navParams.get('openArray');
        console.log(this.openArray);
        console.log(this.propertyId);
        this.getProperty();
        this.propertyshowSpinner = true;
    }
    PropertyDetailPage_1 = PropertyDetailPage;
    PropertyDetailPage.prototype.getProperty = function () {
        var _this = this;
        try {
            this.service.singleproperty(this.propertyId).then(function (response) {
                _this.showContent = "block";
                console.log(response);
                _this.property = response.data;
                _this.propertyHistories = response.data.histories;
                _this.propertyRmls = response.data.rmls_property;
                console.log(_this.propertyRmls.Latitude);
                console.log(_this.propertyRmls.Longitude);
                _this.propertySimilar = response.data.similarLisitings;
                _this.propertyImage = response.data.rmls_property_images;
                _this.propertyshowSpinner = false;
                _this.loadMap();
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    PropertyDetailPage.prototype.viewProperty = function (propertyId) {
        this.navCtrl.push(PropertyDetailPage_1, { propertyId: propertyId });
    };
    PropertyDetailPage.prototype.generalButtons = function () {
        if (this.generalClicked === undefined) {
            this.generalClicked = true;
            this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.generalClicked === true) {
            this.generalClicked = false;
            this.generalcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.generalClicked === false) {
            this.generalClicked = true;
            this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.residenceButtons = function () {
        if (this.residenceClicked === undefined) {
            this.residenceClicked = true;
            this.residencecollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.residenceClicked === true) {
            this.residenceClicked = false;
            this.residencecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.residenceClicked === false) {
            this.residenceClicked = true;
            this.residencecollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.featuresButtons = function () {
        if (this.featuresClicked === undefined) {
            this.featuresClicked = true;
            this.featurescollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.featuresClicked === true) {
            this.featuresClicked = false;
            this.featurescollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.featuresClicked === false) {
            this.featuresClicked = true;
            this.featurescollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.financialButtons = function () {
        if (this.financialClicked === undefined) {
            this.financialClicked = true;
            this.financialcollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.financialClicked === true) {
            this.financialClicked = false;
            this.financialcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.financialClicked === false) {
            this.financialClicked = true;
            this.financialcollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.historyButtons = function () {
        if (this.historyClicked === undefined) {
            this.historyClicked = true;
            this.historycollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.historyClicked === true) {
            this.historyClicked = false;
            this.historycollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.historyClicked === false) {
            this.historyClicked = true;
            this.historycollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.comparableButtons = function () {
        if (this.comparableClicked === undefined) {
            this.comparableClicked = true;
            this.comparablecollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
        else if (this.comparableClicked === true) {
            this.comparableClicked = false;
            this.comparablecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
        }
        else if (this.comparableClicked === false) {
            this.comparableClicked = true;
            this.comparablecollapseIcon = 'assets/imgs/up-arrow-white.svg';
        }
    };
    PropertyDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PropertyDetailPage');
    };
    PropertyDetailPage.prototype.loadMap = function () {
        var lat = this.propertyRmls.Latitude;
        var lng = this.propertyRmls.Longitude;
        var address = this.propertyRmls.FullStreetAddress;
        console.log(lat + lng);
        var latLng = new google.maps.LatLng(lat, lng);
        var icon = {
            url: 'assets/imgs/map.png',
            scaledSize: new google.maps.Size(30, 40),
        };
        var mapOptions = {
            center: latLng,
            zoom: 15,
            icon: icon,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.propertymap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var locations = [
            [address, lat, lng, 4]
        ];
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon,
                map: this.propertymap
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(this.propertymap, marker);
                };
            })(marker, i));
        }
    };
    PropertyDetailPage.prototype.goBack = function () {
        // this.navCtrl.pop(); goBack
        //  this.navCtrl.pop(); 
        // this.viewCtrl.dismiss({
        //           paraArray : this.openArray
        //      })
        this.viewCtrl.dismiss({
            searchData1: this.openArray.toString(),
            //  searchData:  {
            searchTearm: this.openArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.openArray,
        });
    };
    PropertyDetailPage.prototype.viewimage = function (propertyId) {
        this.modalCtrl.create(ViewImagePage, { propertyId: propertyId }).present();
    };
    PropertyDetailPage.prototype.request = function (data) {
        this.modalCtrl.create(RequestTourPage, { Requestdata: data }).present();
        // this.modalCtrl.create(RequestTourPage(data)).present();
    };
    var PropertyDetailPage_1;
    __decorate([
        ViewChild('propertymap'),
        __metadata("design:type", ElementRef)
    ], PropertyDetailPage.prototype, "mapElement", void 0);
    PropertyDetailPage = PropertyDetailPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-property-detail',
            templateUrl: 'property-detail.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams,
            ModalController,
            ServiceProvider])
    ], PropertyDetailPage);
    return PropertyDetailPage;
}());
export { PropertyDetailPage };
//# sourceMappingURL=property-detail.js.map