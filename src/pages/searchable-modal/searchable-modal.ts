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
  	 console.log(this.selectedTemplate);
  	 if (this.selectedTemplate) {
  	 	this.selectedArray = this.selectedTemplate;
  	 }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchableModalPage');
  }

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
 console.log(this.selectedTemplate);
     const foundAt = this.selectedArray.indexOf(data.id);
     console.log(foundAt);
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
