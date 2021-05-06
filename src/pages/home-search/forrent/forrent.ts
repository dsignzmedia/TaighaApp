import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the ForrentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sellers',
  templateUrl: 'forrent.html',
})
export class ForrentPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  	this.iab.create("https://toptechrealty.com/for-rent", "_self");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForrentPage');
  }

goBack(){
	this.navCtrl.pop();
}
}
