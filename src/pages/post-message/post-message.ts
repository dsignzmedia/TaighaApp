import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the PostMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-post-message',
  templateUrl: 'post-message.html',
})
export class PostMessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostMessagePage');
  }
openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
}
