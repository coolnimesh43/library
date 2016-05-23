import {HttpClient} from "../config/http.client";
import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {LocalStorgeService} from "./local-storage";
import {Response, Http, Headers} from "angular2/http";
import {Token} from "../entity/Token";

@Injectable()
export class TokenService{
    private ACCESS_TOKEN_REFRESH_URL:string="http://localhost:8080/library/api/auth/refresh";
    constructor(private _httpClient:HttpClient,private _localStorageService:LocalStorgeService,private _http:Http){}
}