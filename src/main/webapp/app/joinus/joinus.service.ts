import {Injectable} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {HttpClient} from "../config/http.client";
import {Observable} from "rxjs/Observable";
@Injectable()
export class JoinUsService{
    private USERNAME_VALIDATION_URL='http://localhost:8080/library/api/user/user-name';
    private EMAIL_VALIDATION_URL='http://localhost:8080/library/api/user/email';

    private headers:Headers;
    constructor(private _http:Http, private _httpClient:HttpClient){
        this.headers=this._httpClient.setHeader();
    }
    public checkUserName(userName:string):Observable<boolean>{
        return this._http.post(this.USERNAME_VALIDATION_URL,userName,{headers:this.headers})
            .map((response:Response) => <boolean>response.json());
    }

    public checkEmail(email:string):Observable<boolean>{
        return this._http.post(this.EMAIL_VALIDATION_URL,email,{headers:this.headers})
            .map((response:Response) => <boolean>response.json());
    }
}