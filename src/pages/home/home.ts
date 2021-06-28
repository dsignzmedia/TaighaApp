import { Component, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, Platform, Content, MenuController, App } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { FilteractivitiesPage } from '../../pages/filteractivities/filteractivities';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { FCM } from '@ionic-native/fcm';

import { Pipe, PipeTransform } from '@angular/core';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { MailviewPage } from '../../pages/mailview/mailview';
import { MailsPage } from '../../pages/mails/mails';
import { PropertiesPage } from '../../pages/properties/properties';
import { NotesPage } from '../../pages/notes/notes';
import { TabsPage } from '../../pages/tabs/tabs';
import { PushTabsPage } from '../../pages/home-search/push-tabs/push-tabs';
import { DocumentviewPage } from '../../pages/documentview/documentview'; 
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate'; 
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { SigninPage } from '../../pages/signin/signin';
import { LeadsPage } from '../../pages/leads/leads';
import { TextMessagePage } from '../../pages/text-message/text-message';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
// import { FroalaEditor } from 'froala-editor';
declare var cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
@Pipe({
  name: 'unique',
  pure: false
})
export class HomePage {
  @ViewChild(Content) content: Content;
 public ishidden:boolean = false;
  public ishiddenLoading:boolean = false;
 public hiddenDropdown:boolean = false;
 public isMoreMenu: boolean = false;
 //hiddenDropdown
  public expandAll:boolean = false;
  public showTaskList:boolean = false;
  public showAcitivity:boolean = false;
  public showContactList:boolean = false;
  public showTicket:boolean = false;
  public showEmail:boolean = false;
  public showProperty:boolean = false;
  public showDocument:boolean = false;

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

	public propertycurrentPage = 1;
	public propertypageLimit = 15;
	public propertytotalPages = 0;
	public propertytotalRecords = 0;
	public propertyshowSpinner : boolean = true;
	public properties : any = [];

	public documentcurrentPage = 1;
	public documentpageLimit = 15;
	public documenttotalPages = 0;
	public documenttotalRecords = 0;
	public documentshowSpinner : boolean = true;
	public documents : any = [];
  
  public name : string = "";

	public contactshowSpinner : boolean = true;
	public contacts : any = [];
	public contacttotalRecords = 0;
  public hasEmailVerified : boolean = false;
  public linksent : boolean = false;
  public verifyName : string = "Resend Email?";

  public storageToken: any;
  IsStaffCheck: any;
  public IsStaff : boolean = false;
  public IsStaffstring : any;
    searchTerm: string = '';
    searchTypee: string = '';
      public searchResult : any = [];
      public searchResultres : any = [];
       public dashboardcount : any = [];

public dashboardEmailscount: any;
public dashboardLeadscount: any;
public dashboardMessagescount: any;
public dashboardNotescount: any;
public dashboardOwnerscount: any;
public dashboardPropertiescount: any;
public dashboardTicketscount: any;
public dashboardActivitiescount: any;
public showSearchIcon : boolean = true;
public showClearIcon : boolean = false;

public checklength: any;

  constructor( private iab: InAppBrowser, public navCtrl: NavController, 
          public navParams: NavParams,
          public modalCtrl: ModalController,
          public service: ServiceProvider,
          public popoverCtrl: PopoverController,
          public events: Events,
          private App: App,
          public platform: Platform,
          public fcm: FCM,
          public storage : StorageProvider,
          public menuCtrl: MenuController) {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(auth_user_token)
        if(auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
      }else{
        this.IsStaff = true;
      }
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
          console.log(this.IsStaffCheck);
    });
    this.searchTypee = '1';
       this.menuCtrl.enable(true, 'isHomeSearchMoreMenu');
  this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(true, 'mainmenumore');
            events.subscribe('user:created', (user, time) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at', time);
             this.name = user.first_name+" "+user.last_name;
  });
  this.ishiddenLoading = false;
  this.ishidden = false;
  }
gototicket(){
    this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
// nav.setRoot(TabsPage, {selectedTab: 5});  
nav.setRoot(PushTabsPage, {selectedTab: 7});  
}
gotoproperties(){
     //  let propertiesmodal = this.modalCtrl.create(PropertiesPage);
     // propertiesmodal.present();

  this.isMoreMenu = false;
 // this.nav.push(MypropertiesPage); 
 // this.tab2Root = MypropertiesPage;
  //  this.App.getRootNav().push(MypropertiesPage);
 //this.nav.push(MypropertiesPage); 
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 8});
}
gotonotes(){
      let notesmodal = this.modalCtrl.create(NotesPage);
     notesmodal.present();
}
gotomails(){
     //  let mailsmodal = this.modalCtrl.create(MailsPage);
     // mailsmodal.present();
       this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 9});
}
gotoActivities(){
         this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 12});
}


gotoTextMessage(){
     //  let textmessagemodal = this.modalCtrl.create(TextMessagePage);
     // textmessagemodal.present();
      let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 6});
}
  togglecreate(){
      this.ishidden = false;
           this.hiddenDropdown = (this.hiddenDropdown) ? false : true;
  }
  bodyClick(){
      this.ishidden = false;
     this.hiddenDropdown = false;
  }
openselect(){
    console.log("testtest");
}
  searchGlobal(){
    console.log("searchGlobal");
    if (this.searchTypee == '1' || this.searchTypee == '2' ) {
      this.searchTypee = 'all';
    }
    console.log(this.searchTerm);
    if (this.searchTerm != '') {
          this.ishiddenLoading = true;
              this.showSearchIcon = true;
    this.showClearIcon = false;
   try {
    this.showSearchIcon = false;
    this.showClearIcon = true;
     this.service.searchByDash(this.searchTypee, this.searchTerm).then( (response : any) => {
       console.log(response);
  this.ishiddenLoading = false;
       this.searchResult = response;
       this.ishidden = true;
       if (this.searchResult.total == '0') {
  this.ishiddenLoading = false;
  this.ishidden = false;
       }
     }).catch( error => {
     })
   } catch(e) {
       this.ishiddenLoading = false;
        this.service.serverError();
    }
    }
  }
  clearsearchGlobal(){
    this.searchTerm = '';
    this.showSearchIcon = true;
    this.showClearIcon = false;
  this.ishiddenLoading = false;
  this.ishidden = false;
  }
  getItems(val){
    console.log(this.searchTypee);
    if (this.searchTypee == '1' || this.searchTypee == '2' ) {
      this.searchTypee = 'all';
    }
    console.log(this.searchTypee);
  console.log(this.searchTerm);
     if (this.searchTerm != '') {
  this.ishiddenLoading = true;
      if (this.searchTerm != '') {
    this.showSearchIcon = false;
    this.showClearIcon = true;
   try {
     this.service.searchByDash(this.searchTypee, this.searchTerm).then( (response : any) => {
       console.log(response);
  this.ishiddenLoading = false;
    this.ishidden = true;
       this.searchResult = response;
       this.searchResultres = response.result;
       console.log(this.searchResultres);

       // ##### remove duplicate value array working
    //        let unique_array = []
    // for(let i = 0;i < this.searchResultres.length; i++){
    //     if(unique_array.indexOf(this.searchResultres[i].userid) == -1){
    //         unique_array.push({userid:this.searchResultres[i].userid, 
    //         email:this.searchResultres[i].email, full_name:this.searchResultres[i].full_name
    //         , phone_number:this.searchResultres[i].phone_number
    //         , user_role_type:this.searchResultres[i].user_role_type
    //       });
    //     } 
    // }
    // console.log(unique_array); 
    // ##### remove duplicate value array working

    var result = this.searchResultres.reduce((unique, o) => {
      // if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
    if(!unique.some(obj => obj.userid === o.userid && obj.email === o.email)) {
      unique.push(o);
    }
    return unique;
    },[]);
    console.log(result);

// function unqarr(data, key){
//   return[
//    new Map(
//         data.map(x => [key(x) ,x])
//      ).values()
//   ]
// }
// console.log(unqarr(unique_array, it => it.userid));
// console.log(JSON.stringify(unqarr(unique_array, it => it.userid)));
// var testarr = JSON.stringify(unqarr(unique_array, it => it.userid));
// var userInfo = JSON.parse(testarr);
// console.log(userInfo);


// ##### remove duplicate value array working
// var obj = {};
// const uniqueArray = unique_array.filter((thing, index) => {
//   const _thing = JSON.stringify(thing);
//   return index === unique_array.findIndex(obj => {
//     return JSON.stringify(obj) === _thing;
//   });
// });
//  console.log(uniqueArray);
// ##### remove duplicate value array working


//     const uniqueTeams = [];

// this.searchResultres.forEach(client => {
//    if(uniqueTeams.indexOf(client.userid) === -1) {
//        uniqueTeams[0].push(client.userid, client.email);
//    }
// });

// console.log(uniqueTeams);
// this.checklength = uniqueTeams.length;
// console.log(this.checklength);
       this.ishidden = true;
       if (this.searchResult.total == '0') {
  this.ishiddenLoading = false;
  this.ishidden = false;
       }
       this.searchTypee = this.searchTypee;
     }).catch( error => {
     })
   } catch(e) {
       this.ishiddenLoading = false;
        this.service.serverError();
    }
      }else{
    this.showSearchIcon = true;
    this.showClearIcon = false;
  this.ishiddenLoading = false;
  this.ishidden = false;
      }
}
  }
search(quantity){
   //           console.log(this.searchTerm);
   //    if(!this.searchTerm) {
   //       // console.log(this.searchTerm);
   //        //Now do stuff
   //        //........
   //        //Stuff is done

   //       //100ms long enough wait to reset boolean.
   //       setTimeout(() => {
   //            console.log(this.searchTerm);
   //      }, 800);
   // }
//     setTimeout(() => {
// // console.log(this.searchTerm);

// //   console.log(event.target.value); 

//   let val = event.target.value;
//   console.log(val);
//        }, 1000);
this.ishiddenLoading = true;
 this.ishidden = false;
   if (this.searchTerm) {
     setTimeout(() => {
  this.ishiddenLoading = true;
  console.log(this.searchTerm);
      if (this.searchTerm != '') {
    this.showSearchIcon = false;
    this.showClearIcon = true;
   try {
     this.service.searchByDash(this.searchTypee, this.searchTerm).then( (response : any) => {
       console.log(response);
  this.ishiddenLoading = false;
       this.searchResult = response;
       this.ishidden = true;
     }).catch( error => {
     })
   } catch(e) {
       this.ishiddenLoading = false;
        this.service.serverError();
    }
      }else{
    this.showSearchIcon = true;
    this.showClearIcon = false;
  this.ishiddenLoading = false;
  this.ishidden = false;
      }
      }, 300);
}


// console.log(event);
// this.ishidden = true;
// this.hiddenDropdown = false;
}

checkBlur(){
    this.ishiddenLoading = false;
  this.ishidden = false;
}
gotoleads(){
      let leadsmodal = this.modalCtrl.create(LeadsPage);
     leadsmodal.present();
}
  ionViewWillEnter() {
     this.service.getFcmToken("Dashboard");
     this.service.watchFcmNotifications();
     this.chechEmailVerified();
  }
  openHomeSearchmenu(){
    this.hiddenDropdown = false;
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
// openInAppBrowser(url){
// const browser = this.iab.create(url,'_blank',this.options);
// <code>browser.executeScript(...); <span style="color: #3366ff;">//use to execute additional script</span>
// browser.insertCSS(...); <span style="color: #3366ff;">//use to execute additional css</span>
// browser.on(<span class="hljs-string">'loadstop'</span>).subscribe(<span class="hljs-function"><span class="hljs-params">event</span> =></span> {
//    browser.insertCSS({ code: <span class="hljs-string">"body{color: red;"</span> });
// });//<span class="hljs-string">loadstop - </span>identify when browser closed</code>
// } 
viewdoc(link){

this.iab.create(link+"?token=dHJhbnomob", "_system", "beforeload=yes");

// Add beforeload event handler which is called before each new URL is loaded into the InAppBrowser Webview
// iabRef.addEventListener('beforeload', function(params, callback){
//     // If the URL being loaded is a PDF
//     if(params.url.match(".pdf")){
//         // Open PDFs in system browser (instead of InAppBrowser)
//         cordova.InAppBrowser.open(params.url, "_system");
//     }else{
//         // Invoke callback to load this URL in InAppBrowser
//         callback(params.url);
//     }
// });
}
  resendVerifyEmail() {
    try {
       this.service.getFcmToken("Verify Email");
       this.verifyName = "Please wait..";
       this.service.resendVerifyEmail().then( (response : any) => {
         console.log(response);
          this.verifyName = "Resend Email?";
          this.linksent = true;
       }).catch( error => {
           console.log(error);
           this.verifyName = "Resend Email?";
       })
     } catch(e) {
          this.verifyName = "Resend Email?";
          this.service.serverError();
      }
  }

  chechEmailVerified() {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
       if(auth_user_token) {
            this.storageToken = auth_user_token;
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
              this.resetAll();
              
            } else {
              this.getProfile();

            }
        }
     });
    
  }

  resetAll() {
    if (this.IsStaffCheck == 0) {
    this.clearAndGetActivities();
    this.clearAndGetTasks();
    this.clearAndGetTickets();
    this.clearAndGetEmails();
    this.clearAndGetProperties();
    this.clearAndGetDocuments();
    this.getContacts();
    }else{
      this.getProfile();
    }
    

  }
  getProfile() {
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
      
         this.name = user.first_name+" "+user.last_name;
         console.log("email_verified_status" + user.email_verified_status);
           if(user.email_verified_status == 1)
           {
             this.storageToken.is_email_verified = 1;
             this.storage.setStorage('auth_user_tokens', this.storageToken);
           }
           if(!this.hasEmailVerified && user.email_verified_status == 1) {
             this.hasEmailVerified = true;
             this.resetAll();
           }  
       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {
       this.getCount();
       this.getEmails();
       this.getActivities();
       this.getTextmsg();
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        this.IsStaffstring = 'no';
        $('.hassmall').css('display','flex');
      }else{
        $('.hassmall').css('display','none');
        this.IsStaff = true;
        this.IsStaffstring = 'yes';
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
        }
        console.log(this.IsStaffCheck);
    });
  }
 getTextmsg() {
   try {
     
     this.service.getTextmessage(1, '').then( (response : any) => {
       console.log( response );
       this.dashboardMessagescount = response.data.total;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }

 }
  getCount() {
    try {
     this.service.dashboardCount().then( (response : any) => {
       console.log( response.data );
       this.dashboardcount = response.data;
       // this.dashboardEmailscount = this.dashboardcount.emails_count;
       this.dashboardLeadscount = this.dashboardcount.leads_count;
    //   this.dashboardMessagescount = this.dashboardcount.messages_count;
       this.dashboardNotescount = this.dashboardcount.notes_count;
       this.dashboardOwnerscount = this.dashboardcount.owners_count;
       this.dashboardPropertiescount = this.dashboardcount.properties_count;
       this.dashboardTicketscount = this.dashboardcount.tickets_count;

     }).catch( error => { 
         console.log(error);
     })
   } catch(e) {
     this.service.serverError();
    }
  } 

  ecAll() {
    if(this.expandAll) {
      this.expandAll = false;
      this.showTaskList = this.showAcitivity = this.showContactList = this.showTicket = this.showEmail = this.showProperty = this.showDocument = false;
    } else {
      this.expandAll = true;
      this.showTaskList = this.showAcitivity = this.showContactList = this.showTicket = this.showEmail = this.showProperty = this.showDocument = true;
    }
  }


  toggleCardLayout(type) {
    if(type == 'tasklist') {
      this.showTaskList = (this.showTaskList) ? false : true;
    }
    if(type == 'activity') {
      this.showAcitivity = (this.showAcitivity) ? false : true;
    }
    if(type == 'contactlist') {
      this.showContactList = (this.showContactList) ? false : true;
    }
    if(type == 'ticket') {
      this.showTicket = (this.showTicket) ? false : true;
    }
    if(type == 'mail') {
      this.showEmail = (this.showEmail) ? false : true;
    }
    if(type == 'property') {
      this.showProperty = (this.showProperty) ? false : true;
    }
    if(type == 'document') {
      this.showDocument = (this.showDocument) ? false : true;
    }
  }

  //Activities Start
  clearAndGetActivities() {
	   this.activitycurrentPage = 1;
	   this.activities = [];
	   this.getActivities();
  }

  getContacts() {
  	this.contacts = [];
  	try {
     this.contactshowSpinner = true;
     this.service.contacts().then( (response : any) => {
       console.log( response )
       this.contacts = response.data;
       this.contactshowSpinner = false;
       this.contacttotalRecords = this.contacts.length;
     }).catch( error => { 
         this.contactshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.contactshowSpinner = false;
     this.service.serverError();
    }
  }

  getActivities() {
   try {
     this.activityshowSpinner = true;
     this.service.activities(this.activitycurrentPage, "").then( (response : any) => {
       console.log( response )
       this.activities = response.data;
       this.activitytotalPages = response.totalPages;
       this.activitytotalRecords = response.totalRecords;
       this.dashboardActivitiescount  = response.totalRecords;
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
        // code...
        break;
    }
  }
 
  loadMoreActivites() {
  	try {
     if(this.activitycurrentPage <= this.activitytotalPages)
     {
       this.activitycurrentPage++;
       this.activityshowSpinner = true;
       this.service.activities(this.activitycurrentPage, "").then( (response : any) => {
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
  //Activities End

  //Tasks Start
  clearAndGetTasks() {
   this.taskcurrentPage = 1;
   this.tasks = [];
   this.getTasks(); 
 }

 getTasks() {
   try {
     this.taskshowSpinner = true;
     this.service.tasks(this.taskcurrentPage, "", 'not_completed').then( (response : any) => {
     	console.log(response);
     	console.log(response.data); 
       this.tasks = response.data;
       
       this.tasktotalPages = response.totalPages;
       this.tasktotalRecords = response.totalRecords;
       this.taskshowSpinner = false;
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
       this.service.tasks(this.taskcurrentPage, "", 'not_completed').then( (response : any) => {
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



 toggleGroupTask(activity) {
      if(activity.sub_activity_checked) {
        activity.sub_activity_checked = false;
      } else {
        activity.sub_activity_checked = true;
      }
  } 

  toggleNotifyTask(activity) {
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

  toggleTileTexts(row) {
   if(row.showmore) {
     row.showmore = false;
     row.showmoretext = "More Info";
   } else {
     row.showmore = true;
     row.showmoretext = "Less Info";
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
 		this.service.tickets(this.ticketcurrentPage, "").then( (response : any) => {
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
	 		this.service.tickets(this.ticketcurrentPage, "").then( (response : any) => {
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

 ticketview(ticketId){
	this.navCtrl.push(TicketviewPage, { ticketId : ticketId }); 
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
     this.service.emails(this.mailcurrentPage, "", 1).then( (response : any) => {
       console.log( response )
       this.emails = response.data;
       this.mailtotalPages = response.totalPages;
       this.dashboardEmailscount = response.totalRecords;
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
       this.service.emails(this.mailcurrentPage, "", 1).then( (response : any) => {
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
 mailsview(email){
    if(email.email_from == 'tickets')
    {
      this.navCtrl.push(TicketviewPage, { ticketId : email.ticket_id }); 
    } else {
      this.navCtrl.push(MailviewPage, { emailId : email.id } );
    }
  }
  //Mails End

  //Properties Start
  clearAndGetProperties() {
   this.propertycurrentPage = 1;
   this.properties = [];
   this.getProperties();
 }

 getProperties() {
   try {
     this.propertyshowSpinner = true;
     this.service.properties(this.propertycurrentPage, "").then( (response : any) => {
       console.log( response )
       this.properties = response.data;
       this.propertytotalPages = response.totalPages;
       this.propertytotalRecords = response.totalRecords;
       this.propertyshowSpinner = false;
     }).catch( error => {
         this.propertyshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.propertyshowSpinner = false;
        this.service.serverError();
    }
 }

 editProperty(property){
   this.navCtrl.push(NewpropertiesPage, { propertyId : property.id}); 
  }

 loadMoreProperties() {
   try {
     if(this.propertycurrentPage <= this.propertytotalPages)
     {
       this.propertyshowSpinner = true;
       this.propertycurrentPage++;
       this.service.properties(this.propertycurrentPage, "").then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.properties.push(item);
            });
           this.propertyshowSpinner = false;
       }).catch( error => {
           this.propertyshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.propertyshowSpinner = false;
     this.service.serverError();
   }
 }
 viewProperties(property){
     this.navCtrl.push(PropertyviewPage, { propertyId : property.id } );    
  }
  //Properties End

  //Documents Start
  clearAndGetDocuments() {
   this.documentcurrentPage = 1;
   this.documents = [];
   this.getDocuments();
 }

 getDocuments() {
   try {
     this.documentshowSpinner = true;
     this.service.documents(this.documentcurrentPage, "").then( (response : any) => {
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
       this.service.documents(this.documentcurrentPage, "").then( (response : any) => {
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

  //Documents End

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
  
  scrollToTop() {
    this.content.scrollToTop();
  }

  doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.resetAll();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
    }

  logout(){
    this.service.getFcmToken("Logout");
    this.service.watchFcmNotifications();
    this.service.clearAuthDatas();
    this.navCtrl.setRoot(SigninPage); 
  }
}
