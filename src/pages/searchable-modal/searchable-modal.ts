import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SearchableModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-searchable-modal',
  templateUrl: 'searchable-modal.html',
})
export class SearchableModalPage {
searchTerm: string = '';
public content : any = [];
public templates : any = [];
public userslistsearch : any = [];
selectedTemplate : any;
fieldInput: any;
selectedField : any;
TicketAccess: any;
public paraArray : any = [];
selectedArray :any = [];
selectedArray2 :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.content = this.navParams.data.content;
  	console.log(this.content);
  	this.templates = this.content.list;
  	this.userslistsearch = this.content.list;
  	this.fieldInput = this.content.field;
  	this.selectedField = this.content.selectedField;
  	this.selectedTemplate = this.selectedField;
    // for (let i = 0; i < this.templates.length; i++) {
    //         this.selectedCategory.push(
    //               this.templates[i].id
    //             );
    //         }
// var result = this.templates.filter(function(e) {
//   return this.selectedTemplate.every(function(a) {
//      e.push({'checked': 'true'});
//   })
// })

// console.log(result);

    // this.templates.forEach(function(item){
    //       if(item.id === this.selectedTemplate) {
    //   item.checked = true;
    // }
     
    // });

// for(var i = this.templates.length - 1; i >= 0; i--) {
//     if(this.templates[i] === this.selectedField) {
//        cart.push({element: element});
//     }
// }
  // for (var i = 0; i < this.templates.length; i++) {
  //   if (this.templates[i].id == this.selectedTemplate){
  //     this.templates.push({checked: 'true'});
  //   }
  // }
  //   for (var i = 0; i < this.templates.length; i++) {
  //   if (this.templates[i].id == this.selectedTemplate){
  //     this.templates.push({checked: 'true'});
  //   }
  // }
// if(this.selectedTemplate[1] == undefined && a[1][2] == undefined) {
//     // code...
//   }
   console.log(this.templates);
    this.TicketAccess = this.selectedField;
  	 console.log(this.selectedTemplate);
  	 if (this.selectedTemplate) {
  	 	this.selectedArray = this.selectedTemplate;
  	 }

if (this.fieldInput == 'access') {
//      for ( var i=0 ; i< this.templates.length ; i++ ) {
//   console.log(this.selectedField[i].getAttribute("checked"))
// }
    for(let i = 0; i < this.templates.length; i++) {
          
        // Loop for array2
        for(let j = 0; j < this.selectedField.length; j++) {
              
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(this.templates[i].id === this.selectedField[j]) {
                this.templates[i].checked = true;
            }
        }
    }
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchableModalPage');
  }
 //   getAccess() {

 //   try {
 //   //  this.currentPage = 7;
 //   console.log(this.ticket.id);
 //   console.log(this.ticket.assigned_to_staff);
 //     this.service.hasAccess(this.ticket.id, this.ticket.assigned_to_staff).then( (response : any) => {
 //       console.log( response );
 //       this.TicketAccess = response.totalAccessUsers;
 //     }).catch( error => {
 //         console.log(error);
 //     })
 //   } catch(e) {
 //        this.service.serverError();
 //    }
 // }
protected resetChanges = () => {
    this.templates = this.userslistsearch;
};
protected searchtag = () => {
    this.resetChanges();
    if (this.fieldInput == 'group') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.name && item.name.trim() != '') {
	        return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'staff') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.first_name && item.first_name.trim() != '') {
	        return item.first_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'customer') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.first_name && item.first_name.trim() != '') {
	        return item.first_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'property') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.address && item.address.trim() != '') {
	        return item.address.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'template') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.title && item.title.trim() != '') {
	        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'partner') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.first_name && item.first_name.trim() != '') {
	        return item.first_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }
    if (this.fieldInput == 'access') {
	    this.templates = this.templates.filter((item)=>{
	       if (item.first_name && item.first_name.trim() != '') {
	        return item.first_name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
	      }
	    })
    }

};
updateAnswer(check, value, $event): void {
console.log($event);
console.log(check);
console.log(value);
 var ptypes = this.paraArray;
// console.log(ptypes);
 var addedpara = '&pTypes[]='+value;
 if (check == false) {
// var ptypeReplaced = ptypes.replace(addedpara,'');
 }else{
this.paraArray.push(value);
 }
}
selectMember(data){
 // if (data.checked == true) {
 //    this.selectedArray.push(data);
 //  } else {
 //   let newArray = this.selectedArray.filter(function(el) {
 //     return el.id !== data.id;
 //  });
 //   this.selectedArray = newArray;
 // }
 //  console.log(this.selectedArray);
// if (data.checked == true) {
// this.selectedArray.push(data.id);
// }else{

// }
console.log(data);
 console.log(this.selectedTemplate);
 console.log(this.selectedArray);

 const index = this.selectedArray.indexOf(0);
if (index > -1) {
  this.selectedArray.splice(index, 1);
}
     const foundAt = this.selectedArray.indexOf(data.id);
     console.log(foundAt);
     // this.selectedArray.splice(0,1);
// const index = array.indexOf(5);
// if (index > -1) {
//   array.splice(index, 1);
// }

     if (foundAt >= 0) {
        this.selectedArray.splice(foundAt, 1);
     } else {
        this.selectedArray.push(data.id);
    }

    console.log(this.selectedArray);
    this.selectedTemplate = this.selectedArray; 
}

chooseTemplate(){
   console.log(this.selectedTemplate);
     this.viewCtrl.dismiss({
             selectedTemplate : this.selectedTemplate,
             fieldInput : this.content.field
        })
}

goBack(){
	// this.navCtrl.pop();
	this.viewCtrl.dismiss({
	    selectedTemplate : this.selectedTemplate,
	    fieldInput : this.content.field
	})
}

}
