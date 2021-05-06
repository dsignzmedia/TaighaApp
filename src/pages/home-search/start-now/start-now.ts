import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../../../pages/signin/signin';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';
import { TabsPage } from '../../../pages/tabs/tabs';
import { SignupPage } from '../../../pages/signup/signup';
import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  selector: 'page-start-now',
  templateUrl: 'start-now.html',
})
export class StartNowPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service: ServiceProvider,
              private googlePlus: GooglePlus,
              public formBuilder : FormBuilder,
              public storage : StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartNowPage');
  }
  goToLogin(){
    this.navCtrl.push(SigninPage);
  }
  signUp(){
    this.navCtrl.push(SignupPage);               
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
                //                                   fbthis.navCtrl.push(TabsPage); 
                //                                   fbthis.service.loading.dismiss();
                //                                 });
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
                        gplus.navCtrl.push(TabsPage); 
                        gplus.service.loading.dismiss();
                      });
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
}
