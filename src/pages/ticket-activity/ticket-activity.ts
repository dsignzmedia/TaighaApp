import { Component, trigger, state, style, transition, animate, Input, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, PopoverController, Events, MenuController, Content } from 'ionic-angular';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the TicketActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-activity',
  templateUrl: 'ticket-activity.html',
})
export class TicketActivityPage {
public ticketsub: any;
public ticketData : any = [];
public activities : any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController,
              public loadingCtrl : LoadingController) {
  	this.ticketData = this.navParams.get('ticketData');
  	this.ticketsub = this.navParams.get('ticketsub');
  	this.activities = this.navParams.get('activities');
  	console.log(this.activities );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketActivityPage');
  }
 goBack(){
  this.navCtrl.pop();
}
 toggleGroup(activity) {
   if(activity.sub_activity ) {
      if(activity.sub_activity_checked) {
        activity.sub_activity_checked = false;
      } else {
        activity.sub_activity_checked = true;
      }
    }
  } 
    toggleNotify(activity) {
      if(activity.notified_users_checked) {
        activity.notified_users_checked = false;
      } else {
        activity.notified_users_checked = true;
      }
  }
}
