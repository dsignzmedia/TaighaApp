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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { DatePipe } from '@angular/common';
var NewpropertiesPage = /** @class */ (function () {
    function NewpropertiesPage(navCtrl, service, alertCtrl, datepipe, navParams) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.datepipe = datepipe;
        this.navParams = navParams;
        this.urls = [];
        this.multiple = false;
        this.showSpinner = true;
        this.propertyTypes = [];
        this.updatedByUsers = [];
        this.preparedcommunityAmenities = [];
        this.appliedcommunityAmenities = [];
        this.preparedunitAmenities = [];
        this.appliedunitAmenities = [];
        this.preparedpets = [];
        this.appliedpets = [];
        this.preparedleaseTerms = [];
        this.appliedleaseTerms = [];
        this.id = 0;
        this.address = "";
        this.lattitude = "";
        this.longitude = "";
        this.city = "";
        this.state = "";
        this.zip = "";
        this.country = "";
        this.unit = "";
        this.nick_name = "";
        this.property_type = "";
        this.hoa_name = "";
        this.hoa_website = "";
        this.mailbox_location = "";
        this.mailbox_number = "";
        this.year_built = "";
        this.square_feet = "";
        this.bedrooms = "";
        this.full_bath = "";
        this.half_bath = "";
        this.garages = "";
        this.parking = "";
        this.laundry = "";
        this.listing_time = "";
        this.date_available = "";
        this.expected_rent_price_range = "";
        this.hoa_contact_name = "";
        this.phone = "";
        this.email = "";
        this.property = "";
        this.appliedUtilityInfo = [];
        this.preparedUtilityInfo = [];
        this.formData = new FormData();
        this.id = this.navParams.get('propertyId');
    }
    NewpropertiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewpropertiesPage');
        var __this = this;
        console.log('ionViewDidLoad YourLocationPage');
        var googleplace = new google.maps.places.Autocomplete(document.getElementById('autocomplete').getElementsByTagName('input')[0]);
        google.maps.event.addListener(googleplace, 'place_changed', function () {
            console.log(googleplace);
            console.log("Triggered");
            var place = googleplace.getPlace();
            __this.address = place.formatted_address;
            __this.lattitude = place.geometry.location.lat();
            __this.longitude = place.geometry.location.lng();
            console.log(__this.address);
            /*var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();*/
            var address = place.address_components;
            address.forEach(function (component) {
                var types = component.types;
                if (types.indexOf('locality') > -1) {
                    __this.city = component.long_name;
                }
                if (types.indexOf('postal_town') > -1) {
                    __this.city = component.long_name;
                }
                if (types.indexOf('administrative_area_level_1') > -1) {
                    __this.state = component.long_name;
                }
                if (types.indexOf('postal_code') > -1) {
                    __this.zip = component.long_name;
                }
                if (types.indexOf('country') > -1) {
                    __this.country = component.long_name;
                }
            });
        });
    };
    NewpropertiesPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter NewpropertiesPage');
        this.clearAndGetOptions();
    };
    NewpropertiesPage.prototype.clearAndGetOptions = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.propertyCreateOptions().then(function (response) {
                console.log(response);
                _this.propertyTypes = response.data.propertyTypes;
                _this.updatedByUsers = response.data.properties;
                _this.preparedcommunityAmenities = response.data.communityAmenities;
                _this.preparedunitAmenities = response.data.unitAmenities;
                _this.preparedpets = response.data.pets;
                _this.preparedleaseTerms = response.data.leaseTerms;
                _this.preparedUtilityInfo = response.data.utilityinfo;
                _this.showSpinner = false;
                if (_this.id != 0) {
                    _this.getEditProperty();
                }
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
    NewpropertiesPage.prototype.getEditProperty = function () {
        var _this = this;
        try {
            this.showSpinner = true;
            this.service.propertyedit(this.id).then(function (response) {
                console.log(response);
                _this.showSpinner = false;
                _this.appliedcommunityAmenities = response.data.communityAmenities;
                _this.appliedleaseTerms = response.data.leaseTerms;
                _this.appliedunitAmenities = response.data.unitAmenities;
                _this.appliedpets = response.data.pets;
                _this.appliedUtilityInfo = response.data.utilityinfo;
                _this.property = response.data.property;
                _this.applyPropertyfields();
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
    NewpropertiesPage.prototype.applyPropertyfields = function () {
        this.address = this.property.address;
        this.lattitude = this.property.lattitude;
        this.longitude = this.property.longitude;
        this.city = this.property.city;
        this.state = this.property.state;
        this.zip = this.property.zip;
        this.country = this.property.country;
        this.unit = this.property.unit;
        this.nick_name = this.property.nick_name;
        this.property_type = this.property.property_type;
        this.hoa_name = this.property.hoa_name;
        this.hoa_website = this.property.hoa_website;
        this.mailbox_location = this.property.mailbox_location;
        this.mailbox_number = this.property.mailbox_number;
        this.year_built = this.property.year_built;
        this.square_feet = this.property.square_feet;
        this.bedrooms = this.property.bedrooms;
        this.half_bath = this.property.half_bath;
        this.full_bath = this.property.full_bath;
        this.garages = this.property.garages;
        this.parking = this.property.parking;
        this.laundry = this.property.laundry;
        this.listing_time = this.property.listing_time;
        this.date_available = this.property.date_available;
        this.expected_rent_price_range = this.property.expected_rent_price_range;
        this.hoa_contact_name = this.property.hoa_contact_name;
        this.phone = this.property.phone;
        this.email = this.property.email;
    };
    NewpropertiesPage.prototype.openPopup = function (popup) {
        var _this = this;
        this.current_popup = popup;
        var alert = this.alertCtrl.create({
            title: popup,
            cssClass: 'tagsinputAlert',
            inputs: [
                {
                    name: 'category',
                    placeholder: 'Add New'
                }
            ],
            buttons: [
                {
                    text: 'Add New',
                    handler: function (data) {
                        if (_this.current_popup.toLowerCase() == 'unit amenities') {
                            //this.appliedunitAmenities.push(data.category);
                            _this.appliedunitAmenities.push({ 'display': data.category, 'value': data.category });
                        }
                        else if (_this.current_popup.toLowerCase() == 'community amenities') {
                            _this.appliedcommunityAmenities.push({ 'display': data.category, 'value': data.category });
                            console.log(_this.appliedcommunityAmenities);
                        }
                        else if (_this.current_popup.toLowerCase() == 'preferred lease terms') {
                            //this.appliedleaseTerms.push(data.category);
                            _this.appliedleaseTerms.push({ 'display': data.category, 'value': data.category });
                        }
                        else if (_this.current_popup.toLowerCase() == 'pets') {
                            //this.appliedpets.push(data.category);
                            _this.appliedpets.push({ 'display': data.category, 'value': data.category });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    NewpropertiesPage.prototype.changeListener = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files) {
            var _loop_1 = function (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log(file.name);
                    _this.urls.push({ url: e.target.result, name: file.name });
                };
                reader.readAsDataURL(file);
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _loop_1(file);
            }
        }
        //console.log(JSON.stringify(this.urls));
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        if (fileCount > 0) { // a file was selected
            for (var i = 0; i < fileCount; i++) {
                this.formData.append('photos[]', inputEl.files.item(i));
            }
        }
    };
    NewpropertiesPage.prototype.removeImage = function (index, name) {
        var _this = this;
        console.log(index);
        this.formData.append("address", "test");
        var elem = document.getElementById('uploaded_image_' + index);
        elem.parentNode.removeChild(elem);
        var files = this.formData.getAll("photos[]");
        this.formData.delete("photos[]");
        files.forEach(function (v, i) {
            console.log(v['name']);
            if (v['name'] != name) {
                _this.formData.append("photos[]", v);
            }
        });
        return false;
    };
    NewpropertiesPage.prototype.removeUploadedImage = function (id) {
        var _this = this;
        var elem = document.getElementById('uploaded_image_previous' + id);
        elem.parentNode.removeChild(elem);
        try {
            this.showSpinner = true;
            this.service.propertyeimagedelete(id).then(function (response) {
                console.log(response);
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
        return false;
    };
    NewpropertiesPage.prototype.cleanString = function (string) {
        if (string != undefined && string != "" && string != null) {
            return string;
        }
        return "";
    };
    NewpropertiesPage.prototype.store = function () {
        var _this = this;
        var listing_time = (this.listing_time) ? this.datepipe.transform(this.listing_time, 'MM/dd/yyyy') : "";
        var date_available = (this.date_available) ? this.datepipe.transform(this.date_available, 'MM/dd/yyyy') : "";
        this.formData.append('id', this.id);
        this.formData.append('address', this.cleanString(this.address));
        this.formData.append('lattitude', this.cleanString(this.lattitude));
        this.formData.append('longitude', this.cleanString(this.longitude));
        this.formData.append('city', this.cleanString(this.city));
        this.formData.append('state', this.cleanString(this.state));
        this.formData.append('zip', this.cleanString(this.zip));
        this.formData.append('country', this.cleanString(this.country));
        this.formData.append('unit', this.cleanString(this.unit));
        this.formData.append('nick_name', this.cleanString(this.nick_name));
        this.formData.append('property_type', this.cleanString(this.property_type));
        this.formData.append('hoa_name', this.cleanString(this.hoa_name));
        this.formData.append('hoa_website', this.cleanString(this.hoa_website));
        this.formData.append('mailbox_location', this.cleanString(this.mailbox_location));
        this.formData.append('mailbox_number', this.cleanString(this.mailbox_number));
        this.formData.append('year_built', this.cleanString(this.year_built));
        this.formData.append('square_feet', this.cleanString(this.square_feet));
        this.formData.append('bedrooms', this.cleanString(this.bedrooms));
        this.formData.append('half_bath', this.cleanString(this.half_bath));
        this.formData.append('full_bath', this.cleanString(this.full_bath));
        this.formData.append('garages', this.cleanString(this.garages));
        this.formData.append('parking', this.cleanString(this.parking));
        this.formData.append('laundry', this.cleanString(this.laundry));
        this.formData.append('listing_time', listing_time);
        this.formData.append('date_available', date_available);
        this.formData.append('expected_rent_price_range', this.cleanString(this.expected_rent_price_range));
        this.formData.append('hoa_contact_name', this.cleanString(this.hoa_contact_name));
        this.formData.append('phone', this.cleanString(this.phone));
        this.formData.append('email', this.cleanString(this.email));
        if (this.appliedUtilityInfo.length > 0) {
            this.appliedUtilityInfo.forEach(function (info) {
                if (info.value != "" && info.value != null && info.value != undefined) {
                    _this.formData.append('utility_info[]', info.value);
                }
            });
        }
        else {
            this.formData.append('utility_info[]', "");
        }
        if (this.appliedunitAmenities.length > 0) {
            this.appliedunitAmenities.forEach(function (info) {
                if (info.value != "" && info.value != null && info.value != undefined) {
                    _this.formData.append('unitamenities[]', info.value);
                }
            });
        }
        else {
            this.formData.append('unitamenities[]', "");
        }
        if (this.appliedcommunityAmenities.length > 0) {
            this.appliedcommunityAmenities.forEach(function (info) {
                if (info.value != "" && info.value != null && info.value != undefined) {
                    _this.formData.append('communityamenities[]', info.value);
                }
            });
        }
        else {
            this.formData.append('communityamenities[]', "");
        }
        if (this.appliedpets.length > 0) {
            this.appliedpets.forEach(function (info) {
                if (info.value != "" && info.value != null && info.value != undefined) {
                    _this.formData.append('pets[]', info.value);
                }
            });
        }
        else {
            this.formData.append('pets[]', "");
        }
        if (this.appliedleaseTerms.length > 0) {
            this.appliedleaseTerms.forEach(function (info) {
                if (info.value != "" && info.value != null && info.value != undefined) {
                    _this.formData.append('lease-terms[]', info.value);
                }
            });
        }
        else {
            this.formData.append('lease-terms[]', "");
        }
        this.service.showload();
        this.service.propertystore(this.formData).then(function (response) {
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
    NewpropertiesPage.prototype.onItemAddedCommunity = function (event) {
        //this.appliedcommunityAmenities.push(event.value);
        //console.log(event);
    };
    NewpropertiesPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NewpropertiesPage.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], NewpropertiesPage.prototype, "inputEl", void 0);
    NewpropertiesPage = __decorate([
        Component({
            selector: 'page-newproperties',
            templateUrl: 'newproperties.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ServiceProvider,
            AlertController,
            DatePipe,
            NavParams])
    ], NewpropertiesPage);
    return NewpropertiesPage;
}());
export { NewpropertiesPage };
//# sourceMappingURL=newproperties.js.map