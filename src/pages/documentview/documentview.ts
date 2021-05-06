import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { DocumentsPage } from '../../pages/documents/documents'; 
import { NewdocumentupdatePage } from '../../pages/newdocumentupdate/newdocumentupdate'; 
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the DocumentviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-documentview',
  templateUrl: 'documentview.html',
})
export class DocumentviewPage {

  public showSpinner:boolean = false;
  public document : any = "";
  public documentId : number = 0;
  constructor(public navCtrl: NavController, 
  			  public service: ServiceProvider,
          private iab: InAppBrowser,
  			  public storage: StorageProvider,
  			  public navParams: NavParams) {
  	this.documentId = this.navParams.get('documentId');
  }

  ionViewWillEnter() {
  		console.log('ionViewDidLoad DocumentviewPage');
  		this.clearAndGetDocument();
      this.service.getFcmToken("Document View : "+ this.documentId);
      this.service.watchFcmNotifications();
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
  handleClick(event) {
    if (event.target.tagName == "A") { 
this.iab.create(event.target.href+"?token=dHJhbnomob", "_system", "beforeload=yes");
    }
  }
  goToDocument() {
  	this.navCtrl.push(DocumentsPage); 
  }

  editDcoument(document) {
    this.navCtrl.push(NewdocumentupdatePage, {documentId : document.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentviewPage');
  }
back(){
   this.navCtrl.pop(); 
  }
}
