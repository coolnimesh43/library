import {Component, OnInit} from "angular2/core";
import {Album} from "../entity/Album";
import {AlbumService} from "./album.service";
import {UserService} from "../user/user.service";
import {getLoggedInUser} from "../login/login.service";
import {User} from "../entity/User";
@Component({
    selector:'album',
    templateUrl:'./app/album/album.component.html'
})
export class AlbumComponent implements OnInit{

    public albums:Array<Album>;
    public errorMessage:string;
    constructor(private _albumService:AlbumService, private _userService:UserService){}

    ngOnInit():void{
        let user:User=getLoggedInUser();
        this._userService.getUser(user.id).subscribe(data => this.albums=data.albums, error => this.errorMessage=<any> error);
    }
}