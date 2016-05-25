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
var http_1 = require("angular2/http");
var http_client_1 = require("../config/http.client");
var JoinUsService = (function () {
    function JoinUsService(_http, _httpClient) {
        this._http = _http;
        this._httpClient = _httpClient;
        this.USERNAME_VALIDATION_URL = 'http://localhost:8080/library/api/user/user-name';
        this.EMAIL_VALIDATION_URL = 'http://localhost:8080/library/api/user/email';
        this.headers = this._httpClient.setHeader();
    }
    JoinUsService.prototype.checkUserName = function (userName) {
        return this._http.post(this.USERNAME_VALIDATION_URL, userName, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    JoinUsService.prototype.checkEmail = function (email) {
        return this._http.post(this.EMAIL_VALIDATION_URL, email, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    JoinUsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_client_1.HttpClient])
    ], JoinUsService);
    return JoinUsService;
}());
exports.JoinUsService = JoinUsService;
//# sourceMappingURL=joinus.service.js.map