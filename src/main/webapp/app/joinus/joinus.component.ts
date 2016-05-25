import {Component} from "angular2/core";
import {User} from "../entity/User";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {JoinUsService} from "./joinus.service";
import {Observable} from "rxjs/Observable";
@Component({
    templateUrl: './app/joinus/joinus.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:[JoinUsService]
})
export class JoinUsComponent {
    user:User;
    rePassword:string;
    errorMessage:string;

    constructor(private _joinUsService:JoinUsService) {
        this.user = new User();
    }

    joinUs() {
        this.errorMessage='';
        if(this.validate()){
            console.log('valid');
        }
    }

    private validate():boolean {
        let user = this.user;
        console.log(user);
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
        Observable.forkJoin(this._joinUsService.checkUserName(user.userName),this._joinUsService.checkEmail(user.email))
            .subscribe(data => {
                console.log(data);
                return data[0] && data[1];
            });
    }
}