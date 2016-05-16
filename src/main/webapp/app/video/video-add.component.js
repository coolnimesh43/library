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
///<reference path="../../typings/jquery/jquery.d.ts" />
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var Video_1 = require("../entity/Video");
var VideoService_1 = require("../service/VideoService");
var YoutubeVideoService_1 = require("../service/YoutubeVideoService");
var YoutubeResponse_1 = require("../entity/YoutubeResponse");
var VideoAddComponent = (function () {
    function VideoAddComponent(_videoService, _youtubeVideoService) {
        this._videoService = _videoService;
        this._youtubeVideoService = _youtubeVideoService;
        this.youtubeEmbedUrl = "https://www.youtube.com/embed/";
        this.video = new Video_1.Video();
    }
    VideoAddComponent.prototype.add = function () {
        var _this = this;
        if (this.validateVideo()) {
            this.extractVideoContent();
            var addVideo_1;
            this._youtubeVideoService.getVideoContent(this.video.videoId).subscribe(function (response) {
                var youtubeResponse = response;
                if (youtubeResponse.pageInfo.totalResults > 0) {
                    var item = youtubeResponse.items[0];
                    var snippet = item.snippet;
                    _this.video.name = snippet.title;
                    _this.video.description = snippet.description;
                    _this.video.image = snippet.thumbnails.medium;
                    _this.video.duration = item.contentDetails.duration;
                    var stats = item.statistics;
                    _this.video.statistics = new YoutubeResponse_1.Statistics();
                    _this.video.statistics.likeCount = stats.likeCount;
                    _this.video.statistics.dislikeCount = stats.dislikeCount;
                    _this.video.statistics.viewCount = stats.viewCount;
                    addVideo_1 = _this._videoService.add(_this.video).subscribe(function (savedVideo) {
                        _this.successMessage = 'Video added successfully.';
                        _this.video = new Video_1.Video();
                    }, function (error) { return _this.errorMessage = error; });
                }
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    VideoAddComponent.prototype.validateVideo = function () {
        var isValid = true;
        isValid = isValid && this.video !== undefined;
        isValid = isValid && this.video.url !== undefined;
        return isValid;
    };
    VideoAddComponent.prototype.extractVideoContent = function () {
        var sharedUrl = this.video.url;
        if (sharedUrl.indexOf("youtu.be") != -1) {
            this.extractVideoDetailFromShare();
        }
        else if (sharedUrl.indexOf("youtube.com") != -1) {
            this.extractVideoDetailsFromIframe();
        }
    };
    VideoAddComponent.prototype.extractVideoDetailsFromIframe = function () {
        var sharedUrl = this.video.url;
        while (sharedUrl.indexOf("\"") !== -1) {
            sharedUrl = sharedUrl.replace("\"", '\'');
        }
        var iFrame = $(sharedUrl);
        this.video.url = iFrame.attr('src');
        if (this.video.shared === undefined) {
            this.video.shared = true;
        }
        var vidId = this.video.url.split("embed/");
        this.video.videoId = vidId[vidId.length - 1];
    };
    VideoAddComponent.prototype.extractVideoDetailFromShare = function () {
        var sharedUrl = this.video.url;
        var urlParts = sharedUrl.split('youtu.be/');
        if (urlParts.length) {
            this.video.videoId = urlParts[urlParts.length - 1];
            this.video.url = this.youtubeEmbedUrl + this.video.videoId;
        }
    };
    VideoAddComponent = __decorate([
        core_1.Component({
            templateUrl: './app/video/video-add.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [VideoService_1.VideoService, YoutubeVideoService_1.YoutubeVideoService])
    ], VideoAddComponent);
    return VideoAddComponent;
}());
exports.VideoAddComponent = VideoAddComponent;
//# sourceMappingURL=video-add.component.js.map