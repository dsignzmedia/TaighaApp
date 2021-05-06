import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, AlertController, Platform, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FilterticketsPage } from '../../pages/filtertickets/filtertickets';
import { NewticketsPage } from '../../pages/newtickets/newtickets';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

import { StorageProvider } from '../../providers/storage/storage';
import { FCM } from '@ionic-native/fcm';
// import { FroalaEditor } from 'froala-editor';

/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
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
export class TicketsPage {

 public showSearch : boolean = false;
 public currentPage = 1;
 public pageLimit = 15;
 public totalPages = 0;
 public totalRecords = 0;
 public showSpinner : boolean = true;
 public showNoRecords: boolean = false;
  public showSpinnertop : boolean = false;
 public tickets : any = [];
 public isOnScroll: boolean = false;
 public showBottomInfo: boolean = false;
 show:boolean = false;
 public text: string = 'More Info';
 public filters: any = "";
 public filtersCopy: any = "";
 public isFilterApplied: boolean = false;
 public selectedFilters: any = { subject : "", group : [], staffs : [], status : ["open", "in_process", "completed"], priorities : [], updated_by : [], updated_at : '' };

 constructor(	private iab: InAppBrowser, public navCtrl: NavController, 
 	public navParams: NavParams,
 	public modalCtrl: ModalController,
 	public popoverCtrl: PopoverController,
  public events: Events,
  public platform: Platform,
  public fcm: FCM,
  private alertCtrl: AlertController,
  public storage: StorageProvider,
 	public service: ServiceProvider,
   public menuCtrl: MenuController) {
 	console.log("Tickets Pages");

   events.subscribe('ticketsfilter:invoked', () => {
       console.log('ticketsfilter:invoked');
       this.storage.getStorage('appliedTicketFilters').then( ticketfilter => {
         console.log(ticketfilter);
         this.filters = ticketfilter;
         this.filtersCopy = ticketfilter;
         this.clearAndGetTickets();
       });
   });

 }
 protected resetChanges = () => {
    this.filters = this.filtersCopy;
};
searchtag(){
  this.showSpinnertop = true;
  this.showSpinner = false;
console.log(this.selectedFilters);
this.filters = this.selectedFilters;
if (this.showSearch) {
  $('.list-card').css('margin-top', '44px');
}else{
   $('.list-card').css('margin-top', '0px');
}
this.currentPage = 1;
this.getTickets();
  this.showSpinner = false;
}
// froalaeditor(i) {
// // this.editmode = !this.editmode;
// var editor = new FroalaEditor('div#froala-editor' , {
// key: "Your key",
// toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertTable', 'fontSize', 'color',
// 'align', 'selectAll', 'save',
// 'insertVideo', 'undo', 'redo'
// ],
// theme: 'dark',
// placeholderText: '',
// quickInsertTags: null,
// attribution: false,
// charCounterCount: false,
// initOnClick: false,
// events: {
// initialized: function () {
// var editor = this;
// editor.events.focus(true);
// editor.events.bindClick(editor.$('body'), 'a#btn-destroy' + `${i}${a}${b}`, function () {
// editor.destroy();
// })
// document.querySelector('a#saveButton' ).addEventListener("click", function () {
// editor.save.save();
// })
// },
// blur: () => {
// editor.destroy();
// }
// }
// })}
 public changeText(): void {
      if(this.text === 'More Info') { 
        this.text = 'Less Info'
      } else {
        this.text = 'More Info'
      }
    }
    ionViewDidLoad() {
   console.log('ionViewDidLoad TicketsPage');
       this.showSearch = false;
    
     this.storage.getStorage('appliedTicketFilters').then( ticketfilter => {
         this.filters = ticketfilter;
         this.filtersCopy = ticketfilter;
         if (!ticketfilter) {
           this.filters = this.selectedFilters;
         }
         this.clearAndGetTickets();
         this.service.getFcmToken("Tickets");
         this.service.watchFcmNotifications();
     });
 }
 toggleCard() {
this.showSearch = (this.showSearch) ? false : true;
if (this.showSearch) {
  $('.list-card').css('margin-top', '44px');
}else{
   $('.list-card').css('margin-top', '0px');
}

}
openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
viewdoc(link){
this.iab.create(link+"?token=dHJhbnomob", "_system", "beforeload=yes");
}
 ionViewWillEnter() {
    console.log('ionViewWillEnter TicketsPage');
    console.log(this.showSearch);
    if (this.showSearch) {
  $('.list-card').css('margin-top', '0px');
}
    // this.showSearch = false;
    
    //  this.storage.getStorage('appliedTicketFilters').then( ticketfilter => {
    //      this.filters = ticketfilter;
    //      this.filtersCopy = ticketfilter;
    //      if (!ticketfilter) {
    //        this.filters = this.selectedFilters;
    //      }
    //      this.clearAndGetTickets();
    //      this.service.getFcmToken("Tickets");
    //      this.service.watchFcmNotifications();
    //  });
  }
 
 checkIsFilterApplied() {
   this.isFilterApplied = false;
   this.storage.getStorage('appliedTicketFilters').then( ticketfilter => {
     console.log("ticketfilter", ticketfilter);
     if(ticketfilter) {
       this.isFilterApplied = true;
      }
               if (!ticketfilter) {
           this.filters = this.selectedFilters;
         }
    });
 }

 clearAndGetTickets() {
 	this.currentPage = 1;
 	this.tickets = [];
 	this.getTickets();
  this.checkIsFilterApplied();
 }

 resetFilter() {
   this.storage.removeStorage('appliedTicketFilters');
   this.filters = "";
   this.clearAndGetTickets();
 }

 getTickets() {
 	try {
 		this.showSpinner = true;
     console.log(this.filters);
   //  this.currentPage = 7;
 		this.service.tickets(this.currentPage, this.filters).then( (response : any) => {
	   	console.log( response )
	   	this.tickets = response.data;
       this.showNoRecords = false;
       if (this.tickets.length == 0) {
         this.showNoRecords = true;
       }
	   	this.totalPages = response.totalPages;
	   	this.totalRecords = response.totalRecords;
	   	this.showSpinner = false;
       this.showSpinnertop = false;
	   }).catch( error => {
       this.showNoRecords = false;
	   		this.showSpinner = false;
         this.showSpinnertop = false;
	   		console.log(error);
	   })
 	} catch(e) {
     this.showNoRecords = false;
 		this.showSpinner = false;
     this.showSpinnertop = false;
        this.service.serverError();
    }

 }

 doInfinite(infiniteScroll) {
 	try {
 		if(this.currentPage <= this.totalPages)
 		{
	 		this.currentPage++;
	 		this.isOnScroll = true;
	 		this.service.tickets(this.currentPage, this.filters).then( (response : any) => {
		   	console.log( response )
		   	var nextTickets = response.data;
		       nextTickets.forEach((item, index) => {
		            //console.log(item); // 9, 2, 5
		            this.tickets.push(item);
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
          this.clearAndGetTickets();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          if (this.showSearch) {
            $('.list-card').css('margin-top', '44px');
          }else{
             $('.list-card').css('margin-top', '0px');
          }
          }, 2000);
  }
openfilterModal(characterNum) {
    let opts: any = {
     cssClass: 'filterModal',
    }
    this.storage.removeStorage('activitycalanderapplied');
    let filtermodal = this.modalCtrl.create(FilterticketsPage, characterNum, opts);
     filtermodal.present();
}
createnewTickets(){
// this.navCtrl.push(NewticketsPage); 
    let newticketmodal = this.modalCtrl.create(NewticketsPage);
     newticketmodal.present();
}
ticketview(ticketId, ticketsub){
this.navCtrl.push(TicketviewPage, { ticketId : ticketId, ticketsub : ticketsub }); 
}
openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverpagePage, {}, {cssClass: 'customPopover'});   
    popover.present({
      ev: myEvent
    });
  }
 menuState:string = 'out';

 toggleTileTexts(row) {
   if(row.showmore) {
     row.showmore = false;
     row.showmoretext = "More Info";
   } else {
     row.showmore = true;
     row.showmoretext = "Less Info";
   }
 }

openBottom(){
  //this.show = true;

   // if(this.showBottomInfo) {
   //      this.showBottomInfo = false;
   //    } else {
   //      this.showBottomInfo = true;
   //    }

      //this.showBottomInfo = !this.showBottomInfo;
      //this.show ? 'Toggle!' : 'some text';
      //this.menuState = this.menuState === 'out' ? 'in' : 'out';
}
}
