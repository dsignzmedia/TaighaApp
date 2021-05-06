import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { FilterpropertiesPage } from '../../pages/filterproperties/filterproperties';
import { ServiceProvider } from '../../providers/service/service';
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';

import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the PropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html',
})
export class PropertiesPage {
  public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public properties : any = [];
   public isOnScroll: boolean = false;
   public showBottomInfo: boolean = false;
   show:boolean = false;
   public text: string = 'More Info';
   public filters: any = "";
   public isFilterApplied: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController) {
  }
goBack(){
	this.navCtrl.pop();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertiesPage');
  }
 getProperties() {
   try {
     this.showSpinner = true;
     this.service.properties(this.currentPage, this.filters).then( (response : any) => {
       console.log( response )
       this.properties = response.data;
       this.totalPages = response.totalPages;
       this.totalRecords = response.totalRecords;
       this.showSpinner = false;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.showSpinner = false;
        this.service.serverError();
    }
 }
}
