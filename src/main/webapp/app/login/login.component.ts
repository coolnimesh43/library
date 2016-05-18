import {Component} from "angular2/core";
import {LoginService} from "./login.service";
import {Login} from "../entity/Login";
@Component({
    templateUrl:'./app/login/login.component.html'
})
export class LoginComponent{
    email:string;
    password:string;

    constructor(private _loginService:LoginService){}

    signIn():void{
        let loginPojo:Login=new Login();
        loginPojo.email=this.email;
        loginPojo.password=this.password;

        this._loginService.login(loginPojo).subscribe();
    }
}