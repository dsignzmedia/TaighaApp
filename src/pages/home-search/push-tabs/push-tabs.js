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
import { Nav, IonicPage, NavController, Events, MenuController, App, NavParams, Tabs } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SearchPage } from '../search/search';
import { FeaturedPage } from '../featured/featured';
import { FavoritesPage } from '../favorites/favorites';
import { SavedPage } from '../saved/saved';
import { TabsPage } from '../../tabs/tabs';
var PushTabsPage = /** @class */ (function () {
    function PushTabsPage(navCtrl, viewCtrl, menuCtrl, App, events, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.menuCtrl = menuCtrl;
        this.App = App;
        this.events = events;
        this.navParams = navParams;
        this.isHomeSearchMoreMenu = false;
        this.isMoreMenu = false;
        this.pushOneRoot = SearchPage;
        this.pushThreeRoot = FavoritesPage;
        this.pushFourRoot = FeaturedPage;
        this.pushTwoRoot = SavedPage;
        this.pushFiveRoot = SearchPage;
        this.data = {
            viewCtrl: this.viewCtrl
        };
        this.selectedTab = this.navParams.get('selectedTab') || 0;
    }
    PushTabsPage.prototype.ionViewWillEnter = function () {
        if (this.selectedTab) {
            this.tabRef.select(this.selectedTab);
        }
    };
    PushTabsPage.prototype.openSideMenu2 = function () {
        this.menuCtrl.enable(true, 'isHomeSearchMoreMenu');
        this.menuCtrl.enable(false, 'homesearchMenu');
        this.menuCtrl.enable(false, 'mainmenumore');
        //      this.isHomeSearchMoreMenu = true;
        //      this.isMoreMenu = false;
        // // this.events.publish('moretabs:invoked');
        this.menuCtrl.toggle();
    };
    PushTabsPage.prototype.goDashboard = function () {
        this.isMoreMenu = true;
        // this.nav.setRoot(TabsPage);
        this.App.getRootNav().push(TabsPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Object)
    ], PushTabsPage.prototype, "nav", void 0);
    __decorate([
        ViewChild('HomesearchTabs'),
        __metadata("design:type", Tabs)
    ], PushTabsPage.prototype, "tabRef", void 0);
    PushTabsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-push-tabs',
            templateUrl: 'push-tabs.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ViewController,
            MenuController,
            App,
            Events,
            NavParams])
    ], PushTabsPage);
    return PushTabsPage;
}());
export { PushTabsPage };
//# sourceMappingURL=push-tabs.js.map