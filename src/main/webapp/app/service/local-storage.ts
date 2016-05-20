import {Injectable} from "angular2/core";
@Injectable()
export class LocalStorgeService{

    public getFromLocalStorage(item:string):any{
        return localStorage.getItem(item);
    }

    public setToLocalStorage(key:string, value:any):void{
        localStorage.setItem(key,value);
    }
}