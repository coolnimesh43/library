import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Routes,Router} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {NavigationComponent} from "./nav/nav.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FooterComponent} from "./footer/footer.component";
@Component({
    selector:'my-app',
    templateUrl:'./app/app.component.html',
    directives:[ROUTER_DIRECTIVES,NavigationComponent,FooterComponent],
    providers:[ROUTER_PROVIDERS]
})
@Routes([
    {path:'/home',component: WelcomeComponent},
    {path:'/about',component:AboutComponent}
])
export class AppComponent implements OnInit{

    constructor(private _router:Router){}

    ngOnInit():void{
        this._router.navigate(['/home']);
    }
}