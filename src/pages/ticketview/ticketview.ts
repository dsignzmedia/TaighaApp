import { Component, Input, ViewChild, ElementRef   } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { TicketsPage } from '../../pages/tickets/tickets';
import { TicketMailsPage } from '../../pages/ticket-mails/ticket-mails';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { MessageDetailsPage } from '../../pages/message-details/message-details';
import { MailsPage } from '../../pages/mails/mails';
import { ActivitiesPage } from '../../pages/activities/activities';
import { TicketActivityPage } from '../../pages/ticket-activity/ticket-activity';
import { StorageProvider } from '../../providers/storage/storage';
import { SearchableModalPage } from '../../pages/searchable-modal/searchable-modal'; 
/**
 * Generated class for the TicketviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticketview',
  templateUrl: 'ticketview.html',
})
export class TicketviewPage {
   
  urls = new Array<string>();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild(Content) content: Content;

  public contentfield: any = "";

public notifyuser : any = "";
public accessuser: any ="";
public TicketAccessSelected: any = "";
public shownavbar: boolean = true;
  public toggleUpdateFields: boolean = false;
  public dropdownFields: boolean = false;
  public workoutProgress: string = '20' + '%';
  public hidemeNotified: boolean = false;
  public options : Object;
  public showSpinner : boolean = true;
  public ticket : any = "";
  public ticketHistory : any = "";
  public ticketData : any = "";
  public ticketDataOption : any = "";
  public properties : any = [];
  public customer : any = "";
  public priorities: any = [];
  public groups: any = [];
  public status: any = [];
  public ticketId : number = 0;
  public lastmail: any;
    public ticketsub : any = "";
  public disableUpdate = true;
  public existingTicket: any = "";

  public priority : string = "";
  public property_id : any = "";
  public body : any = "";

public TicketCC : any = "";
public GotTicketTemplate : any = "";
public GotTicketGroup : any = "";
public GotTicketStaff : any = "";
public GotTicketPriority : any = "";
public GotTicketProperty : any = "";
public GotTicketStatus : any = "";
public GotTicketVersion : any = "";

  public editpriorityfield: boolean = false;
  public editpropertyfield: boolean = false;
  public editgroupfield: boolean = false;
  public editstafffield: boolean = false;
  public editstatusfield: boolean = false;
  public editccfield: boolean = false;
  public editclassfield: boolean = false;
  public editversionfield: boolean = false;
  public editaccessfield: boolean = false;

	public hideNotified() {
	 	this.hidemeNotified = !this.hidemeNotified;
  }

  private replyticket : FormGroup;

  public formData = new FormData();
  public config : any;
   public accessibleUserIds: any;

  public quillEditorRef;
  public quill: any;
  public toolbarOptions;

  public showSubject : boolean = false;
  public showDescription : boolean = false;
  public showTransaction : boolean = false;
  public showActivity : boolean = false;
  public showEmails : boolean = true;
  public showTasklist : boolean = false;
    public showMessage : boolean = false;
  
  public expandAll:boolean = false;

  public taskcurrentPage = 1;
  public taskpageLimit = 15;
  public tasktotalPages = 0;
  public tasktotalRecords = 0;
  public taskshowSpinner : boolean = true;
  public tasks : any = [];
  public checklists_completed_count = 0;
  public checklists_count = 0;

  public activitycurrentPage = 1;
  public activitypageLimit = 15;
  public activitytotalPages = 0;
  public activitytotalRecords = 0;
  public activityshowSpinner : boolean = true;
  public activities : any = [];

  public showReply: boolean = false;
    public showFields: boolean = false;

      messagehistory: any;
  yesorno: any;
  IsStaffCheck: any;
  public IsStaff : boolean = false;
  constructor(public navCtrl: NavController, 
    private iab: InAppBrowser,
              public service: ServiceProvider, 
              public formBuilder : FormBuilder,
              public navParams: NavParams,
              public storage: StorageProvider,
               public modalCtrl: ModalController,
              public loadingCtrl : LoadingController) {

    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(auth_user_token)
        if(auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
      }else{
        this.IsStaff = true;
      }
        }
          console.log(this.IsStaffCheck);
    });

    this.toolbarOptions = this.service.toolbarOptions;
  	this.config = this.service.ckeImageUploadOptions;
    this.ticketId = this.navParams.get('ticketId');
    this.ticketsub = this.navParams.get('ticketsub');

    this.replyticket = this.formBuilder.group ( {
          priority: ['', Validators.required ],
          property_id: [''],
          body:[''],
          id:['']
        })
    this.replyticket.patchValue({ id : this.ticketId })
this.getAccess();
  }
   getAccess() {

   try {

     this.service.hasAccess(this.ticketId, this.ticket.assigned_to_staff).then( (response : any) => {
       console.log( response );
       this.accessibleUserIds = response.totalAccessUsers;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketviewPage');
  }
  gotoMail(){
    console.log(this.ticketData );
    // ticket.created_at 
    // ticket history updated_at_formatted
    // ticketHistory updated_at_formatted
      let TicketMailsmodal = this.modalCtrl.create(TicketMailsPage,{
                from: 'gotoMail',
                ticketData: this.ticketData,
                ticketsub: this.ticketsub,
      });
     TicketMailsmodal.present();
      TicketMailsmodal.onDidDismiss(data=>{ 
this.getTicket();

      })
  }


openSelecttemplate(field){
  // let content: any = {
  //        field: field,
  //        list: '',
  //        selectedField : ''
  //      }
      console.log(this.TicketAccessSelected);
         this.contentfield = {
         field: field,
         list: this.accessuser,
         selectedField : this.TicketAccessSelected
       }
// console.log(content);
      let searchmodal = this.modalCtrl.create(SearchableModalPage, {content: this.contentfield}, {cssClass: 'template-modal' });
          searchmodal.present({animate: false});
          searchmodal.onDidDismiss(data=>{ 
          console.log(data);
          if (data) {

              this.accessibleUserIds = null;
              console.log(data.selectedTemplate);
                setTimeout(() => {
                  this.accessibleUserIds = data.selectedTemplate;
                }, 100);
              
              this.TicketAccessSelected = data.selectedTemplate;

          }
      })
    }

  gotoActivity(){
      let textmessagemodal = this.modalCtrl.create(TicketActivityPage,{
                        ticketData: this.ticketData,
                        ticketsub: this.ticketsub,
                        activities: this.activities,
      });
     textmessagemodal.present();
      textmessagemodal.onDidDismiss(data=>{ 


      });
  }
gotoTextmsg(){

      let textmessagemodal = this.modalCtrl.create(MessageDetailsPage,{
        msgId: '34523',
        customerName: 'Krishna Regupathy',
        smsFrom: '5037996213',
        customerAvatar: '',
      });
     textmessagemodal.present();
      textmessagemodal.onDidDismiss(data=>{ 


      })
}
viewdoc(link){
this.iab.create(link+"?token=dHJhbnomob", "_system", "beforeload=yes");
}
  handleClick(event) {
    if (event.target.tagName == "A") { 
this.iab.create(event.target.href+"?token=dHJhbnomob", "_system", "beforeload=yes");
    }
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter TicketsPage');
    this.clearAndGetTicket();
    this.service.getFcmToken("Tickets View : "+ this.ticketId);
    this.service.watchFcmNotifications()
  }

  ecAll() {
    if(this.expandAll) {
        this.showSubject = this.showActivity = this.showEmails = this.showTasklist = false;
    } else {
        this.showSubject = this.showActivity = this.showEmails = this.showTasklist = true;
    }
    this.expandAll = this.expandAll ? false : true;
  }
  toggleShowHide(type) {
    if(type == 'subject') {
       this.showSubject = (this.showSubject) ? false : true;
    }
    if(type == 'transaction') {
       this.showTransaction = (this.showTransaction) ? false : true;
    }
    if(type == 'description') {
       this.showDescription = (this.showDescription) ? false : true;
    }
    if(type == 'activity') {
       this.showActivity = (this.showActivity) ? false : true;
    }
    if(type == 'emails') {
       this.showEmails = (this.showEmails) ? false : true;
    }
    if(type == 'tasklist') {
       this.showTasklist = (this.showTasklist) ? false : true;
    }
    if(type == 'message') {
       this.showMessage = (this.showMessage) ? false : true;
    }
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
 
 clearAndGetTicket() {
   this.ticket = '' ;
   this.editpropertyfield = this.editpriorityfield = false;

   this.disableUpdate = true;
   this.properties = [];
   this.priorities = [];
   this.customer = "";
   // this.getTicket3();
   this.getTicket();
   this.getTicket2();
 //  this.getticketold();
 }

 getTicket() {
    
   try {
     this.service.ticket(this.ticketId).then( (response : any) => {
       console.log('viewticket');
       console.log(response);
       this.ticketDataOption = response.replydata;
       this.ticketData = response.data;
       this.ticket = response.data.ticket;
       this.ticketHistory = response.data.ticket.ticket_histories;
       let l=this.ticketHistory[this.ticketHistory.length-1];  
       this.lastmail = l;
       console.log(this.lastmail);
       this.properties = response.data.properties;
       this.priorities = response.data.priorities;
       this.groups = response.replydata.groups;
       this.status = response.replydata.status;
       this.customer = this.ticket.customer
       this.updateProgress(this.ticket.checklist_count_percentage);
       this.property_id = this.ticket.property_id;
       this.priority = this.ticket.priority;
       this.body = response.data.signature;
       this.showSpinner = false;
      
       this.clearAndGetTasks();
       this.clearAndGetActivities();

     }).catch( error => {
         this.showSpinner = false;
         console.log(error);
     })
   } catch(e) {
     this.showSpinner = false;
        this.service.serverError();
    }

   }

    getTicket2() {
    
   try {
     this.service.ticket2(this.ticketId).then( (response : any) => {
       console.log('viewticketAlter');
       console.log(response);
       this.notifyuser = response.data.ticketHistories;
       this.accessuser = response.data.accessibleUsers;
       
       

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
    getTicket3() {
    
   try {
     this.service.ticket3(this.ticketId).then( (response : any) => {
       console.log('viewticketAlter2');
       console.log(response);

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
   // ticketold
       getticketold() {
    
   try {
     this.service.ticketold(this.ticketId).then( (response : any) => {
       console.log('ticketold');
       console.log(response);

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
  // id, fname, lname, phone, num
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
        this.gotoTextMessagecreate(this.messagehistory, fname+' '+lname, num, '', this.yesorno, id );
         } ).catch( error => {
           console.log("error", JSON.stringify(error) );
           // this.service.toast(error.error.message, 3000, 'middle');
         } );
}
gotoTextMessagecreate(idd, customer_name, sms_from, customer_avatar, yesorno, uid){
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

  gotoreply(){
    console.log(this.ticketData);
      let TicketMailsmodal = this.modalCtrl.create(TicketMailsPage,{
                from: 'gotoreply',
                ticketData: this.ticketData,
                ticketsub: this.ticketsub,
                ticketDataOption: this.ticketDataOption,
                notifyuser: this.notifyuser
      });
     TicketMailsmodal.present();
      TicketMailsmodal.onDidDismiss(data=>{ 
this.getTicket();
console.log(data);
// this.GotTicketTemplate = data.GotTicketTemplate;
// this.GotTicketGroup = data.GotTicketGroup;
// this.GotTicketStaff = data.GotTicketStaff;
// this.GotTicketPriority = data.GotTicketPriority;
// this.GotTicketProperty = data.GotTicketProperty;
// this.GotTicketStatus = data.GotTicketStatus;
// this.GotTicketVersion = data.GotTicketVersion;
// this.body = data.body;
      })
  }

 reply() {
   try {
    this.service.showload();
    this.formData.append('group', this.GotTicketGroup);
    this.formData.append('staff', this.GotTicketStaff);
    this.formData.append('priority', this.GotTicketPriority);
    this.formData.append('property_id', this.GotTicketProperty);
    this.formData.append('status', this.GotTicketStatus);
    this.formData.append('version', this.GotTicketVersion);
    this.formData.append('body', this.body);
    this.formData.append('id', this.ticket.id);
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
       this.showSpinner = false;
        this.service.serverError();
        this.service.loading.dismiss();
    }
 }

 updateTicket(notif) {
  this.showSpinner = true;
   let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loading.present();
    if (notif == 'no') {
      this.ticket['notify'] = 'no';
    }else{
      this.ticket['notify'] = 'notify';
    }
    this.ticket.cc_emails = this.TicketCC;
    console.log(this.ticket);

    this.service.updateTicket(this.ticket, this.accessibleUserIds).then( (response : any) => {
        console.log(response);

this.editpropertyfield = false;
this.editpriorityfield = false;
this.editstafffield = false;
this.editgroupfield = false;
this.editstatusfield = false;
this.editccfield = false;
this.editclassfield = false;
this.editversionfield = false;
this.editaccessfield = false;
       loading.dismiss();
       this.clearAndGetTicket();
      // this.showSpinner = false;

     }).catch( error => {
        loading.dismiss();
       this.showSpinner = false;
         console.log(error);
     }) 
 }

 updateChecklistStatus(checklist) {
   if(checklist.is_completed == 0) {
       checklist.is_completed = 1;
   } else {
     checklist.is_completed = 0;
   }
   let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loading.present();
    this.service.updateChecklist(this.ticketId, checklist).then( (response : any) => {
       loading.dismiss();
       this.clearAndGetTicket();
     }).catch( error => {
        loading.dismiss();
         console.log(error);
     }) 
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

  toggleEmail(activity) {
      if(activity.activity_checked) {
        activity.activity_checked = false;
      } else {
        activity.activity_checked = true;
      }
  }

  toggleFields() {
      if(this.toggleUpdateFields) {
      	this.toggleUpdateFields = false;
      } else {
      	this.toggleUpdateFields = true;
      }
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
  this.workoutProgress = (val) + '%';
  }

  enableDisableStatus() {
    this.disableUpdate = false;
  }

  doRefresh(refresher) {
          console.log('Begin async operation', refresher);
          this.clearAndGetTicket();
          setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
  }

  toggleTopHeaderUpdate(type) {
    console.log(type)
    if(type == 'property') {
        this.editpropertyfield = (this.editpropertyfield) ? false : true; 
    } else if(type == 'priority') {
      this.editpriorityfield = (this.editpriorityfield) ? false : true; 
    } else if(type == 'staff') {
      this.editstafffield = (this.editstafffield) ? false : true; 
    } else if(type == 'group') {
      this.editgroupfield = (this.editgroupfield) ? false : true; 
    } else if(type == 'status') {
      this.editstatusfield = (this.editstatusfield) ? false : true; 
    } else if(type == 'cc') {
      this.editccfield = (this.editccfield) ? false : true; 
    } else if(type == 'class') {
      this.editclassfield = (this.editclassfield) ? false : true; 
    } else if(type == 'version') {
      this.editversionfield = (this.editversionfield) ? false : true; 
    } else if(type == 'access') {
      this.editaccessfield = (this.editaccessfield) ? false : true; 
    }else{

    }
    // editstatusfield
    console.log(this.editpropertyfield)
  }
back(){
  //TicketsPage
   this.shownavbar = false;
   this.navCtrl.pop(); 
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

   //Tasks Start
  clearAndGetTasks() {
   this.taskcurrentPage = 1;
   this.tasks = [];
   this.getTasks(); 
 } 

 getTasks() {
   try {
     this.taskshowSpinner = true;
     this.service.tasks(this.taskcurrentPage, { ticket : this.ticket.id }, 'all').then( (response : any) => {
       console.log(response);
       console.log(response.data); 
       this.tasks = response.data;
       this.tasktotalPages = response.totalPages;
       this.tasktotalRecords = response.totalRecords;
       this.taskshowSpinner = false;
       this.checklists_count = response.checklists_count;
       this.checklists_completed_count  = response.checklists_completed_count;
       this.updateProgress(response.checklist_count_percentage);
     }).catch( error => {
         this.taskshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.taskshowSpinner = false;
        this.service.serverError();
    }
 }

 loadMoreTasks() {
   try {
      
     if(this.taskcurrentPage <= this.tasktotalPages)
     {
        this.taskshowSpinner = true;
       this.taskcurrentPage++;
       this.service.tasks(this.taskcurrentPage, { ticket : this.ticket.id }, 'all').then( (response : any) => {
         console.log( response )
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.tasks.push(item);
            });
           this.taskshowSpinner = false;
       }).catch( error => {
           this.taskshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.taskshowSpinner = false;
        this.service.serverError();
   }
 } 
  //Tasks End

  //ActivitiesStart
  clearAndGetActivities() {
     this.activitycurrentPage = 1;
     this.activities = [];
     this.getActivities();
  }
  getActivities() {
   try {
     this.activityshowSpinner = true;
     this.service.ticketactivities(this.ticket.id, this.activitycurrentPage).then( (response : any) => {
       console.log( response )
       this.activities = response.data;
       this.activitytotalPages = response.totalPages;
       this.activitytotalRecords = response.totalRecords;
       this.activityshowSpinner = false;
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
// var reduceHeight = height - 477;
var reduceHeight = height - 500;

var $p = $('.full-details .desc');
var divh = $('.full-details .desc').height();
console.log($p.outerHeight());
console.log(reduceHeight);
  // $('#dynamicdesc').each(function(){
  //   console.log($(this).height());
  //   console.log($(this)[0].scrollHeight);
  //   if($(this).height() <  $(this)[0].scrollHeight){
  //     $(this).parent().find(".txtcol").show();
  //     $(this).toggleClass("truncate");
  //   }
  // });
      var el = document.getElementById('dynamicdesc');
    var wordArray = el.innerHTML.split(' ');
    console.log(wordArray);
        //     wordArray.pop();
        // el.innerHTML = wordArray.join(' ') + '...';
    while($p.outerHeight() > reduceHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }

 // while ($p.outerHeight() > reduceHeight) {
 //   $('.full-details .contentarea-acc-panel .desc').css('height',reduceHeight);
 //    // $p.text(function (index, text) {
 //    //     return text.replace(/\W*\s(\S)*$/, '...');
 //    // });
 // }

console.log('height');
console.log(height);
     }).catch( error => { 
         this.activityshowSpinner = false; 
         console.log(error);
     })
   } catch(e) {
     this.activityshowSpinner = false;
     this.service.serverError();
    }
 }

 loadMoreActivites() {
    try {
     if(this.activitycurrentPage <= this.activitytotalPages)
     {
       this.activitycurrentPage++;
       this.activityshowSpinner = true;
       this.service.ticketactivities(this.ticket.id, this.activitycurrentPage).then( (response : any) => {
         console.log( response );
         var nextTickets = response.data;
           nextTickets.forEach((item, index) => {
                //console.log(item); // 9, 2, 5
                this.activities.push(item);
            });

          this.activityshowSpinner = false;

       }).catch( error => {
           this.activityshowSpinner = false;
           console.log(error);
       })
    }
   } catch(e) { 
     this.activityshowSpinner = false;
        this.service.serverError();
   }

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

  //ActivitiesEnd
 

}
