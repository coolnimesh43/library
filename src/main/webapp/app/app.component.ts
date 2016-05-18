import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {AboutComponent} from "./about/about.component";
import {NavigationComponent} from "./nav/nav.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FooterComponent} from "./footer/footer.component";
import {VideoAddComponent} from "./video/video-add.component";
import {VideoService} from "./service/VideoService";
import {VideosComponent} from "./video/videos.component";
import {YoutubeVideoService} from "./service/YoutubeVideoService";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
@Component({
    selector:'my-app',
    templateUrl:'./app/app.component.html',
    directives:[ROUTER_DIRECTIVES,NavigationComponent,FooterComponent],
    providers:[ROUTER_PROVIDERS,HTTP_PROVIDERS,VideoService,VideosComponent,YoutubeVideoService,AuthHttp,LoginService]
})
@RouteConfig([
    {path:'/home',name:"Welcome",component: WelcomeComponent, useAsDefault:true},
    {path:'/about',name:"About", component:AboutComponent},
    {path:'/video',name:"Video",component:VideoAddComponent},
    {path:'/login',name:"Login",component:LoginComponent}
])
export class AppComponent{
    constructor(private _router:Router){}
}