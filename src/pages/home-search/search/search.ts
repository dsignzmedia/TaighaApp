import { Component,  ViewChild, ElementRef, NgZone  } from '@angular/core';
import { App, IonicPage, NavController, NavParams, MenuController, PopoverController, AlertController, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { SearchModalPage } from '../search-modal/search-modal';
import { SigninPage } from '../../../pages/signin/signin';
import { SignupPage } from '../../../pages/signup/signup';
import { QtoModalPage } from '../qto-modal/qto-modal';
import { MapInfoPage } from '../map-info/map-info';
import { FilterPage } from '../filter/filter';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { ServiceProvider } from '../../../providers/service/service';
// import { App } from 'ionic-angular/components/app/app';
import { PushTabsPage } from '../../../pages/home-search/push-tabs/push-tabs';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../../providers/storage/storage';
import { Searchbar, Content  } from 'ionic-angular';
import { RequestTourPage } from '../request-tour/request-tour';
declare var google;
// declare var bubble: any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Content) pageTop: Content;
  // @ViewChild('patientDDL') patientDDL:ElementRef;
   public mapsearchArray:Array<string> = new Array();
mapcountry: any;
mapListingID: any;
public isMoreMenu: boolean = false;
mapstate: any;
mapzipcode: any;
mapslug: any;
updatelistings: any;
checkedVirtualTour : any;
mapPriceCurrentForStatus: any;
mapBeds: any;
mapBathsTotalInteger: any;
mapSqFtApproximateTotal: any;
mapFullStreetAddress: any;
mapCity: any;
mapState: any;
mapZipCode: any;
mapfavcount: any;
is_open_house : any;
is_virtual_tour : any;
single_image : any;
mappropertyRmlsDaysRe: any;
  saveSearchurl: any;
  hidemapimage: string = 'hide';
  masterCheck:boolean;
  checkprpty: boolean = true;
  propertysingleres: any;
  propertysingleimg: any;
  propertysingleopenhouse : any;
  propertyStatus : any;
  propertysinglevirtualtour : any;
  propertyimg: any;
  propertyRmlsDays:any;
  public propertyRmls : any = [];
  public propertyImage : any = [];
  propertyRmlsDaysRe:any;
  // isIndeterminate: boolean = false;
  selectedAll: boolean = false;
  uncheckprpty: boolean = false;
  checkallprpt : boolean = false;
  batchAction: any;
  selectedlistarray :any = [];
  selectedaddressarray: any = [];
  favfor :any = [];
  id: any;
  mapohlabel : string = '';
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
  noproperty: string = 'none';
  showOverlayLoader: string = 'none';
  showMapLoader: string = 'block';
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
  public propertyTypeSelect : any = [];
    public setTypeSelect: any = [];
  @ViewChild('map') mapElement: ElementRef;
  totalRecordsMore : any;
  map: any;
  userid: any;
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
  public countfilter:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','', ''); //21 24
  public countfilterforlength:Array<string> = new Array('','','','','','','','','','','','','','','','','','','','','','','', ''); //21 24
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
  selectedStatus6 : any ;
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
  public optionResultVirtualTour : any = [];
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
  public IsStaffstring : any;
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


  public searchlist : any = [];
  public savedlist : any = [];
  public searchagentlist : any = [];
  userfirstname : any;
  userlastname : any;
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public storageToken: any;
@ViewChild('mySearchbar') searchbar: Searchbar;
  constructor(
    private socialSharing: SocialSharing,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public service: ServiceProvider,
    public storage : StorageProvider,
    public localstorage : Storage,
    public popover: PopoverController, public platform: Platform, private App: App,) {
    // app: App
//this.storage.removeStorage('fromsavedsearch');

        // $('.MenuForCustomer').css('display','none');
        // $('.MenuForStaff').css('display','none');
        // $('.MenuForGuest').css('display','none');
       this.service.profile().then( (response : any) => {
         console.log(response);
         if (response == undefined) {
           this.userid = 0;
         }else{
           this.userid = response.data.id;
         }
       }).catch( error => {
         this.userid = '0';
       })
     // try {
     //   let urlPara: any = {
     //     searchTearm: 'test'
     //   }
     //   this.service.getsavedsearch(urlPara).then( (response : any) => {
     //     console.log(response);
     //     this.savedlist = response.data;
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
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {


      this.IsStaffCheck = auth_user_token.is_staff;

      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        this.IsStaffstring = 'no';
                $('.MenuForCustomer').css('display','block');
        $('.MenuForStaff').css('display','none');
        $('.MenuForGuest').css('display','none');
      }else{
        this.IsStaff = true;
        this.IsStaffstring = 'yes';
                $('.MenuForCustomer').css('display','none');
        $('.MenuForStaff').css('display','block');
        $('.MenuForGuest').css('display','none');
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
        }
        console.log(this.IsStaffCheck);
                if (this.IsStaffCheck == undefined) {
        $('.MenuForCustomer').css('display','none');
        $('.MenuForStaff').css('display','none');
        $('.MenuForGuest').css('display','block');
        }
    });

//                       this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
// console.log("ionViewWillEnter hideforcustomer");
// if (auth_user_token) {
//       this.IsStaffCheck = auth_user_token.is_staff;
//       if (this.IsStaffCheck == 0) {
//         this.IsStaffstring = 'no';
//         // hideforcustomer
//         console.log("hideforcustomer none");
//         // $('.hideforCustomerandUser').css('display','none');

//         $('.MenuForCustomer').css('display','block');
//         $('.MenuForStaff').css('display','none');
//         $('.MenuForGuest').css('display','none');
//         // tab-t1-4
//         $('#tab-t3-4').css('display','none');
//       }else{
//         console.log("hideforcustomer flex");
//         // $('.hideforCustomerandUser').css('display','flex');

//         $('.MenuForCustomer').css('display','none');
//         $('.MenuForStaff').css('display','block');
//         $('.MenuForGuest').css('display','none');
//         this.IsStaff = true;
//       }
//         if(auth_user_token) {
//             if(auth_user_token.is_email_verified == 1) {
//               this.hasEmailVerified = true;
//             }
//         }
//         }
//         console.log(this.IsStaffCheck);
//     });
      this.searchData = this.navParams.get('searchData');
      this.getstyle = 'none';
      this.showMapbtn = 'none';
      this.showList = 'none';
      this.showCard = 'none';
      this.showMap = 'block';
      // this.showMapLoader = 'none';

      if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
      this.getOption();
 console.log(this.IsStaff);
 console.log(this.IsStaffCheck);
  }
ngOnInit(){
 console.log('this.ngOnInit');
}
ionViewDidEnter(){
  console.log('this.ionViewDidEnter');
}
  ionViewDidLoad() {
  console.log('this.ionViewDidLoad');
  }

  sharesocial(County, State, ZipCode, slug, ListingID){
    console.log(County);
    console.log(State);
    console.log(ZipCode);
    console.log(slug);
    console.log(ListingID);
    var listingUrl = 'https://toptechrealty.com/'+County+'/'+State+'/'+ZipCode+'/'+slug+'/'+ListingID;
   this.socialSharing.share("Buy, Sell homes @ Bethany, Portland | Best Real Estate - TopTechRealty",null/*Subject*/,null/*File*/,listingUrl).then((response : any) => {
      //console.log("Article Shared");
      this.service.toast(response, 3000, 'middle');
    }).catch((error) => {
       this.service.toast(error, 3000, 'middle');
      //console.log("Article Not Shared");
    });
/*// Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});

// Share via email
this.socialSharing.shareViaEmail('https://toptechrealty.com/'+County+'/'+State+'/'+ZipCode+'/'+slug+'/'+ListingID+'', '', ['']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});*/
  }

  sortby(){

    this.showOverlayLoader = 'flex';
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
             console.log(this.sortvalue);
      if (this.sortvalue == "asc") {
  this.commonarray.splice(25, 1, '&asc_desc=asc');
      }
            if (this.sortvalue == "desc") {
  this.commonarray.splice(25, 1, '&asc_desc=desc');
      }
      if (this.sortvalue == "d_asc") {
  this.commonarray.splice(25, 1, '&updated_at=d_asc');
      }
      if (this.sortvalue == "d_desc") {
  this.commonarray.splice(25, 1, '&updated_at=d_desc');
      }
      if (this.sortvalue == "n_desc") {
  this.commonarray.splice(25, 1, '&updated_at=n_desc');
      }
      if (this.sortvalue == "m_desc") {
  this.commonarray.splice(25, 1, '&updated_at=m_desc');
      }
      if (this.sortvalue == "bd_sort") {
  this.commonarray.splice(25, 1, '&bd_sort=asc');
      }
      if (this.sortvalue == "br_sort") {
  this.commonarray.splice(25, 1, '&br_sort=asc');
      }
       if (this.sortvalue == "yb_sort") {
  this.commonarray.splice(25, 1, '&yb_sort=asc');
      }
      if (this.sortvalue == "sq_sort") {
  this.commonarray.splice(25, 1, '&sq_sort=asc');
      }
      if (this.sortvalue == "sn_sort") {
  this.commonarray.splice(25, 1, '&of_sorts=1');
      }
      if (this.sortvalue == "c_sort") {
  this.commonarray.splice(25, 1, '&c_sort=asc');
      }
      if (this.sortvalue == "z_sort") {
  this.commonarray.splice(25, 1, '&z_sort=asc');
      }
      //  this.commonarray.splice(25, 1, '&updated_at=d_asc');
// console.log(this.commonarray);
              this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {
            // console.log(response);
            this.properties = response.data;
            this.totalPages = response.totalPages;
            this.totalRecords = response.totalRecords;

            this.showSpinnerProperty = false;
            this.showSpinner = false;
                  this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
                            let urlParamap: any = {
            searchTearm: this.paraArray.searchArraydata,
            requestType: 'map',
          }
          this.loadMapMoresort(this.commonarray);
          }).catch( error => {
            this.showOverlayLoader = 'none';
            this.showSpinnerProperty = false;
            this.showSpinner = false;
          })
  }

 loadMapMoresort(urlParamap) {
   try {
     this.showSpinner = true;
     this.service.filterhomesearchpropertiesmapsort(this.currentPage, this.filters, urlParamap, this.userid).then( (response : any) => {
       this.showSpinnerProperty = false;
       this.showSpinner = false;
       this.showOverlayLoader = 'none';
       this.propertiesmap = response.data;
       this.showMapLoader = 'none';
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
       let latLng = new google.maps.LatLng(this.propertiesmap[0]["Latitude"],this.propertiesmap[0]["Longitude"]);
       var bounds = new google.maps.LatLngBounds();
       const icon = {
         url: 'assets/imgs/pricepin.svg',
         scaledSize: new google.maps.Size(48, 60),
         origin: new google.maps.Point(0,-3),
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
        var lablefont = '12px';
        this.mapohlabel = '';
        var icondy = {
          url: 'assets/imgs/pricepin.svg',
          scaledSize: new google.maps.Size(40, 50),
          origin: new google.maps.Point(0,-3),
        };
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-video-border-black.svg',
          scaledSize: new google.maps.Size(50, 60),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] != 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-video-camera-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] != 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-border-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["ListOfficeName"] == 'TopTech Realty LLC'){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-taigha-label.svg',
          scaledSize: new google.maps.Size(55, 60),
          origin: new google.maps.Point(0,3),
        };
      }
         var contentString = "";
         var Latlng = new google.maps.LatLng(this.propertiesmap[i].lat,this.propertiesmap[i].lon);
         var saved_label = String(this.mapohlabel+kFormatter(this.propertiesmap[i]["PriceCurrentForStatus"]));
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]),
           icon: icondy ,
           label: {
            color: '#fff',
            fontSize: lablefont,
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
         this.is_open_house=this.propertiesmap[i].is_open_house;
         this.is_virtual_tour=this.propertiesmap[i].is_virtual_tour;

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
         let Isopenhouse=this.propertiesmap[i].is_open_house;
         let Isvirtualtour=this.propertiesmap[i].is_virtual_tour;
         let single_image=this.propertiesmap[i].single_image;
         let DaysOnMarket=this.propertiesmap[i].DaysOnMarketCustom;
         let openhousedate=this.propertiesmap[i].open_house_date;
         let listingstatus=this.propertiesmap[i].ListingStatus;

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
            self.getPropertyImage(primaryid, idz, country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount, Isopenhouse, Isvirtualtour, single_image, DaysOnMarket, openhousedate, listingstatus)
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
selectall(e): void {
    if (this.selectallchecked == true) {
     this.selectlabel = 'All';
     this.disableButton = false;
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = this.selectallchecked;
      });
    });
// console.log(this.properties);
Object.keys(this.properties).forEach(key => {
  let value = this.properties[key];
 //  console.log(value.ListingID);
   this.selectedlistarray.push(value.ListingID);
   });
//   console.log(this.selectedlistarray);
    var arr = this.selectedlistarray.filter(function(entry) { return entry.trim() != ''; });
    // console.log(arr);
   this.selectedlistarraycomma = arr.toString();
  console.log(this.selectedlistarraycomma);
    }else{
            this.selectedlistarray = [];
      this.selectedlistarraycomma = [];
      this.selectlabel = 'None';
       this.disableButton = true;
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
    });
    }

  }
multifavorite(address, idd, propertyid){


    this.totalItems = this.properties.length;
    this.totalchecked = 0;
console.log(this.properties);
    this.properties.map(obj => {
      if (obj.propertyCheck) this.totalchecked++;
    });
    console.log(this.totalchecked);
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
//   console.log(this.selectedlistarraycomma);

    } else if (this.totalchecked == this.totalItems) {
      //If all are checked
      this.selectallchecked = true;
      this.selectlabel = 'All';
      $("#selectallid" ).removeClass('selectedminus');
      // this.isIndeterminate = false;

    } else {
      //If none is checked
      // this.isIndeterminate = false;
      this.selectlabel = 'None';
      this.selectallchecked = false;
      $("#selectallid" ).removeClass('selectedminus');
      this.selectedaddressarray = [];
      this.selectedlistarray = [];
      this.selectedlistarraycomma = [];

    }
    console.log(this.totalchecked);
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
   changebatchAction(){

   // this.properties.propertyCheck = '0';
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
  // Fro Request Tour

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
  // Fro Ask Quest

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
  // Fro Start Offer

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
openMail(detail){

}
foropenEdit(edit){

 this.modalCtrl.create(QtoModalPage, {propertyID: edit}, {cssClass: 'half-modal' }).present();

}
   openEdit(edit) {
     console.log(this.userid);
     if (this.userid == 0) {
        console.log(0);
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav();
// nav.setRoot(PushTabsPage, {selectedTab: 5});
  getsigninModal.onDidDismiss(data=>{

    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav();
// nav.setRoot(PushTabsPage, {selectedTab: 5});
                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }

       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav();
// nav.setRoot(PushTabsPage, {selectedTab: 5});
})
     }else{
       console.log(this.saveSearchurl);
        this.modalCtrl.create(EditChoosePage, {Requestdata: edit, saveSearchurl: this.saveSearchurl }).present();
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

  triggerisShown(){
       this.isShown = true;

  }

  doInfiniteFortop($event){

  }

  scrollToTop() {
    this.pageTop.scrollTo(0, 0, 0);
    this.isShown = false;
  }


  ionViewWillEnter() {
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{

           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
//          $('.removeit').css('display','flex');
//          $('.signin-hs').css('display','none');
//          $('.signout-hs').css('display','flex');
//          $( "<span>Sign Out</span>" ).replaceAll( ".chgnm span" );
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         // console.log("email_verified_status" + user.email_verified_status);
         //   if(user.email_verified_status == 1)
         //   {
         //     this.storageToken.is_email_verified = 1;
         //     this.storage.setStorage('auth_user_tokens', this.storageToken);
         //   }
         //   if(!this.hasEmailVerified && user.email_verified_status == 1) {
         //     this.hasEmailVerified = true;
         //     // this.resetAll();
         //   }
                    this.userid = response.data.id;
         console.log(this.userid);
          this.clearAndGetProperties();
       }).catch( error => {
         this.userid = '0';
           console.log(error);
            this.clearAndGetProperties();
       })

//            $('.removeit').css('display','none');
//            $('.signin-hs').css('display','flex');
//            $('.signout-hs').css('display','none');
//            $( "<span>Sign In</span>" ).replaceAll( ".chgnm span" );
//             $(".chgnm i img").attr("src","assets/imgs/login-outline.svg");
// document.getElementById('dynamicprofile').innerHTML ="";
       // })
     } catch(e) {
          this.service.serverError();
      }
//        this.service.profile().then( (response : any) => {
//          console.log(response);
//                   var user = response.data;
//          this.name = user.first_name+" "+user.last_name;
//          this.email = user.email;
//          this.avatar = user.avatar;
//                   if (response != undefined) {
//                     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//          $('.removeit').css('display','flex');
//          $('.signin-hs').css('display','none');
//          $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
//          console.log("email_verified_status" + user.email_verified_status);
//          }else{
//            console.log("asckjnascijnssssssssssssssssssssssss");
//            $('.removeit').css('display','none');
//            $('.signin-hs').css('display','flex');
//            $('.signout-hs').css('display','none');
// document.getElementById('dynamicprofile').innerHTML ="";
//          }
//          this.userid = response.data.id;
//          console.log(this.userid);
//           this.clearAndGetProperties();
//        }).catch( error => {
//          this.userid = '0';
//            console.log(error);
//             this.clearAndGetProperties();
//        })

  }

// ngOnInit(){
// // bubble();
// }

openSearch(){
  this.noproperty = 'none';
this.commonarray.splice(25, 1, '&updated_at=d_asc');
  if (this.forinfi) {
   this.forinfi = this.forinfi;
  }else{
   this.forinfi = this.searchArray;
  }
  let openArray =this.searchArray;

  let addWeatherModal = this.modalCtrl.create(SearchModalPage, {openArray : openArray, forinfi: this.forinfi, commonarray: this.commonarray});
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
      this.commonarray = data.commonarray;
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

this.saveSearchurl ='https://toptechrealty.com/public/api/auth/home/search/listings'+'?search-term='+this.paraArray.searchTearm+'&request-type='+this.paraArray.requestType+'&currentPage=1';

        this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {

          this.properties = response.data;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
          this.showSpinnerProperty = false;
          this.showSpinner = false;
          this.noproperty = 'flex';
                this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
          let urlParamap: any = {
            searchTearm: this.paraArray.searchArraydata,
            requestType: 'map',
          }
          this.loadMap(urlParamap);
        }).catch( error => {
          this.showSpinnerProperty = false;
          this.showSpinner = false;
        })
      } catch(e) {
        this.showSpinnerProperty = false;
        this.showSpinner = false;
        this.service.serverError();
      }
    }
  })
}
GetAllSearch(){
this.commonarray.splice(25, 1, '&updated_at=d_asc');
  if (this.forinfi) {
   this.forinfi = this.forinfi;
  }else{
   this.forinfi = this.searchArray;
  }
  let openArray =this.searchArray;

  let addWeatherModal = this.modalCtrl.create(SearchModalPage, {openArray : openArray, forinfi: this.forinfi, commonarray: this.commonarray});
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
      this.commonarray = data.commonarray;
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

this.saveSearchurl ='https://toptechrealty.com/public/api/auth/home/search/listings'+'?search-term='+this.paraArray.searchTearm+'&request-type='+this.paraArray.requestType+'&currentPage=1';

        this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {

          this.properties = response.data;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
          this.showSpinnerProperty = false;
          this.showSpinner = false;
                this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
          let urlParamap: any = {
            searchTearm: this.paraArray.searchArraydata,
            requestType: 'map',
          }
          this.loadMap(urlParamap);
        }).catch( error => {
          this.showSpinnerProperty = false;
          this.showSpinner = false;
        })
      } catch(e) {
        this.showSpinnerProperty = false;
        this.showSpinner = false;
        this.service.serverError();
      }
    }
  })
}
searchHeader(){


   console.log("searchHeader close");
          this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
                             var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })
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
  this.searchbar.clearInput(null);
     //$('.my-custom-modal-css').css('display','none');

}

getByAddress(propertyId){
  this.navCtrl.push(PropertyDetailPage, { propertyId : propertyId});
}

getByPlaces(city, country) {
  this.searchbar.clearInput(null);
  this.valWithString = city.replace(/,/g, '-');
  this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
    this.showSearchMore = 'flex';
    this.clickMorescroll = 'click-more-scroll';
    this.showSearchAll = 'none';
    this.MainSearch = 'hide-main-search';
    this.MainSearch2 = 'show-main-search';
    this.searchArrayLast = [];
    let last:any = this.searchArray[this.searchArray.length-1];
    if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
  }
  try {
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
    }
    this.showSpinnerProperty = true;
    this.service.homesearchproperties(this.currentPage, urlPara, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }

}

getByElementary(val) {
  this.searchbar.clearInput(null);
  this.valWithString = val+' Elementary School' ;
  this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
    this.showSearchMore = 'flex';
    this.clickMorescroll = 'click-more-scroll';
    this.showSearchAll = 'none';
    this.MainSearch = 'hide-main-search';
    this.MainSearch2 = 'show-main-search';
    this.searchArrayLast = [];
    let last:any = this.searchArray[this.searchArray.length-1];
    if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
  }
  try {
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
    }
    this.showSpinnerProperty = true;
    this.service.homesearchproperties(this.currentPage, urlPara, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }
}

getByHigh(val) {
  this.searchbar.clearInput(null);
  this.valWithString = val+' High School' ;
  this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
    this.showSearchMore = 'flex';
    this.clickMorescroll = 'click-more-scroll';
    this.showSearchAll = 'none';
    this.searchArrayLast = [];
    let last:any = this.searchArray[this.searchArray.length-1];
    if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
  }
  try {
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
    }
    this.showSpinnerProperty = true;
    this.service.homesearchproperties(this.currentPage, urlPara, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }
}

getByMiddle(val) {
  this.searchbar.clearInput(null);
  this.valWithString = val+' Middle School' ;
  this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(this.valWithString) === -1) this.searchArray.push(this.valWithString);
  if (this.searchArray.length > 1) {
    this.showSearchMore = 'flex';
    this.clickMorescroll = 'click-more-scroll';
    this.showSearchAll = 'none';
    this.searchArrayLast = [];
    let last:any = this.searchArray[this.searchArray.length-1];
    if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
  }
  try {
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
    }
    this.showSpinnerProperty = true;
    this.service.homesearchproperties(this.currentPage, urlPara, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }
}

getByZipcode(val) {
  this.searchbar.clearInput(null);
  this.showSearchPanel = 'none';
  if (this.searchArray.indexOf(val) === -1) this.searchArray.push(val);
  if (this.searchArray.length > 1) {
    this.showSearchMore = 'flex';
    this.clickMorescroll = 'click-more-scroll';
    this.showSearchAll = 'none';
    this.searchArrayLast = [];
    let last:any = this.searchArray[this.searchArray.length-1];
    if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
  }
  try {
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
    }
    this.showSpinnerProperty = true;
    this.service.homesearchproperties(this.currentPage, urlPara, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }
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
  if (this.searchArray.length == 1) {
    this.showSearchMore = 'none';
    this.showSearchAll = 'block';
    this.clickMorescroll = '';
  }
  try {
    this.commonarray.splice(0, 1, this.searchArray.toString());
     this.forinfi.splice(0, 1, this.searchArray.toString());
    let urlPara: any = {
      searchTearm: this.searchArray.toString(),
      requestType: this.requestType,
      commonarray: this.commonarray
    }

    this.showSpinnerProperty = true;
    if (this.searchArray.length == 0) {
      this.service.toast("Please choose any ZipCode, City or Address", 2000, 'bottom');
      this.openSearch();
    }else{
    this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {
      this.properties = response.data;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      console.log(response);
      this.showSpinnerProperty = false;
    }).catch( error => {
      this.showSpinnerProperty = false;
    })
    }
  } catch(e) {
    this.showSpinnerProperty = false;
    this.service.serverError();
  }

}

 clearAndGetProperties() {
   this.currentPage = 1;
   this.properties = [];
   this.getProperties();
 }

 filterHomes(){
  let addWeatherModal = this.modalCtrl.create(FilterPage);
  addWeatherModal.onDidDismiss(data=>{
      this.paraArray = data;

  })
}

 ForLoading(val) {
   this.showSearchLoading = 'block';
}

searchByValue(){
      this.showSearchPanel = 'block';
   try {
     this.service.searchBy(this.searchTerm, this.searchTerm.length).then( (response : any) => {
       if (this.searchTerm == '') {
         this.searchResult = '';
       }else{
         this.searchResult = response.data;
       }
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
}

 setFilteredLocations(){
   if (this.searchTerm == '') {
   }else{
      this.showSearchLoading = 'block';
      this.showSearchPanel = 'block';
   try {
     this.service.searchBy(this.searchTerm, this.searchTerm.length).then( (response : any) => {
       if (this.searchTerm == '') {
         this.searchResult = '';
       }else{
         this.searchResult = response.data;
       }
       this.showSearchLoading = 'none';
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
}
}

  getItems(ev) {
    var val = ev.target.value;
   try {
     this.service.searchBy(val, this.searchTerm.length).then( (response : any) => {
       this.searchResult = response.data;
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
  }

 getSearchBy() {
   try {
     this.service.searchBy('97', this.searchTerm.length).then( (response : any) => {
       this.searchResult = response.data;
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
   }

   getProperties() {
     try {
       let urlPara: any = {
         searchTearm: this.searchTearm,
         requestType: this.requestType
       }
 this.saveSearchurl ='https://toptechrealty.com/public/api/auth/home/search/listings'+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage=1';
  this.commonarray.splice(1, 1, 'listings');
  this.commonarray.splice(25, 1, '&updated_at=d_asc');

       this.showSpinnerProperty = false;
       console.log(urlPara);
       this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {
         console.log(this.commonarray);
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
           searchTearm: this.searchArray,
           requestType: 'map',
         }
// $("#toclone2").clone().insertAfter(".card-panel ion-card:nth-child(4)");
// storage property
  this.storage.getStorage('fromsavedsearch').then((val) => {
         console.log(val);
    if (val == null) {
        this.loadMap(urlParamap);
    }else{
             this.showSpinnerProperty = true;
         this.showSpinner = true;
 this.showFiltercount = "block";

this.valpCategories = val.pCategories;
var selectArrayvalpCategories = this.valpCategories.map(i =>  i );
this.valpCat = selectArrayvalpCategories;
for(var i=0;i<this.valpCat.length;i++){
    this.valpCat[i]="&pCategories[]="+this.valpCat[i];
}
this.valpCatfinal = this.valpCat.join('');

this.valpTypes = val.pTypes;
var selectArrayvalpTypes = this.valpTypes.map(i =>  i );
this.valpType = selectArrayvalpTypes;
for(var i=0;i<this.valpType.length;i++){
    this.valpType[i]="&pCategories[]="+this.valpType[i];
}
this.valpTypefinal = this.valpType.join('');

this.valstatus = val.status;
var selectArrayvalstatus = this.valstatus.map(i =>  i );
this.valsta = selectArrayvalstatus;
for(var i=0;i<this.valsta.length;i++){
    this.valsta[i]="&status[]="+this.valsta[i];
}
this.valstafinal = this.valsta.join('');

            this.separatedterm = val.searchterm.split(',');

            this.searchArray = this.separatedterm;
      if (this.separatedterm.length <= 1) {
        this.showSearchMore = 'none';
        this.showSearchAll = 'flex';
        this.clickMorescroll = '';
      }else{
        this.showSearchMore = 'flex';
        this.clickMorescroll = 'click-more-scroll';
        this.showSearchAll = 'none';
        this.searchArrayLast = [];
        let last:any = this.separatedterm[this.separatedterm.length-1];
        if (this.searchArrayLast.indexOf(last) === -1) this.searchArrayLast.push(last);
      }
this.valcombineproperty = this.valpCatfinal+this.valpTypefinal;
      this.storageparaArray.splice(0, 1, val.searchterm);
      this.storageparaArray.splice(1, 1, val.requesttype);
      this.storageparaArray.splice(2, 1, val.beds);
      this.storageparaArray.splice(3, 1, val.bath);
      this.storageparaArray.splice(4, 1, val.min_price);
      this.storageparaArray.splice(5, 1, val.max_price);
      this.storageparaArray.splice(6, 1, val.sqftmin);
      this.storageparaArray.splice(7, 1, val.sqftmax);
      this.storageparaArray.splice(8, 1, val.lotsizemin);
      this.storageparaArray.splice(9, 1, val.lotsizemax);
      this.storageparaArray.splice(10, 1, val.openhouse);
      this.storageparaArray.splice(11, 1, val.price_change);
      this.storageparaArray.splice(12, 1, val.yearbuildmin);
      this.storageparaArray.splice(13, 1, val.yearbuildmax);
      this.storageparaArray.splice(14, 1, val.streetname);
      this.storageparaArray.splice(15, 1, val.levels);
      this.storageparaArray.splice(16, 1, val.legaldescription);
      this.storageparaArray.splice(17, 1, val.elementaryschl);
      this.storageparaArray.splice(18, 1, val.middleschl);
      this.storageparaArray.splice(19, 1, val.highschl);
      this.storageparaArray.splice(20, 1, val.keywords);
      this.storageparaArray.splice(21, 1, val.listing_agent);
      this.storageparaArray.splice(22, 1, val.listing_office);
      this.storageparaArray.splice(23, 1, this.valstafinal);
      this.storageparaArray.splice(24, 1, this.valcombineproperty);
//commonarray
      this.commonarray.splice(0, 1, val.searchterm);
      this.commonarray.splice(1, 1, val.requesttype);
      this.commonarray.splice(2, 1, val.beds);
      this.commonarray.splice(3, 1, val.bath);
      this.commonarray.splice(4, 1, val.min_price);
      this.commonarray.splice(5, 1, val.max_price);
      this.commonarray.splice(6, 1, val.sqftmin);
      this.commonarray.splice(7, 1, val.sqftmax);
      this.commonarray.splice(8, 1, val.lotsizemin);
      this.commonarray.splice(9, 1, val.lotsizemax);
      this.commonarray.splice(10, 1, val.openhouse);
      this.commonarray.splice(11, 1, val.price_change);
      this.commonarray.splice(12, 1, val.yearbuildmin);
      this.commonarray.splice(13, 1, val.yearbuildmax);
      this.commonarray.splice(14, 1, val.streetname);
      this.commonarray.splice(15, 1, val.levels);
      this.commonarray.splice(16, 1, val.legaldescription);
      this.commonarray.splice(17, 1, val.elementaryschl);
      this.commonarray.splice(18, 1, val.middleschl);
      this.commonarray.splice(19, 1, val.highschl);
      this.commonarray.splice(20, 1, val.keywords);
      this.commonarray.splice(21, 1, val.listing_agent);
      this.commonarray.splice(22, 1, val.listing_office);
      this.commonarray.splice(23, 1, this.valstafinal);
      this.commonarray.splice(24, 1, this.valcombineproperty);
      this.commonarray.splice(25, 1, '&updated_at=d_asc');
       this.countfilterforlength = this.commonarray.filter(item => item);
       this.countfilterlength = this.countfilterforlength.length;
         var str2 = this.commonarray[23];
         var n4 = str2.includes("Active");
         var n44 = str2.includes("Bumpable");
                if (this.commonarray[23] == '') {
         this.countfilterlength = this.countfilterlength - 3;
       }else{
         this.countfilterlength = this.countfilterlength - 4;
       }
         var str = this.commonarray[23];
         var n = str.includes("Short Sale");
         var n2 = str.includes("Pending");
         var n3 = str.includes("Sold")
         var n4 = str.includes("Off Market");
         if (n === true || n2 === true || n3 === true || n4 === true) {
           this.countfilterlength = this.countfilterlength + 1;
         }

       if (this.countfilterlength == 0) {
         this.showFiltercount = "none";
                           if (this.countfilterlength == '-1') {
           this.countfilterlength = 0;
         }
       }else{
                  if (this.countfilterlength == '-1') {
           this.countfilterlength = 0;
         }
         this.showFiltercount = "block";
       }

         this.service.filterhomesearchproperties(this.currentPage, this.filters, this.commonarray, this.userid).then( (response : any) => {
         console.log(this.commonarray);
         console.log(response);
           this.properties = response.data;
           this.totalPages = response.totalPages;
           this.totalRecords = response.totalRecords;
           this.showSpinnerProperty = false;
           this.showSpinner = false;
                 this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
                     let urlParamap2: any = {
            searchTearm: this.commonarray[0],
            requestType: 'map',
          }
           this.loadMap(urlParamap2);
           let urlParamap: any = {
             searchTearm: this.commonarray[0],
             requestType: 'map',
           }
           this.loadMapMore(this.commonarray);

           this.forinfi = this.commonarray;
           this.currentPage = 1;
           this.forscroll = 'yes';
         }).catch( error => {
           this.showSpinnerProperty = false;
           this.showSpinner = false;
         })

    }
  });
// storage property
       }).catch( error => {
         console.log(error);
         this.showSpinnerProperty = false;
         this.showSpinner = false;
       })
     } catch(e) {
       this.service.serverError();
     }
   }

   doInfinite(infiniteScroll) {
     console.log(this.userid);
     if (this.userid != 0) {
       // code...
     }
     try {
       if(this.currentPage <= this.totalPages)
       {
         this.currentPage++;
         this.isOnScroll = true;
         if (this.forinfi) {
           this.forinfi = this.forinfi;
         }else{
           this.forinfi = this.searchArray;
         }
         let urlPara: any = {
           searchTearm: this.forinfi,
           requestType: this.requestType,
         }
         if (this.forscroll == 'yes') {
           this.showSpinner = true;
           console.log(this.forinfi);
           this.service.homesearchpropertiesafter(this.currentPage, this.forinfi, this.userid).then( (response : any) => {
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
           this.showSpinner = true;
           console.log(this.commonarray);
           this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {
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
       }
     } catch(e) {
       this.showSpinnerProperty = false;
       this.showSpinner = false;
       this.service.serverError();
     }
   }

getCountry(id) {
    return this.properties.find(c => c.id === '19451');
}



  public dismissPushTab(){
    this.viewCtrl.dismiss();
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
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
           var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
       }).catch( error => {
           console.log(error);
document.getElementById('dynamicprofile').innerHTML ="";
       })
     } catch(e) {
          this.service.serverError();
      }
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
      console.log(propertyid);
      if (!auth_user_token) {
        console.log(0);
        $(".favoritelist ion-item" ).removeClass('item-checkbox-checked');
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{
    console.log(propertyid);
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }

       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
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

goToCard(){
  this.currentPage = 1;
  this.showList = 'none';
  this.showCard = 'block';
  this.showMap = 'none';
  this.showListbtn = 'block';
  this.showCardbtn = 'none';
  this.showMapbtn = 'block';
  this.showSpinnerProperty = false;
  this.showSpinner = false;
}
goToList(){
  // this.isShown = true;
  this.currentPage = 1;
  this.showList = 'block';
  this.showCard = 'none';
  this.showMap = 'none';
  this.showListbtn = 'none';
  this.showCardbtn = 'block';
  this.showMapbtn = 'block';
  this.showSpinnerProperty = false;
  this.showSpinner = false;
  // console.log(this.paraArray);
}
goToMap(){
  // this.loadMap();
  this.isShown = false;
  this.currentPage = 1;
  this.showList = 'none';
  this.showCard = 'none';
  this.showMap = 'block';
  this.showMapLoader = 'none';
  this.showListbtn = 'block';
  this.showCardbtn = 'block';
  this.showMapbtn = 'none';
  this.showSpinnerProperty = false;
  this.showSpinner = false;
//  this.loadMap();

}
gotosignin(){
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }

       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
})
}
gotocreate(){
  let getsignupModal = this.modalCtrl.create(SignupPage, {asmodal : 'yes'});
  getsignupModal.present();
  getsignupModal.onDidDismiss(data=>{
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }

       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
})
}
 getMapProperties() {
   try {
      let urlPara: any = {
       searchTearm: this.searchTearm,
       requestType: 'map',
      }
     this.showSpinner = true;
     this.service.homesearchpropertiesmap(this.filters, urlPara).then( (response : any) => {
       this.propertiesmap = response.data;
       this.showMapLoader = 'none';
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
 }

 loadMapMore(urlParamap) {
   try {
     this.showSpinner = true;
     this.service.filterhomesearchpropertiesmap(this.currentPage, this.filters, urlParamap, this.userid).then( (response : any) => {

       this.showSpinnerProperty = false;
       this.showSpinner = false;
       this.propertiesmap = response.data;
       this.showMapLoader = 'none';
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
       let latLng = new google.maps.LatLng(this.propertiesmap[0]["Latitude"],this.propertiesmap[0]["Longitude"]);
       var bounds = new google.maps.LatLngBounds();
       const icon = {
         url: 'assets/imgs/pricepin.svg',
         scaledSize: new google.maps.Size(48, 60),
         origin: new google.maps.Point(0,-3),
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
        var lablefont = '12px';
        this.mapohlabel = '';
        var icondy = {
          url: 'assets/imgs/pricepin.svg',
          scaledSize: new google.maps.Size(48, 60),
          origin: new google.maps.Point(0,-3),
        };
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-video-border-black.svg',
          scaledSize: new google.maps.Size(50, 60),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] != 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-video-camera-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] != 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-border-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["ListOfficeName"] == 'TopTech Realty LLC'){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-taigha-label.svg',
          scaledSize: new google.maps.Size(55, 60),
          origin: new google.maps.Point(0,3),
        };
      }
         var contentString = "";
         var Latlng = new google.maps.LatLng(this.propertiesmap[i].lat,this.propertiesmap[i].lon);
         var saved_label = String(this.mapohlabel+kFormatter(this.propertiesmap[i]["PriceCurrentForStatus"]));
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]),
           icon: icondy ,
           label: {
            color: '#fff',
            fontSize: lablefont,
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
         this.is_open_house=this.propertiesmap[i].is_open_house;
         this.is_virtual_tour=this.propertiesmap[i].is_virtual_tour;

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
         let Isopenhouse=this.propertiesmap[i].is_open_house;
         let Isvirtualtour=this.propertiesmap[i].is_virtual_tour;
         let single_image=this.propertiesmap[i].single_image;
         let DaysOnMarket=this.propertiesmap[i].DaysOnMarketCustom;
         let openhousedate=this.propertiesmap[i].open_house_date;
         let listingstatus=this.propertiesmap[i].ListingStatus;

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
            self.getPropertyImage(primaryid, idz, country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount, Isopenhouse, Isvirtualtour, single_image, DaysOnMarket, openhousedate, listingstatus)
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


 loadMap(urlParamap) {
console.log(this.userid);
   try {

     this.showSpinner = true;
     this.service.homesearchpropertiesmap(this.filters, urlParamap).then( (response : any) => {
      console.log('homesearchpropertiesmap');
     console.log(response);
       this.propertiesmap = response.data;
       this.showMapLoader = 'none';
       this.totalPagesmap = response.totalPages;
       this.totalRecordsmap = response.totalRecords;
       let latLng = new google.maps.LatLng(this.propertiesmap[0]["Latitude"],this.propertiesmap[0]["Longitude"]);
       var bounds = new google.maps.LatLngBounds();
       console.log('is_open_house');
       const icon = {
         url: 'assets/imgs/pricepin.svg',
         scaledSize: new google.maps.Size(48, 60),
         origin: new google.maps.Point(0,-3),
       };
       let mapOptions = {
         center: latLng,
         zoom: 11,
         minZoom: 11,
         icon: icon ,
         gestureHandling: "greedy",
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
        var lablefont = '12px';
        this.mapohlabel = '';
        var icondy = {
          url: 'assets/imgs/pricepin.svg',
          scaledSize: new google.maps.Size(48, 60),
          origin: new google.maps.Point(0,-3),
        };
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-video-border-black.svg',
          scaledSize: new google.maps.Size(50, 60),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] == 1 && this.propertiesmap[i]["is_open_house"] != 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-video-camera-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
        };
      }
      if(this.propertiesmap[i]["is_virtual_tour"] != 1 && this.propertiesmap[i]["is_open_house"] == 1){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-open-border-black.svg',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,3),
        };
      }
      if(this.propertiesmap[i]["ListOfficeName"] == 'TopTech Realty LLC'){
        this.mapohlabel = '';
        var lablefont = '10px';
        var icondy = {
          url: 'assets/imgs/map-taigha-label.svg',
          scaledSize: new google.maps.Size(55, 60),
          origin: new google.maps.Point(0,3),
        };
      }
         var contentString = "";
         var Latlng = new google.maps.LatLng(this.propertiesmap[i].lat,this.propertiesmap[i].lon);
        // var saved_label = String(this.propertiesmap[i]["id"]);
         var saved_label = String(this.mapohlabel+kFormatter(this.propertiesmap[i]["PriceCurrentForStatus"]));
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(this.propertiesmap[i]["Latitude"], this.propertiesmap[i]["Longitude"]),
           id: this.propertiesmap[i].ListingID+"id",
           icon: icondy ,
           label: {
             color: '#fff',
             fontSize: lablefont,
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
         this.is_open_house=this.propertiesmap[i].is_open_house;
         this.is_virtual_tour=this.propertiesmap[i].is_virtual_tour;

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
         let Isopenhouse=this.propertiesmap[i].is_open_house;
         let Isvirtualtour=this.propertiesmap[i].is_virtual_tour;
         let single_image=this.propertiesmap[i].single_image;
         let DaysOnMarket=this.propertiesmap[i].DaysOnMarketCustom;
         let openhousedate=this.propertiesmap[i].open_house_date;
         let listingstatus=this.propertiesmap[i].ListingStatus;

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
       //   console.log(priceeee);

       this.hidemapimage = 'hide';
            self.getPropertyImage(primaryid, idz, country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount, Isopenhouse, Isvirtualtour, single_image, DaysOnMarket, openhousedate, listingstatus)
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

getPropertyImage(primaryid, idz,  country, state, zipcode, slug, PriceCurrentForStatus, Beds, BathsTotalInteger, SqFtApproximateTotal, FullStreetAddress, City, State, ZipCode, favcount, Isopenhouse, Isvirtualtour, single_image, DaysOnMarket, openhousedate, listingstatus){
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
         this.is_open_house=Isopenhouse;
         this.is_virtual_tour=Isvirtualtour;
         this.mappropertyRmlsDaysRe=DaysOnMarket;
         this.propertysingleopenhouse=openhousedate;
         this.propertyStatus=listingstatus;
        $(".map-property").css("background-image", "url(" + single_image + ")");
   console.log(primaryid);
  // this.service.singlepropertyimage(primaryid).then( (response : any) => {
  //   console.log('click on label');
  //   console.log(response);
  //   this.mappropertyRmlsDaysRe = response.data.timeago;
  //      this.hidemapimage = 'show';
  //     //  this.propertysingleimg = response.data.image.image;
  //     //  this.propertysingleopenhouse = response.data.openhouse_date;
  //     //  this.propertysinglevirtualtour = response.data.virtualtour;
  //     //  $(".map-property").css("background-image", "url(" + this.propertysingleimg + ")");
  //      }).catch( error => {
  //    })

}
 openProperty(idz){
   console.log(idz);
       let openArray = this.mapsearchArray;
      console.log(openArray);
       let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : idz, openArray : openArray});
    addWeatherModal.present();
 }

openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}

viewProperty(propertyId){
  let openArray =this.searchArray;
  console.log(this.forinfi);
  let addWeatherModal = this.modalCtrl.create(PropertyDetailPage, { propertyId : propertyId, openArray : openArray, forinfi: this.forinfi});
  addWeatherModal.present();

  addWeatherModal.onDidDismiss(data=>{
    console.log(data);
    this.showSearchMore = 'none';
    this.showSearchAll = 'none';
    if (data == undefined) {
      this.showSearchMore = 'none';
      this.showSearchAll = 'flex';
      this.clickMorescroll = '';
//  if (this.searchArray.indexOf('97229') === -1) this.searchArray.push('97229');
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

        if (this.forinfi) {
          this.paraArray = this.forinfi;
        }else{
          this.paraArray = this.paraArray;
        }
        this.showSpinner = true;
        if (this.forinfi) {
          this.service.homesearchpropertiesafter(this.currentPage, this.paraArray, this.userid).then( (response : any) => {
console.log(this.paraArray);
            this.properties = response.data;
            this.totalPages = response.totalPages;
            this.totalRecords = response.totalRecords;
            this.showSpinnerProperty = false;
            this.showSpinner = false;
          }).catch( error => {
            this.showSpinnerProperty = false;
            this.showSpinner = false;
          })
        }else{
          this.service.homesearchproperties(this.currentPage, this.commonarray, this.userid).then( (response : any) => {
console.log("else"+ this.commonarray);
            this.properties = response.data;
            this.totalPages = response.totalPages;
            this.totalRecords = response.totalRecords;
            this.showSpinnerProperty = false;
            this.showSpinner = false;
                  this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
          }).catch( error => {
            this.showSpinnerProperty = false;
            this.showSpinner = false;
            // // console.log(error);
          })
        }
      } catch(e) {
        this.showSpinnerProperty = false;
        this.showSpinner = false;
        this.service.serverError();
      }
    }

  })
}

  mapbody(){

  }

 getOption() {
   try {
     this.service.getoptions().then( (response : any) => {
       console.log('getOption');
       console.log(response.data);
       this.optionResult = response.data;
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
       this.optionResultVirtualTour = response.data.virtual_tour;
       this.showSpinner = false;
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
   }

   openFilter() {
     this.noproperty = 'none';
     if (this.countfilter.length == 0) {
       this.countfilter = ['','','','','','','','','','','','','','','','','','','','','',''];
     }
    console.log(this.searchArray);
     let addWeatherModal = this.modalCtrl.create(FilterPage,  {fromlocation: 'no', searchArray : this.searchArray, optionResult : this.optionResult, selectedBeds : this.selectedBeds, selectedBaths : this.selectedBaths, totalRecords : this.totalRecordsMore, paraArrayReturn : this.paraArray, selectedPropertyClass : this.selectedPropertyClass, selectedPropertyClass1 : this.selectedPropertyClass1, selectedPropertyClass2 : this.selectedPropertyClass2, selectedPropertyClass3 : this.selectedPropertyClass3, selectedPropertyClass4 : this.selectedPropertyClass4, selectedPropertyClass5 : this.selectedPropertyClass5, selectedStatus1 : this.selectedStatus1, selectedStatus2 : this.selectedStatus2, selectedStatus3 : this.selectedStatus3, selectedStatus4 : this.selectedStatus4, selectedStatus5 : this.selectedStatus5, selectedStatus6 : this.selectedStatus6, selectedPropertycate : this.selectedPropertycate, selectedPropertycate1 : this.selectedPropertycate1, selectedPropertycate2 : this.selectedPropertycate2, selectedPropertycate3 : this.selectedPropertycate3, countfilter: this.countfilter, propertyTypeSelect : this.propertyTypeSelect, prptyresarray : this.prptyresarray, prptyclassarray : this.prptyclassarray, updatelistings: this.updatelistings}, { cssClass: 'morefilter' });
     addWeatherModal.present();
     addWeatherModal.onDidDismiss(data=>{

      //             this.selectedlistarray = [];
      // this.selectedlistarraycomma = [];
      // this.selectlabel = 'None';
      //  this.disableButton = true;


      this.selectlabel = 'None';
      this.selectallchecked = false;
      this.disableButton = true;
      $("#selectallid" ).removeClass('selectedminus');
      this.selectedaddressarray = [];
      this.selectedlistarray = [];
      this.selectedlistarraycomma = [];
      this.totalchecked = 0;
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
    });
    console.log('data-test');
    console.log(data);
       this.showSpinnerProperty = true;
       this.paraArray = data.paraArray;
       this.selectedBeds = data.selectedBeds;
       this.selectedBaths = data.selectedBaths;
       this.totalRecordsMore = data.totalRecords;
       this.selectedPropertyClass = data.selectedPropertyClass;
       this.selectedPropertyClass1 = data.selectedPropertyClass1;
       this.selectedPropertyClass2 = data.selectedPropertyClass2;
       this.selectedPropertyClass3 = data.selectedPropertyClass3;
       this.selectedPropertyClass4 = data.selectedPropertyClass4;
       this.selectedPropertyClass5 = data.selectedPropertyClass5;

       this.selectedStatus1 = data.selectedStatus1;
       this.selectedStatus2 = data.selectedStatus2;
       this.selectedStatus3 = data.selectedStatus3;
       this.selectedStatus4 = data.selectedStatus4;
       this.selectedStatus5 = data.selectedStatus5;
       this.selectedStatus6 = data.selectedStatus6;
       this.selectedPropertycate = data.selectedPropertycate;
       this.selectedPropertycate1 = data.selectedPropertycate1;
       this.selectedPropertycate2 = data.selectedPropertycate2;
       this.selectedPropertycate3 = data.selectedPropertycate3;
       this.countfilter = data.countfilter;
       this.propertyTypeSelect = data.propertyTypeSelect;
       this.prptyresarray = data.prptyresarray;
       this.prptyclassarray = data.prptyclassarray;
       this.updatelistings =  data.updatelistings;
       this.checkedVirtualTour = this.paraArray[26];
       this.countfilterforlength = this.countfilter.filter(item => item);
       this.countfilterlength = this.countfilterforlength.length;

console.log(this.countfilter);
console.log(this.countfilterlength);
       if (this.countfilterlength == 0) {
         this.showFiltercount = "none";
                           if (this.countfilterlength == '-1') {
           this.countfilterlength = 0;
         }
       }else{
          this.showFiltercount = "block";
         if (this.countfilterlength == '-1') {
            this.showFiltercount = "none";
           this.countfilterlength = 0;
         }

       }
       console.log(this.paraArray);
      this.commonarray.splice(0, 1, this.paraArray[0]);
      this.commonarray.splice(1, 1, this.paraArray[1]);
      this.commonarray.splice(2, 1, this.paraArray[2]);
      this.commonarray.splice(3, 1, this.paraArray[3]);
      this.commonarray.splice(4, 1, this.paraArray[4]);
      this.commonarray.splice(5, 1, this.paraArray[5]);
      this.commonarray.splice(6, 1, this.paraArray[6]);
      this.commonarray.splice(7, 1, this.paraArray[7]);
      this.commonarray.splice(8, 1, this.paraArray[8]);
      this.commonarray.splice(9, 1, this.paraArray[9]);
      this.commonarray.splice(10, 1, this.paraArray[10]);
      this.commonarray.splice(11, 1, this.paraArray[11]);
      this.commonarray.splice(12, 1, this.paraArray[12]);
      this.commonarray.splice(13, 1, this.paraArray[13]);
      this.commonarray.splice(14, 1, this.paraArray[14]);
      this.commonarray.splice(15, 1, this.paraArray[15]);
      this.commonarray.splice(16, 1, this.paraArray[16]);
      this.commonarray.splice(17, 1, this.paraArray[17]);
      this.commonarray.splice(18, 1, this.paraArray[18]);
      this.commonarray.splice(19, 1, this.paraArray[19]);
      this.commonarray.splice(20, 1, this.paraArray[20]);
      this.commonarray.splice(21, 1, this.paraArray[21]);
      this.commonarray.splice(22, 1, this.paraArray[22]);
      this.commonarray.splice(23, 1, this.paraArray[23]);
      this.commonarray.splice(24, 1, this.paraArray[24]);
      this.commonarray.splice(25, 1, this.paraArray[25]);
      this.commonarray.splice(26, 1, this.paraArray[26]);
      console.log(this.commonarray);
       this.countfilterforlength = this.commonarray.filter(item => item);
         var str2 = this.commonarray[23];
         var n4 = str2.includes("Active");
         var n44 = str2.includes("Bumpable");
                if (this.commonarray[23] == '') {
         this.countfilterlength = this.countfilterforlength.length - 3; // 3
       }else{
         this.countfilterlength = this.countfilterforlength.length - 3; // 4
       }
         console.log(this.countfilterlength);
         var str = this.commonarray[23];
         var n = str.includes("Short Sale");
         var n2 = str.includes("Pending");
         var n3 = str.includes("Sold");
         var n4 = str.includes("Off Market");
         if (n === true || n2 === true || n3 === true || n4 === true) {
           this.countfilterlength = this.countfilterlength + 1;
         }
       if (this.countfilterlength == 0) {
                                    if (this.countfilterlength == '-1') {
           this.countfilterlength = 0;
         }
         this.showFiltercount = "none";
       }else{
          this.showFiltercount = "block";
                                    if (this.countfilterlength == '-1') {
                                       this.showFiltercount = "none";
           this.countfilterlength = 0;
         }
        console.log(this.countfilterlength);

       }
console.log(this.countfilterlength);
         // this.countfilterlength = this.countfilterlength + 1;
         // console.log(this.countfilterlength);
       //                 if (this.countfilterlength == 0) {
       //   this.showFiltercount = "none";

       // }else{
       //    this.showFiltercount = "block";

       // }
       this.saveSearchurl ='https://toptechrealty.com/public/api/auth/home/search/listings'+'?search-term='+this.paraArray[0]+'&request-type='+this.paraArray[1]+'&beds='+this.paraArray[2]+'&bath='+this.paraArray[3]+'&min_price='+this.paraArray[4]+'&max_price='+this.paraArray[5]+'&sqft-min='+this.paraArray[6]+'&sqft-max='+this.paraArray[7]+'&lotsize-min='+this.paraArray[8]+'&lotsize-max='+this.paraArray[9]+'&openhouse='+this.paraArray[10]+'&price_change='+this.paraArray[11]+'&yearbuild-min='+this.paraArray[12]+'&yearbuild-max='+this.paraArray[13]+'&streetname='+this.paraArray[14]+'&levels='+this.paraArray[15]+'&legaldescription='+this.paraArray[16]+'&elementaryschl='+this.paraArray[17]+'&middleschl='+this.paraArray[18]+'&highschl='+this.paraArray[19]+'&keywords='+this.paraArray[20]+'&listing_agent='+this.paraArray[21]+'&listing_office='+this.paraArray[22]+this.paraArray[23]+this.paraArray[24];

       try {
         this.service.filterhomesearchproperties(this.currentPage, this.filters, this.paraArray, this.userid).then( (response : any) => {

           this.properties = response.data;
           this.totalPages = response.totalPages;
           this.totalRecords = response.totalRecords;
           this.showSpinnerProperty = false;
           this.showSpinner = false;
            this.noproperty = 'flex';
    setTimeout(()=>{
      this.properties.forEach(obj => {
        obj.propertyCheck = false;
      });
    });
           let urlParamap: any = {
             searchTearm: this.paraArray,
             requestType: 'map',
           }
           this.loadMapMore(this.paraArray);
           this.forinfi = this.paraArray;
           this.currentPage = 1;
           this.forscroll = 'yes';
         }).catch( error => {
           this.showSpinnerProperty = false;
           this.showSpinner = false;
         })
       } catch(e) {
         this.showSpinnerProperty = false;
         this.showSpinner = false;
         this.service.serverError();
       }
     })
   }

 }
