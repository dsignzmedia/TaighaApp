import { Component,  ViewChild, ElementRef, Input  } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { FilterPage } from '../filter/filter';
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

@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {

public searchArray:Array<string> = new Array(); 
public openArray:Array<string> = new Array(); 
searchTearm: string = '97229';
requestType: string = 'listings';
showSearchLoading: string = 'none';
showSearchPanel: string = 'none';
searchTerm: string = '';
public searchResult : any = [];
public searchArrayLast:Array<string> = new Array(); 
showSearchAll: string = 'block';
clickMorescroll: string = 'none';
hideAfterFive: string = 'block';
showAfterFive: string = 'none';
public currentPage = 1;
public paraArray : any = [];
public valWithString: any = "";
public forinfi : any = [];
public commonarray:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','',''); //
@ViewChild('searchbar') searchbar: Searchbar;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public service: ServiceProvider,
    public storage : StorageProvider,
    public localstorage : Storage) {
if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
this.forinfi = this.navParams.get('forinfi');
this.commonarray = this.navParams.get('commonarray');
if (this.navParams.get('openArray')) {
	this.openArray = this.navParams.get('openArray');
	this.searchArray = this.openArray;
	if (this.openArray.length >= 5) {
		this.hideAfterFive = 'none';
		this.showAfterFive = 'block';
	}else{
		this.hideAfterFive = 'block';
		this.showAfterFive = 'none';
	}
}

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 1000);
 //   console.log('ionViewDidLoad SearchModalPage');
  
  }
   checkBlur(){

   }
   // cls(){
   //   this.keyboard.hide();
   // }

clearAllreset(){

  this.searchArray = [];
  
  this.storage.removeStorage('fromsavedsearch');
       this.requestType = this.requestType;
      // this.searchArraydata = ["97229"];
		this.hideAfterFive = 'block';
		this.showAfterFive = 'none';
	
}
searchdismissModal(){
if (this.searchTerm != '') {
  if (this.searchArray.indexOf(this.searchTerm) === -1) this.searchArray.push(this.searchTerm);
  if (this.searchArray.length > 1) {
this.clickMorescroll = 'click-more-scroll';
this.showSearchAll = 'none';
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}else{
    if (this.searchArray.length == 0) {
    if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
  }
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}
}
dismissModal(){
if (this.searchTerm != '') {
  if (this.searchArray.indexOf(this.searchTerm) === -1) this.searchArray.push(this.searchTerm);
  if (this.searchArray.length > 1) {
this.clickMorescroll = 'click-more-scroll';
this.showSearchAll = 'none';
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}else{
    if (this.searchArray.length == 0) {
    if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
  }
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}
}
search(ev){
if (ev.target.value != '') {
  if (this.searchArray.indexOf(ev.target.value) === -1) this.searchArray.push(ev.target.value);
  if (this.searchArray.length > 1) {
this.clickMorescroll = 'click-more-scroll';
this.showSearchAll = 'none';
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}else{
    if (this.searchArray.length == 0) {
    if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
  }
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}
}
getByZipcode(val){
   // this.searchbar.clearInput(null);
   this.searchTerm = '';
   this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(val) === -1) this.searchArray.push(val);
  if (this.searchArray.length > 1) {
this.clickMorescroll = 'click-more-scroll';
this.showSearchAll = 'none';
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
}
searchbarfocus(){
  console.log("close keyboard");
}

  getByAddress(propertyId){
    // this.searchbarfocus();
  // 
   $('page-search-modal').css('display','none');
    // document.getElementById("searchbarfocus").blur();
let openArray = [''];
let forinfi = [''];
// this.navCtrl.push(PropertyDetailPage, { propertyId : propertyId, openArray : openArray, forinfi: forinfi}); 
  let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : propertyId, openArray : openArray, forinfi: this.forinfi});
  addWeatherModal.present();

  addWeatherModal.onDidDismiss(data=>{
    if (this.searchArray.length == 0) {
    if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
  }
  this.commonarray.splice(0, 1, this.searchArray.toString());
  this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
      // }
        })
            // this.viewCtrl.dismiss();
  })
  }
 getByPlaces(city, country) {
   // this.searchbar.clearInput(null);
   this.searchTerm = '';
   this.valWithString = city.replace(/,/g, '-');
    this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
                 //   searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
    //  }
        })

 }

 getByElementary(val) {
   // this.searchbar.clearInput(null);
   this.searchTerm = '';
   this.valWithString = val+' Elementary School' ;
    this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
                 //   searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
     // }
        })
 }
  getByHigh(val) {
    // this.searchbar.clearInput(null);
    this.searchTerm = '';
   this.valWithString = val+' High School' ;
    this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
               //     searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
   //   }
        })
 }
  getByMiddle(val) {
    // this.searchbar.clearInput(null);
    this.searchTerm = ''; 
   this.valWithString = val+' Middle School' ;
    this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
  this.commonarray.splice(0, 1, this.searchArray.toString());
	this.viewCtrl.dismiss({
             searchData1 : this.searchArray.toString(),
             //       searchData:  {
       searchTearm: this.searchArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.searchArray,
       commonarray: this.commonarray
   //   }
        })
 }




 setFilteredLocations(){
   if (this.searchTerm == '') {
     // code...
   }else{
      this.showSearchLoading = 'block';
      this.showSearchPanel = 'block';
   try {
     this.service.searchBy(this.searchTerm, this.searchArray.length).then( (response : any) => {
       if (this.searchTerm == '') {
         this.searchResult = '';
       }else{
         this.searchResult = response.data;
       }
       
       this.showSearchLoading = 'none';

     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }
}

}
bodyAction(){
  this.showSearchPanel = 'none';
  // this.searchbar.clearInput(null);
  this.searchTerm = '';

}
 clearTerm1(val) {
   this.showSearchPanel = 'none';
    const index: number = this.searchArray.indexOf(val);
    if (index !== -1) {
        this.searchArray.splice(index, 1);
    }
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
	if (this.searchArray.length >= 5) {
		this.hideAfterFive = 'none';
		this.showAfterFive = 'block';
	}else{
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
}

}
