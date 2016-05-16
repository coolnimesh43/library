import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
@Component({
    selector:'navigation',
    templateUrl:'./app/nav/nav.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit{
    selected:string;
    router:Router;
    constructor(private _router:Router){
        this.router=_router;
    }
    onSelect(tab:string):void{
        this.selected=tab;
    }

    ngOnInit():void{
        if(this.selected===undefined){
            this.router.subscribe(currentUrl => this.selected=currentUrl,error=>console.error(error));
        }
    }

}