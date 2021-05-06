import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropertyviewPage } from '../../pages/propertyview/propertyview';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { DocumentsPage } from '../../pages/documents/documents'; 
/**
 * Generated class for the DocumentviewmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-documentviewmodal',
  templateUrl: 'documentviewmodal.html',
})
export class DocumentviewmodalPage {
  
  public showSpinner:boolean = false;
  public documentData : any = "";
  public pmaId: number = 0;
  constructor(public navCtrl: NavController, 
  			  public service: ServiceProvider,
  			  public storage: StorageProvider,
  			  public navParams: NavParams) {
  		this.pmaId = this.navParams.get('pmaId');
  }

  ionViewWillEnter() {
  		console.log('ionViewDidLoad DocumentviewmodalPage');
  		this.clearAndGetPma();
  }

  clearAndGetPma() {
  	this.documentData = "";
  	this.getPma();
  }

  getPma() {
  	try {
     this.showSpinner = true;
     this.service.pma(this.pmaId).then( (response : any) => {
       console.log( response )
       this.showSpinner = false;
       this.documentData = response.data;
     }).catch( error => {
         this.showSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     	this.showSpinner = false;
        this.service.serverError();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentviewmodalPage');
  }
	viewProperties(propertyId){
		this.navCtrl.push(PropertyviewPage, { propertyId : propertyId } ); 
	}
  back(){
   this.navCtrl.pop(); 
  }
}
