import {AppComponent} from './app.component';
import {bootstrap} from 'angular2/platform/browser'
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {provide} from "angular2/core";
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {require} from 'angular2/core';
bootstrap(AppComponent, [HTTP_PROVIDERS, provide(AuthHttp, {
    useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
            headerName: 'Authorization',
            headerPrefix: 'Bearer',
            tokenName: 'accessToken',
            tokenGetter: (() => localStorage.getItem(this.tokenName)),
            noJwtError: true
        }), http)
    },
    deps: [Http]
}), provide(LocationStrategy, {useClass: PathLocationStrategy})]);