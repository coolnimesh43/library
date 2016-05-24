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
var YoutubeVideoService_1 = require("./YoutubeVideoService");
var YoutubeResponse_1 = require("../entity/YoutubeResponse");
var login_service_1 = require("../login/login.service");
var album_service_1 = require("../album/album.service");
var album_add_component_1 = require("../album/album-add.component");
var user_service_1 = require("../user/user.service");
var VideoAddComponent = (function () {
    function VideoAddComponent(_albumService, _youtubeVideoService, _userService) {
        this._albumService = _albumService;
        this._youtubeVideoService = _youtubeVideoService;
        this._userService = _userService;
        this.youtubeEmbedUrl = "https://www.youtube.com/embed/";
        this.video = new Video_1.Video();
    }
    VideoAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = login_service_1.getLoggedInUser();
        this._userService.getUser(user.id).subscribe(function (data) { return _this.albums = data.albums; }, function (error) { return _this.errorMessage = error; });
    };
    VideoAddComponent.prototype.selectAlbum = function (album) {
        this.album = album;
    };
    VideoAddComponent.prototype.add = function () {
        var _this = this;
        if (this.validateVideo()) {
            this.extractVideoContent();
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
                    _this._albumService.addVideo(_this.album.id, _this.video).subscribe(function (album) { return _this.album = album; }, function (error) { return _this.errorMessage = error; });
                }
            }, function (error) {
                _this.errorMessage = error.toString;
            });
        }
    };
    VideoAddComponent.prototype.closeAddAlbumDialog = function (event) {
        var _this = this;
        console.log(event);
        if (event) {
            this.successMessage = 'Album added successfully.';
            var user = login_service_1.getLoggedInUser();
            this._userService.getUser(user.id).subscribe(function (data) { return _this.albums = data.albums; }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'An error occurred while adding new album. Please try again.';
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
            directives: [router_1.ROUTER_DIRECTIVES, album_add_component_1.AlbumAddComponent]
        }), 
        __metadata('design:paramtypes', [album_service_1.AlbumService, YoutubeVideoService_1.YoutubeVideoService, user_service_1.UserService])
    ], VideoAddComponent);
    return VideoAddComponent;
}());
exports.VideoAddComponent = VideoAddComponent;
//# sourceMappingURL=video-add.component.js.map