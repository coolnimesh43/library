///<reference path="../../typings/jquery/jquery.d.ts" />
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Video} from "../entity/Video";
import {VideoService} from "../service/VideoService";
import {YoutubeVideoService} from "../service/YoutubeVideoService";
import {YoutubeResponse, Snippet, Item, Statistics} from "../entity/YoutubeResponse";
@Component({
    templateUrl: './app/video/video-add.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class VideoAddComponent {
    private youtubeEmbedUrl:string="https://www.youtube.com/embed/";
    video:Video;
    errorMessage:string;
    successMessage:string;

    constructor(private _videoService:VideoService, private _youtubeVideoService:YoutubeVideoService) {
        this.video = new Video();
    }

    add():void {
        if (this.validateVideo()) {
            this.extractVideoContent();
            console.log(this.video);
            let addVideo;
            this._youtubeVideoService.getVideoContent(this.video.videoId).subscribe(response => {
                    let youtubeResponse:YoutubeResponse = response;
                    if (youtubeResponse.pageInfo.totalResults > 0) {
                        let item:Item = youtubeResponse.items[0];
                        let snippet:Snippet = item.snippet;
                        this.video.name = snippet.title;
                        this.video.description = snippet.description;
                        this.video.image = snippet.thumbnails.medium;
                        this.video.duration = item.contentDetails.duration;
                        let stats=item.statistics;
                        this.video.statistics=new Statistics();
                        this.video.statistics.likeCount = stats.likeCount;
                        this.video.statistics.dislikeCount=stats.dislikeCount;
                        this.video.statistics.viewCount=stats.viewCount;
                        addVideo=this._videoService.add(this.video);
                        console.log(this.video);
                    }

                }, error => {
                    this.errorMessage = <any>error
                }, function saveVideo() {
                    addVideo.subscribe(savedVideo => {
                        this.successMessage = 'Video added successfully.';
                        this.video = new Video();
                    }, error =>this.errorMessage = <any> error);
                });
            // this._videoService.add(this.video).subscribe(savedVideo => {
            //     this.successMessage = 'Video added successfully.';
            //     this.video = new Video();
            // }, error =>this.errorMessage = <any> error);
        }
    }

    private validateVideo():boolean {
        let isValid:boolean = true;
        isValid = isValid && this.video !== undefined;
        isValid = isValid && this.video.url !== undefined;
        return isValid;
    }

    private extractVideoContent():void {
        let sharedUrl = this.video.url;
        if (sharedUrl.indexOf("youtu.be") != -1) {
            this.extractVideoDetailFromShare();
        }
        else if (sharedUrl.indexOf("youtube.com") != -1) {
            this.extractVideoDetailsFromIframe();
        }
    }

    private extractVideoDetailsFromIframe():void {
        let sharedUrl = this.video.url;
        while (sharedUrl.indexOf("\"") !== -1) {
            sharedUrl = sharedUrl.replace("\"", '\'');
        }
        let iFrame = $(sharedUrl);
        this.video.url = iFrame.attr('src');
        if (this.video.shared === undefined) {
            this.video.shared = true;
        }
        let vidId:Array<string> = this.video.url.split("embed/");
        this.video.videoId = vidId[vidId.length - 1]
    }

    private extractVideoDetailFromShare():void {
        let sharedUrl = this.video.url;
        let urlParts = sharedUrl.split('youtu.be/');
        if (urlParts.length) {
            this.video.videoId = urlParts[urlParts.length - 1];
            this.video.url=this.youtubeEmbedUrl+this.video.videoId;
        }
    }
}
