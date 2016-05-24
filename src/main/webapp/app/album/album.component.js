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
var album_service_1 = require("./album.service");
var user_service_1 = require("../user/user.service");
var login_service_1 = require("../login/login.service");
var AlbumComponent = (function () {
    function AlbumComponent(_albumService, _userService) {
        this._albumService = _albumService;
        this._userService = _userService;
    }
    AlbumComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = login_service_1.getLoggedInUser();
        this._userService.getUser(user.id).subscribe(function (data) { return _this.albums = data.albums; }, function (error) { return _this.errorMessage = error; });
    };
    AlbumComponent = __decorate([
        core_1.Component({
            selector: 'album',
            templateUrl: './app/album/album.component.html'
        }), 
        __metadata('design:paramtypes', [album_service_1.AlbumService, user_service_1.UserService])
    ], AlbumComponent);
    return AlbumComponent;
}());
exports.AlbumComponent = AlbumComponent;
//# sourceMappingURL=album.component.js.map