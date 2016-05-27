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
var login_service_1 = require("./login.service");
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var LogoutComponent = (function () {
    function LogoutComponent(_loginService, _router) {
        this._loginService = _loginService;
        this._router = _router;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        var user = login_service_1.getLoggedInUser();
        if (user !== undefined) {
            this.loggedInUserName = user.firstName + ' ' + user.lastName;
        }
    };
    Object.defineProperty(LogoutComponent.prototype, "getLoggedIn", {
        get: function () {
            return login_service_1.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    LogoutComponent.prototype.logout = function () {
        this._loginService.logout();
    };
    LogoutComponent = __decorate([
        core_1.Component({
            template: "<ul class=\"nav navbar-nav navbar-collapse pull-right\" *ngIf=\"getLoggedIn\">\n                <li class=\"pull-left\">\n                    <a [routerLink]=\"['User']\" title=\"{{loggedInUserName}}\">{{loggedInUserName}}</a> &nbsp;&nbsp;\n                </li>\n                <li class=\"pull-right\">\n                    <a href=\"#\" title=\"Logout\" (click)=\"logout()\"><strong>Logout</strong></a>\n                </li>\n            </ul>",
            selector: 'logout',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map