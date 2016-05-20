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
var Observable_1 = require("rxjs/Observable");
require('rxjs/Rx');
var VideoService = (function () {
    function VideoService(_http) {
        this._http = _http;
        this.videoUrl = 'http://localhost:8080/library/api/video';
    }
    VideoService.prototype.add = function (video) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(this.videoUrl, JSON.stringify(video), { headers: headers }).map(function (response) { return response.json(); })
            .do()
            .catch(this.handleError);
    };
    VideoService.prototype.getAll = function () {
        return this._http.get(this.videoUrl).map(function (response) { return response.json(); })
            .do()
            .catch(this.handleError);
    };
    VideoService.prototype.handleError = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'server error');
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=VideoService.js.map