import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, PopoverController, Tabs, Events, App, NavParams } from 'ionic-angular';
import { ActivitiesPage } from '../activities/activities';
import { DocumentsPage } from '../documents/documents';
import { MailsPage } from '../mails/mails';
import { HomePage } from '../home/home';
import { MypropertiesPage } from '../myproperties/myproperties';
import { TicketsPage } from '../tickets/tickets';
import { TextMessagePage } from '../text-message/text-message';
import { MenuController } from 'ionic-angular';
import { TabpopoverPage } from '../tabpopover/tabpopover';
import { TasksPage } from '../tasks/tasks'; 
import { PushTabsPage } from '../home-search/push-tabs/push-tabs';
import { SearchPage } from '../home-search/search/search'; 
import { StorageProvider } from '../../providers/storage/storage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public isMoreMenu: boolean = false;
  @ViewChild(Nav) nav; Nav;
  @ViewChild('toptechTabs') tabRef: Tabs;
    @ViewChild('toptechTabs2') tabRef2: Tabs;
  private selectedTab: number;
  tab8Root:any ; 
  IsStaffCheck: any;
  public IsStaff : boolean = false;
  public showsmsTab : boolean = false;
  public IsStaffstring : any;

  tab7Root = HomePage;
  tab1Root = ActivitiesPage;
  tab2Root = MypropertiesPage;
  tab3Root = TicketsPage;
  tab9Root = TextMessagePage;
  tab4Root = MailsPage;
  tab5Root = DocumentsPage;
  tab6Root = TasksPage;
  public hasEmailVerified : boolean = false;
  constructor(private popoverCtrl: PopoverController, 
    public menuCtrl: MenuController,
    public events: Events,
    public storage: StorageProvider,
    private App: App,
    private navParams: NavParams
    ) {
      $('.tabbar').css('display','none');
        console.log('display');
    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
      console.log(auth_user_token)
        if(auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        $('.maintab').css('display','none');
        $('.maintabCust').css('display','block');
      }else{
        $('.maintab').css('display','block');
        $('.maintabCust').css('display','none');
        this.IsStaff = true;
        this.showsmsTab = true;
      }
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
          console.log(this.IsStaffCheck);
    });
  this.selectedTab = this.navParams.get('selectedTab') || 0;
  console.log("this.IsStaff");
console.log(this.IsStaff);
  }
  ionViewWillEnter() {
    if(this.selectedTab) {
      this.tabRef.select(this.selectedTab);
      this.tabRef2.select(this.selectedTab);
    }
             this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log("ionViewWillEnter hideforcustomer");
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaffstring = 'no';
        // hideforcustomer
        console.log("hideforcustomer none");
        $('.hideforCustomerandUser').css('display','none');
      }else{
        console.log("hideforcustomer flex");
        $('.hideforCustomerandUser').css('display','flex');
        this.IsStaff = true;
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
        }
        console.log(this.IsStaffCheck);
    });
  }
  presentPopover(event) {
    let popover = this.popoverCtrl.create(TabpopoverPage, {navpage: this});
    popover.present({ ev: { target: event.btn._elementRef.nativeElement } });

  }
  openSideMenu(){
    this.menuCtrl.enable(true, 'isHomeSearchMoreMenu');
    this.menuCtrl.enable(false, 'homesearchMenu');
    this.menuCtrl.enable(true, 'mainmenumore');
    this.events.publish('moretabs:invoked');
    this.menuCtrl.toggle()

    this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
console.log(auth_user_token);
if (auth_user_token) {
      this.IsStaffCheck = auth_user_token.is_staff;
      if (this.IsStaffCheck == 0) {
        this.IsStaff = false;
        this.IsStaffstring = 'no';
        $('.hassmall').css('display','flex');
        $('.hideforcustomer').css('display','none');
         $('.hideforCustomerandUser').css('display','none');
      }else{
        $('.hassmall').css('display','none');
        $('.hideforcustomer').css('display','flex');
         $('.hideforCustomerandUser').css('display','flex');
        this.IsStaff = true;
        this.IsStaffstring = 'yes';
      }
        if(auth_user_token) {
            if(auth_user_token.is_email_verified == 1) {
              this.hasEmailVerified = true;
            }
        }
        }
        console.log(this.IsStaffCheck);
    }); 
}
goHomesearch(){
  this.isMoreMenu = true;
 // this.nav.setRoot(TabsPage);
  this.App.getRootNav().push(PushTabsPage);
 // this.tab8Root = PushTabsPage;
}
}