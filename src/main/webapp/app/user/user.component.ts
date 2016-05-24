import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {User} from "../entity/User";
import {getLoggedInUser} from "../login/login.service";
import {UserService} from "./user.service";
@Component({
    templateUrl:'./app/user/user.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class UserComponent implements OnInit{
    public user:User;
    public errorMessage:string;
    constructor (private _userService:UserService){
    }

    ngOnInit():void{
        let localuser:User=getLoggedInUser();
        this._userService.getUser(localuser.id).subscribe(data => this.user=data, error => this.errorMessage=error);
    }
}