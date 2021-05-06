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
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EditChoosePage } from '../edit-choose/edit-choose';
import { FilterPage } from '../filter/filter';
var SavedPage = /** @class */ (function () {
    function SavedPage(navCtrl, navParams, modalCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
    }
    SavedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SavedPage');
    };
    SavedPage.prototype.openEdit = function (edit) {
        this.modalCtrl.create(EditChoosePage, { Requestdata: edit }).present();
    };
    SavedPage.prototype.openFilter = function () {
        this.modalCtrl.create(FilterPage).present();
    };
    SavedPage.prototype.openHomeSearchmenu = function () {
        this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
        this.menuCtrl.enable(true, 'homesearchMenu');
        this.menuCtrl.enable(false, 'mainmenumore');
        //      this.isHomeSearchMoreMenu = true;
        //      this.isMoreMenu = false;
        // // this.events.publish('moretabs:invoked');
        this.menuCtrl.toggle();
    };
    SavedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-saved',
            templateUrl: 'saved.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ModalController,
            MenuController])
    ], SavedPage);
    return SavedPage;
}());
export { SavedPage };
//# sourceMappingURL=saved.js.map