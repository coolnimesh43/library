import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {Video} from "../entity/Video";
import {VideoService} from "./VideoService";
import {YoutubeVideoService} from "./YoutubeVideoService";
import {YoutubeResponse, Snippet, Item, Statistics} from "../entity/YoutubeResponse";
import {isLoggedIn, getLoggedInUser} from "../login/login.service";
import {AlbumService} from "../album/album.service";
import {Album} from "../entity/Album";
import {AlbumAddComponent} from "../album/album-add.component";
import {UserService} from "../user/user.service";
import {User} from "../entity/User";
import {Script} from "../script";
@Component({
    templateUrl: './app/video/video-add.component.html',
    directives: [ROUTER_DIRECTIVES, AlbumAddComponent, Script]
})
export class VideoAddComponent implements OnInit {
    private youtubeEmbedUrl:string = "https://www.youtube.com/embed/";
    video:Video;
    album:Album;
    albums:Array<Album>;
    errorMessage:string;
    successMessage:string;

    constructor(private _albumService:AlbumService, private _youtubeVideoService:YoutubeVideoService, private _userService:UserService) {
        this.video = new Video();
    }

    ngOnInit():void {
        let user:User = getLoggedInUser();
        this._userService.getUser(user.id).subscribe(data => this.albums = data.albums, error => this.errorMessage = <any> error);
    }

    selectAlbum(album:Album):void {
        this.album = album;
    }

    add():void {
        this.errorMessage='';
        this.successMessage='';
        if (this.validateVideo()) {
            this.extractVideoContent();
            this._youtubeVideoService.getVideoContent(this.video.videoId).subscribe(response => {
                let youtubeResponse:YoutubeResponse = response;
                if (youtubeResponse.pageInfo.totalResults > 0) {
                    let item:Item = youtubeResponse.items[0];
                    let snippet:Snippet = item.snippet;
                    this.video.name = snippet.title;
                    this.video.description = snippet.description;
                    this.video.image = snippet.thumbnails.medium;
                    this.video.duration = item.contentDetails.duration;
                    let stats = item.statistics;
                    this.video.statistics = new Statistics();
                    this.video.statistics.likeCount = stats.likeCount;
                    this.video.statistics.dislikeCount = stats.dislikeCount;
                    this.video.statistics.viewCount = stats.viewCount;
                    this._albumService.addVideo(this.album.id, this.video)
                        .subscribe(album => {
                            this.video=new Video();
                            this.album=new Album();
                                this.successMessage = "Video added successfully.";
                            }, error => this.errorMessage = <any>error);
                }

            }, error => {
                this.errorMessage = error.toString;
            });
        } else {
            this.errorMessage = "Please enter all the required data.";
        }

    }

    public closeAddAlbumDialog(data) {
        if (data === 'ok') {
            this.successMessage = 'Album added successfully.';
            let user:User = getLoggedInUser();
            this._userService.getUser(user.id).subscribe(data => this.albums = data.albums, error => this.errorMessage = <any> error);
        }
        else {
            this.errorMessage = 'An error occurred while adding new album. Please try again.';
        }
    }

    private validateVideo():boolean {
        let isValid:boolean = true;
        isValid = isValid && this.video !== undefined;
        isValid = isValid && this.video.url !== undefined;
        isValid = isValid && this.album !== undefined;
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
            this.video.url = this.youtubeEmbedUrl + this.video.videoId;
        }
    }

}
