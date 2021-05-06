import { Component, Input, ViewChild, ElementRef   } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController, Loading, normalizeURL } from 'ionic-angular';
import { DocumentsPage } from '../../pages/documents/documents'; 
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the NewdocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;

@Component({
  selector: 'page-newdocument',
  templateUrl: 'newdocument.html',
})
export class NewdocumentPage {

  public properties: any = "";
  public showSpinner: boolean = false;
  public imageurl: any = "";
  public lastImage: string = null;
  public loading: Loading;
  public headerToken: any = "";
  public imageurlpreview : string = "";
  public fileName : any = "";

  public name: string = "";
  public property_id: any = "0";

  urls = new Array<string>();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(	public navCtrl: NavController, 
  				public service: ServiceProvider, 
  			  	public storage: StorageProvider,
  			  	public formBuilder : FormBuilder,
  			  	private camera: Camera, 
	            public platform: Platform,
	            private transfer: FileTransfer, 
	            private file: File, 
	            private filePath: FilePath, 
	            public toastCtrl: ToastController,
	            public actionSheetCtrl: ActionSheetController,
	            public loadingCtrl: LoadingController,
				public navParams: NavParams) {


  	this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
        this.headerToken = auth_user_token.token_type + " " + auth_user_token.access_token;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewdocumentPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter NewdocumentPage');
    this.clearAndGetOptions();
  }

  clearAndGetOptions() {
	  	try {
	 		this.showSpinner = true;
	 		this.service.userByProperties().then( (response : any) => {
	 			console.log(response);
			   	this.properties = response.data.properties;
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


      changeListener(event) : void {
	     this.urls = [];
		    let files = event.target.files;
		    if (files) {
		      for (let file of files) {
		        let reader = new FileReader();
		        reader.onload = (e: any) => {
		          this.urls.push(e.target.result);
		        }
		        reader.readAsDataURL(file);
		      }
		    }
		    console.log(JSON.stringify(this.urls));
	   }

	   storeDocument() {
	   	let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        console.log(fileCount);
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file[]', inputEl.files.item(i));
            }
         }
         console.log(this.name);
         formData.append('name', this.name);
         formData.append('property_id', this.property_id);
         this.service.showload();
         this.service.documentstore(formData).then( response => {
         	console.log("response", JSON.stringify(response) );
         	this.service.loading.dismiss();
         	this.navCtrl.pop()
         } ).catch( error => {
         	this.service.loading.dismiss();
         	console.log("error", JSON.stringify(error) );
         	this.service.toast(error.error.message, 3000, 'middle');
         } );
	   }


 back() {
    this.navCtrl.push(DocumentsPage);      
  }
}
