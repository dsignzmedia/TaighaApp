import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { ActivitiesPage } from '../../pages/activities/activities';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SigninPage } from '../../pages/signin/signin';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  private login : FormGroup;
  public resetsent:boolean = false;
  public success:boolean = false;
  public message:boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service: ServiceProvider,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public formBuilder : FormBuilder, 
              public storage : StorageProvider) {

    this.login = this.formBuilder.group ( {
          email: ['', Validators.compose([Validators.required, Validators.email]) ]
        })

  }

dismissModalx(){
    this.viewCtrl.dismiss({

  })
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  doReset(){    
    //this.navCtrl.push(TabsPage);   
    //this.service.loading.present();
    //console.log(JSON.stringify(this.login.value));
    this.service.showload();
    this.resetsent = false;
    this.service.resetPassword(this.login.value).then( (response : any) => {
            //console.log(JSON.stringify(response));
            this.resetsent = true;
            this.message = response.message;
            if(response.error == 1) {
            	this.success = false;
            } else {
            	this.success = true;
            }
            this.service.loading.dismiss();
            this.dismissModalx();
            
          } ).catch( (e : any) => { 
            //console.log(e);
            //console.log(JSON.stringify(e));
            this.resetsent = false;
            this.service.loading.dismiss();
            this.dismissModalx();
            this.service.toast(e.error.message, 3000, 'middle');
          });
  }

  signIn(){
    // this.navCtrl.push(SigninPage);
  // let getsigninModal = this.modalCtrl.create(SigninPage, {asmodal : 'yes'});
  // getsigninModal.present();
  // getsigninModal.onDidDismiss(data=>{ 

  //   })
  this.dismissModalx();
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }
}
