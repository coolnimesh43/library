import {Component} from "angular2/core";
import {User} from "../entity/User";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {JoinUsService} from "./joinus.service";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user.service";
import {LocalStorgeService} from "../service/local-storage";
@Component({
    templateUrl: './app/joinus/joinus.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:[JoinUsService,UserService]
})
export class JoinUsComponent {
    user:User;
    rePassword:string;
    errorMessage:string;
    success:boolean;

    constructor(private _joinUsService:JoinUsService,private _userService:UserService, private _storageService:LocalStorgeService) {
        this.user = new User();
    }

    joinUs() {
        this.errorMessage='';
        if(this.validate()){
            this._userService.create(this.user).subscribe(data =>{
                this.success=true;
            }, error => this.errorMessage='An error occurred while creating your account. Please try again.');
        }
    }

    private validate():boolean {
        let user = this.user;
        if (user === undefined) {
            this.errorMessage = 'Please fill up the required fields.';
            return false;
        }
        else if (user.email === undefined || user.email.trim() === '' || !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(user.email)) {
            this.errorMessage = 'Invalid email.'
            return false;
        }
        else if (user.userName.trim() === '' || user.userName.length < 6) {
            this.errorMessage = 'Invalid user name.';
            return false;
        }
        else if (user.password === undefined || user.password.trim() === '' || user.password.length < 6) {
            this.errorMessage = 'Invalid password.';
            return false;
        }
        else if (user.password !== this.rePassword) {
            this.errorMessage = 'Both passwords must match.';
            return true;
        }
        else if (user.firstName === undefined || user.firstName.trim() === '' || !/^[a-zA-Z]+$/.test(user.firstName)) {
            console.log(/^[a-zA-Z]$/.test(user.firstName));
            this.errorMessage = 'Invalid first name.';
            return false;
        }
        else if (user.lastName === undefined || user.lastName.trim() === '' || !/^[a-zA-Z]+$/.test(user.lastName)) {
            this.errorMessage = 'Invalid last name.';
            return false;
        }
        else if(user.userName.length >=6 && user.email){
            Observable.forkJoin(this._joinUsService.checkUserName(user.userName),this._joinUsService.checkEmail(user.email))
                .subscribe(data => {
                    console.log("username : "+data[0] +" email: "+data[1]);
                    if(data[0]){
                        this.errorMessage='This username already exists. Please choose another one.'
                    }else if(data[1]){
                        this.errorMessage='This email already exists. Please choose another one.'
                    }
                    console.log("is valid: {}",!data[0] && !data[1]);
                    return (!data[0] && !data[1]);
                });
        }

        return true;
    }
}