import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the FilterticketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filtertickets',
  templateUrl: 'filtertickets.html',
})
export class FilterticketsPage {
  
  public showSpinner:boolean = false;
  public filterOptions: any = "";
  public selectedFilters: any = { subject : "", group : [], staffs : [], status : ["open", "in_process", "completed"], priorities : [], updated_by : [], updated_at : '' };
  public resetFilters: any = { subject : "", group : [], staffs : [], status : ["open", "in_process", "completed"], priorities : [], updated_by : [], updated_at : '' };

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
          public modalCtrl: ModalController,
  			  public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterticketsPage');
    this.getTicketFilterOptions();
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter MypropertiesPage');

    return this.storage.getStorage('appliedTicketFilters').then( (appliedTicketFilters : any) => {
    	//console.log(appliedTicketFilters);
    	if(appliedTicketFilters) {
    		this.selectedFilters = appliedTicketFilters;
    	}

      this.storage.getStorage('activitycalanderapplied').then( (appliedcalender : any) => {
          console.log(appliedcalender);
          if(appliedcalender) {
            this.selectedFilters = appliedcalender;
            this.storage.removeStorage('activitycalanderapplied');
          } else {
            this.getTicketFilterOptions();
            this.service.getFcmToken("Ticket Filter");
            this.service.watchFcmNotifications();
          }
        });
    });
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

  getTicketFilterOptions() {
  	try {
     this.showSpinner = true;
     this.service.ticketFilterOptions().then( (response : any) => {
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
  	this.storage.setStorage('appliedTicketFilters', this.selectedFilters).then( response =>  {
  		this.events.publish('ticketsfilter:invoked');
	  	this.navCtrl.pop();
  	});
  }

  clearFilter() {
  	this.storage.removeStorage('appliedTicketFilters');
  	this.selectedFilters = this.resetFilters;
  }
resetAll(){
  // console.log(this.resetFilters);
  this.selectedFilters = { subject : "", group : [], staffs : [], status : ["open", "in_process", "completed"], priorities : [], updated_by : [], updated_at : '' };
  console.log(this.selectedFilters);
}

	goBack(){
    this.navCtrl.pop();
    // this.storage.removeStorage('appliedTicketFilters').then(res  => {
    //   this.events.publish('ticketsfilter:invoked');
    //   this.navCtrl.pop(); 
    // })
		
	}
}
