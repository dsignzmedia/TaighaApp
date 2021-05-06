import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController, App  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ServiceProvider } from '../providers/service/service';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { TicketviewPage } from '../pages/ticketview/ticketview';
import { TicketsPage } from '../pages/tickets/tickets';
import { MailviewPage } from '../pages/mailview/mailview';
import { DocumentviewPage } from '../pages/documentview/documentview';
import { HomePage } from '../pages/home/home';
import { TextMessagePage } from '../pages/text-message/text-message';
// import { HomeSearchPage } from '../pages/home-search/home-search'; 
// import { CardViewPage } from '../pages/home-search/card-view/card-view'; 
import { TenantsPage } from '../pages/home-search/tenants/tenants';
import { WhatwedoPage } from '../pages/home-search/whatwedo/whatwedo';
import { BuyersPage } from '../pages/home-search/buyers/buyers';
import { ForrentPage } from '../pages/home-search/forrent/forrent';
import { InvestorsPage } from '../pages/home-search/investors/investors';
import { OwnersPage } from '../pages/home-search/owners/owners';


import { SellersPage } from '../pages/home-search/sellers/sellers'; 
import { PushTabsPage } from '../pages/home-search/push-tabs/push-tabs';
import { AboutUsPage } from '../pages/home-search/about-us/about-us'; 
import { PropertyDetailPage } from '../pages/home-search/property-detail/property-detail';
import { MypropertiesPage } from '../pages/myproperties/myproperties';


import { PropertyviewPage } from '../pages/propertyview/propertyview';
import { NewdocumentupdatePage } from '../pages/newdocumentupdate/newdocumentupdate';
import { PostMessagePage } from '../pages/post-message/post-message';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsServicePage } from '../pages/terms-service/terms-service';
import { ContactusPage } from '../pages/contactus/contactus';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { FCM } from '@ionic-native/fcm';
// import { FroalaEditor } from 'froala-editor';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav; Nav;
tab2Root:any ; 

public isMoreMenu: boolean = false;
public isHomeSearchMoreMenu: boolean = false;
public currentActiveTab: any ;
public storedTokens : any = "";

  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public useridd : string = "";
  public userid : string = "";
  public storageToken: any;
    public hasEmailVerified : boolean = false;

  IsStaffCheck: any;
  public IsStaff : boolean = false;
  public IsStaffstring : any;
  rootPage:any;                
  constructor(
    public platform: Platform, 
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public service : ServiceProvider,
              public fcm: FCM,
              public events: Events,
              public storage: StorageProvider,
              private App: App) {
    console.log("testetstetset");
      this.initializeApp();
        events.subscribe('user:created', (user, time) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at', time);
             this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
  });
      this.service.getFcmToken("Initialize");
      events.subscribe('fcminvoked:invoked', (data) => {
          console.log('fcminvoked:invoked');
          if(data.title) {
            this.redirectToFcm(data);
          }
      });

      events.subscribe('moretabs:invoked', (data) => {
          console.log('moretabs:invoked');
          this.isMoreMenu = true;
      });
        this.storage.getStorage('storageprofile').then((val) => {
 console.log(val);
          });
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         console.log("email_verified_status" + user.email_verified_status);
           if(user.email_verified_status == 1)
           {
             this.storageToken.is_email_verified = 1;
             this.storage.setStorage('auth_user_tokens', this.storageToken);
           }
           if(!this.hasEmailVerified && user.email_verified_status == 1) {
             this.hasEmailVerified = true;
             // this.resetAll();
           }  
       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
  }
  ngOnInit () {
// new FroalaEditor();

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
// })
// }
ionmenu(){
// $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/grey-more.svg)");
//      $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/grey-more.svg)");
}

    ionViewWillEnter() {
     // this.service.getFcmToken("Dashboard");
     // this.service.watchFcmNotifications();
     // this.chechEmailVerified();
                  this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log("ionViewWillEnter hideforcustomer");
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaffstring = 'no';
        // hideforcustomer
        console.log("hideforcustomer none");
        $('.hideforCustomerandUser').css('display','none');
        // tab-t1-4
        $('#tab-t3-4').css('display','none');
      }else{
        console.log("hideforcustomer flex");
        $('.hideforCustomerandUser').css('display','flex');
        this.IsStaff = true;
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
  chechEmailVerified() {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
       if(auth_user_token) {
            this.storageToken = auth_user_token;
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
              
            } else {
              this.getProfile();
            }
        }
     });
  }
  getProfile() {
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.useridd = user.id;
         this.userid = user.id;
         console.log("email_verified_status" + user.email_verified_status);
           if(user.email_verified_status == 1)
           {
             this.storageToken.is_email_verified = 1;
             this.storage.setStorage('auth_user_tokens', this.storageToken);
           }
           if(!this.hasEmailVerified && user.email_verified_status == 1) {
             this.hasEmailVerified = true;
             // this.resetAll();
           }  
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
  }
  redirectToFcm(data) {
          if(data.notify_type == 'ticket') {
            this.nav.push(TicketviewPage, { ticketId : data.notify_id });
          }
          if(data.notify_type == 'email') {
            this.nav.push(MailviewPage, { emailId : data.notify_id });
          }
          if(data.notify_type == 'properties') {
            this.nav.push(PropertyviewPage, { propertyId : data.notify_id });
          }
          if(data.notify_type == 'documents') {
            this.nav.push(DocumentviewPage, { documentId : data.notify_id });
          }
          if(data.notify_type == 'verified') {
            this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
                 auth_user_token.is_email_verified = 1;
                 this.storage.setStorage('auth_user_tokens', auth_user_token).then( ( res : any) =>  {
                    this.nav.push(PushTabsPage);
                });
            });
          }
          
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.styleDefault();
      //this.statusBar.hide();
      this.splashScreen.hide(); 
      if (this.platform.is('cordova')) {
        this.storage.getStorage('auth_user_tokens').then( (token : any) => {
              if(token != '' && token != null && token != undefined) {
                 //this.rootPage = TabsPage
                 this.storedTokens = token;
                 this.rootPage = PushTabsPage;
                 this.fcm.onNotification().subscribe(data=>{
                    console.log(JSON.stringify(data));
                    if(data.wasTapped){
                        this.redirectToFcm(data);
                    }
                });             
              } else {
                 this.rootPage = PushTabsPage; // SigninPage  PushTabsPage
              }
              
          }).catch( error => {
              this.rootPage = PushTabsPage; // SigninPage  PushTabsPage
          });
      } else {
        this.dynamicRedirect(PushTabsPage);
      }
        
    });

  }

  dynamicRedirect(page) {
    this.storage.getStorage('auth_user_tokens').then( (token : any) => {
            if(token != '' && token != null && token != undefined) {
                 //this.rootPage = TabsPage 
                 // this.rootPage = page  

     // if(token) {
     //  this.IsStaffCheck = token.is_staff;
     //  if (this.IsStaffCheck == 0) {
     //    this.IsStaff = false;
     //    this.rootPage = PushTabsPage;
     //  }else{
     //    this.IsStaff = true;
     //    this.rootPage = TabsPage;
     //  }
     //    }
                this.rootPage = PushTabsPage;    // 07 PushTabsPage
                                  
              } else {
                this.rootPage = PushTabsPage; // SigninPage  PushTabsPage   // 07 PushTabsPage
              }
        }).catch( error => {
              this.rootPage = PushTabsPage // SigninPage  PushTabsPage   // 07 PushTabsPage
          });
  }
  menuClosed() {
    console.log('closed');
    this.isMoreMenu = false;
    this.currentActiveTab = "";
  }
  rightsidemenuopen(){
    console.log("open");
    $(".ion-ios-search").parent().addClass("inactive");
    $(".ion-md-search").parent().addClass("inactive");
    $(".ion-ios-saved-outline").parent().addClass("inactive");
    $(".ion-md-saved-outline").parent().addClass("inactive");
    $(".ion-ios-favorites").parent().addClass("inactive");
    $(".ion-md-favorites").parent().addClass("inactive");

    $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/blue-more-full.svg)");
    $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/blue-more-full.svg)");

    $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "600"); 
    $(".ion-ios-iconmoreblack-outline").next().css("color", "#3366CC");
    $(".ion-md-iconmoreblack").next().css("font-weight", "600"); 
    $(".ion-md-iconmoreblack").next().css("color", "#3366CC");  
    }
  rightmenuClosed() {
    console.log("close");
    // if ($( "page-featured" ).hasClass( "show-page" )) {

    // }else{
    $(".ion-ios-search").parent().removeClass("inactive");
    $(".ion-md-search").parent().removeClass("inactive");
    $(".ion-ios-saved-outline").parent().removeClass("inactive");
    $(".ion-md-saved-outline").parent().removeClass("inactive");
    $(".ion-ios-favorites").parent().removeClass("inactive");
    $(".ion-md-favorites").parent().removeClass("inactive");

    $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/grey-more.svg)");
    $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/grey-more.svg)");

    $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "400");
    $(".ion-ios-iconmoreblack-outline").next().css("color", "#989898");
    $(".ion-md-iconmoreblack").next().css("font-weight", "400");
    $(".ion-md-iconmoreblack").next().css("color", "#989898");
    // }
//      .homesearch-tabs.tabs .tabbar .tab-button[aria-selected=true] span {
//     color: #3366CC;
//     font-weight: 600;
//     text-decoration: none;
//     padding: 2px 5px;
//     border-radius: 2px;
// }
    console.log('closed');
    this.isMoreMenu = false;
    this.currentActiveTab = "";
  }
  openPage(pageName: any) {
    //this.tabsPageRef.tabRef.select(pageName);
    console.log(pageName);
    this.nav.getActiveChildNav().select(pageName);
    this.currentActiveTab = pageName;
  }
  openPageMails():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 8});
}
openPageTasks():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 7});
}
openPageDocuments():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 6});
}
openPageMessage():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 4});
 // this.nav.setRoot(TextMessagePage);
}
goToActivities():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 2});
}
goToTickets():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 5});
}


goToProfile():void {     
     this.nav.setRoot(ProfilePage);      
}
goToHomeSearch():void {  
this.nav.push(PushTabsPage);  

     // this.nav.setRoot(CardViewPage);      
}
login():void {     
     this.service.getFcmToken("Logout");
     this.service.watchFcmNotifications();
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
          this.rightmenuClosed();
                  var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
         if (response) {
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         console.log("email_verified_status" + user.email_verified_status);
             this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log("ionViewWillEnter hideforcustomer");
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaffstring = 'no';
        // hideforcustomer
        console.log("hideforcustomer none");
        $('.hideforCustomerandUser').css('display','none');
      }else{
        console.log("hideforcustomer flex");
        $('.hideforCustomerandUser').css('display','flex');
        this.IsStaff = true;
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
        }
        console.log(this.IsStaffCheck);
    }); 
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
             this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log("ionViewWillEnter hideforcustomer");
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaffstring = 'no';
        // hideforcustomer
        console.log("hideforcustomer none");
        $('.hideforCustomerandUser').css('display','none');
      }else{
        console.log("hideforcustomer flex");
        $('.hideforCustomerandUser').css('display','flex');
        this.IsStaff = true;
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

           if(user.email_verified_status == 1)
           {
             this.storageToken.is_email_verified = 1;
             this.storage.setStorage('auth_user_tokens', this.storageToken);
           }
           if(!this.hasEmailVerified && user.email_verified_status == 1) {
             this.hasEmailVerified = true;
           }  
       }).catch( error => {
           console.log(error);

       })
     } catch(e) {
          this.service.serverError();
      }
      this.nav.push(PushTabsPage); 
  })
     // this.nav.setRoot(SigninPage, {asmodal : 'yes'});    
}
logout():void { 
             $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
     this.service.getFcmToken("Logout");
     this.service.watchFcmNotifications();
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
                  if (response) {
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         console.log("email_verified_status" + user.email_verified_status);
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
           if(user.email_verified_status == 1)
           {
             this.storageToken.is_email_verified = 1;
             this.storage.setStorage('auth_user_tokens', this.storageToken);
           }
           if(!this.hasEmailVerified && user.email_verified_status == 1) {
             this.hasEmailVerified = true;
           }  
       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
      this.nav.push(PushTabsPage); 
  })    
     // this.service.getFcmToken("Logout");
     // this.service.watchFcmNotifications();
  // let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  // getsigninModal.present();
  // getsigninModal.onDidDismiss(data=>{ 
  // })
     // this.nav.setRoot(SigninPage);    
}
goToPostMessage():void {     
     this.nav.setRoot(PostMessagePage);    
}
goToPrivacyPolicy():void { 
  let getPrivacyPolicyModal = this.modalCtrl.create(PrivacyPolicyPage, {asmodal : 'yes'});
  getPrivacyPolicyModal.present();
  getPrivacyPolicyModal.onDidDismiss(data=>{    
    console.log('back privacy');
  })   
  //   this.nav.setRoot(PrivacyPolicyPage);    
}
goToTermsService():void {   
  let getTermsServiceModal = this.modalCtrl.create(TermsServicePage, {asmodal : 'yes'});
  getTermsServiceModal.present();
  getTermsServiceModal.onDidDismiss(data=>{    
    console.log('back privacy');
  })     
   //  this.nav.setRoot(TermsServicePage);    
}
goTocontact():void {    
  let getContactusPageModal = this.modalCtrl.create(ContactusPage, {asmodal : 'yes'});
  getContactusPageModal.present();
  getContactusPageModal.onDidDismiss(data=>{    
    console.log('back privacy');
  })  
   // this.nav.setRoot(ContactusPage);    
}
goToDashboard(){
  this.isMoreMenu = true;
 this.nav.push(TabsPage);  

    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        this.IsStaffstring = 'no';
        $('.hassmall').css('display','flex');
        // hideforcustomer
        $('.hideforcustomer').css('display','none');
      }else{
        $('.hassmall').css('display','none');
        $('.hideforcustomer').css('display','flex');
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
goToSellers(){
//  this.isMoreMenu = true;
 // this.nav.push(SellersPage)

try {
   this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
 var win = this.iab.create("https://toptechrealty.com/sell-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
win.executeScript({ code: "(function() { var body = document.querySelector('body');var div = document.createElement(body);div.classList.add('inappbrowser');body.appendChild(div); })();" });
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
 var win = this.iab.create("https://toptechrealty.com/sell-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
win.executeScript({ code: "(function() { var body = document.querySelector('body');var div = document.createElement(body);div.classList.add('inappbrowser');body.appendChild(div); })();" });
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
}
goToBuyers(){
 // this.nav.push(BuyersPage);  
try {
   this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/buy-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/buy-homes-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
// this.iab.create("https://toptechrealty.com/buy-homes-in-portland", "_self");
}
goToInvestors(){
//   this.nav.push(InvestorsPage);  
try {
   this.service.profile().then( (response : any) => {

         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/property-investment-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/property-investment-in-portland/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
//this.iab.create("https://toptechrealty.com/property-investment-in-portland", "_self");

}
goToForrent(){
 //  this.nav.push(ForrentPage);  
try {
   this.service.profile().then( (response : any) => {

         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/for-rent/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/for-rent/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
// this.iab.create("https://toptechrealty.com/for-rent", "_self");

}
goToWhatwedo(){
  // this.nav.push(WhatwedoPage); 
try {
   this.service.profile().then( (response : any) => {

         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/what-we-do/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/what-we-do/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
//  this.iab.create("https://toptechrealty.com/what-we-do", "_self"); 

}
goToOwners(){
 //  this.nav.push(OwnersPage); 
try {
   this.service.profile().then( (response : any) => {

         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/owners/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/owners/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
 //this.iab.create("https://toptechrealty.com/owners", "_self"); 

}
goToAppfolio(){
  // https://toptechrealty.appfolio.com/oportal/
   this.iab.create("https://toptechrealty.appfolio.com/oportal/", "_system");
}
goToTenants(){
 //  this.nav.push(TenantsPage);  

 this.iab.create("https://toptechrealty.appfolio.com/connect", "_system");

}

goToProperties():void {
  this.isMoreMenu = false;
 // this.nav.push(MypropertiesPage); 
 // this.tab2Root = MypropertiesPage;
  //  this.App.getRootNav().push(MypropertiesPage);
 //this.nav.push(MypropertiesPage); 
 let nav = this.App.getRootNav(); 
nav.setRoot(TabsPage, {selectedTab: 3});
}
goToFeatured():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 4});
}
goToSaved():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 1});
}
goToFavorites():void {
  this.isMoreMenu = false;
 let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 2});
}

goToAboutUs():void {  
// this.isMoreMenu = true;   
 //https://toptechrealty.com/who-we-are
 //    this.nav.push(AboutUsPage);
try {
   this.service.profile().then( (response : any) => {

         if (response == undefined) {
           this.userid = '';
     this.iab.create("https://toptechrealty.com/who-we-are/?inapp=true&auth_id="+this.useridd, "_self");
         }else{
     var user = response.data;
     this.name = user.first_name+" "+user.last_name;
     this.useridd = user.id;
     this.iab.create("https://toptechrealty.com/who-we-are/?inapp=true&auth_id="+this.useridd, "_self");
         }

   }).catch( error => {
       console.log(error);
   })
 } catch(e) {
      this.service.serverError();
}
 //    this.iab.create("https://toptechrealty.com/who-we-are", "_self");      
}

}
