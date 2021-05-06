import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SelectTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-template',
  templateUrl: 'select-template.html',
})
export class SelectTemplatePage {
    searchTerm: string = '';
    public userslistsearch : any = [];
    public templates : any = [];

    public getuserslistsearch : any = [];
    public gettemplates : any = [];
    selectedTemplate : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
		this.gettemplates = this.navParams.data.templates;
		this.getuserslistsearch = this.navParams.data.templates;
		for(var i = 0; i < this.gettemplates.length; i++){
		    let name = this.gettemplates[i].title.toUpperCase();
		    let body = this.gettemplates[i].body;
		    this.templates.push( {
            title: name, 
            body:  body
            })
            this.userslistsearch.push( {
            title: name, 
            body:  body
            })
		}
		this.templates.sort((a, b) => (a.title > b.title) ? 1 : -1)
		this.userslistsearch.sort((a, b) => (a.title > b.title) ? 1 : -1)
		console.log(this.templates);
  }

ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTemplatePage');
}
goBack(){
	// this.navCtrl.pop();
	this.viewCtrl.dismiss({
	    selectedTemplate : ''
	})
}
protected resetChanges = () => {
    this.templates = this.userslistsearch;
};
protected searchtag = () => {
    this.resetChanges();
    this.templates = this.templates.filter((item)=>{
       if (item.title && item.title.trim() != '') {
        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
      }
    })
};
chooseTemplate(){
   console.log(this.selectedTemplate);
     this.viewCtrl.dismiss({
             selectedTemplate : this.selectedTemplate
        })
}


}
