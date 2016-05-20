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
require('rxjs/Rx');
var http_1 = require("angular2/http");
var Observable_1 = require("rxjs/Observable");
var LoginService = (function () {
    function LoginService(_http) {
        this._http = _http;
        this.ACCESS_TOKEN = "accessToken";
        this.REFRESH_TOKEN = "refreshToken";
        this.USER = "user";
        this.loginUrl = "http://localhost:8080/library/api/auth";
        this.logoutUrl = "http://localhost:8080/";
    }
    LoginService.prototype.login = function (login) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this._http.post(this.loginUrl, JSON.stringify(login), { headers: headers }).map(function (response) { return response.json(); })
            .do(function (token) {
            localStorage.setItem(_this.ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(_this.REFRESH_TOKEN, token.refreshtoken);
            localStorage.setItem(_this.USER, token.user.toString());
        })
            .catch(this.handleError);
    };
    LoginService.prototype.handleError = function (error) {
        throw Observable_1.Observable.throw(error.json() || 'Validation failed.');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
function isLoggedIn() {
    return !!localStorage.getItem(this.ACCESS_TOKEN);
}
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=login.service.js.map