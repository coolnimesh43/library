import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {VideosComponent} from "../video/videos.component";
@Component({
    templateUrl:'./app/welcome/welcome.component.html',
    directives:[ROUTER_DIRECTIVES,VideosComponent]
})
export class WelcomeComponent{

}