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
var http_client_1 = require("../config/http.client");
var LoginService = (function () {
    function LoginService(_http, _httpClient) {
        this._http = _http;
        this._httpClient = _httpClient;
        this.ACCESS_TOKEN = "accessToken";
        this.REFRESH_TOKEN = "refreshToken";
        this.USER = "user";
        this.TOKEN = "token";
        this.loginUrl = "http://localhost:8080/library/api/auth/login";
        this.logOutUrl = "http://localhost:8080/library/api/auth/logout";
    }
    LoginService.prototype.login = function (login) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this._http.post(this.loginUrl, JSON.stringify(login), { headers: headers }).map(function (response) { return response.json(); })
            .do(function (token) {
            localStorage.setItem(_this.TOKEN, JSON.stringify(token));
            localStorage.setItem(_this.ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(_this.REFRESH_TOKEN, token.refreshtoken);
            localStorage.setItem(_this.USER, JSON.stringify(token.user));
        })
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        if (isLoggedIn()) {
            var token = localStorage.getItem(this.TOKEN);
            return this._httpClient.post(this.logOutUrl, JSON.stringify(token)).map(function (response) { return response.json(); })
                .do(function (data) {
                localStorage.removeItem(_this.ACCESS_TOKEN);
                localStorage.removeItem(_this.TOKEN);
                localStorage.removeItem(_this.REFRESH_TOKEN);
                localStorage.removeItem(_this.USER);
            })
                .catch(this.handleError);
        }
    };
    LoginService.prototype.handleError = function (error) {
        console.log(error.json());
        throw Observable_1.Observable.throw(error.json() || 'Validation failed.');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_client_1.HttpClient])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
function isLoggedIn() {
    var value = !!localStorage.getItem("accessToken") && !!localStorage.getItem("refreshToken");
    return value;
}
exports.isLoggedIn = isLoggedIn;
function getLoggedInUser() {
    var user;
    if (isLoggedIn()) {
        user = localStorage.getItem("user");
    }
    return user;
}
exports.getLoggedInUser = getLoggedInUser;
//# sourceMappingURL=login.service.js.map