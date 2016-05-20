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
var login_service_1 = require("./login.service");
var Login_1 = require("../entity/Login");
var login_service_2 = require('../login/login.service');
var router_1 = require("angular2/router");
var LoginComponent = (function () {
    function LoginComponent(_loginService, _router) {
        this._loginService = _loginService;
        this._router = _router;
        this.errorMessageDefault = "Authentication failed for provided username or/and password. Please try again.";
        if (login_service_2.isLoggedIn()) {
            this._router.navigateByUrl('/home');
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (login_service_2.isLoggedIn()) {
            this._router.navigateByUrl('/home');
        }
    };
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        var loginPojo = new Login_1.Login();
        loginPojo.email = this.email;
        loginPojo.password = this.password;
        this._loginService.login(loginPojo).subscribe(function (ok) { return _this._router.navigateByUrl('/home'); }, function (error) { return _this.errorMessage = _this.errorMessageDefault; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: './app/login/login.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map