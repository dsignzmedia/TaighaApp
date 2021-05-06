import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { StorageProvider } from '../../../providers/storage/storage';

/**
 * Generated class for the EditChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-choose',
  templateUrl: 'edit-choose.html',
})
export class EditChoosePage {
data: any;
showEdit: string = 'none';
showShare: string = 'none';
showSave: string = 'none';
searchname: any;
searchmail: any;
saveSearchurl: any;
updatesearchid: any;
updatesearchname: any;
updatesearchmail: any;
public createurl:any = [];
status0: any;
status1: any;
status2: any;
status3: any;
rechanged: any;
public updatesearch:any = [];
public rolelist : any = [];
public grouplist : any = [];
public typelist : any = [];
public userslist : any = [];
public userslistsearch : any = [];
public filteruserslist : any = [];
public savedsearch : any = [];
typevalue: string = '';
rolevalue: string = 'all';
cardComment: any;
public hasEmailVerified : boolean = false;
public isDisabled: boolean = false;
IsStaffCheck: any;
public showSpinner : boolean = true;
public showGroups : boolean = true;
public showcardshare : boolean = true;
public showuserlist : boolean = true;
public showbtn: boolean = true;
public userarray:Array<string> = new Array();
public notifyarray:Array<string> = new Array();
userarraycomma :any = [];
notifyarraycomma: any = [];
multiplproperty: any = [];
multiaddress: any = [];
multiaddressstring: any;
searchTermuser: any;
searchTermtag: any;
notification: string = '';
public searchTerm: string = "";
public showmultiaddress : boolean = false;
  constructor(public storage : StorageProvider, public alertCtrl: AlertController, public viewCtrl: ViewController,  public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.isDisabled = false; 
  	this.data = this.navParams.data.Requestdata;
    if (this.navParams.data.saveSearchurl) {
     this.saveSearchurl = this.navParams.data.saveSearchurl;
    }else{
      this.saveSearchurl = '';
    }
     this.updatesearch = this.navParams.data.updatesearch;
     if (this.navParams.data.multiaddress) {
this.multiaddress = this.navParams.data.multiaddress;
        var multiarr = this.multiaddress.filter(function(entry) { return entry.trim() != ''; });
        multiarr.forEach((val, index) => multiarr[index] = index+1 +'. '+ val);
        this.multiaddressstring = multiarr.toString();
        this.showmultiaddress = true;
     }else{
        this.showmultiaddress = false;
       this.multiaddress = [];
     }
     if (this.navParams.data.multiplproperty) {
this.multiplproperty = this.navParams.data.multiplproperty;
        var multiarr = this.multiplproperty.filter(function(entry) { return entry.trim() != ''; });
   this.data = multiarr.toString();
     }else{
       this.multiplproperty = [];
     }
     if (this.navParams.data.updatesearch) {
       this.updatesearch = this.navParams.data.updatesearch;
this.updatesearchid = this.updatesearch.searchId ;
this.updatesearchname = this.updatesearch.searchName ;
this.updatesearchmail = this.updatesearch.searchnotify ;
     }else{
       this.updatesearch = '';
this.updatesearchid = '' ;
this.updatesearchname = '';
this.updatesearchmail = '';
     }
     if (this.navParams.data.forshare) {
     this.savedsearch = this.navParams.data.forshare;
     this.showcardshare = false;
     }else{
       this.showcardshare = true;
     this.savedsearch = [];
     }
	if (this.data == 'edit') {
    	this.showEdit = 'flex';
	}else if (this.data == 'save'){
     this.showSave = 'flex';
  }else{
        this.showShare = 'flex';
	}
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.typevalue = 'staff';
        this.showGroups =  true;
      }else{
        this.typevalue = 'customer';
        this.showGroups = false;
      }
       let urlPara: any = {
         typevalue: this.typevalue,
         rolevalue: 'all',
       }
       this.service.getModalUser(urlPara).then( (response : any) => {
         this.userslist = response.data.users; 
         this.showSpinner = false;  
       }).catch( error => {
       })
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
    });
this.getroles();
  }
  userselectall(){
    setTimeout(()=>{
      this.userslist.forEach(obj => {
        obj.usercheck = true;
      });
    });
    Object.keys(this.userslist).forEach(key => {
  let value = this.userslist[key];
       let idx = this.userarray.indexOf(value.id);
    if (idx > -1) {
    } else {
      this.userarray.push(value.id);
    }
   });
  }
    userdeselectall(){
    setTimeout(()=>{
      this.userslist.forEach(obj => {
        obj.usercheck = false;
      });
    });
    this.userarray = [];
  }
getroles(){
     try {
       let urlPara: any = {
         searchTearm: 'test'
       }
       this.service.getRoles(urlPara).then( (response : any) => {
         console.log(response);
         this.rolelist = response.data.roles;  
         this.typelist = response.data.types;  
         this.grouplist = response.data.groups;    
       }).catch( error => {
       })
     } catch(e) {
       this.service.serverError();
     }
}
   changeType(){
           if (this.typevalue == 'customer') {
        this.typevalue = 'customer';
        this.showGroups = false;
      }else{
        this.typevalue = 'staff';
        this.showGroups = true;
      }
      this.rolevalue = 'all';
     this.showSpinner = true;
       let urlPara: any = {
         typevalue: this.typevalue,
         rolevalue: this.rolevalue,
       }
       this.service.getModalUser(urlPara).then( (response : any) => {
         this.userslist = response.data.users;  
                  this.showSpinner = false; 
         this.userslistsearch = response.data.users; 
         this.showSpinner = false; 
       }).catch( error => {
       })
   }
   changeRole(){
     this.showSpinner = true;
     console.log(this.rolevalue);
       let urlPara: any = {
         typevalue: this.typevalue,
         rolevalue: this.rolevalue,
       }
       this.service.getModalUser(urlPara).then( (response : any) => { 
         console.log(response);
         this.userslist = response.data.users;  
         this.userslistsearch = response.data.users; 
          this.showSpinner = false;  

       for (var i = 0; i < this.userslist.length; i++) {
      this.userslist[i]['tags'].forEach((item, index) => {
var unq = this.userslist[i]['tags'];
if(this.userslist[i].tags === "" || this.userslist[i].tags === null) {
          unq.push('ignore');
        }
      })
    }
         this.showSpinner = false;  
       }).catch( error => {
         console.log(error);
       })
   }
  protected search = () => {
    this.resetChanges();
    this.userslist = this.userslist.filter((item)=>{
        return item.first_name.toLowerCase().indexOf(this.searchTermuser.toLowerCase())>-1;
    })
};

protected resetChanges = () => {
    this.userslist = this.userslistsearch;
};

  protected searchtag = () => {
    this.resetChanges();
    this.userslist = this.userslist.filter((item)=>{
       if (item.tags && item.tags.trim() != '') {
        return item.tags.toLowerCase().indexOf(this.searchTermtag.toLowerCase())>-1;
      }
    })
};

protected resetChangestag = () => {
    this.userslist = this.userslistsearch;
};

setFilteredItems() : void
{
   let val : string   = this.searchTermuser;
      this.userslist = this.userslist.filter((item) => 
      {
        return item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
}
  setFilteredItemss() {
              const val = this.searchTermuser;
              const fornamefind = this.userslist;
   this.userslist =  fornamefind.filter(user => {
      return user.first_name.toLowerCase().indexOf(this.searchTermuser.toLowerCase()) > -1;
    });
  }

userCheckbox(userid, $event): void {
    let idx = this.userarray.indexOf(userid);
    if (idx > -1) {
      this.userarray.splice(idx, 1);
    } else {
      this.userarray.push(userid);
    }
        var arr = this.userarray.filter(function(entry) { return entry.trim() != ''; });
   this.userarraycomma = arr.toString();
}
notifyCheckbox(notify, $event): void {
this.notification = notify;
    let idx = this.notifyarray.indexOf(notify);
    if (idx > -1) {
      this.notifyarray.splice(idx, 1);
    } else {
      this.notifyarray.push(notify);
    }
        var arr = this.notifyarray.filter(function(entry) { return entry.trim() != ''; });
   this.notifyarraycomma = arr.toString();
}

savedShare(){
this.showbtn = false;
if (this.userarraycomma.length == 0) {
  this.service.toast("Choose at least one recipient", 1500, 'bottom');
}else{
    let urlPara: any = {
      propertyID : this.savedsearch.searchId,
      customerids: this.userarray,
      comments: this.cardComment,
      notification: this.notifyarray
    }
this.service.ShareSaved(urlPara).then( (response : any) => {
this.showSpinner = false;
 this.service.toast("Saved search shared successfully !!!", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
this.showSpinner = false;
})
}

}
cardShare(){
  this.showbtn = false;
if (this.userarraycomma.length == 0) {
  this.service.toast("Choose at least one recipient", 1500, 'bottom');
}else{
  let notifywitharray = JSON.stringify(this.notifyarray);
    let urlPara: any = {
      propertyID : this.data,
      customerids: this.userarray,
      comments: this.cardComment,
      notification: this.notifyarray
    }
this.service.cardShareProperty(urlPara).then( (response : any) => {
this.showSpinner = false;
 this.service.toast("Listings shared successfully !!!", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
this.showSpinner = false;
})
}
}

delete(){
  let alert = this.alertCtrl.create({
    title: 'Please confirm',
    message: 'Are you sure you want to delete?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Delete',
        handler: () => {
       this.service.deletesavedsearch(this.updatesearchid).then( (response : any) => {   
          this.navCtrl.pop();
       }).catch( error => {
       })
        }
      }
    ]
  });
  alert.present();

}

updateSearch(){
 // this.updatesearchid 
        let updateSearchdata: any = {
         searchId: this.updatesearchid,
         searchName: this.updatesearchname,
         searchnotify: this.updatesearchmail
       }
       this.service.updatesavedsearch(updateSearchdata).then( (response : any) => {  
 this.service.toast("Success!!!", 1500, 'bottom');
 this.navCtrl.pop();
       }).catch( error => {
       }) 
}
  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditChoosePage');
  }
dismissModal() {
this.viewCtrl.dismiss();
}
saveSearch(){
  this.isDisabled = true;
  if (this.searchmail == undefined) {
    this.searchmail = 'no email';
  }

var re = 'public/api/auth/home/search/listings'; 
var string = this.saveSearchurl; 
var replaced1 = string.replace(re, 'search'); 
var re2 = 'search-term'; 
var string2 = replaced1; 
var replaced2 = string2.replace(re2, 'existing-tem'); 
var re3 = '&request-type=listings&currentPage=1'; 
var string3 = replaced2; 
var replaced3 = string3.replace(re3, ''); 
this.rechanged = replaced3+"&search-type=zip&zip-search=1";
var url = new URL(this.saveSearchurl);
var beds= url.searchParams.get("beds");
var bath= url.searchParams.get("bath");
var min_price= url.searchParams.get("min_price");
var max_price= url.searchParams.get("max_price");
var sqftmin= url.searchParams.get("sqft-min");
var sqftmax= url.searchParams.get("sqft-max");
var lotsizemin= url.searchParams.get("lotsize-min");
var lotsizemax= url.searchParams.get("lotsize-max");
var openhouse= url.searchParams.get("openhouse");
var price_change= url.searchParams.get("price_change");
var yearbuildmin= url.searchParams.get("yearbuild-min");
var yearbuildmax= url.searchParams.get("yearbuild-max");
var streetname= url.searchParams.get("streetname");
var levels= url.searchParams.get("levels");
var legaldescription= url.searchParams.get("legaldescription");
var elementaryschl= url.searchParams.get("elementaryschl");
var middleschl= url.searchParams.get("middleschl");
var highschl= url.searchParams.get("highschl");
var keywords= url.searchParams.get("keywords");
var listing_agent= url.searchParams.get("listing_agent");
var listing_office= url.searchParams.get("listing_office");
var status= url.searchParams.getAll("status[]");
var pCategories= url.searchParams.getAll("pCategories[]");
var pTypes= url.searchParams.getAll("pTypes[]");
var searchterm = url.searchParams.get("search-term");
var requesttype = url.searchParams.get("request-type");
if (beds) {
  beds = '"'+beds+'"';
}else{
  beds = null;
}
if (bath) {
  bath = '"'+bath+'"';
}else{
  bath = null;
}
if (min_price) {
  min_price = '"'+min_price+'"';
}else{
  min_price = null;
}
if (max_price) {
  max_price = '"'+max_price+'"';
}else{
  max_price = null;
}
if (sqftmin) {
  sqftmin = '"'+sqftmin+'"';
}else{
  sqftmin = null;
}
if (sqftmax) {
  sqftmax = '"'+sqftmax+'"';
}else{
  sqftmax = null;
}
if (lotsizemin) {
  lotsizemin = '"'+lotsizemin+'"';
}else{
  lotsizemin = null;
}
if (lotsizemax) {
  lotsizemax = '"'+lotsizemax+'"';
}else{
  lotsizemax = null;
}
if (openhouse) {
  openhouse = '"'+openhouse+'"';
}else{
  openhouse = null;
}
if (price_change) {
  price_change = '"'+price_change+'"';
}else{
  price_change = null;
}
if (yearbuildmin) {
  yearbuildmin = '"'+yearbuildmin+'"';
}else{
  yearbuildmin = null;
}
if (yearbuildmax) {
  yearbuildmax = '"'+yearbuildmax+'"';
}else{
  yearbuildmax = null;
}
if (streetname) {
  streetname = '"'+streetname+'"';
}else{
  streetname = null;
}
if (levels) {
  levels = '"'+levels+'"';
}else{
  levels = null;
}
if (legaldescription) {
  legaldescription = '"'+legaldescription+'"';
}else{
  legaldescription = null;
}
if (elementaryschl) {
  elementaryschl = '"'+elementaryschl+'"';
}else{
  elementaryschl = null;
}
if (middleschl) {
  middleschl = '"'+middleschl+'"';
}else{
  middleschl = null;
}
if (highschl) {
  highschl = '"'+highschl+'"';
}else{
  highschl = null;
}
if (keywords) {
  keywords = '"'+keywords+'"';
}else{
  keywords = null;
}
if (listing_agent) {
  listing_agent = '"'+listing_agent+'"';
}else{
  listing_agent = null;
}
if (listing_office) {
  listing_office = '"'+listing_office+'"';
}else{
  listing_office = null;
}

       let createurl: any = {
         searchterm: searchterm,
         requesttype : requesttype,
         searchtype: "zip",
         zipsearch : "1",
         beds: beds,
         bath: bath,
         min_price: min_price,
         max_price: max_price,
         sqftmin: sqftmin,
         lotsizemin: lotsizemin,
         lotsizemax: lotsizemax,
         openhouse: openhouse,
         price_change: price_change,
         yearbuildmin: yearbuildmin,
         yearbuildmax: yearbuildmax,
         streetname: streetname,
         levels: levels,
         legaldescription: legaldescription,
         elementaryschl: elementaryschl,
         middleschl: middleschl,
         highschl: highschl,
         keywords: keywords,
         listing_agent: listing_agent,
         listing_office: listing_office,
         status: '['+status+']',
         pCategories: '['+pCategories+']',
         pTypes:'['+pTypes+']'

       }
       let urlPara: any = {
         searchurl: this.rechanged,
         searchname : this.searchname,
         searchmail: this.searchmail,
         param : createurl,
       }
this.service.savesearch(urlPara).then( (response : any) => {
 this.service.toast("Success!!!", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
})

}
}
