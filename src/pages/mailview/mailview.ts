import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { MailsPage } from '../../pages/mails/mails';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the MailviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mailview',
  templateUrl: 'mailview.html',
})
export class MailviewPage {

  urls = new Array<string>();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  public toggleUpdateFields: boolean = false;
  public dropdownFields: boolean = false;
  public workoutProgress: string = '20' + '%';
  public hidemeNotified: boolean = false;
  public items: any = [];
  public options : Object;
  public showSpinner : boolean = true;
   public email : any = "";
   public properties : any = [];
   public customer : any = "";
   public priorities: any = [];
   public emailId : number = 0;
   public disableUpdate = true;

   public editpriorityfield: boolean = false;
   public editpropertyfield: boolean = false;

	 public hideNotified() {
	 	this.hidemeNotified = !this.hidemeNotified;
    }
   private replyemail : FormGroup;

   public formData = new FormData();

   public priority : string = "";
   public property_id : any = "";
   public body : any = "";

   public config : any;
   public mailsub: any;

   public quillEditorRef;
   public quill: any;
   public toolbarOptions;
public shownavbar: boolean = true;
   public showSubject : boolean = false;
   public showEmails : boolean = false;
   public expandAll:boolean = false;
   public showReply:boolean = false;
   
  constructor(public navCtrl: NavController, 
              public service: ServiceProvider, 
              public loadingCtrl : LoadingController,
              public formBuilder : FormBuilder,
              public navParams: NavParams) {
    this.toolbarOptions = this.service.toolbarOptions;
    this.config = this.service.ckeImageUploadOptions;
    this.emailId = this.navParams.get('emailId');
    this.mailsub = this.navParams.get('ticketsub');

    this.replyemail = this.formBuilder.group ( {
          priority: ['', Validators.required ],
          property_id: [''],
          body:[''],
          id:['']
        })
    this.replyemail.patchValue({ id : this.emailId })

  }

   ecAll() {
    if(this.expandAll) {
        this.showSubject =  this.showEmails  = false;
    } else {
        this.showSubject =  this.showEmails = true;
    }
    this.expandAll = this.expandAll ? false : true;
  }

   toggleShowHide(type) {
    if(type == 'subject') {
       this.showSubject = (this.showSubject) ? false : true;
    }
    if(type == 'emails') {
       this.showEmails = (this.showEmails) ? false : true;
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MailviewPage');
    this.clearAndGetEmail();
    this.service.getFcmToken("Email View : "+ this.emailId);
    this.service.watchFcmNotifications()
  }
 
 clearAndGetEmail() {
   this.email = '' ;
   this.disableUpdate = true;
   this.properties = [];
   this.priorities = [];
   this.customer = "";
   this.getEmail();
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

 getEmail() {
   
   try {
     this.showSpinner = true;
     this.service.email(this.emailId).then( (response : any) => {
       console.log(response);
       this.email = response.data.email;
       this.property_id =  this.email.property_id;
       this.priority = this.email.email_priority;
       this.properties = response.data.properties;
       this.priorities = response.data.priorities;
       this.body = response.data.signature;
       this.customer = this.email.customer
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

  shownGroup = null; 

  updateEmail() {
   let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loading.present();
    this.service.updateEmail(this.email).then( (response : any) => {
        console.log(response);
       loading.dismiss();
       this.clearAndGetEmail();
     }).catch( error => {
        loading.dismiss();
         console.log(error);
     }) 
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

 reply() {
   try {
    this.service.showload();
    this.formData.append('priority', this.priority);
    this.formData.append('property_id', this.property_id);
    this.formData.append('body', this.body);
    this.formData.append('id', this.email.id);

    this.service.emailreply(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
     } catch(e) {
       this.showSpinner = false;
        this.service.serverError();
        this.service.loading.dismiss();
    }
 }

  toggleGroup(activity) {
    if(activity.sub_activity ) {
      if(activity.sub_activity_checked) {
        activity.sub_activity_checked = false;
      } else {
        activity.sub_activity_checked = true;
      }
    }
  } 

  toggleNotify(activity) {
      if(activity.notified_users_checked) {
        activity.notified_users_checked = false;
      } else {
        activity.notified_users_checked = true;
      }
  }

  toggleFields() {
      if(this.toggleUpdateFields) {
      	this.toggleUpdateFields = false;
      } else {
      	this.toggleUpdateFields = true;
      }
  }

  toggleEmail(activity) {
      if(activity.activity_checked) {
        activity.activity_checked = false;
      } else {
        activity.activity_checked = true;
      }
  }

  enableDisableStatus() {
    this.disableUpdate = false;
  }

  updateDropdown(){
  	 if(this.dropdownFields) {
      	this.dropdownFields = false;
      } else {
      	this.dropdownFields = true;
      }
  }
  updateProgress(val) {
   // Update percentage value where the above is a decimal
    this.workoutProgress = Math.min( (val * 100), 100) + '%';
  }

  doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.clearAndGetEmail();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }

  toggleTopHeaderUpdate(type) {
    console.log(type)
    if(type == 'property') {
        this.editpropertyfield = (this.editpropertyfield) ? false : true; 
    } else {
      this.editpriorityfield = (this.editpriorityfield) ? false : true; 
    }
    console.log(this.editpropertyfield)
  }

back(){
   //this.navCtrl.push(MailsPage); 
   this.shownavbar = false;
   this.navCtrl.pop();
  }

  replyToggle() {
    this.showReply = (this.showReply) ? false : true;
  }


}
