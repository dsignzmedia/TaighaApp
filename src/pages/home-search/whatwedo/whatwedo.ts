import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the WhatwedoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sellers',
  templateUrl: 'whatwedo.html',
})
export class WhatwedoPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.com/what-we-do", "_self");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatwedoPage');
  }

goBack(){
	this.navCtrl.pop();
}
}

