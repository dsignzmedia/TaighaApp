import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { TicketsPage } from '../../pages/tickets/tickets';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SearchableModalPage } from '../../pages/searchable-modal/searchable-modal'; 

/**
 * Generated class for the NewticketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newtickets',
  templateUrl: 'newtickets.html',
})
export class NewticketsPage {

  urls = new Array<string>();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  
  public formData = new FormData();
  public options : Object;
  public priorities: any = "";
  public properties: any = "";
  public status: any = "";
  public ticketclass: any = "";
  public selectedTemplate: any = "";

public accessibleUsers: any = "";
public templates: any = "";
public customers: any = "";
public tickettypes: any = "";
public groups: any = "";
public list: any = "";
public partners: any = "";
public users: any = "";

public content: any = "";

  public showSpinner: boolean = false;
  public showProperty: boolean = true;
  public showClassVersion: boolean = false;
  public showPartner: boolean = false;
  public showCC: boolean = true;
  private ticket : FormGroup;
  public priority : string = "";
  public subject : string = "";
  public property_id : any = "";
  public body : any = "";
  public signature : any = "";
  public forvalidate : any = "";


public TicketTemplate: any = "";
public TicketType: any = "customer";
public TicketPriority: any = "low";
public TicketStatus: any = "open";
public TicketGroup: any = "";
  public TicketGroupSelected: any = "";
  public TicketStaffSelected: any = "";
public TicketCustomerSelected: any = "";
public TicketPropertySelected: any = "";
public TicketTemplateSelected: any = "";
public TicketPartnerSelected: any = "";
public TicketAccessSelected: any = "";
public TicketStaff: any = "";
public TicketCustomer: any = "";
public TicketProperty: any = "";
public TicketCC: any = "";
public TicketClass: any = "";
public TicketVersion: any = "";
public TicketAccess: any = "";
public TicketSubject: any = "";
public TicketPartner: any = "";
filtered: any;
allData = []; 
filterData = [];
  public config : any;
  public quillEditorRef;
  public quill: any;

  public toolbarOptions;

  constructor(public navCtrl: NavController, 
  			  public service: ServiceProvider, 
  			  public storage: StorageProvider,
  			  public formBuilder : FormBuilder,
          public modalCtrl: ModalController,
          public loadingCtrl: LoadingController,
  			  public navParams: NavParams) {
  	this.ticket = this.formBuilder.group ( {
          priority: ['', Validators.required ],
          property_id: [''],
          subject: ['', Validators.required ],
          body:['']
        })
    this.config = this.service.ckeImageUploadOptions;
    this.toolbarOptions = this.service.toolbarOptionsTicket;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewticketsPage');
     this.clearAndGetOptions();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TicketsPage');
    
   
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

openSelecttemplate(field){
  // let content: any = {
  //        field: field,
  //        list: '',
  //        selectedField : ''
  //      }
     //  console.log(content);
  if (field == 'group') {
         this.content = {
         field: field,
         list: this.groups,
         selectedField : this.TicketGroupSelected
       }
  }else if (field == 'staff') {
         this.content = {
         field: field,
         list: this.users,
         selectedField : this.TicketStaffSelected
       }
  }else if (field == 'customer') {
         this.content = {
         field: field,
         list: this.customers,
         selectedField : this.TicketCustomerSelected
       }
  }else if (field == 'property') {
         this.content = {
         field: field,
         list: this.properties,
         selectedField : this.TicketPropertySelected
       }
  }else if (field == 'template') {
         this.content = {
         field: field,
         list: this.templates,
         selectedField : this.TicketTemplateSelected
       }
  }else if (field == 'partner') {
         this.content = {
         field: field,
         list: this.partners,
         selectedField : this.TicketPartnerSelected
       }
  }else{
    //  (field == 'access') 
         this.content = {
         field: field,
         list: this.accessibleUsers,
         selectedField : this.TicketAccessSelected
       }
  }
// console.log(content);
      let searchmodal = this.modalCtrl.create(SearchableModalPage, {content: this.content}, {cssClass: 'template-modal' });
          searchmodal.present({animate: false});
          searchmodal.onDidDismiss(data=>{ 
          console.log(data);
          if (data) {
            if (data.fieldInput == 'group') {
              this.TicketGroup = data.selectedTemplate;
              this.TicketGroupSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'staff') {
              this.TicketStaff = data.selectedTemplate;
              this.TicketStaffSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'customer') {
              this.TicketCustomer = data.selectedTemplate;
              this.TicketCustomerSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'property') {
              this.TicketProperty = data.selectedTemplate;
              this.TicketPropertySelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'template') {
              this.TicketTemplate = data.selectedTemplate;
              this.TicketTemplateSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'partner') {
              this.TicketPartner = data.selectedTemplate;
              this.TicketPartnerSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'access') {
              // console.log( this.list);
              // this.accessibleUsers = this.list;
              // $('.access-select .select-text').css('display','none');
              this.TicketAccess = null;
              console.log(data.selectedTemplate);
                setTimeout(() => {
                  this.TicketAccess = data.selectedTemplate;
                }, 100);
              
              this.TicketAccessSelected = data.selectedTemplate;
            }
          }
      })
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


  clearAndGetOptions() {
    this.service.showload();
	  	try {
	 		this.showSpinner = true;
	 		this.service.ticketcreate().then( (response : any) => {
         this.showSpinner = false;
         this.service.loading.dismiss();
		   	this.priorities = response.data.priorities;
		   	this.properties = response.data.properties;
         this.status = response.data.status;

         this.ticketclass = response.data.ticketclass;
        // this.accessibleUsers = response.data.accessibleUsers;
         this.accessibleUsers = response.data.allaccessibleUsers;
         //allaccessibleUsers
         this.tickettypes = response.data.tickettypes;
         this.templates = response.data.template;
         this.customers = response.data.customers;
         this.groups = response.data.groups;
         this.partners = response.data.partners;
         this.users = response.data.users;
		   	console.log(response);
		   	this.body = response.data.signature ;
        this.signature = response.data.signature ;

		   }).catch( error => {
		   		this.showSpinner = false;
           this.service.loading.dismiss();
		   		console.log(error);
		   })
	 	} catch(e) {
	 		this.showSpinner = false;
	        this.service.serverError();
	    }
  }

  back() {
  	// this.navCtrl.push(TicketsPage);    
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
 
changeTemplate(){
  console.log(this.templates);
  console.log(this.TicketTemplate);

var lists = this.templates.filter(x => {
  return x.id == this.TicketTemplate;
})
console.log(lists);

// assigned_to_staff: "0" #####
// bcc: null
// body: null  ######
// cc: null   #####
// created_at: "2018-08-16 09:28:57"
// customer_id: "0"  #####
// group_id: "0"  ######
// has_deleted: "0"
// id: 11
// partner_id: "0"  ######
// property_id: "0"  ######
// subject: null ########
// template_order: "0"
// template_type: "tickets"
// ticket_priority: "low" ######
// ticket_type: "customer" ######
// title: "Demo Ticket"  
// updated_at: "2018-08-16 09:28:57"
// updated_by: "0"
this.selectedTemplate = lists[0];
console.log(this.selectedTemplate);

this.TicketPriority = this.selectedTemplate.ticket_priority;
if (this.selectedTemplate.ticket_type == null) {
  this.TicketType = 'customer';
}else{
  this.TicketType = this.selectedTemplate.ticket_type;
}
this.TicketSubject = this.selectedTemplate.subject;
// this.TicketStaff = this.selectedTemplate.assigned_to_staff;
this.body = this.selectedTemplate.body;
this.TicketCC = this.selectedTemplate.cc;
this.TicketCustomer = this.selectedTemplate.customer_id;
this.TicketGroup = this.selectedTemplate.group_id;
this.TicketPartner = this.selectedTemplate.partner_id;
this.TicketProperty = this.selectedTemplate.property_id;

if (this.selectedTemplate.body == null) {
  this.body = '';
}else{
  this.body = this.selectedTemplate.body;
}
  this.body += '\n';
  this.body += this.signature;
  console.log(this.body);
// this.signature 
// this.TicketTemplate = this.selectedTemplate.template_type;

}
changeTicketType(){
  console.log(this.TicketType);
  if (this.TicketType == 'internal') {
    this.showClassVersion = true;
    this.showPartner = false;
    this.showCC = true;
  } else if(this.TicketType == 'partner'){
    this.showPartner = true;
    this.showClassVersion = true;
    this.showCC = true;
  } else if(this.TicketType == 'task'){
    this.showClassVersion = true;
    this.showPartner = false;
    this.showCC = false;
  }else{
    this.showPartner = false;
    this.showClassVersion = false;
    this.showCC = true;
  }


}

changeGroup(){
  console.log(this.TicketGroup);
  this.formData.append('group_id', this.TicketGroup);
    this.service.getgroupuser(this.formData).then( (response : any) => {
            console.log(response);
            this.users = response.data.user;
          } ).catch( (e : any) => { 
            console.log(e);
          });
}

changeCustomer(){
  // showProperty
  console.log(this.TicketCustomer);
  this.formData.append('customer_id', this.TicketCustomer);
    this.service.getcustomer(this.formData).then( (response : any) => {
            console.log(response);
            
            this.properties = response.data.properties;
            if (this.properties.length == 0) {
              this.showProperty = true;
            }else{
              if (this.properties[0].address == null) {
                this.showProperty = true;
              }else{
              this.showProperty = false;
              }
            }
          } ).catch( (e : any) => { 
            console.log(e);
          });
}



  storeTicket() {
    console.log(this.TicketType);

  console.log(this.TicketSubject);	
if ( (this.TicketType == '') || (this.TicketPriority == '') || (this.TicketStatus == '') || (this.TicketGroup == '') || (this.TicketStaff == '') || (this.TicketSubject == '') ) {
  this.service.toast('Please fill all required fields', 2000, 'middle');
  this.service.loading.dismiss();
}else{
  this.service.showload();
  this.formData.append('TicketType', this.TicketType);
this.formData.append('TicketPriority', this.TicketPriority);
this.formData.append('TicketStatus', this.TicketStatus);
this.formData.append('TicketGroup', this.TicketGroup);
this.formData.append('TicketStaff', this.TicketStaff);
this.formData.append('TicketCustomer', this.TicketCustomer);
this.formData.append('partner_id', this.TicketPartner);
this.formData.append('TicketProperty', this.TicketProperty);
this.formData.append('TicketCC', this.TicketCC);
this.formData.append('TicketClass', this.TicketClass);
this.formData.append('TicketVersion', this.TicketVersion);
this.formData.append('accessible_users', this.TicketAccess);
this.formData.append('TicketSubject', this.TicketSubject);
this.formData.append('body', this.body);
console.log(this.TicketType);
console.log(this.TicketPriority);
console.log(this.TicketStatus);
console.log(this.TicketGroup);
console.log(this.TicketStaff);
console.log(this.TicketCustomer);
console.log(this.TicketPartner);
console.log(this.TicketProperty);
console.log(this.TicketCC);
console.log(this.TicketClass);
console.log(this.TicketVersion);
console.log(this.TicketAccess);
console.log(this.TicketSubject);

    if (this.TicketType == 'customer') {
      console.log('this.TicketType == customer');
      if (this.TicketCustomer == 0 || this.TicketCustomer == '') {
        console.log('this.TicketType == empt');
        this.service.toast('Please fill all required fields', 3000, 'middle');
      }else{
        console.log('this.TicketType == empt else');
    this.service.ticketstore(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.service.toast('Ticket Created Successfully', 1500, 'middle');
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
      }
      
    }else if(this.TicketType == 'partner'){

        if (this.TicketPartner == 0 || this.TicketPartner == ''  || this.TicketPartner == null ) {
             
             this.service.toast('Please fill all required fields', 3000, 'middle');
        }else{
    this.service.ticketstore(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.service.toast('Ticket Created Successfully', 1500, 'middle');
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
        }


    }else{
      console.log('this.TicketType == customer else');
    this.service.ticketstore(this.formData).then( (response : any) => {
            console.log(JSON.stringify(response));
            this.service.loading.dismiss();
            this.service.toast('Ticket Created Successfully', 1500, 'middle');
            this.navCtrl.pop();
          } ).catch( (e : any) => { 
            console.log(e);
            console.log(JSON.stringify(e));
            this.service.loading.dismiss();
            this.service.toast(e.error.message, 3000, 'middle');
          });
    }

}
 this.service.loading.dismiss();

  }

  goBack() {
    this.navCtrl.pop();
  }


}
