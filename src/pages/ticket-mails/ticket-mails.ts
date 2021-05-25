import { Component, trigger, state, style, transition, animate, Input, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, PopoverController, Events, MenuController, Content } from 'ionic-angular';
import { FiltermailsPage } from '../../pages/filtermails/filtermails';
import { NewmailPage } from '../../pages/newmail/newmail';
import { MailviewPage } from '../../pages/mailview/mailview';
import { TicketviewPage } from '../../pages/ticketview/ticketview';
import { ServiceProvider } from '../../providers/service/service';
import { PopoverpagePage } from '../../pages/popoverpage/popoverpage';
import { StorageProvider } from '../../providers/storage/storage';
import { TicketFieldsPage } from '../../pages/ticket-fields/ticket-fields';
/**
 * Generated class for the TicketMailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-mails',
  templateUrl: 'ticket-mails.html',
})
export class TicketMailsPage {
  urls = new Array<string>();
  @ViewChild(Content) pageTop: Content;
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild(Content) content: Content;
  @ViewChild('myInput') myInput: ElementRef;
    public formData = new FormData();
  public showMin: boolean = false;
  public showMax: boolean = false;
  public max_checked: boolean = false;
  public togglelast: boolean = true;
public ticketData : any = [];
public ticketDataOption : any = [];
public ticketAllOption : any = [];
public fromdata: any;
public ticketsub: any;
public ticket : any = [];
public toolbarOptions;
public firstmail: any;
public lastmail: any;
public ticketHistory : any = [];
public slicedFirstLastTicket : any = [];
public properties : any = [];
public priorities: any = [];
public options: any = [];
public customer : any = "";
public property_id : any = "";

public group : any = "";
public staff : any = "";
public class : any = "";
public status : any = "";
public version : any = "";
public access : any = "";
public oldbody : any = "";

public priority : string = "";
public body : any = "";
public slicedFirstLastCount: any;
  public quillEditorRef;
  public quill: any;
public GotTicketTemplate : any = "";
public GotTicketGroup : any = "";
public GotTicketStaff : any = "";
public GotTicketClass : any = "";
public GotTicketPriority : any = "";
public GotTicketProperty : any = "";
public GotTicketStatus : any = "";
public GotTicketVersion : any = "";
public GotTicketAccess : any = "";
public notifyuser : any = "";
  public showEmails : boolean = false;
    public showReply: boolean = false;
    public showFields: boolean = false;
    public activity: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public storage: StorageProvider,
              public service: ServiceProvider,
              public menuCtrl: MenuController,
              public loadingCtrl : LoadingController) {
    this.toolbarOptions = this.service.toolbarOptions;
  	this.ticketData = this.navParams.get('ticketData');
    this.ticketDataOption = this.navParams.get('ticketDataOption');
  	this.ticketsub = this.navParams.get('ticketsub');
    this.fromdata = this.navParams.get('from');
    this.notifyuser = this.navParams.get('notifyuser');
        console.log(this.notifyuser);
    console.log(this.fromdata);
  	this.ticket = this.ticketData.ticket;
    this.ticketHistory = this.ticketData.ticket.ticket_histories;
    console.log("this.ticketHistory");
    console.log(this.ticketHistory[0]);
       this.properties = this.ticketData.properties;
       this.priorities = this.ticketData.priorities;
       this.customer = this.ticket.customer;
       this.property_id = this.ticket.property_id;
       this.priority = this.ticket.priority;
           this.group = this.ticket.assigned_to;
           this.staff = this.ticket.assigned_to_staff;
           this.class = this.ticket.class;
           this.status = this.ticket.status;
           this.version = this.ticket.version;
           this.oldbody = this.ticket.body;

           


       this.body = this.ticketData.signature;
       console.log(this.body);
       console.log(this.ticketDataOption);
  	console.log(this.ticketData);
  	console.log(this.ticket);
  	let test = this.ticketHistory;
  	// this.ticketHistory.slice(1);
  	// //const slicedFirstLast = test.slice(1, -1);
        const slicedFirstLast = test.slice( 1);
        this.slicedFirstLastTicket = slicedFirstLast;
// this.ticketHistory.slice(1);
console.log("this.slicedFirstLastTicket");
console.log(this.slicedFirstLastTicket);
this.slicedFirstLastCount = slicedFirstLast.length - 1;
console.log(this.slicedFirstLastCount);
let f=this.ticketHistory[0];    
  let l=this.ticketHistory[this.ticketHistory.length-1]; 
  

  console.log("lastmail");
  console.log(l);
  console.log(this.ticketHistory[0]);
  this.firstmail = f;
  console.log("firstmail");
    console.log(this.firstmail);
  this.lastmail = l;
  this.lastmail.activity_checked = true;
  	if (this.ticketHistory.length > 3) {
  		console.log("more 3");

  this.showMin = false;
  this.showMax = true;
  // $('.min-list').css('display','none');
  // $('.max-list').css('display','block');
  
  	}else{
  		this.showMax = false;
  		this.showMin = true;
  // 		  $('.min-list').css('display','block');
  // $('.max-list').css('display','none');
  		console.log("not 3");
  	}
    if (this.ticketHistory) {
// if (this.fromdata == 'gotoreply') {
//   this.scrollToBottomOnInit();
// }
// this.scrollToBottomOnInit();
}
           this.service.ticketcreate().then( (response : any) => {
         console.log(response);
         this.ticketAllOption = response.data;
       }).catch( error => {
           console.log(error);
       })

  }

countnotify(notify){
console.log(notify);
var array = notify.split(',');
console.log(array);
}
 toggleGroup1(notify) {
      if(notify.id) {
        notify.id = false;
      } else {
        notify.id = true;
      }
    
  } 
   toggleGroup(notify) {
      if(notify.checked) {
        notify.checked = false;
      } else {
        notify.checked = true;
      }
    
  }
scrollToBottomOnInit() {
        setTimeout(() => {
            this.content.scrollToBottom(0);
            $('.ql-container').css('height','100px');
        }, 100);
      
}
toggleMail(){
// }
      if(this.showMin) {
        this.showMin = false;
        this.showMax = true;
      } else {
        this.showMin = true;
        this.showMax = false;
      }
}

 reply() {
   try {
    this.service.showload();

    console.log( (this.GotTicketGroup) ? this.GotTicketGroup : this.group);
    console.log( (this.GotTicketStaff) ? this.GotTicketStaff : this.staff);
    console.log( (this.GotTicketPriority) ? this.GotTicketPriority : this.priority);
    console.log( (this.GotTicketClass) ? this.GotTicketClass : this.class);
    console.log( (this.GotTicketProperty) ? this.GotTicketProperty : this.property_id);
    console.log( (this.GotTicketStatus) ? this.GotTicketStatus : this.status);
    console.log( (this.GotTicketVersion) ? this.GotTicketVersion : this.version);
    console.log( (this.GotTicketAccess) ? this.GotTicketAccess : this.access);
    console.log( (this.body) ? this.body : this.oldbody);

this.GotTicketGroup =  (this.GotTicketGroup) ? this.GotTicketGroup : this.group;
this.GotTicketStaff =  (this.GotTicketStaff) ? this.GotTicketStaff : this.staff;
this.GotTicketPriority = (this.GotTicketPriority) ? this.GotTicketPriority : this.priority;
this.GotTicketClass = (this.GotTicketClass) ? this.GotTicketClass : this.class;
this.GotTicketProperty = (this.GotTicketProperty) ? this.GotTicketProperty : this.property_id;
this.GotTicketStatus = (this.GotTicketStatus) ? this.GotTicketStatus : this.status;
this.GotTicketVersion = (this.GotTicketVersion) ? this.GotTicketVersion : this.version;
this.GotTicketAccess = (this.GotTicketAccess) ? this.GotTicketAccess : this.access;
this.body = (this.body) ? this.body : this.oldbody;

// this.GotTicketGroup =  this.GotTicketGroup;
// this.GotTicketStaff =  this.GotTicketStaff;
// this.GotTicketPriority = this.GotTicketPriority;
// this.GotTicketClass = this.GotTicketClass;
// this.GotTicketProperty = this.GotTicketProperty;
// this.GotTicketStatus = this.GotTicketStatus;
// this.GotTicketVersion = this.GotTicketVersion;
// this.GotTicketAccess = this.GotTicketAccess;
// this.body = this.body;


    this.formData.append('group', this.GotTicketGroup);
    this.formData.append('staff', this.GotTicketStaff);
    this.formData.append('priority', this.GotTicketPriority);
    this.formData.append('class', this.GotTicketClass);
    this.formData.append('property_id', this.GotTicketProperty);
    this.formData.append('status', this.GotTicketStatus);
    this.formData.append('version', this.GotTicketVersion);
    this.formData.append('accessible_users', this.GotTicketAccess);
    this.formData.append('body', this.body);
    this.formData.append('id', this.ticket.id);
    console.log(this.GotTicketProperty);
    console.log(this.property_id);
    console.log('test');

    console.log(this.ticket.id);
     this.service.loading.dismiss();
    this.service.ticketreply(this.formData).then( (response : any) => {
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
       // this.showSpinner = false;
        this.service.serverError();
        this.service.loading.dismiss();
    }
 }


  ionViewWillEnter() {
  	if (this.ticketHistory.length > 3) {
  		console.log("more 3");
  this.showMin = false;
  this.showMax = true;
  // $('.min-list').css('display','none');
  // $('.max-list').css('display','block');
  
  	}else{
  		this.showMax = false;
  		this.showMin = true;
  // 		  $('.min-list').css('display','block');
  // $('.max-list').css('display','none');
  		console.log("not 3");
  	}
this.getAccess();
  }

   getAccess() {

   try {
   console.log(this.ticket.id);
   console.log(this.ticket.assigned_to_staff);
     this.service.hasAccess(this.ticket.id, this.ticket.assigned_to_staff).then( (response : any) => {
       console.log( response );
       this.access = response.totalAccessUsers;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }
 }

  getEditorContent(editorInstance: any) {
    this.body = editorInstance.html;
   this.resize();
  }
  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.quill = editorInstance;

  }

openSelecttemplate(){
      let textmessagemodal = this.modalCtrl.create(TicketFieldsPage, {templates: this.ticketDataOption, ticket: this.ticket, ticketAllOption: this.ticketAllOption}, {cssClass: 'template-modal-mini' });
          textmessagemodal.present({animate: false});
          textmessagemodal.onDidDismiss(data=>{ 
            console.log(data);
            console.log(data);
            if (data == undefined) {
this.GotTicketTemplate = '';
this.GotTicketGroup ='';
this.GotTicketStaff = '';
this.GotTicketPriority = '';
this.GotTicketProperty = '';
this.GotTicketClass = '';
this.GotTicketStatus = '';
this.GotTicketVersion = '';
            }else{
this.GotTicketTemplate = data.GotTicketTemplate;
this.GotTicketGroup = data.GotTicketGroup;
this.GotTicketStaff = data.GotTicketStaff;
this.GotTicketPriority = data.GotTicketPriority;
this.GotTicketClass = data.GotTicketClass;
this.GotTicketProperty = data.GotTicketProperty;

this.GotTicketStatus = data.GotTicketStatus;
this.GotTicketVersion = data.GotTicketVersion;
if (data.body != '') {
this.body = data.body;
}

}
// this.getEditorContent(this.body);
          // this.selectedTemplate = data.selectedTemplate;
          // console.log(this.selectedTemplate);
          // this.replymsg = this.selectedTemplate;
          //     setTimeout(()=>{
          //     this.resize();
          //   },500);
      })
    }
resize() {
    // this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    // console.log(this.myInput.nativeElement.style.height);
   //  const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 11;
   //   if (this.platform.is('ios')) {
   //  const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 41;
   // }else{
   //   const addMB = this.msgAreaPanel.nativeElement.scrollHeight + 11;
   // }
    
    
  //  console.log(addMB);
     
  //   $('.chat').css('margin-bottom',addMB);
  //   this.scrollToBottomOnInit();
  //   if (this.replymsg == '') {
  //   this.myInput.nativeElement.style.height = '40px';
  // }
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
toggleMaxList(max){
console.log("test");
  // this.showMax = true;
  //   this.showMin = false;
  // $('.min-list').css('display','none');
  // $('#quilleditorid').css('display','block');
        if(this.showMax) {
        this.showMin = true;
        this.showMax = false;
      } else {
       // this.max_checked = true;
      }
}
  togglelastEmail() {
  	  // $('.list-card ion-item:first-child').css('margin-bottom','150px');

      if(this.togglelast) {
        this.togglelast = false;
      } else {
        this.togglelast = true;
      }
  }
  toggleEmail(activity) {
  	  // $('.list-card ion-item:first-child').css('margin-bottom','150px');
// console.log(activity);
// if (activity == 'allmail') {
//   // code...
// }
      if(activity.activity_checked) {
        activity.activity_checked = false;
      } else {
        activity.activity_checked = true;
      }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketMailsPage');

  }


  replyToggle() {
    this.showReply = (this.showReply) ? false : true;
  } 
  fieldsToggle() {
    this.showFields = (this.showFields) ? false : true;
  } 

  showEmailReply() {
    this.showReply = true;
    if(this.showEmails) {
      this.showEmails = true;
      this.scrollTo('quilleditorid');
    } else {
      this.showEmails = true;
      setTimeout(() => {
        this.scrollTo('quilleditorid');
      }, 100);
    }

  }

scrollTo(element:string) {
    let elem = document.getElementById(element);
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var top  = box.top +  scrollTop - clientTop;
    var cDim = this.content.getContentDimensions();

    var scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;

    this.content.scrollTo(0, scrollOffset, 1000);
    console.log(element);
  }

 goBack(){
  this.navCtrl.pop();
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
}
