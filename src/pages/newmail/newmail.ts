import { Component, Input, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { MailsPage } from '../../pages/mails/mails';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the NewmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newmail',
  templateUrl: 'newmail.html',
})
export class NewmailPage {

  urls = new Array<string>();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  public options : Object;
  public priorities: any = "";
  public properties: any = "";
  public showSpinner: boolean = false;
  private email : FormGroup;

  public priority : string = "";
  public subject : string = "";
  public property_id : any = "";
  public body : any = "";
  public formData = new FormData();

  public config : any;
  public quillEditorRef;
  public quill: any;
  public toolbarOptions;

  constructor(	public navCtrl: NavController, 
  				public service: ServiceProvider, 
  				public storage: StorageProvider,
  			  public formBuilder : FormBuilder,
          public loadingCtrl : LoadingController,
  				public navParams: NavParams) {
  	
    this.toolbarOptions = this.service.toolbarOptions;
  	this.email = this.formBuilder.group ( {
          priority: ['', Validators.required ],
          property_id: [''],
          subject: ['', Validators.required ],
          body:['']
        })
    this.config = this.service.ckeImageUploadOptions;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMailPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MailsPage');
    this.clearAndGetOptions();
  }

  clearAndGetOptions() {
	  	try {
	 		this.showSpinner = true;
	 		this.service.emailcreate().then( (response : any) => {
		   	this.priorities = response.data.priorities;
		   	this.properties = response.data.properties;
		   	console.log(response);
        this.body = response.data.signature;
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

  back() {
  	this.navCtrl.push(MailsPage);    
  }
  
  getEditorContent(editorInstance: any) {
    this.body = editorInstance.html;
  }
  
  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.quill = editorInstance;

  }

  imageHandler() {
      const Imageinput = document.createElement('input');
      Imageinput.setAttribute('type', 'file');
      Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
      Imageinput.classList.add('ql-image');

      Imageinput.addEventListener('change', () =>  {
        const file = Imageinput.files[0];
        if (Imageinput.files != null && Imageinput.files[0] != null) {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });

            loading.present();
            var fd = new FormData();
            fd.append('image', file);
            this.service.quillimageupload(fd).then( (res : any) => {
            console.log(res);
            this.pushImageToEditor(res);
            loading.dismiss();
            }).catch( (error : any) => {
              loading.dismiss();
            });
        }
    });

      Imageinput.click();
  }

  pushImageToEditor(res) {
  const range = this.quill.getSelection(true);
  const index = range.index + range.length;
  this.quill.insertEmbed(range.index, 'image', res.url);
}

  changeListener(event) : void {
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
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                this.formData.append('attachments[]', inputEl.files.item(i));
            }
         }
     }
 
  storeEmail() {
  	this.service.showload();
    this.formData.append('priority', this.priority);
    this.formData.append('property_id', this.property_id);
    this.formData.append('body', this.body);
    this.formData.append('subject', this.subject);
  	this.service.emailstore(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
  }
  goBack() {
    this.navCtrl.pop();
  }

}
