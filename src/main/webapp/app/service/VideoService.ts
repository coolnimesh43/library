import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Video} from "../entity/Video";
@Injectable()
export class VideoService{

    private addUrl:string='http://localhost:8080/library/api/video';

    constructor(private _http:Http){}

    public add(video:Video):Observable<Video>{
        let headers:Headers=new Headers();
        headers.append("Content-Type","application/json");
        return this._http.post(this.addUrl,JSON.stringify(video),{headers:headers}).map((response:Response) => <Video> response.json())
            .do()
            .catch(error => this.handleError(error));
    }

    private handleError(error:any){
        console.log(error);
    }
}