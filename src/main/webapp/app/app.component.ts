import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {AboutComponent} from "./about/about.component";
import {NavigationComponent} from "./nav/nav.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FooterComponent} from "./footer/footer.component";
@Component({
    selector:'my-app',
    templateUrl:'./app/app.component.html',
    directives:[ROUTER_DIRECTIVES,NavigationComponent,FooterComponent],
    providers:[ROUTER_PROVIDERS,HTTP_PROVIDERS]
})
@RouteConfig([
    {path:'/home',name:"Welcome",component: WelcomeComponent, useAsDefault:true},
    {path:'/about',name:"About", component:AboutComponent}
])
export class AppComponent{
    constructor(private _router:Router){}
}