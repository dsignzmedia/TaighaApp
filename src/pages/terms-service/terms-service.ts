import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { ViewController } from 'ionic-angular/navigation/view-controller';
/**
 * Generated class for the TermsServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms-service',
  templateUrl: 'terms-service.html',
})
export class TermsServicePage {
userid: any;
public asmodal: string = "no";
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
 if (this.navParams.get('asmodal')) {
  this.asmodal = this.navParams.get('asmodal');
  console.log(this.asmodal);
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsServicePage');
  }
back(){
	 if (this.asmodal == 'yes') {
	  this.viewCtrl.dismiss();
	}else{
		this.navCtrl.push(TabsPage); 
	}
 //  this.navCtrl.push(TabsPage); 
  }
}
