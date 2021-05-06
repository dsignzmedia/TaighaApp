import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
goBack(){
	this.navCtrl.pop();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

}
