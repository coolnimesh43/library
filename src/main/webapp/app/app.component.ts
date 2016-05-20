import {Component, OnInit, provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {AboutComponent} from "./about/about.component";
import {NavigationComponent} from "./nav/nav.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FooterComponent} from "./footer/footer.component";
import {VideoAddComponent} from "./video/video-add.component";
import {VideoService} from "./video/VideoService";
import {VideosComponent} from "./video/videos.component";
import {YoutubeVideoService} from "./video/YoutubeVideoService";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {AuthRouterOutlet} from "./filter/oauth.route.filter";
import {LocalStorgeService} from "./service/local-storage";
import {HttpClient} from "./config/http.client";
@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    directives: [ROUTER_DIRECTIVES, NavigationComponent, FooterComponent, AuthRouterOutlet],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, VideoService, VideosComponent, YoutubeVideoService, AuthHttp, LoginService
    //     , provide(AuthHttp, {
    //     useFactory: (http) => {
    //         return new AuthHttp(new AuthConfig({
    //             tokenName:'accessToken',
    //             noJwtError: true,
    //             tokenGetter: localStorage.getItem("accessToken")
    //         }), http);
    //     },
    //     deps: [Http]
    // })
        ,LocalStorgeService,HttpClient]
})
@RouteConfig([
    {path: '/home', name: "Welcome", component: WelcomeComponent},
    {path: '/about', name: "About", component: AboutComponent},
    {path: '/video', name: "Video", component: VideoAddComponent},
    {path: '/login', name: "Login", component: LoginComponent, useAsDefault: true}
])
export class AppComponent {
    constructor(private _router:Router) {
    }
}