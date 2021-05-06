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
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.content = this.navParams.data.content;
  	console.log(this.content);
  	this.templates = this.content.list;
  	this.userslistsearch = this.content.list;
  	this.fieldInput = this.content.field;
  	this.selectedField = this.content.selectedField;
  	this.selectedTemplate = this.selectedField;
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

};

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
