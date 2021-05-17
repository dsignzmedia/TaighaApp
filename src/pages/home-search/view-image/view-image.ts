import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageSliderPage } from '../image-slider/image-slider';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';

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
storagePropertyImages : any;
storagefullStreetAddress : any;
userid: any;
public propertyshowSpinner : boolean = false;
  public propertyImage : any = [];
  public rmlsproperty : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceProvider,
    public storage: StorageProvider) {
  	 this.propertyId = this.navParams.get('propertyId');
  	 console.log(this.propertyId);
  	 this.propertyshowSpinner = true;
  	 this.getProperty();
  }
 getProperty() {

   try {
    this.storage.getStorage('fullStreetAddress').then((address) => {
      console.log('storagefullStreetAddress 3');
      console.log(JSON.parse(address));
      this.storagefullStreetAddress = JSON.parse(address);
    });
    this.storage.getStorage('propertyImage').then((images) => {
      console.log('storagePropertyImages 3');
      console.log(JSON.parse(images));
      this.storagePropertyImages = JSON.parse(images);
    });
    this.propertyshowSpinner = false;
    //    this.service.profile().then( (response : any) => {
    //      if (response == undefined) {
    //        this.userid = '';
    //  this.service.singlepropertyimage(this.propertyId).then( (response : any) => {
    //    console.log(response);
    //    this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
    //    console.log(this.rmlsproperty);
    //    this.propertyImage = response.data.rmls_property_images;
    //    this.propertyshowSpinner = false;
    //  }).catch( error => {
    //      console.log(error);
    //  })
    //      }else{
    //        this.userid = response.data.id;
    //  this.service.singlepropertyimage(this.propertyId).then( (response : any) => {
    //    console.log(response);
    //     this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
    //    console.log(this.rmlsproperty);
    //    this.propertyImage = response.data.rmls_property_images;
    //    this.propertyshowSpinner = false;
    //  }).catch( error => {
    //      console.log(error);
    //  })
    //      }
    //    }).catch( error => {
    //    })


   } catch(e) {
        this.service.serverError();
    }

   }
   getItem(key: any) {
    try {
      this.storage.getStorage(key).then((val) => {
        console.log('storagePropertyImages 3');
        console.log(JSON.parse(val));
        this.storagePropertyImages = JSON.parse(val);
        return JSON.parse(val);
      });
    } catch (e) {
      return "";
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewImagePage');
  }
  openSlider(propertyId,index){
    this.modalCtrl.create(ImageSliderPage ,{ propertyId : propertyId, index : index}).present();
  }
  goBack(){
    this.navCtrl.pop();
  }
}
