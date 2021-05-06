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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the EditChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditChoosePage = /** @class */ (function () {
    function EditChoosePage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showEdit = 'none';
        this.showShare = 'none';
        this.data = this.navParams.data.Requestdata;
        if (this.data == 'edit') {
            this.showEdit = 'flex';
        }
        else {
            this.showShare = 'flex';
        }
    }
    EditChoosePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditChoosePage');
    };
    EditChoosePage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    EditChoosePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-choose',
            templateUrl: 'edit-choose.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams])
    ], EditChoosePage);
    return EditChoosePage;
}());
export { EditChoosePage };
//# sourceMappingURL=edit-choose.js.map