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
var AlbumService = (function () {
    function AlbumService(_http, _httpClient) {
        this._http = _http;
        this._httpClient = _httpClient;
        this.GET_ALL_ALBUMS_URL = 'http://localhost:8080/library/api/album';
        this.ALBUM_ADD_URL = 'http://localhost:8080/library/api/user/album';
        this.ALBUM_ADD_VIDEO_URL = 'http://localhost:8080/library/api/album/video/';
    }
    AlbumService.prototype.getAll = function () {
        var headers = this._httpClient.setHeader();
        return this._http.get(this.GET_ALL_ALBUMS_URL, { headers: headers }).map(function (response) { return response.json(); });
    };
    AlbumService.prototype.add = function (album) {
        var headers = this._httpClient.setHeader();
        return this._http.post(this.ALBUM_ADD_URL, JSON.stringify(album), { headers: headers }).map(function (response) { return response.json(); });
    };
    AlbumService.prototype.addVideo = function (albumId, video) {
        var headers = this._httpClient.setHeader();
        return this._http.post(this.ALBUM_ADD_VIDEO_URL + albumId, JSON.stringify(video), { headers: headers }).map(function (response) { return response.json(); });
    };
    AlbumService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_client_1.HttpClient])
    ], AlbumService);
    return AlbumService;
}());
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map