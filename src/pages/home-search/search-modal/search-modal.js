var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
import { Searchbar } from 'ionic-angular';
/**
 * Generated class for the SearchModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchModalPage = /** @class */ (function () {
    function SearchModalPage(navCtrl, navParams, viewCtrl, modalCtrl, menuCtrl, service, storage, localstorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.service = service;
        this.storage = storage;
        this.localstorage = localstorage;
        this.searchArray = new Array();
        this.openArray = new Array();
        this.searchTearm = '97229';
        this.requestType = 'listings';
        this.showSearchLoading = 'none';
        this.showSearchPanel = 'none';
        this.searchTerm = '';
        this.searchResult = [];
        this.searchArrayLast = new Array();
        this.showSearchAll = 'block';
        this.clickMorescroll = 'none';
        this.hideAfterFive = 'block';
        this.showAfterFive = 'none';
        this.currentPage = 1;
        this.paraArray = [];
        this.valWithString = "";
        // this.searchbar.setFocus();
        if (this.searchArray.indexOf('97229') === -1)
            this.searchArray.push('97229');
        // if (this.searchArray.indexOf('98404') === -1) this.searchArray.push('98404');
        if (this.navParams.get('openArray')) {
            this.openArray = this.navParams.get('openArray');
            console.log(this.openArray);
            this.searchArray = this.openArray;
            console.log(this.openArray.length);
            if (this.openArray.length >= 5) {
                this.hideAfterFive = 'none';
                this.showAfterFive = 'block';
            }
            else {
                this.hideAfterFive = 'block';
                this.showAfterFive = 'none';
            }
        }
        console.log(this.searchArray);
    }
    SearchModalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            //   	Keyboard.show(); 
            _this.searchbarfocus();
        }, 1000);
        console.log('ionViewDidLoad SearchModalPage');
    };
    SearchModalPage.prototype.searchbarfocus = function () {
        this.searchbar.setFocus();
        console.log('checkBlur');
    };
    SearchModalPage.prototype.checkBlur = function () {
        console.log('checkBlur');
        // this.searchbar = "987";
    };
    SearchModalPage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //  searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
    };
    SearchModalPage.prototype.clearAll = function () {
        this.searchArray = [];
        this.hideAfterFive = 'block';
        this.showAfterFive = 'none';
    };
    SearchModalPage.prototype.search = function (ev) {
        console.log(ev.target.value);
        if (this.searchArray.indexOf(ev.target.value) === -1)
            this.searchArray.push(ev.target.value);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //     searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
    };
    SearchModalPage.prototype.getByZipcode = function (val) {
        this.searchbar.clearInput(null);
        this.showSearchPanel = 'none';
        console.log(val);
        if (this.searchArray.indexOf(val) === -1)
            this.searchArray.push(val);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //     searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
    };
    SearchModalPage.prototype.getByAddress = function (propertyId) {
        this.navCtrl.push(PropertyDetailPage, { propertyId: propertyId });
    };
    SearchModalPage.prototype.getByPlaces = function (city, country) {
        //   this.searchbar.clearInput(null);
        // //  this.valWithString = val+' Elementary School' ;
        //   console.log((city.match(/\w+/g).slice(0,5).join(' ')) );
        console.log(city);
        this.searchbar.clearInput(null);
        this.valWithString = city.replace(/,/g, '-');
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray.toString());
        console.log(this.searchArray);
        if (this.searchArray.length > 1) {
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //   searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
        // after clicked zipcode from search (property reload) ----
    };
    SearchModalPage.prototype.getByElementary = function (val) {
        this.searchbar.clearInput(null);
        this.valWithString = val + ' Elementary School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //   searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
        // after clicked zipcode from search (property reload)
        // try {
        //    let urlPara: any = {
        //     searchTearm: this.searchArray.toString(),
        //     requestType: this.requestType,
        //    }
        //   this.service.homesearchproperties(this.currentPage, urlPara).then( (response : any) => {
        //      console.log( response );
        //     this.properties = response.data;
        //     this.totalPages = response.totalPages;
        //     this.totalRecords = response.totalRecords;
        //     this.showSpinnerProperty = false;
        //   }).catch( error => {
        //       this.showSpinnerProperty = false;
        //   })
        // } catch(e) {
        //   this.showSpinnerProperty = false;
        //      this.service.serverError();
        //  }
        // after clicked zipcode from search (property reload) ----
    };
    SearchModalPage.prototype.getByHigh = function (val) {
        this.searchbar.clearInput(null);
        this.valWithString = val + ' High School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //     searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
        // after clicked zipcode from search (property reload)
        // try {
        //    let urlPara: any = {
        //     searchTearm: this.searchArray.toString(),
        //     requestType: this.requestType,
        //    }
        //   this.showSpinnerProperty = true;
        //   this.service.homesearchproperties(this.currentPage, urlPara).then( (response : any) => {
        //      console.log( response );
        //     this.properties = response.data;
        //     this.totalPages = response.totalPages;
        //     this.totalRecords = response.totalRecords;
        //     this.showSpinnerProperty = false;
        //   }).catch( error => {
        //       this.showSpinnerProperty = false;
        //   })
        // } catch(e) {
        //   this.showSpinnerProperty = false;
        //      this.service.serverError();
        //  }
        // after clicked zipcode from search (property reload) ----
    };
    SearchModalPage.prototype.getByMiddle = function (val) {
        this.searchbar.clearInput(null);
        this.valWithString = val + ' Middle School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        this.viewCtrl.dismiss({
            searchData1: this.searchArray.toString(),
            //       searchData:  {
            searchTearm: this.searchArray.toString(),
            requestType: this.requestType,
            searchArraydata: this.searchArray,
        });
        // after clicked zipcode from search (property reload)
        // try {
        //    let urlPara: any = {
        //     searchTearm: this.searchArray.toString(),
        //     requestType: this.requestType,
        //    }
        //   this.showSpinnerProperty = true;
        //   this.service.homesearchproperties(this.currentPage, urlPara).then( (response : any) => {
        //      console.log( response );
        //     this.properties = response.data;
        //     this.totalPages = response.totalPages;
        //     this.totalRecords = response.totalRecords;
        //     this.showSpinnerProperty = false;
        //   }).catch( error => {
        //       this.showSpinnerProperty = false;
        //   })
        // } catch(e) {
        //   this.showSpinnerProperty = false;
        //      this.service.serverError();
        //  }
        // after clicked zipcode from search (property reload) ----
    };
    SearchModalPage.prototype.setFilteredLocations = function () {
        var _this = this;
        console.log(this.searchTerm);
        if (this.searchTerm == '') {
            // code...
        }
        else {
            this.showSearchLoading = 'block';
            this.showSearchPanel = 'block';
            try {
                console.log(this.searchArray);
                // if (this.searchArray.length <= 1) {
                // 	console.log("more");
                // }else{
                // 	console.log("less");
                // }
                this.service.searchBy(this.searchTerm, this.searchArray.length).then(function (response) {
                    console.log(_this.searchTerm);
                    console.log(response);
                    if (_this.searchTerm == '') {
                        _this.searchResult = '';
                    }
                    else {
                        _this.searchResult = response.data;
                    }
                    console.log(_this.searchResult);
                    _this.showSearchLoading = 'none';
                    // if the value is an empty string don't filter the items
                    // if (val && val.trim() != '') {
                    //   this.searchResult = this.searchResult.zips.filter((item) => {
                    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    //   })
                    // }
                    //     this.filterData = this.searchResult.zips.filter((searchResult2) => {
                    //   return searchResult2.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
                    // });
                }).catch(function (error) {
                    console.log(error);
                });
            }
            catch (e) {
                this.service.serverError();
            }
        }
    };
    SearchModalPage.prototype.bodyAction = function () {
        this.showSearchPanel = 'none';
        this.searchbar.clearInput(null);
    };
    SearchModalPage.prototype.clearTerm1 = function (val) {
        this.showSearchPanel = 'none';
        console.log(val);
        var index = this.searchArray.indexOf(val);
        if (index !== -1) {
            this.searchArray.splice(index, 1);
        }
        console.log(this.searchArray);
        this.searchArrayLast = [];
        var last = this.searchArray[this.searchArray.length - 1];
        if (this.searchArrayLast.indexOf(last) === -1)
            this.searchArrayLast.push(last);
        console.log(this.searchArrayLast);
        console.log("searchArray.length " + this.searchArray.length);
        if (this.searchArray.length >= 5) {
            this.hideAfterFive = 'none';
            this.showAfterFive = 'block';
        }
        else {
            this.hideAfterFive = 'block';
            this.showAfterFive = 'none';
        }
        if (this.searchArray.length == 1) {
            this.showSearchAll = 'block';
            this.clickMorescroll = '';
        }
        if (this.searchArray.length == 0) {
            this.hideAfterFive = 'block';
            this.showAfterFive = 'none';
        }
        // after clicked zipcode from search (property reload)
        // try {
        //    let urlPara: any = {
        //     searchTearm: this.searchArray.toString(),
        //     requestType: this.requestType,
        //    }
        //   this.service.homesearchproperties(this.currentPage, urlPara).then( (response : any) => {
        //      console.log( response );
        //     this.properties = response.data;
        //     // this.totalPages = response.totalPages;
        //     // this.totalRecords = response.totalRecords;
        //   }).catch( error => {
        //      // console.log(error);
        //   })
        // } catch(e) {
        //      this.service.serverError();
        //  }
        // after clicked zipcode from search (property reload) ----
    };
    __decorate([
        ViewChild('searchbar'),
        __metadata("design:type", Searchbar)
    ], SearchModalPage.prototype, "searchbar", void 0);
    SearchModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search-modal',
            templateUrl: 'search-modal.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            ModalController,
            MenuController,
            ServiceProvider,
            StorageProvider,
            Storage])
    ], SearchModalPage);
    return SearchModalPage;
}());
export { SearchModalPage };
//# sourceMappingURL=search-modal.js.map