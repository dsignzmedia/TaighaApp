import { Component, ViewChild, trigger, state, style, transition, animate, NgZone } from '@angular/core';
import {  Content, NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { MessageDetailsPage } from '../../pages/message-details/message-details';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
import { CreateMessagePage } from '../../pages/create-message/create-message';

/**
 * Generated class for the TextMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-text-message',
  templateUrl: 'text-message.html',
})
export class TextMessagePage {
    @ViewChild(Content) pageTop: Content;
      public userlist : any = [];
  public showInfo : boolean = false;
     public ishidden:boolean = false;
  messagehistory: any;
  yesorno: any;


   public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public textmessage : any = [];
   public isOnScroll: boolean = false;
   public filters: any = "";
   public isFilterApplied: boolean = false;
public showSearchIcon : boolean = true;
public showClearIcon : boolean = false;
public showSearch : boolean = false;
public userslistsearch : any = [];
  public isShown: boolean = false;
searchTerm: string = '';
searched: string = 'no';
  constructor(public navCtrl: NavController, 
              public zone: NgZone,
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextMessagePage');
    this.getTextmsg();
  }
goBack(){
	this.navCtrl.pop();
}
gotoCreateMessage(){
      let createmessagemodal = this.modalCtrl.create(CreateMessagePage);
     createmessagemodal.present();
}
  scrollToTop() {
    this.pageTop.scrollTo(0, 0, 0);
    this.isShown = false;
  }


   onScrolll($event) {
        this.zone.run(() => {
          if ($event.scrollTop > 50) {
            this.isShown = true;
          }else{
            this.isShown = false;
          }
        })
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
 clearAndGetEmails() {
   this.currentPage = 1;
   this.textmessage = [];
   this.showSpinner = true;
   this.getTextmsg();
 }
   getItems(){
console.log(this.searchTerm);
this.ishidden = false;
if (this.searchTerm != '') {
    this.showSearchIcon = false;
    this.showClearIcon = true;
  }else{
    this.showSearchIcon = true;
    this.showClearIcon = false;
  }
   }

protected resetChanges = () => {
    this.textmessage = this.userslistsearch;
};
//   protected searchtag = () => {
//     this.resetChanges();
//     this.getItems();
//     this.textmessage = this.textmessage.filter((item)=>{
//        if (item.customer_name && item.customer_name.trim() != '') {
//         return item.customer_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
//       }
//     })
// };
clearsearchGlobal(){
  this.searchTerm = '';
  this.showSpinner = false;
      this.resetChanges();
    this.getItems();
    this.searched = "no";
this.ishidden = false;
   // this.showSpinner = true;
    // this.getTextmsg();
    // this.textmessage = this.textmessage.filter((item)=>{
    //    if (item.customer_name && item.customer_name.trim() != '') {
    //     return item.customer_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
    //   }
    // })
}
toggleCard() {
this.showSearch = (this.showSearch) ? false : true;
}
searchtag(Issearch){
  if (Issearch == 'yes') {


console.log(this.searchTerm);
this.showSpinner = true;
this.showInfo = false;
// messageUserFilter
if (this.searchTerm != '') {
    this.showSearchIcon = false;
    this.showClearIcon = true;
  }else{
    this.showSearchIcon = true;
    this.showClearIcon = false;
  }
if (this.searchTerm == '') {
this.ishidden = false;
this.showSpinner = false;
this.showInfo = false;
}else{
   try {
     this.service.messageUserFilter(this.searchTerm).then( (response : any) => {
       console.log( response );
       this.showSpinner = false;
       this.userlist = response.data;
       if (this.userlist.length == 0) {
         this.showInfo = true;
       }else{
         this.showInfo = false;
       }
       this.ishidden = true;
     }).catch( error => {
         console.log(error);
         this.showSpinner = false;
         this.ishidden = false;
     })
   } catch(e) {
        this.service.serverError();
    }
  }

  }else{
    this.clearsearchGlobal();
  }

  // console.log(this.searchTerm);
  // this.showSpinner = true;
  //  this.getItems();
  // this.searched = "yes";
  //    this.currentPage = 1;
  //        this.service.messageFilter(this.currentPage, this.searchTerm).then( (response : any) => {
  //      console.log( response );
  //      this.showSpinner = false;
  //             this.textmessage = response.data.data;
  //       this.userslistsearch = response.data.data; 
  //      this.totalPages = response.data.last_page;
  //    }).catch( error => {
  //        console.log(error);
  //    })
}
testdata(){
     //   this.service.messageFilter('krishna').then( (response : any) => {
     //   console.log( response );
     // }).catch( error => {
     //     console.log(error);
     // })
}

   doRefresh(refresher) {
          console.log('Begin async operation', refresher);
   this.currentPage = 1;
   // this.textmessage = [];
   // this.showSpinner = true;
   this.getTextmsg();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 1000);
    }
 getTextmsg() {
   try {
     
     this.filters = "";
     this.service.getTextmessage(this.currentPage, this.filters).then( (response : any) => {
       console.log( response )
       this.textmessage = response.data.data;
        this.userslistsearch = response.data.data; 
       this.totalPages = response.data.last_page;
       this.totalRecords = response.data.total;
       console.log(this.totalRecords);
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
   console.log(infiniteScroll.position);
   try {
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       console.log(this.currentPage);
       this.isOnScroll = true;
       if (this.searched == 'yes') {
       console.log("yes");
       this.service.messageFilter(this.currentPage, this.searchTerm).then( (response : any) => {
         console.log( response )
         // this.textmessage = response.data.data;
             var nextTickets = response.data.data;
             nextTickets.forEach((item, index) => {
               this.textmessage.push(item);
             });
             infiniteScroll.complete();
       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
           infiniteScroll.complete();
       })

     }else{
console.log("no");


       this.service.getTextmessage(this.currentPage, this.filters).then( (response : any) => {
         console.log( response )
         // this.textmessage = response.data.data;
             var nextTickets = response.data.data;
             nextTickets.forEach((item, index) => {
               this.textmessage.push(item);
             });
             infiniteScroll.complete();
       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
           infiniteScroll.complete();
       })
     }



    }
   } catch(e) { 
     this.showSpinner = false;
        this.service.serverError();
   }
 }


gotoTextMessage(idd, customer_name, sms_from, customer_avatar){
  console.log(idd);
  console.log(customer_name);
  console.log(sms_from);
  console.log(customer_avatar);

      let textmessagemodal = this.modalCtrl.create(MessageDetailsPage,{
        msgId: idd,
        customerName: customer_name,
        smsFrom: sms_from,
        customerAvatar: customer_avatar,
      });
     textmessagemodal.present();
      textmessagemodal.onDidDismiss(data=>{ 
        if (this.searched == 'no') {
        this.showSpinner = true;
        this.currentPage = 1;
        this.scrollToTop();
        this.getTextmsg();
        }

      })

}
getSearch(){

}



checkMsg(id, fname, lname, phone, num){
  console.log(id);
  console.log(num);
  console.log(fname);
  console.log(lname);
  console.log(phone);
        let formData = new FormData();
         formData.append('user_id', id);
         formData.append('phone_number', num);
         this.service.checkUserhavemsg(formData).then( (response : any) => {
           
           console.log(response);
           this.messagehistory = response.data;
           if (this.messagehistory == '0') {
             this.yesorno = 'yes';
           }else{
             this.yesorno = 'no';
           }
           console.log(this.yesorno);
                 let checkdata: any = {
         checkid: id,
         checknum: num,
         checkfname: fname,
         checklname: lname,
         checkphone: phone,
         checkyesorno: this.yesorno,
       }
       console.log(checkdata);
           this.gotoTextMessagecreate(this.messagehistory, fname+' '+lname, num, '', this.yesorno, id, checkdata );
         } ).catch( error => {
           console.log("error", JSON.stringify(error) );
           this.service.toast(error.error.message, 3000, 'middle');
         } );
}
gotoTextMessagecreate(idd, customer_name, sms_from, customer_avatar, yesorno, uid, checkdata){
  console.log(idd);
  console.log(customer_name);
  console.log(sms_from);
  console.log(customer_avatar);

      let textmessagemodal = this.modalCtrl.create(MessageDetailsPage,{
        msgId: idd,
        customerNamecreate: customer_name,
        smsFromcreate: sms_from,
        customerAvatar: customer_avatar,
        fromcreate: yesorno,
        uid: uid,
        checkdata: checkdata
      });
     textmessagemodal.present();
}

}
