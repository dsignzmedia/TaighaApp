import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, Platform, Content, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FilteractivitiesPage } from '../../pages/filteractivities/filteractivities';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewPage } from '../../pages/documentview/documentview'; 
import { PropertyviewPage } from '../../pages/propertyview/propertyview';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {
   @ViewChild(Content) content: Content;

   public hidemeNotified: boolean = false;
   public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public activities : any = [];
   public isOnScroll: boolean = false;
   public filters: any = "";
   public isFilterApplied: boolean = false;
   public hideNotified() {
     this.hidemeNotified = !this.hidemeNotified;
   }

 constructor(  public navCtrl: NavController, 
          public navParams: NavParams,
          public modalCtrl: ModalController,
          public service: ServiceProvider,
          public popoverCtrl: PopoverController,
          public events: Events,
          public platform: Platform,
          public fcm: FCM,
          public storage : StorageProvider,
          public menuCtrl: MenuController) {
      events.subscribe('activitiesfilter:invoked', () => {
       this.storage.getStorage('appliedActivityFilters').then( filters => {
         this.filters = filters;
         this.clearAndGetActivities();
       });
     });
      events.subscribe('activitiesfilter:revoked', () => {
       this.filters = "";
       this.clearAndGetActivities();
     });

  }
  openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }
 goBack(){
  this.navCtrl.pop();
}
  openfilterModal(characterNum) {
    let opts: any = {
     cssClass: 'filterModal',
    }
    this.storage.removeStorage('activitycalanderapplied');
    let filtermodal = this.modalCtrl.create(FilteractivitiesPage, characterNum, opts);
     filtermodal.present();
 }

ionViewWillEnter() {
    this.storage.getStorage('appliedActivityFilters').then( filters => {
        if(filters) {
         this.filters = filters;
        }
         this.clearAndGetActivities();
         this.service.getFcmToken("Activities");
         this.service.watchFcmNotifications()
     });
}
  
  checkIsFilterApplied() {
   this.isFilterApplied = false;
   this.storage.getStorage('appliedActivityFilters').then( filters => {
     if(filters) {
       this.isFilterApplied = true;
      }
    });
 }

 clearAndGetActivities() {
   this.currentPage = 1;
   this.activities = [];
   this.getActivities();
   this.checkIsFilterApplied();
 }

  resetFilter() {
   this.storage.removeStorage('appliedActivityFilters').then( (response : any) => {
     this.filters = "";
     this.clearAndGetActivities();
   });
   
 }

 getActivities() {
   try {
     this.showSpinner = true;
     this.service.activities(this.currentPage, this.filters).then( (response : any) => {
       this.activities = response.data;
       this.totalPages = response.totalPages;
       this.totalRecords = response.totalRecords;
       this.showSpinner = false;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.showSpinner = false;
        this.service.serverError();
    }
 }

 doInfinite(infiniteScroll) {
   try {
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       this.isOnScroll = true;
       this.service.activities(this.currentPage, this.filters).then( (response : any) => {
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
              this.activities.push(item);
           });
        infiniteScroll.complete();
       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
           infiniteScroll.complete();
       })
    }
   } catch(e) { 
     this.showSpinner = false;
        this.service.serverError();
   }
 }

 doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.currentPage = 0;
          this.clearAndGetActivities();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }

 shownGroup = null; 
 toggleGroup(activity) {
     if(activity.sub_activity) {
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
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverpagePage, {}, {cssClass: 'customPopover'});
    popover.present({
      ev: myEvent
    });
  }

  scrollTo(element:string) {
    let elem = document.getElementById(element);
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var top  = box.top +  scrollTop - clientTop;
    var cDim = this.content.getContentDimensions();
    var scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;
    this.content.scrollTo(0, scrollOffset, 1000);
  }

  goToCorrespondActivity(activity) {
    switch (activity.eloquent) {
      case "ticket":
         this.navCtrl.push(TicketviewPage, { ticketId : activity.eloquent_id }); 
        break;

      case "mail": 
         this.navCtrl.push(MailviewPage, { emailId : activity.eloquent_id } );
        break;

      case "document": 
         this.navCtrl.push(DocumentviewPage, { documentId : activity.eloquent_id }); 
        break;

      case "property": 
         this.navCtrl.push(PropertyviewPage, { propertyId : activity.eloquent_id }); 
        break;

      default:

        break;
    }
  }
  
}
