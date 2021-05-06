import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { FilterPage } from '../filter/filter';
import { ServiceProvider } from '../../../providers/service/service';
import { PushTabsPage } from '../../home-search/push-tabs/push-tabs';
import { StorageProvider } from '../../../providers/storage/storage';
import { SigninPage } from '../../../pages/signin/signin';

@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
  public searchlist : any = [];
    public tabsavedlist : any = [];
  public searchagentlist : any = [];
  userfirstname : any;
  userlastname : any;
  userid : any;
  saveSearchurl: any;
  public showSpinner : boolean = true;
  public isMoreMenu: boolean = false;

 public setsearchFilters: any = { status : [], beds : "", bath:"", min_price: "", max_price: "", sqftmin: "", sqftmax: "", lotsizemin: "", lotsizemax: "", openhouse: "", price_change: "", yearbuildmin: "", yearbuildmax: "", streetname: "", levels: "", legaldescription: "", elementaryschl: "", middleschl: "", highschl: "", keywords: "", listing_agent: "", listing_office: "", pCategories: [], pTypes: [], searchterm: "", requesttype: "" };
 public setsearchparams: any = {};

  public hasEmailVerified : boolean = false;
  IsStaffCheck: any;
  constructor( public alertCtrl: AlertController, public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController, private App: App, public storage: StorageProvider,) {

    // this.tabsavedlist = navParams.data;
    //  console.log(this.tabsavedlist);
    // console.log(this.tabsavedlist.length);
    // if (this.tabsavedlist.length == 0) {
    //    let urlPara: any = {
    //      searchTearm: 'test'
    //    }
    //    this.service.getsavedsearch(urlPara).then( (response : any) => {
    //      console.log(response);
    //      this.searchlist = response.data.rmlsSavedSearches;
    //      this.searchagentlist = response.data.agentrmlsSavedSearches;
    //      this.userfirstname = response.user.first_name;
    //      this.userlastname = response.user.last_name;  
    //      this.showSpinner = false;        
    //    }).catch( error => {
    //    })
    // }else{
    //          this.searchlist = this.tabsavedlist.data.rmlsSavedSearches;
    //      this.searchagentlist = this.tabsavedlist.data.agentrmlsSavedSearches;
    //      this.userfirstname = this.tabsavedlist.user.first_name;
    //      this.userlastname = this.tabsavedlist.user.last_name;  
    //      this.showSpinner = false; 
    // }
   

     // try {
     //   let urlPara: any = {
     //     searchTearm: 'test'
     //   }
     //   this.service.getsavedsearch(urlPara).then( (response : any) => {
     //     console.log(response);
     //     this.searchlist = response.data.rmlsSavedSearches;
     //     this.searchagentlist = response.data.agentrmlsSavedSearches;
     //     this.userfirstname = response.user.first_name;
     //     this.userlastname = response.user.last_name;  
     //     this.showSpinner = false;        
     //   }).catch( error => {
     //   })
     // } catch(e) {
     //   this.service.serverError();
     // }
  }
  ionViewWillEnter() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         if (response == undefined) {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 5});
         }
         this.userid = response.data.id;
         console.log(this.userid);
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      this.IsStaffCheck = auth_user_token.is_staff;
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
    });
          this.clearAndGetProperties();
       }).catch( error => {
         this.userid = '0';
//   let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
//   getsigninModal.present();
//   getsigninModal.onDidDismiss(data=>{ 

// })
           // console.log(error);
            // this.clearAndGetProperties();
       })

  }
   clearAndGetProperties() {
     this.searchlist = [];
     this.searchagentlist = [];
   this.getsavesearch();
 }
  ionViewDidLoad() {
       // let urlPara: any = {
       //   searchTearm: 'test'
       // }
       // this.service.getsavedsearch(urlPara).then( (response : any) => {
       //   console.log(response);
       //   this.searchlist = response.data.rmlsSavedSearches;
       //   this.searchagentlist = response.data.agentrmlsSavedSearches;
       //   this.userfirstname = response.user.first_name;
       //   this.userlastname = response.user.last_name;  
       //   this.showSpinner = false;        
       // }).catch( error => {
       // }) 
  }
  gotoHomesearch(idUrl, getparams){
    this.setsearchparams = getparams;
var url = new URL(idUrl);
var beds= url.searchParams.get("beds");
if (beds == null) {
  var beds= "";
}else{
  var beds= url.searchParams.get("beds");
}

var bath= url.searchParams.get("bath");
if (bath == null) {
  var bath= "";
}else{
  var bath= url.searchParams.get("bath");
}
var min_price= url.searchParams.get("min_price");
if (min_price == null) {
  var min_price= "";
}else{
  var min_price= url.searchParams.get("min_price");
}
var max_price= url.searchParams.get("max_price");
if (max_price == null) {
  var max_price= "";
}else{
  var max_price= url.searchParams.get("max_price");
}
var sqftmin= url.searchParams.get("sqft-min");
if (sqftmin == null) {
  var sqftmin= "";
}else{
  var sqftmin= url.searchParams.get("sqft-min");
}
var sqftmax= url.searchParams.get("sqft-max");
if (sqftmax == null) {
  var sqftmax= "";
}else{
  var sqftmax= url.searchParams.get("sqft-max");
}
var lotsizemin= url.searchParams.get("lotsize-min");
if (lotsizemin == null) {
  var lotsizemin= "";
}else{
  var lotsizemin= url.searchParams.get("lotsize-min");
}
var lotsizemax= url.searchParams.get("lotsize-max");
if (lotsizemax == null) {
  var lotsizemax= "";
}else{
  var lotsizemax= url.searchParams.get("lotsize-max");
}
var openhouse= url.searchParams.get("openhouse");
if (openhouse == null) {
  var openhouse= "";
}else{
  var openhouse= url.searchParams.get("openhouse");
}
var price_change= url.searchParams.get("price_change");
if (price_change == null) {
  var price_change= "";
}else{
  var price_change= url.searchParams.get("price_change");
}
var yearbuildmin= url.searchParams.get("yearbuild-min");
if (yearbuildmin == null) {
  var yearbuildmin= "";
}else{
  var yearbuildmin= url.searchParams.get("yearbuild-min");
}
var yearbuildmax= url.searchParams.get("yearbuild-max");
if (yearbuildmax == null) {
  var yearbuildmax= "";
}else{
  var yearbuildmax= url.searchParams.get("yearbuild-max");
}
var streetname= url.searchParams.get("streetname");
if (streetname == null) {
  var streetname= "";
}else{
  var streetname= url.searchParams.get("streetname");
}
var levels= url.searchParams.get("levels");
if (levels == null) {
  var levels= "";
}else{
  var levels= url.searchParams.get("levels");
}
var legaldescription= url.searchParams.get("legaldescription");
if (legaldescription == null) {
  var legaldescription= "";
}else{
  var legaldescription= url.searchParams.get("legaldescription");
}
var elementaryschl= url.searchParams.get("elementaryschl");
if (elementaryschl == null) {
  var elementaryschl= "";
}else{
  var elementaryschl= url.searchParams.get("elementaryschl");
}
var middleschl= url.searchParams.get("middleschl");
if (middleschl == null) {
  var middleschl= "";
}else{
  var middleschl= url.searchParams.get("middleschl");
}
var highschl= url.searchParams.get("highschl");
if (highschl == null) {
  var highschl= "";
}else{
  var highschl= url.searchParams.get("highschl");
}
var keywords= url.searchParams.get("keywords");
if (keywords == null) {
  var keywords= "";
}else{
  var keywords= url.searchParams.get("keywords");
}
var listing_agent= url.searchParams.get("listing_agent");
if (listing_agent == null) {
  var listing_agent= "";
}else{
  var listing_agent= url.searchParams.get("listing_agent");
}
var listing_office= url.searchParams.get("listing_office");
if (listing_office == null) {
  var listing_office= "";
}else{
  var listing_office= url.searchParams.get("listing_office");
}
var status= url.searchParams.getAll("status[]");
var pTypes= url.searchParams.getAll("pTypes[]");
var pCategories= url.searchParams.getAll("pCategories[]");
var searchterm = url.searchParams.get("existing-tem");
if (searchterm == null) {
  var searchterm= "";
}else{
  var searchterm= url.searchParams.get("existing-tem");
}
var requesttype = 'listings';
  this.isMoreMenu = true;
 // this.App.getRootNav().push(PushTabsPage);
  this.setsearchFilters.beds = beds;
  this.setsearchFilters.status = status;
  this.setsearchFilters.bath = bath;
  this.setsearchFilters.min_price = min_price;
  this.setsearchFilters.max_price = max_price;
  this.setsearchFilters.sqftmin = sqftmin;
  this.setsearchFilters.sqftmax = sqftmax;
  this.setsearchFilters.lotsizemin = lotsizemin;
  this.setsearchFilters.lotsizemax = lotsizemax;
  this.setsearchFilters.openhouse = openhouse;
  this.setsearchFilters.price_change = price_change;
  this.setsearchFilters.yearbuildmin = yearbuildmin;
  this.setsearchFilters.yearbuildmax = yearbuildmax;
  this.setsearchFilters.streetname = streetname;
  this.setsearchFilters.levels = levels;
  this.setsearchFilters.legaldescription = legaldescription;
  this.setsearchFilters.elementaryschl = elementaryschl;
  this.setsearchFilters.middleschl = middleschl;
  this.setsearchFilters.highschl = highschl;
  this.setsearchFilters.keywords = keywords;
  this.setsearchFilters.listing_agent = listing_agent;
  this.setsearchFilters.listing_office = listing_office;
  this.setsearchFilters.pCategories = pCategories;
  this.setsearchFilters.pTypes = pTypes;
  this.setsearchFilters.searchterm = searchterm;
  this.setsearchFilters.requesttype = 'listings';


this.storage.setStorage('fromsavedsearch', this.setsearchFilters);
this.storage.setStorage('fromsavedparams', this.setsearchparams);
  this.storage.getStorage('fromsavedsearch').then((val) => {
    this.App.getRootNav().push(PushTabsPage);
  });

  }
   openEdit(edit, searchId, searchName, searchnotify) {

     this.saveSearchurl="https://toptechrealty.com/public/api/auth/home/search/listings?search-term=97229&request-type=listings&currentPage=1";
   	// this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl, updatesearch: updatesearch }).present();
     if (edit == 'edit') {
                   let updatesearch: any = {
         searchId: searchId,
         searchName: searchName,
         searchnotify: searchnotify,
       }
       let addWeatherModal = this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl, updatesearch: updatesearch });
  addWeatherModal.present();
  addWeatherModal.onDidDismiss(data=>{ 
    this.getsavesearch();    
  })

     }else{

            let forshare: any = {
         searchId: searchId,
         searchName: searchName,
         searchnotify: searchnotify,
       }
       let addWeatherModal = this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl, forshare: forshare });
  addWeatherModal.present();
  addWeatherModal.onDidDismiss(data=>{ 
    this.getsavesearch();    
  })
     }


  }
 openFilter() {
    this.modalCtrl.create(FilterPage).present();
  }
   openHomeSearchmenu(){
       this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
  this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    //      this.isHomeSearchMoreMenu = true;
    //      this.isMoreMenu = false;
    // // this.events.publish('moretabs:invoked');
     this.menuCtrl.toggle()
}
delete(deleteId){
  let alert = this.alertCtrl.create({
    title: 'Please confirm',
    message: 'Are you sure you want to delete?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
       this.service.deletesavedsearch(deleteId).then( (response : any) => {    
         this.getsavesearch();    
       }).catch( error => {
       })
        }
      }
    ]
  });
  alert.present();

}
   getsavesearch() {
     try {
       let urlPara: any = {
         searchTearm: 'test'
       }
       this.service.getsavedsearch(urlPara).then( (response : any) => {
         console.log(response);
         this.searchlist = response.data.rmlsSavedSearches;
         this.searchagentlist = response.data.agentrmlsSavedSearches;
         this.userfirstname = response.user.first_name;
         this.userlastname = response.user.last_name;  
         this.showSpinner = false;        
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
   }
}
