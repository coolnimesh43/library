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
var local_storage_1 = require("../service/local-storage");
var HttpClient = (function () {
    function HttpClient(_storageService) {
        this._storageService = _storageService;
    }
    HttpClient.prototype.setHeader = function () {
        var finalHeader = new http_1.Headers();
        var token = this._storageService.getFromLocalStorage("token");
        if (token !== undefined || token !== null) {
            finalHeader.append('Authorization', "Bearer " + JSON.stringify(token));
        }
        finalHeader.append("Content-Type", "application/json");
        return finalHeader;
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [local_storage_1.LocalStorgeService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.client.js.map