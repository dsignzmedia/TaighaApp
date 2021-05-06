import { Component, Input, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { MypropertiesPage } from '../../pages/myproperties/myproperties';
import { DatePipe } from '@angular/common'

/**
 * Generated class for the NewpropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-newproperties',
  templateUrl: 'newproperties.html',
})
export class NewpropertiesPage {
  
  urls : any = [];
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  public showSpinner : boolean = true;
  public propertyTypes: any = [];
  public updatedByUsers: any = [];

  public preparedcommunityAmenities: any = [];
  public appliedcommunityAmenities: any = [];

  public preparedunitAmenities: any = [];
  public appliedunitAmenities: any = [];

  public preparedpets: any = [];
  public appliedpets: any = [];

  public preparedleaseTerms: any = [];
  public appliedleaseTerms: any = [];

  public id : any = 0 ;
  public address : any = "";
  public lattitude : any = "";
  public longitude : any = "";
  public city : any = "";
  public state : any = "";
  public zip : any = "";
  public country : any = "";
  public unit : any = "";
  public nick_name : any = "";
  public property_type : any = "";
  public hoa_name : any = "";
  public hoa_website : any = "";
  public mailbox_location : any = "";
  public mailbox_number : any = "";
  public year_built : any = "";
  public square_feet : any = "";
  public bedrooms : any = "";
  public full_bath : any = "";
  public half_bath : any = "";
  public garages : any = "";
  public parking : any = ""; 
  public laundry : any = "";
  public listing_time : any = "";
  public date_available : any = "";
  public expected_rent_price_range : any = "";
  public hoa_contact_name : any = "";
  public phone : any = "";
  public email : any = "";
  public property : any = "";


  public appliedUtilityInfo = [];
  public preparedUtilityInfo = [];

  public current_popup : string;


  public formData = new FormData();

  constructor(	public navCtrl: NavController, 
  				public service: ServiceProvider,
          public alertCtrl: AlertController,
          public datepipe: DatePipe,
  				public navParams: NavParams) {
    this.id = this.navParams.get('propertyId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpropertiesPage');
    var __this = this;
    console.log('ionViewDidLoad YourLocationPage');
    var googleplace = new google.maps.places.Autocomplete(document.getElementById('autocomplete').getElementsByTagName('input')[0]);

      google.maps.event.addListener(googleplace, 'place_changed', function () {
        console.log(googleplace);
        console.log("Triggered");
        var place = googleplace.getPlace()
        __this.address = place.formatted_address;
        __this.lattitude =  place.geometry.location.lat();
        __this.longitude =  place.geometry.location.lng();
        console.log(__this.address);
          /*var place = places.getPlace();
          var address = place.formatted_address;
          var latitude = place.geometry.location.lat();
          var longitude = place.geometry.location.lng();*/
          var address = place.address_components;
  
            address.forEach(function(component) {
              var types = component.types;
              if (types.indexOf('locality') > -1) {
                __this.city = component.long_name;
              }
              
               if (types.indexOf('postal_town') > -1) {
                __this.city = component.long_name;
              }

              if (types.indexOf('administrative_area_level_1') > -1) {
                __this.state = component.long_name;
              }

              if (types.indexOf('postal_code') > -1) {
                __this.zip = component.long_name;
              }
              if (types.indexOf('country') > -1) {
                __this.country = component.long_name;
              }
            });
      });
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter NewpropertiesPage');
    this.clearAndGetOptions();
  }

  clearAndGetOptions() {
	  	try {
	 		this.showSpinner = true;
	 		this.service.propertyCreateOptions().then( (response : any) => {
	 		  console.log(response);
		   	this.propertyTypes = response.data.propertyTypes;
		   	this.updatedByUsers = response.data.properties;
		   	this.preparedcommunityAmenities = response.data.communityAmenities;
		   	this.preparedunitAmenities = response.data.unitAmenities;
		   	this.preparedpets = response.data.pets;
		   	this.preparedleaseTerms = response.data.leaseTerms;
        this.preparedUtilityInfo = response.data.utilityinfo;
		   	this.showSpinner = false;
         if(this.id != 0) {
            this.getEditProperty();
          }
		   }).catch( error => {
		   		this.showSpinner = false;
		   		console.log(error);
		   })
	 	} catch(e) {
	 		this.showSpinner = false;
	        this.service.serverError();
	    }
  }

  getEditProperty() {
      try {
       this.showSpinner = true;
       this.service.propertyedit(this.id).then( (response : any) => {
         console.log(response);
         this.showSpinner = false;
         this.appliedcommunityAmenities = response.data.communityAmenities;
         this.appliedleaseTerms = response.data.leaseTerms;
         this.appliedunitAmenities = response.data.unitAmenities;
         this.appliedpets = response.data.pets;
         this.appliedUtilityInfo  = response.data.utilityinfo;
         this.property = response.data.property;
         this.applyPropertyfields();

       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
       })
     } catch(e) {
       this.showSpinner = false;
          this.service.serverError();
      }
  }

  applyPropertyfields() {
      this.address = this.property.address;
      this.lattitude = this.property.lattitude;
      this.longitude = this.property.longitude;
      this.city = this.property.city;
      this.state = this.property.state;
      this.zip = this.property.zip;
      this.country = this.property.country;
      this.unit = this.property.unit;
      this.nick_name = this.property.nick_name;
      this.property_type = this.property.property_type;
      this.hoa_name = this.property.hoa_name;
      this.hoa_website = this.property.hoa_website;
      this.mailbox_location = this.property.mailbox_location;
      this.mailbox_number = this.property.mailbox_number;
      this.year_built = this.property.year_built;
      this.square_feet = this.property.square_feet;
      this.bedrooms = this.property.bedrooms;
      this.half_bath = this.property.half_bath;
      this.full_bath = this.property.full_bath;
      this.garages = this.property.garages;
      this.parking = this.property.parking;
      this.laundry = this.property.laundry;
      this.listing_time = this.property.listing_time;
      this.date_available = this.property.date_available;
      this.expected_rent_price_range = this.property.expected_rent_price_range;
      this.hoa_contact_name = this.property.hoa_contact_name;
      this.phone = this.property.phone;
      this.email = this.property.email;
  }

   openPopup(popup) {
     this.current_popup = popup;
     let alert = this.alertCtrl.create({
       title: popup,
       cssClass: 'tagsinputAlert',
       inputs: [
         {
           name: 'category',
           placeholder: 'Add New'
         }
       ],
       buttons: [
         {
           text: 'Add New',
           handler: data => {
             if(this.current_popup.toLowerCase() == 'unit amenities') {
                 //this.appliedunitAmenities.push(data.category);
                 this.appliedunitAmenities.push({ 'display': data.category, 'value' : data.category });
             }else if(this.current_popup.toLowerCase() == 'community amenities') {
                 this.appliedcommunityAmenities.push({ 'display': data.category, 'value' : data.category });
                 console.log(this.appliedcommunityAmenities);
             }else if(this.current_popup.toLowerCase() == 'preferred lease terms') {
                 //this.appliedleaseTerms.push(data.category);
                 this.appliedleaseTerms.push({ 'display': data.category, 'value' : data.category });
             }else if(this.current_popup.toLowerCase() == 'pets') {
                 //this.appliedpets.push(data.category);
                 this.appliedpets.push({ 'display': data.category, 'value' : data.category });
             }
           }
         }
       ]
     });
     alert.present();
  }

  changeListener(event) : void {
        let files = event.target.files;
        if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              console.log(file.name)
              this.urls.push({url:e.target.result, name : file.name});
            }
            reader.readAsDataURL(file);
          }
        }
        //console.log(JSON.stringify(this.urls));
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                this.formData.append('photos[]', inputEl.files.item(i));
            }
         }
     }
 
 removeImage(index, name) {
   console.log(index);
   this.formData.append("address", "test");
    var elem = document.getElementById('uploaded_image_'+index);
    elem.parentNode.removeChild(elem);

    var files = this.formData.getAll("photos[]");
    this.formData.delete("photos[]");
    files.forEach((v, i) => {
      console.log(v['name']);
        if(v['name'] != name) {
        this.formData.append("photos[]", v);
      }
    });
    return false;
 }

 removeUploadedImage(id) {
    var elem = document.getElementById('uploaded_image_previous'+id);
    elem.parentNode.removeChild(elem);
    try {
       this.showSpinner = true;
       this.service.propertyeimagedelete(id).then( (response : any) => {
         console.log(response);
         this.showSpinner = false;
       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
       })
     } catch(e) {
       this.showSpinner = false;
          this.service.serverError();
      }
    return false;
 }

 cleanString(string) {
   if(string != undefined && string != "" && string != null) {
     return string;
   }
   return "";
 }

 store() {

   let listing_time = (this.listing_time) ?  this.datepipe.transform(this.listing_time, 'MM/dd/yyyy') : "";
   let date_available = (this.date_available) ?  this.datepipe.transform(this.date_available, 'MM/dd/yyyy') : "";

   this.formData.append('id', this.id);
   this.formData.append('address', this.cleanString(this.address));
   this.formData.append('lattitude', this.cleanString(this.lattitude));
   this.formData.append('longitude', this.cleanString(this.longitude));
   this.formData.append('city', this.cleanString(this.city));
   this.formData.append('state', this.cleanString(this.state));
   this.formData.append('zip', this.cleanString(this.zip));
   this.formData.append('country', this.cleanString(this.country));
   this.formData.append('unit', this.cleanString(this.unit));
   this.formData.append('nick_name', this.cleanString(this.nick_name));
   this.formData.append('property_type', this.cleanString(this.property_type));
   this.formData.append('hoa_name', this.cleanString(this.hoa_name));
   this.formData.append('hoa_website', this.cleanString(this.hoa_website));
   this.formData.append('mailbox_location', this.cleanString(this.mailbox_location));
   this.formData.append('mailbox_number', this.cleanString(this.mailbox_number));
   this.formData.append('year_built', this.cleanString(this.year_built));
   this.formData.append('square_feet', this.cleanString(this.square_feet));
   this.formData.append('bedrooms', this.cleanString(this.bedrooms));
   this.formData.append('half_bath', this.cleanString(this.half_bath));
   this.formData.append('full_bath', this.cleanString(this.full_bath));
   this.formData.append('garages', this.cleanString(this.garages));
   this.formData.append('parking', this.cleanString(this.parking));
   this.formData.append('laundry', this.cleanString(this.laundry));
   this.formData.append('listing_time', listing_time);
   this.formData.append('date_available', date_available);
   this.formData.append('expected_rent_price_range', this.cleanString(this.expected_rent_price_range));
   this.formData.append('hoa_contact_name', this.cleanString(this.hoa_contact_name));
   this.formData.append('phone', this.cleanString(this.phone));
   this.formData.append('email', this.cleanString(this.email));

   if(this.appliedUtilityInfo.length > 0) {
     this.appliedUtilityInfo.forEach( info => {
       if(info.value != "" && info.value != null && info.value != undefined) {
         this.formData.append('utility_info[]', info.value);
       }
     })
   }else {
     this.formData.append('utility_info[]', "");
   }

   if(this.appliedunitAmenities.length > 0) {
     this.appliedunitAmenities.forEach( info => {
        if(info.value != "" && info.value != null && info.value != undefined) {
         this.formData.append('unitamenities[]', info.value);
        }
     })
   }else {
     this.formData.append('unitamenities[]', "");
   }

   if(this.appliedcommunityAmenities.length > 0) {
     this.appliedcommunityAmenities.forEach( info => {
       if(info.value != "" && info.value != null && info.value != undefined) {
         this.formData.append('communityamenities[]', info.value);
        }
     })
   }else {
     this.formData.append('communityamenities[]', "");
   }

   if(this.appliedpets.length > 0) {
     this.appliedpets.forEach( info => {
       if(info.value != "" && info.value != null && info.value != undefined) {
         this.formData.append('pets[]', info.value);
       }
     })
   } else {
     this.formData.append('pets[]', "");
   }

   if(this.appliedleaseTerms.length > 0) {
     this.appliedleaseTerms.forEach( info => {
       if(info.value != "" && info.value != null && info.value != undefined) {
         this.formData.append('lease-terms[]', info.value);
       }
     })
   }else {
     this.formData.append('lease-terms[]', "");
   }

   this.service.showload();
   this.service.propertystore(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
 }  

 onItemAddedCommunity(event) {
   //this.appliedcommunityAmenities.push(event.value);
   //console.log(event);
 }
back(){
   this.navCtrl.pop(); 
  }
}
