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
var router_1 = require("angular2/router");
var Video_1 = require("../entity/Video");
var VideoService_1 = require("../service/VideoService");
var VideoComponent = (function () {
    function VideoComponent(_videoService) {
        this._videoService = _videoService;
        this.video = new Video_1.Video();
    }
    VideoComponent.prototype.add = function () {
        var _this = this;
        if (this.validateVideo()) {
            this.extractVideoContent();
            var saved_1;
            this._videoService.add(this.video).subscribe(function (savedVideo) { return saved_1 = savedVideo; }, function (error) { return _this.error = error; });
            console.log(saved_1);
        }
    };
    VideoComponent.prototype.validateVideo = function () {
        var isValid = true;
        isValid = isValid && this.video !== undefined;
        isValid = isValid && this.video.url !== undefined;
        return isValid;
    };
    VideoComponent.prototype.extractVideoContent = function () {
        var sharedUrl = this.video.url;
        if (sharedUrl !== undefined) {
            while (sharedUrl.indexOf("\"") !== -1) {
                sharedUrl = sharedUrl.replace("\"", '\'');
            }
        }
        var $iframe = $(sharedUrl);
        this.video.url = $iframe.attr('src');
        if (this.video.frameHeight === undefined) {
            this.video.frameHeight = $iframe.attr('height');
        }
        if (this.video.frameWidth === undefined) {
            this.video.frameWidth = $iframe.attr('width');
        }
        if (this.video.name === undefined) {
            this.video.name = $iframe.attr('title');
        }
        if (this.video.shared === undefined) {
            this.video.shared = true;
        }
        var vidId = this.video.url.split("embed/");
        if (this.video.videoId === undefined) {
            this.video.videoId = vidId[vidId.length];
        }
    };
    VideoComponent = __decorate([
        core_1.Component({
            templateUrl: './app/video/video.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [VideoService_1.VideoService])
    ], VideoComponent);
    return VideoComponent;
}());
exports.VideoComponent = VideoComponent;
//# sourceMappingURL=video.component.js.map