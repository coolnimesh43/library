///<reference path="../../typings/jquery/jquery.d.ts" />
import {Component, OnInit, Output, EventEmitter, AfterViewInit} from "angular2/core";
import {Album} from "../entity/Album";
import {AlbumService} from "./album.service";
import {UserService} from "../user/user.service";
import {getLoggedInUser} from "../login/login.service";
import {User} from "../entity/User";
@Component({
    selector:'album',
    templateUrl:'./app/album/album.component.html'
})
export class AlbumComponent implements OnInit,AfterViewInit{

    public albums:Array<Album>;
    public errorMessage:string;
    public selectedAlbum:Album;
    @Output()
    currentAlbum:EventEmitter<Album>=new EventEmitter();

    constructor(private _albumService:AlbumService, private _userService:UserService){}

    ngOnInit():void{
        let user:User=getLoggedInUser();
        this._userService.getUser(user.id).subscribe(data => this.albums=data.albums, error => this.errorMessage=<any> error);
    }

    ngAfterViewInit():void{
        
    }

    selectAlbum(album:Album):void{
        (<any>$('#album')).collapse('hide');
        if(album!==undefined){
            this.selectedAlbum=album;
            this.fireEvent(album);
        }
    }

    fireEvent(album:Album):void{
        this.currentAlbum.emit(album);
    }
}