import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptionsArgs} from "angular2/http";
import {LocalStorgeService} from "../service/local-storage";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";

@Injectable()
export class HttpClient {

    constructor(private _storageService:LocalStorgeService,private _http:Http) {
    }

    public setHeader():Headers {
        let finalHeader:Headers=new Headers();
        let token:Token=this._storageService.getFromLocalStorage("token");
        if(token!==undefined){
            finalHeader.append('Authorization',"Bearer "+JSON.stringify(token));
            finalHeader.append("Content-Type","application/json");
        }
        return finalHeader;
    }

}