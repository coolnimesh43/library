import {Component, OnInit} from "angular2/core";
import {LoginService} from "./login.service";
import {Login} from "../entity/Login";
import {isLoggedIn} from '../login/login.service'
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {Token} from "../entity/Token";
import {Response} from "angular2/http";
@Component({
    templateUrl:'./app/login/login.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class LoginComponent implements  OnInit{
    email:string;
    password:string;
    errorMessage:string;
    errorMessageDefault:string="Authentication failed for provided username or/and password. Please try again.";
    constructor(private _loginService:LoginService,private _router:Router){
        if(isLoggedIn()){
            this._router.navigateByUrl('/home')
        }
    }

    ngOnInit():void{
        if(isLoggedIn()){
            this._router.navigateByUrl('/home')
        }
    }

    signIn():void{
        let loginPojo:Login=new Login();
        loginPojo.email=this.email;
        loginPojo.password=this.password;

        this._loginService.login(loginPojo).subscribe(ok => this._router.navigateByUrl('/home'),error =>this.errorMessage=this.errorMessageDefault);
    }

}