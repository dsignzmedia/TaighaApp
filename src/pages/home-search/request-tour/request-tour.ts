import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../../providers/storage/storage';
import { ServiceProvider } from '../../../providers/service/service';

/**
 * Generated class for the RequestTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-request-tour',
  templateUrl: 'request-tour.html',
})
export class RequestTourPage {
data: any;

firstName: any;
lastName: any;
inputemail: any;
phoneNumber: any;
question: any;
propertyID: any;
OfferfirstName: any;
OfferlastName: any;
Offerinputemail: any;
OfferphoneNumber: any;

Offerlegalname : any;
offerprice : any;
offerdown : any;
offerletter : any;
offeramount : any;
offerclosing : any;
startdate: String = new Date().toISOString();
offerproperty : any;
Offercomments : any;
  userid: any;

reqfirstName: any;
reqlastName: any;
reqinputemail: any;
reqphoneNumber: any;
reqTimeframe: any;
reqcomments: any;

showTour: string = 'none';
showQuestion: string = 'none';
showOffer: string = 'none';

showOne: string = 'flex';
showTwo: string = 'none';
showThree: string = 'none';
showLast: string = 'none';

showArrowOne: string = 'none';
showArrowTwo: string = 'block';
showArrowThree: string = 'none';

  public showSpinner : boolean = false;
public reqDateArray:Array<string> = new Array('','','','','','','','','','','','','','','','','',''); //21

public reqDateArrayall: any = "";
fdate1TF : boolean = false;
fdate2TF : boolean = false;
fdate3TF : boolean = false;
fdate4TF : boolean = false;
fdate5TF : boolean = false;
fdate6TF : boolean = false;
fdate7TF : boolean = false;
fdate8TF : boolean = false;
fdate9TF : boolean = false;
fdate10TF : boolean = false;
fdate11TF : boolean = false;
fdate12TF : boolean = false;
fdate13TF : boolean = false;
fdate14TF : boolean = false;
fdate15TF : boolean = false;
fdate16TF : boolean = false;
fdate17TF : boolean = false;
fdate18TF : boolean = false;
day1: any;
month1: any;
date1: any;
fdate1: any;

day2: any;
month2: any;
date2: any;
fdate2: any;

day3: any;
month3: any;
date3: any;
fdate3: any;

day4: any;
month4: any;
date4: any;
fdate4: any;

day5: any;
month5: any;
date5: any;
fdate5: any;

day6: any;
month6: any;
date6: any;
fdate6: any;

day7: any;
month7: any;
date7: any;
fdate7: any;

day8: any;
month8: any;
date8: any;
fdate8: any;

day9: any;
month9: any;
date9: any;
fdate9: any;

day10: any;
month10: any;
date10: any;
fdate10: any;


day11: any;
month11: any;
date11: any;
fdate11: any;

day12: any;
month12: any;
date12: any;
fdate12: any;

day13: any;
month13: any;
date13: any;
fdate13: any;

day14: any;
month14: any;
date14: any;
fdate14: any;

day15: any;
month15: any;
date15: any;
fdate15: any;

day16: any;
month16: any;
date16: any;
fdate16: any;

day17: any;
month17: any;
date17: any;
fdate17: any;

day18: any;
month18: any;
date18: any;
fdate18: any;

useremail: any;


  public user: any = "";
  constructor(public storage : StorageProvider, public navCtrl: NavController, public service: ServiceProvider,public navParams: NavParams) {
  	 this.data = this.navParams.data.Requestdata;
    this.storage.getStorage('customerstorage').then((customerstorage: any) => {
       if(customerstorage) {
            console.log(customerstorage);
            this.useremail = customerstorage.email;
            console.log(this.useremail);
        }
     });
       this.service.profile().then( (response : any) => {
         if (response == undefined) {
           this.userid = 0;
         }else{
           this.userid = response.data.id;
         }
       }).catch( error => {
         this.userid = '0';
       })
     if (this.navParams.data.propertyID) {
       this.propertyID = this.navParams.data.propertyID;
     }else{
       this.propertyID = '' ;
     }
	if (this.data == 'tour') {
    	this.showTour = 'block';
	} else if (this.data == 'offer') {
        this.showOffer = 'block';
	}else{
        this.showQuestion = 'block';
	}
  	this.getProfile();


var day = new Date();
let weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var Fordate = new Date();
var date = Fordate.getDate();
var cday = Fordate.getDate();
var cmonth = Fordate.getMonth() + 1;
var cyear = Fordate.getFullYear();
this.day1 = weekdays[day.getDay()];
this.month1 = month[day.getMonth()];
this.date1 = Fordate.getDate();
this.fdate1 = cmonth+"-"+cday+"-"+cyear;
var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 1);
var cday2 = nextDay.getDate();
var cmonth2 = nextDay.getMonth() + 1;
var cyear2 = nextDay.getFullYear();
this.day2 = weekdays[nextDay.getDay()];
this.month2 = month[nextDay.getMonth()];
this.date2 = nextDay.getDate();
this.fdate2 = cmonth2+"-"+cday2+"-"+cyear2;
var nextDay3 = new Date(day);
nextDay3.setDate(day.getDate() + 2);
var cday3 = nextDay3.getDate();
var cmonth3 = nextDay3.getMonth() + 1;
var cyear3 = nextDay3.getFullYear();
this.day3 = weekdays[nextDay3.getDay()];
this.month3 = month[nextDay3.getMonth()];
this.date3 = nextDay3.getDate();
this.fdate3 = cmonth3+"-"+cday3+"-"+cyear3;
var nextDay4 = new Date(day);
nextDay4.setDate(day.getDate() + 3);
var cday4 = nextDay4.getDate();
var cmonth4 = nextDay4.getMonth() + 1;
var cyear4 = nextDay4.getFullYear();
this.day4 = weekdays[nextDay4.getDay()];
this.month4 = month[nextDay4.getMonth()];
this.date4 = nextDay4.getDate();
this.fdate4 = cmonth4+"-"+cday4+"-"+cyear4;
var nextDay5 = new Date(day);
nextDay5.setDate(day.getDate() + 4); 
var cday5 = nextDay5.getDate();
var cmonth5 = nextDay5.getMonth() + 1;
var cyear5 = nextDay5.getFullYear();
this.day5 = weekdays[nextDay5.getDay()];
this.month5 = month[nextDay5.getMonth()];
this.date5 = nextDay5.getDate();
this.fdate5 = cmonth5+"-"+cday5+"-"+cyear5;
var nextDay6 = new Date(day);
nextDay6.setDate(day.getDate() + 5);
var cday6 = nextDay6.getDate();
var cmonth6 = nextDay6.getMonth() + 1;
var cyear6 = nextDay6.getFullYear();
this.day6 = weekdays[nextDay6.getDay()];
this.month6 = month[nextDay6.getMonth()];
this.date6 = nextDay6.getDate();
this.fdate6 = cmonth6+"-"+cday6+"-"+cyear6;
var nextDay7 = new Date(day);
nextDay7.setDate(day.getDate() + 6);
var cday7 = nextDay7.getDate();
var cmonth7 = nextDay7.getMonth() + 1;
var cyear7 = nextDay7.getFullYear();
this.day7 = weekdays[nextDay7.getDay()];
this.month7 = month[nextDay7.getMonth()];
this.date7 = nextDay7.getDate();
this.fdate7 = cmonth7+"-"+cday7+"-"+cyear7;
var nextDay8 = new Date(day);
nextDay8.setDate(day.getDate() + 7);
var cday8 = nextDay8.getDate();
var cmonth8 = nextDay8.getMonth() + 1;
var cyear8 = nextDay8.getFullYear();
this.day8 = weekdays[nextDay8.getDay()];
this.month8 = month[nextDay8.getMonth()];
this.date8 = nextDay8.getDate();
this.fdate8 = cmonth8+"-"+cday8+"-"+cyear8;
var nextDay9 = new Date(day);
nextDay9.setDate(day.getDate() + 8);
var cday9 = nextDay9.getDate();
var cmonth9 = nextDay9.getMonth() + 1;
var cyear9 = nextDay9.getFullYear();
this.day9 = weekdays[nextDay9.getDay()];
this.month9 = month[nextDay9.getMonth()];
this.date9 = nextDay9.getDate();
this.fdate9 = cmonth9+"-"+cday9+"-"+cyear9;
var nextDay10 = new Date(day);
nextDay10.setDate(day.getDate() + 9);
var cday10 = nextDay10.getDate();
var cmonth10 = nextDay10.getMonth() + 1;
var cyear10 = nextDay10.getFullYear();
this.day10 = weekdays[nextDay10.getDay()];
this.month10 = month[nextDay10.getMonth()];
this.date10 = nextDay10.getDate();
this.fdate10 = cmonth10+"-"+cday10+"-"+cyear10;
var nextDay11 = new Date(day);
nextDay11.setDate(day.getDate() + 10);
var cday11 = nextDay11.getDate();
var cmonth11 = nextDay11.getMonth() + 1;
var cyear11 = nextDay11.getFullYear();
this.day11 = weekdays[nextDay11.getDay()];
this.month11 = month[nextDay11.getMonth()];
this.date11 = nextDay11.getDate();
this.fdate11 = cmonth11+"-"+cday11+"-"+cyear11;
var nextDay12 = new Date(day);
nextDay12.setDate(day.getDate() + 11);
var cday12 = nextDay12.getDate();
var cmonth12 = nextDay12.getMonth() + 1;
var cyear12 = nextDay12.getFullYear();
this.day12 = weekdays[nextDay12.getDay()];
this.month12 = month[nextDay12.getMonth()];
this.date12 = nextDay12.getDate();
this.fdate12 = cmonth12+"-"+cday12+"-"+cyear12;
var nextDay13 = new Date(day);
nextDay13.setDate(day.getDate() + 12);
var cday13 = nextDay13.getDate();
var cmonth13 = nextDay13.getMonth() + 1;
var cyear13 = nextDay13.getFullYear();
this.day13 = weekdays[nextDay13.getDay()];
this.month13 = month[nextDay13.getMonth()];
this.date13 = nextDay13.getDate();
this.fdate13 = cmonth13+"-"+cday13+"-"+cyear13;
var nextDay14 = new Date(day);
nextDay14.setDate(day.getDate() + 13);  
var cday14 = nextDay14.getDate();
var cmonth14 = nextDay14.getMonth() + 1;
var cyear14 = nextDay14.getFullYear();
this.day14 = weekdays[nextDay14.getDay()];
this.month14 = month[nextDay14.getMonth()];
this.date14 = nextDay14.getDate();
this.fdate14 = cmonth14+"-"+cday14+"-"+cyear14;
var nextDay15 = new Date(day);
nextDay15.setDate(day.getDate() + 14); 
var cday15 = nextDay15.getDate();
var cmonth15 = nextDay15.getMonth() + 1;
var cyear15 = nextDay15.getFullYear();
this.day15 = weekdays[nextDay15.getDay()];
this.month15 = month[nextDay15.getMonth()];
this.date15 = nextDay15.getDate();
this.fdate15 = cmonth15+"-"+cday15+"-"+cyear15;
var nextDay16 = new Date(day);
nextDay16.setDate(day.getDate() + 15); 
var cday16 = nextDay16.getDate();
var cmonth16 = nextDay16.getMonth() + 1;
var cyear16 = nextDay16.getFullYear();
this.day16 = weekdays[nextDay16.getDay()];
this.month16 = month[nextDay16.getMonth()];
this.date16 = nextDay16.getDate();
this.fdate16 = cmonth16+"-"+cday16+"-"+cyear16;
var nextDay17 = new Date(day);
nextDay17.setDate(day.getDate() + 16);
var cday17 = nextDay17.getDate();
var cmonth17 = nextDay17.getMonth() + 1;
var cyear17 = nextDay17.getFullYear();
this.day17 = weekdays[nextDay17.getDay()];
this.month17 = month[nextDay17.getMonth()];
this.date17 = nextDay17.getDate();
this.fdate17 = cmonth17+"-"+cday17+"-"+cyear17;
var nextDay18 = new Date(day);
nextDay18.setDate(day.getDate() + 17); 
var cday18 = nextDay18.getDate();
var cmonth18 = nextDay18.getMonth() + 1;
var cyear18 = nextDay18.getFullYear();
this.day18 = weekdays[nextDay18.getDay()];
this.month18 = month[nextDay18.getMonth()];
this.date18 = nextDay18.getDate();
this.fdate18 = cmonth18+"-"+cday18+"-"+cyear18;

console.log(this.userid);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ProfilePage');
    this.clearAndGetProfile();
    this.service.getFcmToken("Profile");
    this.service.watchFcmNotifications();
  }

  clearAndGetProfile() {
      this.user = "";
      this.getProfile();
  }
  getProfile() {
    try {
       this.service.profile().then( (response : any) => {
         this.user = response.data;
         this.firstName= this.user.first_name;
         this.lastName= this.user.last_name;
         this.inputemail= this.user.email;
         this.phoneNumber= this.user.phone_number;

         this.OfferfirstName= this.user.first_name;
         this.OfferlastName= this.user.last_name;
         this.Offerinputemail= this.user.email;
         this.OfferphoneNumber= this.user.phone_number;

         this.reqfirstName= this.user.first_name;
         this.reqlastName= this.user.last_name;
         this.reqinputemail= this.user.email;
         this.reqphoneNumber= this.user.phone_number;
       }).catch( error => {
           console.log(error);
       })
     } catch(e) {
          this.service.serverError();
      }
  }

submitQuestion(){
  console.log(this.userid);
  this.showSpinner = true;
if (this.firstName == undefined) {
  this.firstName = '';
}
if (this.lastName == undefined) {
  this.lastName = '';
}
if (this.inputemail == undefined) {
  this.inputemail = '';
}
if (this.phoneNumber == undefined) {
  this.phoneNumber = '';
}
if (this.question == undefined) {
  this.question = '';
}
    let urlPara: any = {
      selected: 'ask_a_question',
      type: 'single',
      propertyID : this.propertyID,
      firstName: this.firstName,
      lastName: this.lastName,
      inputemail: this.inputemail,
      phoneNumber: this.phoneNumber,
      question: this.question,
      userid: this.userid,
      useremail: this.useremail
    }
this.service.askQuestion(urlPara).then( (response : any) => {
  console.log(response);
this.showSpinner = false;
 this.service.toast("Question has been su ccessfully requested", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
this.showSpinner = false;
})
}
submitOffer(){
this.showSpinner = true;
if (this.OfferfirstName == undefined) {
  this.OfferfirstName = '';
}
if (this.OfferlastName == undefined) {
  this.OfferlastName = '';
}
if (this.Offerinputemail == undefined) {
  this.Offerinputemail = '';
}
if (this.OfferphoneNumber == undefined) {
  this.OfferphoneNumber = '';
}
if (this.Offerlegalname == undefined) {
  this.Offerlegalname = '';
}
if (this.offerprice == undefined) {
  this.offerprice = '';
}
if (this.offerdown == undefined) {
  this.offerdown = '';
}
if (this.offerletter == undefined) {
  this.offerletter = '';
}
if (this.offeramount == undefined) {
  this.offeramount = '';
}
if (this.offerclosing == undefined) {
  this.offerclosing = '';
}
if (this.offerproperty == undefined) {
  this.offerproperty = '';
}
if (this.Offercomments == undefined) {
  this.Offercomments = '';
}

if (this.Offercomments == '' || this.offerproperty == '') {
  this.showSpinner = false;
  console.log('emt');
  this.service.toast("All fields are mandatory!!!", 1500, 'bottom');
}else{
    let urlPara: any = {
      selected: 'start_offer',
      type: 'single',
      propertyID : this.propertyID,
      firstName: this.OfferfirstName,
      lastName: this.OfferlastName,
      inputemail: this.Offerinputemail,
      phoneNumber: this.OfferphoneNumber,
      Offerlegalname: this.Offerlegalname,
      offerprice: this.offerprice,
      offerdown: this.offerdown,
      offerletter: this.offerletter,
      offeramount: this.offeramount,
      offerclosing: this.offerclosing,
      offerproperty: this.offerproperty,
      comments: this.Offercomments,
      userid: this.userid,
      useremail: this.useremail
    }
this.service.startOffer(urlPara).then( (response : any) => {
this.showSpinner = false;
 this.service.toast("Success!!!", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
this.showSpinner = false;
})
}
//     let urlPara: any = {
//       selected: 'start_offer',
//       type: 'single',
//       propertyID : this.propertyID,
//       firstName: this.OfferfirstName,
//       lastName: this.OfferlastName,
//       inputemail: this.Offerinputemail,
//       phoneNumber: this.OfferphoneNumber,
//       Offerlegalname: this.Offerlegalname,
//       offerprice: this.offerprice,
//       offerdown: this.offerdown,
//       offerletter: this.offerletter,
//       offeramount: this.offeramount,
//       offerclosing: this.offerclosing,
//       offerproperty: this.offerproperty,
//       comments: this.Offercomments,
//     }
// this.service.startOffer(urlPara).then( (response : any) => {
// this.showSpinner = false;
//  this.service.toast("Success!!!", 1500, 'bottom');
//  this.navCtrl.pop();
// }).catch( error => {
// this.showSpinner = false;
// })
}

addDate1(addDate, $event): void {
 if (this.fdate1TF == true){
this.reqDateArray.splice(0, 1, addDate);
 }else{
this.reqDateArray.splice(0, 1, '');
 }
}
addDate2(addDate, $event): void {
 if (this.fdate2TF == true){
this.reqDateArray.splice(1, 1, addDate);
 }else{
this.reqDateArray.splice(1, 1, '');
 }
}

addDate3(addDate, $event): void {
 if (this.fdate3TF == true){
this.reqDateArray.splice(2, 1, addDate);
 }else{
this.reqDateArray.splice(2, 1, '');
 }
}
addDate4(addDate, $event): void {
 if (this.fdate4TF == true){
this.reqDateArray.splice(3, 1, addDate);
 }else{
this.reqDateArray.splice(3, 1, '');
 }
}
addDate5(addDate, $event): void {
 if (this.fdate5TF == true){
this.reqDateArray.splice(4, 1, addDate);
 }else{
this.reqDateArray.splice(4, 1, '');
 }
}
addDate6(addDate, $event): void {
 if (this.fdate6TF == true){
this.reqDateArray.splice(5, 1, addDate);
 }else{
this.reqDateArray.splice(5, 1, '');
 }
}

addDate7(addDate, $event): void {
 if (this.fdate7TF == true){
this.reqDateArray.splice(6, 1, addDate);
 }else{
this.reqDateArray.splice(6, 1, '');
 }
}
addDate8(addDate, $event): void {
 if (this.fdate8TF == true){
this.reqDateArray.splice(7, 1, addDate);
 }else{
this.reqDateArray.splice(7, 1, '');
 }
}
addDate9(addDate, $event): void {
 if (this.fdate9TF == true){
this.reqDateArray.splice(8, 1, addDate);
 }else{
this.reqDateArray.splice(8, 1, '');
 }
}
addDate10(addDate, $event): void {
 if (this.fdate10TF == true){
this.reqDateArray.splice(9, 1, addDate);
 }else{
this.reqDateArray.splice(9, 1, '');
 }
}
addDate11(addDate, $event): void {
 if (this.fdate11TF == true){
this.reqDateArray.splice(10, 1, addDate);
 }else{
this.reqDateArray.splice(10, 1, '');
 }
}
addDate12(addDate, $event): void {
 if (this.fdate12TF == true){
this.reqDateArray.splice(11, 1, addDate);
 }else{
this.reqDateArray.splice(11, 1, '');
 }
}
addDate13(addDate, $event): void {
 if (this.fdate13TF == true){
this.reqDateArray.splice(12, 1, addDate);
 }else{
this.reqDateArray.splice(12, 1, '');
 }
}
addDate14(addDate, $event): void {
 if (this.fdate14TF == true){
this.reqDateArray.splice(13, 1, addDate);
 }else{
this.reqDateArray.splice(13, 1, '');
 }
}
addDate15(addDate, $event): void {
 if (this.fdate15TF == true){
this.reqDateArray.splice(14, 1, addDate);
 }else{
this.reqDateArray.splice(14, 1, '');
 }
}
addDate16(addDate, $event): void {
 if (this.fdate16TF == true){
this.reqDateArray.splice(15, 1, addDate);
 }else{
this.reqDateArray.splice(15, 1, '');
 }
}
addDate17(addDate, $event): void {
 if (this.fdate17TF == true){
this.reqDateArray.splice(16, 1, addDate);
 }else{
this.reqDateArray.splice(16, 1, '');
 }
}
addDate18(addDate, $event): void {
 if (this.fdate18TF == true){
this.reqDateArray.splice(17, 1, addDate);
 }else{
this.reqDateArray.splice(17, 1, '');
 }
}

submitTour(){
  this.showSpinner = true;    
    var arr = this.reqDateArray.filter(function(entry) { return entry.trim() != ''; });
    // console.log(arr); 
   this.reqDateArrayall = arr.toString();
   // console.log(this.reqDateArrayall);
if (this.reqfirstName == undefined) {
  this.reqfirstName = '';
}
if (this.reqlastName == undefined) {
  this.reqlastName = '';
}
if (this.reqinputemail == undefined) {
  this.reqinputemail = '';
}
if (this.reqphoneNumber == undefined) {
  this.reqphoneNumber = '';
}
if (this.reqTimeframe == undefined) {
  this.reqTimeframe = '';
}
if (this.reqcomments == undefined) {
  this.reqcomments = '';
}
if (this.reqDateArrayall == undefined) {
  this.reqDateArrayall = '';
}
    let urlPara: any = {
      selected: 'request_tour',
      type: 'single',
      propertyID : this.propertyID,
      firstName: this.reqfirstName,
      lastName: this.reqlastName,
      inputemail: this.reqinputemail,
      phoneNumber: this.reqphoneNumber,
      timeline : this.reqTimeframe,
      schduleddate: this.reqDateArrayall,
      comments: this.reqcomments,
      userid: this.userid,
      useremail: this.useremail
    }
this.service.reqTour(urlPara).then( (response : any) => {
this.showSpinner = false;
 this.service.toast("Success!!!", 1500, 'bottom');
 this.navCtrl.pop();
}).catch( error => {
this.showSpinner = false;
})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTourPage');
  }
goBack(){
	this.navCtrl.pop();
}
goto1(){
this.showOne = 'flex';
this.showTwo = 'none';
this.showThree = 'none';

this.showArrowOne = 'none';
this.showArrowTwo = 'block';
this.showArrowThree = 'none';

this.showLast = 'none';
// this.showOne = 'none';
// this.showTwo = 'block';
// this.showThree = 'none';

// this.showArrowOne = 'block';
// this.showArrowTwo = 'none';
// this.showArrowThree = 'block';
}
goto2(){
// 	this.showOne = 'none';
// this.showTwo = 'none';
// this.showThree = 'block';	

// this.showArrowOne = 'none';
// this.showArrowTwo = 'block';
// this.showArrowThree = 'block';
this.showOne = 'none';
this.showTwo = 'flex';
this.showThree = 'none';	

this.showArrowOne = 'block';
this.showArrowTwo = 'none';
this.showArrowThree = 'block';

this.showLast = 'none';
}
goto3(){
this.showOne = 'none';
this.showTwo = 'none';
this.showThree = 'flex';

this.showArrowOne = 'none';
this.showArrowTwo = 'block';
this.showArrowThree = 'none';

this.showLast = 'flex';

// this.showOne = 'none';
// this.showTwo = 'none';
// this.showThree = 'block';

// this.showArrowOne = 'none';
// this.showArrowTwo = 'block';
// this.showArrowThree = 'none';
}
}
