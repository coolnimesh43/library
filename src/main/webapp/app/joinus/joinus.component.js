"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var User_1 = require("../entity/User");
var router_1 = require("angular2/router");
var joinus_service_1 = require("./joinus.service");
var Observable_1 = require("rxjs/Observable");
var JoinUsComponent = (function () {
    function JoinUsComponent(_joinUsService) {
        this._joinUsService = _joinUsService;
        this.user = new User_1.User();
    }
    JoinUsComponent.prototype.joinUs = function () {
        this.errorMessage = '';
        if (this.validate()) {
            console.log('valid');
        }
    };
    JoinUsComponent.prototype.validate = function () {
        var user = this.user;
        console.log(user);
        if (user === undefined) {
            this.errorMessage = 'Please fill up the required fields.';
            return false;
        }
        else if (user.email === undefined || user.email.trim() === '' || !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(user.email)) {
            this.errorMessage = 'Invalid email.';
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
        Observable_1.Observable.forkJoin(this._joinUsService.checkUserName(user.userName), this._joinUsService.checkEmail(user.email))
            .subscribe(function (data) {
            console.log(data);
            return data[0] && data[1];
        });
    };
    JoinUsComponent = __decorate([
        core_1.Component({
            templateUrl: './app/joinus/joinus.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [joinus_service_1.JoinUsService]
        }), 
        __metadata('design:paramtypes', [joinus_service_1.JoinUsService])
    ], JoinUsComponent);
    return JoinUsComponent;
}());
exports.JoinUsComponent = JoinUsComponent;
//# sourceMappingURL=joinus.component.js.map