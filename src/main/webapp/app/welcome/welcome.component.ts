import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanActivate} from 'angular2/router'
import {VideosComponent} from "../video/videos.component";
import {AlbumComponent} from "../album/album.component";
@Component({
    templateUrl:'./app/welcome/welcome.component.html',
    directives:[ROUTER_DIRECTIVES,VideosComponent,AlbumComponent]
})
export class WelcomeComponent{

}