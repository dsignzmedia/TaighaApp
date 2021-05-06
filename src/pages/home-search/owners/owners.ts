import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the OwnersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sellers',
  templateUrl: 'owners.html',
})
export class OwnersPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.com/owners", "_self");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnersPage');
  }

goBack(){
	this.navCtrl.pop();
}
}

