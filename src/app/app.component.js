var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { TicketviewPage } from '../pages/ticketview/ticketview';
import { MailviewPage } from '../pages/mailview/mailview';
import { DocumentviewPage } from '../pages/documentview/documentview';
// import { HomeSearchPage } from '../pages/home-search/home-search'; 
// import { CardViewPage } from '../pages/home-search/card-view/card-view'; 
import { PushTabsPage } from '../pages/home-search/push-tabs/push-tabs';
import { AboutUsPage } from '../pages/home-search/about-us/about-us';
import { PropertyviewPage } from '../pages/propertyview/propertyview';
import { PostMessagePage } from '../pages/post-message/post-message';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsServicePage } from '../pages/terms-service/terms-service';
import { ContactusPage } from '../pages/contactus/contactus';
import { FCM } from '@ionic-native/fcm';
var MyApp = /** @class */ (function () {
    function MyApp(platform, modalCtrl, statusBar, splashScreen, service, fcm, events, storage, App) {
        var _this = this;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.service = service;
        this.fcm = fcm;
        this.events = events;
        this.storage = storage;
        this.App = App;
        this.isMoreMenu = false;
        this.isHomeSearchMoreMenu = false;
        this.storedTokens = "";
        this.initializeApp();
        this.service.getFcmToken("Initialize");
        events.subscribe('fcminvoked:invoked', function (data) {
            console.log('fcminvoked:invoked');
            if (data.title) {
                _this.redirectToFcm(data);
            }
        });
        events.subscribe('moretabs:invoked', function (data) {
            console.log('moretabs:invoked');
            _this.isMoreMenu = true;
        });
    }
    MyApp.prototype.redirectToFcm = function (data) {
        var _this = this;
        if (data.notify_type == 'ticket') {
            this.nav.push(TicketviewPage, { ticketId: data.notify_id });
        }
        if (data.notify_type == 'email') {
            this.nav.push(MailviewPage, { emailId: data.notify_id });
        }
        if (data.notify_type == 'properties') {
            this.nav.push(PropertyviewPage, { propertyId: data.notify_id });
        }
        if (data.notify_type == 'documents') {
            this.nav.push(DocumentviewPage, { documentId: data.notify_id });
        }
        if (data.notify_type == 'verified') {
            this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
                auth_user_token.is_email_verified = 1;
                _this.storage.setStorage('auth_user_tokens', auth_user_token).then(function (res) {
                    _this.nav.push(TabsPage);
                });
            });
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (_this.platform.is('cordova')) {
                _this.storage.getStorage('auth_user_tokens').then(function (token) {
                    if (token != '' && token != null && token != undefined) {
                        //this.rootPage = TabsPage
                        _this.storedTokens = token;
                        _this.rootPage = TabsPage;
                        _this.fcm.onNotification().subscribe(function (data) {
                            console.log(JSON.stringify(data));
                            if (data.wasTapped) {
                                _this.redirectToFcm(data);
                            }
                        });
                    }
                    else {
                        _this.rootPage = SigninPage;
                    }
                }).catch(function (error) {
                    _this.rootPage = SigninPage;
                });
            }
            else {
                _this.dynamicRedirect(TabsPage);
            }
        });
    };
    MyApp.prototype.dynamicRedirect = function (page) {
        var _this = this;
        this.storage.getStorage('auth_user_tokens').then(function (token) {
            if (token != '' && token != null && token != undefined) {
                //this.rootPage = TabsPage 
                // this.rootPage = page  
                _this.rootPage = PushTabsPage;
            }
            else {
                _this.rootPage = SigninPage;
            }
        }).catch(function (error) {
            _this.rootPage = SigninPage;
        });
    };
    MyApp.prototype.menuClosed = function () {
        this.isMoreMenu = false;
        this.currentActiveTab = "";
    };
    MyApp.prototype.openPage = function (pageName) {
        //this.tabsPageRef.tabRef.select(pageName);
        console.log(pageName);
        this.nav.getActiveChildNav().select(pageName);
        this.currentActiveTab = pageName;
    };
    MyApp.prototype.goToProfile = function () {
        this.nav.setRoot(ProfilePage);
    };
    MyApp.prototype.goToHomeSearch = function () {
        this.nav.push(PushTabsPage);
        // this.nav.setRoot(CardViewPage);      
    };
    MyApp.prototype.logout = function () {
        this.service.getFcmToken("Logout");
        this.service.watchFcmNotifications();
        this.nav.setRoot(SigninPage);
    };
    MyApp.prototype.goToPostMessage = function () {
        this.nav.setRoot(PostMessagePage);
    };
    MyApp.prototype.goToPrivacyPolicy = function () {
        this.nav.setRoot(PrivacyPolicyPage);
    };
    MyApp.prototype.goToTermsService = function () {
        this.nav.setRoot(TermsServicePage);
    };
    MyApp.prototype.goTocontact = function () {
        this.nav.setRoot(ContactusPage);
    };
    MyApp.prototype.goToDashboard = function () {
        this.isMoreMenu = true;
        this.nav.push(TabsPage);
    };
    MyApp.prototype.goToProperties = function () {
        this.isMoreMenu = false;
        // this.nav.push(MypropertiesPage); 
        // this.tab2Root = MypropertiesPage;
        //  this.App.getRootNav().push(MypropertiesPage);
        //this.nav.push(MypropertiesPage); 
        var nav = this.App.getRootNav();
        nav.setRoot(TabsPage, { selectedTab: 3 });
    };
    MyApp.prototype.goToFeatured = function () {
        this.isMoreMenu = false;
        var nav = this.App.getRootNav();
        nav.setRoot(PushTabsPage, { selectedTab: 4 });
    };
    MyApp.prototype.goToAboutUs = function () {
        this.isMoreMenu = true;
        this.nav.push(AboutUsPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            ModalController,
            StatusBar,
            SplashScreen,
            ServiceProvider,
            FCM,
            Events,
            StorageProvider,
            App])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map