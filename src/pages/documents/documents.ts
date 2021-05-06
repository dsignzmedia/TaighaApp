import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { FilterdocumentsPage } from '../../pages/filterdocuments/filterdocuments';
import { NewdocumentPage } from '../../pages/newdocument/newdocument';
import { ServiceProvider } from '../../providers/service/service';
import { DocumentviewmodalPage } from '../../pages/documentviewmodal/documentviewmodal';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { DocumentviewPage } from '../../pages/documentview/documentview'; 
import { StorageProvider } from '../../providers/storage/storage';
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate'; 
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
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
export class DocumentsPage {

  public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   public showSpinner : boolean = true;
   public documents : any = [];
   public isOnScroll: boolean = false;
   public filters: any;
   public isFilterApplied: boolean = false;

  constructor( private iab: InAppBrowser, public navCtrl: NavController, 
          public navParams: NavParams,
          public modalCtrl: ModalController,
          public popoverCtrl: PopoverController,
          public events: Events,
          public storage: StorageProvider,
          public service: ServiceProvider,
          public menuCtrl: MenuController) {

      events.subscribe('documentsfilter:invoked', () => {
         console.log('documentsfilter:invoked');
         this.storage.getStorage('appliedDocumentsFilters').then( documentfilter => {
           console.log(documentfilter);
           this.filters = documentfilter;
           this.clearAndGetDocuments();
         });
     });
  }
openHomeSearchmenu(){
    this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(true, 'homesearchMenu');
    this.menuCtrl.enable(false, 'mainmenumore');
    this.menuCtrl.toggle()
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter DocumentsPage');
    this.clearAndGetDocuments();
    this.service.getFcmToken("Documents");
    this.service.watchFcmNotifications();
  }
 
 clearAndGetDocuments() {
   this.currentPage = 1;
   this.documents = [];
   this.getDocuments();
   this.checkIsFilterApplied();
 }

 checkIsFilterApplied() {
   this.isFilterApplied = false;
   this.storage.getStorage('appliedDocumentsFilters').then( filters => {
     if(filters) {
       this.isFilterApplied = true;
      }
    });
 }

 resetFilter() {
   this.storage.removeStorage('appliedDocumentsFilters').then( (response : any) => {
     this.filters = "";
     this.clearAndGetDocuments();
   });
   
 }

 getDocuments() {
   try {
     this.showSpinner = true;
     this.service.documents(this.currentPage, this.filters).then( (response : any) => {
       console.log( response )
       this.documents = response.data;
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
       this.service.documents(this.currentPage, this.filters).then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.documents.push(item);
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
          this.clearAndGetDocuments();
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
      let filtermodal = this.modalCtrl.create(FilterdocumentsPage, characterNum, opts);
       filtermodal.present();
  }
  createnewDocuments(){
      this.navCtrl.push(NewdocumentPage); 
    }

  openDocumentsModal(pmaId) {
    let opts: any = {
     cssClass: 'documentViewModal',
    }
    let filtermodal = this.modalCtrl.create(DocumentviewmodalPage, {pmaId: pmaId} , opts);
     filtermodal.present();
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

   editDcoument(document) {
     if(document.doc_id != 0) {
        this.navCtrl.push(NewdocumentupdatePage, {documentId : document.doc_id});
      }
  } 

viewdoc(link){
this.iab.create(link+"?token=dHJhbnomob", "_system", "beforeload=yes");
}

   viewDocument(document) {
     console.log(document);
     if(document.pma_id != 0) {
       this.openDocumentsModal(document.pma_id);
     }else if(document.doc_id != 0) {
       this.navCtrl.push(DocumentviewPage, { documentId : document.doc_id }); 
     }
   }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverpagePage, {}, {cssClass: 'customPopover'});
    popover.present({
      ev: myEvent
    });
  }
}
