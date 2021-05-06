import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the FilterdocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filterdocuments',
  templateUrl: 'filterdocuments.html',
})
export class FilterdocumentsPage {
  public showSpinner:boolean = false;
  public filterOptions: any = "";
  public selectedFilters: any = { property_id : [], name : [],  created_at : "", created_by : [],   updated_by : [], updated_at : '' };
  public resetFilters: any = { property_id : [], name : [],  created_at : "", created_by : [],   updated_by : [], updated_at : '' };


  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
          public modalCtrl: ModalController,
  			  public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterdocumentsPage');
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
             this.selectedFilters.created_at = start_date[1]+"/"+start_date[2]+"/"+start_date[0]+"-"+end_date[1]+"/"+end_date[2]+"/"+end_date[0];
           }
        });
  }

  openCalendarUpdated() {

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
  ionViewWillEnter() {
    console.log('ionViewWillEnter FilterpropertiesPage');
    return this.storage.getStorage('appliedDocumentsFilters').then( (appliedEmailFilters : any) => {
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
            this.getFilterOptions();
            this.service.getFcmToken("Property Filter");
            this.service.watchFcmNotifications()
          }
        });

    	
    });
  }

  getFilterOptions() {
  	try {
     this.showSpinner = true;
     this.service.documentFilterOptions().then( (response : any) => {
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
  	this.storage.setStorage('appliedDocumentsFilters', this.selectedFilters).then( response =>  {
  		this.events.publish('documentsfilter:invoked');
	  	this.navCtrl.pop();
  	});
  }

  clearFilter() {
  	this.storage.removeStorage('appliedDocumentsFilters');
  	this.selectedFilters = this.resetFilters;
  }

goBack(){
  this.storage.removeStorage('appliedDocumentsFilters').then(res  => {
      this.events.publish('documentsfilter:invoked');
      this.navCtrl.pop(); 
    })
}
}
