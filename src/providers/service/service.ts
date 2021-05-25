import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import {  LoadingController, ToastController, Platform, AlertController, Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import { StorageProvider } from '../../providers/storage/storage';

import { FCM } from '@ionic-native/fcm';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//var localToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM1ZGVmNmRjYmVmY2E5OTA2MWJjNTllYWFkZGE0MWE0MWMwOGNiNzU4N2MyNzliMmU1MDc5MDQzNDRhNTkxM2EwYzExNTkzZjRhYzkyZjNhIn0.eyJhdWQiOiIxIiwianRpIjoiYzVkZWY2ZGNiZWZjYTk5MDYxYmM1OWVhYWRkYTQxYTQxYzA4Y2I3NTg3YzI3OWIyZTUwNzkwNDM0NGE1OTEzYTBjMTE1OTNmNGFjOTJmM2EiLCJpYXQiOjE1NDg4NTA2ODAsIm5iZiI6MTU0ODg1MDY4MCwiZXhwIjoxNTgwMzg2Njc5LCJzdWIiOiIxNDYiLCJzY29wZXMiOltdfQ.j56Q-24FYE7hEQ6R0wH26oduv_LBt06uMYtU9ioZWieHk0j7IpIaBp8yFHHO49lhky5xGFuM9ZAbF8DJinSyGPPxN3199LV6RBcrEdeMP3j3aBByJDWFu8NbMybdZGO1PtxNs8mY93h4WTwZ47Cmz0BiFPN9QxSJQ70UMN_-mhI_3o3oS3CUxbms_H0njF7yA67W95791XiysMn9Ewvf0iuiPIGS3xyO8WmbkK9EJFduk3uHN0EM0qY6hMcZxRM4La_9PhcDAK8srkU17jE6abWIAPHwFIbyEnDumeCmJVwb_UNYX52wMssS-7R5apjhkvah3DM6rt-YjyVjmaMN1uqb3_KKVe54fctrIrndpbjkT1bJHk8ePIxHhVbpCntOZQk8Vkzf_AHhHsUbRTSSvIwrge-pckVtL6hu5PwbU_uOIebCggFFEgGcIg--oAUm0bO1iNlkYDbk3SUMhYgnqUOVje_D0zdaDnvNvJuYKYpHhpuxwWuKNBqkxkXEwnELdV3ScC-fHXvOA5-UqxviHDlE3-6x3ys4YtScglVBpmAG7JU2IAmv7LpI2g7dwrCGas6x2oU56-IteG-vIThPmaL6ikhUonulkX42fl2LMhF7tlQ0jv6HkqJM2pVQTDoDJA6rJosx7KgTDyZIHPJHg9gUSjfpFtJTbYfel0S41qM';
var localToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4ZGZkMzNlNGQ3NGExMDBiNTA4ODc4ZDE3NzQ3M2U0ZTdiMzA4OTIxYWQ5YTM0ZjYyYWFiYjk2OWY0YThiNzJjOThhNzZmOGY2ZWQ1NjBkIn0.eyJhdWQiOiIxIiwianRpIjoiYThkZmQzM2U0ZDc0YTEwMGI1MDg4NzhkMTc3NDczZTRlN2IzMDg5MjFhZDlhMzRmNjJhYWJiOTY5ZjRhOGI3MmM5OGE3NmY4ZjZlZDU2MGQiLCJpYXQiOjE1NDg5MTI1MTIsIm5iZiI6MTU0ODkxMjUxMiwiZXhwIjoxNTgwNDQ4NTEyLCJzdWIiOiIxNyIsInNjb3BlcyI6W119.HbEtW3cH8g2VLRqUxqG-6PC9scH0B-OKcfLtnmEodc1aZB_5kvJyBkIaoitukvrtCnGLKEE1cV8G-8kZMfgfqUhz-uMq_Nmcap4PAlMAXxFJpM_zDzqdGAcIf3QkYdzBprPAnydVmofZ8qaxkeIb43L4dE-ciEEf1R9bHEJjbYY63Rxqojqr63gOKe1To5U5OybZWqkWqB-aF0G7MCeEBNV6G4Uh2DicQCiaG3AlPv6ADbyV79dOHaWYXPqtIBadtRfNDxDHMNZjZ7xO37nxUZIL-SeSxza3sfvU_kz4AZu62BmakJsexLMCO6y6TOAmJ1TgoY1HpHFMJYRj-7zOuVelGy9yv5UQxpfftrMRmLlE1Nnf7lltOPM8XDvQ1r2OrHaw9AwA9sOawqE8n55b-QzxdKHy8r-V4e4Etz-Nrcxxl951aRL3utsCyFYx4Ul6myt2PmLPBLirZ6Gr9R2ng_aerIgIohT_4Ho0U0z_zXdSelRLWwOCp4AjRXbzVAZvW0qkc_m3vvBuv9F4bEZP55KaqCuZy9YcboQqv3p918Dsu_DQ4oAMProKBkmDRXQ_QNoBt7x0Hfug5SoJ9gPzOgd0NdZEYA0a7kpp6zCyuTIlDttlXNqn01VjjRS4renw1iX981O2m3d6QeqmD0hRP0IBz_xVuTtZnEtZuyQo2nM';
var liveToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmMWZkMDkyNDZkYjdmOWZjNjNkNDU5ODJkMTA4ODYzZTlhM2RlYTgxNGZiYWQwMDEwMjFkZTI1NWRlYzdiYmUyMDZlZWNhNjRlYjdhZGIwIn0.eyJhdWQiOiIxIiwianRpIjoiOWYxZmQwOTI0NmRiN2Y5ZmM2M2Q0NTk4MmQxMDg4NjNlOWEzZGVhODE0ZmJhZDAwMTAyMWRlMjU1ZGVjN2JiZTIwNmVlY2E2NGViN2FkYjAiLCJpYXQiOjE1NDg4NTc5NTIsIm5iZiI6MTU0ODg1Nzk1MiwiZXhwIjoxNTgwMzkzOTUyLCJzdWIiOiIyMjIiLCJzY29wZXMiOltdfQ.mvnO6iqlN3rk8LRB0O0ldkv98Jc1y_zSUh31hbCZeKHHYUXhsKCTU_GpgEv4myvqphaLgaJctYFsirUj5K4G1ZMNU8EA85TxHGaGrSUuBJVAbMyE8lVnKNAgs86N6sm22gJsRwq3YNT7vaD_gaGaRT1Qn_n1MsWGs09gRrms6w_QPMi2jLl7cv2Uv3ERhaS4FQhqElkarZQkg9Vsxw82YA0t7RBVAdtpQJ0JHfZuAkEYZXbtPjerGxDFpGIVK7zqF15XthPy8qDE2fBw4q3He2Ckv56ilntoALHx6DpOt8LKdTyrAx49ONc4n2Ab0k72kb2J9Bbs_U8EUiDlsp3cBSMhmtQrCguWKHoNf_FWYgsLZPcAxGJiVc4WkKODtYDOW4F3lXBsRRn11nueGa3G_rmRlI_OhYwAHX1vckjBgtxg6w5ccq-ECSsc89HPSrHk4gswsHAz81S7FbZJFtSj4ommonOQ5aGvoLtUeIsGRl-0S3BayIC4SJicPoC2qTeN99CGMcgjmlWnNaUTzJDGrZezKjVLLGy2d5PlV8ofchb2vsRh1SZb75s0HYI-ePUObYgt1ePf2iuISDA304imhELqMV1X6PCnVCD0SfoAzRxl6RFgncT4LRwNe3dlQw0TK6BELQKd8JANiYtbDh_WRDdgGRjx0vDW0QR2A812FjE';

@Injectable()
export class ServiceProvider {
  public baseUrl : string = "https://toptechrealty.com/api/auth";
  //  public baseUrl : string = "http://localhost:8080/Toptech/New/Taigha-Productions-Repository/public/api/auth";
   //    public baseUrl : string = "http://127.0.0.1:8000/api/auth";  

  public apigetroles: string = this.baseUrl+"/rmls/listing/share/modal/roles-and-types";
  public apiModalUser: string = this.baseUrl+"/rmls/listing/share/modal/get-users";
  public apicardShare: string = this.baseUrl+"/rmls/request/share-favorite";
  public apiShareSaved: string = this.baseUrl+"/rmls/request/share-saved-search";
  public apigetsavedsearch: string = this.baseUrl+"/rmls/saved/searches";
  public apisavedsearchcreate: string = this.baseUrl+"/rmls/saved/searches/create";
  public apideletesavedsearch: string = this.baseUrl+"/rmls/saved/searches/delete";
  public apisavedsearchupdate: string = this.baseUrl+"/rmls/saved/searches/update";
  public apiHsProperties: string = this.baseUrl+"/home/search/listings";
  public apiSearchBy: string = this.baseUrl+"/home/search/by/term";
  public apiOption: string = this.baseUrl+"/rmls/listing/filter";
  public apiproperty: string = this.baseUrl+"/rmls/listing";
  public apipropertyimage: string = this.baseUrl+"/rmls/listing";
  public apipropertyfav: string = this.baseUrl+"/rmls/listing/fav/unfav";
  public apiqto: string = this.baseUrl+"/rmls/request/qto";
  public apimapproperty: string = this.baseUrl+"/rmls/listing/map-infowindow";
  public apiDashboard: string = this.baseUrl+"/user/dashboard";
  public apiLogin: string = this.baseUrl+"/login";
  public apiLogin2: string = this.baseUrl+"/get/names/by/id";
  public apiFBLogin: string = this.baseUrl+"/facebook/login";
  public apiGPlusLogin: string = this.baseUrl+"/google/login";
  public apiiOSLogin: string = this.baseUrl+"/ios/login";
  public apiSignIn: string = this.baseUrl+"/signup";
  public apiResetPassword: string = this.baseUrl+"/send/reset/link";
  public apiTSI : string = this.baseUrl+"/get/timeframe/source/interest";
  public apiSentVerifyEmail : string = this.baseUrl+"/user/resend/verify/email";
  public apiTickets: string = this.baseUrl+"/user/tickets";
  public apiTickets2: string = this.baseUrl+"/user/ticketsalter";
  public apiTickets3: string = this.baseUrl+"/user/ticketsalter2";
  public apiTicketsold: string = this.baseUrl+"/user/ticketsold";
  public apiUploadUserAvatar: string = this.baseUrl+"/user/upload/avatar";
  public apiTicketCreate: string = this.baseUrl+"/user/tickets/create/ticket";
  public apiTicketStore: string = this.baseUrl+"/user/tickets/store/ticket";

  public apiTicketGroupUser: string = this.baseUrl+"/user/tickets/groupuser";
  public apiTicketCustomer: string = this.baseUrl+"/user/tickets/customer";

  public apiTicketReply: string = this.baseUrl+"/user/tickets/store/reply";
  public apiFcm: string = this.baseUrl+"/user/fcm/tokens";
  public apiuserByProperties: string = this.baseUrl+"/userby/properties";
  public apiChecklist: string = this.baseUrl+"/user/checklists";
  public apiContacts: string = this.baseUrl+"/user/dashboard/contacts";
  public apiEmails: string = this.baseUrl+"/user/emails";
  public apiProperties: string = this.baseUrl+"/user/properties";
  public apiPropertyOptins: string = this.baseUrl+"/user/properties/filter/options";
  public apiPropertyCreateOptins: string = this.baseUrl+"/user/properties/create/options";
  public apiPropertyStore: string = this.baseUrl+"/user/properties/store/property";
  public apiDocumentOptins: string = this.baseUrl+"/user/documents/filter/options";
  public apiDocuments: string = this.baseUrl+"/user/documents";
  public apiDocumentstore: string = this.baseUrl+"/user/documents/store";
  public apiDocumentUpdate: string = this.baseUrl+"/user/documents/update";
  public apiActivities: string = this.baseUrl+"/user/activities";
  public apiTasks: string = this.baseUrl+"/user/tasks";
  public apiMailCreate: string = this.baseUrl+"/user/emails/create/email";
  public apiMailStore: string = this.baseUrl+"/user/emails/store/email";
  public apiMailReply: string = this.baseUrl+"/user/emails/store/reply";
  public apiGetProfile: string = this.baseUrl+"/user/profile";
  public apiProfileUpdate: string = this.baseUrl+"/user/update";
  public apiConvertToTicket: string = this.baseUrl+"/user/tickets/convert/to/tickets";
  public loading : any;
  public ckeImageUploadUrl: string = 'https://toptechrealty.com/tinymce/ckeditor/mobileupload' ;
  public dashboardCountapi: string = this.baseUrl+'/user/admin/dashboard/counts' ;
  public dashboardSearch: string = this.baseUrl+'/admin/global-search';
  public apiTextmsg: string = this.baseUrl+'/user/admin/text/messages';
  public apiReplytextmsg: string = this.baseUrl+'/user/admin/text/messages';
  public apiMessageUser: string = this.baseUrl+'/user/admin/text/messages/filter/users';
  public apimessageTemplate: string = this.baseUrl+'/user/admin/text/message/templates';
  public apiSendtextmsg: string = this.baseUrl+'/user/admin/text/message/store';
  public apiUserhavemsg: string = this.baseUrl+'/user/admin/text/message/has/history';


  // public homesearchUrl : string = "https://toptechrealty.com/public/api/auth";
  // public dashboardSearch: string = 'https://toptechrealty.com/public/api/auth/admin/global-search';
  // public apiTextmsg: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/messages';
  // public apiReplytextmsg: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/messages';
  // public apiMessageUser: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/messages/filter/users';
  // public apimessageTemplate: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/message/templates';
  // public apiSendtextmsg: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/message/store';
  // public apiUserhavemsg: string = 'https://toptechrealty.com/public/api/auth/user/admin/text/message/has/history';

   public ckeImageUploadOptions : any = {
       ckfinder : { uploadUrl : this.ckeImageUploadUrl }
   }

   public toolbarOptions = [
        [],
      ];
   public toolbarOptionsTicket = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['link'],
        ['image'],
        [{ 'color': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];
addapiHsPropertiesPara: any;
//urlPara: any;
  constructor(public http: HttpClient,
      public loadingCtrl: LoadingController,
      public toastController: ToastController,
      public fcm: FCM,
      public events: Events,
      public platform: Platform,
      private alertCtrl: AlertController,
      public storage : StorageProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  dashboardCount(){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       return this.http.post(this.dashboardCountapi, new FormData(), httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
   // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //     try {
   //       let httpOptions = {
   //       headers: new HttpHeaders({
   //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //       })
   //     };
   //      //  return body;
   //      console.log(auth_user_token.token_type+" "+auth_user_token.access_token);
   //     return this.http.post(this.dashboardCountapi, httpOptions).toPromise();
   //   } catch ( e ) {
   //     console.log(e);
   //     this.unAuthorizedToken();
   //   }
   //   });
  }
  searchByDash(type, result) {
     let body: HttpParams = new HttpParams();
    return this.http.post(this.dashboardSearch+"?filteritems="+type+"&search="+result, body).toPromise();
  }
getUserTextmessageDetailsold(msgID, userNumber) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         let body: HttpParams = new HttpParams();
        //  body = body.append('currentPage', currentPage);
        // let body: HttpParams = new HttpParams();
        //   body = body.append('currentPage', currentPage);

        return this.http.post(this.apiTextmsg+'/'+msgID+"?user_number="+userNumber, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
getUserTextmessageDetails(msgID, userNumber, currentPage) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         let body: HttpParams = new HttpParams();
        //  body = body.append('currentPage', currentPage);
        // let body: HttpParams = new HttpParams();
        //   body = body.append('currentPage', currentPage);

        return this.http.post(this.apiTextmsg+'/'+msgID+'/paginate'+'?page='+currentPage+"&user_number="+userNumber, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
getTextmessageDetails(msgID) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         let body: HttpParams = new HttpParams();
        //  body = body.append('currentPage', currentPage);
        // let body: HttpParams = new HttpParams();
        //   body = body.append('currentPage', currentPage);

        return this.http.post(this.apiTextmsg+'/'+msgID, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  getTextmessageDetailsPage(currentPage, msgID) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         let body: HttpParams = new HttpParams();
      //   body = body.append('currentPage', currentPage);
        // let body: HttpParams = new HttpParams();
        //   body = body.append('currentPage', currentPage);

       // return this.http.post(this.apiTextmsg+'/'+msgID+'/paginate', body, httpOptions).toPromise();
       return this.http.post(this.apiTextmsg+'/'+msgID+'/paginate'+'?page='+currentPage, body, httpOptions).toPromise();
     //   return this.http.post(this.apiTextmsg+'/'+msgID+'/paginate', body, httpOptions).map((res: Response) => res.json());
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  getTextmessage(currentPage, filters) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         let body: HttpParams = new HttpParams();
        //  body = body.append('currentPage', currentPage);
        // let body: HttpParams = new HttpParams();
         // body = body.append('currentPage', currentPage);

        return this.http.post(this.apiTextmsg+'?page='+currentPage, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
     replytextmsg(formData, idd) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.post(this.apiReplytextmsg+"/"+idd+"/reply", formData, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }
     sendtextmsg(formData) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.post(this.apiSendtextmsg, formData, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }
getTemplates(userid){
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
               return this.http.get(this.baseUrl+"/user", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });

}
  messageUserFilter(username){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('term', username);
       return this.http.post(this.apiMessageUser, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
  }
     getMessageTemplates() {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                let body: HttpParams = new HttpParams();
                return this.http.post(this.apimessageTemplate, body, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }
  messageFilter(currentPage, username){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('term', username);
          body = body.append('currentPage', currentPage);
       return this.http.post(this.baseUrl+'/user/admin/text/messages'+'?page='+currentPage, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
  }
       checkUserhavemsg(formData) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.post(this.apiUserhavemsg, formData, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }







  getModalUser(urlPara) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
         //https://toptechrealty.com/api/auth/rmls/listing/share/modal/get-users?type=&option=
        return this.http.get(this.apiModalUser+"?type="+urlPara.typevalue+"&option="+urlPara.rolevalue, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
getRoles(urlPara) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apigetroles, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  ShareSaved(urlPara){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('saved_search_id', urlPara.propertyID);
          urlPara.customerids.forEach(function(cusid) {
              body = body.append('customerids[]', cusid);
          });
          body = body.append('comments', urlPara.comments);
          urlPara.notification.forEach(function(noti) {
              body = body.append('notification_types[]', noti);
          });
        //  return body;
       return this.http.post(this.apiShareSaved, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
  }
  cardShareProperty(urlPara){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('saved_search_id', urlPara.propertyID);
          urlPara.customerids.forEach(function(cusid) {
              body = body.append('customerids[]', cusid);
          });
          body = body.append('comments', urlPara.comments);
          urlPara.notification.forEach(function(noti) {
              body = body.append('notification_types[]', noti);
          });
         // return body;
           return this.http.post(this.apicardShare, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
  }


  askQuestion(urlPara){
       let body: HttpParams = new HttpParams();
          body = body.append('property_id', urlPara.propertyID);
          body = body.append('sticket_type', urlPara.type);
          body = body.append('selected-option', urlPara.selected);
          body = body.append('ras_firstname', urlPara.firstName);
          body = body.append('ras_lastname', urlPara.lastName);
          body = body.append('ras_email', urlPara.inputemail);
          body = body.append('ras_phonenumber', urlPara.phoneNumber);
          body = body.append('ras_askquestion', urlPara.question);
       return this.http.post(this.apiqto+"?user_id="+urlPara.userid+"&email="+urlPara.useremail, body).toPromise();
   // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //     try {
   //       let httpOptions = {
   //       headers: new HttpHeaders({
   //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //       })
   //     };
   //     let body: HttpParams = new HttpParams();
   //        body = body.append('property_id', urlPara.propertyID);
   //        body = body.append('sticket_type', urlPara.type);
   //        body = body.append('selected-option', urlPara.selected);
   //        body = body.append('ras_firstname', urlPara.firstName);
   //        body = body.append('ras_lastname', urlPara.lastName);
   //        body = body.append('ras_email', urlPara.inputemail);
   //        body = body.append('ras_phonenumber', urlPara.phoneNumber);
   //        body = body.append('ras_askquestion', urlPara.question);
   //     return this.http.post(this.apiqto, body, httpOptions).toPromise();
   //   } catch ( e ) {
   //     console.log(e);
   //     this.unAuthorizedToken();
   //   }
   //   });
  }
  startOffer(urlPara){
       let body: HttpParams = new HttpParams();
          body = body.append('property_id', urlPara.propertyID);
          body = body.append('sticket_type', urlPara.type);
          body = body.append('selected-option', urlPara.selected);
          body = body.append('ras_firstname', urlPara.firstName);
          body = body.append('ras_lastname', urlPara.lastName);
          body = body.append('ras_email', urlPara.inputemail);
          body = body.append('ras_phonenumber', urlPara.phoneNumber);
          body = body.append('ras_legal_name', urlPara.Offerlegalname);
          body = body.append('ras_offer_price', urlPara.offerprice);
          body = body.append('ras_down_payment', urlPara.offerdown);
          body = body.append('ras_preapproval', urlPara.offerletter);
          body = body.append('ras_offer_price', urlPara.offeramount);
          body = body.append('ras_closing_date', urlPara.offerclosing);
          body = body.append('ras_property', urlPara.offerproperty);
          body = body.append('ras_comments_1', urlPara.comments);
       return this.http.post(this.apiqto+"?user_id="+urlPara.userid+"&email="+urlPara.useremail, body).toPromise();
   // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //     try {
   //       let httpOptions = {
   //       headers: new HttpHeaders({
   //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //       })
   //     };
   //     let body: HttpParams = new HttpParams();
   //        body = body.append('property_id', urlPara.propertyID);
   //        body = body.append('sticket_type', urlPara.type);
   //        body = body.append('selected-option', urlPara.selected);
   //        body = body.append('ras_firstname', urlPara.firstName);
   //        body = body.append('ras_lastname', urlPara.lastName);
   //        body = body.append('ras_email', urlPara.inputemail);
   //        body = body.append('ras_phonenumber', urlPara.phoneNumber);
   //        body = body.append('ras_legal_name', urlPara.Offerlegalname);
   //        body = body.append('ras_offer_price', urlPara.offerprice);
   //        body = body.append('ras_down_payment', urlPara.offerdown);
   //        body = body.append('ras_preapproval', urlPara.offerletter);
   //        body = body.append('ras_offer_price', urlPara.offeramount);
   //        body = body.append('ras_closing_date', urlPara.offerclosing);
   //        body = body.append('ras_property', urlPara.offerproperty);
   //        body = body.append('ras_comments_1', urlPara.comments);
   //     return this.http.post(this.apiqto, body, httpOptions).toPromise();
   //   } catch ( e ) {
   //     console.log(e);
   //     this.unAuthorizedToken();
   //   }
   //   });
  }

reqTour(urlPara){
       let body: HttpParams = new HttpParams();
          body = body.append('property_id', urlPara.propertyID);
          body = body.append('sticket_type', urlPara.type);
          body = body.append('selected-option', urlPara.selected);
          body = body.append('ras_firstname', urlPara.firstName);
          body = body.append('ras_lastname', urlPara.lastName);
          body = body.append('ras_email', urlPara.inputemail);
          body = body.append('ras_phonenumber', urlPara.phoneNumber);
          body = body.append('ras_timeline', urlPara.timeline);
          body = body.append('ras_schduled_date', urlPara.schduleddate);
          body = body.append('ras_comments', urlPara.comments);
       return this.http.post(this.apiqto+"?user_id="+urlPara.userid+"&email="+urlPara.useremail, body).toPromise();
   // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //     try {
   //       let httpOptions = {
   //       headers: new HttpHeaders({
   //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //       })
   //     };
   //     let body: HttpParams = new HttpParams();
   //        body = body.append('property_id', urlPara.propertyID);
   //        body = body.append('sticket_type', urlPara.type);
   //        body = body.append('selected-option', urlPara.selected);
   //        body = body.append('ras_firstname', urlPara.firstName);
   //        body = body.append('ras_lastname', urlPara.lastName);
   //        body = body.append('ras_email', urlPara.inputemail);
   //        body = body.append('ras_phonenumber', urlPara.phoneNumber);
   //        body = body.append('ras_timeline', urlPara.timeline);
   //        body = body.append('ras_schduled_date', urlPara.schduleddate);
   //        body = body.append('ras_comments', urlPara.comments);
   //     return this.http.post(this.apiqto, body, httpOptions).toPromise();
   //   } catch ( e ) {
   //     console.log(e);
   //     this.unAuthorizedToken();
   //   }
   //   });
  }

deletesavedsearch(deleteId){
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apideletesavedsearch+"?id="+deleteId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });

   // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //     try {
   //       let httpOptions = {
   //       headers: new HttpHeaders({
   //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //       })
   //     };
   //     let body: HttpParams = new HttpParams();
   //        body = body.append('searchurl', urlPara.searchurl);
   //        // body = body.append('params', urlPara.paramszip);

   //     return this.http.post(this.apisavedsearchcreate, body, httpOptions).toPromise();
   //   } catch ( e ) {
   //     console.log(e);
   //     this.unAuthorizedToken();
   //   }
   //   });
}
updatesavedsearch(updateSearchdata){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('searchid', updateSearchdata.searchId);
          body = body.append('searchname', updateSearchdata.searchName);
          body = body.append('email_settings', updateSearchdata.searchnotify);
          // body = body.append('params', urlPara.paramszip);

       return this.http.post(this.apisavedsearchupdate, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
}
savesearch(urlPara){
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
         //        searchterm: searchterm,
         // requesttype : requesttype,
         // searchtype: "zip",
         // zipsearch : "1",
         // beds: beds,
         // bath: bath,
         // min_price: min_price,
         // max_price: max_price,
         // sqftmin: sqftmin,
         // lotsizemin: lotsizemin,
         // lotsizemax: lotsizemax,
         // openhouse: openhouse,
         // price_change: price_change,
         // yearbuildmin: yearbuildmin,
         // yearbuildmax: yearbuildmax,
         // streetname: streetname,
         // levels: levels,
         // legaldescription: legaldescription,
         // elementaryschl: elementaryschl,
         // middleschl: middleschl,
         // highschl: highschl,
         // keywords: keywords,
         // listing_agent: listing_agent,
         // listing_office: listing_office,
         // status: '['+status+']',
         // pCategories: '['+pCategories+']'
         // pTypes:'['+pTypes+']'

// {"viewport":null,"of_sorts":"1","bd_sort":null,"br_sort":null,"yb_sort":null,"sq_sort":null,"sn_sort":null,"c_sort":null,"z_sort":null,"sd_sort":null,"asc_desc":null,"updated_at":null,"view_type":null,"view_card_type":null,"zip-search":"1","search-type":"zip","search-term":null,"existing-tem":"97229,98266","search-term-full":null,"min_price":null,"min_price_d":null,"max_price":null,"max_price_d":null,"beds":null,"bath":null,"propertytype":"house,townhouse,condo,multifamily","sqft-min":null,"sqft-max":null,"lotsize-min":null,"lotsize-max":null,"streetname":null,"status":["Active","Bumpable"],"openhouse":null,"price_change":null,"yearbuild-min":null,"yearbuild-max":null,"levels":null,"legaldescription":null,"elementaryschl":null,"middleschl":null,"highschl":null,"keywords":null,"listing_agent":null,"listing_office":null,"pCategories":["Residential","MultiFamily"],"pTypes":["Attached","Condominium","Single Family Residence","Townhouse"]}
       let body: HttpParams = new HttpParams();
          body = body.append('searchurl', urlPara.searchurl);
          body = body.append('searchname', urlPara.searchname);
          body = body.append('email_settings', urlPara.searchmail);
          // body = body.append('params', urlPara.param); existing-tem

          body = body.append('params[existing-tem]', urlPara.param.searchterm);
          body = body.append('params[search-term]', urlPara.param.searchterm);
          body = body.append('params[propertytype]', urlPara.param.requesttype);
          body = body.append('params[search-type]', urlPara.param.searchtype);
          body = body.append('params[beds]', urlPara.param.zipsearch);
          body = body.append('params[bath]', urlPara.param.beds);
          body = body.append('params[min_price]', urlPara.param.bath);
          body = body.append('params[max_price]', urlPara.param.min_price);
          body = body.append('params[sqft-min]', urlPara.param.max_price);
          body = body.append('params[sqft-max]', urlPara.param.sqftmin);
          body = body.append('params[lotsize-min]', urlPara.param.lotsizemin);
          body = body.append('params[lotsize-max]', urlPara.param.lotsizemax);
          body = body.append('params[openhouse]', urlPara.param.openhouse);
          body = body.append('params[price_change]', urlPara.param.price_change);
          body = body.append('params[yearbuild-min]', urlPara.param.yearbuildmin);
          body = body.append('params[yearbuild-max]', urlPara.param.yearbuildmax);
          body = body.append('params[streetname]', urlPara.param.streetname);
          body = body.append('params[levels]', urlPara.param.levels);
          body = body.append('params[legaldescription]', urlPara.param.legaldescription);
          body = body.append('params[elementaryschl]', urlPara.param.elementaryschl);
          body = body.append('params[middleschl]', urlPara.param.middleschl);
          body = body.append('params[highschl]', urlPara.param.highschl);
          body = body.append('params[keywords]', urlPara.param.keywords);
          body = body.append('params[listing_agent]', urlPara.param.listing_agent);
          body = body.append('params[listing_office]', urlPara.param.listing_office);
          body = body.append('params[status]', urlPara.param.status);
          body = body.append('params[pCategories]', urlPara.param.pCategories);
          body = body.append('params[pTypes]', urlPara.param.pTypes);


          // body = body.append('params', urlPara.paramszip);

       return this.http.post(this.apisavedsearchcreate, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
  }



getsavedsearch(urlPara) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apigetsavedsearch, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  homesearchpropertiesfav(propertyId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apipropertyfav+"?id="+propertyId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
homesearchpropertiesfavmulti(selectedlistarraycomma){
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apipropertyfav+"?id="+selectedlistarraycomma, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
}
  homesearchpropertiesafter(currentPage, urlPara, userid) {
 this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara[0]+'&request-type='+urlPara[1]+'&beds='+urlPara[2]+'&bath='+urlPara[3]+'&min_price='+urlPara[4]+'&max_price='+urlPara[5]+'&sqft-min='+urlPara[6]+'&sqft-max='+urlPara[7]+'&lotsize-min='+urlPara[8]+'&lotsize-max='+urlPara[9]+'&openhouse='+urlPara[10]+'&price_change='+urlPara[11]+'&yearbuild-min='+urlPara[12]+'&yearbuild-max='+urlPara[13]+'&streetname='+urlPara[14]+'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[18]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]+urlPara[23]+urlPara[24]+urlPara[25]+'&currentPage='+currentPage+'&user_id='+userid+'&virtual_tour='+urlPara[26];
 //  this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage='+currentPage ;
 return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     let body: HttpParams = new HttpParams();
    //       body = body.append('currentPage', currentPage);
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
 //  homesearchpropertiesafterfavlist(currentPage, urlPara) {
 // this.addapiHsPropertiesPara = this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage='+currentPage+'&favorites=1' ;
 // //  this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage='+currentPage ;
 //    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
 //        try {
 //          let httpOptions = {
 //          headers: new HttpHeaders({
 //            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
 //          })
 //        };
 //        let body: HttpParams = new HttpParams();
 //          body = body.append('currentPage', currentPage);
 //        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
 //      } catch ( e ) {
 //        console.log(e);
 //        this.unAuthorizedToken();
 //      }
 //      });
 //  }

  homesearchproperties(currentPage, urlPara, userid) {

   this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara[0]+'&request-type='+urlPara[1]+'&beds='+urlPara[2]+'&bath='+urlPara[3]+'&min_price='+urlPara[4]+'&max_price='+urlPara[5]+'&sqft-min='+urlPara[6]+'&sqft-max='+urlPara[7]+'&lotsize-min='+urlPara[8]+'&lotsize-max='+urlPara[9]+'&openhouse='+urlPara[10]+'&price_change='+urlPara[11]+'&yearbuild-min='+urlPara[12]+'&yearbuild-max='+urlPara[13]+'&streetname='+urlPara[14]+'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[18]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]+urlPara[23]+urlPara[24]+urlPara[25]+'&currentPage='+currentPage+'&user_id='+userid+'&virtual_tour='+urlPara[26];

   //this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage='+currentPage ;
   if (userid == 0) {
        return this.http.get(this.addapiHsPropertiesPara).toPromise();
   }else{
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
       });
   }

  }
  homesearchpropertiesfavlistsort(currentPage, urlPara) {

   this.addapiHsPropertiesPara = this.apiHsProperties+'?request-type='+urlPara.requestType+'&currentPage='+currentPage+urlPara.sorturl+'&favorites=1&user_id='+urlPara.userid ;
   return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  homesearchpropertiesfavlist(currentPage, urlPara) {
 // https://toptechrealty.com/public/api/auth/home/search/listings?request-type=listings&favorites=1&user_id=1233
   this.addapiHsPropertiesPara = this.apiHsProperties+'?request-type='+urlPara.requestType+'&currentPage='+currentPage+'&favorites=1&user_id='+urlPara.userid ;
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  // tickets(currentPage, filters) {
  //     return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
  //       try {
  //         let httpOptions = {
  //           headers: new HttpHeaders({
  //             'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
  //           }),
  //         };
  //         console.log(filters);
  //         let body: HttpParams = new HttpParams();
  //         body = body.append('currentPage', currentPage);
  //       return this.http.post(this.apiTickets, body,  httpOptions).toPromise();
  //     } catch ( e ) {
  //       console.log(e);
  //       this.unAuthorizedToken();
  //     }
  //     });

  // }
  filterhomesearchproperties(currentPage, filters, urlPara, userid) {
 //   public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";

   this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara[0]+'&request-type='+urlPara[1]+'&beds='+urlPara[2]+'&bath='+urlPara[3]+'&min_price='+urlPara[4]+'&max_price='+urlPara[5]+'&sqft-min='+urlPara[6]+'&sqft-max='+urlPara[7]+'&lotsize-min='+urlPara[8]+'&lotsize-max='+urlPara[9]+'&openhouse='+urlPara[10]+'&price_change='+urlPara[11]+'&yearbuild-min='+urlPara[12]+'&yearbuild-max='+urlPara[13]+'&streetname='+urlPara[14]+'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[19]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]+urlPara[23]+urlPara[24]+urlPara[25]+'&user_id='+userid+'&virtual_tour='+urlPara[26];
 //  this.addapiHsPropertiesPara = this.apiHsProperties+'?zip-search=1&search-type=city&search-term=por&existing-tem=97229&search-term-full=Port+Orford-+OR' ;
  return this.http.get(this.addapiHsPropertiesPara).toPromise();
  //   if (userid == 0) {
  //       return this.http.get(this.addapiHsPropertiesPara).toPromise();
  //  }else{
  //   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
  //       try {
  //         let httpOptions = {
  //         headers: new HttpHeaders({
  //           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
  //         })
  //       };
  //       return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
  //     } catch ( e ) {
  //       console.log(e);
  //       this.unAuthorizedToken();
  //     }
  //     });
  // }
  }
  filterhomesearchpropertiesmapsort(currentPage, filters, urlPara, userid) {
 //   public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";

   this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara[0]+'&request-type=map&beds='+urlPara[2]+'&bath='+urlPara[3]+'&min_price='+urlPara[4]+'&max_price='+urlPara[5]+'&sqft-min='+urlPara[6]+'&sqft-max='+urlPara[7]+'&lotsize-min='+urlPara[8]+'&lotsize-max='+urlPara[9]+'&openhouse='+urlPara[10]+'&price_change='+urlPara[11]+'&yearbuild-min='+urlPara[12]+'&yearbuild-max='+urlPara[13]+'&streetname='+urlPara[14]+'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[18]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]+urlPara[23]+urlPara[24]+urlPara[25]+'&user_id='+userid+'&virtual_tour='+urlPara[26];
 //  this.addapiHsPropertiesPara = this.apiHsProperties+'?zip-search=1&search-type=city&search-term=por&existing-tem=97229&search-term-full=Port+Orford-+OR' ;
     if (userid == 0) {
        return this.http.get(this.addapiHsPropertiesPara).toPromise();
   }else{
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  }
  filterhomesearchpropertiesmap(currentPage, filters, urlPara, userid) {
 //   public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";

   this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara[0]+'&request-type=map&beds='+urlPara[2]+'&bath='+urlPara[3]+'&min_price='+urlPara[4]+'&max_price='+urlPara[5]+'&sqft-min='+urlPara[6]+'&sqft-max='+urlPara[7]+'&lotsize-min='+urlPara[8]+'&lotsize-max='+urlPara[9]+'&openhouse='+urlPara[10]+'&price_change='+urlPara[11]+'&yearbuild-min='+urlPara[12]+'&yearbuild-max='+urlPara[13]+'&streetname='+urlPara[14]+'&levels='+urlPara[15]+'&legaldescription='+urlPara[16]+'&elementaryschl='+urlPara[17]+'&middleschl='+urlPara[18]+'&highschl='+urlPara[18]+'&keywords='+urlPara[20]+'&listing_agent='+urlPara[21]+'&listing_office='+urlPara[22]+urlPara[23]+urlPara[24]+urlPara[25]+'&user_id='+userid+'&virtual_tour='+urlPara[26];
 //  this.addapiHsPropertiesPara = this.apiHsProperties+'?zip-search=1&search-type=city&search-term=por&existing-tem=97229&search-term-full=Port+Orford-+OR' ;
    if (userid == 0) {
        return this.http.get(this.addapiHsPropertiesPara).toPromise();
   }else{
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  }
  homesearchpropertiesmap(filters, urlPara) {
    this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType ;
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
        //   let httpOptions = {
        //   headers: new HttpHeaders({
        //     'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
        //   })
        // };
        return this.http.get(this.addapiHsPropertiesPara).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      // });
  }
  homesearchpropertiesmapfavlistsort(filters, urlPara) {
    this.addapiHsPropertiesPara = this.apiHsProperties+'?request-type='+urlPara.requestType+urlPara.sorturl+'&favorites=1&user_id='+urlPara.userid ;
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  homesearchpropertiesmapfavlist(filters, urlPara) {
    this.addapiHsPropertiesPara = this.apiHsProperties+'?request-type='+urlPara.requestType+'&favorites=1&user_id='+urlPara.userid ;
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
  homesearchpropertiesmapfealist(filters, urlPara) {
    this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&ourlistings=1' ;
    return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  homesearchpropertiesmapfealistsort(filters, urlPara) {
    this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+urlPara.sorturl+'&request-type='+urlPara.requestType+'&ourlistings=1' ;
     return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  homesearchpropertiesfealistsort(currentPage, urlPara, userid) {

   this.addapiHsPropertiesPara = this.apiHsProperties+'?currentPage='+currentPage+urlPara.sorturl+'&ourlistings=1'+"&user_id="+userid ;
   return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  homesearchpropertiesfealist(currentPage, urlPara, userid) {

   this.addapiHsPropertiesPara = this.apiHsProperties+'?currentPage='+currentPage+'&ourlistings=1'+"&user_id="+userid ;
return this.http.get(this.addapiHsPropertiesPara).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.addapiHsPropertiesPara, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }



  getoptions() {
 return this.http.get(this.apiOption+"/options").toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.apiOption+"/options", httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  getpropertyType(category, property) {
return this.http.get(this.apiOption+"/property-type?categories="+category+"&classes="+property).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     // https://toptechre.com/public/api/auth/rmls/listing/filter/property-type?categories=Residential&classes=house
    //   //  return this.http.get(this.apiOption+"/property-type?categories="+category+"&classes="+property, httpOptions).toPromise();
    //    return this.http.get(this.apiOption+"/property-type?categories="+category+"&classes="+property, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
  searchBy(result, searchby) {
    return this.http.get(this.apiSearchBy+"?term="+result+"&zip-search="+searchby).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.apiSearchBy+"?term="+result+"&zip-search="+searchby, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }


  singlepropertyimage(propertyId) {
 // return this.http.get(this.apipropertyimage+"/"+propertyId+"/images"+"?id="+propertyId).toPromise();
 return this.http.get(this.apimapproperty+"?id="+propertyId).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.apimapproperty+"?id="+propertyId, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }

  singleproperty(propertyId, userid) {
    //https://toptechrealty.com/public/api/auth/rmls/listing/20667731?user_id=
    return this.http.get(this.apiproperty+"/"+propertyId+"?user_id="+userid).toPromise();
    // return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
    //     try {
    //       let httpOptions = {
    //       headers: new HttpHeaders({
    //         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
    //       })
    //     };
    //     return this.http.get(this.apiproperty+"/"+propertyId, httpOptions).toPromise();
    //   } catch ( e ) {
    //     console.log(e);
    //     this.unAuthorizedToken();
    //   }
    //   });
  }
    mapproperty(propertyId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apimapproperty+"?id="+propertyId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }


  homesearchpropertiesold(currentPage, filters) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('currentPage', currentPage);
        if(filters)
          {
              if(filters.address != undefined) {
                body = body.append('address', filters.address);
              }

              if(filters.property_type instanceof Array ) {
               filters.property_type.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('property_type[]', type);
                 }
              });
              } else if(filters.property_type != undefined && filters.property_type != '') {
                body = body.append('property_type[]', filters.property_type);
              }

              if(filters.updated_by instanceof Array ) {
               filters.updated_by.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('updated_by[]', type);
                 }
              });
              } else if(filters.updated_by != undefined && filters.updated_by != '') {
                body = body.append('updated_by[]', filters.updated_by);
              }

              if(filters.year != undefined) {
                body = body.append('year', filters.year);
              }

              if(filters.sqft != undefined) {
                body = body.append('sqft', filters.sqft);
              }

              if(filters.beds != undefined) {
                body = body.append('beds', filters.beds);
              }

              if(filters.baths != undefined) {
                body = body.append('baths', filters.baths);
              }

              if(filters.garage != undefined) {
                body = body.append('garage', filters.garage);
              }

              if(filters.created_at != undefined) {
                body = body.append('created_at', filters.created_at);
              }

              if(filters.updated_at != undefined) {
                body = body.append('updated_at', filters.updated_at);
              }

           }

        return this.http.get(this.apiHsProperties, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  login(data) {
    var email = data.email;
    var password = data.password;
    var remember_me = 1;
    let body: HttpParams = new HttpParams();
    body = body.append('email', email);
    body = body.append('password', password);
    body = body.append('remember_me', remember_me.toString());
   return this.http.post(this.apiLogin, body).toPromise();
  }
  login2(data) {
    var id = data.id;
    var email = data.email;
    var remember_me = 1;
     return this.http.get(this.apiLogin2+"?id="+id+"&email="+email).toPromise();
   //  let body: HttpParams = new HttpParams();
   //  body = body.append('email', id);
   //  body = body.append('password', email);
   // // return this.http.post(this.apiLogin2+"?id="+id+"&email="+email, body).toPromise();
   //    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
   //      try {
   //        let httpOptions = {
   //        headers: new HttpHeaders({
   //          'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
   //        })
   //      };
   //      return this.http.post(this.apiLogin2+"?id="+id+"&email="+email, httpOptions).toPromise();
   //    } catch ( e ) {
   //      console.log(e);
   //      this.unAuthorizedToken();
   //    }
   //    });
  }

  iOSLogin(data) {
    var email = data.email;
    var id = data.id;
    var name = data.name;
    var nick_name = data.nick_name;
    var remember_me = 1;
    let body: HttpParams = new HttpParams();
    body = body.append('email', email);
    body = body.append('name', name);
    body = body.append('nick_name', nick_name);
    body = body.append('id', id);
    body = body.append('remember_me', remember_me.toString());
   return this.http.post(this.apiiOSLogin, body).toPromise();
  }

  facebookLogin(data) {
    var email = data.email;
    var id = data.id;
    var name = data.name;
    var remember_me = 1;
    let body: HttpParams = new HttpParams();
    body = body.append('email', email);
    body = body.append('name', name);
    body = body.append('id', id);
    body = body.append('remember_me', remember_me.toString());
   return this.http.post(this.apiFBLogin, body).toPromise();
  }

  GPlusLogin(data) {
    var email = data.email;
    var id = data.id;
    var name = data.name;
    var remember_me = 1;
    let body: HttpParams = new HttpParams();
    body = body.append('email', email);
    body = body.append('name', name);
    body = body.append('id', id);
    body = body.append('remember_me', remember_me.toString());
   return this.http.post(this.apiGPlusLogin, body).toPromise();
  }

  resetPassword(data) {
    var email = data.email;
    let body: HttpParams = new HttpParams();
    body = body.append('email', email);
   return this.http.post(this.apiResetPassword, body).toPromise();
  }


  signup(data) {
    var first_name = data.first_name;
    var last_name = data.last_name;
    var email = data.email;
    var password = data.password;
    var phone_number = data.phone_number;
    var interested_in = data.interested_in;
    var timeframe = data.timeframe;
    var source = data.source;
    var comments = data.comments;
    var signup_referred_person = data.signup_referred_person;

    var remember_me = 1;
    let body: HttpParams = new HttpParams();
    body = body.append('first_name', first_name);
    body = body.append('last_name', last_name);
    body = body.append('email', email);
    body = body.append('password', password);
    body = body.append('phone_number', phone_number);
    body = body.append('interested_in', interested_in);
    body = body.append('timeframe', timeframe);
    body = body.append('source', source);
    body = body.append('comments', comments);
    body = body.append('signup_referred_person', signup_referred_person);

   return this.http.post(this.apiSignIn, body).toPromise();
  }

  quillimageupload(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.ckeImageUploadUrl, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }


  resendVerifyEmail() {
  return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
      try {
        let httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
        })
      };
      return this.http.post(this.apiSentVerifyEmail, "", httpOptions).toPromise();
    } catch ( e ) {
      console.log(e);
      this.unAuthorizedToken();
    }
    });
  }

  dashboard(currentPage, filters) {
  return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
      try {
        let httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
        })
      };
      return this.http.get(this.apiDashboard, httpOptions).toPromise();
    } catch ( e ) {
      console.log(e);
      this.unAuthorizedToken();
    }
    });
  }

  tsi() {
        try {
          return this.http.get(this.apiTSI).toPromise();
      } catch ( e ) {
        console.log(e);
      }
  }

  contacts() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiContacts, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  profile() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiGetProfile, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
     //   this.unAuthorizedToken();
      }
      });
  }

  updateprofile(data) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        console.log(data);
        let body: HttpParams = new HttpParams();
           body = body.append('first_name', data.first_name);
           body = body.append('last_name', data.last_name);
           body = body.append('email', data.email);
           body = body.append('alternate_email_1', data.alternate_email_1);
           body = body.append('password', data.password);
           body = body.append('phone_number', data.phone_number);
           body = body.append('alternate_phone_number_1', data.alternate_phone_number_1);
           body = body.append('current_address', data.current_address);
           body = body.append('owner_two_first_name', data.owner_two_first_name);
           body = body.append('owner_two_last_name', data.owner_two_last_name);
           body = body.append('owner_two_nick_name', data.owner_two_nick_name);
           body = body.append('owner_two_email', data.owner_two_email);
           body = body.append('owner_two_alternate_email', data.owner_two_alternate_email);
           body = body.append('owner_two_password', data.owner_two_password);
           body = body.append('owner_two_phone_number', data.owner_two_phone_number);
           body = body.append('owner_two_alternate_phone_number', data.owner_two_alternate_phone_number);
           body = body.append('owner_three_first_name', data.owner_three_first_name);
           body = body.append('owner_three_last_name', data.owner_three_last_name);
           body = body.append('owner_three_nick_name', data.owner_three_nick_name);
           body = body.append('owner_three_email', data.owner_three_email);
           body = body.append('owner_three_alternate_email', data.owner_three_alternate_email);
           body = body.append('owner_three_password', data.owner_three_password);
           body = body.append('owner_three_phone_number', data.owner_three_phone_number);
           body = body.append('owner_three_alternate_phone_number', data.owner_three_alternate_phone_number);
        return this.http.post(this.apiProfileUpdate, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  convertToTicket(data) {
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
       try {
         let httpOptions = {
         headers: new HttpHeaders({
           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
         })
       };
       let body: HttpParams = new HttpParams();
          body = body.append('subject', data.subject);
          body = body.append('body', data.body);
       return this.http.post(this.apiConvertToTicket, body, httpOptions).toPromise();
     } catch ( e ) {
       console.log(e);
       this.unAuthorizedToken();
     }
     });
 }

  tickets(currentPage, filters) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
            headers: new HttpHeaders({
              'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
            }),
          };
          console.log(filters);
          let body: HttpParams = new HttpParams();
          body = body.append('currentPage', currentPage);

          if(filters)
          {
              if(filters.subject != undefined) {
                body = body.append('subject', filters.subject);
              }

              if(filters.property != undefined) {
                body = body.append('property', filters.property);
              }

              if(filters.updated_at != undefined) {
                body = body.append('updated_at', filters.updated_at);
              }

              if(filters.status instanceof Array ) {
               filters.status.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('status[]', type);
                 }
              });
              } else if(filters.status != undefined && filters.status != '') {
                body = body.append('status[]', filters.status);
              }

              if(filters.group instanceof Array ) {
               filters.group.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('groups[]', type);
                 }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('groups[]', filters.group);
              }

              if(filters.staffs instanceof Array ) {
               filters.staffs.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('staffs[]', type);
                 }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('staffs[]', filters.staffs);
              }

              if(filters.priorities instanceof Array) {
               filters.priorities.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('priorities[]', type);
                  }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('priorities[]', filters.priorities);
              }

              if(filters.updated_by instanceof Array) {
               filters.updated_by.forEach(type => {
                  if(type != undefined && type != "") {
                    body = body.append('updated_by[]', type);
                  }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('updated_by[]', filters.updated_by);
              }
        }
        return this.http.post(this.apiTickets, body,  httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });

  }

  // hasAccess(ticketId) {
  //     return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
  //       try {
  //         let httpOptions = {
  //           headers: new HttpHeaders({
  //             'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
  //           }),
  //         };
  //         let body: HttpParams = new HttpParams();
  //         body = body.append('ticketid', ticketId);
  //       return this.http.post(this.apiTickets+"/getaccess",  httpOptions).toPromise();
  //     } catch ( e ) {
  //       console.log(e);
  //       this.unAuthorizedToken();
  //     }
  //     });

  // }

  //   hasAccess(body) {
  //   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
  //       try {
  //         let httpOptions = {
  //         headers: new HttpHeaders({
  //           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
  //         })
  //       };
  //       return this.http.post(this.apiTickets+"/getaccess", body, httpOptions).toPromise();
  //     } catch ( e ) {
  //       console.log(e);
  //       this.unAuthorizedToken();
  //     }
  //     });
  // }

    hasAccess(ticketid, userid) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
            headers: new HttpHeaders({
              'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
            }),
          };
          console.log(ticketid);
          let body: HttpParams = new HttpParams();
        body = body.append('ticketid', ticketid);
        body = body.append('userid', userid);
        return this.http.post(this.apiTickets+"/getaccess", body,  httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });

  }

  // hasAccess(ticketId) {
  //   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
  //       try {
  //         let httpOptions = {
  //         headers: new HttpHeaders({
  //           'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
  //         })
  //       };
  //       return this.http.get(this.apiTickets+"/getaccess", httpOptions).toPromise();
  //     } catch ( e ) {
  //       console.log(e);
  //       this.unAuthorizedToken();
  //     }
  //     });
  // }

  ticket(ticketId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTickets+"/"+ticketId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
    ticket2(ticketId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTickets2+"/"+ticketId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
    ticket3(ticketId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTickets3+"/"+ticketId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }
    ticketold(ticketId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTicketsold+"/"+ticketId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  //apiTicketsold

  ticketactivities(ticketId, currentPage) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('currentPage', currentPage);
        return this.http.post(this.apiTickets+"/"+ticketId+"/activities", body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  ticketcreate() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTicketCreate, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  ticketstore(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiTicketStore, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

getcustomer(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiTicketCustomer, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  getgroupuser(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiTicketGroupUser, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  ticketreply(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiTicketReply, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  ticketFilterOptions() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiTickets+"/filter-options", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  updateTicket(ticket) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('priority', ticket.priority);
        body = body.append('property_id', ticket.property_id);
        body = body.append('status', ticket.status);
        body = body.append('assigned_to', ticket.assigned_to);
        body = body.append('assigned_to_staff', ticket.assigned_to_staff);
        body = body.append('cc_emails', ticket.cc_emails);
        body = body.append('class', ticket.class);
        body = body.append('version', ticket.version);
        body = body.append('accessible_users', ticket.accessibleUserIds);

        //accessibleUserIds

        return this.http.post(this.apiTickets+"/"+ticket.id+"/update", body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  updateChecklist(ticketId, Checklist) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('is_completed', Checklist.is_completed);
        body = body.append('checklist', Checklist.checklist);

        return this.http.post(this.apiTickets+"/"+ticketId+"/checklists/"+Checklist.id+"/update" , body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  toggleChecklist(Checklist) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('is_completed', Checklist.is_completed);
        body = body.append('checklist', Checklist.checklist);

        return this.http.post(this.apiChecklist+"/"+Checklist.id+"/update" , body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  emails(currentPage, filters) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };

        let body: HttpParams = new HttpParams();
          body = body.append('currentPage', currentPage);

          if(filters)
          {
              if(filters.property != undefined) {
                body = body.append('property', filters.property);
              }

              if(filters.subject != undefined) {
                body = body.append('subject', filters.subject);
              }

              if(filters.updated_at != undefined) {
                body = body.append('updated_at', filters.updated_at);
              }

              if(filters.status instanceof Array ) {
               filters.status.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('status[]', type);
                 }
              });
              } else if(filters.status != undefined && filters.status != '') {
                body = body.append('status[]', filters.status);
              }

              if(filters.group instanceof Array ) {
               filters.group.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('groups[]', type);
                 }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('groups[]', filters.group);
              }

              if(filters.staffs instanceof Array ) {
               filters.staffs.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('staffs[]', type);
                 }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('staffs[]', filters.staffs);
              }

              if(filters.priorities instanceof Array) {
               filters.priorities.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('priorities[]', type);
                  }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('priorities[]', filters.priorities);
              }

              if(filters.updated_by instanceof Array) {
               filters.updated_by.forEach(type => {
                  if(type != undefined && type != "") {
                    body = body.append('updated_by[]', type);
                  }
              });
              } else if(filters.priorities != undefined && filters.priorities != '') {
                body = body.append('updated_by[]', filters.updated_by);
              }
        }

        return this.http.post(this.apiEmails, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  emailcreate() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiMailCreate, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  emailstore(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiMailStore, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  emailreply(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiMailReply, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }


  emailFilterOptions() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiEmails+"/filter/options", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  email(emailId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiEmails+"/"+emailId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  updateEmail(email) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('email_priority', email.email_priority);
        body = body.append('property_id', email.property_id);
        return this.http.post(this.apiEmails+"/"+email.id+"/update", body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertyFilterOptions() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiPropertyOptins, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertyCreateOptions() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiPropertyCreateOptins, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }


  properties(currentPage, filters) {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('currentPage', currentPage);
        if(filters)
          {
              if(filters.address != undefined) {
                body = body.append('address', filters.address);
              }

              if(filters.property_type instanceof Array ) {
               filters.property_type.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('property_type[]', type);
                 }
              });
              } else if(filters.property_type != undefined && filters.property_type != '') {
                body = body.append('property_type[]', filters.property_type);
              }

              if(filters.updated_by instanceof Array ) {
               filters.updated_by.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('updated_by[]', type);
                 }
              });
              } else if(filters.updated_by != undefined && filters.updated_by != '') {
                body = body.append('updated_by[]', filters.updated_by);
              }

              if(filters.year != undefined) {
                body = body.append('year', filters.year);
              }

              if(filters.sqft != undefined) {
                body = body.append('sqft', filters.sqft);
              }

              if(filters.beds != undefined) {
                body = body.append('beds', filters.beds);
              }

              if(filters.baths != undefined) {
                body = body.append('baths', filters.baths);
              }

              if(filters.garage != undefined) {
                body = body.append('garage', filters.garage);
              }

              if(filters.created_at != undefined) {
                body = body.append('created_at', filters.created_at);
              }

              if(filters.updated_at != undefined) {
                body = body.append('updated_at', filters.updated_at);
              }

           }
        return this.http.post(this.apiProperties, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertyeimagedelete(id) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiProperties+"/image/"+id+"/delete", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertyedit(id) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiProperties+"/"+id+"/edit", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertystore(body) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.post(this.apiPropertyStore, body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  property(propertyId) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiProperties+"/"+propertyId, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  propertyactivities(propertyId, currentPage) {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        let body: HttpParams = new HttpParams();
        body = body.append('currentPage', currentPage);
        return this.http.post(this.apiProperties+"/"+propertyId+"/activities", body, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

  userByProperties() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiuserByProperties, httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

     //Documents Start
     documents(currentPage, filters) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                let body: HttpParams = new HttpParams();
                body = body.append('currentPage', currentPage);
                if(filters)
                  {
                      if(filters.property != undefined) {
                        body = body.append('property', filters.property);
                      }

                      if(filters.name != undefined) {
                        body = body.append('name', filters.name);
                      }

                      if(filters.property_id instanceof Array ) {
                       filters.property_id.forEach(type => {
                         if(type != undefined && type != "") {
                            body = body.append('property_id[]', type);
                         }
                      });
                      } else if(filters.property_id != undefined && filters.property_id != '') {
                        body = body.append('property_id[]', filters.property_id);
                      }

                      if(filters.updated_by instanceof Array ) {
                       filters.updated_by.forEach(type => {
                         if(type != undefined && type != "") {
                            body = body.append('updated_by[]', type);
                         }
                      });
                      } else if(filters.updated_by != undefined && filters.updated_by != '') {
                        body = body.append('updated_by[]', filters.updated_by);
                      }

                      if(filters.created_by instanceof Array ) {
                       filters.created_by.forEach(type => {
                         if(type != undefined && type != "") {
                            body = body.append('created_by[]', type);
                         }
                      });
                      } else if(filters.created_by != undefined && filters.created_by != '') {
                        body = body.append('created_by[]', filters.created_by);
                      }

                      if(filters.created_at != undefined) {
                        body = body.append('created_at', filters.created_at);
                      }

                      if(filters.updated_at != undefined) {
                        body = body.append('updated_at', filters.updated_at);
                      }

                   }

                return this.http.post(this.apiDocuments, body, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }

     document(documentId) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.get(this.apiDocuments+"/"+documentId+"/view", httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }

     documentstore(formData) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.post(this.apiDocumentstore, formData, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }


    documentFilterOptions() {
      return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
          try {
            let httpOptions = {
            headers: new HttpHeaders({
              'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
            })
          };
          return this.http.get(this.apiDocumentOptins, httpOptions).toPromise();
        } catch ( e ) {
          console.log(e);
          this.unAuthorizedToken();
        }
        });
    }

     documentupdate(document) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                let body: HttpParams = new HttpParams();
                 body = body.append('id', document.id);
                 body = body.append('name', document.name);
                 body = body.append('property_id', document.property_id);

                return this.http.post(this.apiDocumentUpdate, body, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }

     pma(pmaid) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return this.http.get(this.apiDocuments+"/"+pmaid+"/envelop-history", httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
     }
   //Tasks Start
    //Activities Start
 tasks(currentPage, filters, status) {
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
         try {
         let httpOptions = {
       headers: new HttpHeaders({
         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
       })
      };
       let body: HttpParams = new HttpParams();
         body = body.append('currentPage', currentPage);
         body = body.append('status', status);
          if(filters)
          {
              if(filters.property != undefined) {
                body = body.append('property', filters.property);
              }
              if(filters.ticket != undefined) {
                body = body.append('ticket', filters.ticket);
              }
              if(filters.mail != undefined) {
                body = body.append('mail', filters.mail);
              }
              if(filters.range != undefined) {
                body = body.append('range', filters.range);
              }

              if(filters.categories instanceof Array ) {
               filters.categories.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('filter_category[]', type);
                 }
              });
              } else if(filters.categories != undefined && filters.categories != '') {
                body = body.append('filter_category[]', filters.categories);
              }
          }

      return this.http.post(this.apiTasks, body, httpOptions).toPromise();
      } catch ( e ) {
      console.log(e);
      this.unAuthorizedToken();
      }
   });
 }
   //Tasks End
   //Activities Start
 activities(currentPage, filters) {
   return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
         try {
         let httpOptions = {
       headers: new HttpHeaders({
         'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
       })
      };
       let body: HttpParams = new HttpParams();
        body = body.append('currentPage', currentPage);
        if(filters)
          {
              if(filters.range != undefined) {
                body = body.append('range', filters.range);
              }

              if(filters.categories instanceof Array ) {
               filters.categories.forEach(type => {
                 if(type != undefined && type != "") {
                    body = body.append('filter_category[]', type);
                 }
              });
              } else if(filters.categories != undefined && filters.categories != '') {
                body = body.append('filter_category[]', filters.categories);
              }
          }
      return this.http.post(this.apiActivities, body, httpOptions).toPromise();
      } catch ( e ) {
      console.log(e);
      this.unAuthorizedToken();
      }
   });
 }

 activityFilterOptions() {
    return this.storage.getStorage('auth_user_tokens').then( (auth_user_token : any) => {
        try {
          let httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  auth_user_token.token_type+" "+auth_user_token.access_token
          })
        };
        return this.http.get(this.apiActivities+"/filter/options", httpOptions).toPromise();
      } catch ( e ) {
        console.log(e);
        this.unAuthorizedToken();
      }
      });
  }

 //Activities End
     //Documents End
  // Global Toast Configuration
  toast(message, duration, position ) {
    let toast = this.toastController.create({
        message: message,
        duration: duration,
        position: position
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
  }
  // Global Toast Configuration

  //Global server error message
  serverError() {
   // this.toast("Server error. Please try again later", 3000, 'bottom');
  }
  unAuthorizedToken() {
   // this.toast("Your token expired. Please login and come back", 3000, 'bottom');
  }

  showload() {
       this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            showBackdrop: false,
            content: `<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`
          });
      this.loading.present();
    }
  clearAuthDatas() {
    this.storage.removeStorage('auth_user_tokens');
    this.storage.clearStorage();
  }

  saveFcm(token, platform, url) {
       return this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
            try {
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                let body: HttpParams = new HttpParams();
                 body = body.append('token', token);
                 body = body.append('platform', platform);
                 body = body.append('url', url);

                return this.http.post(this.apiFcm, body, httpOptions).toPromise();
            } catch (e) {
                console.log(e);
                this.unAuthorizedToken();
            }
        });
  }

  getFcmToken(url) {
    if (this.platform.is('cordova')) {
        this.fcm.getToken().then(token => {
          let userplatform = 'windows';
           if (this.platform.is('ios')) {
              userplatform = 'ios';
           } else  if (this.platform.is('android')) {
               userplatform = 'android';
           }
           this.saveFcm(token, userplatform, url).then( response => {
               if(url == 'Logout') {
                  this.clearAuthDatas();
                }
            } ).catch( error => {
            } );
        });
    } else {
      if(url == 'Logout') {
        this.clearAuthDatas();
      }
    }
  }

  showAlertPopup(data) {
    let alert = this.alertCtrl.create({
              title: data.title,
              message: data.body,
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'View',
                  handler: () => {
                    console.log('Buy clicked');
                    this.events.publish('fcminvoked:invoked', data);
                  }
                }
              ]
            });
            alert.present();
  }
  watchFcmNotifications() {
    if (this.platform.is('cordova')) {
      this.fcm.onNotification().subscribe(data => {
          //alert(JSON.stringify(data));
          if(data.wasTapped){
            console.log("Received in background");
            console.log(JSON.stringify(data));
            this.showAlertPopup(data);
          } else {
            console.log("Received in foreground");
            console.log(JSON.stringify(data));
            this.showAlertPopup(data);
          };
        });
      }
  }

}


