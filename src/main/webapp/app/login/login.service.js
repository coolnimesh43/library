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
var local_storage_1 = require("../service/local-storage");
var LoginService = (function () {
    function LoginService(_http, _httpClient, _localStorageService) {
        this._http = _http;
        this._httpClient = _httpClient;
        this._localStorageService = _localStorageService;
        this.ACCESS_TOKEN = "accessToken";
        this.REFRESH_TOKEN = "refreshToken";
        this.USER = "user";
        this.TOKEN = "token";
        this.loginUrl = "http://localhost:8080/library/api/auth/login";
        this.logOutUrl = "http://localhost:8080/library/api/auth/logout";
    }
    LoginService.prototype.login = function (login) {
        var _this = this;
        if (this._localStorageService.getFromLocalStorage("token") === null) {
            var headers = this._httpClient.setHeader();
            return this._http.post(this.loginUrl, JSON.stringify(login), { headers: headers }).map(function (response) { return response.json(); })
                .do(function (data) { return _this._localStorageService.setAllToLocalStorge(data); });
        }
    };
    LoginService.prototype.logout = function () {
        if (isLoggedIn()) {
            var token = localStorage.getItem(this.TOKEN);
            this._localStorageService.removeAllFromLocalStorage();
            var headers = this._httpClient.setHeader();
            this._http.post(this.logOutUrl, JSON.stringify(token), { headers: headers })
                .map(function (response) { console.log(response.json() + " text is " + response.text()); return response.json(); })
                .do(function (data) { return console.log(data); })
                .catch(function (data) { console.log(data); return Observable_1.Observable.throw(data || 'error'); })
                .subscribe();
        }
    };
    LoginService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error || "validation failed");
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_client_1.HttpClient, local_storage_1.LocalStorgeService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
function isLoggedIn() {
    var value = !!localStorage.getItem("accessToken") && !!localStorage.getItem("token");
    return value;
}
exports.isLoggedIn = isLoggedIn;
function getLoggedInUser() {
    var user;
    if (isLoggedIn()) {
        user = JSON.parse(localStorage.getItem("user"));
    }
    return user;
}
exports.getLoggedInUser = getLoggedInUser;
//# sourceMappingURL=login.service.js.map