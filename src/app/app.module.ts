import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PipesModule } from '../pipes/pipes.module';

import { PropertiesPage } from '../pages/properties/properties';
import { NewslettersPage } from '../pages/newsletters/newsletters';
import { NotesPage } from '../pages/notes/notes';
import { TemplatesPage } from '../pages/templates/templates';

import { TextMessagePage } from '../pages/text-message/text-message';
import { MessageDetailsPage } from '../pages/message-details/message-details';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ActivitiesPage } from '../pages/activities/activities';
import { DocumentsPage } from '../pages/documents/documents';
import { MailsPage } from '../pages/mails/mails';
import { LeadsPage } from '../pages/leads/leads';
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
import { TicketMailsPage } from '../pages/ticket-mails/ticket-mails';
import { TicketActivityPage } from '../pages/ticket-activity/ticket-activity';
import { MailviewPage } from '../pages/mailview/mailview';
import { PopoverpagePage } from '../pages/popoverpage/popoverpage';
import { ProfilePage } from '../pages/profile/profile';
import { NewdocumentupdatePage } from '../pages/newdocumentupdate/newdocumentupdate';
import { PostMessagePage } from '../pages/post-message/post-message';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsServicePage } from '../pages/terms-service/terms-service';
import { EmailNotVerifiedPage } from '../pages/email-not-verified/email-not-verified';
import { CreateMessagePage } from '../pages/create-message/create-message';
import { SelectTemplatePage } from '../pages/select-template/select-template';
import { TicketFieldsPage } from '../pages/ticket-fields/ticket-fields';
import { SearchableModalPage } from '../pages/searchable-modal/searchable-modal';
 
// import { HomeSearchPage } from '../pages/home-search/home-search'; 
// import { CardViewPage } from '../pages/home-search/card-view/card-view'; 
import { TenantsPage } from '../pages/home-search/tenants/tenants';
import { WhatwedoPage } from '../pages/home-search/whatwedo/whatwedo';
import { BuyersPage } from '../pages/home-search/buyers/buyers';
import { ForrentPage } from '../pages/home-search/forrent/forrent';
import { InvestorsPage } from '../pages/home-search/investors/investors';
import { OwnersPage } from '../pages/home-search/owners/owners';

import { SellersPage } from '../pages/home-search/sellers/sellers';
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
import { DatePipe } from '@angular/common'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


// Import Angular2 plugin.

import { CalendarModule } from "ion2-calendar";
import { BrMaskerModule } from 'brmasker-ionic-3';
import { FCM } from '@ionic-native/fcm';

import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';



import { QuillModule } from 'ngx-quill';
import { TabpopoverPage } from '../pages/tabpopover/tabpopover';
import { TasksPage } from '../pages/tasks/tasks';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { GooglePlus } from '@ionic-native/google-plus';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
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
    TicketMailsPage,
    TicketActivityPage,
    // CardViewPage,
    FilterPage,
    SellersPage,
    TenantsPage,
    WhatwedoPage,
    BuyersPage,
    ForrentPage,
    InvestorsPage,
    OwnersPage,
    CreateMessagePage,
    SelectTemplatePage,
    MapInfoPage,
    SearchModalPage,
    EditChoosePage,
    RequestTourPage,
    QtoModalPage,
    ViewImagePage,
    PropertyDetailPage,
    AboutUsPage,
    PropertiesPage,
    NewslettersPage,
    NotesPage,
    TemplatesPage,
    SearchPage,
    SearchableModalPage,
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
    TicketFieldsPage,
    DocumentviewPage,
    PostMessagePage,
    LeadsPage,
    MessageDetailsPage,
    TextMessagePage,
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
    PipesModule,
    IonicStorageModule.forRoot(),
    // FroalaEditorModule.forRoot(), 
    // FroalaViewModule.forRoot(),
    IonicModule.forRoot(MyApp,{
        menuType: 'push',
        scrollAssist: false,
        statusbarPadding: true
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
    PropertiesPage,
    NewslettersPage,
    NotesPage,
    TemplatesPage,
    TicketFieldsPage,
    LeadsPage,
    TextMessagePage,
    SearchableModalPage,
    MessageDetailsPage,
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
    TicketMailsPage,
    TicketActivityPage,
    // CardViewPage,
    FilterPage,
    TenantsPage,
WhatwedoPage,
BuyersPage,
ForrentPage,
InvestorsPage,
OwnersPage,
CreateMessagePage,
SelectTemplatePage,
    SellersPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    StorageProvider,
    InAppBrowser,
    FCM,
    File,
    SocialSharing,
    Facebook,
    FileTransfer,
    Camera,
    FilePath,
    DatePipe,
    GooglePlus
  ]
})
export class AppModule {}
