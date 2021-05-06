import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { RequestTourPage } from '../request-tour/request-tour';

/**
 * Generated class for the QtoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

  
@Component({
  selector: 'page-qto-modal',
  templateUrl: 'qto-modal.html',
})
export class QtoModalPage {
propertyID: any;
  constructor(public modalCtrl: ModalController, public storage : StorageProvider, public alertCtrl: AlertController, public viewCtrl: ViewController,  public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.propertyID = this.navParams.data.propertyID;
  //     $('.half-modal').click(function(){
  // this.navCtrl.pop();
  //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QtoModalPage');
  }
dismissModal() {
this.viewCtrl.dismiss();
}
request(data, ListingID){
  this.modalCtrl.create(RequestTourPage, {Requestdata: data, propertyID: ListingID }).present();

 // this.modalCtrl.create(RequestTourPage(data)).present();
}
}
