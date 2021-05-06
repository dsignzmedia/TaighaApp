import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { ServiceProvider } from '../../providers/service/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
/**
 * Generated class for the PrivacyPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {
userid: any;
public asmodal: string = "no";
  constructor(public viewCtrl: ViewController, public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
if (this.navParams.get('asmodal')) {
  this.asmodal = this.navParams.get('asmodal');
  console.log(this.asmodal);
}
  }
     ionViewWillEnter() {

  }
  ionViewDidLoad() {
       // this.service.profile().then( (response : any) => {
       //   this.userid = response.data.id;
       //   console.log(this.userid);
       // }).catch( error => {
       //   this.userid = '0';
       //   console.log(this.userid);
       // })
    console.log(this.userid);
    console.log('ionViewDidLoad PrivacyPolicyPage');
  }
back(){
	 if (this.asmodal == 'yes') {
	  this.viewCtrl.dismiss();
	}else{
		this.navCtrl.push(TabsPage); 
	}
   // this.navCtrl.push(TabsPage); 
  }
}
