import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the TenantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sellers',
  templateUrl: 'tenants.html',
})
export class TenantsPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.appfolio.com/connect", "_system");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantsPage');
  }

goBack(){
	this.navCtrl.pop();
}
}
