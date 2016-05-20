import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {isLoggedIn} from "../login/login.service";

@Component({
    selector:'navigation',
    templateUrl:'./app/nav/nav.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit{
    selected:string;
    private isLoggedIn:boolean;

    constructor(private _router:Router){
        this.isLoggedIn=isLoggedIn();
    }
    ngOnInit():void{
        if(this.selected===undefined){
            this.selected="Home";
        }
    }
    onSelect(tab:string):void{
        this.selected=tab;
    }

   get getLoggedIn():boolean{
        return this.isLoggedIn;
    }
}