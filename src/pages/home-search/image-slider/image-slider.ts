import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';

/**
 * Generated class for the ImageSliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-slider',
  templateUrl: 'image-slider.html',
})
export class ImageSliderPage {
@ViewChild('slider') slider: Slides;
public index:any;
public propertyId:any;
userid: any;
public imagearr : any = [];
public rmlsproperty : any;
public propertyImage : any = [];
public storagePropertyImages : any = [];
public storagefullStreetAddress : any;
public propertyshowSpinner : boolean = false;
public currentIndex = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,public storage: StorageProvider) {
    this.index = this.navParams.get('index');
    this.propertyId = this.navParams.get('propertyId');
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
      //   this.service.profile().then( (response : any) => {
      //     if (response == undefined) {
      //       this.userid = '';
      // this.service.singlepropertyimage(this.propertyId).then( (response : any) => {
      //   console.log(response);
      //   this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
      //   this.propertyImage = response.data.rmls_property_images;
      //   this.propertyshowSpinner = false;
      //   console.log('propertyImage');
      //   console.log(this.propertyImage);
      // }).catch( error => {
      //     console.log(error);
      // })
      //     }else{
      //       this.userid = response.data.id;
      // this.service.singlepropertyimage(this.propertyId).then( (response : any) => {
      //   console.log(response);
      //    this.rmlsproperty = response.data.rmls_property.FullStreetAddress;
      //   this.propertyImage = response.data.rmls_property_images;
      //   this.propertyshowSpinner = false;
      //   console.log('propertyImage');
      //   console.log(this.propertyImage);
      // }).catch( error => {
      //     console.log(error);
      // })
      //     }
      //   }).catch( error => {
      //   })


    } catch(e) {
         this.service.serverError();
     }

    }
  goToSlide() {
    this.slider.slideTo(this.index, 500);
  }

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide(currentIndex) {
    this.slider.slideTo(currentIndex-1, 500);
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }
    goBack(){
      this.navCtrl.pop();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageSliderPage');
  }
  ionViewDidEnter() {
    this.goToSlide();
  }

}
