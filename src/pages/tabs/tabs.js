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
import { Nav, PopoverController, Tabs, Events, App, NavParams } from 'ionic-angular';
import { ActivitiesPage } from '../activities/activities';
import { DocumentsPage } from '../documents/documents';
import { MailsPage } from '../mails/mails';
import { HomePage } from '../home/home';
import { MypropertiesPage } from '../myproperties/myproperties';
import { TicketsPage } from '../tickets/tickets';
import { MenuController } from 'ionic-angular';
import { TabpopoverPage } from '../tabpopover/tabpopover';
import { TasksPage } from '../tasks/tasks';
import { PushTabsPage } from '../home-search/push-tabs/push-tabs';
import { StorageProvider } from '../../providers/storage/storage';
var TabsPage = /** @class */ (function () {
    function TabsPage(popoverCtrl, menuCtrl, events, storage, App, navParams) {
        var _this = this;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.storage = storage;
        this.App = App;
        this.navParams = navParams;
        this.isMoreMenu = false;
        this.tab7Root = HomePage;
        this.tab1Root = ActivitiesPage;
        this.tab2Root = MypropertiesPage;
        this.tab3Root = TicketsPage;
        this.tab4Root = MailsPage;
        this.tab5Root = DocumentsPage;
        this.tab6Root = TasksPage;
        this.hasEmailVerified = false;
        this.storage.getStorage('auth_user_tokens').then(function (auth_user_token) {
            console.log(auth_user_token);
            if (auth_user_token) {
                if (auth_user_token.is_email_verified == 1) {
                    _this.hasEmailVerified = true;
                }
            }
        });
        this.selectedTab = this.navParams.get('selectedTab') || 0;
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        if (this.selectedTab) {
            this.tabRef.select(this.selectedTab);
        }
    };
    TabsPage.prototype.presentPopover = function (event) {
        var popover = this.popoverCtrl.create(TabpopoverPage, { navpage: this });
        popover.present({ ev: { target: event.btn._elementRef.nativeElement } });
    };
    TabsPage.prototype.openSideMenu = function () {
        this.events.publish('moretabs:invoked');
        this.menuCtrl.toggle();
    };
    TabsPage.prototype.goHomesearch = function () {
        this.isMoreMenu = true;
        // this.nav.setRoot(TabsPage);
        this.App.getRootNav().push(PushTabsPage);
        // this.tab8Root = PushTabsPage;
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Object)
    ], TabsPage.prototype, "nav", void 0);
    __decorate([
        ViewChild('toptechTabs'),
        __metadata("design:type", Tabs)
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [PopoverController,
            MenuController,
            Events,
            StorageProvider,
            App,
            NavParams])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map