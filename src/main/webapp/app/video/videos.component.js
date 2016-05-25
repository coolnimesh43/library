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
var Video_1 = require("../entity/Video");
var core_1 = require("angular2/core");
var VideoService_1 = require("./VideoService");
var duration_filter_1 = require("../filter/duration.filter");
var album_component_1 = require("../album/album.component");
var VideosComponent = (function () {
    function VideosComponent(_videoService) {
        this._videoService = _videoService;
    }
    VideosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._videoService.getAll().subscribe(function (videos) {
            _this.videos = videos;
            if (_this.videos) {
                _this.currentVideo = new Video_1.Video();
                _this.currentVideo = _this.videos[0];
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    VideosComponent.prototype.selectAlbum = function (album) {
        if (album !== undefined) {
            this.videos = album.videos;
            this.currentVideo = this.videos[0];
        }
    };
    VideosComponent.prototype.playVideo = function (video) {
        if (video !== undefined) {
            this.currentVideo = video;
        }
    };
    VideosComponent = __decorate([
        core_1.Component({
            selector: 'videos',
            templateUrl: './app/video/videos.component.html',
            pipes: [duration_filter_1.DurationFilter],
            directives: [album_component_1.AlbumComponent]
        }), 
        __metadata('design:paramtypes', [VideoService_1.VideoService])
    ], VideosComponent);
    return VideosComponent;
}());
exports.VideosComponent = VideosComponent;
//# sourceMappingURL=videos.component.js.map