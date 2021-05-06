import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, Platform, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FilteractivitiesPage } from '../../pages/filteractivities/filteractivities';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';

import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewPage } from '../../pages/documentview/documentview'; 
import { PropertyviewPage } from '../../pages/propertyview/propertyview';

/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({ 
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: 0}),
          animate('0.5s', style({height: 147}))
        ]),
        transition(':leave', [
          style({height: 147}),
          animate('0.5s', style({height: 0}))
        ])
      ]
    )
  ]
})
export class TasksPage {
   public hidemeNotified: boolean = false;
   public hideNotified() {
     this.hidemeNotified = !this.hidemeNotified;
    }

   public filterstatus = 'not_completed';
   public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public tasks : any = [];
   public isOnScroll: boolean = false;
   public filters: any = "";
   public isFilterApplied: boolean = false;

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
      
      events.subscribe('tasksfilter:invoked', () => {
       console.log('tasksfilter:invoked');
       this.storage.getStorage('appliedTasksFilters').then( filters => {
         console.log(filters);
         this.filters = filters;
         this.clearAndGetTasks();
       });
     });
      events.subscribe('tasksfilter:revoked', () => {
       console.log('tasksfilter:revoked');
       this.filters = "";
       this.clearAndGetTasks();
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

  openfilterModal(characterNum) {
    let opts: any = {
     cssClass: 'filterModal',
    }
    this.storage.removeStorage('activitycalanderapplied');
    let filtermodal = this.modalCtrl.create(FilteractivitiesPage, characterNum, opts);
     filtermodal.present();
}

ionViewWillEnter() {
    console.log('ionViewWillEnter MypropertiesPage');
    this.storage.getStorage('appliedTasksFilters').then( filters => {
        if(filters) {
         this.filters = filters;
        }
         this.clearAndGetTasks();
         this.service.getFcmToken("Tasks");
         this.service.watchFcmNotifications()
     });
}
 
 clearAndGetTasks() {
   this.currentPage = 1;
   this.tasks = [];
   this.getTasks();
 }

 getTasks() {
   try {
     this.showSpinner = true;
     this.service.tasks(this.currentPage, this.filters, this.filterstatus).then( (response : any) => {
     	console.log(response);
     	console.log(response.data); 
       this.tasks = response.data;
       
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
       this.service.tasks(this.currentPage, this.filters, this.filterstatus).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.tasks.push(item);
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
          this.clearAndGetTasks();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }

 shownGroup = null; 
 toggleGroup(activity) {
      if(activity.sub_activity_checked) {
        activity.sub_activity_checked = false;
      } else {
        activity.sub_activity_checked = true;
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

  goToCorrespondActivity(task) {
    switch (task.checklist_type) {
      case "ticket":
         this.navCtrl.push(TicketviewPage, { ticketId : task.ticket_id }); 
        break;

      case "property": 
         this.navCtrl.push(PropertyviewPage, { propertyId : task.property_id }); 
        break;

      default:
        // code...
        break;
    }
  }

  toggleTileTexts(row) {
   if(row.showmore) {
     row.showmore = false;
     row.showmoretext = "More Info";
   } else {
     row.showmore = true;
     row.showmoretext = "Less Info";
   }
 }
  
}
