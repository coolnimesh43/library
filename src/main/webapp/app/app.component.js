"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var router_1 = require('angular2/router');
var about_component_1 = require("./about/about.component");
var nav_component_1 = require("./nav/nav.component");
var welcome_component_1 = require("./welcome/welcome.component");
var footer_component_1 = require("./footer/footer.component");
var video_component_1 = require("./video/video.component");
var VideoService_1 = require("./service/VideoService");
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, nav_component_1.NavigationComponent, footer_component_1.FooterComponent],
            providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, VideoService_1.VideoService]
        }),
        router_1.RouteConfig([
            { path: '/home', name: "Welcome", component: welcome_component_1.WelcomeComponent, useAsDefault: true },
            { path: '/about', name: "About", component: about_component_1.AboutComponent },
            { path: '/video', name: "Video", component: video_component_1.VideoComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map