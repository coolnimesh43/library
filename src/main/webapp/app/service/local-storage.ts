import {Injectable} from "angular2/core";
import {Token} from "../entity/Token";
@Injectable()
export class LocalStorgeService{

    public getFromLocalStorage(item:string):any{
        return localStorage.getItem(item);
    }

    public setToLocalStorage(key:string, value:any):void{
        localStorage.setItem(key,value);
    }

    public setAllToLocalStorge(token:Token):void{
        this.setToLocalStorage("token",JSON.stringify(token));
        this.setToLocalStorage("user",JSON.stringify(token.user));
        this.setToLocalStorage("accessToken",JSON.stringify(token.accessToken));
    }

    public removeAllFromLocalStorage():void{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
    }
}