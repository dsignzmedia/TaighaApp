var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController, Platform, AlertController, Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
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
var ServiceProvider = /** @class */ (function () {
    //urlPara: any;
    function ServiceProvider(http, loadingCtrl, toastController, fcm, events, platform, alertCtrl, storage) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastController = toastController;
        this.fcm = fcm;
        this.events = events;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        // https://toptechre.com/public/api/auth/home/search/listings?search-term=97229&request-type=listings
        this.baseUrl = "https://toptechrealty.com/api/auth";
        this.homesearchUrl = "https://toptechrealty.com/public/api/auth";
        this.apiHsProperties = this.homesearchUrl + "/home/search/listings";
        this.apiSearchBy = this.homesearchUrl + "/home/search/by/term";
        this.apiOption = this.homesearchUrl + "/rmls/listing/filter";
        this.apiproperty = this.homesearchUrl + "/rmls/listing";
        this.apimapproperty = this.homesearchUrl + "/rmls/listing/map-infowindow";
        // public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";
        //public baseUrl : string = "/v1";   ""
        this.apiDashboard = this.baseUrl + "/user/dashboard";
        this.apiLogin = this.baseUrl + "/login";
        this.apiFBLogin = this.baseUrl + "/facebook/login";
        this.apiGPlusLogin = this.baseUrl + "/google/login";
        this.apiSignIn = this.baseUrl + "/signup";
        this.apiResetPassword = this.baseUrl + "/send/reset/link";
        this.apiTSI = this.baseUrl + "/get/timeframe/source/interest";
        this.apiSentVerifyEmail = this.baseUrl + "/user/resend/verify/email";
        this.apiTickets = this.baseUrl + "/user/tickets";
        this.apiUploadUserAvatar = this.baseUrl + "/user/upload/avatar";
        this.apiTicketCreate = this.baseUrl + "/user/tickets/create/ticket";
        this.apiTicketStore = this.baseUrl + "/user/tickets/store/ticket";
        this.apiTicketReply = this.baseUrl + "/user/tickets/store/reply";
        this.apiFcm = this.baseUrl + "/user/fcm/tokens";
        this.apiuserByProperties = this.baseUrl + "/userby/properties";
        this.apiChecklist = this.baseUrl + "/user/checklists";
        this.apiContacts = this.baseUrl + "/user/dashboard/contacts";
        this.apiEmails = this.baseUrl + "/user/emails";
        this.apiProperties = this.baseUrl + "/user/properties";
        this.apiPropertyOptins = this.baseUrl + "/user/properties/filter/options";
        this.apiPropertyCreateOptins = this.baseUrl + "/user/properties/create/options";
        this.apiPropertyStore = this.baseUrl + "/user/properties/store/property";
        this.apiDocumentOptins = this.baseUrl + "/user/documents/filter/options";
        this.apiDocuments = this.baseUrl + "/user/documents";
        this.apiDocumentstore = this.baseUrl + "/user/documents/store";
        this.apiDocumentUpdate = this.baseUrl + "/user/documents/update";
        this.apiActivities = this.baseUrl + "/user/activities";
        this.apiTasks = this.baseUrl + "/user/tasks";
        this.apiMailCreate = this.baseUrl + "/user/emails/create/email";
        this.apiMailStore = this.baseUrl + "/user/emails/store/email";
        this.apiMailReply = this.baseUrl + "/user/emails/store/reply";
        this.apiGetProfile = this.baseUrl + "/user/profile";
        this.apiProfileUpdate = this.baseUrl + "/user/update";
        this.apiConvertToTicket = this.baseUrl + "/user/tickets/convert/to/tickets";
        this.ckeImageUploadUrl = 'https://toptechrealty.com/tinymce/ckeditor/mobileupload';
        this.ckeImageUploadOptions = {
            ckfinder: { uploadUrl: this.ckeImageUploadUrl }
        };
        this.toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
            ['image'],
            [{ 'color': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'] // remove formatting button
        ];
        console.log('Hello ServiceProvider Provider');
    }
    ServiceProvider.prototype.homesearchpropertiesafter = function (currentPage, urlPara) {
        var _this = this;
        this.addapiHsPropertiesPara = this.apiHsProperties + '?search-term=' + urlPara[0] + '&request-type=' + urlPara[1] + '&beds=' + urlPara[2] + '&bath=' + urlPara[3] + '&min_price=' + urlPara[4] + '&max_price=' + urlPara[5] + '&sqft-min=' + urlPara[6] + '&sqft-max=' + urlPara[7] + '&lotsize-min=' + urlPara[8] + '&lotsize-max=' + urlPara[9] + '&openhouse=' + urlPara[10] + '&price_change=' + urlPara[11] + '&yearbuild-min=' + urlPara[12] + '&yearbuild-max=' + urlPara[13] + '&streetname=' + urlPara[14] + '&levels=' + urlPara[15] + '&legaldescription=' + urlPara[16] + '&elementaryschl=' + urlPara[17] + '&middleschl=' + urlPara[18] + '&highschl=' + urlPara[18] + '&keywords=' + urlPara[20] + '&listing_agent=' + urlPara[21] + '&listing_office=' + urlPara[22] + urlPara[23] + urlPara[24] + '&currentPage=' + currentPage;
        //  this.addapiHsPropertiesPara = this.apiHsProperties+'?search-term='+urlPara.searchTearm+'&request-type='+urlPara.requestType+'&currentPage='+currentPage ;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('currentPage', currentPage);
                return _this.http.get(_this.addapiHsPropertiesPara, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.homesearchproperties = function (currentPage, urlPara) {
        var _this = this;
        this.addapiHsPropertiesPara = this.apiHsProperties + '?search-term=' + urlPara.searchTearm + '&request-type=' + urlPara.requestType + '&currentPage=' + currentPage;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('currentPage', currentPage);
                return _this.http.get(_this.addapiHsPropertiesPara, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
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
    ServiceProvider.prototype.filterhomesearchproperties = function (currentPage, filters, urlPara) {
        //   public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";
        var _this = this;
        this.addapiHsPropertiesPara = this.apiHsProperties + '?search-term=' + urlPara[0] + '&request-type=' + urlPara[1] + '&beds=' + urlPara[2] + '&bath=' + urlPara[3] + '&min_price=' + urlPara[4] + '&max_price=' + urlPara[5] + '&sqft-min=' + urlPara[6] + '&sqft-max=' + urlPara[7] + '&lotsize-min=' + urlPara[8] + '&lotsize-max=' + urlPara[9] + '&openhouse=' + urlPara[10] + '&price_change=' + urlPara[11] + '&yearbuild-min=' + urlPara[12] + '&yearbuild-max=' + urlPara[13] + '&streetname=' + urlPara[14] + '&levels=' + urlPara[15] + '&legaldescription=' + urlPara[16] + '&elementaryschl=' + urlPara[17] + '&middleschl=' + urlPara[18] + '&highschl=' + urlPara[18] + '&keywords=' + urlPara[20] + '&listing_agent=' + urlPara[21] + '&listing_office=' + urlPara[22] + urlPara[23] + urlPara[24];
        //  this.addapiHsPropertiesPara = this.apiHsProperties+'?zip-search=1&search-type=city&search-term=por&existing-tem=97229&search-term-full=Port+Orford-+OR' ;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.addapiHsPropertiesPara, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.filterhomesearchpropertiesmap = function (currentPage, filters, urlPara) {
        //   public apiHsProperties: string = this.homesearchUrl+"/home/search/listings?search-term=97229&request-type=listings";
        var _this = this;
        this.addapiHsPropertiesPara = this.apiHsProperties + '?search-term=' + urlPara[0] + '&request-type=map&beds=' + urlPara[2] + '&bath=' + urlPara[3] + '&min_price=' + urlPara[4] + '&max_price=' + urlPara[5] + '&sqft-min=' + urlPara[6] + '&sqft-max=' + urlPara[7] + '&lotsize-min=' + urlPara[8] + '&lotsize-max=' + urlPara[9] + '&openhouse=' + urlPara[10] + '&price_change=' + urlPara[11] + '&yearbuild-min=' + urlPara[12] + '&yearbuild-max=' + urlPara[13] + '&streetname=' + urlPara[14] + '&levels=' + urlPara[15] + '&legaldescription=' + urlPara[16] + '&elementaryschl=' + urlPara[17] + '&middleschl=' + urlPara[18] + '&highschl=' + urlPara[18] + '&keywords=' + urlPara[20] + '&listing_agent=' + urlPara[21] + '&listing_office=' + urlPara[22] + urlPara[23] + urlPara[24];
        //  this.addapiHsPropertiesPara = this.apiHsProperties+'?zip-search=1&search-type=city&search-term=por&existing-tem=97229&search-term-full=Port+Orford-+OR' ;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.addapiHsPropertiesPara, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.homesearchpropertiesmap = function (filters, urlPara) {
        var _this = this;
        this.addapiHsPropertiesPara = this.apiHsProperties + '?search-term=' + urlPara.searchTearm + '&request-type=' + urlPara.requestType;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.addapiHsPropertiesPara, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.getoptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiOption + "/options", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.getpropertyType = function (category, property) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                // https://toptechre.com/public/api/auth/rmls/listing/filter/property-type?categories=Residential&classes=house 
                //  return this.http.get(this.apiOption+"/property-type?categories="+category+"&classes="+property, httpOptions).toPromise();
                return _this.http.get(_this.apiOption + "/property-type?categories=" + category + "&classes=" + property, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.searchBy = function (result, searchby) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiSearchBy + "?term=" + result + "&zip-search=" + searchby, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.singleproperty = function (propertyId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiproperty + "/" + propertyId, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.mapproperty = function (propertyId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apimapproperty + "?id=" + propertyId, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.homesearchpropertiesold = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_1 = new HttpParams();
                body_1 = body_1.append('currentPage', currentPage);
                if (filters) {
                    if (filters.address != undefined) {
                        body_1 = body_1.append('address', filters.address);
                    }
                    if (filters.property_type instanceof Array) {
                        filters.property_type.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_1 = body_1.append('property_type[]', type);
                            }
                        });
                    }
                    else if (filters.property_type != undefined && filters.property_type != '') {
                        body_1 = body_1.append('property_type[]', filters.property_type);
                    }
                    if (filters.updated_by instanceof Array) {
                        filters.updated_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_1 = body_1.append('updated_by[]', type);
                            }
                        });
                    }
                    else if (filters.updated_by != undefined && filters.updated_by != '') {
                        body_1 = body_1.append('updated_by[]', filters.updated_by);
                    }
                    if (filters.year != undefined) {
                        body_1 = body_1.append('year', filters.year);
                    }
                    if (filters.sqft != undefined) {
                        body_1 = body_1.append('sqft', filters.sqft);
                    }
                    if (filters.beds != undefined) {
                        body_1 = body_1.append('beds', filters.beds);
                    }
                    if (filters.baths != undefined) {
                        body_1 = body_1.append('baths', filters.baths);
                    }
                    if (filters.garage != undefined) {
                        body_1 = body_1.append('garage', filters.garage);
                    }
                    if (filters.created_at != undefined) {
                        body_1 = body_1.append('created_at', filters.created_at);
                    }
                    if (filters.updated_at != undefined) {
                        body_1 = body_1.append('updated_at', filters.updated_at);
                    }
                }
                return _this.http.get(_this.apiHsProperties, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.login = function (data) {
        var email = data.email;
        var password = data.password;
        var remember_me = 1;
        var body = new HttpParams();
        body = body.append('email', email);
        body = body.append('password', password);
        body = body.append('remember_me', remember_me.toString());
        return this.http.post(this.apiLogin, body).toPromise();
    };
    ServiceProvider.prototype.facebookLogin = function (data) {
        var email = data.email;
        var id = data.id;
        var name = data.name;
        var remember_me = 1;
        var body = new HttpParams();
        body = body.append('email', email);
        body = body.append('name', name);
        body = body.append('id', id);
        body = body.append('remember_me', remember_me.toString());
        return this.http.post(this.apiFBLogin, body).toPromise();
    };
    ServiceProvider.prototype.GPlusLogin = function (data) {
        var email = data.email;
        var id = data.id;
        var name = data.name;
        var remember_me = 1;
        var body = new HttpParams();
        body = body.append('email', email);
        body = body.append('name', name);
        body = body.append('id', id);
        body = body.append('remember_me', remember_me.toString());
        return this.http.post(this.apiGPlusLogin, body).toPromise();
    };
    ServiceProvider.prototype.resetPassword = function (data) {
        var email = data.email;
        var body = new HttpParams();
        body = body.append('email', email);
        return this.http.post(this.apiResetPassword, body).toPromise();
    };
    ServiceProvider.prototype.signup = function (data) {
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
        var body = new HttpParams();
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
    };
    ServiceProvider.prototype.quillimageupload = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.ckeImageUploadUrl, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.resendVerifyEmail = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiSentVerifyEmail, "", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.dashboard = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiDashboard, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.tsi = function () {
        try {
            return this.http.get(this.apiTSI).toPromise();
        }
        catch (e) {
            console.log(e);
        }
    };
    ServiceProvider.prototype.contacts = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiContacts, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.profile = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiGetProfile, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.updateprofile = function (data) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                console.log(data);
                var body = new HttpParams();
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
                return _this.http.post(_this.apiProfileUpdate, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.convertToTicket = function (data) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('subject', data.subject);
                body = body.append('body', data.body);
                return _this.http.post(_this.apiConvertToTicket, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.tickets = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    }),
                };
                console.log(filters);
                var body_2 = new HttpParams();
                body_2 = body_2.append('currentPage', currentPage);
                if (filters) {
                    if (filters.subject != undefined) {
                        body_2 = body_2.append('subject', filters.subject);
                    }
                    if (filters.property != undefined) {
                        body_2 = body_2.append('property', filters.property);
                    }
                    if (filters.updated_at != undefined) {
                        body_2 = body_2.append('updated_at', filters.updated_at);
                    }
                    if (filters.status instanceof Array) {
                        filters.status.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_2 = body_2.append('status[]', type);
                            }
                        });
                    }
                    else if (filters.status != undefined && filters.status != '') {
                        body_2 = body_2.append('status[]', filters.status);
                    }
                    if (filters.group instanceof Array) {
                        filters.group.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_2 = body_2.append('groups[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_2 = body_2.append('groups[]', filters.group);
                    }
                    if (filters.staffs instanceof Array) {
                        filters.staffs.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_2 = body_2.append('staffs[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_2 = body_2.append('staffs[]', filters.staffs);
                    }
                    if (filters.priorities instanceof Array) {
                        filters.priorities.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_2 = body_2.append('priorities[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_2 = body_2.append('priorities[]', filters.priorities);
                    }
                    if (filters.updated_by instanceof Array) {
                        filters.updated_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_2 = body_2.append('updated_by[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_2 = body_2.append('updated_by[]', filters.updated_by);
                    }
                }
                return _this.http.post(_this.apiTickets, body_2, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticket = function (ticketId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiTickets + "/" + ticketId, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticketactivities = function (ticketId, currentPage) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('currentPage', currentPage);
                return _this.http.post(_this.apiTickets + "/" + ticketId + "/activities", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticketcreate = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiTicketCreate, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticketstore = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiTicketStore, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticketreply = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiTicketReply, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.ticketFilterOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiTickets + "/filter-options", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.updateTicket = function (ticket) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('priority', ticket.priority);
                body = body.append('property_id', ticket.property_id);
                return _this.http.post(_this.apiTickets + "/" + ticket.id + "/update", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.updateChecklist = function (ticketId, Checklist) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('is_completed', Checklist.is_completed);
                body = body.append('checklist', Checklist.checklist);
                return _this.http.post(_this.apiTickets + "/" + ticketId + "/checklists/" + Checklist.id + "/update", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.toggleChecklist = function (Checklist) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('is_completed', Checklist.is_completed);
                body = body.append('checklist', Checklist.checklist);
                return _this.http.post(_this.apiChecklist + "/" + Checklist.id + "/update", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.emails = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_3 = new HttpParams();
                body_3 = body_3.append('currentPage', currentPage);
                if (filters) {
                    if (filters.property != undefined) {
                        body_3 = body_3.append('property', filters.property);
                    }
                    if (filters.subject != undefined) {
                        body_3 = body_3.append('subject', filters.subject);
                    }
                    if (filters.updated_at != undefined) {
                        body_3 = body_3.append('updated_at', filters.updated_at);
                    }
                    if (filters.status instanceof Array) {
                        filters.status.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_3 = body_3.append('status[]', type);
                            }
                        });
                    }
                    else if (filters.status != undefined && filters.status != '') {
                        body_3 = body_3.append('status[]', filters.status);
                    }
                    if (filters.group instanceof Array) {
                        filters.group.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_3 = body_3.append('groups[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_3 = body_3.append('groups[]', filters.group);
                    }
                    if (filters.staffs instanceof Array) {
                        filters.staffs.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_3 = body_3.append('staffs[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_3 = body_3.append('staffs[]', filters.staffs);
                    }
                    if (filters.priorities instanceof Array) {
                        filters.priorities.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_3 = body_3.append('priorities[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_3 = body_3.append('priorities[]', filters.priorities);
                    }
                    if (filters.updated_by instanceof Array) {
                        filters.updated_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_3 = body_3.append('updated_by[]', type);
                            }
                        });
                    }
                    else if (filters.priorities != undefined && filters.priorities != '') {
                        body_3 = body_3.append('updated_by[]', filters.updated_by);
                    }
                }
                return _this.http.post(_this.apiEmails, body_3, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.emailcreate = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiMailCreate, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.emailstore = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiMailStore, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.emailreply = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiMailReply, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.emailFilterOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiEmails + "/filter/options", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.email = function (emailId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiEmails + "/" + emailId, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.updateEmail = function (email) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('email_priority', email.email_priority);
                body = body.append('property_id', email.property_id);
                return _this.http.post(_this.apiEmails + "/" + email.id + "/update", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertyFilterOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiPropertyOptins, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertyCreateOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiPropertyCreateOptins, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.properties = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_4 = new HttpParams();
                body_4 = body_4.append('currentPage', currentPage);
                if (filters) {
                    if (filters.address != undefined) {
                        body_4 = body_4.append('address', filters.address);
                    }
                    if (filters.property_type instanceof Array) {
                        filters.property_type.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_4 = body_4.append('property_type[]', type);
                            }
                        });
                    }
                    else if (filters.property_type != undefined && filters.property_type != '') {
                        body_4 = body_4.append('property_type[]', filters.property_type);
                    }
                    if (filters.updated_by instanceof Array) {
                        filters.updated_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_4 = body_4.append('updated_by[]', type);
                            }
                        });
                    }
                    else if (filters.updated_by != undefined && filters.updated_by != '') {
                        body_4 = body_4.append('updated_by[]', filters.updated_by);
                    }
                    if (filters.year != undefined) {
                        body_4 = body_4.append('year', filters.year);
                    }
                    if (filters.sqft != undefined) {
                        body_4 = body_4.append('sqft', filters.sqft);
                    }
                    if (filters.beds != undefined) {
                        body_4 = body_4.append('beds', filters.beds);
                    }
                    if (filters.baths != undefined) {
                        body_4 = body_4.append('baths', filters.baths);
                    }
                    if (filters.garage != undefined) {
                        body_4 = body_4.append('garage', filters.garage);
                    }
                    if (filters.created_at != undefined) {
                        body_4 = body_4.append('created_at', filters.created_at);
                    }
                    if (filters.updated_at != undefined) {
                        body_4 = body_4.append('updated_at', filters.updated_at);
                    }
                }
                return _this.http.post(_this.apiProperties, body_4, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertyeimagedelete = function (id) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiProperties + "/image/" + id + "/delete", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertyedit = function (id) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiProperties + "/" + id + "/edit", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertystore = function (body) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiPropertyStore, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.property = function (propertyId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiProperties + "/" + propertyId, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.propertyactivities = function (propertyId, currentPage) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('currentPage', currentPage);
                return _this.http.post(_this.apiProperties + "/" + propertyId + "/activities", body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.userByProperties = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiuserByProperties, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    //Documents Start
    ServiceProvider.prototype.documents = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_5 = new HttpParams();
                body_5 = body_5.append('currentPage', currentPage);
                if (filters) {
                    if (filters.property != undefined) {
                        body_5 = body_5.append('property', filters.property);
                    }
                    if (filters.name != undefined) {
                        body_5 = body_5.append('name', filters.name);
                    }
                    if (filters.property_id instanceof Array) {
                        filters.property_id.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_5 = body_5.append('property_id[]', type);
                            }
                        });
                    }
                    else if (filters.property_id != undefined && filters.property_id != '') {
                        body_5 = body_5.append('property_id[]', filters.property_id);
                    }
                    if (filters.updated_by instanceof Array) {
                        filters.updated_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_5 = body_5.append('updated_by[]', type);
                            }
                        });
                    }
                    else if (filters.updated_by != undefined && filters.updated_by != '') {
                        body_5 = body_5.append('updated_by[]', filters.updated_by);
                    }
                    if (filters.created_by instanceof Array) {
                        filters.created_by.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_5 = body_5.append('created_by[]', type);
                            }
                        });
                    }
                    else if (filters.created_by != undefined && filters.created_by != '') {
                        body_5 = body_5.append('created_by[]', filters.created_by);
                    }
                    if (filters.created_at != undefined) {
                        body_5 = body_5.append('created_at', filters.created_at);
                    }
                    if (filters.updated_at != undefined) {
                        body_5 = body_5.append('updated_at', filters.updated_at);
                    }
                }
                return _this.http.post(_this.apiDocuments, body_5, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.document = function (documentId) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiDocuments + "/" + documentId + "/view", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.documentstore = function (formData) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.post(_this.apiDocumentstore, formData, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.documentFilterOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiDocumentOptins, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.documentupdate = function (document) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('id', document.id);
                body = body.append('name', document.name);
                body = body.append('property_id', document.property_id);
                return _this.http.post(_this.apiDocumentUpdate, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.pma = function (pmaid) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiDocuments + "/" + pmaid + "/envelop-history", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    //Tasks Start
    //Activities Start
    ServiceProvider.prototype.tasks = function (currentPage, filters, status) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_6 = new HttpParams();
                body_6 = body_6.append('currentPage', currentPage);
                body_6 = body_6.append('status', status);
                if (filters) {
                    if (filters.property != undefined) {
                        body_6 = body_6.append('property', filters.property);
                    }
                    if (filters.ticket != undefined) {
                        body_6 = body_6.append('ticket', filters.ticket);
                    }
                    if (filters.mail != undefined) {
                        body_6 = body_6.append('mail', filters.mail);
                    }
                    if (filters.range != undefined) {
                        body_6 = body_6.append('range', filters.range);
                    }
                    if (filters.categories instanceof Array) {
                        filters.categories.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_6 = body_6.append('filter_category[]', type);
                            }
                        });
                    }
                    else if (filters.categories != undefined && filters.categories != '') {
                        body_6 = body_6.append('filter_category[]', filters.categories);
                    }
                }
                return _this.http.post(_this.apiTasks, body_6, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    //Tasks End
    //Activities Start
    ServiceProvider.prototype.activities = function (currentPage, filters) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body_7 = new HttpParams();
                body_7 = body_7.append('currentPage', currentPage);
                if (filters) {
                    if (filters.range != undefined) {
                        body_7 = body_7.append('range', filters.range);
                    }
                    if (filters.categories instanceof Array) {
                        filters.categories.forEach(function (type) {
                            if (type != undefined && type != "") {
                                body_7 = body_7.append('filter_category[]', type);
                            }
                        });
                    }
                    else if (filters.categories != undefined && filters.categories != '') {
                        body_7 = body_7.append('filter_category[]', filters.categories);
                    }
                }
                return _this.http.post(_this.apiActivities, body_7, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.activityFilterOptions = function () {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                return _this.http.get(_this.apiActivities + "/filter/options", httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    //Activities End
    //Documents End
    // Global Toast Configuration
    ServiceProvider.prototype.toast = function (message, duration, position) {
        var toast = this.toastController.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    // Global Toast Configuration
    //Global server error message
    ServiceProvider.prototype.serverError = function () {
        this.toast("Server error. Please try again later", 3000, 'bottom');
    };
    ServiceProvider.prototype.unAuthorizedToken = function () {
        this.toast("Your token expired. Please login and come back", 3000, 'bottom');
    };
    ServiceProvider.prototype.showload = function () {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            showBackdrop: false,
            content: "<div class=\"spinner\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>"
        });
        this.loading.present();
    };
    ServiceProvider.prototype.clearAuthDatas = function () {
        this.storage.removeStorage('auth_user_tokens');
        this.storage.clearStorage();
    };
    ServiceProvider.prototype.saveFcm = function (token, platform, url) {
        var _this = this;
        return this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            try {
                var httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': auth_user_token.token_type + " " + auth_user_token.access_token
                    })
                };
                var body = new HttpParams();
                body = body.append('token', token);
                body = body.append('platform', platform);
                body = body.append('url', url);
                return _this.http.post(_this.apiFcm, body, httpOptions).toPromise();
            }
            catch (e) {
                console.log(e);
                _this.unAuthorizedToken();
            }
        });
    };
    ServiceProvider.prototype.getFcmToken = function (url) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.fcm.getToken().then(function (token) {
                var userplatform = 'windows';
                if (_this.platform.is('ios')) {
                    userplatform = 'ios';
                }
                else if (_this.platform.is('android')) {
                    userplatform = 'android';
                }
                _this.saveFcm(token, userplatform, url).then(function (response) {
                    if (url == 'Logout') {
                        _this.clearAuthDatas();
                    }
                }).catch(function (error) {
                });
            });
        }
        else {
            if (url == 'Logout') {
                this.clearAuthDatas();
            }
        }
    };
    ServiceProvider.prototype.showAlertPopup = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: data.title,
            message: data.body,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'View',
                    handler: function () {
                        console.log('Buy clicked');
                        _this.events.publish('fcminvoked:invoked', data);
                    }
                }
            ]
        });
        alert.present();
    };
    ServiceProvider.prototype.watchFcmNotifications = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.fcm.onNotification().subscribe(function (data) {
                //alert(JSON.stringify(data));
                if (data.wasTapped) {
                    console.log("Received in background");
                    console.log(JSON.stringify(data));
                    _this.showAlertPopup(data);
                }
                else {
                    console.log("Received in foreground");
                    console.log(JSON.stringify(data));
                    _this.showAlertPopup(data);
                }
                ;
            });
        }
    };
    ServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            LoadingController,
            ToastController,
            FCM,
            Events,
            Platform,
            AlertController,
            StorageProvider])
    ], ServiceProvider);
    return ServiceProvider;
}());
export { ServiceProvider };
//# sourceMappingURL=service.js.map