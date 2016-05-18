import {Injectable} from "angular2/core";
import 'rxjs/Rx';
import {Http, Headers, Response} from "angular2/http";
import {Login} from "../entity/Login";
import {Observable} from "rxjs/Observable";
import {Token} from "../entity/Token";
@Injectable()
export class LoginService{

    private loginUrl:string="http://localhost:8080/library/api/auth";
    constructor(private _http:Http){
    }

    login(login:Login):Observable<Token>{
        let headers:Headers=new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        return this._http.post(this.loginUrl,JSON.stringify(login),{headers:headers}).map((response:Response)=><Token> response.json())
            .do(token =>{
                localStorage.setItem("accessToken",token.accessToken);
                localStorage.setItem("refreshToken",token.refreshtoken);
                localStorage.setItem("user",token.user);
            })
            .catch(this.handleError);
    }

  private  handleError(error:Response){
        throw Observable.throw(error.json() || 'Validation failed.');
    }
}