import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, CalendarComponentOptions } from "ion2-calendar";


/**
 * Generated class for the FilteractivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filteractivities',
  templateUrl: 'filteractivities.html',
})
export class FilteractivitiesPage {

  public showSpinner:boolean = false;
  public filterOptions: any = "";
  public selectedFilters: any = { categories : [], range : "" };
  public resetFilters: any = { categories : [], range : "" };
  public dateRange: { from: string; to: string; };
  public type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  public testString: any = 1;

  constructor(public navCtrl: NavController, 
          public modalCtrl: ModalController,
  			  public navParams: NavParams,
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
  			  public events: Events) {
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
             this.selectedFilters.range = start_date[1]+"/"+start_date[2]+"/"+start_date[0]+"-"+end_date[1]+"/"+end_date[2]+"/"+end_date[0];
           }
        });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilteractivitiesPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FilteractivitiesPage');
      return this.storage.getStorage('appliedActivityFilters').then( (appliedFilters : any) => {
      	//console.log(appliedTicketFilters);
      	if(appliedFilters) {
      		this.selectedFilters = appliedFilters;
      	}
        this.storage.getStorage('activitycalanderapplied').then( (appliedcalender : any) => {
          console.log(appliedcalender);
          if(appliedcalender) {
            this.selectedFilters = appliedcalender;
            this.storage.removeStorage('activitycalanderapplied');
          } else {
            this.getActivityFilterOptions();
            console.log(this.testString);
            this.service.getFcmToken("Activity Filter");
            this.service.watchFcmNotifications();
          }
      	});
      });
  }

  getActivityFilterOptions() {
  	try {
     this.showSpinner = true;
     this.service.activityFilterOptions().then( (response : any) => {
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

  applyFilter() {
  	console.log(this.selectedFilters);
  	this.storage.setStorage('appliedActivityFilters', this.selectedFilters).then( response =>  {
  		this.events.publish('activitiesfilter:invoked');
	  	this.navCtrl.pop();
  	});
  }

  clearFilter() {
  	this.storage.removeStorage('appliedActivityFilters');
  	this.selectedFilters = this.resetFilters;
  }

goBack(){
	
  this.storage.removeStorage('activitycalanderapplied');
  this.storage.removeStorage('appliedActivityFilters').then( res => {
    this.events.publish('activitiesfilter:revoked');
    this.navCtrl.pop(); 
  });
}

}
