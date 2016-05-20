import {Injectable} from "angular2/core";
import 'rxjs/Rx';
import {Http, Headers, Response} from "angular2/http";
import {Login} from "../entity/Login";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";
import any = jasmine.any;
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {User} from "../entity/User";
import {HttpClient} from "../config/http.client";

@Injectable()
export class LoginService {

    private ACCESS_TOKEN:string = "accessToken";
    private REFRESH_TOKEN:string = "refreshToken";
    private USER:string = "user";
    private TOKEN:string = "token";
    private loginUrl:string = "http://localhost:8080/library/api/auth/login";
    private logOutUrl:string = "http://localhost:8080/library/api/auth/logout";

    constructor(private _http:Http, private _httpClient:HttpClient) {
    }

    login(login:Login):Observable<Token> {
        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return this._http.post(this.loginUrl, JSON.stringify(login), {headers: headers}).map((response:Response)=><Token> response.json())
            .do(token => {
                localStorage.setItem(this.TOKEN,JSON.stringify(token));
                localStorage.setItem(this.ACCESS_TOKEN, token.accessToken);
                localStorage.setItem(this.REFRESH_TOKEN, token.refreshtoken);
                localStorage.setItem(this.USER, JSON.stringify(token.user));
            })
            .catch(this.handleError);
    }

    public logout():Observable<string> {
        if (isLoggedIn()) {
            let token:Token = localStorage.getItem(this.TOKEN);
            return this._httpClient.post(this.logOutUrl, JSON.stringify(token)).map((response:Response) => response.json())
                .do(data=>{
                    localStorage.removeItem(this.ACCESS_TOKEN);
                    localStorage.removeItem(this.TOKEN);
                    localStorage.removeItem(this.REFRESH_TOKEN);
                    localStorage.removeItem(this.USER);
                })
                .catch(this.handleError);
        }

    }

    private  handleError(error:Response):Observable<any> {
        console.log(error.json());
        throw Observable.throw(error.json() || 'Validation failed.');
    }

}

export function isLoggedIn() {
    let value = !!localStorage.getItem("accessToken") && !!localStorage.getItem("refreshToken");
    return value;
}

export function getLoggedInUser():User{
    let user:User;
    if(isLoggedIn()){
        user=localStorage.getItem("user");
    }
    return user;
}