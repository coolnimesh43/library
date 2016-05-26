import {LoginService, isLoggedIn, getLoggedInUser} from "./login.service";
import {Component, OnInit} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {Observable} from "rxjs/Observable";
import {TokenService} from "../service/token.service";
import {User} from "../entity/User";

@Component({
    template:`<ul class="nav navbar-nav navbar-collapse pull-right" *ngIf="getLoggedIn">
                <li class="pull-left">
                    <a [routerLink]="['User']" title="{{loggedInUserName}}">{{loggedInUserName}}</a> &nbsp;&nbsp;
                </li>
                <li class="pull-right">
                    <a href="#" title="Logout" (click)="logout()"><strong>Logout</strong></a>
                </li>
            </ul>`,
    selector:'logout',
    directives:[ROUTER_DIRECTIVES]
})
export class LogoutComponent implements OnInit{
    constructor(private _loginService:LoginService, private _router:Router){}
    loggedInUserName:string;
    ngOnInit():void{
        let user:User=getLoggedInUser();
        this.loggedInUserName=user.firstName+' '+user.lastName;
    }
    get getLoggedIn():boolean {
        return isLoggedIn();
    }
    logout():void {
        this._loginService.logout();
    }
}