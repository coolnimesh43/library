import {LoginService, isLoggedIn} from "./login.service";
import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from "rxjs/Observable";
import {TokenService} from "../service/token.service";

@Component({
    template:`<ul class="nav navbar-collapse pull-right" *ngIf="getLoggedIn">
                <li class="pull-right">
                    <a href="#" title="Join Us" (click)="logout()"><strong>Logout</strong></a>
                </li>
            </ul>`,
    selector:'logout'
})
export class LogoutComponent{ss
    constructor(private _loginService:LoginService, private _router:Router){}

    get getLoggedIn():boolean {
        return isLoggedIn();
    }
    logout():void {
        this._loginService.logout();
    }
}