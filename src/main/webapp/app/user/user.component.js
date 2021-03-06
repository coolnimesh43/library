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
var login_service_1 = require("../login/login.service");
var user_service_1 = require("./user.service");
var UserComponent = (function () {
    function UserComponent(_userService) {
        this._userService = _userService;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var localuser = login_service_1.getLoggedInUser();
        this._userService.getUser(localuser.id).subscribe(function (data) { return _this.user = data; }, function (error) { return _this.errorMessage = error; });
    };
    UserComponent = __decorate([
        core_1.Component({
            templateUrl: './app/user/user.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map