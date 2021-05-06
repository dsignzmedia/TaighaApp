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
import { NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { SearchModalPage } from '../search-modal/search-modal';
import { MapInfoPage } from '../map-info/map-info';
import { FilterPage } from '../filter/filter';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
import { Searchbar } from 'ionic-angular';
// @IonicPage()
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, viewCtrl, modalCtrl, menuCtrl, service, storage, localstorage, popover) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.service = service;
        this.storage = storage;
        this.localstorage = localstorage;
        this.popover = popover;
        this.showList = 'block';
        this.showCard = 'block';
        this.showMap = 'block';
        this.showListbtn = 'block';
        this.showCardbtn = 'block';
        this.showMapbtn = 'block';
        this.getstyle = 'block';
        this.showSearchLoading = 'none';
        this.showSearchLoadingText = 'none';
        this.showSearchAll = 'flex';
        this.showSearchMore = 'none';
        this.clickMorescroll = 'none';
        this.showSearchPanel = 'none';
        this.favoriteActive = '';
        this.currentPage = 1;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.totalPagesmap = 0;
        this.totalRecordsmap = 0;
        this.showSpinner = true;
        this.showSpinnerProperty = false;
        this.filters = "";
        this.filterItems = "";
        this.valWithString = "";
        this.properties = [];
        this.searchArray = new Array();
        this.searchArrayLast = new Array();
        this.searchResult = [];
        this.propertiesmap = [];
        this.forinfi = [];
        this.isOnScroll = false;
        this.searchTearm = '97229';
        this.requestType = 'listings';
        this.allData = []; //Store all data from provider
        this.filterData = []; //Store filtered data
        this.searchTerm = '';
        this.MainSearch = 'show-main-search';
        this.MainSearch2 = 'hide-main-search';
        this.paraArray = "";
        this.paraArraymap = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.selectedBeds = "";
        this.selectedBaths = "";
        this.searchData = "";
        this.optionResult = [];
        this.optionResultprptycate = [];
        this.optionResultstatus = [];
        this.optionResultProperty = [];
        this.optionResultBaths = [];
        this.optionResultBeds = [];
        this.optionResultFavFeat = [];
        this.optionResultMaxsize = [];
        this.optionResultMinsize = [];
        this.optionResultOpenhouse = [];
        this.optionResultPricechange = [];
        this.searchData = this.navParams.get('searchData');
        // this.paraArray = this.navParams.get('paraArray');
        console.log(this.searchData);
        this.getstyle = 'none';
        this.showCardbtn = 'none';
        this.showList = 'none';
        this.showCard = 'block';
        this.showMap = 'none';
        // this.storage.setStorage('searchlist', this.searchTearm);
        // this.storage.getStorage('searchlist').then((searchlist) => {
        //     console.log(searchlist);
        //   });
        if (this.searchArray.indexOf('97229') === -1)
            this.searchArray.push('97229');
        console.log(this.searchArray);
        this.getOption();
    }
    SearchPage.prototype.ionViewWillEnter = function () {
        this.clearAndGetProperties();
    };
    SearchPage.prototype.openSearch = function () {
        var _this = this;
        // this.viewCtrl.dismiss({
        //          searchData1 : this.searchArray.toString(),
        //                 searchData:  {
        //    searchTearm: this.searchArray.toString(),
        //    requestType: this.requestType,
        //    searchArraydata: this.searchArray,
        //   }
        //     })
        //     this.showSearchMore = 'none';
        // this.showSearchAll = 'flex';
        // this.clickMorescroll = '';
        var openArray = this.searchArray;
        var addWeatherModal = this.modalCtrl.create(SearchModalPage, { openArray: openArray });
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
                        var urlParamap = {
                            searchTearm: _this.paraArray.searchArraydata,
                            requestType: 'map',
                        };
                        _this.loadMap(urlParamap);
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
        // this.modalCtrl.create(SearchModalPage).present();
    };
    SearchPage.prototype.GetAllSearch = function () {
        // this.showSearchMore = 'none';
        // this.showSearchAll = 'flex';
        // this.clickMorescroll = 'click-more-scroll';
        var _this = this;
        //         let openArray =this.searchArray;
        //      let addWeatherModal = this.modalCtrl.create(SearchModalPage, {openArray : openArray});
        //   addWeatherModal.present();
        // //  addWeatherModal.dismiss();
        //   addWeatherModal.onDidDismiss(data=>{ })
        var openArray = this.searchArray;
        var addWeatherModal = this.modalCtrl.create(SearchModalPage, { openArray: openArray });
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
    };
    SearchPage.prototype.bodyAction = function () {
        this.showSearchPanel = 'none';
        this.searchbar.clearInput(null);
        //  this.modalCtrl.dismiss();
        // this.popover.dismiss();
        // if (this.popover.dismiss());
    };
    SearchPage.prototype.getByAddress = function (propertyId) {
        this.navCtrl.push(PropertyDetailPage, { propertyId: propertyId });
    };
    SearchPage.prototype.getByPlaces = function (city, country) {
        var _this = this;
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
            this.showSearchMore = 'flex';
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            this.MainSearch = 'hide-main-search';
            this.MainSearch2 = 'show-main-search';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            console.log(urlPara);
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.getByElementary = function (val) {
        var _this = this;
        this.searchbar.clearInput(null);
        this.valWithString = val + ' Elementary School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.showSearchMore = 'flex';
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            this.MainSearch = 'hide-main-search';
            this.MainSearch2 = 'show-main-search';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.getByHigh = function (val) {
        var _this = this;
        this.searchbar.clearInput(null);
        this.valWithString = val + ' High School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.showSearchMore = 'flex';
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.getByMiddle = function (val) {
        var _this = this;
        this.searchbar.clearInput(null);
        this.valWithString = val + ' Middle School';
        console.log(this.valWithString);
        this.showSearchPanel = 'none';
        if (this.searchArray.indexOf(this.valWithString) === -1)
            this.searchArray.push(this.valWithString);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.showSearchMore = 'flex';
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.getByZipcode = function (val) {
        var _this = this;
        this.searchbar.clearInput(null);
        this.showSearchPanel = 'none';
        console.log(val);
        if (this.searchArray.indexOf(val) === -1)
            this.searchArray.push(val);
        console.log(this.searchArray);
        console.log(this.searchArray.toString());
        if (this.searchArray.length > 1) {
            this.showSearchMore = 'flex';
            this.clickMorescroll = 'click-more-scroll';
            this.showSearchAll = 'none';
            console.log(this.searchArray.length);
            this.searchArrayLast = [];
            var last = this.searchArray[this.searchArray.length - 1];
            if (this.searchArrayLast.indexOf(last) === -1)
                this.searchArrayLast.push(last);
            console.log(this.searchArrayLast);
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
                // console.log(error);
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.clearTerm1 = function (val) {
        var _this = this;
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
        if (this.searchArray.length == 1) {
            this.showSearchMore = 'none';
            this.showSearchAll = 'block';
            this.clickMorescroll = '';
        }
        // after clicked zipcode from search (property reload)
        try {
            var urlPara = {
                searchTearm: this.searchArray.toString(),
                requestType: this.requestType,
            };
            this.showSpinnerProperty = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
                // console.log(error);
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.service.serverError();
        }
        // after clicked zipcode from search (property reload) ----
    };
    SearchPage.prototype.clearAndGetProperties = function () {
        this.currentPage = 1;
        this.properties = [];
        this.getProperties();
        //   this.loadMap();
        //  this.filterHomes();
        //    let modal = this.modalController.create(FilterComponent);
        // modal.onDidDismiss((data) => {
        //     console.log(data.filter);
        // });
        // this.getSearchBy();
    };
    SearchPage.prototype.filterHomes = function () {
        var _this = this;
        var addWeatherModal = this.modalCtrl.create(FilterPage);
        // addWeatherModal.present();
        //  addWeatherModal.dismiss();
        addWeatherModal.onDidDismiss(function (data) {
            console.log("Data =>", data); //This will log the form entered by user in add modal.
            _this.paraArray = data;
        });
        // try {
        //    console.log(this.paraArray);
        //   this.showSpinner = true;
        //   this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then( (response : any) => {
        //      console.log( response );
        //     this.properties = response.data;
        //     this.totalPages = response.totalPages;
        //     this.totalRecords = response.totalRecords;
        //     this.showSpinner = false;
        //   }).catch( error => {
        //       this.showSpinner = false; 
        //      // console.log(error);
        //   })
        // } catch(e) {
        //   this.showSpinner = false;
        //      this.service.serverError();
        //  }
    };
    // ForLoading(){
    //   this.showSearchLoading = 'block';
    // }
    SearchPage.prototype.ForLoading = function (val) {
        this.showSearchLoading = 'block';
        // this.filteredData =  this.data.map(data => data.articles).map(options =>
        //   options.filter(option => 
        //      option.title.toLowerCase().indexOf(val.value.toLowerCase()) > -1)
        //   )
    };
    SearchPage.prototype.searchByValue = function () {
        var _this = this;
        // this.showSearchLoadingText = 'block';
        this.showSearchPanel = 'block';
        console.log(this.searchTerm);
        try {
            this.service.searchBy(this.searchTerm, this.searchTerm.length).then(function (response) {
                console.log(_this.searchTerm);
                console.log(response);
                if (_this.searchTerm == '') {
                    _this.searchResult = '';
                }
                else {
                    _this.searchResult = response.data;
                }
                console.log(_this.searchResult);
                //   this.showSearchLoadingText = 'none';
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
    };
    SearchPage.prototype.setFilteredLocations = function () {
        var _this = this;
        if (this.searchTerm == '') {
            // code...
        }
        else {
            this.showSearchLoading = 'block';
            this.showSearchPanel = 'block';
            try {
                this.service.searchBy(this.searchTerm, this.searchTerm.length).then(function (response) {
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
    SearchPage.prototype.getItems = function (ev) {
        var _this = this;
        // set val to the value of the ev target
        var val = ev.target.value;
        try {
            this.service.searchBy(val, this.searchTerm.length).then(function (response) {
                console.log(response);
                _this.searchResult = response.data;
                // if the value is an empty string don't filter the items
                // if (val && val.trim() != '') {
                //   this.searchResult = this.searchResult.zips.filter((item) => {
                //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                //   })
                // }
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    SearchPage.prototype.getSearchBy = function () {
        var _this = this;
        try {
            this.service.searchBy('97', this.searchTerm.length).then(function (response) {
                console.log(response);
                _this.searchResult = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    SearchPage.prototype.getProperties = function () {
        var _this = this;
        try {
            var urlPara = {
                searchTearm: this.searchTearm,
                requestType: this.requestType,
            };
            console.log(urlPara);
            this.showSpinner = true;
            this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                console.log(response);
                _this.properties = response.data;
                _this.totalPages = response.totalPages;
                _this.totalRecords = response.totalRecords;
                _this.showSpinnerProperty = false;
                _this.showSpinner = false;
                var urlParamap = {
                    searchTearm: _this.searchArray,
                    requestType: 'map',
                };
                _this.loadMap(urlParamap);
            }).catch(function (error) {
                _this.showSpinnerProperty = false;
                _this.showSpinner = false;
                console.log(error);
            });
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    SearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        try {
            if (this.currentPage <= this.totalPages) {
                this.currentPage++;
                console.log(this.currentPage);
                this.isOnScroll = true;
                if (this.forinfi) {
                    this.forinfi = this.forinfi;
                    console.log(this.forinfi);
                }
                else {
                    this.forinfi = this.searchArray;
                    console.log(this.forinfi);
                }
                var urlPara = {
                    searchTearm: this.forinfi,
                    requestType: this.requestType,
                };
                console.log(urlPara);
                if (this.forscroll == 'yes') {
                    this.service.homesearchpropertiesafter(this.currentPage, this.forinfi).then(function (response) {
                        console.log(response);
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                        var nextTickets = response.data;
                        nextTickets.forEach(function (item, index) {
                            //console.log(item); // 9, 2, 5
                            _this.properties.push(item);
                        });
                        infiniteScroll.complete();
                    }).catch(function (error) {
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                        //   console.log(error);
                        infiniteScroll.complete();
                    });
                }
                else {
                    this.service.homesearchproperties(this.currentPage, urlPara).then(function (response) {
                        console.log(response);
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                        var nextTickets = response.data;
                        nextTickets.forEach(function (item, index) {
                            //console.log(item); // 9, 2, 5
                            _this.properties.push(item);
                        });
                        infiniteScroll.complete();
                    }).catch(function (error) {
                        _this.showSpinnerProperty = false;
                        _this.showSpinner = false;
                        //   console.log(error);
                        infiniteScroll.complete();
                    });
                }
            }
        }
        catch (e) {
            this.showSpinnerProperty = false;
            this.showSpinner = false;
            this.service.serverError();
        }
    };
    SearchPage.prototype.getCountry = function (id) {
        return this.properties.find(function (c) { return c.id === '19451'; });
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
        // this.getMapProperties();
    };
    SearchPage.prototype.dismissPushTab = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage.prototype.favorite = function (propertyid) {
        console.log(propertyid);
        // this.favoriteActive = 'active';
    };
    SearchPage.prototype.goToCard = function () {
        this.showList = 'none';
        this.showCard = 'block';
        this.showMap = 'none';
        this.showListbtn = 'block';
        this.showCardbtn = 'none';
        this.showMapbtn = 'block';
        this.showSpinnerProperty = false;
        this.showSpinner = false;
    };
    SearchPage.prototype.goToList = function () {
        this.showList = 'block';
        this.showCard = 'none';
        this.showMap = 'none';
        this.showListbtn = 'none';
        this.showCardbtn = 'block';
        this.showMapbtn = 'block';
        this.showSpinnerProperty = false;
        this.showSpinner = false;
    };
    SearchPage.prototype.goToMap = function () {
        // this.loadMap();
        this.showList = 'none';
        this.showCard = 'none';
        this.showMap = 'block';
        this.showListbtn = 'block';
        this.showCardbtn = 'block';
        this.showMapbtn = 'none';
        this.showSpinnerProperty = false;
        this.showSpinner = false;
        //  this.loadMap();
    };
    SearchPage.prototype.getMapProperties = function () {
        var _this = this;
        try {
            var urlPara = {
                searchTearm: this.searchTearm,
                requestType: 'map',
            };
            this.showSpinner = true;
            this.service.homesearchpropertiesmap(this.filters, urlPara).then(function (response) {
                //  console.log( response );
                _this.propertiesmap = response.data;
                _this.totalPagesmap = response.totalPages;
                _this.totalRecordsmap = response.totalRecords;
                //   console.log(this.propertiesmap.length);
            }).catch(function (error) {
                //  console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    // this.service.mapproperty(idz).then( (response : any) => {
    //   console.log(response);
    //   this.mapimage = response.data;
    //            const infowindow = new google.maps.InfoWindow({
    //                        content: contentString,
    //                        maxWidth: 400
    //                    });
    // }).catch( error => {
    //     console.log(error);
    // })
    // this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then( (response : any) => {
    //    console.log( response );
    //   this.properties = response.data;
    //   this.totalPages = response.totalPages;
    //   this.totalRecords = response.totalRecords;
    //   this.showSpinnerProperty = false;
    SearchPage.prototype.loadMapMore = function (urlParamap) {
        var _this = this;
        try {
            // let urlParamap: any = {
            //  searchTearm: this.searchArray,
            //  requestType: 'map',
            // }
            console.log(urlParamap);
            this.showSpinner = true;
            this.service.filterhomesearchpropertiesmap(this.currentPage, this.filters, urlParamap).then(function (response) {
                console.log(response);
                //   this.properties = response.data;
                //   this.totalPages = response.totalPages;
                //   this.totalRecords = response.totalRecords;
                //   this.showSpinnerProperty = false;
                // this.service.homesearchpropertiesmap(this.filters, urlParamap).then( (response : any) => {
                //   console.log( response );
                _this.propertiesmap = response.data;
                _this.totalPagesmap = response.totalPages;
                _this.totalRecordsmap = response.totalRecords;
                console.log(_this.propertiesmap[0]["Latitude"]);
                var latLng = new google.maps.LatLng(_this.propertiesmap[0]["Latitude"], _this.propertiesmap[0]["Longitude"]);
                var icon = {
                    url: 'assets/imgs/pricepin.svg',
                    scaledSize: new google.maps.Size(40, 60),
                };
                var mapOptions = {
                    center: latLng,
                    zoom: 13,
                    icon: icon,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                var locations = [
                    ['property', 45.482456, -122.7117877, 4],
                    ['property', 45.470229, -122.696662, 4],
                    ['property', 45.483585, -122.737424, 4],
                    ['property', 45.477687, -122.647817, 4],
                    ['property', 45.472210, -122.629879, 4]
                ];
                var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
                var si = [
                    { value: 1, symbol: "" },
                    { value: 1E3, symbol: "K" },
                    { value: 1E6, symbol: "M" },
                    { value: 1E9, symbol: "G" },
                    { value: 1E12, symbol: "T" },
                    { value: 1E15, symbol: "P" },
                    { value: 1E18, symbol: "E" }
                ];
                var digits = 2;
                function kFormatter(num) {
                    digits = 2;
                    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                    var i;
                    for (i = si.length - 1; i > 0; i--) {
                        if (num >= si[i].value) {
                            break;
                        }
                    }
                    if (si[i].symbol == 'K') {
                        digits = 0;
                    }
                    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
                }
                var marker, i;
                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                var _loop_1 = function () {
                    contentString = "";
                    contentString = '<div class="map_property_panel">';
                    contentString += '<figure class="cardpanel-slider " id="clickableItem">';
                    contentString += '<img class="cardpanel-slider-item imagepopup" src="assets/imgs/figure.svg" alt="">';
                    contentString += '</figure>';
                    contentString += '<div class="map_property_footer"> <div class="d-flex"><span class="map_property_price">$' + numberWithCommas(_this.propertiesmap[i]["PriceCurrentForStatus"]) + '</span>';
                    contentString += '<ul class="share-list" ><li><i ><img src="assets/imgs/iconfinder_chat_293661.svg"></i></li><li><i><img src="assets/imgs/Page-1.svg"></i></li>';
                    contentString += '</div>';
                    contentString += '<div class="map_property_list_inline">';
                    contentString += '<span class="map_property_list map_prpt_bd"><img src="assets/imgs/bed.svg" width="28" height="15" />' + (_this.propertiesmap[i]["Beds"] > 0 ? _this.propertiesmap[i]["Beds"] : "0") + '<small>bed</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/bathtube-with-shower.svg" width="17" height="17" />' + (_this.propertiesmap[i]["BathsFull"] > 0 ? _this.propertiesmap[i]["BathsFull"] : "0") + '<small>baths</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/triangular-ruler-for-school.svg" width="17" height="17" />' + (_this.propertiesmap[i]["SqFtApproximateTotal"] > 0 ? _this.propertiesmap[i]["SqFtApproximateTotal"] : "0") + '<small>sqft</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/clock.svg" width="17" height="17" />-<small>d</small> </span>';
                    contentString += '</div>';
                    contentString += '<div class="d-flex"><div><a href="javascript:;" class="map-property_title">' + _this.propertiesmap[i]["FullStreetAddress"] + '</a> <small class="map_property_subtitle">' + _this.propertiesmap[i]["City"] + ', ' + _this.propertiesmap[i]["State"] + ' ' + _this.propertiesmap[i]["ZipCode"] + '</small>';
                    contentString += '</div>';
                    contentString += '<img class="map-rmls-logo" src="assets/imgs/rmls-logo.svg" width="30" /></div>';
                    contentString += '</div>';
                    contentString += '</div>';
                    Latlng = new google.maps.LatLng(_this.propertiesmap[i].lat, _this.propertiesmap[i].lon);
                    saved_label = String(kFormatter(_this.propertiesmap[i]["PriceCurrentForStatus"]));
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(_this.propertiesmap[i]["Latitude"], _this.propertiesmap[i]["Longitude"]),
                        icon: icon,
                        label: {
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            text: saved_label,
                        },
                        map: _this.map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 400
                    });
                    var idz = _this.propertiesmap[i].ListingID;
                    var that = _this;
                    google.maps.event.addListener(infowindow, 'domready', function () {
                        var clickableItem = document.getElementById('clickableItem');
                        clickableItem.addEventListener('click', function () {
                            that.navCtrl.push(PropertyDetailPage, { propertyId: idz });
                        });
                    });
                    var self_1 = _this;
                    marker.addListener('click', function () {
                        console.log(idz);
                        var questionModal = self_1.popover.create(MapInfoPage, { propertyId: idz }, { enableBackdropDismiss: true, cssClass: 'my-custom-modal-css' });
                        questionModal.present();
                    });
                };
                var contentString, Latlng, saved_label, marker;
                for (i = 0; i < _this.propertiesmap.length; i++) {
                    _loop_1();
                }
                function viewpropertymap(propertyid) {
                    this.navCtrl.push(PropertyDetailPage, { propertyId: propertyid });
                }
                function openQtoModal(propertyId) {
                    console.log("click " + propertyId);
                }
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    SearchPage.prototype.loadMap = function (urlParamap) {
        var _this = this;
        try {
            // let urlParamap: any = {
            //  searchTearm: this.searchArray,
            //  requestType: 'map',
            // }
            console.log(urlParamap);
            this.showSpinner = true;
            this.service.homesearchpropertiesmap(this.filters, urlParamap).then(function (response) {
                console.log(response);
                _this.propertiesmap = response.data;
                _this.totalPagesmap = response.totalPages;
                _this.totalRecordsmap = response.totalRecords;
                console.log(_this.propertiesmap[0]["Latitude"]);
                var latLng = new google.maps.LatLng(_this.propertiesmap[0]["Latitude"], _this.propertiesmap[0]["Longitude"]);
                var icon = {
                    url: 'assets/imgs/pricepin.svg',
                    scaledSize: new google.maps.Size(40, 60),
                };
                var mapOptions = {
                    center: latLng,
                    zoom: 13,
                    icon: icon,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                var locations = [
                    ['property', 45.482456, -122.7117877, 4],
                    ['property', 45.470229, -122.696662, 4],
                    ['property', 45.483585, -122.737424, 4],
                    ['property', 45.477687, -122.647817, 4],
                    ['property', 45.472210, -122.629879, 4]
                ];
                var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
                var si = [
                    { value: 1, symbol: "" },
                    { value: 1E3, symbol: "K" },
                    { value: 1E6, symbol: "M" },
                    { value: 1E9, symbol: "G" },
                    { value: 1E12, symbol: "T" },
                    { value: 1E15, symbol: "P" },
                    { value: 1E18, symbol: "E" }
                ];
                var digits = 2;
                function kFormatter(num) {
                    digits = 2;
                    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                    var i;
                    for (i = si.length - 1; i > 0; i--) {
                        if (num >= si[i].value) {
                            break;
                        }
                    }
                    if (si[i].symbol == 'K') {
                        digits = 0;
                    }
                    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
                }
                var marker, i;
                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                var _loop_2 = function () {
                    contentString = "";
                    contentString = '<div class="map_property_panel">';
                    contentString += '<figure class="cardpanel-slider " id="clickableItem">';
                    contentString += '<img class="cardpanel-slider-item imagepopup" src="assets/imgs/figure.svg" alt="">';
                    contentString += '</figure>';
                    contentString += '<div class="map_property_footer"> <div class="d-flex"><span class="map_property_price">$' + numberWithCommas(_this.propertiesmap[i]["PriceCurrentForStatus"]) + '</span>';
                    contentString += '<ul class="share-list" ><li><i ><img src="assets/imgs/iconfinder_chat_293661.svg"></i></li><li><i><img src="assets/imgs/Page-1.svg"></i></li>';
                    contentString += '</div>';
                    contentString += '<div class="map_property_list_inline">';
                    contentString += '<span class="map_property_list map_prpt_bd"><img src="assets/imgs/bed.svg" width="28" height="15" />' + (_this.propertiesmap[i]["Beds"] > 0 ? _this.propertiesmap[i]["Beds"] : "0") + '<small>bed</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/bathtube-with-shower.svg" width="17" height="17" />' + (_this.propertiesmap[i]["BathsFull"] > 0 ? _this.propertiesmap[i]["BathsFull"] : "0") + '<small>baths</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/triangular-ruler-for-school.svg" width="17" height="17" />' + (_this.propertiesmap[i]["SqFtApproximateTotal"] > 0 ? _this.propertiesmap[i]["SqFtApproximateTotal"] : "0") + '<small>sqft</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/clock.svg" width="17" height="17" />-<small>d</small> </span>';
                    contentString += '</div>';
                    contentString += '<div class="d-flex"><div><a href="javascript:;" class="map-property_title">' + _this.propertiesmap[i]["FullStreetAddress"] + '</a> <small class="map_property_subtitle">' + _this.propertiesmap[i]["City"] + ', ' + _this.propertiesmap[i]["State"] + ' ' + _this.propertiesmap[i]["ZipCode"] + '</small>';
                    contentString += '</div>';
                    contentString += '<img class="map-rmls-logo" src="assets/imgs/rmls-logo.svg" width="30" /></div>';
                    contentString += '</div>';
                    contentString += '</div>';
                    Latlng = new google.maps.LatLng(_this.propertiesmap[i].lat, _this.propertiesmap[i].lon);
                    saved_label = String(kFormatter(_this.propertiesmap[i]["PriceCurrentForStatus"]));
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(_this.propertiesmap[i]["Latitude"], _this.propertiesmap[i]["Longitude"]),
                        icon: icon,
                        label: {
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            text: saved_label,
                        },
                        map: _this.map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 400
                    });
                    var idz = _this.propertiesmap[i].ListingID;
                    var that = _this;
                    google.maps.event.addListener(infowindow, 'domready', function () {
                        var clickableItem = document.getElementById('clickableItem');
                        clickableItem.addEventListener('click', function () {
                            that.navCtrl.push(PropertyDetailPage, { propertyId: idz });
                        });
                    });
                    var self_2 = _this;
                    marker.addListener('click', function () {
                        console.log(idz);
                        var questionModal = self_2.popover.create(MapInfoPage, { propertyId: idz }, { enableBackdropDismiss: true, cssClass: 'my-custom-modal-css' });
                        questionModal.present();
                    });
                };
                var contentString, Latlng, saved_label, marker;
                for (i = 0; i < _this.propertiesmap.length; i++) {
                    _loop_2();
                }
                function viewpropertymap(propertyid) {
                    this.navCtrl.push(PropertyDetailPage, { propertyId: propertyid });
                }
                function openQtoModal(propertyId) {
                    console.log("click " + propertyId);
                }
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    SearchPage.prototype.openHomeSearchmenu = function () {
        this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
        this.menuCtrl.enable(true, 'homesearchMenu');
        this.menuCtrl.enable(false, 'mainmenumore');
        //      this.isHomeSearchMoreMenu = true;
        //      this.isMoreMenu = false;
        // // this.events.publish('moretabs:invoked');
        this.menuCtrl.toggle();
    };
    SearchPage.prototype.viewProperty = function (propertyId) {
        var _this = this;
        var openArray = this.searchArray;
        // this.navCtrl.push(PropertyDetailPage, { propertyId : propertyId, openArray : openArray}); 
        var addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId: propertyId, openArray: openArray });
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
    SearchPage.prototype.mapbody = function () {
        // this.viewCtrl.dismiss()
        // this.viewCtrl.dismiss(); , {openArray : openArray}
    };
    SearchPage.prototype.getOption = function () {
        var _this = this;
        try {
            this.service.getoptions().then(function (response) {
                console.log(response);
                _this.optionResult = response.data;
                _this.optionResultBaths = response.data.baths;
                _this.optionResultBeds = response.data.beds;
                _this.optionResultFavFeat = response.data.favorites_and_featured;
                _this.optionResultMaxsize = response.data.maxlostSizes;
                _this.optionResultMinsize = response.data.minlostSizes;
                _this.optionResultOpenhouse = response.data.open_house;
                _this.optionResultPricechange = response.data.price_change;
                _this.optionResultProperty = response.data.property_class;
                _this.optionResultprptycate = response.data.property_category;
                _this.optionResultstatus = response.data.status;
                _this.showSpinner = false;
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    SearchPage.prototype.openFilter = function () {
        var _this = this;
        console.log(this.searchArray);
        console.log(this.selectedBeds);
        console.log(this.selectedBaths);
        var addWeatherModal = this.modalCtrl.create(FilterPage, { fromlocation: 'no', searchArray: this.searchArray, optionResult: this.optionResult, selectedBeds: this.selectedBeds, selectedBaths: this.selectedBaths, totalRecords: this.totalRecordsMore, paraArrayReturn: this.paraArray, selectedPropertyClass: this.selectedPropertyClass, selectedPropertyClass1: this.selectedPropertyClass1, selectedPropertyClass2: this.selectedPropertyClass2, selectedPropertyClass3: this.selectedPropertyClass3, selectedPropertyClass4: this.selectedPropertyClass4, selectedPropertyClass5: this.selectedPropertyClass5 }, { cssClass: 'morefilter' });
        addWeatherModal.present();
        //  addWeatherModal.dismiss();
        addWeatherModal.onDidDismiss(function (data) {
            console.log("Data =>", data); //This will log the form entered by user in add modal.
            _this.showSpinnerProperty = true;
            // if (this.paraArray == undefined) {
            // }else{selectedBeds selectedBeds
            _this.paraArray = data.paraArray;
            _this.selectedBeds = data.selectedBeds;
            _this.selectedBaths = data.selectedBaths;
            _this.totalRecordsMore = data.totalRecords;
            _this.selectedPropertyClass = data.selectedPropertyClass;
            _this.selectedPropertyClass1 = data.selectedPropertyClass1;
            _this.selectedPropertyClass2 = data.selectedPropertyClass2;
            _this.selectedPropertyClass3 = data.selectedPropertyClass3;
            _this.selectedPropertyClass4 = data.selectedPropertyClass4;
            _this.selectedPropertyClass5 = data.selectedPropertyClass5;
            try {
                console.log(_this.paraArray);
                // this.showSpinner = true;
                _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                    console.log(response);
                    _this.properties = response.data;
                    _this.totalPages = response.totalPages;
                    _this.totalRecords = response.totalRecords;
                    _this.showSpinnerProperty = false;
                    _this.showSpinner = false;
                    var urlParamap = {
                        searchTearm: _this.paraArray,
                        requestType: 'map',
                    };
                    console.log(urlParamap);
                    _this.loadMapMore(_this.paraArray);
                    _this.forinfi = _this.paraArray;
                    //  this.currentPage = 2;
                    _this.forscroll = 'yes';
                    console.log(_this.paraArray);
                    console.log(_this.forinfi);
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
        });
        // this.modalCtrl.create(FilterPage).present();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild('mySearchbar'),
        __metadata("design:type", Searchbar)
    ], SearchPage.prototype, "searchbar", void 0);
    SearchPage = __decorate([
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
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
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map