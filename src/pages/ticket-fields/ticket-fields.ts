import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import { TicketsPage } from '../../pages/tickets/tickets';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SearchableModalPage } from '../../pages/searchable-modal/searchable-modal'; 
/**
 * Generated class for the TicketFieldsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-fields',
  templateUrl: 'ticket-fields.html',
})
export class TicketFieldsPage {
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
public partners: any = "";
public users: any = "";
public body : any = "";
public signature : any = "";

public TicketTemplate: any = "";
public TicketType: any = "customer";
public TicketPriority: any = "";
public TicketStatus: any = "";
public TicketGroup: any = "";
public TicketStaff: any = "";
public TicketCustomer: any = "";
public TicketProperty: any = "";
public TicketCC: any = "";
public TicketClass: any = "";
public TicketVersion: any = "";
public TicketAccess: any = "";
public TicketSubject: any = "";
public TicketPartner: any = "";

public ticket: any = "";

public AllOptions : any = [];
public ticketAllOption : any = [];

public list: any = "";
public TicketGroupSelected: any = "";
public IsStaffCheck: any = "";
  constructor(public navCtrl: NavController, 
          public service: ServiceProvider, 
          public viewCtrl: ViewController,
          public modalCtrl: ModalController,
          public storage: StorageProvider,
          public formBuilder : FormBuilder,
          public loadingCtrl: LoadingController,
          public navParams: NavParams) {
    this.AllOptions = this.navParams.get('templates');
    this.ticket = this.navParams.get('ticket');
    this.ticketAllOption = this.navParams.get('ticketAllOption');
    this.IsStaffCheck = this.navParams.get('IsStaffCheck');
    console.log(this.IsStaffCheck);
    console.log(this.AllOptions);
    console.log(this.ticket);
        console.log(this.ticketAllOption);
    this.priorities = this.AllOptions.priorities ;
    this.templates = this.AllOptions.emailTemplates ;
    this.groups = this.AllOptions.groups ;
    this.properties = this.AllOptions.properties ;
    this.status = this.AllOptions.status ;
    this.users = this.AllOptions.users ;
    this.accessibleUsers = this.ticketAllOption.allaccessibleUsers ;

    this.TicketProperty = this.ticket.property_id;
    this.TicketGroup = this.ticket.assigned_to;
    this.TicketStaff = this.ticket.assigned_to_staff;
    this.TicketPriority = this.ticket.priority;
    this.TicketStatus = this.ticket.status;
    this.TicketClass = this.ticket.class;
    this.TicketVersion = this.ticket.version;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketFieldsPage');
   this.clearAndGetOptions();
    this.getAccess();
  }
   getAccess() {
   // try {
   //   this.service.hasAccess(this.ticket.id).then( (response : any) => {
   //     console.log( response )
   //   }).catch( error => {
   //       console.log(error);
   //   })
   // } catch(e) {
   //      this.service.serverError();
   //  }


//    try {
// this.formData.append('ticketid', this.ticket.id);
//     this.service.hasAccess(this.formData).then( (response : any) => {
//             console.log(response);
//           } ).catch( (e : any) => { 
//             console.log(e);
//           });
//      } catch(e) {
//           this.service.serverError();
//       }


   try {
   //  this.currentPage = 7;
   console.log(this.ticket.id);
   console.log(this.ticket.assigned_to_staff);
     this.service.hasAccess(this.ticket.id, this.ticket.assigned_to_staff).then( (response : any) => {
       console.log( response );
       this.TicketAccess = response.totalAccessUsers;
     }).catch( error => {
         console.log(error);
     })
   } catch(e) {
        this.service.serverError();
    }
 }

goBack(){
  this.navCtrl.pop();
}
  clearAndGetOptions() {
      try {
       this.service.ticketcreate().then( (response : any) => {
          this.priorities = response.data.priorities;
         // this.properties = response.data.properties;
          this.status = response.data.status;
         // this.ticketclass = response.data.ticketclass;
         this.accessibleUsers = response.data.allaccessibleUsers;
         // this.tickettypes = response.data.tickettypes;
         // this.templates = response.data.template;
         // this.customers = response.data.customers;
          this.groups = response.data.groups;
         // this.partners = response.data.partners;
          this.users = response.data.users;
         console.log(response);
        //  this.body = response.data.signature ;
        // this.signature = response.data.signature ;
       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
  }
  changeTemplate(){
var lists = this.templates.filter(x => {
  return x.id == this.TicketTemplate;
})
console.log(lists);
this.selectedTemplate = lists[0];
console.log(this.selectedTemplate);

// this.TicketPriority = this.selectedTemplate.ticket_priority;
// if (this.selectedTemplate.ticket_type == null) {
//   this.TicketType = 'customer';
// }else{
//   this.TicketType = this.selectedTemplate.ticket_type;
// }
// this.TicketSubject = this.selectedTemplate.subject;
// this.TicketStaff = this.selectedTemplate.assigned_to_staff;
this.body = this.selectedTemplate.body;
// this.TicketCC = this.selectedTemplate.cc;
// this.TicketCustomer = this.selectedTemplate.customer_id;
// this.TicketGroup = this.selectedTemplate.group_id;
// this.TicketPartner = this.selectedTemplate.partner_id;
// this.TicketProperty = this.selectedTemplate.property_id;

if (this.selectedTemplate.body == null) {
  this.body = '';
}else{
  this.body = this.selectedTemplate.body;
}
  this.body += '\n';
  this.body += this.signature;
  console.log(this.body);
  }
chooseTemplate(){
   // console.log(this.selectedTemplate);
    console.log(this.TicketTemplate);
    console.log(this.TicketGroup);
    console.log(this.TicketStaff);
    console.log(this.TicketPriority);
    console.log(this.TicketProperty);
    console.log(this.TicketStatus);
    console.log(this.TicketVersion);
    console.log(this.TicketClass);
    console.log(this.TicketAccess);
    console.log('this.body');
    console.log(this.body);
      let choosedTemplate: any = {
         TicketTemplate: this.TicketTemplate,
         TicketGroup: this.TicketGroup,
         TicketStaff: this.TicketStaff,
         TicketPriority: this.TicketPriority,
         TicketProperty: this.TicketProperty,
         TicketStatus: this.TicketStatus,
         TicketVersion: this.TicketVersion
       }
     this.viewCtrl.dismiss({
         GotTicketTemplate: this.TicketTemplate,
         GotTicketGroup: this.TicketGroup,
         GotTicketStaff: this.TicketStaff,
         GotTicketPriority: this.TicketPriority,
         GotTicketProperty: this.TicketProperty,
         GotTicketStatus: this.TicketStatus,
         GotTicketVersion: this.TicketVersion,
         GotTicketAccess: this.TicketAccess,
         GotTicketClass: this.TicketClass,
         body: this.body
        })
}
chooseTemplateCus(){
    console.log(this.TicketPriority);
    console.log(this.TicketProperty);
    console.log(this.TicketCC);
    console.log('this.body');
    console.log(this.body);
     this.viewCtrl.dismiss({
         GotTicketPriority: this.TicketPriority,
         GotTicketProperty: this.TicketProperty,
         GotTicketCC: this.TicketCC,
         body: this.body
        })
}

openSelecttemplate(field){
  if (field == 'group') {
    this.list = this.groups;
  }
  if (field == 'staff') {
    this.list = this.users;
  }
  if (field == 'customer') {
    this.list = this.customers;
  }
  if (field == 'property') {
    this.list = this.properties;
  }
  if (field == 'template') {
    this.list = this.templates;
  }
         let content: any = {
         field: field,
         list: this.list,
         selectedField : this.TicketGroupSelected
       }
      let searchmodal = this.modalCtrl.create(SearchableModalPage, {content: content}, {cssClass: 'template-modal' });
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
              this.TicketGroupSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'customer') {
              this.TicketCustomer = data.selectedTemplate;
              this.TicketGroupSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'property') {
              this.TicketProperty = data.selectedTemplate;
              this.TicketGroupSelected = data.selectedTemplate;
            }
            if (data.fieldInput == 'template') {
              this.TicketTemplate = data.selectedTemplate;
              this.TicketGroupSelected = data.selectedTemplate;
            }
          }
      })
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
}
