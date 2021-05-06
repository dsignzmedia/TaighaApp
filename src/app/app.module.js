var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ActivitiesPage } from '../pages/activities/activities';
import { DocumentsPage } from '../pages/documents/documents';
import { MailsPage } from '../pages/mails/mails';
import { MypropertiesPage } from '../pages/myproperties/myproperties';
import { TicketsPage } from '../pages/tickets/tickets';
import { FilterpropertiesPage } from '../pages/filterproperties/filterproperties';
import { FilterticketsPage } from '../pages/filtertickets/filtertickets';
import { FiltermailsPage } from '../pages/filtermails/filtermails';
import { FilterdocumentsPage } from '../pages/filterdocuments/filterdocuments';
import { FilteractivitiesPage } from '../pages/filteractivities/filteractivities';
import { NewmailPage } from '../pages/newmail/newmail';
import { NewticketsPage } from '../pages/newtickets/newtickets';
import { NewdocumentPage } from '../pages/newdocument/newdocument';
import { NewpropertiesPage } from '../pages/newproperties/newproperties';
import { TicketviewPage } from '../pages/ticketview/ticketview';
import { MailviewPage } from '../pages/mailview/mailview';
import { PopoverpagePage } from '../pages/popoverpage/popoverpage';
import { ProfilePage } from '../pages/profile/profile';
import { NewdocumentupdatePage } from '../pages/newdocumentupdate/newdocumentupdate';
import { PostMessagePage } from '../pages/post-message/post-message';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsServicePage } from '../pages/terms-service/terms-service';
import { EmailNotVerifiedPage } from '../pages/email-not-verified/email-not-verified';
// import { HomeSearchPage } from '../pages/home-search/home-search'; 
// import { CardViewPage } from '../pages/home-search/card-view/card-view'; 
import { FilterPage } from '../pages/home-search/filter/filter';
import { StartNowPage } from '../pages/home-search/start-now/start-now';
import { PushTabsPage } from '../pages/home-search/push-tabs/push-tabs';
import { SearchPage } from '../pages/home-search/search/search';
import { FeaturedPage } from '../pages/home-search/featured/featured';
import { FavoritesPage } from '../pages/home-search/favorites/favorites';
import { SavedPage } from '../pages/home-search/saved/saved';
import { PropertyDetailPage } from '../pages/home-search/property-detail/property-detail';
import { SearchModalPage } from '../pages/home-search/search-modal/search-modal';
import { AboutUsPage } from '../pages/home-search/about-us/about-us';
import { ViewImagePage } from '../pages/home-search/view-image/view-image';
import { RequestTourPage } from '../pages/home-search/request-tour/request-tour';
import { EditChoosePage } from '../pages/home-search/edit-choose/edit-choose';
import { QtoModalPage } from '../pages/home-search/qto-modal/qto-modal';
import { MapInfoPage } from '../pages/home-search/map-info/map-info';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ContactusPage } from '../pages/contactus/contactus';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule } from '@angular/common/http';
import { StorageProvider } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';
import { PropertyviewPage } from '../pages/propertyview/propertyview';
import { DocumentviewmodalPage } from '../pages/documentviewmodal/documentviewmodal';
import { DocumentviewPage } from '../pages/documentview/documentview';
import { DatePipe } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// Import Angular2 plugin.
import { CalendarModule } from "ion2-calendar";
import { BrMaskerModule } from 'brmasker-ionic-3';
import { FCM } from '@ionic-native/fcm';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { QuillModule } from 'ngx-quill';
import { TabpopoverPage } from '../pages/tabpopover/tabpopover';
import { TasksPage } from '../pages/tasks/tasks';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                TabsPage,
                SigninPage,
                SignupPage,
                ActivitiesPage,
                DocumentsPage,
                MailsPage,
                MypropertiesPage,
                TicketsPage,
                FilterpropertiesPage,
                FilterticketsPage,
                FilterdocumentsPage,
                FilteractivitiesPage,
                FiltermailsPage,
                NewticketsPage,
                NewmailPage,
                NewdocumentPage,
                NewpropertiesPage,
                TicketviewPage,
                MailviewPage,
                // CardViewPage,
                FilterPage,
                MapInfoPage,
                SearchModalPage,
                EditChoosePage,
                RequestTourPage,
                QtoModalPage,
                ViewImagePage,
                PropertyDetailPage,
                AboutUsPage,
                SearchPage,
                FeaturedPage,
                FavoritesPage,
                PushTabsPage,
                SavedPage,
                StartNowPage,
                PropertyviewPage,
                DocumentviewmodalPage,
                PopoverpagePage,
                ProfilePage,
                NewdocumentupdatePage,
                DocumentviewPage,
                PostMessagePage,
                PrivacyPolicyPage,
                TermsServicePage,
                ContactusPage,
                TabpopoverPage,
                TasksPage,
                ForgetPasswordPage,
                EmailNotVerifiedPage
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                IonicStorageModule.forRoot(),
                IonicModule.forRoot(MyApp, {
                    menuType: 'push',
                    scrollAssist: false
                }),
                CalendarModule,
                IonicImageViewerModule,
                QuillModule,
                BrMaskerModule,
                TagInputModule,
                FormsModule,
                ReactiveFormsModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                TabsPage,
                SigninPage,
                SignupPage,
                ActivitiesPage,
                DocumentsPage,
                MailsPage,
                MypropertiesPage,
                TicketsPage,
                FilterpropertiesPage,
                FilterticketsPage,
                FilterdocumentsPage,
                FilteractivitiesPage,
                FiltermailsPage,
                NewticketsPage,
                NewmailPage,
                NewdocumentPage,
                NewpropertiesPage,
                TicketviewPage,
                MailviewPage,
                // CardViewPage,
                FilterPage,
                MapInfoPage,
                SearchModalPage,
                EditChoosePage,
                RequestTourPage,
                QtoModalPage,
                ViewImagePage,
                PropertyDetailPage,
                AboutUsPage,
                SearchPage,
                FeaturedPage,
                SavedPage,
                FavoritesPage,
                PushTabsPage,
                StartNowPage,
                PropertyviewPage,
                DocumentviewmodalPage,
                PopoverpagePage,
                ProfilePage,
                NewdocumentupdatePage,
                DocumentviewPage,
                PostMessagePage,
                PrivacyPolicyPage,
                TermsServicePage,
                ContactusPage,
                TabpopoverPage,
                TasksPage,
                ForgetPasswordPage,
                EmailNotVerifiedPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                ServiceProvider,
                StorageProvider,
                InAppBrowser,
                FCM,
                File,
                FileTransfer,
                Camera,
                FilePath,
                DatePipe,
                Facebook,
                GooglePlus
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map