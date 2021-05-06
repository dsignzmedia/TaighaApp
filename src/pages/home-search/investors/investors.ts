import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the InvestorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sellers',
  templateUrl: 'investors.html',
})
export class InvestorsPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.com/property-investment-in-portland", "_self");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestorsPage');
  }

goBack(){
	this.navCtrl.pop();
}
}
