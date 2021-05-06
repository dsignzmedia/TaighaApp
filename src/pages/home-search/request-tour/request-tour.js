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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the RequestTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RequestTourPage = /** @class */ (function () {
    function RequestTourPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showTour = 'none';
        this.showQuestion = 'none';
        this.showOffer = 'none';
        this.showOne = 'flex';
        this.showTwo = 'none';
        this.showThree = 'none';
        this.showLast = 'none';
        this.showArrowOne = 'none';
        this.showArrowTwo = 'block';
        this.showArrowThree = 'none';
        this.data = this.navParams.data.Requestdata;
        console.log(this.data);
        if (this.data == 'tour') {
            this.showTour = 'block';
        }
        else if (this.data == 'offer') {
            this.showOffer = 'block';
        }
        else {
            this.showQuestion = 'block';
        }
    }
    RequestTourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequestTourPage');
    };
    RequestTourPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    RequestTourPage.prototype.goto1 = function () {
        this.showOne = 'flex';
        this.showTwo = 'none';
        this.showThree = 'none';
        this.showArrowOne = 'none';
        this.showArrowTwo = 'block';
        this.showArrowThree = 'none';
        this.showLast = 'none';
        // this.showOne = 'none';
        // this.showTwo = 'block';
        // this.showThree = 'none';
        // this.showArrowOne = 'block';
        // this.showArrowTwo = 'none';
        // this.showArrowThree = 'block';
    };
    RequestTourPage.prototype.goto2 = function () {
        // 	this.showOne = 'none';
        // this.showTwo = 'none';
        // this.showThree = 'block';	
        // this.showArrowOne = 'none';
        // this.showArrowTwo = 'block';
        // this.showArrowThree = 'block';
        this.showOne = 'none';
        this.showTwo = 'flex';
        this.showThree = 'none';
        this.showArrowOne = 'block';
        this.showArrowTwo = 'none';
        this.showArrowThree = 'block';
        this.showLast = 'none';
    };
    RequestTourPage.prototype.goto3 = function () {
        this.showOne = 'none';
        this.showTwo = 'none';
        this.showThree = 'flex';
        this.showArrowOne = 'none';
        this.showArrowTwo = 'block';
        this.showArrowThree = 'none';
        this.showLast = 'flex';
        // this.showOne = 'none';
        // this.showTwo = 'none';
        // this.showThree = 'block';
        // this.showArrowOne = 'none';
        // this.showArrowTwo = 'block';
        // this.showArrowThree = 'none';
    };
    RequestTourPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-request-tour',
            templateUrl: 'request-tour.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], RequestTourPage);
    return RequestTourPage;
}());
export { RequestTourPage };
//# sourceMappingURL=request-tour.js.map