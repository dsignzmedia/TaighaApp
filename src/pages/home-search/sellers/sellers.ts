import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { ServiceProvider } from '../../../providers/service/service';

/**
 * Generated class for the SellersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sellers',
  templateUrl: 'sellers.html',
})
export class SellersPage {
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public useridd : string = "";
  public storageToken: any;
    public hasEmailVerified : boolean = false;
  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public service : ServiceProvider,) {
  //	this.iab.create("https://toptechrealty.com/sell-homes-in-portland", "_self");
  	try {
   this.service.profile().then( (response : any) => {

     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/sell-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
//var win = window.open( "http://google.com", "_self", "location=yes" );
 // var win = this.iab.create("https://toptechrealty.com/sell-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
// win.executeScript({ code: "(function() { var body = document.querySelector('body');var div = document.createElement(body);div.classList.add('inappbrowser');body.appendChild(div); })();" });

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellersPage');
  }

goBack(){
	this.navCtrl.pop();
}
}
