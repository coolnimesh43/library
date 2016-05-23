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
var LocalStorgeService = (function () {
    function LocalStorgeService() {
    }
    LocalStorgeService.prototype.getFromLocalStorage = function (item) {
        return localStorage.getItem(item);
    };
    LocalStorgeService.prototype.setToLocalStorage = function (key, value) {
        localStorage.setItem(key, value);
    };
    LocalStorgeService.prototype.setAllToLocalStorge = function (token) {
        this.setToLocalStorage("token", JSON.stringify(token));
        this.setToLocalStorage("user", JSON.stringify(token.user));
        this.setToLocalStorage("accessToken", JSON.stringify(token.accessToken));
    };
    LocalStorgeService.prototype.removeAllFromLocalStorage = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
    };
    LocalStorgeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorgeService);
    return LocalStorgeService;
}());
exports.LocalStorgeService = LocalStorgeService;
//# sourceMappingURL=local-storage.js.map