import { Component, Input, ViewChild, ElementRef, NgZone   } from '@angular/core';
import { Content, Select, NavController, ModalController, NavParams, ActionSheetController, Platform, ToastController, LoadingController, Loading, normalizeURL } from 'ionic-angular';
import { DocumentsPage } from '../../pages/documents/documents'; 
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { Pipe, PipeTransform } from '@angular/core';
import { SelectTemplatePage } from '../../pages/select-template/select-template'; 


/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var cordova: any;
@Pipe({
  name: 'reverse'
})

@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
@ViewChild(Content) pageTop: Content;
@ViewChild('content') private content: any;
@ViewChild('myInput') myInput: ElementRef;
@ViewChild('msgAreaPanel') msgAreaPanel: ElementRef;
@ViewChild('selectUser') selectRef: Select;
@ViewChild('selectTemplate') selectRef2: Select;
msgID: any;
customerName: any;
smsFrom: any;
Textmsguserid: any;
 CopyTextAreaText:string = "Sample text to copy!";
  PasteTextAreaText:string = "Paste here!";
  hidebtn:string = "dnone";
  scrollcount:string = "1";
  // public isShown: boolean = true;
  
  public isSho: boolean = false;
  public isShowndown: boolean = false;
   public showSpinner : boolean = true;
   public textmessagecommon : any = [];
   public textmessage : any = [];
   public resjson : any = [];
   public messageData : any = [];
   public textMessageCurrentNumber : any = [];
   public textTemplates : any = [];
   public tonumbersvar : any = [];
   public tonumberscusArray : any = [];
   public topHeaderName : any = [];
   public topHeaderNumber : any = [];
   public currentPage = 1;
   public pageLimit = 15;
   public totalPages = 0;
   public totalRecords = 0;
   tonumbersval: string = '';
   templates: string = '';
   selectedTemplate: string = '';
   replymsg: string = '';
   replymsgSignature: string = '';
   userComment: any;
   userid: any;
  messagehistory: any;
   customer_avatar: any;
   fromcreate: string = 'no';
   fromChange: string = 'no';
   useTextmessage_signature: any;
   textmessageSignature: any;
   smsFromcreate: any;
  customerNamecreate: any;
  uid: any;
  urls = new Array<string>();
    @ViewChild('fileInput') inputEl: ElementRef;
  constructor(  public navCtrl: NavController, 
          public service: ServiceProvider, 
          public zone: NgZone,
          public platform: Platform,
            public storage: StorageProvider,
            public modalCtrl: ModalController,
            private iab: InAppBrowser,
            public formBuilder : FormBuilder,
              public toastCtrl: ToastController,
        public navParams: NavParams) {
      this.msgID = this.navParams.data.msgId;
      this.topHeaderName = this.navParams.data.customerName;
      this.topHeaderNumber = this.navParams.data.smsFrom;

      this.customer_avatar = this.navParams.data.customerAvatar;
      if (this.navParams.data.fromcreate) {
        this.fromcreate = this.navParams.data.fromcreate;
      }else{
        this.fromcreate = 'no';
      }
      if (this.navParams.data.smsFromcreate) {
        this.getTextMessageTemplates();
        this.smsFromcreate = this.navParams.data.smsFromcreate;
        this.topHeaderNumber = this.navParams.data.smsFromcreate;
      }
      this.tonumbersval = this.topHeaderNumber
      if (this.navParams.data.customerNamecreate) {
        this.customerNamecreate = this.navParams.data.customerNamecreate;
        this.topHeaderName = this.navParams.data.customerNamecreate;
      }
      if (this.navParams.data.uid) {
        this.uid = this.navParams.data.uid;
      }
      
      console.log(this.msgID);
      console.log(this.fromcreate);
      console.log(this.smsFromcreate);
      this.templates = 'deflt';


  }

back(){
  this.navCtrl.pop();
}
// copyText(){
// this.clipboard.copy('Hello world');
//  //  cordova.plugins.clipboard.copy(this.CopyTextAreaText);
//   // console.log(this.CopyTextAreaText);
//     // this.clipboard.copy(this.CopyTextAreaText);
//   }
//     //Paste Event
//   pasteText(){
//     this.clipboard.paste().then(
//       (resolve: string) => {
//          this.PasteTextAreaText = resolve;
//          console.log(resolve);
//        },
//        (reject: string) => {
//          console.error('Error: ' + reject);
//        }
//      );
//   }

//   //Clear Event
//   clearClipboard(){
//     this.clipboard.clear();
//   }
   doRefresh(refresher) {
          console.log('Begin async operation', refresher);

          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 5000);
    }
    openSelect()
    {
        this.selectRef.open();
    }
openSelecttemplate(){
      let textmessagemodal = this.modalCtrl.create(SelectTemplatePage, {templates: this.textTemplates}, {cssClass: 'template-modal' });
          textmessagemodal.present();
          textmessagemodal.onDidDismiss(data=>{ 
          this.selectedTemplate = data.selectedTemplate;
          console.log(this.selectedTemplate);
          this.replymsg = this.selectedTemplate;
              setTimeout(()=>{
              this.resize();
            },500);
      })
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
onChangeTime(event){
this.resize();
}
textareaClicked(){
  setTimeout(()=>{
    this.resize();
  },200); 
}
resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  //  console.log(this.myInput.nativeElement.scrollHeight);
    // const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 11;
   // const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 11;
     if (this.platform.is('ios')) {
    const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 41;
    console.log("IOS addMB");
     $('.chat').css('margin-bottom',addMB);
      console.log(addMB);
   }else{
     console.log("android addMB");
     const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 11;
      $('.chat').css('margin-bottom',addMB);
       console.log(addMB);
   }
    
    
   
     
    // $('.chat').css('margin-bottom',addMB);
    this.scrollToBottomOnInit();
    if (this.replymsg == '') {
    this.myInput.nativeElement.style.height = '40px';
  }
}
  ionViewDidLoad() {

    console.log('ionViewDidLoad MessageDetailsPage');
    if (this.fromcreate == 'no') {
      this.getTextmsg();
       this.scrollToBottomOnInit();
    }else{
      this.showSpinner = false;
    }
    $('.hide-event').css('display','none');
  }

  pagerefresh(){
   this.messageData = [];
   this.currentPage = 1;
   try {
     this.showSpinner = true;
     this.service.getTextmessageDetailsPage(this.currentPage, this.msgID).then( (response : any) => {
      var datalength = Object.keys(response.data.messages.data).length;
        this.resjson = response.data.messages.data;
        var keys = this.resjson, key, i;
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
       this.totalPages = response.data.messages.last_page;
       this.textmessagecommon = response.data;
       this.textmessage = this.messageData;
       this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
       this.textTemplates = response.data.textTemplates;
       this.Textmsguserid = response.data.user.id;
       var array2 = [];
       this.scrollToBottomOnInit();
       setTimeout(()=>{
          this.resize();
       },200); 
       this.topHeaderName = response.data.topHeaderName;
       this.topHeaderNumber = response.data.textMessageCurrentNumber;
       this.customer_avatar = response.data.customer_avatar;
       this.showSpinner = false;
     }).catch( error => {
      this.showSpinner = false;
         console.log(error);
     })
   } catch(e) {
     console.log(e);
      this.showSpinner = false;
      this.service.serverError();
    }
  }

    scrollToBottomm(){
    this.pageTop.scrollToBottom(0);
    this.isShowndown = false;
    $('.hide-event').css('display','none');
  }


     onScrolll($event) {

    let dimensions = this.content.getContentDimensions(); 
    let bottomPosition = dimensions.contentHeight + dimensions.scrollTop;
    let screenSize = dimensions.scrollHeight;
    //         if(screenSize - bottomPosition){
    // console.log("bottom was reached!");
    // $('.hide-event').css('display','flex');
    // }else{
    //    $('.hide-event').css('display','none');
    // }
              if ($event.scrollTop >= 0) {
            $('.hide-event').css('display','flex');
          }else{
            $('.hide-event').css('display','none');
          }
          if ( screenSize - bottomPosition <= 10){
             $('.hide-event').css('display','none');
          }
      }

 getTextmsg() {
   console.log(this.msgID);
   try {
     this.showSpinner = true;
     this.service.getTextmessageDetailsPage(this.currentPage, this.msgID).then( (response : any) => {
        console.log(response);
        console.log(Object.keys(response.data.messages.data).length);
        var datalength = Object.keys(response.data.messages.data).length;
          this.resjson = response.data.messages.data;
          var keys = this.resjson, key, i;
          for(let i=0;key = keys[i];i++){
          this.messageData.push(this.resjson[i]);
        }
        console.log(this.messageData);
        this.totalPages = response.data.messages.last_page;
        console.log(this.totalPages);
        this.textmessagecommon = response.data;
        this.textmessage = this.messageData;
        console.log( this.textmessage );
        setTimeout(()=>{
          this.resize();
        },200); 
        this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
        this.textTemplates = response.data.textTemplates;
        this.Textmsguserid = response.data.user.id;
        var array2 = [];
        this.tonumbersvar = response.data.tonumbers;
        this.scrollToBottomOnInit();
        for (var keyvar in this.tonumbersvar) {
            var value = this.tonumbersvar[keyvar];
            this.tonumberscusArray.push([keyvar,value]);
        } 
        console.log(this.tonumbersvar);
        console.log(this.tonumberscusArray); 
        this.topHeaderName = response.data.topHeaderName;
        this.topHeaderNumber = response.data.textMessageCurrentNumber;
        this.customer_avatar = response.data.customer_avatar;
        this.showSpinner = false;
     }).catch( error => {
         this.showSpinner = false;
         console.log(error);
     })
   } catch(e) {
     console.log(e);
     this.showSpinner = false;
        this.service.serverError();
    }

 }
 doInfinite(infiniteScroll) {
 //  console.log(this.currentPage);
 console.log(infiniteScroll);
   console.log(this.totalPages);
   console.log("msgID "+this.msgID);
   try {
     if (this.fromChange == 'yes') {
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       console.log(this.currentPage);
     this.service.getUserTextmessageDetails(this.msgID, this.tonumbersval, this.currentPage).then( (response : any) => {
       console.log( response );
       this.fromChange = 'yes';
     //   this.textmessagecommon = response.data;
     //   this.textmessage = response.data.messages;
     //   this.topHeaderName = response.data.topHeaderName;
     //   this.topHeaderNumber = response.data.textMessageCurrentNumber;

     //   this.customer_avatar = response.data.customer_avatar;
     //   this.showSpinner = false;
     // this.scrollToBottomOnInit();


      var datalength = Object.keys(response.data.messages.data).length;
        this.resjson = response.data.messages.data;
        var keys = this.resjson, key, i;
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
       this.totalPages = response.data.messages.last_page;
       this.textmessagecommon = response.data; //
       this.textmessage = this.messageData; //

       this.topHeaderName = response.data.topHeaderName; //
       this.topHeaderNumber = response.data.textMessageCurrentNumber; //
       this.customer_avatar = response.data.customer_avatar; //
       this.showSpinner = false;

        infiniteScroll.complete();
     }).catch( error => {
         this.showSpinner = false;
          infiniteScroll.complete();
         console.log(error);
     })
    }
     }else{
     if(this.currentPage <= this.totalPages)
     {
       this.currentPage++;
       console.log(this.currentPage);
     this.service.getTextmessageDetailsPage(this.currentPage, this.msgID).then( (response : any) => {
     // this.service.getTextmessageDetails(this.msgID).then( (response : any) => {
       // console.log( response.data.messages );
        this.resjson = response.data.messages.data;
        var datalength = Object.keys(response.data.messages.data).length;
        var keys = this.resjson, key, i;
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
       this.textmessagecommon = response.data;
       $('.hide-event').css('display','flex');
       // let dorev = this.messageData.reverse();
       this.textmessage = this.messageData;
       console.log( this.textmessage );
       this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
       this.textTemplates = response.data.textTemplates;
       this.Textmsguserid = response.data.user.id;
       var array2 = [];

// for(var i = 0; i < this.tonumbersvar.length; i++) {
//   var keys = Object.keys(this.tonumbersvar);
//   var values = Object.values(this.tonumbersvar);
//      this.tonumbersvar.push(keys);
//   // this.tonumbersvar.splice(i, 1);

// }
       this.topHeaderName = response.data.topHeaderName;
       this.topHeaderNumber = response.data.textMessageCurrentNumber;
       this.customer_avatar = response.data.customer_avatar;
       // console.log(this.tonumbersvar);
       this.showSpinner = false;
        infiniteScroll.complete();
     }).catch( error => {
         this.showSpinner = false;
          infiniteScroll.complete();
         console.log(error);
     })
    }
    }
   } catch(e) { 
     this.showSpinner = false;
        this.service.serverError();
   }
 }

scrollToBottomOnInit() {
  if( this.content._scroll ) {
        setTimeout(() => {
            this.content.scrollToBottom(0);
        });
      }
}
changetemplates(){
  console.log(this.templates);
  this.replymsg = this.templates;
      setTimeout(()=>{
      this.resize();
    },900);
    
}
changeConversation(){
  console.log(this.tonumbersval);
  console.log(this.msgID);
this.messageData = [];
   try {
     this.showSpinner = true;
      this.currentPage = 1;
     // this.service.getUserTextmessageDetailsold(this.msgID, this.tonumbersval).then( (response : any) => {
     //   console.log( response );
     // }).catch( error => {
     //     console.log(error);
     // })
     this.service.getUserTextmessageDetails(this.msgID, this.tonumbersval, this.currentPage).then( (response : any) => {
       console.log( response );
       this.fromChange = 'yes';
     //   this.textmessagecommon = response.data;
     //   this.textmessage = response.data.messages;
     //   this.topHeaderName = response.data.topHeaderName;
     //   this.topHeaderNumber = response.data.textMessageCurrentNumber;

     //   this.customer_avatar = response.data.customer_avatar;
     //   this.showSpinner = false;
     // this.scrollToBottomOnInit();


      var datalength = Object.keys(response.data.messages.data).length;
        this.resjson = response.data.messages.data;
        var keys = this.resjson, key, i;
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
       this.totalPages = response.data.messages.last_page;
       this.textmessagecommon = response.data; 
       this.textmessage = this.messageData; 
       console.log(this.textmessage);
              this.topHeaderName = response.data.topHeaderName; 
       this.topHeaderNumber = response.data.textMessageCurrentNumber; 
       this.customer_avatar = response.data.customer_avatar; 
       this.showSpinner = false;
  this.scrollToBottomOnInit();





     }).catch( error => {
         this.showSpinner = false;
         console.log(error);
     })
   } catch(e) {
     console.log(e);
     this.showSpinner = false;
        this.service.serverError();
    }

}

      changeListener(event) : void {
       this.urls = [];
        let files = event.target.files;
        if (files) {
          $('.chat').css('margin-bottom','150px');
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls.push(e.target.result);
            }
            reader.readAsDataURL(file);
          }
        }
        console.log(JSON.stringify(this.urls));
        setTimeout(()=>{
          this.resize();
        },200); 
     }

resetFile() {
    this.urls = [];
     $('.chat').css('margin-bottom','90px');
}
openFile(img){
 this.iab.create(img, "_system");
}
deleteMedia(){
  this.resetFile();
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
sendmsg(){
  console.log(this.tonumbersval);
  console.log(this.replymsg);
  console.log( this.urls);
if (this.urls.length === 0 && this.replymsg === '') {
 this.service.toast('Please enter message', 2000, 'middle');
}else{
  this.replymsgSignature = this.replymsg;
  this.replymsgSignature += '\n';
  // this.replymsgSignature += '\n';
  this.replymsgSignature += this.textmessageSignature;
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
         formData.append('sms_twilio_phone_number', this.tonumbersval);
         formData.append('sms_twilio_message', this.replymsgSignature);
         formData.append('sms_to_number_view', this.Textmsguserid);
         //
         this.service.showload();
         this.service.replytextmsg(formData, this.msgID).then( response => {
           console.log(response);

    this.replymsg = '';
    this.replymsgSignature = '';
    this.templates = '';
      setTimeout(()=>{
        this.resize();
        this.resetFile();
    },500);

if (response) {
// recall
   try {
     this.currentPage = 1;
     this.messageData = [];
     // this.service.getTextmessageDetails(this.msgID).then( (response : any) => {
     //   console.log( response );
     //   this.textmessagecommon = response.data;
     //   this.textmessage = response.data.messages;
     //   this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
     //   this.textTemplates = response.data.textTemplates;
     //   this.tonumbersvar = response.data.tonumbers;
     //   this.scrollToBottomOnInit();

     this.service.getTextmessageDetailsPage(this.currentPage, this.msgID).then( (response : any) => {
     // this.service.getTextmessageDetails(this.msgID).then( (response : any) => {
      // console.log( response.data.messages );
      console.log(response);
      console.log(Object.keys(response.data.messages.data).length);
      var datalength = Object.keys(response.data.messages.data).length;
        this.resjson = response.data.messages.data;
        var keys = this.resjson, key, i;
      //   for(let i=(datalength-1);key = keys[i];i--){
      //   this.messageData.push(this.resjson[i]);
      // }
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
   console.log(this.messageData);
       this.totalPages = response.data.messages.last_page;
       console.log(this.totalPages);
       this.textmessagecommon = response.data;
       this.textmessage = this.messageData;
        console.log( this.textmessage );
       this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
       this.textTemplates = response.data.textTemplates;
       this.tonumbersvar = response.data.tonumbers;
       // console.log(this.tonumbersvar);
  this.scrollToBottomOnInit();
       // console.log(this.tonumbersvar);
   }).catch( error => {
         console.log(error);
     })


   } catch(e) {
     console.log(e);
        this.service.serverError();
    }
// recall
}
           console.log("response", JSON.stringify(response) );
           this.service.toast('message sent successfully', 2000, 'middle');
           this.service.loading.dismiss();
         } ).catch( error => {
           this.service.loading.dismiss();
           console.log("error", JSON.stringify(error) );
           this.service.toast(error.error.message, 3000, 'middle');
         } );

}
}
 getTextMessageTemplates(){

   try {
     this.service.getMessageTemplates().then( (response : any) => {
       console.log( response );
       this.textTemplates = response.error;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }

 }
createmsg(){
  console.log(this.smsFromcreate);
  console.log(this.replymsg);
  console.log( this.urls);
  // this.getTextmsg();
if (this.urls.length === 0 && this.replymsg === '') {
 this.service.toast('Please enter message', 2000, 'middle');
}else{
  this.replymsgSignature = this.replymsg;
  this.replymsgSignature += '\n';
  // this.replymsgSignature += '\n';
  this.replymsgSignature += this.textmessageSignature;
  console.log(this.replymsgSignature); 
       let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        console.log(fileCount);
        let formData2 = new FormData();
        if (fileCount > 0) {
            for (let i = 0; i < fileCount; i++) {
                formData2.append('mms', inputEl.files.item(i));
            }
         }
         // formData.append('sms_twilio_phone_number', this.tonumbersval);
         // formData.append('sms_twilio_message', this.replymsgSignature);
         // formData.append('sms_to_number_view', this.Textmsguserid);

         formData2.append('sms_to', this.uid);
         formData2.append('sms_to_number', this.smsFromcreate);
         formData2.append('message', this.replymsgSignature);
         //
         this.service.showload();

  
        // let formData2 = new FormData();
        //  formData2.append('user_id', this.uid);
         // this.service.checkUserhavemsg(formData2).then( (response : any) => {
           this.service.sendtextmsg(formData2).then( (response : any) =>  {
           
           console.log(response);
           this.messagehistory = response.data;
           if (this.messagehistory == '0') {
           }else{

         // this.service.replytextmsg(formData, this.messagehistory).then( response => {
         //   console.log(response);

    this.replymsg = '';
    this.replymsgSignature = '';
    this.templates = '';
      setTimeout(()=>{
        this.resize();
        this.resetFile();
    },500);
if (response) {
// recall
   try {
     this.currentPage = 1;
     this.messageData = [];
     // this.service.getTextmessageDetails(this.msgID).then( (response : any) => {
     //   console.log( response );
     //   this.textmessagecommon = response.data;
     //   this.textmessage = response.data.messages;
     //   this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
     //   this.textTemplates = response.data.textTemplates;
     //   this.tonumbersvar = response.data.tonumbers;
     //   this.scrollToBottomOnInit();

     this.service.getTextmessageDetailsPage(this.currentPage, this.msgID).then( (response : any) => {
     // this.service.getTextmessageDetails(this.msgID).then( (response : any) => {
      // console.log( response.data.messages );
      console.log(response);
      console.log(Object.keys(response.data.messages.data).length);
      var datalength = Object.keys(response.data.messages.data).length;
        this.resjson = response.data.messages.data;
        var keys = this.resjson, key, i;
      //   for(let i=(datalength-1);key = keys[i];i--){
      //   this.messageData.push(this.resjson[i]);
      // }
        for(let i=0;key = keys[i];i++){
        this.messageData.push(this.resjson[i]);
      }
   console.log(this.messageData);
       this.totalPages = response.data.messages.last_page;
       console.log(this.totalPages);
       this.textmessagecommon = response.data;
       this.textmessage = this.messageData;
        console.log( this.textmessage );
       this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
       this.textTemplates = response.data.textTemplates;
       this.tonumbersvar = response.data.tonumbers;
       // console.log(this.tonumbersvar);
  this.scrollToBottomOnInit();
       // console.log(this.tonumbersvar);
   }).catch( error => {
         console.log(error);
     })


   } catch(e) {
     console.log(e);
        this.service.serverError();
    }
// recall
}

   // try {
   //   this.service.getTextmessageDetails(this.messagehistory).then( (response : any) => {
   //     console.log( response );
   //     this.textmessagecommon = response.data;
   //     this.textmessage = response.data.messages;
   //     this.textMessageCurrentNumber = response.data.textMessageCurrentNumber;
   //     this.textTemplates = response.data.textTemplates;
   //     this.tonumbersvar = response.data.tonumbers;
   //     this.scrollToBottomOnInit();
   // }).catch( error => {
   //       console.log(error);
   //   })
   // } catch(e) {
   //   console.log(e);
   //      this.service.serverError();
   //  }

         //   console.log("response", JSON.stringify(response) );
         //   this.service.toast('message sent successfully', 2000, 'middle');
         //   this.service.loading.dismiss();
         // } ).catch( error => {
         //   this.service.loading.dismiss();
         //   console.log("error", JSON.stringify(error) );
         //   this.service.toast(error.error.message, 3000, 'middle');
         // } );

           }
         } ).catch( error => {
           console.log("error", JSON.stringify(error) );
           this.service.toast(error.error.message, 3000, 'middle');
           this.service.loading.dismiss();
         } );



}
}

}
