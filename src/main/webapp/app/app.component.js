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
var video_add_component_1 = require("./video/video-add.component");
var VideoService_1 = require("./video/VideoService");
var videos_component_1 = require("./video/videos.component");
var YoutubeVideoService_1 = require("./video/YoutubeVideoService");
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var login_component_1 = require("./login/login.component");
var login_service_1 = require("./login/login.service");
var oauth_route_filter_1 = require("./filter/oauth.route.filter");
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, nav_component_1.NavigationComponent, footer_component_1.FooterComponent, oauth_route_filter_1.AuthRouterOutlet],
            providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, VideoService_1.VideoService, videos_component_1.VideosComponent, YoutubeVideoService_1.YoutubeVideoService, angular2_jwt_1.AuthHttp, login_service_1.LoginService]
        }),
        router_1.RouteConfig([
            { path: '/home', name: "Welcome", component: welcome_component_1.WelcomeComponent },
            { path: '/about', name: "About", component: about_component_1.AboutComponent },
            { path: '/video', name: "Video", component: video_add_component_1.VideoAddComponent },
            { path: '/login', name: "Login", component: login_component_1.LoginComponent, useAsDefault: true }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map