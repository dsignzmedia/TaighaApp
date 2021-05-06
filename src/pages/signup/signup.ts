import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { SigninPage } from '../../pages/signin/signin';
import { PushTabsPage } from '../../pages/home-search/push-tabs/push-tabs';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../../pages/tabs/tabs';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import { GooglePlus } from '@ionic-native/google-plus';
declare var cordova:any; // global
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private login : FormGroup;
  public timeframe: any = [];
  public source: any = []; 
  public interested_in: any = [];
  public showSpinner :boolean = false;
  public additional_comments:boolean = false;
  public referred_person:boolean = false;
  public errors: any = [];
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public storageToken: any;
  public asmodal: string = "no";
  public platformname : string = "";
    public hasEmailVerified : boolean = false;
    public setprofileDetail: any = { first_name : "", last_name:"", email: "", avatar: "",};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service: ServiceProvider,
              public platform: Platform, 
              public events: Events,
              public viewCtrl: ViewController,
              private googlePlus: GooglePlus,
              public formBuilder : FormBuilder,
              public storage : StorageProvider) {
this.asmodal = this.navParams.get('asmodal');
if (this.platform.is('ios')) {
    this.platformname = "ios";
   }
if (this.asmodal) {
  console.log(this.asmodal);
}
     this.errors = [];
     this.login = this.formBuilder.group ( {
          first_name: ['', Validators.required ],
          last_name: ['', Validators.required ],
          email: ['', Validators.compose([Validators.required, Validators.email]) ],
          phone_number: ['', Validators.compose([Validators.required, Validators.minLength(13)]) ],
          password: ['', Validators.required ],
          interested_in: ['', Validators.required ],
          timeframe: [''],
          source: [''],
          comments: [''],
          signup_referred_person: [''],
        })
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FiltermailsPage');
    try {
     this.showSpinner = true;
     this.service.tsi().then( (response : any) => {
       console.log( response )
       this.showSpinner = false;
       this.timeframe = response.data.timeframe;
       this.source = response.data.sources;
       this.interested_in = response.data.interested_in;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
       this.showSpinner = false;
       this.service.serverError();
    }
  }

  toggleRefer() {
    if(this.login.value['source'] == "Referral") {
      this.referred_person = true;
    } else {
      this.referred_person = false;
    }
  }
  doSignUp() {
    console.log(JSON.stringify(this.login.value));
    this.errors = [];
    this.service.showload();
    this.service.signup(this.login.value).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
              console.log("auth_user_tokens", response);
              //this.service.loading.dismiss();
              this.navCtrl.push(PushTabsPage); 
              
            });
          } ).catch( (e : any) => { 
            console.log(e);
            //console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            //console.log(e.error.errors);
            for (let key in e.error.errors) {
              var error = e.error.errors[key]; 
              error.forEach( message => {
                this.errors.push(message);
              } )
            }
            console.log(this.errors);
            this.service.clearAuthDatas();
          });
  }
dismissModal() {
  this.navCtrl.pop();
  this.viewCtrl.dismiss({

  })
}
  toggleComment() {
    this.additional_comments = (this.additional_comments) ? false : true;
    console.log(this.additional_comments);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signIn(){
    this.navCtrl.push(SigninPage);
  }
 goBack(){
    this.navCtrl.pop();
  }

  applelogin() {
    this.asmodal = 'yes';
    let ioslogin = this;
    
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
                         
                         ioslogin.navCtrl.push(PushTabsPage); 
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


  fbLogin () {
                //   let fbthis = this;
                //   let params = new Array<string>();

                //    this.fb.login(['public_profile', 'email'])
                //   .then((res: FacebookLoginResponse) => {
                //               console.log(JSON.stringify(res));
                //                fbthis.fb.api("/me?fields=name,email", params)
                //                 .then(function(user) {
                //                    let passData = {  email : user.email, id : user.id, name : user.name };
                //                    console.log(JSON.stringify(user));
                //                    console.log(user.email );
                //                    fbthis.service.showload();
                //                    fbthis.service.facebookLogin(passData).then( (response : any) => {
                //                                 /*console.log(response);*/
                //                                 fbthis.storage.setStorage('auth_user_tokens', response).then( (result : any) => {
                //                                   console.log("auth_user_tokens", response);
                //                                    if (this.asmodal == 'yes') {

                //                                    }else{
                                                     
                //                                    }
                //                                   fbthis.navCtrl.push(PushTabsPage); 
                //                                   fbthis.service.loading.dismiss();
                //                                 });
                //                                 this.getProfile();
                //                                //this.service.loading.dismiss();
                //                       } ).catch ( error => {
                //                             /*console.log(JSON.stringify(error));*/
                //                                 try {
                //                                     fbthis.service.toast(error.error.message, 3000, 'middle');
                //                                     fbthis.service.clearAuthDatas();
                //                                     fbthis.service.loading.dismiss();
                //                                 } catch (e) {
                //                                   fbthis.service.loading.dismiss();
                //                                    fbthis.service.toast("Your facebook account does not exist. Please sign up", 3000, 'middle');
                //                                 }
                                        
                //                       } );
                //               }).catch ( (error) => {
                //                     fbthis.service.toast("Your facebook account does not exist. Please sign up", 3000, 'bottom');
                                   
                //           } );

                //  }).catch(e => {
                //     fbthis.service.serverError();
                // });

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
                        gplus.navCtrl.push(PushTabsPage); 
                        gplus.service.loading.dismiss();
                      });
                      this.getProfile();
                     //this.service.loading.dismiss();
            } ).catch ( error => {
                  /*console.log(JSON.stringify(error));*/
                      try {
                          gplus.service.toast(error.error.message, 3000, 'middle');
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
}
