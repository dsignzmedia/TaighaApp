import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, Events, App } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { ActivitiesPage } from '../../pages/activities/activities';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../../pages/tabs/tabs';
import { PushTabsPage } from '../../pages/home-search/push-tabs/push-tabs';
import { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { StartNowPage } from '../home-search/start-now/start-now';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
declare var cordova:any; // global

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
 passwordType: string = 'password';
 passwordText= 'Show Password';
   IsStaffCheck: any;
  public IsStaff : boolean = false;
  private login : FormGroup;
  public isMoreMenu: boolean = false;
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public storageToken: any;
  public asmodal: string = "no";
  public FromLogout: string = "no";
  public platformname : string = "";
      public hasEmailVerified : boolean = false;
    public setprofileDetail: any = { first_name : "", last_name:"", email: "", avatar: "",};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform, 
              private fb: Facebook,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public service: ServiceProvider,
              public formBuilder : FormBuilder, 
              public events: Events,
              private googlePlus: GooglePlus,
              public storage : StorageProvider,
              private App: App) {
 if (this.platform.is('ios')) {
    this.platformname = "ios";
   }
if (this.navParams.get('asmodal')) {
  this.asmodal = this.navParams.get('asmodal');
  console.log(this.asmodal);
}
if (this.navParams.get('FromLogout')) {
  this.FromLogout = this.navParams.get('FromLogout');
  console.log(this.FromLogout);
}
    this.login = this.formBuilder.group ( {
          email: ['', Validators.compose([Validators.required, Validators.email]) ],
          password: ['', Validators.required ],
        })

  }
  dismissModalx() {
    this.viewCtrl.dismiss({

  })
       let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 0});
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav(); 
// nav.setRoot(PushTabsPage, {selectedTab: 5});

}

deleteModal(){
        this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(auth_user_token)
        if(auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
       let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 0});
      }else{
       let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 5});
      }
        }
        if (this.IsStaffCheck == undefined) {
        $('.hometabs').css('display','none');
        $('.hometabsCust').css('display','none');
        $('.hometabsGuest').css('display','block');
        }
          console.log(this.IsStaffCheck);
        $("page-push-tabs").removeAttr("hidden");
        $('page-signin').css('display','none');
    }); 
}

dismissModal() {
  // $('page-push-tabs').css('display','block !important');
  if (this.FromLogout == 'yes') {
       let nav = this.App.getRootNav(); 
nav.setRoot(PushTabsPage, {selectedTab: 0});
  }else{
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
        if (this.IsStaffCheck == undefined) {
        $('.hometabs').css('display','none');
        $('.hometabsCust').css('display','none');
        $('.hometabsGuest').css('display','block');
        }
          console.log(this.IsStaffCheck);
        $("page-push-tabs").removeAttr("hidden");
        $('page-signin').css('display','none');
    });

  }
//     this.viewCtrl.dismiss({

//   })
//    let nav = this.App.getRootNav(); 
// nav.setRoot(PushTabsPage, {selectedTab: 3});


}
ionViewWillEnter() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         // if (response == undefined) {
         //   this.asmodal = 'yes';
         // }else{
         //   this.asmodal = 'no';
         // }

       }).catch( error => {
       })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  signUpmodal(){
  let getsigninModal = this.modalCtrl.create(SignupPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    // console.log(propertyid);
})
    // this.navCtrl.push(SignupPage);               
  }
  signUp(){
    this.navCtrl.push(SignupPage);               
  }
 hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordText = this.passwordText === 'Show Password' ? 'Hide Password' : 'Show Password';
 }
  forgetpassword() {
    // this.navCtrl.push(ForgetPasswordPage);

  let getsigninModal = this.modalCtrl.create(ForgetPasswordPage, {asmodal : 'yes'});
  getsigninModal.present();
  getsigninModal.onDidDismiss(data=>{ 
    // console.log(propertyid);
})
    // this.dismissModalx();
  }
goToStartnow(){
 this.navCtrl.push(StartNowPage); 
}
  doLogin(){ 
    //this.navCtrl.push(TabsPage);   
    //this.service.loading.present();
    if (this.asmodal == 'yes') {
    console.log(JSON.stringify(this.login.value));
    this.service.showload();
    this.service.login(this.login.value).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
              console.log("auth_user_tokens", response);
             // this.navCtrl.push(PushTabsPage); 
       this.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
         this.name = user.first_name+" "+user.last_name;
         this.email = user.email;
         this.avatar = user.avatar;
                  if (response) {
           let usrdata: any = {
             id: user.id,
             email: user.email
           }

         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
                    this.service.login2(usrdata).then( (response : any) => { 
                console.log(response);
                console.log(response.message.names);
                var resName = response.message.names;
                var typeemail = this.login.value.email;
                var getname = resName[typeemail];
                console.log(typeemail);
                console.log(getname);
           let cusname: any = {
             email: typeemail,
             name: getname
           }
            this.storage.setStorage('customerstorage', cusname).then( (result : any) => {
              console.log(result);
            });
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });

                    });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
         console.log("email_verified_status" + user.email_verified_status);
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
          this.deleteModal();
              // this.dismissModalx();
              this.service.loading.dismiss();
            });
this.chechEmailVerified();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
            this.service.clearAuthDatas();
          });
    }else{
    console.log(JSON.stringify(this.login.value));
    this.service.showload();
    this.service.login(this.login.value).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
              console.log("auth_user_tokens", response);
              this.navCtrl.push(PushTabsPage); 
              this.service.loading.dismiss();
            });
this.chechEmailVerified();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
            this.service.clearAuthDatas();
          });
    }

  }


    chechEmailVerified() {
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
       if(auth_user_token) {
            this.storageToken = auth_user_token;
                this.getProfile();
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
         this.email = user.email;
         this.avatar = user.avatar;
                           if (response) {
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+this.name+"</h3><h4 class='profile-info'>"+this.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+this.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+customerstorage.name+"</h3><h4 class='profile-info'>"+customerstorage.email+"</h4></ion-col></ion-row>";
        }
     });
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
           let userPublish: any = {
             first_name: user.first_name,
             last_name: user.last_name,
             email: user.email,
             avatar: user.avatar,
           }
         this.events.publish('user:created', userPublish, Date.now());
this.setprofileDetail.first_name = user.first_name;
this.setprofileDetail.last_name = user.last_name;
this.setprofileDetail.email = user.email;
this.setprofileDetail.avatar = user.avatar;
this.storage.setStorage('storageprofile', this.setprofileDetail);

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
  fbLogin(){
                  let fbthis = this;
                  let params = new Array<string>();

                   this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
                     console.log(res);
                              console.log(JSON.stringify(res));
                               fbthis.fb.api("/me?fields=name,email", params)
                                .then(function(user) {
                                   let passData = {  email : user.email, id : user.id, name : user.name, avatar: user.avatar};
                                   console.log(JSON.stringify(user));
                                   console.log(user.email );
                                   fbthis.service.showload();
                                   fbthis.service.facebookLogin(passData).then( (response : any) => {
                                                /*console.log(response);*/
                                                fbthis.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
                                                  console.log("auth_user_tokens", response);
                        if (this.asmodal == 'yes') {
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
         console.log("email_verified_status" + user.email_verified_status);
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
         console.log("email_verified_status" + user.email_verified_status);
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
                         this.deleteModal();
                         fbthis.service.loading.dismiss();
                        }else{
                          this.deleteModal();
                      //  fbthis.navCtrl.push(PushTabsPage); 
                        fbthis.service.loading.dismiss();
                        }
                                                });
                                                 this.getProfile();
                                               //this.service.loading.dismiss();
                                      } ).catch ( error => {
                                            /*console.log(JSON.stringify(error));*/
                                                try {
                                                    fbthis.service.toast(error.error.message, 3000, 'middle');
                                                    fbthis.service.clearAuthDatas();
                                                    fbthis.service.loading.dismiss();
                                                } catch (e) {
                        // fbthis.navCtrl.push(PushTabsPage); 
                                                fbthis.service.loading.dismiss();
                             fbthis.deleteModal();
                         //   $('ion-modal.show-page').css('display','none');
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav(); 
// nav.setRoot(PushTabsPage, {selectedTab: 3});
//   this.isMoreMenu = false;
//  let nav = this.App.getRootNav(); 
// nav.setRoot(PushTabsPage, {selectedTab: 5});
                                                  // fbthis.service.loading.dismiss();
                                                  //  fbthis.service.toast("1 Your facebook account does not exist. Please sign up", 3000, 'middle');
                                                }
                                        
                                      } );
                              }).catch ( (error) => {
                                    fbthis.service.toast("2 Your facebook account does not exist. Please sign up ", 3000, 'bottom');
                                   
                          } );

                 }).catch(e => {
                    fbthis.service.serverError();
                });

  }

  applelogin() {
    let ioslogin = this;
    this.asmodal = 'yes';
    let params = new Array<string>();
    cordova.plugins.SignInWithApple.signin(
          { requestedScopes: [0, 1] },
          function(res){
       console.log(res);
      let passData = {  email : res.email, id : res.user, name : res.fullName.givenName + ' ' + res.fullName.familyName, nick_name : res.fullName.nickname };
      
      console.log(JSON.stringify(res));
         ioslogin.service.showload();
         ioslogin.service.iOSLogin(passData).then( (response : any) => {
                      /*console.log(response);*/
                      if(response.error == 1) {
                        ioslogin.service.loading.dismiss();
                        alert(response.message);
                        return false;
                      }
                      ioslogin.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
                        console.log("auth_user_tokens", response);
                        if (ioslogin.asmodal == 'yes') {
       ioslogin.service.profile().then( (response : any) => {
         console.log(response);
         var user = response.data;
         ioslogin.name = user.first_name+" "+user.last_name;
         ioslogin.email = user.email;
         ioslogin.avatar = user.avatar;
                  if (response) {
         $('.removeit').css('display','flex');
         $('.signin-hs').css('display','none');
         $('.signout-hs').css('display','flex');
document.getElementById('dynamicprofile').innerHTML ="<ion-row class='row'><ion-col class='col' no-padding=''><i><img width='165' src='"+ioslogin.avatar+"'></i></ion-col><ion-col class='col' col-9=''><h3 class='profile-title'>"+ioslogin.name+"</h3><h4 class='profile-info'>"+ioslogin.email+"</h4></ion-col></ion-row>";
         console.log("email_verified_status" + user.email_verified_status);
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
         console.log("email_verified_status" + user.email_verified_status);
           if(user.email_verified_status == 1)
           {
             ioslogin.storageToken.is_email_verified = 1;
             ioslogin.storage.setStorage('auth_user_tokens', ioslogin.storageToken);
           }
           if(!ioslogin.hasEmailVerified && user.email_verified_status == 1) {
             ioslogin.hasEmailVerified = true;
           }  
       }).catch( error => {
           console.log(error);
       })
                         ioslogin.deleteModal();
                         ioslogin.service.loading.dismiss();
                        }else{
                        ioslogin.navCtrl.push(PushTabsPage); 
                        ioslogin.service.loading.dismiss();
                        }
                        
                      });
                       ioslogin.getProfile();
                     //this.service.loading.dismiss();
            } ).catch ( error => {
                  /*console.log(JSON.stringify(error));*/
                      try {
                          ioslogin.service.toast(error, 3000, 'middle');
                          ioslogin.service.clearAuthDatas();
                          ioslogin.service.loading.dismiss();
                      } catch (e) {
                        ioslogin.service.loading.dismiss();
                        ioslogin.service.toast("Your facebook account does not exist. Please sign up", 3000, 'middle');
                      }
              
            } );
    })
    .catch((err : any) =>  {
      console.error(JSON.stringify(err));
       ioslogin.service.toast(JSON.stringify(err), 3000, 'middle');
        console.error(err);
    });
  }

  googlePlusLogin() {
    let gplus = this;
    let params = new Array<string>();
    this.googlePlus.login({
    // necessary for iOS 9+
    'webClientId': "776010082610-vl3l775hgcuhtkvc0ie35skhfi6gog7s.apps.googleusercontent.com"
    })
    .then((res : any) => {
      let passData = {  email : res.email, id : res.userId, name : res.displayName };
      
      console.log(JSON.stringify(res));
         gplus.service.showload();
         gplus.service.GPlusLogin(passData).then( (response : any) => {
                      /*console.log(response);*/
                      gplus.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
                        console.log("auth_user_tokens", response);
                        if (this.asmodal == 'yes') {
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
         console.log("email_verified_status" + user.email_verified_status);
         }else{
           $('.removeit').css('display','none');
           $('.signin-hs').css('display','flex');
           $('.signout-hs').css('display','none');
document.getElementById('dynamicprofile').innerHTML ="";
         }
         console.log("email_verified_status" + user.email_verified_status);
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
                         this.deleteModal();
                         gplus.service.loading.dismiss();
                        }else{
                          this.deleteModal();
                       // gplus.navCtrl.push(PushTabsPage); 
                        gplus.service.loading.dismiss();
                        }
                        
                      });
                       this.getProfile();
                     //this.service.loading.dismiss();
            } ).catch ( error => {
                  /*console.log(JSON.stringify(error));*/
                      try {
                          gplus.service.toast(error, 3000, 'middle');
                          gplus.service.clearAuthDatas();
                          gplus.service.loading.dismiss();
                      } catch (e) {
                        gplus.service.loading.dismiss();
                        gplus.service.toast("Your facebook account does not exist. Please sign up", 3000, 'middle');
                      }
              
            } );
    })
    .catch((err : any) =>  {
      console.error(JSON.stringify(err));
       gplus.service.toast(JSON.stringify(err), 3000, 'middle');
        console.error(err);
    });
  }
}
