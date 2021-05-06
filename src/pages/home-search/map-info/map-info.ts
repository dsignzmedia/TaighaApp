import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { FilterPage } from '../filter/filter';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
import { QtoModalPage } from '../qto-modal/qto-modal';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { Searchbar } from 'ionic-angular';

/**
 * Generated class for the MapInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map-info',
  templateUrl: 'map-info.html',
})
export class MapInfoPage {
propertyId: any;
propertyimg: any;
propertyRmlsDays:any;
propertyRmlsDaysRe:any;
  public property : any = [];
  public propertyRmls : any = [];
  public propertyImage : any = [];
  public searchArray:Array<string> = new Array(); 
  public paraArray: any = "";
  showSearchAll: string = 'flex';
showSearchMore: string = 'none';
clickMorescroll: string = 'none';
public showSpinner : boolean = true;
public properties : any = [];
public showSpinnerProperty : boolean = false;
public currentPage = 1;
userid: any;
public searchArrayLast:Array<string> = new Array(); 
public totalPages = 0;
public totalRecords = 0;
  favActivedata: any;
  favActive: string = 'false';
   fav: string = 'favchecked';
   saveSearchurl: any;
     public hasEmailVerified : boolean = false;
  public IsStaff : boolean = false;
  IsStaffCheck: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public service: ServiceProvider,
    public storage : StorageProvider,
    public localstorage : Storage,
    private popover:PopoverController) {
  	this.propertyId = this.navParams.get('propertyId');
  	// this.getProperty();
       try {
       this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.property = response.data;
       this.propertyRmls = response.data.rmls_property;
       this.propertyRmlsDays = response.data.rmls_property.DaysOnMarketCustom;
       var re = /days/gi; 
       this.propertyRmlsDaysRe = this.propertyRmlsDays.replace(re, "D")
       this.propertyImage = response.data.rmls_property_images;
       this.propertyimg = this.propertyImage[0].image;
     }).catch( error => {
     })
         }else{
           this.userid = response.data.id;
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.property = response.data;
       this.propertyRmls = response.data.rmls_property;
       this.propertyRmlsDays = response.data.rmls_property.DaysOnMarketCustom;
       var re = /days/gi; 
       this.propertyRmlsDaysRe = this.propertyRmlsDays.replace(re, "D")
       this.propertyImage = response.data.rmls_property_images;
       this.propertyimg = this.propertyImage[0].image;
     }).catch( error => {
     })
         }
       }).catch( error => {
       })


   } catch(e) {
        this.service.serverError();
    }
        this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      this.IsStaffCheck = auth_user_token.is_staff;
      
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
      }else{
        this.IsStaff = true;
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
    });
  }
   ngOnInit() {
   }
   ClosePopover()
   {
  //  this.popover.dismiss();
   }
   mapClosePopover()
   {
    $('.my-custom-modal-css').css('display','none');

   }
   bodyAction(){
}
  ionViewDidLoad() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
       }).catch( error => {
           console.log(error);
       })
  }
  dismissModal(){
	this.viewCtrl.dismiss()
}

  openProperty(){
   this.viewCtrl.dismiss()
   let openArray =this.searchArray;
   let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : this.propertyId, openArray : openArray});
    addWeatherModal.present();
    addWeatherModal.onDidDismiss(data=>{ 
        this.showSearchMore = 'none';
        this.showSearchAll = 'none';
        if (data == undefined) {
this.showSearchMore = 'none';
this.showSearchAll = 'flex';
this.clickMorescroll = '';
        }else{
           this.showSpinnerProperty = true;
          this.paraArray = data;
          this.searchArray = data.searchArraydata;
  if (this.searchArray.length <= 1) {
this.showSearchMore = 'none';
this.showSearchAll = 'flex';
this.clickMorescroll = '';
}else{
this.showSearchMore = 'flex';
this.clickMorescroll = 'click-more-scroll';
this.showSearchAll = 'none';
this.searchArrayLast = [];
let last:any = this.searchArray[this.searchArray.length-1];
if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
}
           try {
    this.currentPage = 1;
     this.showSpinner = true;
     this.service.homesearchproperties(this.currentPage, this.paraArray, this.userid).then( (response : any) => {
       this.properties = response.data;
       this.totalPages = response.totalPages;
       this.totalRecords = response.totalRecords;
       this.showSpinnerProperty = false;
       this.showSpinner = false;
     }).catch( error => {
         this.showSpinnerProperty = false;
         this.showSpinner = false; 
        // console.log(error);
     })
   } catch(e) {
     this.showSpinnerProperty = false;
     this.showSpinner = false;
        this.service.serverError();
    }
       } 

    })
}
 getProperty() {
    
   try {
       this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.property = response.data;
       this.propertyRmls = response.data.rmls_property;
       this.propertyRmlsDays = response.data.rmls_property.DaysOnMarketCustom;
       var re = /days/gi; 
       this.propertyRmlsDaysRe = this.propertyRmlsDays.replace(re, "D")
       this.propertyImage = response.data.rmls_property_images;
       this.propertyimg = this.propertyImage[0].image;
     }).catch( error => {
     })
         }else{
           this.userid = response.data.id;
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.property = response.data;
       this.propertyRmls = response.data.rmls_property;
       this.propertyRmlsDays = response.data.rmls_property.DaysOnMarketCustom;
       var re = /days/gi; 
       this.propertyRmlsDaysRe = this.propertyRmlsDays.replace(re, "D")
       this.propertyImage = response.data.rmls_property_images;
       this.propertyimg = this.propertyImage[0].image;
     }).catch( error => {
     })
         }
       }).catch( error => {
       })



   } catch(e) {
        this.service.serverError();
    }

   }

foropenEdit(edit){
 this.modalCtrl.create(QtoModalPage, {propertyID: edit}, {cssClass: 'half-modal' }).present();
}
   favorite(propertyid) {
       $("#"+propertyid ).removeClass('tempfav');
        $("#"+propertyid+"card" ).removeClass('tempfav');
     this.service.homesearchpropertiesfav(propertyid).then( (response : any) => {
       this.favActivedata = response.data;
Object.keys(this.favActivedata).forEach(key => {
  let value = this.favActivedata[key];
       if (value == 1) {
         this.favActive = 'true';
         this.fav = 'favchecked';
         $("#"+propertyid ).removeClass('rmtempfav');
         $("#"+propertyid ).addClass('tempfav');

         $("#"+propertyid+"card" ).removeClass('rmtempfav');
         $("#"+propertyid+"card" ).addClass('tempfav');
       }else{
         this.favActive = 'false';
         this.fav = 'unchecked';
         $("#"+propertyid).addClass('rmtempfav');
         $("#"+propertyid+"card" ).addClass('rmtempfav');
       }
});
     }).catch( error => {
     })

   }
   openEdit(edit) {
 this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl }).present();
  }



}
