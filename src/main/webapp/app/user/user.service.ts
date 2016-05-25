import {Injectable} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {User} from "../entity/User";
import {HttpClient} from "../config/http.client";
@Injectable()
export class UserService{
    private USER_DETAILS_URL:string='http://localhost:8080/library/api/user/';
    private headers:Headers;
    constructor (private _http:Http,private _httpClient:HttpClient){
        this.headers=this._httpClient.setHeader();
    }

    public getUser(userId:number):Observable<User>{
        if(userId!==undefined){
            let userDetailsUrl=this.USER_DETAILS_URL+userId;
            return this._http.get(userDetailsUrl,{headers:this.headers}).map((response:Response) => <User>response.json());
        }

    }

    public create(user:User):Observable<User>{
        if(user!==undefined){
            return this._http.post(this.USER_DETAILS_URL,JSON.stringify(user),{headers:this.headers})
                .map((response:Response) => <User> response.json());
        }
    }
}