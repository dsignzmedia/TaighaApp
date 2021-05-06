import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { DocumentsPage } from '../../pages/documents/documents'; 
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the NewdocumentupdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newdocumentupdate',
  templateUrl: 'newdocumentupdate.html',
})
export class NewdocumentupdatePage {
  
  public showSpinner:boolean = false;
  public document : any = "";
  public documentId : number = 0;
  constructor(private iab: InAppBrowser, public navCtrl: NavController, 
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
  			  public navParams: NavParams) {
  	this.documentId = this.navParams.get('documentId');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewdocumentupdatePage');
  }

  ionViewWillEnter() {
  		console.log('ionViewDidLoad NewdocumentupdatePage');
  		this.clearAndGetDocument();
  }

  clearAndGetDocument() {
  	this.document = "";
  	this.getDocument();
  }

  getDocument() {
  	try {
     this.showSpinner = true;
     this.service.document(this.documentId).then( (response : any) => {
       console.log( response )
       this.showSpinner = false;
       this.document = response.data.document;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     	this.showSpinner = false;
        this.service.serverError();
    }
  }
viewdoc(link){
this.iab.create(link+"?token=dHJhbnomob", "_system", "beforeload=yes");
}
  updateDcoument() {
  	try {
     this.showSpinner = true;
     this.service.documentupdate(this.document).then( (response : any) => {
       console.log( response )
       this.showSpinner = false;
       this.goToDocument();
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     	this.showSpinner = false;
        this.service.serverError();
    }
  }
  goToDocument() {
  	this.navCtrl.push(DocumentsPage); 
  }

  editDcoument(document) {
    this.navCtrl.push(NewdocumentupdatePage, {docid : document.id});
  }
 back() {
    this.navCtrl.push(DocumentsPage);    
  }
}
