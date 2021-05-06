import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  
  private contactus : FormGroup;
  public asmodal: string = "no";
  constructor(	public navCtrl: NavController, 
  				public formBuilder : FormBuilder,
          public viewCtrl: ViewController,
  				public service: ServiceProvider, 
  			  public storage: StorageProvider,
  				public navParams: NavParams,
          public menuCtrl: MenuController) {
    if (this.navParams.get('asmodal')) {
      this.asmodal = this.navParams.get('asmodal');
    }
  	this.contactus = this.formBuilder.group ( {
          subject: ['', Validators.required ],
          body: ['', Validators.required]
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
  convertToTicket() {
  	this.service.showload();
  	this.service.convertToTicket(this.contactus.value).then( (response : any) => {
            this.service.loading.dismiss();
            this.back()
          } ).catch( (e : any) => {
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
  }
back(){
   if (this.asmodal == 'yes') {
    this.viewCtrl.dismiss();
  }else{
    this.navCtrl.push(TabsPage); 
  } 
  }
}
