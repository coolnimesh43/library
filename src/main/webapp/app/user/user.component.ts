import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {User} from "../entity/User";
import {getLoggedInUser} from "../login/login.service";
@Component({
    templateUrl:'./app/user/user.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class UserComponent implements OnInit{
    public user:User;
    constructor (){
    }

    ngOnInit():void{
        this.user=JSON.parse(getLoggedInUser());
    }
}