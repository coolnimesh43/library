import {Injectable} from "angular2/core";
import 'rxjs/Rx';
import {Http, Headers, Response} from "angular2/http";
import {Login} from "../entity/Login";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";
import any = jasmine.any;
import {User} from "../entity/User";
import {HttpClient} from "../config/http.client";
import {LocalStorgeService} from "../service/local-storage";
import {TokenService} from "../service/token.service";

@Injectable()
export class LoginService {

    private ACCESS_TOKEN:string = "accessToken";
    private REFRESH_TOKEN:string = "refreshToken";
    private USER:string = "user";
    private TOKEN:string = "token";
    private loginUrl:string = "http://localhost:8080/library/api/auth/login";
    private logOutUrl:string = "http://localhost:8080/library/api/auth/logout";

    constructor(private _http:Http, private _httpClient:HttpClient, private _localStorageService:LocalStorgeService) {
    }

    login(login:Login):Observable<Token> {
        if(this._localStorageService.getFromLocalStorage("token")===null){
            let headers:Headers=this._httpClient.setHeader();
            return this._http.post(this.loginUrl, JSON.stringify(login),{headers:headers}).map((response:Response) => <Token> response.json())
                .do(data => this._localStorageService.setAllToLocalStorge(data));
        }
    }

    public logout():void {
        if (isLoggedIn()) {
            let headers:Headers=this._httpClient.setHeader();
            let token:Token = localStorage.getItem(this.TOKEN);
            this._localStorageService.removeAllFromLocalStorage();
            this._http.post(this.logOutUrl, JSON.stringify(token),{headers:headers})
                .map((response:Response) => response.json())
                .do()
                .catch(data => Observable.throw(data ||'error'))
                .subscribe();
        }

    }

    private  handleError(error:Response):Observable<any> {
     return Observable.throw(error || "validation failed");
    }

}
    export function isLoggedIn() {
        let value = !!localStorage.getItem("accessToken") && !!localStorage.getItem("token");
        return value;
    }

    export function getLoggedInUser():User {
        let user:User;
        if (isLoggedIn()) {
            user = JSON.parse(localStorage.getItem("user"));
        }
        return user;
    }