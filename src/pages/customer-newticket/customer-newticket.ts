import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { SearchableModalPage } from '../../pages/searchable-modal/searchable-modal'; 
/**
 * Generated class for the CustomerNewticketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-newticket',
  templateUrl: 'customer-newticket.html',
})
export class CustomerNewticketPage {
  public showSpinner: boolean = false;
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
  public body : any = "";
  public signature : any = "";
  public content: any = "";
 
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
  public config : any;
  public quillEditorRef;
  public quill: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController,) {
 // 	this.clearAndGetOptions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNewticketPage');
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
          searchmodal.present();
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

    back() {
  	// this.navCtrl.push(TicketsPage);    
      this.navCtrl.pop();
  }
  pushImageToEditor(res) {
  const range = this.quill.getSelection(true);
  const index = range.index + range.length;
  this.quill.insertEmbed(range.index, 'image', res.url);
}
storeTicketcustomer(){
	this.service.toast('Create Feature is in process', 1500, 'middle');
}
}
