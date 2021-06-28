import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the MailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mails',
  templateUrl: 'mails.html',
    animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: 0}),
          animate('0.5s', style({height: 88}))
        ]),
        transition(':leave', [
          style({height: 88}),
          animate('0.5s', style({height: 0}))
        ])
      ]
    )
  ]
})
export class MailsPage {
   public disableUpdate = true;
   public ticket = 1;
   public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public showSpinnerEmail : boolean = false;
   public emails : any = [];
   public isOnScroll: boolean = false;
   public filters: any = "";
   public isFilterApplied: boolean = false;
   public TicketEmailBtn: any = "Hide ticket emails";

    //public showBottomInfo: boolean = false;
 show:boolean = false;
 public text: string = 'More Info';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController) {

      events.subscribe('emailsfilter:invoked', () => {
       console.log('emailsfilter:invoked');
       this.storage.getStorage('appliedEmailFilters').then( filters => {
         console.log(filters);
         this.filters = filters;
         this.clearAndGetEmails();
       });
     });

  }
 public changeText(): void {
      if(this.text === 'More Info') { 
        this.text = 'Less Info'
      } else {
        this.text = 'More Info'
      }
    }
    openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MailsPage');
  }
  showTicketEmail(){
    console.log(this.TicketEmailBtn);
          if(this.TicketEmailBtn === 'Hide ticket emails') { 
             this.showSpinnerEmail = true;
             this.disableUpdate = true;
        this.TicketEmailBtn = 'Show ticket emails';
        this.ticket = 0;
        this.currentPage = 1;
        this.getEmails();
      } else {
         this.showSpinnerEmail = true;
         this.disableUpdate = true;
        this.TicketEmailBtn = 'Hide ticket emails';
        this.ticket = 1;
        this.currentPage = 1;
        this.getEmails();
      }
   // this.TicketEmailBtn = (this.TicketEmailBtn) ? 'Hide ticket emails' : 'Show ticket emails';
  }
  openfilterModal(characterNum) {
      let opts: any = {
       cssClass: 'filterModal',
      }
      this.storage.removeStorage('activitycalanderapplied');
      let filtermodal = this.modalCtrl.create(FiltermailsPage, characterNum, opts);
       filtermodal.present();
  }
  createnewMails(){
    this.navCtrl.push(NewmailPage); 
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter EmailPage');
    this.storage.getStorage('appliedEmailFilters').then( filters => {
         this.filters = filters;
         this.clearAndGetEmails();
         this.service.getFcmToken("Emails");
         this.service.watchFcmNotifications();
     });
  }
 goBack(){
  this.navCtrl.pop();
}
 clearAndGetEmails() {
   this.currentPage = 1;
   this.emails = [];
   this.getEmails();
   this.checkIsFilterApplied();
 }

 checkIsFilterApplied() {
   this.isFilterApplied = false;
   this.storage.getStorage('appliedEmailFilters').then( filters => {
     if(filters) {
       this.isFilterApplied = true;
      }
    });
 }

 resetFilter() {
   this.storage.removeStorage('appliedEmailFilters').then( (response : any) => {
     this.filters = "";
     this.clearAndGetEmails();
   });
   
 }

 getEmails() {
  console.log( 'this.ticket ' );
   console.log( this.ticket  );
   try {
     this.showSpinner = true;
     this.service.emails(this.currentPage, this.filters, this.ticket).then( (response : any) => {
       console.log( response )
       this.emails = response.data;
       this.totalPages = response.totalPages;
       this.totalRecords = response.totalRecords;
       this.disableUpdate = false;
       this.showSpinner = false;
       this.showSpinnerEmail = false;
     }).catch( error => {
         this.showSpinner = false;
         this.showSpinnerEmail = false;
         console.log(error);
     })
   } catch(e) {
     this.showSpinner = false;
     this.showSpinnerEmail = false;
        this.service.serverError();
    }

 }

 doInfinite(infiniteScroll) {
   try {
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       this.isOnScroll = true;
       this.service.emails(this.currentPage, this.filters, this.ticket).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.emails.push(item);
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
          this.clearAndGetEmails();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }
mailsview(email){
  console.log(email); 
    if(email.email_from == 'tickets')
    {

      this.navCtrl.push(TicketviewPage, { ticketId : email.ticket_id, ticketsub : email.common_subject }); 
    } else {
      this.navCtrl.push(MailviewPage, { emailId : email.id, ticketsub : email.common_subject } );
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
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverpagePage, {}, {cssClass: 'customPopover'});
    popover.present({
      ev: myEvent
    });
  }
}
