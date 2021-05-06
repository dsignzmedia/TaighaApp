import { Component, ElementRef, ViewChild, trigger, state, style, transition, animate, NgZone } from '@angular/core';
import {  Content, NavController, NavParams, ModalController, PopoverController, Events, MenuController } from 'ionic-angular';
import { MessageDetailsPage } from '../../pages/message-details/message-details';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the CreateMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html',
})

export class CreateMessagePage {
	@ViewChild('myInput') myInput: ElementRef;
searchTerm: string = '';
  public userlist : any = [];
  public templatelist : any = [];
  smstoid: any;
  userid: any;
  smstonum: any;
  public showSpinner : boolean = false;
  public showInfo : boolean = false;
  selecteduser: any;
  messagehistory: any;
  yesorno: any;
  templates: string = '';
  message: any;
  smstonumadd: any;
  replymsgSignature: string = '';
   useTextmessage_signature: any;
   textmessageSignature: any;
   public ishidden:boolean = false;
     urls = new Array<string>();
         @ViewChild('fileInput') inputEl: ElementRef;
  constructor(public navCtrl: NavController, 
              public zone: NgZone,
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController) {
  	this.templates = 'deflt';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMessagePage');
    this.getTextMessageTemplates();
  }
ngOnInit() {
       this.service.profile().then( (response : any) => {
         console.log(response);
         this.userid = response.data.id;
         console.log(this.userid);
         this.getTemplate();
       }).catch( error => {
       })
}
goBack(){
	this.navCtrl.pop();
}
appendToSMS(id, fname, lname, phone, num){
console.log(id);
console.log(fname);
console.log(lname);
console.log(phone);
this.selecteduser = fname+' '+lname+' - '+phone;
console.log(this.selecteduser);
this.searchTerm = this.selecteduser;
this.smstoid = id;
this.smstonum = num;
this.ishidden = false;

}

checkMsg(id, fname, lname, phone, num){
  console.log(id);
  console.log(num);
        let formData = new FormData();
         formData.append('user_id', id);
         formData.append('phone_number', num);
         this.service.checkUserhavemsg(formData).then( (response : any) => {
           
           console.log(response);
           this.messagehistory = response.data;
           if (this.messagehistory == '0') {
             this.yesorno = 'yes';
           }else{
             this.yesorno = 'no';
           }
           this.gotoTextMessage(this.messagehistory, fname+' '+lname, num, '', this.yesorno, id );
         } ).catch( error => {
           console.log("error", JSON.stringify(error) );
           this.service.toast(error.error.message, 3000, 'middle');
         } );
}

gotoTextMessage(idd, customer_name, sms_from, customer_avatar, yesorno, uid){
  console.log(idd);
  console.log(customer_name);
  console.log(sms_from);
  console.log(customer_avatar);

      let textmessagemodal = this.modalCtrl.create(MessageDetailsPage,{
        msgId: idd,
        customerNamecreate: customer_name,
        smsFromcreate: sms_from,
        customerAvatar: customer_avatar,
        fromcreate: yesorno,
        uid: uid
      });
     textmessagemodal.present();
}


protected resetChanges = () => {
this.ishidden = false;
};
resize() {

    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    if (this.message == '') {
		this.myInput.nativeElement.style.height = '40px';
	}
}
changetemplates(){
	console.log(this.templates);
	this.message = this.templates;
	    setTimeout(()=>{
      this.resize();
    },900);
    
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
	   resetFile() {
    this.urls = [];
     $('.chat').css('margin-bottom','55px');
}
	   deleteMedia(){
  this.resetFile();
}
  getItems(val){
console.log(this.searchTerm);
this.showSpinner = true;
this.showInfo = false;
// messageUserFilter
if (this.searchTerm == '') {
this.ishidden = false;
this.showSpinner = false;
this.showInfo = false;
}else{
   try {
     this.service.messageUserFilter(this.searchTerm).then( (response : any) => {
       console.log( response );
       this.showSpinner = false;
       this.userlist = response.data;
       if (this.userlist.length == 0) {
         this.showInfo = true;
       }else{
         this.showInfo = false;
       }
       this.ishidden = true;
     }).catch( error => {
         console.log(error);
         this.showSpinner = false;
         this.ishidden = false;
     })
   } catch(e) {
        this.service.serverError();
    }
  }
  	}
// getMessageTemplates
 getTextMessageTemplates(){

   try {
     this.service.getMessageTemplates().then( (response : any) => {
       console.log( response );
       this.templatelist = response.error;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }

 }
getTemplate(){
// this.userid
   try {
     this.service.getTemplates(this.userid).then( (response : any) => {
       console.log( response );
       this.useTextmessage_signature = response.use_textmessage_signature;
       if (this.useTextmessage_signature == 0) {
          this.textmessageSignature = '';
       }else{
          this.textmessageSignature = response.textmessage_signature;
       }
      
     }).catch( error => {
     })
   } catch(e) {
        this.service.serverError();
    }
}
createmsg(){
	console.log(this.smstoid);
	console.log(this.smstonum);
	console.log(this.message);
	console.log(this.urls);
	this.smstonumadd = '+1'+this.smstonum;
  this.replymsgSignature = this.message;
  // this.replymsgSignature += '\n';
  // this.replymsgSignature += '\n';
  this.replymsgSignature += this.textmessageSignature;
  console.log(this.replymsgSignature);
  console.log(this.smstonumadd);


if (this.urls.length === 0 && this.message === undefined) {
 this.service.toast('Please enter message', 2000, 'middle');
}else{
	this.service.toast('message sent successfully', 2000, 'middle');
  console.log(this.replymsgSignature);
	   	let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        console.log(fileCount);
        let formData = new FormData();
        if (fileCount > 0) {
            for (let i = 0; i < fileCount; i++) {
                formData.append('mms', inputEl.files.item(i));
            }
         }
         formData.append('sms_to', this.smstoid);
         formData.append('sms_to_number', this.smstonum);
         formData.append('message', this.replymsgSignature);
         this.service.showload();
         this.service.sendtextmsg(formData).then( response => {
         	console.log(response);

         	console.log("response", JSON.stringify(response) );
         	this.service.toast('message sent successfully', 2000, 'middle');
         	this.service.loading.dismiss();
         	this.goBack();
         } ).catch( error => {
         	this.service.loading.dismiss();
         	console.log("error", JSON.stringify(error) );
         	this.service.toast(error.error.message, 3000, 'middle');
         } );

}

}


}
