var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
// @IonicPage()
var TabpopoverPage = /** @class */ (function () {
    function TabpopoverPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.tabsPageRef = this.navParams.get('navpage');
    }
    TabpopoverPage.prototype.openPage = function (pageName) {
        this.tabsPageRef.tabRef.select(pageName);
        this.viewCtrl.dismiss();
    };
    TabpopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    TabpopoverPage = __decorate([
        Component({
            selector: 'page-tabpopover',
            templateUrl: 'tabpopover.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController])
    ], TabpopoverPage);
    return TabpopoverPage;
}());
export { TabpopoverPage };
//# sourceMappingURL=tabpopover.js.map