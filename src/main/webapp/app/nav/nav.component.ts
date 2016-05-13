import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
@Component({
    selector:'nav',
    templateUrl:'./app/nav/nav.component.html',
    directives:[ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit{
    selected:string;

    onSelect(tab:string):void{
        this.selected=tab;
    }

    ngOnInit():void{
        if(this.selected===undefined){
            this.selected='home';
        }
    }

}