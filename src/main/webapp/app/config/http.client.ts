import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptionsArgs} from "angular2/http";
import {LocalStorgeService} from "../service/local-storage";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";
@Injectable()
export class HttpClient {

    constructor(private _http:Http,private _storageService:LocalStorgeService) {
    }

    private setHeader(requestArgs?:RequestOptionsArgs):RequestOptionsArgs {
        let finalHeader:Headers;
        let requestOption:RequestOptionsArgs;
        if(requestArgs){
            finalHeader=new Headers(requestArgs.headers);
            requestOption=requestArgs;
        }
        else{
            finalHeader=new Headers();
            requestOption={};
        }
        let token:Token=this._storageService.getFromLocalStorage("token");
        finalHeader.append('Authorization','Bearer '+'abcd.eq');
        finalHeader.append("Content-Type","application/json");
        finalHeader.append("Accept","application/json");
        requestOption.headers=finalHeader;
        return requestOption;
    }

    public get(url:string,options?: RequestOptionsArgs):Observable<Response>{
        let requestOption:RequestOptionsArgs=this.setHeader(options);
        return this._http.get(url,requestOption);
    }

    public post(url:string,body:string,options?:RequestOptionsArgs):Observable<Response>{
        let requestOption:RequestOptionsArgs=this.setHeader(options);
        console.log(requestOption.headers.get("Authorization"));
        console.log("body",body.toLocaleString());
        return this._http.post(url,body,requestOption).map((response:Response) => response.json())
            .do(data => {
                console.log("request",requestOption.headers.toJSON());
                console.log("data ",data);
            })
            .catch(this.handleError);
    }

    private  handleError(error:Response):Observable<any> {
        console.log(error.json());
        throw Observable.throw(error.json() || 'Validation failed.');
    }
}