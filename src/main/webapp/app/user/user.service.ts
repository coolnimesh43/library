import {Injectable} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {User} from "../entity/User";
import {HttpClient} from "../config/http.client";
@Injectable()
export class UserService{
    private USER_DETAILS_URL:string='http://localhost:8080/library/api/user/';
    constructor (private _http:Http,private _httpClient:HttpClient){}

    public getUser(userId:number):Observable<User>{
        if(userId!==undefined){
            let userDetailsUrl=this.USER_DETAILS_URL+userId;
            let headers:Headers=this._httpClient.setHeader();
            return this._http.get(userDetailsUrl,{headers:headers}).map((response:Response) => <User>response.json());
        }

    }
}