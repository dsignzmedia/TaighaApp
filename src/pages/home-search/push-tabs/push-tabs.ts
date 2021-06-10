import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, Events, MenuController, App, NavParams, Tabs } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SearchPage } from '../search/search'; 
import { FeaturedPage } from '../featured/featured'; 
import { FavoritesPage } from '../favorites/favorites';
import { SavedPage } from '../saved/saved';
import { SigninPage } from '../../../pages/signin/signin';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';
import { TabsPage } from '../../tabs/tabs';
import { HomePage } from '../../home/home';
import { TextMessagePage } from '../../text-message/text-message';
import { TicketsPage } from '../../tickets/tickets';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MypropertiesPage } from '../../myproperties/myproperties';
import { MailsPage } from '../../mails/mails';
import { TasksPage } from '../../tasks/tasks'; 
import { DocumentsPage } from '../../documents/documents';
import { ActivitiesPage } from '../../activities/activities';


@Component({
  selector: 'page-push-tabs',
  templateUrl: 'push-tabs.html'
})
export class PushTabsPage {
  @ViewChild(Nav) nav; Nav;
    @ViewChild('HomesearchTabs') tabRef: Tabs;
    @ViewChild('HomesearchTabs2') tabRef2: Tabs;
    @ViewChild('HomesearchTabs3') tabRef3: Tabs;
    // @ViewChild('HomesearchTabs2') tabRef2: Tabs;
      public IsStaffstring : any;
      private selectedTab: number;
        public storageToken: any;
          public hasEmailVerified : boolean = false;
      userid: any;
        IsStaffCheck: any;
public isHomeSearchMoreMenu: boolean = false;
public isMoreMenu: boolean = false;
    pushOneRoot = SearchPage
    pushThreeRoot = FavoritesPage
    pushFourRoot = FeaturedPage
    pushTwoRoot = SavedPage
    pushFiveRoot = SearchPage
    pushSixRoot = HomePage
    pushSevenRoot = TextMessagePage
    pushEightRoot = TicketsPage
    pushNineRoot = MypropertiesPage
    pushTenRoot = MailsPage
    push11Root = TasksPage
    push12Root = DocumentsPage
    push13Root = ActivitiesPage
    // pushOneRoot = SearchPage
    // pushThreeRoot = TextMessagePage
    // pushFourRoot = TicketsPage
    // pushTwoRoot = HomePage
  rootPage:any; 
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public data: {viewCtrl: any};
  public saveddata : any = [];
  public IsStaff : boolean = false;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public menuCtrl: MenuController,
    private App: App,
    public modalCtrl: ModalController,
    public events: Events,
    public service: ServiceProvider, 
    public storage : StorageProvider,
    private navParams: NavParams) {
        //          $('.MenuForCustomer').css('display','none');
        // $('.MenuForStaff').css('display','none');
        // $('.MenuForGuest').css('display','block');
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(auth_user_token)
        if(auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        $('.hometabs').css('display','none');
        $('.hometabsCust').css('display','block');
        $('.hometabsGuest').css('display','none');
      }else{
        $('.hometabs').css('display','block');
        $('.hometabsCust').css('display','none');
        $('.hometabsGuest').css('display','none');
        this.IsStaff = true;
      }
        }
          console.log(this.IsStaffCheck);
    });
     //     try {
     //   let urlPara: any = {
     //     searchTearm: 'test'
     //   }
     //   this.service.getsavedsearch(urlPara).then( (response : any) => {
     //     console.log(response);
     //      this.saveddata = response;      
     //   }).catch( error => {
     //   })
     // } catch(e) {
     //   this.service.serverError();
     // }
      this.data = {
        viewCtrl: this.viewCtrl
      }
        this.selectedTab = this.navParams.get('selectedTab') || 0;
        console.log(this.selectedTab);
    } 

     ionViewWillEnter() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
       }).catch( error => {
         this.userid = '0';
           console.log(error);
       })
    if(this.selectedTab) {
      this.tabRef.select(this.selectedTab);
      this.tabRef2.select(this.selectedTab);
      // this.tabRef3.select(this.selectedTab);
    }
    console.log(this.userid);
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
         console.log("hideforcustomer none");
         $('.hideforCustomerandUser').css('display','none');

                 $('.MenuForCustomer').css('display','block');
        $('.MenuForStaff').css('display','none');
        $('.MenuForGuest').css('display','none');
      }else{
         console.log("hideforcustomer flex");
         $('.hideforCustomerandUser').css('display','flex');

        $('.MenuForCustomer').css('display','none');
        $('.MenuForStaff').css('display','block');
        $('.MenuForGuest').css('display','none');
      }
        }
        console.log(this.IsStaffCheck);
    }); 
  }
   openSideMenu2(){
console.log(this.IsStaffCheck);
       this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
  this.menuCtrl.enable(false, 'homesearchMenu');
    this.menuCtrl.enable(true, 'mainmenumore');
    //      this.isHomeSearchMoreMenu = true;
    //      this.isMoreMenu = false;
    // // this.events.publish('moretabs:invoked');
     this.menuCtrl.toggle()
}
gosignin(){
    let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 

})
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

            $(".ion-ios-tickets").parent().removeClass("inactive");
    $(".ion-md-tickets").parent().removeClass("inactive");
    $(".ion-ios-homedashboard").parent().removeClass("inactive");
    $(".ion-md-homedashboard").parent().removeClass("inactive");
    $(".ion-ios-sms").parent().removeClass("inactive");
    $(".ion-md-sms").parent().removeClass("inactive");
  

    $(".ion-ios-iconmoreblack-outline").css("background-image", "url(../assets/imgs/grey-more.svg)");
    $(".ion-md-iconmoreblack").css("background-image", "url(../assets/imgs/grey-more.svg)");
        $(".ion-ios-iconmore-outline").css("background-image", "url(../assets/imgs/grey-more.svg)");
    $(".ion-md-iconmore").css("background-image", "url(../assets/imgs/grey-more.svg)");

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
    // this.currentActiveTab = "";
  }
GuestUser():void {  
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
     // this.nav.push(PushTabsPage); 
       this.App.getRootNav().push(PushTabsPage,{selectedTab: 0},{animate:false});
  })
     // this.nav.setRoot(SigninPage, {asmodal : 'yes'});    

}
// goFavorites(){
//   console.log("whatttt");

//   // this.nav.push(PushTabsPage);
// }
hidemore(){
    $(".ion-ios-search").parent().removeClass("inactive");
    $(".ion-md-search").parent().removeClass("inactive");
    $(".ion-ios-saved-outline").parent().removeClass("inactive");
    $(".ion-md-saved-outline").parent().removeClass("inactive");
    $(".ion-ios-favorites").parent().removeClass("inactive");
    $(".ion-md-favorites").parent().removeClass("inactive");

    $(".ion-ios-favorites").parent().removeClass("inactive");
    $(".ion-md-favorites").parent().removeClass("inactive");

        $(".ion-ios-tickets").parent().removeClass("inactive");
    $(".ion-md-tickets").parent().removeClass("inactive");
    $(".ion-ios-homedashboard").parent().removeClass("inactive");
    $(".ion-md-homedashboard").parent().removeClass("inactive");
    $(".ion-ios-sms").parent().removeClass("inactive");
    $(".ion-md-sms").parent().removeClass("inactive");
  
    $(".ion-ios-iconmoreblack-outline").css("background-image", "");
    $(".ion-md-iconmoreblack").css("background-image", "");

    $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "400"); 
    $(".ion-ios-iconmoreblack-outline").next().css("color", "#989898");
    $(".ion-md-iconmoreblack").next().css("font-weight", "400"); 
    $(".ion-md-iconmoreblack").next().css("color", "#989898"); 
}


goDashboard(){
    $(".ion-ios-iconmoreblack-outline").css("background-image", "");
    $(".ion-md-iconmoreblack").css("background-image", "");

    $(".ion-ios-iconmoreblack-outline").next().css("font-weight", "400"); 
    $(".ion-ios-iconmoreblack-outline").next().css("color", "#989898");
    $(".ion-md-iconmoreblack").next().css("font-weight", "400"); 
    $(".ion-md-iconmoreblack").next().css("color", "#989898"); 
  console.log('test');
       this.service.profile().then( (response : any) => {
         console.log(response);

         if (response) {
                    var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
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
this.storage.removeStorage('fromsavedsearch');
    this.isMoreMenu = true;
 // this.nav.setRoot(TabsPage);
  this.App.getRootNav().push(TabsPage,{},{animate:false});
         }else{
             $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
  let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    try {
       this.service.profile().then( (response : any) => {
         console.log(response);

                  if (response) {
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
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
//          $('.removeit').css('display','block');
//          $( "<span>Sign Out</span>" ).replaceAll( ".chgnm span" );
// document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
 
       }).catch( error => {
           console.log(error);
//            $('.removeit').css('display','none');
//            $( "<span>Sign In</span>" ).replaceAll( ".chgnm span" );
// document.getElementById('dynamicprofile').innerHTML ="";
       })
     } catch(e) {
          this.service.serverError();
      }
})
         }
         // this.userid = response.data.id;
         // console.log(this.userid);

       }).catch( error => {

         // this.userid = '0';
         //   console.log(error);
       })
//     if (this.userid == 0) {
//   let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
//   getsigninModal.present();
//   getsigninModal.onDidDismiss(data=>{ 

// })
//     }else{
// this.storage.removeStorage('fromsavedsearch');
//     this.isMoreMenu = true;
//  // this.nav.setRoot(TabsPage);
//   this.App.getRootNav().push(TabsPage);
//     }


}
  //     pushFiveRoot() {
  //   this.isMoreMenu = true;
  //  this.rootPage = TabsPage;
  //    this.nav.push(TabsPage);  
  // }
// pushFiveRoot(){
//     this.isMoreMenu = true;
//  this.nav.push(TabsPage);   
// }
}
