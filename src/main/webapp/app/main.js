"use strict";
var _this = this;
var app_component_1 = require('./app.component');
var browser_1 = require('angular2/platform/browser');
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var http_1 = require("angular2/http");
browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, core_1.provide(angular2_jwt_1.AuthHttp, {
        useFactory: function (http) {
            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: 'accessToken',
                tokenGetter: (function () { return localStorage.getItem(_this.tokenName); }),
                noJwtError: true
            }), http);
        },
        deps: [http_1.Http]
    }), core_1.provide(router_1.LocationStrategy, { useClass: router_1.PathLocationStrategy })]);
//# sourceMappingURL=main.js.map