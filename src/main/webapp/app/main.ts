import {AppComponent} from './app.component';
import {bootstrap} from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {LocationStrategy, PathLocationStrategy} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
bootstrap(AppComponent, [HTTP_PROVIDERS, provide(LocationStrategy, {useClass: PathLocationStrategy})]);
