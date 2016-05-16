import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {YoutubeResponse} from "../entity/YoutubeResponse";
@Injectable()
export class YoutubeVideoService{

    private apiKey:string='AIzaSyDUYt6Xy71EiJOP1PvDIrzdEaxqndiNanM';
    private getUrl:string='https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key='+this.apiKey+'&id=';
    constructor(private _http:Http){}

    public getVideoContent(videoId:string):Observable<YoutubeResponse>{
        return this._http.get(this.getUrl+videoId).map((response:Response) => <YoutubeResponse>response.json())
            .do()
            .catch(this.handleError);
    }
    private handleError(error:Response){
        console.log(error);
        return Observable.throw(error.json().error || 'server error');
    }
}