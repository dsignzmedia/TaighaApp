import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the FiltermailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filtermails',
  templateUrl: 'filtermails.html',
})
export class FiltermailsPage {

  public showSpinner:boolean = false;
  public filterOptions: any = "";
  public selectedFilters: any = { subject : "", group : [], staffs : [], status : [], priorities : [], updated_by : [], updated_at : '' };
  public resetFilters: any = { subject : "", group : [], staffs : [], status : [], priorities : [], updated_by : [], updated_at : '' };

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
          public modalCtrl: ModalController,
  			  public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltermailsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FiltermailsPage');
    return this.storage.getStorage('appliedEmailFilters').then( (appliedEmailFilters : any) => {
    	console.log(appliedEmailFilters);
    	if(appliedEmailFilters) {
    		this.selectedFilters = appliedEmailFilters;
    	}
      this.storage.getStorage('activitycalanderapplied').then( (appliedcalender : any) => {
          console.log(appliedcalender);
          if(appliedcalender) {
            this.selectedFilters = appliedcalender;
            this.storage.removeStorage('activitycalanderapplied');
          } else {
            this.getEmailFilterOptions();
            this.service.getFcmToken("Email Filter");
            this.service.watchFcmNotifications();
          }
        });
    	
    });
  }

  getEmailFilterOptions() {
  	try {
     this.showSpinner = true;
     this.service.emailFilterOptions().then( (response : any) => {
       console.log( response )
       this.showSpinner = false;
       this.filterOptions = response.data;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     	this.showSpinner = false;
        this.service.serverError();
    }
 }

 openCalendar() {

        const options: CalendarModalOptions = {
          pickMode: 'range',
          title: 'RANGE',
          format: 'MM/DD/YYYY',
          canBackwardsSelected: true
        };
    
        let myCalendar = this.modalCtrl.create(CalendarModal, {
          options: options
        });
        this.storage.setStorage('activitycalanderapplied', this.selectedFilters);
        myCalendar.present();
      
        myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
          console.log(date);
            if(date) {
             var start_date = date.from['string'].split('-');
             var end_date = date.to['string'].split('-');
             console.log(start_date);
             console.log(end_date);
             this.selectedFilters.updated_at = start_date[1]+"/"+start_date[2]+"/"+start_date[0]+"-"+end_date[1]+"/"+end_date[2]+"/"+end_date[0];
           }
        });
  }


 applyFilter() {
  	console.log(this.selectedFilters);
  	this.storage.setStorage('appliedEmailFilters', this.selectedFilters).then( response =>  {
  		this.events.publish('emailsfilter:invoked');
	  	this.navCtrl.pop();
  	});
  }

  clearFilter() {
  	this.storage.removeStorage('appliedEmailFilters');
  	this.selectedFilters = this.resetFilters;
  }

goBack(){
  this.storage.removeStorage('appliedEmailFilters').then(res  => {
      this.events.publish('emailsfilter:invoked');
      this.navCtrl.pop(); 
    })
}
}
