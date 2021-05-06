import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ServiceProvider } from '../../../providers/service/service';

/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-image',
  templateUrl: 'view-image.html',
})
export class ViewImagePage {
propertyId: any;
userid: any;
public propertyshowSpinner : boolean = false;
  public propertyImage : any = [];
  public rmlsproperty : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceProvider) {
  	 this.propertyId = this.navParams.get('propertyId');
  	 console.log(this.propertyId);
  	 this.propertyshowSpinner = true;
  	 this.getProperty();
  }
 getProperty() {
    
   try {

       this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
       this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
       console.log(this.rmlsproperty);
       this.propertyImage = response.data.rmls_property_images;
       this.propertyshowSpinner = false;
     }).catch( error => {
         console.log(error);
     })
         }else{
           this.userid = response.data.id;
     this.service.singleproperty(this.propertyId, this.userid).then( (response : any) => {
       console.log(response);
        this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
       console.log(this.rmlsproperty);
       this.propertyImage = response.data.rmls_property_images;
       this.propertyshowSpinner = false;
     }).catch( error => {
         console.log(error);
     })
         }
       }).catch( error => {
       })


   } catch(e) {
        this.service.serverError();
    }

   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewImagePage');
  }
goBack(){
	this.navCtrl.pop();
}
}
