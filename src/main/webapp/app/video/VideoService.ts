import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Video} from "../entity/Video";
import {AuthConfig} from "angular2-jwt/angular2-jwt";
import {HttpClient} from "../config/http.client";
@Injectable()
export class VideoService{

    private videoUrl:string='http://localhost:8080/library/api/video';

    constructor(private _http:Http,private _httpClient:HttpClient){}

    public add(video:Video):Observable<Video>{
        let headers:Headers=this._httpClient.setHeader();
        return this._http.post(this.videoUrl,JSON.stringify(video),{headers:headers}).map((response:Response) => <Video> response.json())
            .do()
            .catch(this.handleError);
    }

    public getAll():Observable<Video[]>{
        return this._http.get(this.videoUrl).map((response:Response) => <Video[]> response.json())
            .do()
            .catch(this.handleError);
    }
    private handleError(error:Response){
        return Observable.throw(error.json().error || 'server error');
    }
}