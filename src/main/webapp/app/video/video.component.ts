import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Video} from "../entity/Video";
import {VideoService} from "../service/VideoService";
@Component({
    templateUrl: './app/video/video.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class VideoComponent {
    video:Video;
    error:string;

    constructor(private _videoService:VideoService) {
        this.video = new Video();
    }
    
    add():void {
        if (this.validateVideo()) {
            this.extractVideoContent();
            let saved:Video;
            this._videoService.add(this.video).subscribe(savedVideo => saved = savedVideo, error =>this.error = error);
            console.log(saved);
        }
    }

    private validateVideo():boolean{
        let isValid:boolean=true;
        isValid=isValid && this.video!==undefined;
        isValid=isValid && this.video.url!==undefined;
        return isValid;
    }
    private extractVideoContent():void{
        let sharedUrl = this.video.url;
        if(sharedUrl!==undefined){
            while (sharedUrl.indexOf("\"") !== -1) {
                sharedUrl = sharedUrl.replace("\"", '\'');
            }
        }
        let $iframe = $(sharedUrl);
        this.video.url = $iframe.attr('src');
        if (this.video.frameHeight === undefined) {
            this.video.frameHeight = $iframe.attr('height');
        }
        if (this.video.frameWidth === undefined) {
            this.video.frameWidth = $iframe.attr('width');
        }
        if(this.video.name===undefined){
            this.video.name=$iframe.attr('title');
        }
        if(this.video.shared===undefined){
            this.video.shared=true;
        }
        let vidId=this.video.url.split("embed/");
        if(this.video.videoId===undefined){
            this.video.videoId=vidId[vidId.length];
        }
    }

}