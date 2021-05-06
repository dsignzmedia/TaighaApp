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
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';
// after alter
var FilterPage = /** @class */ (function () {
    function FilterPage(viewCtrl, navCtrl, navParams, service, storage, App) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.storage = storage;
        this.App = App;
        this.currentPage = 1;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.filters = "";
        this.statusarraystring = "";
        this.prptyresarrayParastring = "";
        this.propertyTypeResultallPara = "";
        this.showSpinner = false;
        this.propertyshowtitle = false;
        this.propertyshowSpinner = false;
        this.propertyTypeResultshow = false;
        this.optionResult = [];
        this.optionResultprptycate = [];
        this.optionResultstatus = [];
        this.propertyTypeResult = [];
        this.propertyTypeSelect = [];
        this.propertyTypeSelectPara = [];
        this.propertyTypeResultall = [];
        this.checkpropertyTypeResult = [];
        this.optionResultProperty = [];
        this.Residential = "";
        this.prptyclassarray = new Array();
        this.statusarray = new Array('&status[]=Active', '&status[]=Bumpable', '', '', '', '');
        this.prptyresarray = new Array('', '', '', '', '', '');
        this.prptyresarrayPara = new Array('', '', '', '');
        this.PropertyTypeToArray = [];
        this.paraArray = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''); //24
        this.propertyCat = [];
        this.ResidentialCat = [];
        this.optionResultBaths = [];
        this.optionResultBeds = [];
        this.optionResultFavFeat = [];
        this.optionResultMaxsize = [];
        this.optionResultMinsize = [];
        this.optionResultOpenhouse = [];
        this.optionResultPricechange = [];
        this.checkedHouse = false;
        this.checkedThouse = false;
        this.checkedCondo = false;
        this.checkedMultifamily = false;
        this.checkedLand = false;
        this.checkedCommercial = false;
        this.checkedResidential0 = false;
        this.checkedResidential1 = false;
        this.checkedResidential2 = false;
        this.checkedResidential3 = false;
        this.checkedStatus0 = true;
        this.checkedStatus1 = true;
        this.checkedStatus2 = false;
        this.checkedStatus3 = false;
        this.checkedStatus4 = false;
        this.minPriceInput = '';
        this.maxPriceInput = '';
        this.minSqftInput = '';
        this.maxSqftInput = '';
        this.minlostSizes = '';
        this.maxlostSizes = '';
        this.openHouse = '';
        this.priceChange = '';
        this.minYearInput = '';
        this.maxYearInput = '';
        this.streetNameInput = '';
        this.levelsInput = ''; //15
        this.neighborhoodInput = ''; //16
        this.elementaryInput = ''; //17
        this.middleInput = ''; //18
        this.highInput = ''; //19
        this.keyWordsInput = ''; //20
        this.listinhAgentInput = ''; //21
        this.listingOfficeInput = ''; //22
        this.getselectedBeds = [];
        this.selectedBeds = [];
        this.Bedsany = false;
        this.Beds1 = false;
        this.Beds2 = false;
        this.Beds3 = false;
        this.Beds4 = false;
        this.Beds5 = false;
        this.fromlocation = [];
        this.getselectedBaths = [];
        this.selectedBaths = [];
        this.selectedPropertyClass = [];
        this.selectedPropertyClass1 = [];
        this.selectedPropertyClass2 = [];
        this.selectedPropertyClass3 = [];
        this.selectedPropertyClass4 = [];
        this.selectedPropertyClass5 = [];
        this.Bathsany = false;
        this.Baths1 = false;
        this.Baths2 = false;
        this.Baths3 = false;
        this.Baths4 = false;
        this.Baths5 = false;
        this.fromlocationtest = [];
        this.paraArrayReturn = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''); //24
        this.searchArray = new Array();
        this.searchArray = this.navParams.get('searchArray');
        if (this.navParams.get('paraArray')) {
            this.paraArray = this.navParams.get('paraArray');
        }
        if (this.navParams.get('paraArrayReturn')) {
            this.paraArrayReturn = this.navParams.get('paraArrayReturn');
            this.fromlocationtest = this.navParams.get('paraArrayReturn');
        }
        //     checkedThouse
        // checkedCondo
        // checkedMultifamily
        // checkedLand
        // checkedCommercial
        if (this.navParams.get('selectedPropertyClass')) {
            this.getselectedPropertyClass = this.navParams.get('selectedPropertyClass');
            console.log(this.getselectedPropertyClass);
            if (this.getselectedPropertyClass == 'yes') {
                this.checkedHouse = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        if (this.navParams.get('selectedPropertyClass1')) {
            this.getselectedPropertyClass1 = this.navParams.get('selectedPropertyClass1');
            console.log(this.getselectedPropertyClass1);
            if (this.getselectedPropertyClass1 == 'yes') {
                this.checkedThouse = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        if (this.navParams.get('selectedPropertyClass2')) {
            this.getselectedPropertyClass2 = this.navParams.get('selectedPropertyClass2');
            console.log(this.getselectedPropertyClass2);
            if (this.getselectedPropertyClass2 == 'yes') {
                this.checkedCondo = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        if (this.navParams.get('selectedPropertyClass3')) {
            this.getselectedPropertyClass3 = this.navParams.get('selectedPropertyClass3');
            console.log(this.getselectedPropertyClass3);
            if (this.getselectedPropertyClass3 == 'yes') {
                this.checkedMultifamily = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        if (this.navParams.get('selectedPropertyClass4')) {
            this.getselectedPropertyClass4 = this.navParams.get('selectedPropertyClass4');
            console.log(this.getselectedPropertyClass4);
            if (this.getselectedPropertyClass4 == 'yes') {
                this.checkedLand = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        if (this.navParams.get('selectedPropertyClass5')) {
            this.getselectedPropertyClass5 = this.navParams.get('selectedPropertyClass5');
            console.log(this.getselectedPropertyClass5);
            if (this.getselectedPropertyClass5 == 'yes') {
                this.checkedCommercial = true;
                //   this.propertyCheckboxClicked('Residential', 'house', Event);
            }
        }
        this.optionResult = this.navParams.get('optionResult');
        this.totalRecordsMore = this.navParams.get('totalRecords');
        console.log(this.searchArray);
        console.log(this.paraArray);
        console.log(this.paraArrayReturn);
        if (this.navParams.get('fromlocation')) {
            this.fromlocation = this.navParams.get('fromlocation');
        }
        // this.fromlocation = this.paraArrayReturn.searchArraydata;
        if (this.fromlocationtest.searchTearm) {
            this.paraArray.splice(0, 1, this.fromlocationtest.searchTearm);
        }
        else {
            this.paraArray.splice(0, 1, this.paraArrayReturn[0]);
            this.paraArray.splice(1, 1, this.paraArrayReturn[1]);
            this.paraArray.splice(2, 1, this.paraArrayReturn[2]);
            this.paraArray.splice(3, 1, this.paraArrayReturn[3]);
            this.paraArray.splice(4, 1, this.paraArrayReturn[4]);
            this.paraArray.splice(5, 1, this.paraArrayReturn[5]);
            this.paraArray.splice(6, 1, this.paraArrayReturn[6]);
            this.paraArray.splice(7, 1, this.paraArrayReturn[7]);
            this.paraArray.splice(8, 1, this.paraArrayReturn[8]);
            this.paraArray.splice(9, 1, this.paraArrayReturn[9]);
            this.paraArray.splice(10, 1, this.paraArrayReturn[10]);
            this.paraArray.splice(11, 1, this.paraArrayReturn[11]);
            this.paraArray.splice(12, 1, this.paraArrayReturn[12]);
            this.paraArray.splice(13, 1, this.paraArrayReturn[13]);
            this.paraArray.splice(14, 1, this.paraArrayReturn[14]);
            this.paraArray.splice(15, 1, this.paraArrayReturn[15]);
            this.paraArray.splice(16, 1, this.paraArrayReturn[16]);
            this.paraArray.splice(17, 1, this.paraArrayReturn[17]);
            this.paraArray.splice(18, 1, this.paraArrayReturn[18]);
            this.paraArray.splice(19, 1, this.paraArrayReturn[19]);
            this.paraArray.splice(20, 1, this.paraArrayReturn[20]);
            this.paraArray.splice(21, 1, this.paraArrayReturn[21]);
            this.paraArray.splice(22, 1, this.paraArrayReturn[22]);
            this.paraArray.splice(23, 1, this.paraArrayReturn[23]);
            this.paraArray.splice(24, 1, this.paraArrayReturn[24]);
        }
        console.log(this.searchArray);
        console.log(this.paraArray);
        console.log(this.paraArrayReturn);
        function convert(value) {
            if (value >= 1000000) {
                value = (value / 1000000) + "M";
            }
            else if (value >= 1000) {
                value = (value / 1000) + "K";
            }
            return value;
        }
        if (this.paraArray) {
            console.log(this.paraArray[4]);
            console.log(this.paraArray[5]);
            this.minPriceInput = convert(this.paraArray[4]);
            this.maxPriceInput = convert(this.paraArray[5]);
            this.minSqftInput = this.paraArray[6];
            this.maxSqftInput = this.paraArray[7];
            this.minlostSizes = this.paraArray[8];
            this.maxlostSizes = this.paraArray[9];
            this.openHouse = this.paraArray[10];
            this.priceChange = this.paraArray[11];
            this.minYearInput = this.paraArray[12];
            this.maxYearInput = this.paraArray[13];
            this.streetNameInput = this.paraArray[14];
            this.levelsInput = this.paraArray[15];
            this.neighborhoodInput = this.paraArray[16];
            this.elementaryInput = this.paraArray[17];
            this.middleInput = this.paraArray[18];
            this.highInput = this.paraArray[19];
            this.keyWordsInput = this.paraArray[20];
            this.listinhAgentInput = this.paraArray[21];
            this.listingOfficeInput = this.paraArray[22];
        }
        // this.optionResult = response.data;
        this.optionResultBaths = this.optionResult.baths;
        this.optionResultBeds = this.optionResult.beds;
        this.optionResultFavFeat = this.optionResult.favorites_and_featured;
        this.optionResultMaxsize = this.optionResult.maxlostSizes;
        this.optionResultMinsize = this.optionResult.minlostSizes;
        this.optionResultOpenhouse = this.optionResult.open_house;
        this.optionResultPricechange = this.optionResult.price_change;
        this.optionResultProperty = this.optionResult.property_class;
        this.optionResultprptycate = this.optionResult.property_category;
        this.optionResultstatus = this.optionResult.status;
        this.getselectedBeds = this.navParams.get('selectedBeds');
        console.log(this.getselectedBeds);
        this.paraArray.splice(2, 1, this.getselectedBeds);
        this.getselectedBaths = this.navParams.get('selectedBaths');
        console.log(this.getselectedBaths);
        this.paraArray.splice(3, 1, this.getselectedBaths);
        // this.Bedsany = true;
        console.log(this.getselectedBeds);
        if (this.getselectedBeds == undefined || this.getselectedBeds == '') {
            this.Bedstodo = [{ active: '' }];
        }
        else {
            this.Bedstodo = this.getselectedBeds[0].active;
            //   this.paraArray.splice(2, 1, this.getselectedBeds[0].Bedname);
            console.log(this.paraArray);
        }
        console.log(this.paraArray[2]);
        this.Bedstodo = "Beds" + this.paraArray[2];
        if (this.Bedstodo == 'Bedsany') {
            this.Bedsany = true;
        }
        else if (this.Bedstodo == 'Beds1') {
            this.Beds1 = true;
        }
        else if (this.Bedstodo == 'Beds2') {
            this.Beds2 = true;
        }
        else if (this.Bedstodo == 'Beds3') {
            this.Beds3 = true;
        }
        else if (this.Bedstodo == 'Beds4') {
            this.Beds4 = true;
        }
        else if (this.Bedstodo == 'Beds5') {
            this.Beds5 = true;
        }
        else {
        }
        // for (let i = 0; i < this.getselectedBeds.lenght; i++) {
        //        this.getselectedBeds[i].active = true;
        //        console.log( this.getselectedBeds[i].active);
        //     }
        // this.Bathsany = true;
        console.log(this.getselectedBaths);
        if (this.getselectedBaths == undefined || this.getselectedBaths == '') {
            this.Bathstodo = [{ active: '' }];
        }
        else {
            this.Bathstodo = this.getselectedBaths[0].active;
            // this.paraArray.splice(3, 1, this.getselectedBaths[0].Bathname);
            console.log(this.paraArray);
        }
        console.log(this.paraArray[3]);
        this.Bathstodo = "Baths" + this.paraArray[3];
        if (this.Bathstodo == 'Bathsany') {
            this.Bathsany = true;
        }
        else if (this.Bathstodo == 'Baths1') {
            this.Baths1 = true;
        }
        else if (this.Bathstodo == 'Baths2') {
            this.Baths2 = true;
        }
        else if (this.Bathstodo == 'Baths3') {
            this.Baths3 = true;
        }
        else if (this.Bathstodo == 'Baths4') {
            this.Baths4 = true;
        }
        else if (this.Bathstodo == 'Baths5') {
            this.Baths5 = true;
        }
        else {
        }
        // for (let i = 0; i < this.getselectedBeds.lenght; i++) {
        //        this.getselectedBeds[i].active = true;
        //        console.log( this.getselectedBeds[i].active);
        //     }
        if (this.totalRecordsMore) {
            this.totalRecords = this.totalRecordsMore;
        }
        //     if (this.paraArrayReturn) {
        //        this.paraArray = this.paraArrayReturn;
        //     }else{
        //     console.log(this.searchArray);
        //       console.log(this.searchArray.toString());
        //     console.log(this.prptyresarray);
        //     this.statusarraystring = this.statusarray.filter(item => item);
        //     this.statusarraystring = this.statusarray.join('');
        //     console.log(this.statusarraystring);
        //     this.paraArray.splice(23, 1, this.statusarraystring);
        //   //  this.testt();
        // this.paraArray.splice(0, 1, this.searchArray.toString());
        // this.paraArray.splice(1, 1, 'listings');
        // }
        //     this.paraArray.splice(0, 1, this.searchArray.toString());
        this.paraArray.splice(0, 1, this.searchArray.toString());
        this.paraArray.splice(1, 1, 'listings');
        console.log(this.paraArray);
        this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArrayReturn).then(function (response) {
            console.log(response);
            _this.totalRecords = response.totalRecords;
        }).catch(function (error) {
        });
    }
    FilterPage.prototype.BedsCheckbox = function (datakey, filterValue, $event) {
        var _this = this;
        console.log(filterValue);
        try {
            if (datakey == 'beds') {
                this.paraArray.splice(2, 1, filterValue);
                this.selectedBeds.splice(0, 1, { Bedname: filterValue, active: "Beds" + filterValue });
                console.log(this.selectedBeds);
            }
            else if (datakey == 'baths') {
                this.paraArray.splice(3, 1, filterValue);
                this.selectedBaths.splice(0, 1, { Bathname: filterValue, active: "Baths" + filterValue });
                console.log(this.selectedBaths);
            }
            else {
            }
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.filterHomes = function () {
        console.log(this.paraArray);
        this.selectedBeds = this.paraArray[2];
        this.selectedBaths = this.paraArray[3];
        var multipliers = { k: 1000, m: 1000000 };
        if (this.minPriceInput || this.maxPriceInput) {
            this.minbackPriceInput = parseFloat(this.minPriceInput) * multipliers[this.minPriceInput.charAt(this.minPriceInput.length - 1).toLowerCase()];
            this.maxbackPriceInput = parseFloat(this.maxPriceInput) * multipliers[this.maxPriceInput.charAt(this.maxPriceInput.length - 1).toLowerCase()];
            console.log(this.minbackPriceInput);
            console.log(this.maxbackPriceInput);
        }
        //    this.navCtrl.push(PushTabsPage, { paraArray : this.paraArray });
        // this.App.getRootNav().push(PushTabsPage, { paraArray : this.paraArray });
        //     this.viewCtrl.dismiss(); selectedBaths
        console.log(this.selectedBeds);
        //  if (this.getselectedBeds) {
        // this.selectedBeds = this.getselectedBeds;
        //    }
        console.log(this.selectedBaths);
        //  if (this.getselectedBaths) {
        // this.selectedBaths = this.getselectedBaths;
        //    }
        this.viewCtrl.dismiss({
            paraArray: this.paraArray,
            selectedBeds: this.selectedBeds,
            selectedBaths: this.selectedBaths,
            totalRecords: this.totalRecords,
            selectedPropertyClass: this.selectedPropertyClass,
            selectedPropertyClass1: this.selectedPropertyClass1,
            selectedPropertyClass2: this.selectedPropertyClass2,
            selectedPropertyClass3: this.selectedPropertyClass3,
            selectedPropertyClass4: this.selectedPropertyClass4,
            selectedPropertyClass5: this.selectedPropertyClass5,
        });
    };
    FilterPage.prototype.statusCheckbox = function (status, $event) {
        var _this = this;
        console.log(status);
        if (status == 'Active') {
            if (this.checkedStatus0 == true) {
                this.statusarray.splice(0, 1, '&status[]=Active');
                console.log(this.statusarray);
                console.log(this.paraArray);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
            if (this.checkedStatus0 == false) {
                this.statusarray.splice(0, 1, '');
                console.log(this.statusarray);
                console.log(this.paraArray);
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
        if (status == 'Bumpable buyer') {
            if (this.checkedStatus1 == true) {
                this.statusarray.splice(1, 1, '&status[]=Bumpable');
                console.log(this.statusarray);
                console.log(this.paraArray);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
            if (this.checkedStatus1 == false) {
                this.statusarray.splice(1, 1, '');
                console.log(this.statusarray);
                console.log(this.paraArray);
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
        if (status == 'Short Sale Pending') {
            if (this.checkedStatus2 == true) {
                this.statusarray.splice(2, 1, '&status[]=Short Sale');
                console.log(this.statusarray);
                console.log(this.paraArray);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
            if (this.checkedStatus2 == false) {
                this.statusarray.splice(2, 1, '');
                console.log(this.statusarray);
                console.log(this.paraArray);
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
        if (status == 'Pending') {
            if (this.checkedStatus3 == true) {
                this.statusarray.splice(3, 1, '&status[]=Pending');
                console.log(this.statusarray);
                console.log(this.paraArray);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
            if (this.checkedStatus3 == false) {
                this.statusarray.splice(3, 1, '');
                console.log(this.statusarray);
                console.log(this.paraArray);
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
        if (status == 'Sold') {
            if (this.checkedStatus4 == true) {
                this.statusarray.splice(4, 1, '&status[]=Sold');
                console.log(this.statusarray);
                console.log(this.paraArray);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
            if (this.checkedStatus4 == false) {
                this.statusarray.splice(4, 1, '');
                console.log(this.statusarray);
                console.log(this.paraArray);
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.filter(function (item) { return item; });
                console.log(this.statusarraystring);
                this.statusarraystring = this.statusarray.join('');
                console.log(this.statusarraystring);
                this.paraArray.splice(23, 1, this.statusarraystring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
    };
    //  +'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[18]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]
    FilterPage.prototype.setlistingOfficeInput = function () {
        var _this = this;
        console.log(this.listingOfficeInput);
        this.paraArray.splice(22, 1, this.listingOfficeInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setlistinhAgentInput = function () {
        var _this = this;
        console.log(this.listinhAgentInput);
        this.paraArray.splice(21, 1, this.listinhAgentInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setkeyWordsInput = function () {
        var _this = this;
        console.log(this.keyWordsInput);
        this.paraArray.splice(20, 1, this.keyWordsInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.sethighInput = function () {
        var _this = this;
        console.log(this.highInput);
        this.paraArray.splice(19, 1, this.highInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setmiddleInput = function () {
        var _this = this;
        console.log(this.middleInput);
        this.paraArray.splice(18, 1, this.middleInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setelementaryInput = function () {
        var _this = this;
        console.log(this.elementaryInput);
        this.paraArray.splice(17, 1, this.elementaryInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setneighborhoodInput = function () {
        var _this = this;
        console.log(this.neighborhoodInput);
        this.paraArray.splice(16, 1, this.neighborhoodInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setlevelsInput = function () {
        var _this = this;
        console.log(this.levelsInput);
        this.paraArray.splice(15, 1, this.levelsInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.propertyClass = function (key) {
        console.log(key);
    };
    FilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterPage');
        //   this.getOption();
        // this.getpropertytype();
    };
    FilterPage.prototype.dismissModal = function () {
        console.log(this.paraArray);
        this.selectedBeds = this.paraArray[2];
        this.selectedBaths = this.paraArray[3];
        var multipliers = { k: 1000, m: 1000000 };
        if (this.minPriceInput || this.maxPriceInput) {
            this.minbackPriceInput = parseFloat(this.minPriceInput) * multipliers[this.minPriceInput.charAt(this.minPriceInput.length - 1).toLowerCase()];
            this.maxbackPriceInput = parseFloat(this.maxPriceInput) * multipliers[this.maxPriceInput.charAt(this.maxPriceInput.length - 1).toLowerCase()];
            console.log(this.minbackPriceInput);
            console.log(this.maxbackPriceInput);
        }
        //    this.navCtrl.push(PushTabsPage, { paraArray : this.paraArray });
        // this.App.getRootNav().push(PushTabsPage, { paraArray : this.paraArray });
        //     this.viewCtrl.dismiss(); selectedBaths
        console.log(this.selectedBeds);
        //  if (this.getselectedBeds) {
        // this.selectedBeds = this.getselectedBeds;
        //    }
        console.log(this.selectedBaths);
        //  if (this.getselectedBaths) {
        // this.selectedBaths = this.getselectedBaths;
        //    }
        this.viewCtrl.dismiss({
            paraArray: this.paraArray,
            selectedBeds: this.selectedBeds,
            selectedBaths: this.selectedBaths,
            totalRecords: this.totalRecords,
            selectedPropertyClass: this.selectedPropertyClass,
            selectedPropertyClass1: this.selectedPropertyClass1,
            selectedPropertyClass2: this.selectedPropertyClass2,
            selectedPropertyClass3: this.selectedPropertyClass3,
            selectedPropertyClass4: this.selectedPropertyClass4,
            selectedPropertyClass5: this.selectedPropertyClass5,
        });
        // console.log(this.selectedBeds);
        // let shand = document.getElementsByClassName('morefilter') as HTMLCollectionOf<HTMLElement>;
        // if (shand.length != 0) {
        //   shand[0].style.display = "none";
        // }
        // this.viewCtrl.dismiss();
    };
    FilterPage.prototype.resetAll = function () {
        var _this = this;
        this.checkedResidential0 = false;
        this.checkedResidential1 = false;
        this.checkedResidential2 = false;
        this.checkedResidential3 = false;
        this.checkedHouse = false;
        this.checkedThouse = false;
        this.checkedCondo = false;
        this.checkedMultifamily = false;
        this.checkedLand = false;
        this.checkedCommercial = false;
        this.propertyCat = '';
        this.ResidentialCat = '';
        this.prptyclassarray = [];
        this.prptyresarray = [];
        this.minPriceInput = '';
        this.maxPriceInput = '';
        this.minSqftInput = '';
        this.maxSqftInput = '';
        this.minlostSizes = '';
        this.maxlostSizes = '';
        this.openHouse = '';
        this.priceChange = '';
        this.minYearInput = '';
        this.maxYearInput = '';
        this.streetNameInput = '';
        this.levelsInput = '';
        this.neighborhoodInput = '';
        this.elementaryInput = '';
        this.middleInput = '';
        this.highInput = '';
        this.keyWordsInput = '';
        this.listinhAgentInput = '';
        this.listingOfficeInput = '';
        this.paraArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        this.paraArray.splice(0, 1, this.searchArray.toString());
        this.paraArray.splice(1, 1, 'listings');
        this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
            console.log(response);
            _this.propertyTypeResult = response.data;
            _this.propertyTypeResultall = response.data.property_types;
            _this.checkpropertyTypeResult = response.data.selected_property_types;
        }).catch(function (error) {
            console.log(error);
        });
        this.totalRecords = 0;
    };
    FilterPage.prototype.getOption = function () {
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
    FilterPage.prototype.parameter = function (datakey, $event) {
        console.log(datakey);
        //       let urlPara: any = {
        // requestType: "listings",
        // searchTearm: "97229",
        // beds: beds
        //       }
        // this.paraArray.splice(0, 1, 'listings');
        // this.paraArray.splice(1, 1, '97229');
        // this.paraArray.splice(2, 1, datakey);
        // this.paraArray =[
        // 'requestType': "listings",
        // 'searchTearm': "97229",
        // 'beds': datakey
        // ]
    };
    FilterPage.prototype.changepriceChange = function () {
        var _this = this;
        console.log(this.priceChange);
        this.paraArray.splice(11, 1, this.priceChange);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.changeopenHouse = function () {
        var _this = this;
        console.log(this.openHouse);
        this.paraArray.splice(10, 1, this.openHouse);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.changeminLotsize = function () {
        console.log(this.minlostSizes);
        console.log(this.maxlostSizes);
        this.paraArray.splice(8, 1, this.minlostSizes);
        this.paraArray.splice(9, 1, this.maxlostSizes);
    };
    FilterPage.prototype.changemaxLotsize = function () {
        var _this = this;
        console.log(this.minlostSizes);
        console.log(this.maxlostSizes);
        this.paraArray.splice(8, 1, this.minlostSizes);
        this.paraArray.splice(9, 1, this.maxlostSizes);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setminYearInput = function () {
        console.log(this.minYearInput);
        console.log(this.maxYearInput);
        this.paraArray.splice(12, 1, this.minYearInput);
        this.paraArray.splice(13, 1, this.maxYearInput);
    };
    FilterPage.prototype.setmaxYearInput = function () {
        var _this = this;
        console.log(this.minYearInput);
        console.log(this.maxYearInput);
        this.paraArray.splice(12, 1, this.minYearInput);
        this.paraArray.splice(13, 1, this.maxYearInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setstreetNameInput = function () {
        var _this = this;
        console.log(this.streetNameInput);
        this.paraArray.splice(14, 1, this.streetNameInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setminPriceInput = function () {
        // function nFormatter(num, digits) {
        //   var si = [
        //     { value: 1, symbol: "" },
        //     { value: 1E3, symbol: "k" },
        //     { value: 1E6, symbol: "M" },
        //     { value: 1E9, symbol: "G" },
        //     { value: 1E12, symbol: "T" },
        //     { value: 1E15, symbol: "P" },
        //     { value: 1E18, symbol: "E" }
        //   ];
        //   var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        //   var i;
        //   for (i = si.length - 1; i > 0; i--) {
        //     if (num >= si[i].value) {
        //       break;
        //     }
        //   }
        //   return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        // }
        function convert(value) {
            // console.log(value);
            // value.replace(/^K0+/i, '');
            //  value.replace(/^M0+/i, '');
            // if(value.replace(/^K0+/i, '') || value.replace(/^M0+/i, '')){
            if (value >= 1000000) {
                value = (value / 1000000) + "M";
            }
            else if (value >= 1000) {
                value = (value / 1000) + "K";
            }
            return value;
            // }
        }
        //  var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
        // var si = [
        // { value: 1, symbol: "" },
        // { value: 1E3, symbol: "K" },
        // { value: 1E6, symbol: "M" },
        // { value: 1E9, symbol: "G" },
        // { value: 1E12, symbol: "T" },
        // { value: 1E15, symbol: "P" },
        // { value: 1E18, symbol: "E" }
        // ];
        // function kFormatter(num) {
        // var  digits = 2;
        //   var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        //   var i;
        //   for (i = si.length - 1; i > 0; i--) {
        //     if (num >= si[i].value) {
        //       break;
        //     }
        //   }
        //   if(si[i].symbol == 'K') {
        //     digits = 0;
        //   }
        //   return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        // }
        //  function convertpriceC(value, type) {
        //       console.log(value);
        //    console.log(type);
        //      if(value.toLowerCase().indexOf('k') == -1 && value.toLowerCase().indexOf('m') == -1){
        //          var number = value.replace(/,/g , '').match(/\d+/);
        //         var convertedV = kFormatter(number);
        //          if(type == 'min') {
        //             // $("#min_price_d").val("$"+convertedV);
        //              console.log(convertedV);
        //          }
        //          if(type == 'max') {
        //            //  $("#max_price_d").val("$"+convertedV);
        //             console.log(convertedV);
        //          }
        //      } else if(value.toLowerCase().indexOf('$') == -1){
        //          if(type == 'min') {
        //            //  $("#min_price_d").val("$"+value);
        //             console.log(convertedV);
        //          }
        //          if(type == 'max') {
        //            //  $("#max_price_d").val("$"+value);
        //             console.log(convertedV);
        //          }
        //      }
        //  }
        //  console.log(convertpriceC(this.minPriceInput, 'min'));
        // setTimeout(() => {
        console.log(this.minPriceInput);
        this.minempty = this.minPriceInput;
        if (this.minempty == '') {
            this.maxbackPriceInput = '';
            this.minPriceInput = '';
            this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
            var multipliers = { k: 1000, m: 1000000 };
            this.maxbackPriceInput = parseFloat(this.rmvSmaxaft) * multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length - 1).toLowerCase()];
        }
        else {
            this.rmvSmin = this.minPriceInput.replace('$', '');
            this.minPriceInput = "$" + convert(this.rmvSmin);
            this.rmvSminaft = this.minPriceInput.replace('$', '');
            this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
            // }, 1000);
            console.log(convert(this.minPriceInput));
            // if (rmvSmin) {
            //   // code...
            // }
            // this.minPriceInput = this.minPriceInput.replace('$', '');
            //  this.minPriceInput = this.minPriceInput.replace('$$', '$');
            //   this.maxPriceInput = this.maxPriceInput.replace('$', '');
            //  this.maxPriceInput = this.maxPriceInput.replace('$$', '$');
            console.log(this.minPriceInput);
            console.log(this.maxPriceInput);
            // console.log(parseFloat(this.minPriceInput)*multipliers[this.minPriceInput.charAt(this.minPriceInput.length-1).toLowerCase()]);
            var multipliers = { k: 1000, m: 1000000 };
            console.log(parseFloat(this.rmvSminaft) * multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length - 2).toLowerCase()]);
            this.minbackPriceInput = parseFloat(this.rmvSminaft) * multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length - 1).toLowerCase()];
            this.maxbackPriceInput = parseFloat(this.rmvSmaxaft) * multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length - 1).toLowerCase()];
        }
        this.paraArray.splice(4, 1, this.minbackPriceInput);
        this.paraArray.splice(5, 1, this.maxbackPriceInput);
    };
    FilterPage.prototype.setmaxPriceInput = function () {
        // function fnum(x) {
        //   if(isNaN(x)) return x;
        var _this = this;
        //   if(x < 9999) {
        //     return x;
        //   }
        //   if(x < 1000000) {
        //     return Math.round(x/1000) + "K";
        //   }
        //   if( x < 10000000) {
        //     return (x/1000000).toFixed(2) + "M";
        //   }
        //   if(x < 1000000000) {
        //     return Math.round((x/1000000)) + "M";
        //   }
        //   if(x < 1000000000000) {
        //     return Math.round((x/1000000000)) + "B";
        //   }
        //   return x;
        // }
        function convert(value) {
            // console.log(value);
            // value.replace(/^K0+/i, '');
            //  value.replace(/^M0+/i, '');
            // if(value.replace(/^K0+/i, '') || value.replace(/^M0+/i, '')){
            if (value >= 1000000) {
                value = (value / 1000000) + "M";
            }
            else if (value >= 1000) {
                value = (value / 1000) + "K";
            }
            return value;
            // }
        }
        console.log(this.maxPriceInput);
        this.maxempty = this.maxPriceInput;
        if (this.maxempty == '') {
            this.maxbackPriceInput = '';
            this.maxPriceInput = '';
            this.rmvSminaft = this.minPriceInput.replace('$', '');
            var multipliers = { k: 1000, m: 1000000 };
            this.minbackPriceInput = parseFloat(this.rmvSminaft) * multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length - 1).toLowerCase()];
        }
        else {
            this.rmvSmax = this.maxPriceInput.replace('$', '');
            this.maxPriceInput = "$" + convert(this.rmvSmax);
            this.rmvSminaft = this.minPriceInput.replace('$', '');
            this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
            // this.minPriceInput = this.minPriceInput.replace('$', '');
            //  this.minPriceInput = this.minPriceInput.replace('$$', '$');
            //   this.maxPriceInput = this.maxPriceInput.replace('$', '');
            //  this.maxPriceInput = this.maxPriceInput.replace('$$', '$');
            console.log(this.rmvSminaft);
            var multipliers = { k: 1000, m: 1000000 };
            console.log(parseFloat(this.rmvSminaft) * multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length - 1).toLowerCase()]);
            console.log(this.rmvSminaft);
            // console.log(fnum(this.rmvSminaft));
            console.log(this.rmvSmaxaft);
            this.minbackPriceInput = parseFloat(this.rmvSminaft) * multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length - 1).toLowerCase()];
            this.maxbackPriceInput = parseFloat(this.rmvSmaxaft) * multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length - 1).toLowerCase()];
        }
        this.paraArray.splice(4, 1, this.minbackPriceInput);
        this.paraArray.splice(5, 1, this.maxbackPriceInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    FilterPage.prototype.setminSqftInput = function () {
        console.log(this.minSqftInput);
        console.log(this.maxSqftInput);
        this.paraArray.splice(6, 1, this.minSqftInput);
        this.paraArray.splice(7, 1, this.maxSqftInput);
    };
    FilterPage.prototype.setmaxSqftInput = function () {
        var _this = this;
        console.log(this.minSqftInput);
        console.log(this.maxSqftInput);
        this.paraArray.splice(6, 1, this.minSqftInput);
        this.paraArray.splice(7, 1, this.maxSqftInput);
        try {
            console.log(this.paraArray);
            this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                console.log(response);
                _this.totalRecords = response.totalRecords;
            }).catch(function (error) {
            });
        }
        catch (e) {
            this.service.serverError();
        }
    };
    //    ppropertyCheckboxClicked(property: any, $event) {
    //     console.log('propertyCheckboxClicked for ' + property);
    // }
    FilterPage.prototype.prptyTypeCheckbox = function (property, PropertyTypeName, $event) {
        console.log(property);
        console.log(PropertyTypeName);
        if (PropertyTypeName == 'Condominium') {
            if (property == false) {
                this.checkedCondo = false;
            }
            if (property == true) {
                this.checkedCondo = true;
            }
        }
        if (PropertyTypeName == 'Single Family Residence') {
            if (property == false) {
                this.checkedHouse = false;
            }
            if (property == true) {
                this.checkedHouse = true;
            }
        }
        if (PropertyTypeName == 'Attached') {
            if (property == false) {
                this.checkedThouse = false;
            }
            if (property == true) {
                this.checkedThouse = true;
            }
        }
    };
    FilterPage.prototype.unqPropertyType = function (property, PropertyTypeName) {
        //       console.log(property);
        // console.log(PropertyTypeName);
        //   if (property = false) {
        //   this.checkedCondo = true;
        // }
    };
    FilterPage.prototype.testt = function () {
        //this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        if (this.checkedHouse == true) {
            //  this.checkedHouse = true;
            this.unqCheckbox('Residential1');
            this.propertyCheckboxClicked('Residential', 'house', Event);
        }
        if (this.checkedThouse == true) {
            this.unqCheckbox('Residential2');
            this.propertyCheckboxClicked('Residential', 'townhouse', Event);
        }
        if (this.checkedCondo == true) {
            this.unqCheckbox('Residential3');
            this.propertyCheckboxClicked('Residential', 'condo', Event);
        }
        if (this.checkedMultifamily == true) {
            this.unqCheckbox('MultiFamily');
            this.propertyCheckboxClicked('Multi-family', 'multifamily', Event);
        }
        if (this.checkedLand == true) {
            this.unqCheckbox('Land');
            this.propertyCheckboxClicked('Land', 'land', Event);
        }
        if (this.checkedCommercial == true) {
            this.unqCheckbox('Sale');
            this.propertyCheckboxClicked('Commercial Sale', 'commercial', Event);
        }
    };
    //  addArray(property: any){
    //       if (this.checkedHouse == false) {
    // const index: number = this.prptyclassarray.indexOf('house');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //       if (this.checkedThouse == false) {
    // const index: number = this.prptyclassarray.indexOf('townhouse');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //       if (this.checkedCondo == false) {
    // const index: number = this.prptyclassarray.indexOf('condo');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //       if (this.checkedMultifamily == false) {
    // const index: number = this.prptyclassarray.indexOf('multifamily');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //       if (this.checkedLand == false) {
    // const index: number = this.prptyclassarray.indexOf('land');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //       if (this.checkedCommercial == false) {
    // const index: number = this.prptyclassarray.indexOf('commercial');
    // this.prptyclassarray.splice(index, 1);
    // console.log(this.prptyclassarray);
    // console.log(this.prptyclassarray.toString());
    //       }
    //  }
    FilterPage.prototype.unqCheckbox = function (Residential) {
        var _this = this;
        console.log(Residential);
        if (this.checkedHouse == true || this.checkedThouse == true || this.checkedCondo == true) {
            this.prptyresarrayPara.splice(0, 1, '&pCategories[]=Residential');
            console.log("prptyresarrayPara" + this.prptyresarrayPara);
        }
        if (this.checkedHouse == true && this.checkedThouse == true && this.checkedCondo == true) {
            this.prptyresarrayPara.splice(0, 1, '');
            console.log("prptyresarrayPara" + this.prptyresarrayPara);
        }
        if (this.checkedHouse == true) {
            if (Residential == 'Residential1') {
                //  this.prptyresarray.push('Residential');
                this.prptyresarray.splice(0, 1, 'Residential');
                console.log(this.prptyresarray);
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass = "yes";
                console.log(this.selectedPropertyClass);
            }
        }
        if (this.checkedHouse == false) {
            if (Residential == 'Residential1') {
                this.prptyresarray.splice(0, 1, '');
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass = "no";
                console.log(this.selectedPropertyClass);
            }
        }
        if (this.checkedThouse == true) {
            if (Residential == 'Residential2') {
                // this.prptyresarray.push('Residential');
                this.prptyresarray.splice(1, 1, 'Residential');
                console.log(this.prptyresarray);
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass1 = "yes";
            }
        }
        if (this.checkedThouse == false) {
            if (Residential == 'Residential2') {
                this.prptyresarray.splice(1, 1, '');
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass1 = "no";
            }
        }
        if (this.checkedCondo == true) {
            if (Residential == 'Residential3') {
                //  this.prptyresarray.push('Residential');
                this.prptyresarray.splice(2, 1, 'Residential');
                console.log(this.prptyresarray);
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass2 = "yes";
            }
        }
        if (this.checkedCondo == false) {
            if (Residential == 'Residential3') {
                this.prptyresarray.splice(2, 1, '');
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass2 = "no";
            }
        }
        if (this.checkedMultifamily == true) {
            if (Residential == 'MultiFamily') {
                //  this.prptyresarray.push('Multi-family');
                this.prptyresarray.splice(3, 1, 'Multi-family');
                this.prptyresarrayPara.splice(1, 1, '&pCategories[]=MultiFamily');
                console.log(this.prptyresarray);
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
                this.selectedPropertyClass3 = "yes";
                this.prptyresarrayParastring = this.prptyresarrayPara.filter(function (item) { return item; });
                console.log(this.prptyresarrayParastring);
                this.prptyresarrayParastring = this.prptyresarrayPara.join('');
                console.log(this.prptyresarrayParastring);
                this.paraArray.splice(24, 1, this.prptyresarrayParastring);
                try {
                    console.log(this.paraArray);
                    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    this.service.serverError();
                }
            }
        }
        if (this.checkedMultifamily == false) {
            if (Residential == 'MultiFamily') {
                this.prptyresarray.splice(3, 1, '');
                this.prptyresarrayPara.splice(1, 1, '');
                this.selectedPropertyClass3 = "no";
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
            }
        }
        if (this.checkedLand == true) {
            if (Residential == 'Land') {
                // this.prptyresarray.push('Land');
                this.prptyresarray.splice(4, 1, 'Land');
                this.prptyresarrayPara.splice(2, 1, '&pCategories[]=Land');
                this.selectedPropertyClass4 = "yes";
                console.log(this.prptyresarray);
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
            }
        }
        if (this.checkedLand == false) {
            if (Residential == 'Land') {
                this.prptyresarray.splice(4, 1, '');
                this.prptyresarrayPara.splice(2, 1, '');
                this.selectedPropertyClass4 = "no";
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
            }
        }
        if (this.checkedCommercial == true) {
            if (Residential == 'Sale') {
                //  this.prptyresarray.push('Commercial Sale');
                this.prptyresarray.splice(5, 1, 'Commercial Sale');
                this.prptyresarrayPara.splice(3, 1, '&pCategories[]=Commercial Sale');
                console.log(this.prptyresarray);
                this.selectedPropertyClass5 = "yes";
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
            }
        }
        if (this.checkedCommercial == false) {
            if (Residential == 'Sale') {
                this.prptyresarray.splice(5, 1, '');
                this.prptyresarrayPara.splice(3, 1, '');
                this.selectedPropertyClass5 = "no";
                console.log("prptyresarrayPara" + this.prptyresarrayPara);
            }
        }
        // if (Residential == 'Residential1') {
        //   this.prptyresarray.push('Residential');
        //   console.log(this.prptyresarray);
        // }
        // if (Residential == 'Residential2') {
        //   this.prptyresarray.push('Residential');
        //   console.log(this.prptyresarray);
        // }
        // if (Residential == 'Residential3') {
        //   this.prptyresarray.push('Residential');
        //   console.log(this.prptyresarray);
        // }
    };
    FilterPage.prototype.unqPropertyCat = function (value) {
        var _this = this;
        console.log(value);
        if (value == 'Res') {
            if (this.checkedResidential0 == false) {
                this.checkedHouse = false;
                this.checkedThouse = false;
                this.checkedCondo = false;
                this.propertyCat = '';
                this.ResidentialCat = '';
                this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                    console.log(response);
                    _this.propertyTypeResult = response.data;
                    _this.propertyTypeResultall = response.data.property_types;
                    _this.checkpropertyTypeResult = response.data.selected_property_types;
                }).catch(function (error) {
                    console.log(error);
                });
            }
            //        if (this.checkedResidential0 == true) {
            // this.checkedHouse = true;
            // this.checkedThouse = true;
            // this.checkedCondo = true;
            //     this.propertyCat = 'house,townhouse,condo';
            //     this.ResidentialCat = "Residential,Residential,Residential,'','','' ";
            //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
            //     console.log(response);
            //     this.propertyTypeResult = response.data;
            //     this.propertyTypeResultall = response.data.property_types;
            //     this.checkpropertyTypeResult = response.data.selected_property_types;
            //     this.propertyTypeResultall[0].checked = true;
            //     this.propertyTypeResultall[2].checked = true;
            //     this.propertyTypeResultall[8].checked = true;
            //     this.propertyTypeResultall[9].checked = true;
            //         }).catch( error => {
            //       console.log(error);
            //   })
            //        }
        }
        if (value == 'mltFmly') {
            //   if (this.checkedResidential1 == true) {
            // this.checkedHouse = false;
            // this.checkedThouse = false;
            // this.checkedCondo = false;
            // this.checkedMultifamily = true;
            //     this.propertyCat = '';
            //     this.ResidentialCat = '';
            //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
            //     console.log(response);
            //     this.propertyTypeResult = response.data;
            //     this.propertyTypeResultall = response.data.property_types;
            //     this.checkpropertyTypeResult = response.data.selected_property_types;
            //         }).catch( error => {
            //       console.log(error);
            //   })
            //   }
            if (this.checkedResidential1 == false) {
                this.checkedHouse = false;
                this.checkedThouse = false;
                this.checkedCondo = false;
                this.checkedMultifamily = false;
                this.checkedLand = false;
                this.checkedCommercial = false;
                this.propertyCat = '';
                this.ResidentialCat = '';
                this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                    console.log(response);
                    _this.propertyTypeResult = response.data;
                    _this.propertyTypeResultall = response.data.property_types;
                    _this.checkpropertyTypeResult = response.data.selected_property_types;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
        if (value == 'lnd') {
            //   if (this.checkedResidential2 == true) {
            // this.checkedHouse = false;
            // this.checkedThouse = false;
            // this.checkedCondo = false;
            // this.checkedMultifamily = false;
            // this.checkedLand = true;
            //     this.propertyCat = "land";
            //     this.ResidentialCat = " '','','','',Land,'' ";
            //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
            //     console.log(response);
            //     this.propertyTypeResult = response.data;
            //     this.propertyTypeResultall = response.data.property_types;
            //     this.checkpropertyTypeResult = response.data.selected_property_types;
            //     this.propertyTypeResultall[0].checked = true;
            //     this.propertyTypeResultall[1].checked = true;
            //     this.propertyTypeResultall[2].checked = true;
            //     this.propertyTypeResultall[3].checked = true;
            //         this.propertyTypeResultall[4].checked = true;
            //         this.propertyTypeResultall[5].checked = true;
            //         this.propertyTypeResultall[6].checked = true;
            //         this.propertyTypeResultall[7].checked = true;
            //         this.propertyTypeResultall[8].checked = true;
            //         }).catch( error => {
            //       console.log(error);
            //   })
            //   }
            if (this.checkedResidential2 == false) {
                this.checkedHouse = false;
                this.checkedThouse = false;
                this.checkedCondo = false;
                this.checkedMultifamily = false;
                this.checkedLand = false;
                this.checkedCommercial = false;
                this.propertyCat = '';
                this.ResidentialCat = '';
                this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                    console.log(response);
                    _this.propertyTypeResult = response.data;
                    _this.propertyTypeResultall = response.data.property_types;
                    _this.checkpropertyTypeResult = response.data.selected_property_types;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
        if (value == 'sal') {
            //   if (this.checkedResidential3 == true){
            // this.checkedHouse = false;
            // this.checkedThouse = false;
            // this.checkedCondo = false;
            // this.checkedMultifamily = false;
            // this.checkedLand = false;
            // this.checkedCommercial = true;
            //     this.propertyCat = 'commercial';
            //     this.ResidentialCat = " '','','','','',Commercial Sale";
            //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
            //     console.log(response);
            //     this.propertyTypeResult = response.data;
            //     this.propertyTypeResultall = response.data.property_types;
            //     this.checkpropertyTypeResult = response.data.selected_property_types;
            //                this.propertyTypeResultall[0].checked = true;
            //                this.propertyTypeResultall[1].checked = true;
            //                this.propertyTypeResultall[2].checked = true;
            //                this.propertyTypeResultall[3].checked = true;
            //                this.propertyTypeResultall[4].checked = true;
            //                this.propertyTypeResultall[5].checked = true;
            //                this.propertyTypeResultall[6].checked = true;
            //                this.propertyTypeResultall[7].checked = true;
            //                this.propertyTypeResultall[8].checked = true;
            //                this.propertyTypeResultall[9].checked = true;
            //                this.propertyTypeResultall[10].checked = true;
            //                this.propertyTypeResultall[11].checked = true;
            //                this.propertyTypeResultall[12].checked = true;
            //                this.propertyTypeResultall[13].checked = true;
            //                this.propertyTypeResultall[14].checked = true;
            //         }).catch( error => {
            //       console.log(error);
            //   })
            //   }
            if (this.checkedResidential3 == false) {
                this.checkedHouse = false;
                this.checkedThouse = false;
                this.checkedCondo = false;
                this.checkedMultifamily = false;
                this.checkedLand = false;
                this.checkedCommercial = false;
                this.propertyCat = '';
                this.ResidentialCat = '';
                this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                    console.log(response);
                    _this.propertyTypeResult = response.data;
                    _this.propertyTypeResultall = response.data.property_types;
                    _this.checkpropertyTypeResult = response.data.selected_property_types;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
        // from blw
        // from blw
        //      if (this.checkedResidential0 == false && this.checkedResidential1 == false  && this.checkedResidential2 == false  && this.checkedResidential3 == false ) {
        // this.checkedHouse = false;
        // this.checkedThouse = false;
        // this.checkedCondo = false;
        // this.checkedMultifamily = false;
        // this.checkedLand = false;
        // this.checkedCommercial = false;
        //     this.propertyCat = '';
        //     this.ResidentialCat = '';
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //      }
        // if (this.checkedResidential0 == false) {
        // this.checkedHouse = false;
        // this.checkedThouse = false;
        // this.checkedCondo = false;
        //  this.prptyresarray.splice(0, 1);
        //   this.prptyresarray.splice(1, 1);
        //    this.prptyresarray.splice(2, 1);
        //     this.prptyclassarray.splice(0, 1);
        //   this.prptyclassarray.splice(1, 1);
        //    this.prptyclassarray.splice(2, 1);
        //    this.propertyTypeResult = [];
        //       this.propertyTypeResultall = [];
        // }
        // if (this.checkedResidential1 == false) {
        // this.checkedMultifamily = false;
        //   }
        // if (this.checkedResidential2 == false) {
        // this.checkedLand = false;
        //   }
    };
    FilterPage.prototype.propertyCatCheckboxClicked = function (Category, $event) {
        var _this = this;
        console.log(Category);
        // if (this.checkedResidential0 == true) {
        // console.log('yes');
        //   }
        if (this.checkedResidential0 == false && this.checkedResidential1 == false && this.checkedResidential2 == false && this.checkedResidential3 == false) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = false;
            this.checkedLand = false;
            this.checkedCommercial = false;
            this.propertyCat = '';
            this.ResidentialCat = '';
            this.prptyclassarray = [];
            this.prptyresarray = [];
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                _this.totalRecords = 0;
                _this.propertyTypeSelect = [];
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true && this.checkedResidential1 == true && this.checkedResidential2 == true && this.checkedResidential3 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = true;
            this.checkedLand = true;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,MultiFamily,Land,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // common
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[6].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[13].checked = true;
                // this.propertyTypeResultall[14].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                // this.propertyTypeResultall[18].checked = true;
                // this.propertyTypeResultall[19].checked = true;
                // this.propertyTypeResultall[20].checked = true;
                // this.propertyTypeResultall[21].checked = true;
                // this.propertyTypeResultall[22].checked = true;
                // this.propertyTypeResultall[23].checked = true;
                // this.propertyTypeResultall[26].checked = true;
                // this.propertyTypeResultall[27].checked = true;
                // this.propertyTypeResultall[28].checked = true;
                // this.propertyTypeResultall[29].checked = true;
                // this.propertyTypeResultall[30].checked = true;
                // this.propertyTypeResultall[31].checked = true;
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true && this.checkedResidential2 == true && this.checkedResidential3 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = false;
            this.checkedLand = true;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " Residential,Residential,Residential,,Land,Commercial Sale ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,Land,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[13].checked = true;
                // this.propertyTypeResultall[14].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                // this.propertyTypeResultall[18].checked = true;
                // this.propertyTypeResultall[19].checked = true;
                // this.propertyTypeResultall[20].checked = true;
                // this.propertyTypeResultall[21].checked = true;
                // this.propertyTypeResultall[22].checked = true;
                // this.propertyTypeResultall[23].checked = true;
                // this.propertyTypeResultall[24].checked = true;
                // this.propertyTypeResultall[27].checked = true;
                // this.propertyTypeResultall[28].checked = true;
                // this.propertyTypeResultall[29].checked = true;
                // this.propertyTypeResultall[30].checked = true;
                // this.propertyTypeResultall[31].checked = true;
                // this.propertyTypeResultall[32].checked = true;
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential1 == true && this.checkedResidential2 == true && this.checkedResidential3 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = true;
            this.checkedLand = true;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " ,,,Multi-family,Land,Commercial Sale ";
            this.propertyCat = 'MultiFamily,Land,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //            this.propertyTypeResultall[i].checked = true;
                //         }
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true && this.checkedResidential1 == true && this.checkedResidential3 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = true;
            this.checkedLand = false;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " Residential,Residential,Residential,Multi-family,,Commercial Sale ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,MultiFamily,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[15].checked = true;
                // this.propertyTypeResultall[16].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                // this.propertyTypeResultall[18].checked = true;
                // this.propertyTypeResultall[21].checked = true;
                // this.propertyTypeResultall[22].checked = true;
                // this.propertyTypeResultall[23].checked = true;
                // this.propertyTypeResultall[24].checked = true;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //          this.propertyTypeResultall[i].checked = true;
                //       }
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true && this.checkedResidential1 == true && this.checkedResidential2 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = true;
            this.checkedLand = true;
            this.checkedCommercial = false;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land, ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,MultiFamily,Land';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[3].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[6].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[14].checked = true;
                // this.propertyTypeResultall[15].checked = true;
                // this.propertyTypeResultall[16].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //          this.propertyTypeResultall[i].checked = true;
                //       }
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
            //   this.checkedHouse = true;
            //   this.checkedThouse = true;
            //   this.checkedCondo = true;
            //   this.checkedMultifamily = true;
            //   this.checkedLand = false;
            //   this.checkedCommercial = false;
            //   //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //   //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            //   this.ResidentialCat = "Residential,Residential,Residential,Multi-family,'','' ";
            //   this.propertyCat = 'house,townhouse,condo,multifamily';
            //   console.log(this.ResidentialCat);
            //   console.log(this.propertyCat);
            // this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
            //   console.log(response);
            //   this.propertyTypeResult = response.data;
            //   this.propertyTypeResultall = response.data.property_types;
            //   this.checkpropertyTypeResult = response.data.selected_property_types;
            //   this.propertyTypeResultall[0].checked = true;
            //   this.propertyTypeResultall[2].checked = true;
            //   this.propertyTypeResultall[8].checked = true;
            //   this.propertyTypeResultall[9].checked = true;
            //       }).catch( error => {
            //     console.log(error);
            // })
        }
        else if (this.checkedResidential0 == true && this.checkedResidential2 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = false;
            this.checkedLand = true;
            this.checkedCommercial = false;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = "Residential,Residential,Residential,,Land, ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,Land';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[3].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[6].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[14].checked = true;
                // this.propertyTypeResultall[15].checked = true;
                // this.propertyTypeResultall[16].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                //     var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true && this.checkedResidential3 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            this.checkedMultifamily = false;
            this.checkedLand = false;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = "Residential,Residential,Residential,,,Commercial Sale ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'house,townhouse,condo,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[15].checked = true;
                // this.propertyTypeResultall[16].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                // this.propertyTypeResultall[18].checked = true;
                // this.propertyTypeResultall[21].checked = true;
                // this.propertyTypeResultall[22].checked = true;
                // this.propertyTypeResultall[23].checked = true;
                // this.propertyTypeResultall[24].checked = true;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential1 == true && this.checkedResidential2 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = true;
            this.checkedLand = true;
            this.checkedCommercial = false;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " ,,,Multi-family,Land, ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'MultiFamily,Land';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //     var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //            this.propertyTypeResultall[i].checked = true;
                //         }
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential1 == true && this.checkedResidential3 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = true;
            this.checkedLand = false;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " ,,,Multi-family,,Commercial Sale ";
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'MultiFamily,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //            this.propertyTypeResultall[i].checked = true;
                //         }
                // common
                // this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
                // this.propertyCat = 'Residential,MultiFamily,Land,Commercial Sale';
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential2 == true && this.checkedResidential3 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = false;
            this.checkedLand = true;
            this.checkedCommercial = true;
            //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
            //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.ResidentialCat = " ,,,,Land,Commercial Sale ";
            this.propertyCat = 'Land,Commercial Sale';
            console.log(this.ResidentialCat);
            console.log(this.propertyCat);
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                //         var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
                // });
                // this.propertyTypeSelect = jsonArray;
                // console.log(this.propertyTypeSelect);
                //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
                //            this.propertyTypeResultall[i].checked = true;
                //         }
                // common
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[15].checked = true;
                // this.propertyTypeResultall[16].checked = true;
                // this.propertyTypeResultall[17].checked = true;
                // this.propertyTypeResultall[18].checked = true;
                // this.propertyTypeResultall[21].checked = true;
                // this.propertyTypeResultall[22].checked = true;
                // this.propertyTypeResultall[23].checked = true;
                // this.propertyTypeResultall[24].checked = true;
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential0 == true) {
            this.checkedHouse = true;
            this.checkedThouse = true;
            this.checkedCondo = true;
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
            this.propertyCat = 'house,townhouse,condo';
            this.ResidentialCat = "Residential,Residential,Residential,,, ";
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                //     this.propertyTypeResultallPara = this.propertyTypeResultall.filter(item => item);
                //     console.log(this.propertyTypeResultallPara);
                //    this.PropertyTypeToArray.push('&pCategories[]=Residential');
                //    this.PropertyTypeToArray.push('&pCategories[]='+this.propertyTypeResultallPara[0].PropertyType);
                //    this.PropertyTypeToArray.push('&pCategories[]='+this.propertyTypeResultallPara[2].PropertyType);
                //    this.PropertyTypeToArray.push('&pCategories[]='+this.propertyTypeResultallPara[8].PropertyType);
                //    this.PropertyTypeToArray.push('&pCategories[]='+this.propertyTypeResultallPara[9].PropertyType);
                // console.log(this.PropertyTypeToArray);
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // for (let i = 0; i < this.propertyTypeResultallPara.lenght ; i++) {
                //        console.log(this.propertyTypeResultallPara.PropertyType);
                //     }
                //         this.propertyTypeResultallPara.forEach(function (value) {
                //     console.log(value);
                //     console.log(value.PropertyType);
                // });
                // for(var i = 0; i < this.propertyTypeResultallPara.length;i++){
                //    //keys[i] for key
                //    //dictionary[keys[i]] for the value
                //    // console.log(this.propertyTypeResultallPara[i]);
                //    // console.log(this.propertyTypeResultallPara[i].PropertyType);
                // }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential1 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = true;
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = 'MultiFamily';
            this.ResidentialCat = '';
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // common
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential2 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = false;
            this.checkedLand = true;
            //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
            this.propertyCat = "Land";
            this.ResidentialCat = " ,,,,Land, ";
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[3].checked = true;
                //       this.propertyTypeResultall[4].checked = true;
                //       this.propertyTypeResultall[5].checked = true;
                //       this.propertyTypeResultall[6].checked = true;
                //       this.propertyTypeResultall[7].checked = true;
                //       this.propertyTypeResultall[8].checked = true;
                // common
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (this.checkedResidential3 == true) {
            this.checkedHouse = false;
            this.checkedThouse = false;
            this.checkedCondo = false;
            this.checkedMultifamily = false;
            this.checkedLand = false;
            this.checkedCommercial = true;
            this.propertyCat = 'Commercial Sale';
            this.ResidentialCat = " ,,,,,Commercial Sale";
            this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                // this.propertyTypeResultall[0].checked = true;
                // this.propertyTypeResultall[1].checked = true;
                // this.propertyTypeResultall[2].checked = true;
                // this.propertyTypeResultall[3].checked = true;
                // this.propertyTypeResultall[4].checked = true;
                // this.propertyTypeResultall[5].checked = true;
                // this.propertyTypeResultall[6].checked = true;
                // this.propertyTypeResultall[7].checked = true;
                // this.propertyTypeResultall[8].checked = true;
                // this.propertyTypeResultall[9].checked = true;
                // this.propertyTypeResultall[10].checked = true;
                // this.propertyTypeResultall[11].checked = true;
                // this.propertyTypeResultall[12].checked = true;
                // this.propertyTypeResultall[13].checked = true;
                // this.propertyTypeResultall[14].checked = true;
                // common
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // common
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            // code...
        }
        // if (this.checkedResidential0 == true && this.checkedResidential1 == true) {
        //   //
        //     this.checkedHouse = true;
        //     this.checkedThouse = true;
        //     this.checkedCondo = true;
        //     this.checkedMultifamily = true;
        //     this.checkedLand = false;
        //     this.checkedCommercial = false;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = "Residential,Residential,Residential,Multi-family,'','' ";
        //     this.propertyCat = 'house,townhouse,condo,multifamily';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     this.propertyTypeResultall[0].checked = true;
        //     this.propertyTypeResultall[2].checked = true;
        //     this.propertyTypeResultall[8].checked = true;
        //     this.propertyTypeResultall[9].checked = true;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        // }
        // if (this.checkedResidential0 == true && this.checkedResidential2 == true) {
        //   //
        //     this.checkedHouse = true;
        //     this.checkedThouse = true;
        //     this.checkedCondo = true;
        //     this.checkedMultifamily = false;
        //     this.checkedLand = true;
        //     this.checkedCommercial = false;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = "Residential,Residential,Residential,'',Land,'' ";
        //     this.propertyCat = 'house,townhouse,condo,land';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     this.propertyTypeResultall[0].checked = true;
        //     this.propertyTypeResultall[2].checked = true;
        //     this.propertyTypeResultall[3].checked = true;
        //     this.propertyTypeResultall[4].checked = true;
        //     this.propertyTypeResultall[6].checked = true;
        //     this.propertyTypeResultall[9].checked = true;
        //     this.propertyTypeResultall[10].checked = true;
        //     this.propertyTypeResultall[11].checked = true;
        //     this.propertyTypeResultall[14].checked = true;
        //     this.propertyTypeResultall[15].checked = true;
        //     this.propertyTypeResultall[16].checked = true;
        //     this.propertyTypeResultall[17].checked = true;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        // }
        // if (this.checkedResidential0 == true && this.checkedResidential3 == true) {
        //   //
        //     this.checkedHouse = true;
        //     this.checkedThouse = true;
        //     this.checkedCondo = true;
        //     this.checkedMultifamily = false;
        //     this.checkedLand = false;
        //     this.checkedCommercial = true;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = "Residential,Residential,Residential,'','',Commercial Sale ";
        //     this.propertyCat = 'house,townhouse,condo,commercial';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     this.propertyTypeResultall[0].checked = true;
        //     this.propertyTypeResultall[1].checked = true;
        //     this.propertyTypeResultall[2].checked = true;
        //     this.propertyTypeResultall[4].checked = true;
        //     this.propertyTypeResultall[5].checked = true;
        //     this.propertyTypeResultall[7].checked = true;
        //     this.propertyTypeResultall[8].checked = true;
        //     this.propertyTypeResultall[9].checked = true;
        //     this.propertyTypeResultall[10].checked = true;
        //     this.propertyTypeResultall[11].checked = true;
        //     this.propertyTypeResultall[12].checked = true;
        //     this.propertyTypeResultall[15].checked = true;
        //     this.propertyTypeResultall[16].checked = true;
        //     this.propertyTypeResultall[17].checked = true;
        //     this.propertyTypeResultall[18].checked = true;
        //     this.propertyTypeResultall[21].checked = true;
        //     this.propertyTypeResultall[22].checked = true;
        //     this.propertyTypeResultall[23].checked = true;
        //     this.propertyTypeResultall[24].checked = true;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //   }
        // if (this.checkedResidential1 == true && this.checkedResidential2 == true) {
        //   //
        //     this.checkedHouse = false;
        //     this.checkedThouse = false;
        //     this.checkedCondo = false;
        //     this.checkedMultifamily = true;
        //     this.checkedLand = true;
        //     this.checkedCommercial = false;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = " '','','',Multi-family,Land,'' ";
        //     this.propertyCat = 'multifamily,land';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
        //            this.propertyTypeResultall[i].checked = true;
        //         }
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //   }
        // if (this.checkedResidential0 == true && this.checkedResidential1 == true  && this.checkedResidential2 == true){
        //     this.checkedHouse = true;
        //     this.checkedThouse = true;
        //     this.checkedCondo = true;
        //     this.checkedMultifamily = true;
        //     this.checkedLand = true;
        //     this.checkedCommercial = false;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,'' ";
        //     this.propertyCat = 'house,townhouse,condo,multifamily,land';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     for (let i in this.propertyTypeResultall) {
        //   this.propertyTypeResultall[i].checked = true;
        // }
        //     // for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
        //   //          this.propertyTypeResultall[i].checked = true;
        //   //       }
        //         }).catch( error => {
        //       console.log(error);
        //   })  
        // }
        // if (this.checkedResidential1 == true && this.checkedResidential3 == true) {
        //   //
        //     this.checkedHouse = false;
        //     this.checkedThouse = false;
        //     this.checkedCondo = false;
        //     this.checkedMultifamily = true;
        //     this.checkedLand = false;
        //     this.checkedCommercial = true;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = " '','','',Multi-family,'',Commercial Sale ";
        //     this.propertyCat = 'multifamily,commercial';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
        //            this.propertyTypeResultall[i].checked = true;
        //         }
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //   }
        // if (this.checkedResidential2 == true && this.checkedResidential3 == true) {
        //   //
        //     this.checkedHouse = false;
        //     this.checkedThouse = false;
        //     this.checkedCondo = false;
        //     this.checkedMultifamily = false;
        //     this.checkedLand = true;
        //     this.checkedCommercial = true;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = " '','','','',Land,Commercial Sale ";
        //     this.propertyCat = 'land,commercial';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     for (let i = 0; i < this.propertyTypeResultall.lenght ; i++) {
        //            this.propertyTypeResultall[i].checked = true;
        //         }
        //     // this.propertyTypeResultall[0].checked = true;
        //     // this.propertyTypeResultall[1].checked = true;
        //     // this.propertyTypeResultall[2].checked = true;
        //     // this.propertyTypeResultall[4].checked = true;
        //     // this.propertyTypeResultall[5].checked = true;
        //     // this.propertyTypeResultall[7].checked = true;
        //     // this.propertyTypeResultall[8].checked = true;
        //     // this.propertyTypeResultall[9].checked = true;
        //     // this.propertyTypeResultall[10].checked = true;
        //     // this.propertyTypeResultall[11].checked = true;
        //     // this.propertyTypeResultall[12].checked = true;
        //     // this.propertyTypeResultall[15].checked = true;
        //     // this.propertyTypeResultall[16].checked = true;
        //     // this.propertyTypeResultall[17].checked = true;
        //     // this.propertyTypeResultall[18].checked = true;
        //     // this.propertyTypeResultall[21].checked = true;
        //     // this.propertyTypeResultall[22].checked = true;
        //     // this.propertyTypeResultall[23].checked = true;
        //     // this.propertyTypeResultall[24].checked = true;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //   }
        // if (this.checkedResidential0 == true && this.checkedResidential1 == true  && this.checkedResidential2 == true  && this.checkedResidential3 == true ) {
        //     this.checkedHouse = true;
        //     this.checkedThouse = true;
        //     this.checkedCondo = true;
        //     this.checkedMultifamily = true;
        //     this.checkedLand = true;
        //     this.checkedCommercial = true;
        //     //  this.ResidentialCat = 'Residential,Residential,Residential,Multi-family,Land,Commercial Sale';
        //     //  this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     this.ResidentialCat = " Residential,Residential,Residential,Multi-family,Land,Commercial Sale ";
        //     this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
        //     console.log(this.ResidentialCat);
        //     console.log(this.propertyCat);
        //   this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
        //     console.log(response);
        //     this.propertyTypeResult = response.data;
        //     this.propertyTypeResultall = response.data.property_types;
        //     this.checkpropertyTypeResult = response.data.selected_property_types;
        //     this.propertyTypeResultall[0].checked = true;
        //     this.propertyTypeResultall[1].checked = true;
        //     this.propertyTypeResultall[2].checked = true;
        //     this.propertyTypeResultall[4].checked = true;
        //     this.propertyTypeResultall[5].checked = true;
        //     this.propertyTypeResultall[6].checked = true;
        //     this.propertyTypeResultall[7].checked = true;
        //     this.propertyTypeResultall[9].checked = true;
        //     this.propertyTypeResultall[10].checked = true;
        //     this.propertyTypeResultall[11].checked = true;
        //     this.propertyTypeResultall[12].checked = true;
        //     this.propertyTypeResultall[13].checked = true;
        //     this.propertyTypeResultall[14].checked = true;
        //     this.propertyTypeResultall[17].checked = true;
        //     this.propertyTypeResultall[18].checked = true;
        //     this.propertyTypeResultall[19].checked = true;
        //     this.propertyTypeResultall[20].checked = true;
        //     this.propertyTypeResultall[21].checked = true;
        //     this.propertyTypeResultall[22].checked = true;
        //     this.propertyTypeResultall[23].checked = true;
        //     this.propertyTypeResultall[26].checked = true;
        //     this.propertyTypeResultall[27].checked = true;
        //     this.propertyTypeResultall[28].checked = true;
        //     this.propertyTypeResultall[29].checked = true;
        //     this.propertyTypeResultall[30].checked = true;
        //     this.propertyTypeResultall[31].checked = true;
        //         }).catch( error => {
        //       console.log(error);
        //   })
        //   }
    };
    FilterPage.prototype.propertyCheckboxClicked = function (Residential, property, $event) {
        var _this = this;
        if (this.checkedHouse == true) {
            this.checkedResidential0 = true;
        }
        else {
            this.checkedResidential0 = false;
        }
        if (this.checkedMultifamily == true) {
            this.checkedResidential1 = true;
        }
        else {
            this.checkedResidential1 = false;
        }
        if (this.checkedLand == true) {
            this.checkedResidential2 = true;
        }
        else {
            this.checkedResidential2 = false;
        }
        if (this.checkedCommercial == true) {
            this.checkedResidential3 = true;
        }
        else {
            this.checkedResidential3 = false;
        }
        // if (this.checkedThouse == true) {
        //   console.log('22');
        //   this.prptyresarray.push('Residential');
        // }
        // if (this.checkedThouse == false) {
        //   this.prptyresarray.splice(1, 1);
        // }
        // if (this.checkedCondo == true) {
        //   console.log('33');
        //   this.prptyresarray.push('Residential');
        // }
        // if (this.checkedCondo == false) {
        //   this.prptyresarray.splice(2, 1);
        // }
        // let idxres = this.prptyresarray.indexOf(Residential);
        // if (idxres > -1) {
        //   this.prptyresarray.splice(idxres, 1);
        // } else {
        //   this.prptyresarray.push(Residential);
        // }
        //       this.propertyTypeResult = response.data;
        //       this.propertyTypeResultall = response.data.property_types;
        //       this.checkpropertyTypeResult = response.data.selected_property_types;
        //     var jsonArray = this.propertyTypeResultall.map(i => {
        //    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
        // });
        // this.propertyTypeSelect = jsonArray;
        // console.log(this.propertyTypeSelect);
        var idx = this.prptyclassarray.indexOf(property);
        if (idx > -1) {
            this.prptyclassarray.splice(idx, 1);
        }
        else {
            this.prptyclassarray.push(property);
        }
        this.prptyclassarray.filter(function (item) { return item; });
        console.log(this.prptyclassarray);
        console.log(this.prptyresarray);
        this.propertyshowtitle = true;
        this.propertyTypeResultshow = true;
        this.propertyshowSpinner = true;
        if (this.checkedHouse == true || this.checkedThouse == true || this.checkedCondo == true || this.checkedMultifamily == true || this.checkedLand == true || this.checkedCommercial == true) {
            property = this.prptyclassarray.toString();
            Residential = this.prptyresarray.toString();
            console.log('property-- ' + property);
            console.log('Residential-- ' + Residential);
            this.service.getpropertyType(Residential, property).then(function (response) {
                console.log(response);
                _this.propertyTypeResult = response.data;
                _this.propertyTypeResultall = response.data.property_types;
                _this.checkpropertyTypeResult = response.data.selected_property_types;
                console.log(_this.propertyTypeResultall);
                console.log(_this.propertyTypeResultall.length);
                //    let item1 = this.propertyTypeResultall.find(i => i.checked === 'true');
                // console.log(item1);
                // const filtered = this.propertyTypeResultall.reduce((a, o) => (o.checked && a.push(o.value), a), []);
                // console.log(filtered);
                function comparer(otherArray) {
                    return function (current) {
                        return otherArray.filter(function (other) {
                            return other.value == current.value && other.display == current.display;
                        }).length == 0;
                    };
                }
                // const results = this.propertyTypeResultall.filter(({ value: id1 }) => !this.checkpropertyTypeResult.some(({ value: id2 }) => id2 === id1));
                // console.log(results);
                // const r = this.propertyTypeResultall.filter((elem) => !this.checkpropertyTypeResult.find(({ id }) => elem.PropertyType === id));
                // console.log(r);
                var jsonArray = _this.propertyTypeResultall.map(function (i) {
                    return { 'PropertyType': i.PropertyType, 'matched': _this.checkpropertyTypeResult.includes(i.PropertyType) };
                });
                // console.log(jsonArray);
                _this.propertyTypeSelect = jsonArray;
                console.log(_this.propertyTypeSelect);
                var selectArray = _this.checkpropertyTypeResult.map(function (i) { return i; });
                _this.propertyTypeSelectPara = selectArray;
                console.log(_this.propertyTypeSelectPara);
                for (var i = 0; i < _this.propertyTypeSelectPara.length; i++) {
                    _this.propertyTypeSelectPara[i] = "&pCategories[]=" + _this.propertyTypeSelectPara[i];
                }
                if (_this.checkedResidential0 == false && _this.checkedResidential1 == false && _this.checkedResidential2 == false && _this.checkedResidential3 == false) {
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential1 == true && _this.checkedResidential2 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential2 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential1 == true && _this.checkedResidential2 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential1 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential1 == true && _this.checkedResidential2 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential2 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                }
                else if (_this.checkedResidential0 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential1 == true && _this.checkedResidential2 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                }
                else if (_this.checkedResidential1 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential2 == true && _this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else if (_this.checkedResidential0 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Residential');
                }
                else if (_this.checkedResidential1 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
                }
                else if (_this.checkedResidential2 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Land');
                }
                else if (_this.checkedResidential3 == true) {
                    _this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
                }
                else {
                }
                _this.propertyTypeResultallPara = _this.propertyTypeSelectPara.join('');
                console.log(_this.propertyTypeResultallPara);
                _this.paraArray.splice(24, 1, _this.propertyTypeResultallPara);
                try {
                    console.log(_this.paraArray);
                    _this.service.filterhomesearchproperties(_this.currentPage, _this.filters, _this.paraArray).then(function (response) {
                        console.log(response);
                        _this.totalRecords = response.totalRecords;
                    }).catch(function (error) {
                    });
                }
                catch (e) {
                    _this.service.serverError();
                }
                // working
                // var res = this.propertyTypeResultall.filter(item1 => 
                // !this.checkpropertyTypeResult.some(item2 => (item2 === item1.PropertyType)))
                // this.propertyTypeSelect = res;
                // var jsonArray = this.propertyTypeResultall.map(i => {
                //    return { 'name': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i) };
                // });
                // console.log(jsonArray);
                // var result = this.propertyTypeSelect.map(function(el) {
                //   var o = Object.assign({}, el);
                //   o.isActive = false;
                //   return o;
                // })
                // console.log(result);
                // working
                // var resss = this.propertyTypeResultall.filter(item1 => 
                // !this.checkpropertyTypeResult.some(item2 => (item2 === item1.PropertyType)))
                // console.log(resss);
                // var res2 = this.propertyTypeResultall.filter(item1 => 
                // !res.some(item2 => (item2 === item1.PropertyType)))
                // console.log(res2);
                // var newArr = this.propertyTypeSelect.concat([res]);
                // console.log(newArr);
                // this.propertyTypeResultall.filter(function(item) {
                //   for (var key in this.checkpropertyTypeResult) {
                //     if (item[key] === undefined || item[key] != this.checkpropertyTypeResult[key])
                //       return false;
                //   }
                //   return true;
                // });
                // console.log(item1)
                for (var i_1 = 0; i_1 < _this.checkpropertyTypeResult.length; i_1++) {
                    if (_this.propertyTypeResultall[i_1].checked == true) {
                        // code...
                    }
                    // let item1 = this.propertyTypeResultall.find(i => i.checked === 'true');
                    // console.log(item1);
                    // const filtered = this.propertyTypeResultall.reduce((a, o) => (o.checked && a.push(o.value), a), []);
                    // console.log(filtered);
                    // if (this.propertyTypeResultall.find(i => i.checked === 'true')) {
                    // console.log(this.propertyTypeResultall);
                    // }
                    // this.propertyTypeResultall[i].checked = true;
                }
                if (_this.propertyTypeResult.property_types.length == 0) {
                    _this.propertyshowtitle = false;
                }
                else {
                    // if (this.checkedHouse == true && this.checkedThouse == true && this.checkedCondo == true && this.checkedMultifamily == true && this.checkedLand == true && this.checkedCommercial == true) {
                    //         this.propertyTypeResultall[3].checked = false;
                    //         this.propertyTypeResultall[8].checked = false;
                    //         this.propertyTypeResultall[15].checked = false;
                    //         this.propertyTypeResultall[16].checked = false;
                    //         this.propertyTypeResultall[24].checked = false;
                    //         this.propertyTypeResultall[25].checked = false;
                    //         console.log("all selected");
                    // }else if(this.checkedThouse == true && this.checkedCondo == true && this.checkedMultifamily == true && this.checkedLand == true && this.checkedCommercial == true) {
                    //         this.propertyTypeResultall[3].checked = false;
                    //         this.propertyTypeResultall[8].checked = false;
                    //         this.propertyTypeResultall[15].checked = false;
                    //         this.propertyTypeResultall[16].checked = false;
                    //         this.propertyTypeResultall[24].checked = false;
                    //         this.propertyTypeResultall[25].checked = false;
                    // }else if(this.checkedHouse == true && this.checkedCondo == true && this.checkedMultifamily == true && this.checkedLand == true && this.checkedCommercial == true) {
                    //         this.propertyTypeResultall[0].checked = false;
                    //         this.propertyTypeResultall[3].checked = false;
                    //         this.propertyTypeResultall[8].checked = false;
                    //         this.propertyTypeResultall[15].checked = false;
                    //         this.propertyTypeResultall[16].checked = false;
                    //         this.propertyTypeResultall[24].checked = false;
                    //         this.propertyTypeResultall[25].checked = false;
                    //         this.propertyTypeResultall[30].checked = false;
                    // }else if(this.checkedHouse == true && this.checkedThouse == true && this.checkedMultifamily == true && this.checkedLand == true && this.checkedCommercial == true) {
                    // // checkedHouse
                    // // checkedThouse
                    // // checkedCondo
                    // // checkedMultifamily
                    // // checkedLand
                    // // checkedCommercial
                    //         this.propertyTypeResultall[3].checked = false;
                    //         this.propertyTypeResultall[6].checked = false;
                    //         this.propertyTypeResultall[8].checked = false;
                    //         this.propertyTypeResultall[15].checked = false;
                    //         this.propertyTypeResultall[16].checked = false;
                    //         this.propertyTypeResultall[24].checked = false;
                    //         this.propertyTypeResultall[25].checked = false;
                    // }else {
                    // }
                    if (_this.checkedHouse == true && _this.checkedThouse == true && _this.checkedCondo == true && _this.checkedMultifamily == true && _this.checkedLand == true) {
                        // this.propertyTypeResultall[3].checked = true;
                        // this.propertyTypeResultall[4].checked = true;
                        // this.propertyTypeResultall[6].checked = true;
                        // this.propertyTypeResultall[8].checked = false;
                        // this.propertyTypeResultall[10].checked = true;
                        // this.propertyTypeResultall[11].checked = true;
                        // this.propertyTypeResultall[14].checked = true;
                        // this.propertyTypeResultall[15].checked = true;
                        // this.propertyTypeResultall[16].checked = true;
                        // this.propertyTypeResultall[17].checked = true;
                    }
                    if (_this.checkedHouse == true && _this.checkedThouse == true && _this.checkedCondo == true && _this.checkedMultifamily == true && _this.checkedLand == true && _this.checkedCommercial == true) {
                        // this.propertyTypeResultall[0].checked = true;
                        // this.propertyTypeResultall[1].checked = true;
                        // this.propertyTypeResultall[2].checked = true;
                        // this.propertyTypeResultall[3].checked = false;
                        // this.propertyTypeResultall[4].checked = true;
                        // this.propertyTypeResultall[5].checked = true;
                        // this.propertyTypeResultall[6].checked = true;
                        // this.propertyTypeResultall[7].checked = true;
                        // this.propertyTypeResultall[8].checked = false;
                        // this.propertyTypeResultall[9].checked = true;
                        // this.propertyTypeResultall[10].checked = true;
                        // this.propertyTypeResultall[11].checked = true;
                        // this.propertyTypeResultall[12].checked = true;
                        // this.propertyTypeResultall[13].checked = true;
                        // this.propertyTypeResultall[14].checked = true;
                        // this.propertyTypeResultall[15].checked = false;
                        // this.propertyTypeResultall[16].checked = false;
                        // this.propertyTypeResultall[17].checked = true;
                        // this.propertyTypeResultall[18].checked = true;
                        // this.propertyTypeResultall[19].checked = true;
                        // this.propertyTypeResultall[20].checked = true;
                        // this.propertyTypeResultall[21].checked = true;
                        // this.propertyTypeResultall[22].checked = true;
                        // this.propertyTypeResultall[23].checked = true;
                        // this.propertyTypeResultall[24].checked = false;
                        // this.propertyTypeResultall[25].checked = false;
                        // this.propertyTypeResultall[26].checked = true;
                        // this.propertyTypeResultall[27].checked = true;
                        // this.propertyTypeResultall[28].checked = true;
                        // this.propertyTypeResultall[29].checked = true;
                        // this.propertyTypeResultall[30].checked = true;
                        // this.propertyTypeResultall[31].checked = true;
                    }
                    if (_this.checkedLand == true && _this.checkedCommercial == true) {
                        // this.propertyTypeResultall[0].checked = true;
                        // this.propertyTypeResultall[1].checked = true;
                        // this.propertyTypeResultall[2].checked = true;
                        // this.propertyTypeResultall[3].checked = true;
                        // this.propertyTypeResultall[4].checked = true;
                        // this.propertyTypeResultall[5].checked = true;
                        // this.propertyTypeResultall[6].checked = true;
                        // this.propertyTypeResultall[7].checked = true;
                        // this.propertyTypeResultall[8].checked = true;
                        // this.propertyTypeResultall[9].checked = true;
                        // this.propertyTypeResultall[10].checked = true;
                        // this.propertyTypeResultall[11].checked = true;
                        // this.propertyTypeResultall[12].checked = true;
                        // this.propertyTypeResultall[13].checked = true;
                        // this.propertyTypeResultall[14].checked = true;
                        // this.propertyTypeResultall[15].checked = true;
                        // this.propertyTypeResultall[16].checked = true;
                        // this.propertyTypeResultall[17].checked = true;
                        // this.propertyTypeResultall[18].checked = true;
                        // this.propertyTypeResultall[19].checked = true;
                        // this.propertyTypeResultall[20].checked = true;
                        // this.propertyTypeResultall[21].checked = true;
                        // this.propertyTypeResultall[22].checked = true;
                    }
                    if (_this.checkedHouse == true) {
                        //  this.propertyTypeResultall[8].checked = true;
                    }
                    if (_this.checkedThouse == true) {
                        // this.propertyTypeResultall[0].checked = true;
                        // this.propertyTypeResultall[9].checked = true;
                    }
                    if (_this.checkedCondo == true) {
                        //  this.propertyTypeResultall[2].checked = true;
                    }
                    if (_this.checkedLand == true) {
                        // this.propertyTypeResultall[0].checked = true;
                        // this.propertyTypeResultall[1].checked = true;
                        // this.propertyTypeResultall[2].checked = true;
                        // this.propertyTypeResultall[3].checked = true;
                        // this.propertyTypeResultall[4].checked = true;
                        // this.propertyTypeResultall[5].checked = true;
                        // this.propertyTypeResultall[6].checked = true;
                        // this.propertyTypeResultall[7].checked = true;
                        // this.propertyTypeResultall[8].checked = true;
                    }
                }
                _this.propertyshowSpinner = false;
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.propertyshowtitle = false;
            this.propertyshowSpinner = false;
            this.propertyTypeResult = [];
        }
    };
    FilterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filter',
            templateUrl: 'filter.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams,
            ServiceProvider,
            StorageProvider,
            App])
    ], FilterPage);
    return FilterPage;
}());
export { FilterPage };
//# sourceMappingURL=filter.js.map