import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewImagePage } from '../view-image/view-image';
import { RequestTourPage } from '../request-tour/request-tour';
import { ServiceProvider } from '../../../providers/service/service';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { StorageProvider } from '../../../providers/storage/storage';
import { QtoModalPage } from '../qto-modal/qto-modal';
import { PushTabsPage } from '../../home-search/push-tabs/push-tabs';
import { SigninPage } from '../../../pages/signin/signin';

declare var google;

@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html',
})
export class PropertyDetailPage {
  @ViewChild('propertymap') mapElement: ElementRef;

  propertymap: any;
  generalcollapseIcon: any;
  residencecollapseIcon: any;
  featurescollapseIcon: any;
  historycollapseIcon: any;
  userid: any;
  financialcollapseIcon: any;
  favActivedata: any;
  favActive: string = 'false';
   fav: string = 'favchecked';
   saveSearchurl: any;
  // financial
  requestType: string = 'listings';
  comparablecollapseIcon: any;
  generalClicked=true;
  residenceClicked=false;
  featuresClicked=false;
  historyClicked=false;
  comparableClicked=false;
  financialClicked=false;
public propertyshowSpinner : boolean = false;
  propertyId: any;
  public property : any = [];
  public propertyRmls : any = [];
  public propertyHistories : any = [];
  public propertySimilar : any = [];
  public propertyImage : any = [];
  showContent: string = 'block';
  public forinfi : any = [];
  public openArray:Array<string> = new Array(); 
  public hasEmailVerified : boolean = false;
  public IsStaff : boolean = false;
  IsStaffCheck: any;
  
    public isMoreMenu: boolean = false;
  constructor(private socialSharing: SocialSharing, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceProvider, 
    private App: App,
    public storage: StorageProvider) {
  	 this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
  	 this.residencecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
  	 this.featurescollapseIcon = 'assets/imgs/down-arrow-blue.svg';
  	 this.historycollapseIcon = 'assets/imgs/down-arrow-blue.svg';
     this.comparablecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
     this.financialcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
     this.propertyId = this.navParams.get('propertyId');
     this.openArray = this.navParams.get('openArray');
     if (this.openArray == undefined) {
       this.openArray=[''];
     }
     this.forinfi = this.navParams.get('forinfi');
     if (this.forinfi == undefined) {
       this.forinfi=[''];
     }

     this.getProperty();
     this.propertyshowSpinner = true;
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
if (auth_user_token) {
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
      }
    });
  }
 sharesocial(County, State, ZipCode, slug, ListingID){
    console.log(County);
    console.log(State);
    console.log(ZipCode);
    console.log(slug);
    console.log(ListingID);
    var listingUrl = 'https://toptechrealty.com/'+County+'/'+State+'/'+ZipCode+'/'+slug+'/'+ListingID;
   this.socialSharing.share("Buy, Sell homes @ Bethany, Portland | Best Real Estate - TopTechRealty",null/*Subject*/,null/*File*/,listingUrl).then(() => {
      //console.log("Article Shared");
    }).catch(() => {
      //console.log("Article Not Shared");
    });
// // Check if sharing via email is supported
// this.socialSharing.canShareViaEmail().then(() => {
//   // Sharing via email is possible
// }).catch(() => {
//   // Sharing via email is not possible
// });

// // Share via email
// this.socialSharing.shareViaEmail('https://toptechrealty.com/'+County+'/'+State+'/'+ZipCode+'/'+slug+'/'+ListingID+'', '', ['']).then(() => {
//   // Success!
// }).catch(() => {
//   // Error!
// });
  }
 getProperty() {
    
   try {
       this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.showContent = "block";
       this.property = response.data;
       this.propertyHistories = response.data.histories;
       this.propertyRmls = response.data.rmls_property;
       this.propertySimilar = response.data.similarLisitings;
       this.propertyImage = response.data.rmls_property_images;
       this.propertyshowSpinner = false;
       console.log(this.propertyRmls);

        this.loadMap();

     }).catch( error => {
     })
         }else{
           this.userid = response.data.id;
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.showContent = "block";
       this.property = response.data;
       this.propertyHistories = response.data.histories;
       this.propertyRmls = response.data.rmls_property;
       this.propertySimilar = response.data.similarLisitings;
       this.propertyImage = response.data.rmls_property_images;
       this.propertyshowSpinner = false;

        this.loadMap();

     }).catch( error => {
     })
         }
       }).catch( error => {
       })

   } catch(e) {
        this.service.serverError();
    }

   }
  viewProperty(propertyId){
this.navCtrl.push(PropertyDetailPage, { propertyId : propertyId}); 
  }
  generalButtons() {
    if (this.generalClicked === undefined) {
    this.generalClicked = true;
     this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.generalClicked === true){
    this.generalClicked = false;
    this.generalcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.generalClicked === false){
    this.generalClicked = true;
     this.generalcollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  residenceButtons() {
    if (this.residenceClicked === undefined) {
    this.residenceClicked = true;
     this.residencecollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.residenceClicked === true){
    this.residenceClicked = false;
    this.residencecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.residenceClicked === false){
    this.residenceClicked = true;
     this.residencecollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  featuresButtons() {
    if (this.featuresClicked === undefined) {
    this.featuresClicked = true;
     this.featurescollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.featuresClicked === true){
    this.featuresClicked = false;
    this.featurescollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.featuresClicked === false){
    this.featuresClicked = true;
     this.featurescollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  financialButtons() {
    if (this.financialClicked === undefined) {
    this.financialClicked = true;
     this.financialcollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.financialClicked === true){
    this.financialClicked = false;
    this.financialcollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.financialClicked === false){
    this.financialClicked = true;
     this.financialcollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  historyButtons() {
    if (this.historyClicked === undefined) {
    this.historyClicked = true;
     this.historycollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.historyClicked === true){
    this.historyClicked = false;
    this.historycollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.historyClicked === false){
    this.historyClicked = true;
     this.historycollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  comparableButtons() {
    if (this.comparableClicked === undefined) {
    this.comparableClicked = true;
     this.comparablecollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
    else if (this.comparableClicked === true){
    this.comparableClicked = false;
    this.comparablecollapseIcon = 'assets/imgs/down-arrow-blue.svg';
    }
    else if (this.comparableClicked === false){
    this.comparableClicked = true;
     this.comparablecollapseIcon = 'assets/imgs/up-arrow-white.svg';
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyDetailPage');

   
  }

  loadMap() {
    let lat = this.propertyRmls.Latitude ;
    let lng = this.propertyRmls.Longitude ;
    let address = this.propertyRmls.FullStreetAddress ;
    let latLng = new google.maps.LatLng(lat,lng);
 const icon = {
  url: 'assets/imgs/map.png',
  scaledSize: new google.maps.Size(30, 40),
};
    let mapOptions = {
      center: latLng,
      zoom: 15,
      icon: icon ,
      gestureHandling: 'cooperative',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.propertymap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var locations = [
  [address, lat,lng, 4]
];
var infowindow = new google.maps.InfoWindow();

var marker, i;
for (i = 0; i < locations.length; i++) {  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    icon: icon ,
    map: this.propertymap
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(locations[i][0]);
      infowindow.open(this.propertymap, marker);
    }
  })(marker, i));
}

  }


goBack(){
  this.isMoreMenu = true;
 // this.nav.setRoot(TabsPage);
 // this.viewCtrl.dismiss();
  // this.App.getRootNav().push(PushTabsPage, { searchData1 : this.openArray.toString(),
  //      searchTearm: this.openArray.toString(),
  //      requestType: this.requestType,
  //      searchArraydata: this.openArray,
  //      forinfi: this.forinfi});

     this.viewCtrl.dismiss({
             searchData1 : this.openArray.toString(),
                  //  searchData:  {
       searchTearm: this.openArray.toString(),
       requestType: this.requestType,
       searchArraydata: this.openArray,
       forinfi: this.forinfi
      // }
        })
}
viewimage(propertyId){
 this.modalCtrl.create(ViewImagePage, { propertyId : propertyId}).present();
}
request(data, ListingID){
  this.modalCtrl.create(RequestTourPage, {Requestdata: data, propertyID: ListingID }).present();
 // this.modalCtrl.create(RequestTourPage(data)).present();
}

   favorite(propertyid) {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(propertyid);
      if (!auth_user_token) {
        console.log(0);
        $(".favoritelist ion-item" ).removeClass('item-checkbox-checked');
        
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    console.log(propertyid);
})
      }
     });
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

foropenEdit(edit){
 this.modalCtrl.create(QtoModalPage, {propertyID: edit}, {cssClass: 'half-modal' }).present();
}




}
