import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../../pages/signin/signin';
import { ProfilePage } from '../../pages/profile/profile';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the PopoverpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popoverpage',
  templateUrl: 'popoverpage.html',
})
export class PopoverpagePage {

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public service: ServiceProvider) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverpagePage');
  }
goToProfile(){
	this.navCtrl.push(ProfilePage); 
}
goToLogout(){
	this.service.clearAuthDatas();
	this.navCtrl.push(SigninPage); 
}
}
