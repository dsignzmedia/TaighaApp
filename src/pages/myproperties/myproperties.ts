import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { FilterpropertiesPage } from '../../pages/filterproperties/filterproperties';
import { ServiceProvider } from '../../providers/service/service';
import { NewpropertiesPage } from '../../pages/newproperties/newproperties';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';

import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the MypropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({

  selector: 'page-myproperties',
  templateUrl: 'myproperties.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: 0}),
          animate('0.5s', style({height: 103}))
        ]),
        transition(':leave', [
          style({height: 103}),
          animate('0.5s', style({height: 0}))
        ])
      ]
    )
  ]

})
export class MypropertiesPage {

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

      events.subscribe('propertiesfilter:invoked', () => {
           console.log('propertiesfilter:invoked');
           this.storage.getStorage('appliedPropertyFilters').then( propertyfilter => {
             console.log(propertyfilter);
             this.filters = propertyfilter;
             this.clearAndGetProperties();
           });
       });

  }
   public changeText(): void {
      if(this.text === 'More Info') { 
        this.text = 'Less Info'
      } else {
        this.text = 'More Info'
      }
    }
 openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MypropertiesPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MypropertiesPage');
    this.storage.getStorage('appliedPropertyFilters').then( propertyfilter => {
         this.filters = propertyfilter;
         this.clearAndGetProperties();
         this.service.getFcmToken("Properties");
         this.service.watchFcmNotifications();
     });
  }
 
 clearAndGetProperties() {
   this.currentPage = 1;
   this.properties = [];
   this.getProperties();
   this.checkIsFilterApplied();
 }

 checkIsFilterApplied() {
   this.isFilterApplied = false;
   this.storage.getStorage('appliedPropertyFilters').then( filters => {
     if(filters) {
       this.isFilterApplied = true;
      }
    });
 }

 resetFilter() {
   this.storage.removeStorage('appliedPropertyFilters').then( (response : any) => {
     this.filters = "";
     this.clearAndGetProperties();
   });
   
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

 doInfinite(infiniteScroll) {
   try {
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       this.isOnScroll = true;
       this.service.properties(this.currentPage, this.filters).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.properties.push(item);
            });
        infiniteScroll.complete();
       }).catch( error => {
           this.showSpinner = false;
           console.log(error);
           infiniteScroll.complete();
       })
    }
   } catch(e) { 
     this.showSpinner = false;
        this.service.serverError();
   }
 }

 doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.currentPage = 0;
          this.clearAndGetProperties();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }
  openfilterModal(characterNum) {
      let opts: any = {
       cssClass: 'filterModal',
      }
      this.storage.removeStorage('activitycalanderapplied');
      let filtermodal = this.modalCtrl.create(FilterpropertiesPage, characterNum, opts);
       filtermodal.present();
  }
  createnewProperties(){
   this.navCtrl.push(NewpropertiesPage, { propertyId : 0}); 
  }
  viewProperties(property){
     this.navCtrl.push(PropertyviewPage, { propertyId : property.id } );    
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
 
 editProperty(property){
   this.navCtrl.push(NewpropertiesPage, { propertyId : property.id}); 
  }

openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverpagePage, {}, {cssClass: 'customPopover'});
    popover.present({
      ev: myEvent
    });
  }

}
