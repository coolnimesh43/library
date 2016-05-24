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
var Album_1 = require("../entity/Album");
var album_service_1 = require("./album.service");
var AlbumAddComponent = (function () {
    function AlbumAddComponent(_albumService) {
        this._albumService = _albumService;
        this.close = new core_1.EventEmitter();
        this.album = new Album_1.Album();
    }
    AlbumAddComponent.prototype.add = function () {
        var _this = this;
        if (this.album.name !== undefined) {
            this._albumService.add(this.album).subscribe(function (data) { return _this.success = true; }, function (error) { _this.success = false; console.log(error); });
            this.album = new Album_1.Album();
            this.fireClose(this.success);
        }
    };
    AlbumAddComponent.prototype.fireClose = function (success) {
        this.close.emit(success);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AlbumAddComponent.prototype, "close", void 0);
    AlbumAddComponent = __decorate([
        core_1.Component({
            selector: "add-album",
            templateUrl: './app/album/album-add.component.html'
        }), 
        __metadata('design:paramtypes', [album_service_1.AlbumService])
    ], AlbumAddComponent);
    return AlbumAddComponent;
}());
exports.AlbumAddComponent = AlbumAddComponent;
//# sourceMappingURL=album-add.component.js.map