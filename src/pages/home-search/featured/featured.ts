import { Component,  ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SigninPage } from '../../../pages/signin/signin';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { SearchModalPage } from '../search-modal/search-modal';
import { MapInfoPage } from '../map-info/map-info';
import { FilterPage } from '../filter/filter';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
import { Searchbar, Content  } from 'ionic-angular';
import { RequestTourPage } from '../request-tour/request-tour';
import { QtoModalPage } from '../qto-modal/qto-modal';
declare var google;
// @IonicPage()
@Component({
  selector: 'page-featured',
  templateUrl: 'featured.html',
})
export class FeaturedPage {
  @ViewChild(Content) pageTop: Content;
  // @ViewChild('patientDDL') patientDDL:ElementRef;

   public mapsearchArray:Array<string> = new Array(); 
mapcountry: any;
mapListingID: any;
mapstate: any;
mapzipcode: any;
mapslug: any;
userid: any;
mapPriceCurrentForStatus: any;
mapBeds: any;
mapBathsTotalInteger: any;
mapSqFtApproximateTotal: any;
mapFullStreetAddress: any;
mapCity: any;
mapState: any;
mapZipCode: any;
mapfavcount: any;
propertysingleres: any;
propertysingleimg: any;
hidemapimage: string = 'hide';

  saveSearchurl: any;
  masterCheck:boolean;
  checkprpty: boolean = true;
   // isIndeterminate: boolean = false;
  selectedAll: boolean = false;
uncheckprpty: boolean = false;
  checkallprpt : boolean = false;
  batchAction: any;
selectedlistarray :any = [];
selectedaddressarray: any = [];
favfor :any = [];
id: any;
selectlabel: string = 'None';
 selectallchecked : boolean = false;
selectedlistarraycomma :any = [];
selectedlistcommaqto: any;
  multifavcheck : boolean = false;
 public isShown: boolean = false;
 public key: boolean = false;
  showbtntop: string = 'block';
  bounds: any;
  forscroll: any;
  scrollAmount: any;
  favActivedata: any;
  favActive: string = 'false';
   fav: string = 'favchecked';
  showList: string = 'block';
  showCard: string = 'block';
  showMap: string = 'block';
  noproperty: string = 'flex';
  showListbtn: string = 'block';
  showCardbtn: string = 'block';
  showMapbtn: string = 'block';
  getstyle: string = 'block';
  showSearchLoading: string = 'none';
  showSearchLoadingText: string = 'none';
  showSearchAll: string = 'flex';
  showSearchMore: string = 'none';
  clickMorescroll: string = 'none';
  showSearchPanel: string = 'none';
  showFiltercount: string = 'none';
  favoriteActive: string = '';
  sortvalue: string = '';
  sortvaluecard: string = '';
  sortvaluelist: string = '';
  sortvaluemap: string = '';
  sorturl: string = '';
  public propertyTypeSelect : any = [];
    public setTypeSelect: any = [];
  @ViewChild('map') mapElement: ElementRef;
  totalRecordsMore : any;
  map: any;
  apiHsProperties: any;
  mapimage: any;
  public currentPage = 1;
  public totalPages = 0;
  public totalRecords = 0;
  public totalPagesmap = 0;
  public totalRecordsmap = 0;
  public showSpinner : boolean = true;
  public showSpinnerProperty : boolean = false;
  public filters: any = "";
  public filterItems: any = "";
  public valWithString: any = "";
  public properties : any = [];
  public searchArray:Array<string> = new Array(); 
  public searchArrayLast:Array<string> = new Array(); 
  public searchResult : any = [];
  public propertiesmap : any = [];
  public countfilter:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','',''); //21
  public countfilterforlength:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','',''); //21
  countfilterlength: any = "";
  selectedPropertyClass : any ;
  selectedPropertyClass1 : any ;
  selectedPropertyClass2 : any ;
  selectedPropertyClass3 : any ;
  selectedPropertyClass4 : any ;
  selectedPropertyClass5 : any ;

  selectedStatus1 : any ;
  selectedStatus2 : any ;
  selectedStatus3 : any ;
  selectedStatus4 : any ;
  selectedStatus5 : any ;
  selectedPropertycate : any ;
  selectedPropertycate1 : any ;
  selectedPropertycate2 : any ;
  selectedPropertycate3 : any ;
  public forinfi : any = [];
  public isOnScroll: boolean = false;
  searchTearm: string = '97229';
  requestType: string = 'listings';
  allData = []; //Store all data from provider
  filterData = [];//Store filtered data
  searchTerm: string = '';
  MainSearch: string = 'show-main-search';
  MainSearch2: string = 'hide-main-search';
  public paraArray: any = "";
  public storageparaArray:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','',''); //24
  public commonarray:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','','',''); //24 //sort 25
  public paraArraymap:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','','','');
  public prptyresarray:Array<string> = new Array('','','','','',''); 
  public prptyclassarray:Array<string> = new Array(); 
  public selectedBeds: any = "";
  public selectedBaths: any = "";
  public searchData: any = "";
  public optionResult : any = [];
  public optionResultprptycate : any = [];
  public optionResultstatus : any = [];
  public optionResultProperty : any = [];
  public optionResultBaths : any = [];
  public optionResultBeds : any = [];
  public optionResultFavFeat : any = [];
  public optionResultMaxsize : any = [];
  public optionResultMinsize : any = [];
  public optionResultOpenhouse : any = [];
  public optionResultPricechange : any = [];
  public hasEmailVerified : boolean = false;
  public IsStaff : boolean = false;
  public disableButton: boolean = true;
  public disableOffer: boolean = false;
  IsStaffCheck: any;
  public valpCategories : any = [];
    public valpCat : any = [];
    public valpCatfinal: any = "";
  public valpTypes : any = [];
    public valpType : any = [];
    public valpTypefinal: any = "";
    public valcombineproperty: any = "";
  public valstatus : any = [];
    public valsta : any = [];
    public valstafinal: any = "";
   public separatedterm : any = [];

   totalItems: any;
totalchecked: any;
@ViewChild('mySearchbar') searchbar: Searchbar;
  constructor(
    private socialSharing: SocialSharing,
    public zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public service: ServiceProvider,
    public storage : StorageProvider,
    public localstorage : Storage,
    public popover: PopoverController) {

      this.searchData = this.navParams.get('searchData');
      this.getstyle = 'none';
      this.showCardbtn = 'none';
      this.showList = 'none';
      this.showCard = 'block';
      this.showMap = 'none';
      if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
     // this.getOption();
      $(".tabbar").click(function(event){
  $('.addInfoContent').css('display','none');
  });
          setTimeout(()=>{
    $(".ion-ios-search").parent().addClass("inactive");
    $(".ion-md-search").parent().addClass("inactive");
    $(".ion-ios-saved-outline").parent().addClass("inactive");
    $(".ion-md-saved-outline").parent().addClass("inactive");
    $(".ion-ios-favorites").parent().addClass("inactive");
    $(".ion-md-favorites").parent().addClass("inactive");

    $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/blue-more-full.svg)");
    $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/blue-more-full.svg)");

    $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "600"); 
    $(".ion-ios-iconmoreblack-outline").next().css("color", "#3366CC");
    $(".ion-md-iconmoreblack").next().css("font-weight", "600"); 
    $(".ion-md-iconmoreblack").next().css("color", "#3366CC"); 
    },600);

  }
  rightmenuClosed() {
    console.log("close feat");

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


  ionViewWillEnter() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
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
          this.clearAndGetProperties();
       }).catch( error => {
         this.userid = '0';
           console.log(error);
            this.clearAndGetProperties();
       })
    //  $(".ion-ios-search").parent().addClass("inactive");
    // $(".ion-md-search").parent().addClass("inactive");
    // $(".ion-ios-saved-outline").parent().addClass("inactive");
    // $(".ion-md-saved-outline").parent().addClass("inactive");
    // $(".ion-ios-favorites").parent().addClass("inactive");
    // $(".ion-md-favorites").parent().addClass("inactive");

    // $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/blue-more-full.svg)");
    // $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/blue-more-full.svg)");

    // $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "600"); 
    // $(".ion-ios-iconmoreblack-outline").next().css("color", "#3366CC");
    // $(".ion-md-iconmoreblack").next().css("font-weight", "600"); 
    // $(".ion-md-iconmoreblack").next().css("color", "#3366CC"); 


  }
 clearAndGetProperties() {
   this.currentPage = 1;
   this.properties = [];
   this.getProperties();
 }
   getProperties() {
     try {
       let urlPara: any = {
         searchTearm: '',
         requestType: this.requestType,
       }
      // this.showSpinnerProperty = false; 
      console.log(urlPara);
             this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
       this.service.homesearchpropertiesfealist(this.currentPage, urlPara, this.userid).then( (response : any) => {
         console.log(response);
         this.properties = response.data;
         this.totalPages = response.totalPages;
         this.totalRecords = response.totalRecords;
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
         this.properties.forEach(obj => {
           obj.propertyCheck = false;
         });
         let urlParamap: any = {
           searchTearm: '97229',
           requestType: 'map',
         }
         this.loadMap(urlParamap);
       }).catch( error => {
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
       })
                    }else{
           this.userid = response.data.id;
       this.service.homesearchpropertiesfealist(this.currentPage, urlPara, this.userid).then( (response : any) => {
         console.log(response);
         this.properties = response.data;
         this.totalPages = response.totalPages;
         this.totalRecords = response.totalRecords;
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
         this.properties.forEach(obj => {
           obj.propertyCheck = false;
         });
         let urlParamap: any = {
           searchTearm: '97229',
           requestType: 'map',
         }
         this.loadMap(urlParamap);
       }).catch( error => {
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
       })
                    }
       }).catch( error => {
       })

     } catch(e) {
       this.service.serverError();
     }
   }

 loadMap(urlParamap) {
   try {
     this.showSpinner = true;
     this.service.homesearchpropertiesmapfealist(this.filters, urlParamap).then( (response : any) => {
       this.propertiesmap = response.data;
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
          this.showSpinner = false;
       let latLng = new google.maps.LatLng(this.propertiesmap[0]["Latitude"],this.propertiesmap[0]["Longitude"]);
       var bounds = new google.maps.LatLngBounds();
       const icon = {
         url: 'assets/imgs/pricepin.svg', 
         scaledSize: new google.maps.Size(40, 60), 
       };
       let mapOptions = {
         center: latLng,
         zoom: 11,
         minZoom: 11,
         icon: icon ,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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
         if(si[i].symbol == 'K') {
           digits = 0;
         }
         return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
       }

       var marker, i;
       function numberWithCommas(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }
       for(i = 0; i < this.propertiesmap.length; i++)
       {
         var contentString = "";
         var Latlng = new google.maps.LatLng(this.propertiesmap[i].lat,this.propertiesmap[i].lon);
         var saved_label = String(kFormatter(this.propertiesmap[i]["PriceCurrentForStatus"]));
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]),
           icon: icon ,
           label: {
             color: '#fff',
             fontSize: '12px',
             fontWeight: 'bold',
             text: saved_label,
           },
           map: this.map
         });
         bounds.extend(new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]));
         const infowindow = new google.maps.InfoWindow({
           content: contentString,
           maxWidth: 400
         });
         this.mapListingID=this.propertiesmap[i].ListingID; 
         this.mapcountry=this.propertiesmap[i].County; 
         this.mapstate=this.propertiesmap[i].State; 
         this.mapzipcode=this.propertiesmap[i].ZipCode; 
         this.mapslug=this.propertiesmap[i].slug;
         this.mapPriceCurrentForStatus=this.propertiesmap[i].PriceCurrentForStatus; 
         this.mapBeds=this.propertiesmap[i].Beds;
         this.mapBathsTotalInteger=this.propertiesmap[i].BathsTotalInteger;
         this.mapSqFtApproximateTotal=this.propertiesmap[i].SqFtApproximateTotal;
         this.mapFullStreetAddress=this.propertiesmap[i].FullStreetAddress;
         this.mapCity=this.propertiesmap[i].City;
         this.mapState=this.propertiesmap[i].State;
         this.mapZipCode=this.propertiesmap[i].ZipCode;
         this.mapfavcount=this.propertiesmap[i].facCount;

         let primaryid=this.propertiesmap[i].id;
         let idz=this.propertiesmap[i].ListingID;
         let priceeee=this.propertiesmap[i].PriceCurrentForStatus;
         let that=this;
         let country=this.propertiesmap[i].County; 
         let state=this.propertiesmap[i].State; 
         let zipcode=this.propertiesmap[i].ZipCode; 
         let slug=this.propertiesmap[i].slug;
         let PriceCurrentForStatus=this.propertiesmap[i].PriceCurrentForStatus; 
         let Beds=this.propertiesmap[i].Beds;
         let BathsTotalInteger=this.propertiesmap[i].BathsTotalInteger;
         let SqFtApproximateTotal=this.propertiesmap[i].SqFtApproximateTotal;
         let FullStreetAddress=this.propertiesmap[i].FullStreetAddress;
         let City=this.propertiesmap[i].City;
         let State=this.propertiesmap[i].State;
         let ZipCode=this.propertiesmap[i].ZipCode;
         let favcount=this.propertiesmap[i].facCount;

         google.maps.event.addListener(infowindow, 'domready', () => {
           var clickableItem = document.getElementById('clickableItem');
           clickableItem.addEventListener('click', () => {
             that.navCtrl.push(PropertyDetailPage, { propertyId : idz}); 
           });
         });
         let self = this ;
this.map.addListener('click', function (event) {
           $('.addInfoContent').css('display','none');
           $('.tabbar').css('display','flex');
           $('.scroll-content').css('margin-bottom','67px');
});
         marker.addListener('click', function() {

          var marker_id = marker.id;
          console.log(priceeee);
      
       this.hidemapimage = 'hide';
            self.getPropertyImage(primaryid, idz, country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount)
                                    $('.addInfoContent').css('display','block');
            $('.tabbar').css('display','none');
            $('.scroll-content').css('margin-bottom','0px');
         });

       }
       this.map.setCenter(bounds.getCenter());
       this.map.fitBounds(bounds);
       function viewpropertymap(propertyid){
         this.navCtrl.push(PropertyDetailPage, { propertyId : propertyid}); 
       }
       function  openQtoModal(propertyId){
       }
     }).catch( error => {
     })
   } catch(e) {
     this.service.serverError();
   }
 }
   onScrolll($event) {
        this.zone.run(() => {
          if ($event.scrollTop > 50) {
            this.isShown = true;
          }else{
            this.isShown = false;
          }
        })
      }

   doInfinite(infiniteScroll) {
            this.showSpinnerProperty = false; 
       this.showSpinner = false;
     try {
       if(this.currentPage <= this.totalPages)
       {
         this.currentPage++;
         this.isOnScroll = true;
         let urlPara: any = {
           searchTearm: '97229',
           requestType: this.requestType,
         }

this.service.profile().then( (response : any) => {
if (response == undefined) {
this.userid = '';
           this.showSpinner = true;
           this.service.homesearchpropertiesfealist(this.currentPage, urlPara, this.userid).then( (response : any) => {
             this.showSpinnerProperty = false; 
             this.showSpinner = false;
             var nextTickets = response.data;
             nextTickets.forEach((item, index) => {
               this.properties.push(item);
             });
             infiniteScroll.complete();
           }).catch( error => {
             this.showSpinnerProperty = false; 
             this.showSpinner = false;
             infiniteScroll.complete();
           })
        }else{
this.userid = response.data.id;
           this.showSpinner = true;
           this.service.homesearchpropertiesfealist(this.currentPage, urlPara, this.userid).then( (response : any) => {
             this.showSpinnerProperty = false; 
             this.showSpinner = false;
             var nextTickets = response.data;
             nextTickets.forEach((item, index) => {
               this.properties.push(item);
             });
             infiniteScroll.complete();
           }).catch( error => {
             this.showSpinnerProperty = false; 
             this.showSpinner = false;
             infiniteScroll.complete();
           })
        }
}).catch( error => {
})


         
       }
     } catch(e) { 
       this.showSpinnerProperty = false; 
       this.showSpinner = false;
       this.service.serverError();
     }
   }
searchHeader(){
   console.log("searchHeader close");
       $('.addInfoContent').css('display','none');
       $('.tabbar').css('display','flex');
       $('.scroll-content').css('margin-bottom','67px');
}
closeinfo(){
       $('.addInfoContent').css('display','none');
       $('.tabbar').css('display','flex');
       $('.scroll-content').css('margin-bottom','67px');
}
bodyAction(){
  this.showSearchPanel = 'none';
 // this.searchbar.clearInput(null);
}
goToCard(){
  this.currentPage = 1;
  this.showList = 'none';
  this.showCard = 'block';
  this.showMap = 'none';
  this.showListbtn = 'block';
  this.showCardbtn = 'none';
  this.showMapbtn = 'block';
  // this.getProperties();
  this.showSpinnerProperty = false;
  this.showSpinner = false;
}
goToList(){
  this.currentPage = 1;
  this.showList = 'block';
  this.showCard = 'none';
  this.showMap = 'none';
  this.showListbtn = 'none';
  this.showCardbtn = 'block';
  this.showMapbtn = 'block';
//  this.getProperties();
  this.showSpinnerProperty = false;
  this.showSpinner = false;
}
goToMap(){
  this.isShown = false;
  this.currentPage = 1;
  this.showList = 'none';
  this.showCard = 'none';
  this.showMap = 'block';
  this.showListbtn = 'block';
  this.showCardbtn = 'block';
  this.showMapbtn = 'none';
 // this.getProperties();
  this.showSpinnerProperty = false;
  this.showSpinner = false;
 
}
  scrollToTop() {
    this.pageTop.scrollTo(0, 0, 0);
    this.isShown = false;
  }

viewProperty(propertyId){
  let openArray =this.searchArray;
  let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : propertyId, openArray : openArray, forinfi: this.forinfi});
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
            this.showSpinnerProperty = false;
            this.showSpinner = false; 
      } catch(e) {
        this.showSpinnerProperty = false;
        this.showSpinner = false;
        this.service.serverError();
      }
    } 

  })
}
   mapfavorite(propertyid) {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(propertyid);
      if (!auth_user_token) {
        console.log(0);
        $(".favoritelist ion-item" ).removeClass('item-checkbox-checked');
        $(".favoritelist" ).removeClass('active');
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    console.log(propertyid);
})
      }
     });
 if ($('#'+propertyid+'favid').hasClass('active')){
        $('#'+propertyid+'favid').removeClass('active');  /* missing . before removeClass */
    } else {
        $('#'+propertyid+'favid').addClass('active');
      }

       $("#"+propertyid ).removeClass('tempfav');
        $("#"+propertyid+"card" ).removeClass('tempfav');

     this.service.homesearchpropertiesfav(propertyid).then( (response : any) => {
  console.log(response);
          //   let urlParamap: any = {
          //   searchTearm: this.searchArray,
          //   requestType: 'map',
          // }
          // this.loadMap(urlParamap);
       this.favActivedata = response.data;
       console.log(this.favActivedata);
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
   favorite(propertyid) {
         this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
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
      this.saveSearchurl="https://toptechrealty.com/public/api/auth/home/search/listings?search-term=97229&request-type=listings&currentPage=1";
     this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl }).present();
  }
openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}

   changebatchAction(){
       setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
    });
if (this.batchAction == 1) {
     try {
       this.service.homesearchpropertiesfavmulti(this.selectedlistarraycomma).then( (response : any) => {
      this.favfor = response.data;
Object.keys(this.favfor).forEach(key => {
  let value = this.favfor[key];
 $("#"+key ).removeClass('rmtempfav');
             $("#"+key ).addClass('tempfav');
 $("#"+key+"card" ).removeClass('rmtempfav');
             $("#"+key+"card" ).addClass('tempfav');
            //  $("#"+key+'checkprpty').attr("checked", "false");
              // document.getElementById(key+'checkprpty').style.display = "none";
              //  document.getElementById(key+'uncheckprpty').style.display = "block";
this.checkprpty = false;
this.uncheckprpty = true;
      this.selectlabel = 'None';
      this.selectallchecked = false;
             //  $("#"+key+' ion-checkbox').attr("checked", "checked");
});
this.batchAction = '';
this.selectedAll=true;
this.selectedlistarray = [];
this.selectedaddressarray = [];
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
}
if (this.batchAction == 2) {
 this.modalCtrl.create(EditChoosePage, {multiplproperty: this.selectedlistarray, multiaddress: this.selectedaddressarray}).present();
 this.batchAction = '';
this.selectedAll=true;
this.selectedlistarray = [];
this.selectedaddressarray = [];
this.checkprpty = false;
this.uncheckprpty = true;
      this.selectlabel = 'None';
      this.selectallchecked = false;
  }
if (this.batchAction == 3) {
      var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
   this.selectedlistcommaqto = arr.toString();
 this.modalCtrl.create(RequestTourPage, {Requestdata: 'tour', propertyID: this.selectedlistcommaqto }).present();
this.batchAction = '';
this.selectedAll=true;
this.selectedlistarray = [];
this.selectedaddressarray = [];
this.checkprpty = false;
this.uncheckprpty = true;
this.selectlabel = 'None';
this.selectallchecked = false;
}
if (this.batchAction == 4) {
        var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
   this.selectedlistcommaqto = arr.toString();
  this.modalCtrl.create(RequestTourPage, {Requestdata: 'question', propertyID:  this.selectedlistcommaqto  }).present();
this.batchAction = '';
this.selectedAll=true;
this.selectedlistarray = [];
this.selectedaddressarray = [];
this.checkprpty = false;
this.uncheckprpty = true;
this.selectlabel = 'None';
this.selectallchecked = false;
}
if (this.batchAction == 5) {
        var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
   this.selectedlistcommaqto = arr.toString();
 this.modalCtrl.create(RequestTourPage, {Requestdata: 'offer', propertyID:  this.selectedlistcommaqto  }).present();
this.batchAction = '';
this.selectedAll=true;
this.selectedlistarray = [];
this.selectedaddressarray = [];
this.checkprpty = false;
this.uncheckprpty = true;
this.selectlabel = 'None';
this.selectallchecked = false;
}

   }

multifavorite(address, idd, propertyid){
    this.totalItems = this.properties.length;
    this.totalchecked = 0;
    this.properties.map(obj => {
      if (obj.propertyCheck) this.totalchecked++;
    });
    if (this.totalchecked > 0 && this.totalchecked < this.totalItems) {
      //If even one item is checked but not all
      // this.isIndeterminate = true;
        this.selectallchecked = true;
      $("#selectallid" ).addClass('selectedminus');
      this.selectlabel = 'Selected';

if(this.selectedaddressarray.indexOf(address) === -1){
  this.selectedaddressarray.push(address);
}else{
  const index = this.selectedaddressarray.indexOf(address);
  if (index > -1) {
    this.selectedaddressarray.splice(index, 1);
  }
}
if(this.selectedlistarray.indexOf(propertyid) === -1){
  this.selectedlistarray.push(propertyid);
}else{
  const index = this.selectedlistarray.indexOf(propertyid);
  if (index > -1) {
    this.selectedlistarray.splice(index, 1);
  }
}
  // console.log(this.selectedlistarray);
    var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
    // console.log(arr); 
   this.selectedlistarraycomma = arr.toString();
    } else if (this.totalchecked == this.totalItems) {
      //If all are checked
      this.selectallchecked = true;
      this.selectlabel = 'All';
      $("#selectallid" ).removeClass('selectedminus');
    } else {
      this.selectlabel = 'None';
      this.selectallchecked = false;
      $("#selectallid" ).removeClass('selectedminus');
      this.selectedaddressarray = [];
      this.selectedlistarray = [];
      this.selectedlistarraycomma = [];
    }
  if (this.totalchecked == 0) {
    this.disableButton = true;
  }else{
    this.disableButton = false;
  }
  if (this.totalchecked > 1) {
   this.disableOffer = true;
  }
    if (this.totalchecked == 1) {
   this.disableOffer = false;
  }
}

selectall(e): void {
    if (this.selectallchecked == true) {
     this.selectlabel = 'All';
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = this.selectallchecked;
      });
    });
Object.keys(this.properties).forEach(key => {
  let value = this.properties[key];
   this.selectedlistarray.push(value.ListingID);
   });
    var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
   this.selectedlistarraycomma = arr.toString();
    }else{
            this.selectedlistarray = [];
      this.selectedlistarraycomma = [];
      this.selectlabel = 'None';
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
    });
    }

  }

     sortby() {
    this.showSpinnerProperty = true;
            this.showSpinner = true;
            this.currentPage = 1;
              if (this.sortvaluecard != '') {
              this.sortvalue =  this.sortvaluecard;
            }
            if (this.sortvaluelist != '') {
              this.sortvalue =  this.sortvaluelist;
            }
            if (this.sortvaluemap != '') {
              this.sortvalue =  this.sortvaluemap;
            }
      if (this.sortvalue == "asc") {
  this.sorturl = '&asc_desc=asc';
      }
            if (this.sortvalue == "desc") {
  this.sorturl = '&asc_desc=desc';
      }
      if (this.sortvalue == "d_asc") {
  this.sorturl = '&updated_at=d_asc';
      }
      if (this.sortvalue == "d_desc") {
  this.sorturl = '&updated_at=d_desc';
      }
      if (this.sortvalue == "n_desc") {
  this.sorturl = '&updated_at=n_desc';
      }
      if (this.sortvalue == "m_desc") {
  this.sorturl = '&updated_at=m_desc';
      }
      if (this.sortvalue == "bd_sort") {
  this.sorturl = '&bd_sort=asc';
      }
      if (this.sortvalue == "br_sort") {
  this.sorturl = '&br_sort=asc';
      }
       if (this.sortvalue == "yb_sort") {
  this.sorturl = '&yb_sort=asc';
      }
      if (this.sortvalue == "sq_sort") {
  this.sorturl = '&sq_sort=asc';
      }
      if (this.sortvalue == "sn_sort") {
  this.sorturl = '&of_sorts=1';
      }
      if (this.sortvalue == "c_sort") {
  this.sorturl = '&c_sort=asc';
      }
      if (this.sortvalue == "z_sort") {
  this.sorturl = '&z_sort=asc';
      }
     try {
       let urlPara: any = {
         searchTearm: '97229',
         requestType: this.requestType,
         sorturl:  this.sorturl
       }

      // this.showSpinnerProperty = false; 
this.service.profile().then( (response : any) => {
if (response == undefined) {
this.userid = '';
       this.service.homesearchpropertiesfealistsort(this.currentPage, urlPara, this.userid).then( (response : any) => {
         this.properties = response.data;
         this.totalPages = response.totalPages;
         this.totalRecords = response.totalRecords;
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
                 this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
         let urlParamap: any = {
           searchTearm: '97229',
           requestType: 'map',
           sorturl:  this.sorturl
         }
         this.loadMapsort(urlParamap);
       }).catch( error => {
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
       })
        }else{
this.userid = response.data.id;
       this.service.homesearchpropertiesfealistsort(this.currentPage, urlPara, this.userid).then( (response : any) => {
         this.properties = response.data;
         this.totalPages = response.totalPages;
         this.totalRecords = response.totalRecords;
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
                 this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
         let urlParamap: any = {
           searchTearm: '97229',
           requestType: 'map',
           sorturl:  this.sorturl
         }
         this.loadMapsort(urlParamap);
       }).catch( error => {
         this.showSpinnerProperty = false; 
         this.showSpinner = false;
       })
        }
}).catch( error => {
})

     } catch(e) {
       this.service.serverError();
     }
   }
 loadMapsort(urlParamap) {
   try {
     this.showSpinner = true;
     this.service.homesearchpropertiesmapfealistsort(this.filters, urlParamap).then( (response : any) => {
       this.propertiesmap = response.data;
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
        this.showSpinner = false;
       let latLng = new google.maps.LatLng(this.propertiesmap[0]["Latitude"],this.propertiesmap[0]["Longitude"]);
       var bounds = new google.maps.LatLngBounds();
       const icon = {
         url: 'assets/imgs/pricepin.svg', 
         scaledSize: new google.maps.Size(40, 60), 
       };
       let mapOptions = {
         center: latLng,
         zoom: 11,
         minZoom: 11,
         icon: icon ,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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
         if(si[i].symbol == 'K') {
           digits = 0;
         }
         return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
       }

       var marker, i;
       function numberWithCommas(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }
       for(i = 0; i < this.propertiesmap.length; i++)
       {
         var contentString = "";
         var Latlng = new google.maps.LatLng(this.propertiesmap[i].lat,this.propertiesmap[i].lon);
         var saved_label = String(kFormatter(this.propertiesmap[i]["PriceCurrentForStatus"]));
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]),
           icon: icon ,
           label: {
             color: '#fff',
             fontSize: '12px',
             fontWeight: 'bold',
             text: saved_label,
           },
           map: this.map
         });
         bounds.extend(new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]));
         const infowindow = new google.maps.InfoWindow({
           content: contentString,
           maxWidth: 400
         });
         this.mapListingID=this.propertiesmap[i].ListingID; 
         this.mapcountry=this.propertiesmap[i].County; 
         this.mapstate=this.propertiesmap[i].State; 
         this.mapzipcode=this.propertiesmap[i].ZipCode; 
         this.mapslug=this.propertiesmap[i].slug;
         this.mapPriceCurrentForStatus=this.propertiesmap[i].PriceCurrentForStatus; 
         this.mapBeds=this.propertiesmap[i].Beds;
         this.mapBathsTotalInteger=this.propertiesmap[i].BathsTotalInteger;
         this.mapSqFtApproximateTotal=this.propertiesmap[i].SqFtApproximateTotal;
         this.mapFullStreetAddress=this.propertiesmap[i].FullStreetAddress;
         this.mapCity=this.propertiesmap[i].City;
         this.mapState=this.propertiesmap[i].State;
         this.mapZipCode=this.propertiesmap[i].ZipCode;
         this.mapfavcount=this.propertiesmap[i].facCount;

         let primaryid=this.propertiesmap[i].id;
         let idz=this.propertiesmap[i].ListingID;
         let priceeee=this.propertiesmap[i].PriceCurrentForStatus;
         let that=this;
         let country=this.propertiesmap[i].County; 
         let state=this.propertiesmap[i].State; 
         let zipcode=this.propertiesmap[i].ZipCode; 
         let slug=this.propertiesmap[i].slug;
         let PriceCurrentForStatus=this.propertiesmap[i].PriceCurrentForStatus; 
         let Beds=this.propertiesmap[i].Beds;
         let BathsTotalInteger=this.propertiesmap[i].BathsTotalInteger;
         let SqFtApproximateTotal=this.propertiesmap[i].SqFtApproximateTotal;
         let FullStreetAddress=this.propertiesmap[i].FullStreetAddress;
         let City=this.propertiesmap[i].City;
         let State=this.propertiesmap[i].State;
         let ZipCode=this.propertiesmap[i].ZipCode;
         let favcount=this.propertiesmap[i].facCount;

         google.maps.event.addListener(infowindow, 'domready', () => {
           var clickableItem = document.getElementById('clickableItem');
           clickableItem.addEventListener('click', () => {
             that.navCtrl.push(PropertyDetailPage, { propertyId : idz}); 
           });
         });
         let self = this ;
this.map.addListener('click', function (event) {
           $('.addInfoContent').css('display','none');
           $('.tabbar').css('display','flex');
           $('.scroll-content').css('margin-bottom','67px');
});
         marker.addListener('click', function() {

          var marker_id = marker.id;
          console.log(priceeee);
      
       this.hidemapimage = 'hide';
            self.getPropertyImage(primaryid, idz, country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount)
                                    $('.addInfoContent').css('display','block');
            $('.tabbar').css('display','none');
            $('.scroll-content').css('margin-bottom','0px');
         });

       }
       this.map.setCenter(bounds.getCenter());
       this.map.fitBounds(bounds);
       function viewpropertymap(propertyid){
         this.navCtrl.push(PropertyDetailPage, { propertyId : propertyid}); 
       }
       function  openQtoModal(propertyId){
       }
     }).catch( error => {
     })
   } catch(e) {
     this.service.serverError();
   }
 }

getPropertyImage(primaryid, idz,  country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount){
           this.mapListingID=idz; 
         this.mapcountry=country; 
         this.mapstate=state; 
         this.mapslug=slug;
         this.mapPriceCurrentForStatus=PriceCurrentForStatus; 
         this.mapBeds=Beds;
         this.mapBathsTotalInteger=BathsTotalInteger;
         this.mapSqFtApproximateTotal=SqFtApproximateTotal;
         this.mapFullStreetAddress=FullStreetAddress;
         this.mapCity=City;
         this.mapState=State;
         this.mapZipCode=ZipCode;
         this.mapfavcount=favcount;
   $(".map-property").css("background-image", "url()");
  this.service.singlepropertyimage(primaryid).then( (response : any) => {
       console.log(response);
       this.hidemapimage = 'show';
       this.propertysingleimg = response.data.image.image;
       $(".map-property").css("background-image", "url(" + this.propertysingleimg + ")");
       }).catch( error => {
     })

}
 openProperty(idz){
   console.log(idz);
       let openArray = this.mapsearchArray;
      console.log(openArray);
       let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : idz, openArray : openArray});
    addWeatherModal.present();
 }
 
foropenEdit(edit){

 this.modalCtrl.create(QtoModalPage, {propertyID: edit}, {cssClass: 'half-modal' }).present();
}


 }

