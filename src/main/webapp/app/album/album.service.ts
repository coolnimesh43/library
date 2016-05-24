import {Injectable} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {HttpClient} from "../config/http.client";
import {Album} from "../entity/Album";
import {Observable} from "rxjs/Observable";
import {Video} from "../entity/Video";
@Injectable()
export class AlbumService{
    private GET_ALL_ALBUMS_URL='http://localhost:8080/library/api/album';
    private ALBUM_ADD_URL='http://localhost:8080/library/api/user/album';
    private ALBUM_ADD_VIDEO_URL='http://localhost:8080/library/api/album/video/';
    constructor(private _http:Http, private _httpClient:HttpClient){}

    public getAll():Observable<Album[]>{
        let headers:Headers=this._httpClient.setHeader();
        return this._http.get(this.GET_ALL_ALBUMS_URL,{headers:headers}).map((response:Response) => <Album[]> response.json());
    }

    public add(album:Album):Observable<Album>{
        let headers:Headers=this._httpClient.setHeader();
        return this._http.post(this.ALBUM_ADD_URL,JSON.stringify(album),{headers:headers}).map((response:Response) => <Album> response.json());
    }

    public addVideo(albumId:number, video:Video):Observable<Album>{
        let headers:Headers=this._httpClient.setHeader();
        return this._http.post(this.ALBUM_ADD_VIDEO_URL+albumId,JSON.stringify(video),{headers:headers}).map((response:Response) => <Album> response.json());
    }
}