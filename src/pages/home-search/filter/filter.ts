import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App  } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';
import { PushTabsPage } from '../push-tabs/push-tabs';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
public currentPage = 1;
public totalPages = 0;
public totalRecords = 0;
public filters: any = "";
public statusarraystring: any = "";
public prptyresarrayParastring: any = "";
public propertyTypeResultallPara: any = "";
public propertyTypeResultallP: any = "";
public showtotalspin : boolean = false;
public showtotal : boolean = true;
public showSpinner : boolean = false;
public propertyshowtitle : boolean = false;
public propertyshowSpinner : boolean = false;
public propertyTypeResultshow : boolean = false;
public optionResult : any = [];
rmvSmin: any;
newlisting: any;
modifiedlisting: any;
userid: any;
updatelistings: any;
rmvSmax: any;
rmvSminaft: any;
rmvSmaxaft: any;
minempty: any;
maxempty: any;
bedaddname : any;
bathaddname : any;
selectedArray :any = [];
public optionResultprptycate : any = [];
public optionvirtualtour : any = [];
public optionResultstatus : any = [];
public propertyTypeResult : any = [];
public propertyTypeSelect : any = [];
public propertyTypeSelectPara : any = [];
public propertyTypeSelectP:Array<string> = new Array('','','','');
public propertyTypeResultall : any = [];
public checkpropertyTypeResult : any = [];
public optionResultProperty : any = [];
public Residential: any = "";
public prptyclassarray:Array<string> = new Array();
public statusarray:Array<string> = new Array('&status[]=Active','&status[]=Bumpable','','','','');
public prptyresarray:Array<string> = new Array('','','','','','');
public prptyresarrayPara:Array<string> = new Array('','','','');
public PropertyTypeToArray : any = [];
public paraArray:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','','',''); //24
public propertyCat : any = [];
public ResidentialCat : any = [];
public optionResultBaths : any = [];
public optionResultBeds : any = [];
public optionResultFavFeat : any = [];
public optionResultMaxsize : any = [];
public optionResultMinsize : any = [];
public optionResultOpenhouse : any = [];
public optionResultPricechange : any = [];
checkedHouse : boolean = false;
checkedThouse : boolean = false;
checkedCondo : boolean = false;
checkedMultifamily : boolean = false;
checkedLand : boolean = false;
checkedCommercial : boolean = false;
checkedResidential0 : boolean = false;
checkedResidential1 : boolean = false;
checkedResidential2 : boolean = false;
checkedResidential3 : boolean = false;

checkednewlisting : boolean = false;
checkedmodifiedlisting : boolean = false;
checkedFav0 : boolean = false;
checkedFav1 : boolean = false;
  listing0 : boolean = false;
  listing1 : boolean = false;
checkedStatus0 : boolean = true;
checkedStatus1 : boolean = true;
checkedStatus2 : boolean = false;
checkedStatus3 : boolean = false;
checkedStatus4 : boolean = false;
checkedStatus5 : boolean = false;
minPriceInput: string = '';
maxPriceInput: string = '';
minbackPriceInput: any;
maxbackPriceInput: any;
minSqftInput: string = '';
maxSqftInput: string = '';
minlostSizes: string = '';
maxlostSizes: string = '';
checkedVirtualTour : boolean = false;
openHouse: string = '';
priceChange: string = '';
minYearInput: string = '';
maxYearInput: string = '';
streetNameInput: string = '';
levelsInput: string = ''; //15
neighborhoodInput: string = ''; //16
elementaryInput: string = ''; //17
middleInput: string = ''; //18
highInput: string = ''; //19
keyWordsInput: string = ''; //20
listinhAgentInput: string = ''; //21
listingOfficeInput: string = ''; //22
public getselectedBeds : any = [];
public selectedBeds : any = [];
Bedstodo: any;
Bedsany : boolean = false;
Beds1 : boolean = false;
Beds2 : boolean = false;
Beds3 : boolean = false;
Beds4 : boolean = false;
Beds5 : boolean = false;
public fromlocation : any = [];
public getselectedBaths : any = [];
public selectedBaths : any = [];
public selectedPropertyClass : any = [];
getselectedPropertyClass : any ;
public selectedPropertyClass1 : any = [];
getselectedPropertyClass1 : any ;
public selectedPropertyClass2 : any = [];
getselectedPropertyClass2 : any ;
public selectedPropertyClass3 : any = [];
getselectedPropertyClass3 : any ;
public selectedPropertyClass4 : any = [];
getselectedPropertyClass4 : any ;
public selectedPropertyClass5 : any = [];
getselectedPropertyClass5 : any ;
public selectedPropertycate : any = [];
getselectedPropertycate : any ;
public selectedPropertycate1 : any = [];
getselectedPropertycate1 : any ;
public selectedPropertycate2 : any = [];
getselectedPropertycate2 : any ;
public selectedPropertycate3 : any = [];
getselectedPropertycate3 : any ;

public selectedStatus1 : any = [];
getselectedStatus1 : any ;
public selectedStatus2 : any = [];
getselectedStatus2 : any ;
public selectedStatus3 : any = [];
getselectedStatus3 : any ;
public selectedStatus4 : any = [];
getselectedStatus4 : any ;
public selectedStatus5 : any = [];
getselectedStatus5 : any ;
public selectedStatus6 : any = [];
getselectedStatus6 : any ;

getupdatelistings : any ;

Bathstodo: any;
Bathsany : boolean = false;
Baths1 : boolean = false;
Baths2 : boolean = false;
Baths3 : boolean = false;
Baths4 : boolean = false;
Baths5 : boolean = false;
totalRecordsMore: any;
public fromlocationtest : any = [];
public countfilter:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','', ''); //21 24
public paraArrayReturn:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','','',''); //24 26
public searchArray:Array<string> = new Array();
  public storageparaArray:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','',''); //24

  public valpCategories : any = [];
    public valpCat : any = [];
    public valpCatfinal: any = "";

  public valpTypes : any = [];
    public valpType : any = [];
    public valpTypefinal: any = "";
    public valcombineproperty: any = "";

 public valparams : any = [];
  public valstatus : any = [];
    public valsta : any = [];
    public valstafinal: any = "";

    public storageResidential: any = [];
    public storageproperty: any = [];
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,
    public service: ServiceProvider,
    public storage : StorageProvider,
    private App: App) {
      console.log('this.navParams');
      console.log(this.navParams);
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })
  this.storage.getStorage('fromsavedsearch').then((val) => {
    console.log('val');
    console.log(val);
    if (val == null) {
    }else{
      // this.storage.setStorage('fromsavedparams', this.setsearchparams);
        this.storage.getStorage('fromsavedparams').then((valparams) => {
    if (valparams == null) {
    }else{
      this.valparams = valparams;
    }
           });
    if (val.pCategories[0]) {
      this.getselectedPropertycate = val.pCategories[0];
      if (this.getselectedPropertycate) {
        this.selectedPropertycate = "yes";
        this.checkedResidential0 = true;
        this.selectedPropertyClass = "yes";
        this.checkedHouse = true;
        if (this.checkedHouse === true) {
         this.storageproperty.push('house');
        }
        this.selectedPropertyClass1 = "yes";
        this.checkedThouse = true;
        if (this.checkedThouse === true) {
         this.storageproperty.push('townhouse');
        }
        console.log(this.checkedThouse );
        this.selectedPropertyClass2 = "yes";
        this.checkedCondo = true;
        if (this.checkedCondo === true) {
         this.storageproperty.push('condo');
        }
          for(let i = 0; i < 3; i++) {
    this.storageResidential.push('Residential');
  }

      }
    }
    if (val.pCategories[1]) {
      this.getselectedPropertycate1 = val.pCategories[1];
      if (this.getselectedPropertycate1) {
        this.selectedPropertycate1 = "yes";
        this.checkedResidential1 = true;
        this.selectedPropertyClass3 = "yes";
        this.checkedMultifamily = true;
        if (this.checkedMultifamily === true) {
         this.storageproperty.push('multifamily');
        }
        this.storageResidential.push('Multi-family');
      }
    }
    if (val.pCategories[2]) {
      this.getselectedPropertycate2 = val.pCategories[2];
      if (this.getselectedPropertycate2) {
        this.selectedPropertycate2 = "yes";
        this.checkedResidential2 = true;
        this.selectedPropertyClass4 = "yes";
        this.checkedLand = true;
        if (this.checkedLand === true) {
         this.storageproperty.push('land');
        }
        this.storageResidential.push('Land');
      }
    }
    if (val.pCategories[3]) {
      this.getselectedPropertycate3 = val.pCategories[3];
      if (this.getselectedPropertycate3) {
        this.selectedPropertycate3 = "yes";
        this.checkedResidential3 = true;
        this.selectedPropertyClass5 = "yes";
        this.checkedCommercial = true;
        if (this.checkedCommercial === true) {
         this.storageproperty.push('commercial');
        }
        this.storageResidential.push('Commercial Sale');
      }
    }
   var Residentialstrg = this.storageResidential.toString();
   var propertystrg = this.storageproperty.toString();
    this.service.getpropertyType(Residentialstrg, propertystrg).then( (response : any) => {
      // console.log(response);
      this.propertyTypeResult = response.data;
      this.propertyTypeResultall = response.data.property_types;
      this.checkpropertyTypeResult = response.data.selected_property_types;
var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
console.log(jsonArray);
this.propertyTypeSelect = jsonArray;
});


    this.Bedstodo = val.beds;
    if (this.Bedstodo == 'any') {
      this.Bedsany = true;
    } else if (this.Bedstodo == '1'){
      this.Beds1 = true;
    } else if (this.Bedstodo == '2'){
      this.Beds2 = true;
    } else if (this.Bedstodo == '3'){
      this.Beds3 = true;
    } else if (this.Bedstodo == '4'){
      this.Beds4 = true;
    } else if (this.Bedstodo == '5'){
      this.Beds5 = true;
    }else{

    }
    this.Bathstodo = val.bath;
    if (this.Bathstodo == 'any') {
      this.Bathsany = true;
    } else if (this.Bathstodo == '1'){
      this.Baths1 = true;
    } else if (this.Bathstodo == '2'){
      this.Baths2 = true;
    } else if (this.Bathstodo == '3'){
      this.Baths3 = true;
    } else if (this.Bathstodo == '4'){
      this.Baths4 = true;
    } else if (this.Bathstodo == '5'){
      this.Baths5 = true;
    }else{

    }

this.valpCategories = val.pCategories;
var selectArrayvalpCategories = this.valpCategories.map(i =>  i );
this.valpCat = selectArrayvalpCategories;
for(var i=0;i<this.valpCat.length;i++){
    this.valpCat[i]="&pCategories[]="+this.valpCat[i];
}
this.valpCatfinal = this.valpCat.join('');
// console.log(this.valpCatfinal);

this.valpTypes = val.pTypes;
var selectArrayvalpTypes = this.valpTypes.map(i =>  i );
this.valpType = selectArrayvalpTypes;
for(var i=0;i<this.valpType.length;i++){
    this.valpType[i]="&pCategories[]="+this.valpType[i];
}
this.valpTypefinal = this.valpType.join('');
// console.log(this.valpTypefinal);

this.valstatus = val.status;
var selectArrayvalstatus = this.valstatus.map(i =>  i );
this.valsta = selectArrayvalstatus;
for(var i=0;i<this.valsta.length;i++){
    this.valsta[i]="&status[]="+this.valsta[i];
}
this.valstafinal = this.valsta.join('');
// console.log(this.valsta);

this.valcombineproperty = this.valpCatfinal+this.valpTypefinal;
      this.paraArray.splice(0, 1, val.searchterm);
      this.paraArray.splice(1, 1, val.requesttype);
      this.paraArray.splice(2, 1, val.beds);
      this.paraArray.splice(3, 1, val.bath);
      this.paraArray.splice(4, 1, val.min_price);
      this.paraArray.splice(5, 1, val.max_price);
      this.paraArray.splice(6, 1, val.sqftmin);
      this.paraArray.splice(7, 1, val.sqftmax);
      this.paraArray.splice(8, 1, val.lotsizemin);
      this.paraArray.splice(9, 1, val.lotsizemax);
      this.paraArray.splice(10, 1, val.openhouse);
      this.paraArray.splice(11, 1, val.price_change);
      this.paraArray.splice(12, 1, val.yearbuildmin);
      this.paraArray.splice(13, 1, val.yearbuildmax);
      this.paraArray.splice(14, 1, val.streetname);
      this.paraArray.splice(15, 1, val.levels);
      this.paraArray.splice(16, 1, val.legaldescription);
      this.paraArray.splice(17, 1, val.elementaryschl);
      this.paraArray.splice(18, 1, val.middleschl);
      this.paraArray.splice(19, 1, val.highschl);
      this.paraArray.splice(20, 1, val.keywords);
      this.paraArray.splice(21, 1, val.listing_agent);
      this.paraArray.splice(22, 1, val.listing_office);
      this.paraArray.splice(23, 1, this.valstafinal);
      this.paraArray.splice(24, 1, this.valcombineproperty);
      this.paraArray.splice(25, 1, '');

      if (this.paraArray[4] == '') {
        this.minPriceInput = convert(this.paraArray[4]);
      }else{
        this.minPriceInput = "$"+convert(this.paraArray[4]);
      }
      if (this.paraArray[5] == '') {
        this.maxPriceInput = convert(this.paraArray[5]);
      }else{
        this.maxPriceInput = "$"+convert(this.paraArray[5]);
      }
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

    if (val.status[0]) {
      this.getselectedStatus1 = val.status[0];
      if (this.getselectedStatus1) {
        this.selectedStatus1 = "yes";
        this.checkedStatus0 = true;
        this.statusarray.splice(0, 1, '&status[]=Active');
      }
      if (this.getselectedStatus1 == '') {
        this.selectedStatus1 = "no";
        this.checkedStatus0 = false;
    this.statusarray.splice(0, 1, '');
      }
    }
    if (val.status[1]) {
      this.getselectedStatus2 = val.status[1];
      if (this.getselectedStatus2) {
        this.selectedStatus2 = "yes";
        this.checkedStatus1 = true;
        this.statusarray.splice(1, 1, '&status[]=Bumpable');
      }
      if (this.getselectedStatus2 == '') {
        this.selectedStatus2 = "no";
        this.checkedStatus1 = false;
    this.statusarray.splice(1, 1, '');
      }
    }
    if (val.status[2]) {
      this.getselectedStatus3 = val.status[2];
      if (this.getselectedStatus3) {
        this.selectedStatus3 = "yes";
        this.checkedStatus2 = true;
        this.statusarray.splice(2, 1, '&status[]=Short Sale');
      }
    }
    if (val.status[3]) {
      this.getselectedStatus4 = val.status[3];
      if (this.getselectedStatus4) {
        this.selectedStatus4 = "yes";
        this.checkedStatus3 = true;
        this.statusarray.splice(3, 1, '&status[]=Pending');
      }
    }
    if (val.status[4]) {
      this.getselectedStatus5 = val.status[4];
      if (this.getselectedStatus5) {
        this.selectedStatus5 = "yes";
        this.checkedStatus4 = true;
        this.statusarray.splice(4, 1, '&status[]=Sold');
      }
    }
    if (val.status[5]) {
      console.log('val.status[5]');
      console.log(val.status[5]);
      this.getselectedStatus6 = val.status[5];
      if (this.getselectedStatus6) {
        this.selectedStatus6 = "yes";
        this.checkedStatus5 = true;
        this.statusarray.splice(5, 1, '&status[]=Off Market');
      }
    }
      this.paraArrayReturn.splice(0, 1, val.searchterm);
      this.paraArrayReturn.splice(1, 1, val.requesttype);
      this.paraArrayReturn.splice(2, 1, val.beds);
      this.paraArrayReturn.splice(3, 1, val.bath);
      this.paraArrayReturn.splice(4, 1, val.min_price);
      this.paraArrayReturn.splice(5, 1, val.max_price);
      this.paraArrayReturn.splice(6, 1, val.sqftmin);
      this.paraArrayReturn.splice(7, 1, val.sqftmax);
      this.paraArrayReturn.splice(8, 1, val.lotsizemin);
      this.paraArrayReturn.splice(9, 1, val.lotsizemax);
      this.paraArrayReturn.splice(10, 1, val.openhouse);
      this.paraArrayReturn.splice(11, 1, val.price_change);
      this.paraArrayReturn.splice(12, 1, val.yearbuildmin);
      this.paraArrayReturn.splice(13, 1, val.yearbuildmax);
      this.paraArrayReturn.splice(14, 1, val.streetname);
      this.paraArrayReturn.splice(15, 1, val.levels);
      this.paraArrayReturn.splice(16, 1, val.legaldescription);
      this.paraArrayReturn.splice(17, 1, val.elementaryschl);
      this.paraArrayReturn.splice(18, 1, val.middleschl);
      this.paraArrayReturn.splice(19, 1, val.highschl);
      this.paraArrayReturn.splice(20, 1, val.keywords);
      this.paraArrayReturn.splice(21, 1, val.listing_agent);
      this.paraArrayReturn.splice(22, 1, val.listing_office);
      this.paraArrayReturn.splice(23, 1, this.valstafinal);
      this.paraArrayReturn.splice(24, 1, this.valcombineproperty);
      this.paraArrayReturn.splice(25, 1, '');
         this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArrayReturn, this.userid).then( (response : any) => {
           console.log(response);
      this.totalRecords = response.totalRecords;
      this.showtotalspin = false;
      this.showtotal = true;
         }).catch( error => {
         })
}

  });
    this.searchArray = this.navParams.get('searchArray');
    if (this.navParams.get('paraArray')) {
      this.paraArray = this.navParams.get('paraArray');
      if (this.paraArray.length == 0) {
        this.paraArray =['','','','','','','','','','','','','','','','','','','','','','','','',''];
      }
    }
    if (this.navParams.get('updatelistings')) {
      this.updatelistings = this.navParams.get('updatelistings');
      console.log(this.updatelistings);
  // var isnewlisting = this.updatelistings.search("new_listing=1");
  // if (this.updatelistings.search("new_listing=1")) {
  //   console.log('isnewlisting Yes');
  // }else{
  //   console.log('isnewlisting No');
  // }

  //    = this.updatelistings.search("modified_listing=1");
  // if (this.updatelistings.search("modified_listing=1")) {
  //   console.log('ismodifiedlisting Yes');
  // }else{
  //   console.log('ismodifiedlisting No');
  // }
if (this.updatelistings.indexOf('new_listing=1') >= 0) {
  this.checkednewlisting = true;
}
if (this.updatelistings.indexOf('modified_listing=1') >= 0) {
  this.checkedmodifiedlisting = true;
}
if (this.updatelistings.indexOf('new_listing=0') >= 0) {
  this.checkednewlisting = false;
}
if (this.updatelistings.indexOf('modified_listing=0') >= 0) {
  this.checkedmodifiedlisting = false;
}
//  var isnewlisting = this.updatelistings.split(/\s+|\./).filter(word => word === 'new_listing=1').length;
//  console.log(isnewlisting);
// if (isnewlisting == 1) {
//     console.log('isnewlisting Yes');
//   }else{
//     console.log('isnewlisting No');
//   }

//  var ismodifiedlisting = this.updatelistings.split(/\s+|\./).filter(word => word === 'modified_listing=1').length;
//   console.log(ismodifiedlisting);
// if (ismodifiedlisting == 1) {
//     console.log('ismodifiedlisting Yes');
//   }else{
//     console.log('ismodifiedlisting No');
//   }
      if (this.updatelistings == '&updated_at=m_desc') {
        // code...
      }
    }
    if (this.navParams.get('countfilter')) {
      this.countfilter = this.navParams.get('countfilter');
    }
    if (this.navParams.get('prptyresarray')) {
      this.prptyresarray = this.navParams.get('prptyresarray');
    }
    if (this.navParams.get('prptyclassarray')) {
      this.prptyclassarray = this.navParams.get('prptyclassarray');
    }
    if (this.navParams.get('propertyTypeSelect')) {
      this.propertyTypeSelect = this.navParams.get('propertyTypeSelect');
      this.propertyTypeResultshow = true;
    }
    if (this.navParams.get('paraArrayReturn')) {
      this.paraArrayReturn = this.navParams.get('paraArrayReturn');
      this.fromlocationtest = this.navParams.get('paraArrayReturn');
      if (this.paraArrayReturn.length == 0 && this.fromlocationtest.length == 0 ) {
        this.paraArrayReturn =['','','','','','','','','','','','','','','','','','','','','','','','','',''];
        this.fromlocationtest =['','','','','','','','','','','','','','','','','','','','','','','','','',''];
      }
    }
    this.statusarray.splice(0, 1, '&status[]=Active');
    this.statusarray.splice(1, 1, '&status[]=Bumpable');
    if (this.navParams.get('selectedStatus1')) {
      this.getselectedStatus1 = this.navParams.get('selectedStatus1');
      if (this.getselectedStatus1 == 'yes') {
        this.selectedStatus1 = "yes";
        this.checkedStatus0 = true;
        this.statusarray.splice(0, 1, '&status[]=Active');
      }
      if (this.getselectedStatus1 == 'no') {
        this.selectedStatus1 = "no";
        this.checkedStatus0 = false;
    this.statusarray.splice(0, 1, '');
      }
    }
    if (this.navParams.get('selectedStatus2')) {
      this.getselectedStatus2 = this.navParams.get('selectedStatus2');
      if (this.getselectedStatus2 == 'yes') {
        this.selectedStatus2 = "yes";
        this.checkedStatus1 = true;
        this.statusarray.splice(1, 1, '&status[]=Bumpable');
      }
      if (this.getselectedStatus2 == 'no') {
        this.selectedStatus2 = "no";
        this.checkedStatus1 = false;
    this.statusarray.splice(1, 1, '');
      }
    }
    if (this.navParams.get('selectedStatus3')) {
      this.getselectedStatus3 = this.navParams.get('selectedStatus3');
      if (this.getselectedStatus3 == 'yes') {
        this.selectedStatus3 = "yes";
        this.checkedStatus2 = true;
        this.statusarray.splice(2, 1, '&status[]=Short Sale');
      }
    }
    if (this.navParams.get('selectedStatus4')) {
      this.getselectedStatus4 = this.navParams.get('selectedStatus4');
      if (this.getselectedStatus4 == 'yes') {
        this.selectedStatus4 = "yes";
        this.checkedStatus3 = true;
        this.statusarray.splice(3, 1, '&status[]=Pending');
      }
    }
    if (this.navParams.get('selectedStatus5')) {
      this.getselectedStatus5 = this.navParams.get('selectedStatus5');
      if (this.getselectedStatus5 == 'yes') {
        this.selectedStatus5 = "yes";
        this.checkedStatus4 = true;
        this.statusarray.splice(4, 1, '&status[]=Sold');
      }
    }
    console.log('selectedStatus6');
    console.log(this.getselectedStatus6);
    if (this.navParams.get('selectedStatus6')) {
      this.getselectedStatus6 = this.navParams.get('selectedStatus6');
      if (this.getselectedStatus6 == 'yes') {
        this.selectedStatus6 = "yes";
        this.checkedStatus5 = true;
        this.statusarray.splice(5, 1, '&status[]=Off Market');
      }
    }
    if(this.navParams.get('paraArrayReturn')){
      if(this.navParams.get('paraArrayReturn')[26] == "Virtual Tour"){
        this.checkedVirtualTour = true;
      }
    }
    if (this.navParams.get('selectedPropertyClass')) {
      this.getselectedPropertyClass = this.navParams.get('selectedPropertyClass');
      if (this.getselectedPropertyClass == 'yes') {
        this.selectedPropertyClass = "yes";
        this.checkedHouse = true;
      }
    }
    console.log(this.navParams.get('selectedPropertyClass1'));
    if (this.navParams.get('selectedPropertyClass1')) {
      this.getselectedPropertyClass1 = this.navParams.get('selectedPropertyClass1');
      if (this.getselectedPropertyClass1 == 'yes') {
        this.selectedPropertyClass1 = "yes";
        this.checkedThouse = true;
      }
    }
     console.log(this.navParams.get('selectedPropertyClass2'));
    if (this.navParams.get('selectedPropertyClass2')) {
      this.getselectedPropertyClass2 = this.navParams.get('selectedPropertyClass2');
      if (this.getselectedPropertyClass2 == 'yes') {
        this.selectedPropertyClass2 = "yes";
        this.checkedCondo = true;
      }
    }
    if (this.navParams.get('selectedPropertyClass3')) {
      this.getselectedPropertyClass3 = this.navParams.get('selectedPropertyClass3');
      if (this.getselectedPropertyClass3 == 'yes') {
        this.selectedPropertyClass3 = "yes";
        this.checkedMultifamily = true;
      }
    }
    if (this.navParams.get('selectedPropertyClass4')) {
      this.getselectedPropertyClass4 = this.navParams.get('selectedPropertyClass4');
      if (this.getselectedPropertyClass4 == 'yes') {
        this.selectedPropertyClass4 = "yes";
        this.checkedLand = true;
      }
    }
    if (this.navParams.get('selectedPropertyClass5')) {
      this.getselectedPropertyClass5 = this.navParams.get('selectedPropertyClass5');
      if (this.getselectedPropertyClass5 == 'yes') {
        this.selectedPropertyClass5 = "yes";
        this.checkedCommercial = true;
      }
    }
    if (this.navParams.get('selectedPropertycate')) {
      this.getselectedPropertycate = this.navParams.get('selectedPropertycate');
      if (this.getselectedPropertycate == 'yes') {
        this.selectedPropertycate = "yes";
        this.checkedResidential0 = true;
      }
    }
    if (this.navParams.get('selectedPropertycate1')) {
      this.getselectedPropertycate1 = this.navParams.get('selectedPropertycate1');
      if (this.getselectedPropertycate1 == 'yes') {
        this.selectedPropertycate1 = "yes";
        this.checkedResidential1 = true;
      }
    }
    if (this.navParams.get('selectedPropertycate2')) {
      this.getselectedPropertycate2 = this.navParams.get('selectedPropertycate2');
      if (this.getselectedPropertycate2 == 'yes') {
        this.selectedPropertycate2 = "yes";
        this.checkedResidential2 = true;
      }
    }
    if (this.navParams.get('selectedPropertycate3')) {
      this.getselectedPropertycate3 = this.navParams.get('selectedPropertycate3');
      if (this.getselectedPropertycate3 == 'yes') {
        this.selectedPropertycate3 = "yes";
        this.checkedResidential3 = true;
      }
    }
    this.optionResult = this.navParams.get('optionResult');
    console.log(this.optionResult);
    this.totalRecordsMore = this.navParams.get('totalRecords');
    if (this.navParams.get('fromlocation')) {
      this.fromlocation = this.navParams.get('fromlocation');
    }
    if (this.fromlocationtest.searchTearm) {
      this.paraArray.splice(0, 1, this.fromlocationtest.searchTearm);
    }else{
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
      this.paraArray.splice(25, 1, this.paraArrayReturn[25]);
      this.paraArray.splice(26, 1, this.paraArrayReturn[26]);
    }
    function convert(value)
    {
      if(value>=1000000)
      {
        value=(value/1000000)+"M"
      }
      else if(value>=1000)
      {
        value=(value/1000)+"K";
      }
      return value;
    }
    if (this.paraArray) {
      if (this.paraArray[4] == '') {
        this.minPriceInput = convert(this.paraArray[4]);
      }else{
        this.minPriceInput = "$"+convert(this.paraArray[4]);
      }
      if (this.paraArray[5] == '') {
        this.maxPriceInput = convert(this.paraArray[5]);
      }else{
        this.maxPriceInput = "$"+convert(this.paraArray[5]);
      }
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
    this.optionResultBaths = this.optionResult.baths;
    this.optionResultBeds = this.optionResult.beds;
    this.optionResultFavFeat = this.optionResult.favorites_and_featured;
    this.optionResultMaxsize = this.optionResult.maxlostSizes;
    this.optionResultMinsize = this.optionResult.minlostSizes;
    this.optionResultOpenhouse = this.optionResult.open_house;
    this.optionResultPricechange = this.optionResult.price_change;
    this.optionResultProperty = this.optionResult.property_class;
    this.optionResultprptycate = this.optionResult.property_category;
    this.optionvirtualtour = this.optionResult.virtual_tour;
    this.optionResultstatus = this.optionResult.status;
    this.getselectedBeds = this.navParams.get('selectedBeds');
    this.paraArray.splice(2, 1, this.getselectedBeds);
    this.getselectedBaths = this.navParams.get('selectedBaths');
    this.paraArray.splice(3, 1, this.getselectedBaths);
    if (this.getselectedBeds == undefined || this.getselectedBeds == '') {
      this.Bedstodo = [{active: ''}];
    }else{
      this.Bedstodo = this.getselectedBeds[0].active;
    }
    this.Bedstodo = "Beds"+this.paraArray[2];
    if (this.Bedstodo == 'Bedsany') {
      this.Bedsany = true;
    } else if (this.Bedstodo == 'Beds1'){
      this.Beds1 = true;
    } else if (this.Bedstodo == 'Beds2'){
      this.Beds2 = true;
    } else if (this.Bedstodo == 'Beds3'){
      this.Beds3 = true;
    } else if (this.Bedstodo == 'Beds4'){
      this.Beds4 = true;
    } else if (this.Bedstodo == 'Beds5'){
      this.Beds5 = true;
    }else{

    }
    if (this.getselectedBaths == undefined || this.getselectedBaths == '') {
      this.Bathstodo = [{active: ''}];
    }else{
      this.Bathstodo = this.getselectedBaths[0].active
    }
    this.Bathstodo = "Baths"+this.paraArray[3];
    if (this.Bathstodo == 'Bathsany') {
      this.Bathsany = true;
    } else if (this.Bathstodo == 'Baths1'){
      this.Baths1 = true;
    } else if (this.Bathstodo == 'Baths2'){
      this.Baths2 = true;
    } else if (this.Bathstodo == 'Baths3'){
      this.Baths3 = true;
    } else if (this.Bathstodo == 'Baths4'){
      this.Baths4 = true;
    } else if (this.Bathstodo == 'Baths5'){
      this.Baths5 = true;
    }else{

    }
    if (this.totalRecordsMore) {
      this.totalRecords = this.totalRecordsMore;
    }
    this.paraArray.splice(0, 1, this.searchArray.toString());
    this.paraArray.splice(1, 1, 'listings');
    this.showtotalspin = true;
    this.showtotal = false;
    if (this.fromlocationtest.searchTearm) {
      this.paraArrayReturn = ['97229','listings','','','','','','','','','','','','','','','','','','','','','','',''];
    }else{
    }

    this.statusarraystring = this.statusarray.filter(item => item);
    this.statusarraystring = this.statusarray.join('');
    this.paraArray.splice(23, 1, this.statusarraystring);
    console.log(this.userid);
    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArrayReturn, 0).then( (response : any) => {
      // console.log(this.paraArrayReturn);
      // console.log(this.userid);
      console.log(response);
      this.totalRecords = response.totalRecords;
      this.showtotalspin = false;
      this.showtotal = true;
      // console.log(this.totalRecords);
    }).catch( error => {

    })
    if (this.userid == undefined) {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         if (response) {
    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArrayReturn, this.userid).then( (response : any) => {
      console.log(this.currentPage);
      console.log(this.filters);
      console.log(this.paraArray);
      console.log(this.paraArrayReturn);
      console.log(this.userid);
      console.log(response);
      this.totalRecords = response.totalRecords;
      this.showtotalspin = false;
      this.showtotal = true;
      console.log(this.totalRecords);
    }).catch( error => {

    })
         }else{
    this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArrayReturn, 0).then( (response : any) => {
      // console.log(this.paraArrayReturn);
      // console.log(this.userid);
      console.log(response);
      this.totalRecords = response.totalRecords;
      this.showtotalspin = false;
      this.showtotal = true;
      // console.log(this.totalRecords);
    }).catch( error => {

    })
         }

         console.log(this.userid);
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })
    }

    this.selectedStatus1 = "yes";
    this.selectedStatus2 = "yes";
  }

  ionViewWillEnter() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })

  }
  listings(filterValue: any, $event): void {
// console.log(filterValue);

       if (this.checkednewlisting == true) {
        this.newlisting = '&new_listing=1';
       }else{
        this.newlisting = '&new_listing=0';
       }
       if (this.checkedmodifiedlisting == true) {
        this.modifiedlisting = '&modified_listing=1';
       }else{
        this.modifiedlisting = '&modified_listing=0';
       }
              console.log(this.newlisting + this.modifiedlisting);
this.updatelistings = this.newlisting + this.modifiedlisting;
     if (this.updatelistings == '') {
       this.countfilter.splice(22, 1, '');
     }else{
       this.countfilter.splice(22, 1, this.updatelistings);
     }
     // if (this.listing0 == false) {
     //   this.countfilter.splice(22, 1, '');
     // }else{
     //   this.countfilter.splice(22, 1, 'updatelistings');
     // }
     // if (this.listing1 == false) {
     //   this.countfilter.splice(22, 1, '');
     // }else{
     //   this.countfilter.splice(22, 1, 'updatelistings');
     // }


this.paraArray.splice(25, 1, this.updatelistings);
console.log(this.paraArray);
      this.showtotalspin = true;
      this.showtotal = false;
      this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
        console.log(response);
        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
        this.showtotal = true;
      }).catch( error => {

      })
  }
  BedsCheckbox(datakey, filterValue: any, $event): void {
    this.bedaddname = "Beds"+filterValue;
    this.bathaddname = "Baths"+filterValue;
    try {
      if (datakey == 'beds') {
        if (this.bedaddname == 'Beds1') {
          this.Beds1 = true;
        }
        if (this.bedaddname == 'Beds2') {
          this.Beds2 = true;
        }
        if (this.bedaddname == 'Beds3') {
          this.Beds3 = true;
        }
        if (this.bedaddname == 'Beds4') {
          this.Beds4 = true;
        }
        if (this.bedaddname == 'Beds5') {
          this.Beds5 = true;
        }
        if (this.bedaddname == 'Bedsany') {
          this.Bedsany = true;
        }
        this.paraArray.splice(2, 1, filterValue);
        this.selectedBeds.splice(0, 1, {Bedname : filterValue, active : "Beds"+filterValue});

        this.countfilter.splice(1, 1, 'beds');
      } else if (datakey == 'baths') {
        if (this.bathaddname == 'Baths1') {
          this.Baths1 = true;
        }
        if (this.bathaddname == 'Baths2') {
          this.Baths2 = true;
        }
        if (this.bathaddname == 'Baths3') {
          this.Baths3 = true;
        }
        if (this.bathaddname == 'Baths4') {
          this.Baths4 = true;
        }
        if (this.bathaddname == 'Baths5') {
          this.Baths5 = true;
        }
        if (this.bathaddname == 'Bathsany') {
          this.Bathsany = true;
        }
        this.paraArray.splice(3, 1, filterValue);
        this.selectedBaths.splice(0, 1, {Bathname : filterValue, active : "Baths"+filterValue});
        this.countfilter.splice(2, 1, 'baths');
      }else{
      }
      this.showtotalspin = true;
      this.showtotal = false;
      this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
        this.showtotal = true;
      }).catch( error => {

      })
    } catch(e) {
      this.service.serverError();
    }
  }

  filterHomes(){
console.log(this.countfilter);
    this.selectedBeds = this.paraArray[2];
    this.selectedBaths = this.paraArray[3];
    var multipliers = {k: 1000, m: 1000000};
    if (this.minPriceInput || this.maxPriceInput) {
      this.minbackPriceInput = parseFloat(this.minPriceInput)*multipliers[this.minPriceInput.charAt(this.minPriceInput.length-1).toLowerCase()];
      this.maxbackPriceInput = parseFloat(this.maxPriceInput)*multipliers[this.maxPriceInput.charAt(this.maxPriceInput.length-1).toLowerCase()];
    }
console.log(this.paraArray);
    this.viewCtrl.dismiss({
      paraArray : this.paraArray,
      selectedBeds : this.selectedBeds,
      selectedBaths : this.selectedBaths,
      totalRecords : this.totalRecords,
      selectedPropertyClass : this.selectedPropertyClass,
      selectedPropertyClass1 : this.selectedPropertyClass1,
      selectedPropertyClass2 : this.selectedPropertyClass2,
      selectedPropertyClass3 : this.selectedPropertyClass3,
      selectedPropertyClass4 : this.selectedPropertyClass4,
      selectedPropertyClass5 : this.selectedPropertyClass5,
      selectedStatus1 : this.selectedStatus1,
      selectedStatus2 : this.selectedStatus2,
      selectedStatus3 : this.selectedStatus3,
      selectedStatus4 : this.selectedStatus4,
      selectedStatus5 : this.selectedStatus5,
      selectedStatus6 : this.selectedStatus6,
      selectedPropertycate : this.selectedPropertycate,
      selectedPropertycate1 : this.selectedPropertycate1,
      selectedPropertycate2 : this.selectedPropertycate2,
      selectedPropertycate3 : this.selectedPropertycate3,
      countfilter : this.countfilter,
      propertyTypeSelect : this.propertyTypeSelect,
      prptyresarray: this.prptyresarray,
      prptyclassarray: this.prptyclassarray,
      updatelistings: this.updatelistings
    })
    this.storage.removeStorage('fromsavedsearch');
  }

   favCheckbox(fav: any, $event): void {

   }

   statusCheckbox(status: any, $event): void {
     this.countfilter.splice(6, 1, 'status');
     if (status == 'Active') {
       if(this.checkedStatus0 == true){
         this.selectedStatus1 = "yes";
         this.statusarray.splice(0, 1, '&status[]=Active');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         console.log(this.paraArray);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
       if(this.checkedStatus0 == false){
         this.selectedStatus1 = "no";
         this.statusarray.splice(0, 1, '');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
     }
     if (status == 'Bumpable buyer') {
       if(this.checkedStatus1 == true){
         this.selectedStatus2 = "yes";
         this.statusarray.splice(1, 1, '&status[]=Bumpable');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {
           this.service.serverError();
         }
       }
       if(this.checkedStatus1 == false){
         this.selectedStatus2 = "no";
         this.statusarray.splice(1, 1, '');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {
           this.service.serverError();
         }
       }
     }
     if (status == 'Short Sale Pending') {
       if(this.checkedStatus2 == true){
         this.selectedStatus3 = "yes";
         this.statusarray.splice(2, 1, '&status[]=Short Sale');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {
           })
         } catch(e) {
           this.service.serverError();
         }
       }
       if(this.checkedStatus2 == false){
         this.selectedStatus3 = "no";
         this.statusarray.splice(2, 1, '');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {
           this.service.serverError();
         }
       }
     }

     if (status == 'Pending') {
       if(this.checkedStatus3 == true){
         this.selectedStatus4 = "yes";
         this.statusarray.splice(3, 1, '&status[]=Pending');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
       if(this.checkedStatus3 == false){
         this.selectedStatus4 = "no";
         this.statusarray.splice(3, 1, '');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
     }
     if (status == 'Sold') {
       if(this.checkedStatus4 == true){
         this.selectedStatus5 = "yes";
         this.statusarray.splice(4, 1, '&status[]=Sold');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
       if(this.checkedStatus4 == false){
         this.selectedStatus5 = "no";
         this.statusarray.splice(4, 1, '');
         this.statusarraystring = this.statusarray.filter(item => item);
         this.statusarraystring = this.statusarray.join('');
         this.paraArray.splice(23, 1, this.statusarraystring);
         try {
           this.showtotalspin = true;
           this.showtotal = false;
           this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
             this.totalRecords = response.totalRecords;
             this.showtotalspin = false;
             this.showtotal = true;
           }).catch( error => {

           })
         } catch(e) {

           this.service.serverError();
         }
       }
     }
     if (status == 'Off Market') {
      if(this.checkedStatus5 == true){
        this.selectedStatus6 = "yes";
        this.statusarray.splice(5, 1, '&status[]=Off Market');
        this.statusarraystring = this.statusarray.filter(item => item);
        this.statusarraystring = this.statusarray.join('');
        this.paraArray.splice(23, 1, this.statusarraystring);
        try {
          this.showtotalspin = true;
          this.showtotal = false;
          this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
            console.log(response);
            this.totalRecords = response.totalRecords;
            this.showtotalspin = false;
            this.showtotal = true;
          }).catch( error => {

          })
        } catch(e) {

          this.service.serverError();
        }
      }
      if(this.checkedStatus5 == false){
        this.selectedStatus6 = "no";
        this.statusarray.splice(5, 1, '');
        this.statusarraystring = this.statusarray.filter(item => item);
        this.statusarraystring = this.statusarray.join('');
        this.paraArray.splice(23, 1, this.statusarraystring);
        try {
          this.showtotalspin = true;
          this.showtotal = false;
          this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
            this.totalRecords = response.totalRecords;
            this.showtotalspin = false;
            this.showtotal = true;
          }).catch( error => {

          })
        } catch(e) {

          this.service.serverError();
        }
      }
    }
   }

   setlistingOfficeInput(){
     this.paraArray.splice(22, 1, this.listingOfficeInput);
     if (this.listingOfficeInput == '') {
       this.countfilter.splice(18, 1, '');
     }else{
       this.countfilter.splice(18, 1, 'listingOfficeInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {

       this.service.serverError();
     }
   }

   setlistinhAgentInput(){
     this.paraArray.splice(21, 1, this.listinhAgentInput);
     if (this.listinhAgentInput == '') {
       this.countfilter.splice(17, 1, '');
     }else{
       this.countfilter.splice(17, 1, 'listinhAgentInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {

       this.service.serverError();
     }
   }

   setkeyWordsInput(){
     this.paraArray.splice(20, 1, this.keyWordsInput);
     if (this.keyWordsInput == '') {
       this.countfilter.splice(16, 1, '');
     }else{
       this.countfilter.splice(16, 1, 'keyWordsInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {

       this.service.serverError();
     }
   }

   sethighInput(){
     this.paraArray.splice(19, 1, this.highInput);
     this.highInput == ' ';
     this.highInput == '';
     if (this.highInput == '') {
       this.countfilter.splice(15, 1, '');
     }else{
       this.countfilter.splice(15, 1, 'highInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;

       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {

       this.service.serverError();
     }
   }

   setmiddleInput(){
     this.paraArray.splice(18, 1, this.middleInput);
     if (this.middleInput == '') {
       this.countfilter.splice(14, 1, '');
     }else{
       this.countfilter.splice(14, 1, 'middleInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;

       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {

       this.service.serverError();
     }
   }

   setelementaryInput(){
     this.paraArray.splice(17, 1, this.elementaryInput);
     if (this.elementaryInput == '') {
       this.countfilter.splice(13, 1, '');
     }else{
       this.countfilter.splice(13, 1, 'elementaryInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setneighborhoodInput(){
     this.paraArray.splice(16, 1, this.neighborhoodInput);
     if (this.neighborhoodInput == '') {
       this.countfilter.splice(12, 1, '');
     }else{
       this.countfilter.splice(12, 1, 'neighborhoodInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {

       this.service.serverError();
     }
   }

   setlevelsInput(){
     this.paraArray.splice(15, 1, this.levelsInput);
     if (this.levelsInput == '') {
       this.countfilter.splice(11, 1, '');
     }else{
       this.countfilter.splice(11, 1, 'levelsInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {
       this.service.serverError();
     }
   }

propertyClass(key){
}
ionViewDidLoad() {

}

dismissModal() {
  this.selectedBeds = this.paraArray[2];
  this.selectedBaths = this.paraArray[3];
  var multipliers = {k: 1000, m: 1000000};
  if (this.minPriceInput || this.maxPriceInput) {
    this.minbackPriceInput = parseFloat(this.minPriceInput)*multipliers[this.minPriceInput.charAt(this.minPriceInput.length-1).toLowerCase()];
    this.maxbackPriceInput = parseFloat(this.maxPriceInput)*multipliers[this.maxPriceInput.charAt(this.maxPriceInput.length-1).toLowerCase()];
  }
  this.viewCtrl.dismiss({
    paraArray : this.paraArray,
    selectedBeds : this.selectedBeds,
    selectedBaths : this.selectedBaths,
    totalRecords : this.totalRecords,
    selectedPropertyClass : this.selectedPropertyClass,
    selectedPropertyClass1 : this.selectedPropertyClass1,
    selectedPropertyClass2 : this.selectedPropertyClass2,
    selectedPropertyClass3 : this.selectedPropertyClass3,
    selectedPropertyClass4 : this.selectedPropertyClass4,
    selectedPropertyClass5 : this.selectedPropertyClass5,
      selectedStatus1 : this.selectedStatus1,
      selectedStatus2 : this.selectedStatus2,
      selectedStatus3 : this.selectedStatus3,
      selectedStatus4 : this.selectedStatus4,
      selectedStatus5 : this.selectedStatus5,
      selectedStatus6 : this.selectedStatus6,
    selectedPropertycate : this.selectedPropertycate,
    selectedPropertycate1 : this.selectedPropertycate1,
    selectedPropertycate2 : this.selectedPropertycate2,
    selectedPropertycate3 : this.selectedPropertycate3,
    countfilter : this.countfilter,
    propertyTypeSelect : this.propertyTypeSelect
  })
}

resetAll(){
  this.storage.removeStorage('fromsavedsearch');
  this.selectedPropertyClass = "no";
  this.selectedPropertyClass1 = "no";
  this.selectedPropertyClass2 = "no";
  this.selectedPropertyClass3 = "no";
  this.selectedPropertyClass4 = "no";
  this.selectedPropertyClass5 = "no";
  this.showtotalspin = true;
  this.showtotal = false;
  this.Beds1 = false;
  this.Beds2 = false;
  this.Beds3 = false;
  this.Beds4 = false;
  this.checkednewlisting = false;
  this.checkedmodifiedlisting = false;
  this.Beds5 = false;
  this.Bedsany = false;
  this.Baths1 = false;
  this.Baths2 = false;
  this.Baths3 = false;
  this.Baths4 = false;
  this.Baths5 = false;
  this.Bathsany = false;
  this.listing0 = false;
  this.listing1 = false;
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
  this.checkedStatus0 = true;
  this.checkedStatus1 = true;
  this.checkedStatus2 = false;
  this.checkedStatus3 = false;
  this.checkedStatus4 = false;
  this.checkedStatus5 = false;
  this.checkedVirtualTour = false;
  this.checkedFav0 = false;
  this.checkedFav1 = false;
  this.propertyCat = '';
  this.ResidentialCat = '';
  this.prptyclassarray = [];
  this.prptyresarray = [];
  this.minPriceInput =  '';
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
  this.updatelistings = '';
  this.paraArray = ['','','','','','','','','','','','','','','','','','','','','','','','&status[]=Active&status[]=Bumpable','',''];
  this.countfilter = ['','','','','','','','','','','','','','','','','','','','','','','', ''];
  this.propertyTypeSelect = [];
  this.paraArray.splice(0, 1, this.searchArray.toString());
  this.paraArray.splice(1, 1, 'listings');
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {
    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
  }).catch( error => {
  })
  this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
    this.totalRecords = response.totalRecords;
    this.showtotalspin = false;
    this.showtotal = true;
  }).catch( error => {
  })
}

 getOption() {
   try {
     this.service.getoptions().then( (response : any) => {
       this.optionResult = response.data;
       console.log(this.optionResult);
       this.optionResultBaths = response.data.baths;
       this.optionResultBeds = response.data.beds;
       this.optionResultFavFeat = response.data.favorites_and_featured;
       this.optionResultMaxsize = response.data.maxlostSizes;
       this.optionResultMinsize = response.data.minlostSizes;
       this.optionResultOpenhouse = response.data.open_house;
       this.optionResultPricechange = response.data.price_change;
       this.optionResultProperty = response.data.property_class;
       this.optionResultprptycate = response.data.property_category;
       this.optionResultstatus = response.data.status;
       this.optionvirtualtour = response.data.virtual_tour;
       this.showSpinner = false;
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
   }

   parameter(datakey: any, $event){

   }

   changepriceChange(){
     this.paraArray.splice(11, 1, this.priceChange);
     this.countfilter.splice(8, 1, 'priceChange');
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {
       this.service.serverError();
     }
   }
   virtualtourCheckbox(virtualtour: any, $event): void {
     console.log(virtualtour);
     console.log($event);
    if($event == true){
      this.paraArray.splice(26, 1, virtualtour);
    }else{
      this.paraArray.splice(26, 1,'');
    }
      try {
        this.showtotalspin = true;
        this.showtotal = false;
        this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
          this.totalRecords = response.totalRecords;
          this.showtotalspin = false;
          this.showtotal = true;
        }).catch( error => {

        })
      } catch(e) {

        this.service.serverError();
      }
   }
   changeopenHouse(){
     this.paraArray.splice(10, 1, this.openHouse);
     this.countfilter.splice(7, 1, 'openHouse');
     console.log(this.paraArray);
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {
       this.service.serverError();
     }
   }

   changeminLotsize(){
     this.paraArray.splice(8, 1, this.minlostSizes);
     this.paraArray.splice(9, 1, this.maxlostSizes);
     if (this.minlostSizes == '' && this.maxlostSizes == '' ) {
       this.countfilter.splice(5, 1, '');
     }else{
       this.countfilter.splice(5, 1, 'minlostSizes');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   changemaxLotsize(){
     this.paraArray.splice(8, 1, this.minlostSizes);
     this.paraArray.splice(9, 1, this.maxlostSizes);
     if (this.minlostSizes == '' && this.maxlostSizes == '' ) {
       this.countfilter.splice(5, 1, '');
     }else{
       this.countfilter.splice(5, 1, 'minlostSizes');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setminYearInput(){
     this.paraArray.splice(12, 1, this.minYearInput);
     this.paraArray.splice(13, 1, this.maxYearInput);
     if (this.minYearInput == '' && this.maxYearInput == '' ) {
       this.countfilter.splice(9, 1, '');
     }else{
       this.countfilter.splice(9, 1, 'minYearInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {

       })
     } catch(e) {
       this.service.serverError();
     }
   }
   setmaxYearInput(){
     this.paraArray.splice(12, 1, this.minYearInput);
     this.paraArray.splice(13, 1, this.maxYearInput);
     if (this.minYearInput == '' && this.maxYearInput == '' ) {
       this.countfilter.splice(9, 1, '');
     }else{
       this.countfilter.splice(9, 1, 'maxYearInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setstreetNameInput(){
     this.paraArray.splice(14, 1, this.streetNameInput);
     if (this.streetNameInput == '') {
       this.countfilter.splice(10, 1, '');
     }else{
       this.countfilter.splice(10, 1, 'streetNameInput');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setminPriceInput(){
     if (this.minPriceInput == '' && this.maxPriceInput == '' ) {
       this.countfilter.splice(0, 1, '');
     }else{
       this.countfilter.splice(0, 1, 'minprice');
     }
     function convert(value)
     {
       if(value>=1000000)
       {
         value=(value/1000000)+"M"
       }
       else if(value>=1000)
       {
         value=(value/1000)+"K";
       }
       return value;
     }
     this.minempty = this.minPriceInput;
     if (this.minempty == '') {
       this.maxbackPriceInput = '';
       this.minPriceInput = '';
       this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
       var multipliers = {k: 1000, m: 1000000};
       if (this.minPriceInput == '') {
         this.minbackPriceInput = this.minPriceInput;
       }else{
         this.minbackPriceInput = parseFloat(this.rmvSminaft)*multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length-1).toLowerCase()];
       }
       if (this.maxPriceInput == '') {
         this.maxbackPriceInput = this.maxPriceInput;
       }else{
         this.maxbackPriceInput = parseFloat(this.rmvSmaxaft)*multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length-1).toLowerCase()];
       }
     }else{
       this.rmvSmin = this.minPriceInput.replace('$', '');
       this.minPriceInput = "$"+convert(this.rmvSmin);
       this.rmvSminaft = this.minPriceInput.replace('$', '');
       this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
       var multipliers = {k: 1000, m: 1000000};
       if (this.minPriceInput == '') {
         this.minbackPriceInput = this.minPriceInput;
       }else{
         this.minbackPriceInput = parseFloat(this.rmvSminaft)*multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length-1).toLowerCase()];
       }
       if (this.maxPriceInput == '') {
         this.maxbackPriceInput = this.maxPriceInput;
       }else{
         this.maxbackPriceInput = parseFloat(this.rmvSmaxaft)*multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length-1).toLowerCase()];
       }
     }
     this.paraArray.splice(4, 1, this.minbackPriceInput);
     this.paraArray.splice(5, 1, this.maxbackPriceInput);
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setmaxPriceInput(){
     if (this.minPriceInput == '' && this.maxPriceInput == '' ) {
       this.countfilter.splice(0, 1, '');
     }else{
       this.countfilter.splice(0, 1, 'maxprice');
     }
     function convert(value)
     {
       if(value>=1000000)
       {
         value=(value/1000000)+"M"
       }
       else if(value>=1000)
       {
         value=(value/1000)+"K";
       }
       return value;
     }
     this.maxempty = this.maxPriceInput;
     if (this.maxempty == '') {
       this.maxbackPriceInput = '';
       this.maxPriceInput = '';
       this.rmvSminaft = this.minPriceInput.replace('$', '');
       var multipliers = {k: 1000, m: 1000000};
       if (this.minPriceInput == '') {
         this.minbackPriceInput = this.minPriceInput;
       }else{
         this.minbackPriceInput = parseFloat(this.rmvSminaft)*multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length-1).toLowerCase()];
       }
       if (this.maxPriceInput == '') {
         this.maxbackPriceInput = this.maxPriceInput;
       }else{
         this.maxbackPriceInput = parseFloat(this.rmvSmaxaft)*multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length-1).toLowerCase()];
       }
     }else{
       this.rmvSmax = this.maxPriceInput.replace('$', '');
       this.maxPriceInput = "$"+convert(this.rmvSmax);
       this.rmvSminaft = this.minPriceInput.replace('$', '');
       this.rmvSmaxaft = this.maxPriceInput.replace('$', '');
       var multipliers = {k: 1000, m: 1000000};
       if (this.minPriceInput == '') {
         this.minbackPriceInput = this.minPriceInput;
       }else{
         this.minbackPriceInput = parseFloat(this.rmvSminaft)*multipliers[this.rmvSminaft.charAt(this.rmvSminaft.length-1).toLowerCase()];
       }
       if (this.maxPriceInput == '') {
         this.maxbackPriceInput = this.maxPriceInput;
       }else{
         this.maxbackPriceInput = parseFloat(this.rmvSmaxaft)*multipliers[this.rmvSmaxaft.charAt(this.rmvSmaxaft.length-1).toLowerCase()];
       }
     }
     this.paraArray.splice(4, 1, this.minbackPriceInput);
     this.paraArray.splice(5, 1, this.maxbackPriceInput);
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setminSqftInput(){
     this.paraArray.splice(6, 1, this.minSqftInput);
     this.paraArray.splice(7, 1, this.maxSqftInput);
     if (this.minSqftInput == '' && this.maxSqftInput == '' ) {
       this.countfilter.splice(4, 1, '');
     }else{
       this.countfilter.splice(4, 1, 'minsqft');
     }
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   setmaxSqftInput(){
     if (this.minSqftInput == '' && this.maxSqftInput == '' ) {
       this.countfilter.splice(4, 1, '');
     }else{
       this.countfilter.splice(4, 1, 'maxsqft');
     }
     this.paraArray.splice(6, 1, this.minSqftInput);
     this.paraArray.splice(7, 1, this.maxSqftInput);
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }

    prptyTypeCheckbox(property, PropertyTypeName, $event): void {
// console.log(property);
// console.log(PropertyTypeName);
// console.log(this.paraArray);
 var ptypes = this.paraArray[24];
// console.log(ptypes);
 var addedpara = '&pTypes[]='+PropertyTypeName;
 if (property == false) {
var ptypeReplaced = ptypes.replace(addedpara,'');
 }else{

if (ptypes.indexOf(addedpara) > -1)
{
  var ptypeReplaced = ptypes.replace(addedpara, addedpara);
}else{
  var ptypeReplaced = ptypes+addedpara;
}
// var ptypes = ptypes+addedpara;
// var ret = ptypes.replace(addedpara, addedpara);

// var ret = ptypes.concat(addedpara);
 }
// console.log(ptypeReplaced);   //prints: 123
this.paraArray.splice(24, 1, ptypeReplaced);
console.log(this.paraArray);
     try {
       this.showtotalspin = true;
       this.showtotal = false;
       this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
         console.log(response);
         this.totalRecords = response.totalRecords;
         this.showtotalspin = false;
         this.showtotal = true;
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
//  console.log(ptypes);

this.countfilter.splice(21, 1, 'propertytype');

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
    }
    unqPropertyType(property, PropertyTypeName){
//
//
//   if (property = false) {
//   this.checkedCondo = true;
// }
    }
    testt(){
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
    }

    unqCheckbox(Residential){

       this.countfilter.splice(3, 1, 'propertyClass');


      if (this.checkedHouse == true || this.checkedThouse == true || this.checkedCondo == true) {
          this.prptyresarrayPara.splice(0, 1, '&pCategories[]=Residential');

      }
      if (this.checkedHouse == true && this.checkedThouse == true && this.checkedCondo == true) {
          this.prptyresarrayPara.splice(0, 1, '');

      }
if (this.checkedHouse == true) {
        if (Residential == 'Residential1') {
        this.prptyresarray.splice(0, 1, 'Residential');
        this.selectedPropertyClass = "yes";
          }
}
if (this.checkedHouse == false) {
        if (Residential == 'Residential1') {
        this.prptyresarray.splice(0, 1, '');
        this.selectedPropertyClass = "no";
          }
}
if (this.checkedThouse == true) {
        if (Residential == 'Residential2') {
        this.prptyresarray.splice(1, 1, 'Residential');
        this.selectedPropertyClass1 = "yes";
          }
}
if (this.checkedThouse == false) {
        if (Residential == 'Residential2') {
        this.prptyresarray.splice(1, 1, '');
        this.selectedPropertyClass1 = "no";
          }
}
if (this.checkedCondo == true) {
        if (Residential == 'Residential3') {
      this.prptyresarray.splice(2, 1, 'Residential');
      this.selectedPropertyClass2 = "yes";
          }
}
if (this.checkedCondo == false) {
        if (Residential == 'Residential3') {
        this.prptyresarray.splice(2, 1, '');
        this.selectedPropertyClass2 = "no";
          }
}

if (this.checkedMultifamily == true) {
        if (Residential == 'MultiFamily') {
        this.prptyresarray.splice(3, 1, 'Multi-family');
        this.prptyresarrayPara.splice(1, 1, '&pCategories[]=MultiFamily');
        this.selectedPropertyClass3 = "yes";
this.prptyresarrayParastring = this.prptyresarrayPara.filter(item => item);

this.prptyresarrayParastring = this.prptyresarrayPara.join('');

 this.paraArray.splice(24, 1, this.prptyresarrayParastring);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
       console.log(response);

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;
     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
          }
}
if (this.checkedMultifamily == false) {
        if (Residential == 'MultiFamily') {
        this.prptyresarray.splice(3, 1, '');
        this.prptyresarrayPara.splice(1, 1, '');
        this.selectedPropertyClass3 = "no";

          }
}
if (this.checkedLand == true) {
        if (Residential == 'Land') {
        this.prptyresarray.splice(4, 1, 'Land');
        this.prptyresarrayPara.splice(2, 1, '&pCategories[]=Land');
        this.selectedPropertyClass4 = "yes";
          }
}
if (this.checkedLand == false) {
        if (Residential == 'Land') {
        this.prptyresarray.splice(4, 1, '');
        this.prptyresarrayPara.splice(2, 1, '');
        this.selectedPropertyClass4 = "no";
          }
}
if (this.checkedCommercial == true) {
        if (Residential == 'Sale') {
      this.prptyresarray.splice(5, 1, 'Commercial Sale');
      this.prptyresarrayPara.splice(3, 1, '&pCategories[]=Commercial Sale');
      this.selectedPropertyClass5 = "yes";
          }
}
if (this.checkedCommercial == false) {
        if (Residential == 'Sale') {
        this.prptyresarray.splice(5, 1, '');
        this.prptyresarrayPara.splice(3, 1, '');
        this.selectedPropertyClass5 = "no";

          }
}

    }




   unqPropertyCat(value){
     // console.log(value);
        this.countfilter.splice(20, 1, 'propertycate');

if (value == 'Res') {

     if (this.checkedResidential0 == false) {
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
    this.propertyCat = '';
    this.ResidentialCat = '';
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
        }).catch( error => {
      // console.log(error);
  })
     }

}

if (value == 'mltFmly') {

  if (this.checkedResidential1 == false) {
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = false;
this.checkedLand = false;
this.checkedCommercial = false;
    this.propertyCat = '';
    this.ResidentialCat = '';
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
        }).catch( error => {
      // console.log(error);
  })
  }
}

if (value == 'lnd') {

  if (this.checkedResidential2 == false){
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = false;
this.checkedLand = false;
this.checkedCommercial = false;
    this.propertyCat = '';
    this.ResidentialCat = '';
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
        }).catch( error => {
      // console.log(error);
  })
  }
}

if (value == 'sal') {

  if (this.checkedResidential3== false){
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = false;
this.checkedLand = false;
this.checkedCommercial = false;
    this.propertyCat = '';
    this.ResidentialCat = '';
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
        }).catch( error => {
      // console.log(error);
  })
  }
}


   }

   propertyCatCheckboxClicked(Category: any, $event): void {
// console.log("propertyCatCheckboxClicked");
if (this.checkedResidential0 == false && this.checkedResidential1 == false  && this.checkedResidential2 == false  && this.checkedResidential3 == false ) {
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
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

this.totalRecords = 0;
this.propertyTypeSelect = [];

        }).catch( error => {
      // console.log(error);
  })

} else if (this.checkedResidential0 == true && this.checkedResidential1 == true  && this.checkedResidential2 == true  && this.checkedResidential3 == true ) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
//         var jsonArray = this.propertyTypeResultall.map(i => {
//    return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
// });
// this.propertyTypeSelect = jsonArray;
//
// common
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);

   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }

        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential0 == true && this.checkedResidential2 == true  && this.checkedResidential3 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }

        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential1 == true && this.checkedResidential2 == true  && this.checkedResidential3 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential0 == true && this.checkedResidential1 == true  && this.checkedResidential3 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential0 == true && this.checkedResidential1 == true  && this.checkedResidential2 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })


} else if (this.checkedResidential0 == true && this.checkedResidential2 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential0 == true && this.checkedResidential3 == true) {
//   this.propertyTypeSelectPara.push('&pCategories[]=Residential');
// this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
// // console.log(this.propertyTypeSelectPara);
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential1 == true && this.checkedResidential2 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Land');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential1 == true && this.checkedResidential3 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else if (this.checkedResidential2 == true && this.checkedResidential3 == true) {
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


  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Land');
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }

        }).catch( error => {
      // console.log(error);
  })
}else if (this.checkedResidential0 == true) {
this.checkedHouse = true;
this.checkedThouse = true;
this.checkedCondo = true;
//this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial';
    this.propertyCat = 'house,townhouse,condo';
    this.ResidentialCat = "Residential,Residential,Residential,,, ";
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
    // this.propertyTypeResultall[0].checked = true;
    // this.propertyTypeResultall[2].checked = true;
    // this.propertyTypeResultall[8].checked = true;
    // this.propertyTypeResultall[9].checked = true;
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Residential');

    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }

        }).catch( error => {
      // console.log(error);
  })
}else if (this.checkedResidential1 == true) {
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = true;
    //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
    this.propertyCat = 'MultiFamily';
    this.ResidentialCat = '';
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;
// common
    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=MultiFamily');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
}else if (this.checkedResidential2 == true) {
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = false;
this.checkedLand = true;
    //this.propertyCat = 'house,townhouse,condo,multifamily,land,commercial  MultiFamily,Land,Commercial Sale';
    this.propertyCat = "Land";
    this.ResidentialCat = " ,,,,Land, ";
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Land');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
}else if (this.checkedResidential3 == true) {
this.checkedHouse = false;
this.checkedThouse = false;
this.checkedCondo = false;
this.checkedMultifamily = false;
this.checkedLand = false;
this.checkedCommercial = true;
    this.propertyCat = 'Commercial Sale';

    this.ResidentialCat = " ,,,,,Commercial Sale";
  this.service.getpropertyType(this.ResidentialCat, this.propertyCat).then( (response : any) => {

    this.propertyTypeResult = response.data;
    this.propertyTypeResultall = response.data.property_types;
    this.checkpropertyTypeResult = response.data.selected_property_types;

    var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;

    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;


for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pCategories[]="+this.propertyTypeSelectPara[i];
}
this.propertyTypeSelectPara.push('&pCategories[]=Commercial Sale');
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');

     this.paraArray.splice(24, 1, this.propertyTypeResultallPara);
   try {
     this.showtotalspin = true;
this.showtotal = false;

     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })
   } catch(e) {

        this.service.serverError();
    }
// common
        }).catch( error => {
      // console.log(error);
  })
} else {
  // code...
}


   }


      propertyCheckboxClicked(Residential, property: any, $event): void {
this.propertyshowSpinner = true;
                  if (this.checkedHouse == true || this.checkedThouse == true || this.checkedCondo == true) {
          this.checkedResidential0 = true;
          this.selectedPropertycate = "yes";
      this.propertyTypeSelectP.splice(0, 1, '&pCategories[]=Residential');
        }else{
          this.checkedResidential0 = false;
          this.selectedPropertycate = "no";
      this.propertyTypeSelectP.splice(1, 1, '');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedMultifamily == true) {
          this.checkedResidential1 = true;
          this.selectedPropertycate1 = "yes";
      this.propertyTypeSelectP.splice(1, 1, '&pCategories[]=MultiFamily');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedMultifamily == false){
          this.checkedResidential1 = false;
          this.selectedPropertycate1 = "no";
      this.propertyTypeSelectP.splice(1, 1, '');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedLand == true) {
          this.checkedResidential2 = true;
          this.selectedPropertycate2 = "yes";
      this.propertyTypeSelectP.splice(2, 1, '&pCategories[]=Land');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedLand == false){
          this.checkedResidential2 = false;
          this.selectedPropertycate2 = "no";
      this.propertyTypeSelectP.splice(2, 1, '');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedCommercial == true) {
          this.checkedResidential3 = true;
          this.selectedPropertycate3 = "yes";
      this.propertyTypeSelectP.splice(3, 1, '&pCategories[]=Commercial Sale');
    // console.log(this.propertyTypeSelectP);
        }
        if (this.checkedCommercial == false){
          this.checkedResidential3 = false;
          this.selectedPropertycate3 = "no";
      this.propertyTypeSelectP.splice(3, 1, '');
    // console.log(this.propertyTypeSelectP);
        }
            if (this.checkedHouse == false && this.checkedThouse == false && this.checkedCondo == false) {
          // console.log("all three");
   this.propertyTypeSelectP.splice(0, 1, '');
   // console.log(this.propertyTypeSelectP);
      this.propertyshowtitle = false;
      this.propertyshowSpinner = true;
      // this.paraArray.splice(24, 1, '');
      var paraarray = this.paraArray[24];
      var ret = paraarray.replace('&pCategories[]=Residential','');
      // console.log(ret);
      this.paraArray.splice(24, 1, ret);
    }

    let idx = this.prptyclassarray.indexOf(property);
    if (idx > -1) {
      this.prptyclassarray.splice(idx, 1);
    } else {
      this.prptyclassarray.push(property);
    }
    this.prptyclassarray.filter(item => item);


        this.propertyshowtitle = true;
        this.propertyTypeResultshow = true;
        this.propertyshowSpinner = true;

    if (this.checkedHouse == true || this.checkedThouse == true || this.checkedCondo == true || this.checkedMultifamily == true || this.checkedLand == true || this.checkedCommercial == true) {
    property = this.prptyclassarray.toString();
    Residential = this.prptyresarray.toString();

    // console.log(Residential);
    // console.log(property);

    this.service.getpropertyType(Residential, property).then( (response : any) => {
       console.log(response);
      this.propertyTypeResult = response.data;
      this.propertyTypeResultall = response.data.property_types;
      this.checkpropertyTypeResult = response.data.selected_property_types;


function comparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.value == current.value && other.display == current.display
    }).length == 0;
  }
}
var jsonArray = this.propertyTypeResultall.map(i => {
   return { 'PropertyType': i.PropertyType, 'matched': this.checkpropertyTypeResult.includes(i.PropertyType) };
});
this.propertyTypeSelect = jsonArray;
    var selectArray = this.checkpropertyTypeResult.map(i =>  i );
this.propertyTypeSelectPara = selectArray;
for(var i=0;i<this.propertyTypeSelectPara.length;i++){
    this.propertyTypeSelectPara[i]="&pTypes[]="+this.propertyTypeSelectPara[i];
}
    this.propertyTypeResultallPara = this.propertyTypeSelectPara.join('');
    this.propertyTypeResultallP = this.propertyTypeSelectP.join('');
     this.paraArray.splice(24, 1, this.propertyTypeResultallPara+this.propertyTypeResultallP);
   try {
     this.showtotalspin = true;
this.showtotal = false;
console.log(this.paraArray);
     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
       // here
       console.log(response);
        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
this.showtotal = true;

     }).catch( error => {

     })

   } catch(e) {

        this.service.serverError();
    }
            for (let i = 0; i < this.checkpropertyTypeResult.length ; i++) {
              if (this.propertyTypeResultall[i].checked == true) {
                // code...
              }

        }
      if (this.propertyTypeResult.property_types.length == 0) {
        this.propertyshowtitle = false;
      }else{

      if (this.checkedHouse == true && this.checkedThouse == true && this.checkedCondo == true && this.checkedMultifamily == true && this.checkedLand == true) {

      }
      if (this.checkedHouse == true && this.checkedThouse == true && this.checkedCondo == true && this.checkedMultifamily == true && this.checkedLand == true && this.checkedCommercial == true) {

      }
      if (this.checkedLand == true && this.checkedCommercial == true) {

        }
      if (this.checkedHouse == true) {
      //  this.propertyTypeResultall[8].checked = true;
      }
      if (this.checkedThouse == true) {
        // this.propertyTypeResultall[0].checked = true;
        // this.propertyTypeResultall[9].checked = true;
      }
      if (this.checkedCondo == true) {
      //  this.propertyTypeResultall[2].checked = true;
      }
      if (this.checkedLand == true) {

      }

      }
      this.propertyshowSpinner = false;
    }).catch( error => {
        // console.log(error);
    })
    }else{

      this.propertyshowtitle = false;
      this.propertyshowSpinner = false;
      this.propertyTypeResult = [];
    }
            if (this.checkedHouse == false && this.checkedThouse == false && this.checkedCondo == false) {
       //   console.log("all three");
  this.propertyTypeSelectP.splice(1, 1, '');
      this.propertyshowtitle = false;
      this.propertyshowSpinner = true;
      // this.paraArray.splice(24, 1, '');
      var paraarray = this.paraArray[24];
      var ret = paraarray.replace('&pCategories[]=Residential','');
     // console.log(ret);
      this.paraArray.splice(24, 1, ret);
      console.log(this.paraArray);
     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
       console.log(response);
        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
        this.propertyshowSpinner = false;
this.showtotal = true;

     }).catch( error => {

     })
}
if (this.checkedHouse == false && this.checkedThouse == false && this.checkedCondo == false && this.checkedMultifamily == false && this.checkedLand == false && this.checkedCommercial == false) {
       //   console.log("all");
  this.propertyTypeSelectP.splice(1, 1, '');
      this.propertyshowtitle = false;
      this.propertyshowSpinner = true;
      this.propertyTypeSelect = [];
       this.paraArray.splice(24, 1, '');
      console.log(this.paraArray);
     this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {
       console.log(response);
        this.totalRecords = response.totalRecords;
        this.showtotalspin = false;
        this.propertyshowSpinner = false;
this.showtotal = true;

     }).catch( error => {

     })
  }

  }


}
