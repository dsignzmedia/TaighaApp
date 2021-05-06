var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { FilterPage } from '../filter/filter';
// @IonicPage()
var FeaturedPage = /** @class */ (function () {
    function FeaturedPage(navCtrl, navParams, viewCtrl, modalCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.showList = 'block';
        this.showCard = 'block';
        this.showMap = 'block';
        this.showListbtn = 'block';
        this.showCardbtn = 'block';
        this.showMapbtn = 'block';
        this.getstyle = 'block';
        this.viewCtrl = this.navParams.get('viewCtrl');
        this.getstyle = 'none';
        this.showCardbtn = 'none';
        this.showList = 'none';
        this.showCard = 'block';
        this.showMap = 'none';
    }
    FeaturedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeaturedPage');
        this.loadMap();
    };
    FeaturedPage.prototype.dismissPushTab = function () {
        this.viewCtrl.dismiss();
    };
    FeaturedPage.prototype.goToCard = function () {
        this.showList = 'none';
        this.showCard = 'block';
        this.showMap = 'none';
        this.showListbtn = 'block';
        this.showCardbtn = 'none';
        this.showMapbtn = 'block';
    };
    FeaturedPage.prototype.goToList = function () {
        this.showList = 'block';
        this.showCard = 'none';
        this.showMap = 'none';
        this.showListbtn = 'none';
        this.showCardbtn = 'block';
        this.showMapbtn = 'block';
    };
    FeaturedPage.prototype.goToMap = function () {
        this.showList = 'none';
        this.showCard = 'none';
        this.showMap = 'block';
        this.showListbtn = 'block';
        this.showCardbtn = 'block';
        this.showMapbtn = 'none';
    };
    FeaturedPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(45.482456, -122.7117877);
        var icon = {
            url: 'assets/imgs/pricepin.svg',
            scaledSize: new google.maps.Size(40, 60),
        };
        var contentString = "";
        contentString = '<div class="map_property_panel">';
        contentString += '<a target="_blank" href="javascript:;">';
        contentString += '<figure class="cardpanel-slider ">';
        contentString += '<img class="cardpanel-slider-item imagepopup" src="assets/imgs/figure.svg" alt="">';
        contentString += '</figure>';
        contentString += '</a>';
        contentString += '<div class="map_property_footer"> <div class="d-flex"><span class="map_property_price">$555,000</span>';
        contentString += '<ul class="share-list" ><li><i><img src="assets/imgs/iconfinder_chat_293661.svg"></i></li><li><i><img src="assets/imgs/Page-1.svg"></i></li>';
        contentString += '</div>';
        contentString += '<div class="map_property_list_inline">';
        contentString += '<span class="map_property_list map_prpt_bd"><img src="assets/imgs/bed.svg" width="28" height="15" />1<small>bed</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/bathtube-with-shower.svg" width="17" height="17" />3<small>baths</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/triangular-ruler-for-school.svg" width="17" height="17" />1,657<small>sqft</small> </span><span class="map_property_list map_prpt_ba"><img src="assets/imgs/clock.svg" width="17" height="17" />1<small>d</small> </span>';
        contentString += '</div>';
        contentString += '<div class="d-flex"><div><a href="javascript:;" class="map-property_title">12015 NW MCDANIEL RD</a> <small class="map_property_subtitle">Portland, OR 97229</small>';
        contentString += '</div>';
        contentString += '<img class="map-rmls-logo" src="assets/imgs/rmls-logo.svg" width="30" /></div>';
        contentString += '</div>';
        contentString += '</div>';
        var mapOptions = {
            center: latLng,
            zoom: 13,
            icon: icon,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var locations = [
            ['property', 45.482456, -122.7117877, 4],
            ['property', 45.470229, -122.696662, 4],
            ['property', 45.483585, -122.737424, 4],
            ['property', 45.477687, -122.647817, 4],
            ['property', 45.472210, -122.629879, 4]
        ];
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });
        var marker, i;
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon,
                label: {
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    text: '400k',
                },
                map: this.map
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(infowindow.content);
                    infowindow.open(this.map, marker);
                };
            })(marker, i));
        }
    };
    FeaturedPage.prototype.viewProperty = function (property) {
        this.navCtrl.push(PropertyDetailPage, { propertyId: property });
    };
    FeaturedPage.prototype.openFilter = function () {
        this.modalCtrl.create(FilterPage).present();
    };
    FeaturedPage.prototype.openHomeSearchmenu = function () {
        this.menuCtrl.enable(false, 'isHomeSearchMoreMenu');
        this.menuCtrl.enable(true, 'homesearchMenu');
        this.menuCtrl.enable(false, 'mainmenumore');
        //      this.isHomeSearchMoreMenu = true;
        //      this.isMoreMenu = false;
        // // this.events.publish('moretabs:invoked');
        this.menuCtrl.toggle();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], FeaturedPage.prototype, "mapElement", void 0);
    FeaturedPage = __decorate([
        Component({
            selector: 'page-featured',
            templateUrl: 'featured.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            ModalController,
            MenuController])
    ], FeaturedPage);
    return FeaturedPage;
}());
export { FeaturedPage };
//# sourceMappingURL=featured.js.map