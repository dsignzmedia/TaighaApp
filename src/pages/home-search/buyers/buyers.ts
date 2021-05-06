import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the BuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-buyers',
  templateUrl: 'buyers.html',
})
export class BuyersPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.com/buy-homes-in-portland", "_self");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellersPage');
  }

goBack(){
	this.navCtrl.pop();
}

}
