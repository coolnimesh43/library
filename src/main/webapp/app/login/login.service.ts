import {Injectable} from "angular2/core";
import 'rxjs/Rx';
import {Http, Headers, Response} from "angular2/http";
import {Login} from "../entity/Login";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";

@Injectable()
export class LoginService{

    private ACCESS_TOKEN:string="accessToken";
    private REFRESH_TOKEN:string="refreshToken";
    private USER:string="user";
    private loginUrl:string="http://localhost:8080/library/api/auth";
    private logoutUrl:string="http://localhost:8080/";

    constructor(private _http:Http){
    }

    login(login:Login):Observable<Token>{
        let headers:Headers=new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        return this._http.post(this.loginUrl,JSON.stringify(login),{headers:headers}).map((response:Response)=><Token> response.json())
            .do(token =>{
                localStorage.setItem(this.ACCESS_TOKEN,token.accessToken);
                localStorage.setItem(this.REFRESH_TOKEN,token.refreshtoken);
                localStorage.setItem(this.USER,token.user.toString());
            })
            .catch(this.handleError);
    }

  private  handleError(error:Response):Observable<any>{
        throw Observable.throw(error.json() || 'Validation failed.');
    }
}

export function isLoggedIn(){
    return !!localStorage.getItem(this.ACCESS_TOKEN);
}