import { Component, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Content } from 'ionic-angular';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { ServiceProvider } from '../../providers/service/service';
import { MypropertiesPage } from '../../pages/myproperties/myproperties';
import { DocumentviewPage } from '../../pages/documentview/documentview'; 
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate'; 
/**
 * Generated class for the PropertyviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-propertyview',
  templateUrl: 'propertyview.html',
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
export class PropertyviewPage {

  @ViewChild(Content) content: Content;

  public workoutProgress: string = "0%";
  public hidemeNotified: boolean = false;
  public property : any = "";
  public propertyId: number = 0;
  public showSpinner:boolean = false;

  public showProperty:boolean = false;
  public showActivity:boolean = false;
  public showMails:boolean = false;
  public showDocument:boolean = false;
  public showTicket:boolean = false;
  public showTask:boolean = false;
  public expandAll:boolean = false;

  public activitycurrentPage = 1;
  public activitypageLimit = 15;
  public activitytotalPages = 0;
  public activitytotalRecords = 0;
  public activityshowSpinner : boolean = true;
  public activities : any = [];

  public taskcurrentPage = 1;
  public taskpageLimit = 15;
  public tasktotalPages = 0;
  public tasktotalRecords = 0;
  public taskshowSpinner : boolean = true;
  public tasks : any = [];
  public checklists_completed_count = 0;
  public checklists_count = 0;

  public ticketcurrentPage = 1;
  public ticketpageLimit = 15;
  public tickettotalPages = 0;
  public tickettotalRecords = 0;
  public ticketshowSpinner : boolean = true;
  public tickets : any = [];

  public mailcurrentPage = 1;
  public mailpageLimit = 15;
  public mailtotalPages = 0;
  public mailtotalRecords = 0;
  public mailshowSpinner : boolean = true;
  public emails : any = [];

  public documentcurrentPage = 1;
  public documentpageLimit = 15;
  public documenttotalPages = 0;
  public documenttotalRecords = 0;
  public documentshowSpinner : boolean = true;
  public documents : any = [];

  public hideNotified() {
     this.hidemeNotified = !this.hidemeNotified;
    }
  constructor(  public navCtrl: NavController, 
        public modalCtrl: ModalController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public service: ServiceProvider) {
    this.propertyId = this.navParams.get('propertyId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyviewPage');
  }

  ecAll() {
    if(this.expandAll) {
        this.showProperty = this.showTask =  this.showActivity = this.showDocument = this.showMails = this.showTicket = false;
    } else {
        this.showProperty = this.showTask = this.showActivity = this.showDocument = this.showMails = this.showTicket = true;
    }
    this.expandAll = this.expandAll ? false : true;
  }

  toggleShowHide(type) {
    if(type == 'property') {
       this.showProperty = (this.showProperty) ? false : true;
    }
    if(type == 'activity') {
       this.showActivity = (this.showActivity) ? false : true;
    }
    if(type == 'document') {
       this.showDocument = (this.showDocument) ? false : true;
    }
    if(type == 'mails') {
       this.showMails = (this.showMails) ? false : true;
    }
    if(type == 'ticket') {
       this.showTicket = (this.showTicket) ? false : true;
    }
    if(type == 'task') {
       this.showTask = (this.showTask) ? false : true;
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter PropertyPage');
    this.clearAndGetProperty();
    this.service.getFcmToken("Property View : "+ this.propertyId);
    this.service.watchFcmNotifications()
  }

  clearAndGetProperty() {
   this.property = '' ;
   this.tickets = []; 
   this.activities  = [];
   this.emails  = [];
   this.documents = [];
   this.getProperty();

 }

 getProperty() {
   try {
     this.showSpinner = true;
     this.service.property(this.propertyId).then( (response : any) => {
       console.log(response);
       this.property = response.data.property;
       this.showSpinner = false;
       
       this.clearAndGetActivities();
       this.clearAndGetTasks();
       this.clearAndGetTickets();
       this.clearAndGetEmails();
       this.clearAndGetDocuments();
     }).catch( error => {
         this.showSpinner = false;
         console.log(error);
     })
   } catch(e) {
     this.showSpinner = false;
        this.service.serverError();
    }
 }

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

    toggleEmail(activity) {
      if(activity.activity_checked) {
        activity.activity_checked = false;
      } else {
        activity.activity_checked = true;
      }
    }

  viewTicket(ticket){
   this.navCtrl.push(TicketviewPage, { ticketId : ticket.id }); 
  }
  viewMail(email){
   if(email.email_from == 'tickets')
      {
        this.navCtrl.push(TicketviewPage, { ticketId : email.ticket_id }); 
      } else {
        this.navCtrl.push(MailviewPage, { emailId : email.id } ); 
      }
  }
  viewDocuments(){
   this.navCtrl.push(DocumentviewmodalPage); 
  }

  editProperty(){
   this.navCtrl.push(NewpropertiesPage, { propertyId : this.property.id}); 
  }

  doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.clearAndGetProperty();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
    }

  openDocumentsModal(pmaId) {
    let opts: any = {
     cssClass: 'documentViewModal',
    }
    let filtermodal = this.modalCtrl.create(DocumentviewmodalPage, {pmaId: pmaId} , opts);
     filtermodal.present();
   }

   viewDocument(document) {
     if(document.pma_id != 0) {
       this.openDocumentsModal(document.pma_id);
     }else if(document.doc_id != 0) {
       this.navCtrl.push(DocumentviewPage, { documentId : document.doc_id }); 
     }
   }
   
   editDcoument(document) {
     if(document.doc_id != 0) {
        this.navCtrl.push(NewdocumentupdatePage, {documentId : document.doc_id});
      }
  }
   toggleGroupTask(activity) {
      if(activity.sub_activity_checked) {
        activity.sub_activity_checked = false;
      } else {
        activity.sub_activity_checked = true;
      }
  }

  updateChecklistStatus(checklist) {
   if(checklist.is_completed == 0) {
       checklist.is_completed = 1;
   } else {
     checklist.is_completed = 0;
   }
   let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loading.present();
    this.service.toggleChecklist(checklist).then( (response : any) => {
       loading.dismiss();
       this.clearAndGetProperty();
     }).catch( error => {
        loading.dismiss();
         console.log(error);
     }) 
 }

 updateProgress(val) {
 // Update percentage value where the above is a decimal
  this.workoutProgress = (val) + '%';
  }
 
  goToCorrespondTask(task) {
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

  back(){
   this.navCtrl.pop();  
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
    console.log(element);
  }

  //ActivitiesStart
  clearAndGetActivities() {
     this.activitycurrentPage = 1;
     this.activities = [];
     this.getActivities();
  }
  getActivities() {
   try {
     this.activityshowSpinner = true;
     this.service.propertyactivities(this.property.id, this.activitycurrentPage).then( (response : any) => {
       console.log( response )
       this.activities = response.data;
       this.activitytotalPages = response.totalPages;
       this.activitytotalRecords = response.totalRecords;
       this.activityshowSpinner = false;
     }).catch( error => { 
         this.activityshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.activityshowSpinner = false;
     this.service.serverError();
    }
 }

 loadMoreActivites() {
    try {
     if(this.activitycurrentPage <= this.activitytotalPages)
     {
       this.activitycurrentPage++;
       this.activityshowSpinner = true;
       this.service.propertyactivities(this.property.id, this.activitycurrentPage).then( (response : any) => {
         console.log( response );
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.activities.push(item);
            });
          this.activityshowSpinner = false;
       }).catch( error => {
           this.activityshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.activityshowSpinner = false;
        this.service.serverError();
   }
  }

  //ActivitiesEnd
 

  //Tasks Start
  clearAndGetTasks() {
   this.taskcurrentPage = 1;
   this.tasks = [];
   this.getTasks(); 
 }

 getTasks() {
   try {
     this.taskshowSpinner = true;
     this.service.tasks(this.taskcurrentPage, { property : this.property.id }, 'all').then( (response : any) => {
       console.log(response);
       console.log(response.data); 
       this.tasks = response.data;
       this.tasktotalPages = response.totalPages;
       this.tasktotalRecords = response.totalRecords;
       this.taskshowSpinner = false;
       this.checklists_count = response.checklists_count;
       this.checklists_completed_count  = response.checklists_completed_count;
       this.updateProgress(response.checklist_count_percentage);
     }).catch( error => {
         this.taskshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.taskshowSpinner = false;
        this.service.serverError();
    }
 }

 loadMoreTasks() {
   try {
      
     if(this.taskcurrentPage <= this.tasktotalPages)
     {
        this.taskshowSpinner = true;
       this.taskcurrentPage++;
       this.service.tasks(this.taskcurrentPage, { property : this.property.id }, 'all').then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.tasks.push(item);
            });
           this.taskshowSpinner = false;
       }).catch( error => {
           this.taskshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.taskshowSpinner = false;
        this.service.serverError();
   }
 } 
  //Tasks End

  //Tickets Start
  clearAndGetTickets() {
   this.ticketcurrentPage = 1;
   this.tickets = [];
   this.getTickets();
 }

 getTickets() {
   try {
     this.ticketshowSpinner = true;
     this.service.tickets(this.ticketcurrentPage, { property : this.property.id }  ).then( (response : any) => {
       console.log( response )
       this.tickets = response.data;
       this.tickettotalPages = response.totalPages;
       this.tickettotalRecords = response.totalRecords;
       this.ticketshowSpinner = false;
     }).catch( error => {
         this.ticketshowSpinner = false;
         console.log(error);
     })
   } catch(e) {
     this.ticketshowSpinner = false;
        this.service.serverError();
    }

 }

 loadMoreTickets() {
   try {
     if(this.ticketcurrentPage <= this.tickettotalPages)
     {
       this.ticketshowSpinner = true;
       this.ticketcurrentPage++;
       this.service.tickets(this.ticketcurrentPage, { property : this.property.id }).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.tickets.push(item);
            });
        this.ticketshowSpinner = false;
       }).catch( error => {
           this.ticketshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.ticketshowSpinner = false;
        this.service.serverError();
   }
 }
 //Tickets End

 //Mails Start
  clearAndGetEmails() {
   this.mailcurrentPage = 1;
   this.emails = [];
   this.getEmails();
 }

 getEmails() {
   try {
     this.mailshowSpinner = true;
     this.service.emails(this.mailcurrentPage, { property : this.property.id }, 1).then( (response : any) => {
       console.log( response )
       this.emails = response.data;
       this.mailtotalPages = response.totalPages;
       this.mailtotalRecords = response.totalRecords;
       this.mailshowSpinner = false;
     }).catch( error => {
         this.mailshowSpinner = false;
         console.log(error);
     })
   } catch(e) {
     this.mailshowSpinner = false;
     this.service.serverError();
    }

 }

 loadMoreEmails() {
   try {
     if(this.mailcurrentPage <= this.mailtotalPages)
     {
       this.mailcurrentPage++;
       this.mailshowSpinner = true;
       this.service.emails(this.mailcurrentPage, { property : this.property.id }, 1).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.emails.push(item);
            });
        this.mailshowSpinner = false;
       }).catch( error => {
           this.mailshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
       this.mailshowSpinner = false;
        this.service.serverError();
   }
 }
 //Mails End

 //Documents Start
  clearAndGetDocuments() {
   this.documentcurrentPage = 1;
   this.documents = [];
   this.getDocuments();
 }

 getDocuments() {
   try {
     this.documentshowSpinner = true;
     this.service.documents(this.documentcurrentPage, { property : this.property.id }).then( (response : any) => {
       console.log( response )
       this.documents = response.data;
       this.documenttotalPages = response.totalPages;
       this.documenttotalRecords = response.totalRecords;
       this.documentshowSpinner = false;
     }).catch( error => {
         this.documentshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.documentshowSpinner = false;
        this.service.serverError();
    }
 }

 loadMoreDocuments() {
   try {
     if(this.documentcurrentPage <= this.documenttotalPages)
     {
       this.documentshowSpinner = true;
       this.documentcurrentPage++;
       this.service.documents(this.documentcurrentPage, { property : this.property.id }).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.documents.push(item);
            });
           this.documentshowSpinner = false;
       }).catch( error => {
           this.documentshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.documentshowSpinner = false;
     this.service.serverError();
   }
 }
 //Documents End
}
