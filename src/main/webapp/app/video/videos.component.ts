import {Video} from "../entity/Video";
import {Component, OnInit, Output} from "angular2/core";
import {VideoService} from "../service/VideoService";
import {DurationFilter} from "../filter/duration.filter";
@Component({
    selector:'videos',
    templateUrl:'./app/video/videos.component.html',
    pipes:[DurationFilter]
})
export class VideosComponent implements OnInit{
    videos:Array<Video>;
    currentVideo:Video;
    errorMessage:string;
    constructor(private _videoService:VideoService){}

    ngOnInit():void{
        this._videoService.getAll().subscribe(videos => {
            this.videos=videos;
            if(this.videos){
                this.currentVideo=new Video();
                this.currentVideo=this.videos[0];
            }
        }, error => this.errorMessage=<any>error);
    }

    playVideo(video:Video):void{
        if(video!==undefined){
            this.currentVideo=video;
        }
    }
}