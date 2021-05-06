import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
 
// @IonicPage()
@Component({
  selector: 'page-tabpopover',
  templateUrl: 'tabpopover.html',
})
export class TabpopoverPage {
  tabsPageRef: TabsPage;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
      this.tabsPageRef = this.navParams.get('navpage');
  }
 
  openPage(pageName: any) {
    this.tabsPageRef.tabRef.select(pageName);
    this.viewCtrl.dismiss();
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
 
}