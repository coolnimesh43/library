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
var YoutubeVideoService = (function () {
    function YoutubeVideoService(_http) {
        this._http = _http;
        this.apiKey = 'AIzaSyDUYt6Xy71EiJOP1PvDIrzdEaxqndiNanM';
        this.getUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=' + this.apiKey + '&id=';
    }
    YoutubeVideoService.prototype.getVideoContent = function (videoId) {
        return this._http.get(this.getUrl + videoId).map(function (response) { return response.json(); })
            .do()
            .catch(this.handleError);
    };
    YoutubeVideoService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'server error');
    };
    YoutubeVideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], YoutubeVideoService);
    return YoutubeVideoService;
}());
exports.YoutubeVideoService = YoutubeVideoService;
//# sourceMappingURL=YoutubeVideoService.js.map