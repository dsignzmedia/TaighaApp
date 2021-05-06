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
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
  selector: 'page-push-tabs',
  templateUrl: 'push-tabs.html'
})
export class PushTabsPage {
  @ViewChild(Nav) nav; Nav;
    @ViewChild('HomesearchTabs') tabRef: Tabs;
      private selectedTab: number;
      userid: any;
        IsStaffCheck: any;
public isHomeSearchMoreMenu: boolean = false;
public isMoreMenu: boolean = false;
    pushOneRoot = SearchPage
    pushThreeRoot = FavoritesPage
    pushFourRoot = FeaturedPage
    pushTwoRoot = SavedPage
    pushFiveRoot = SearchPage
  rootPage:any; 
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public data: {viewCtrl: any};
  public saveddata : any = [];

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
    }
    console.log(this.userid);
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
         console.log("hideforcustomer none");
         $('.hideforCustomerandUser').css('display','none');
      }else{
         console.log("hideforcustomer flex");
         $('.hideforCustomerandUser').css('display','flex');
      }
        }
        console.log(this.IsStaffCheck);
    }); 
  }
   openSideMenu2(){

       this.menuCtrl.enable(true, 'isHomeSearchMoreMenu');
  this.menuCtrl.enable(false, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
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
  this.App.getRootNav().push(TabsPage);
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
