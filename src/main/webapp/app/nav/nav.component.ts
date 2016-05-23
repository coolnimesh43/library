import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {isLoggedIn} from "../login/login.service";
import {LogoutComponent} from "../login/logout.component";
import{getLoggedInUser} from '../login/login.service';
import {User} from "../entity/User";

@Component({
    selector:'navigation',
    templateUrl:'./app/nav/nav.component.html',
    directives:[ROUTER_DIRECTIVES,LogoutComponent]
})
export class NavigationComponent implements OnInit{
    selected:string;
    private isLoggedIn:boolean;
    private loginUser:string;

    constructor(private _router:Router){
    }
    ngOnInit():void{
        if(this.selected===undefined){
            this.selected="Home";
        }
        this.isLoggedIn=isLoggedIn();
        let user:User=getLoggedInUser();
        if(user){
            this.loginUser=user.firstName+' '+user.lastName;
        }
    }
    onSelect(tab:string):void{
        this.selected=tab;
    }

   get getLoggedIn():boolean{
        return this.isLoggedIn;
    }

    get currentUser():string{
        return this.loginUser;
    }

}