import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";
import { ElementRef, DynamicComponentLoader, Attribute, Directive} from "angular2/core";
import {isLoggedIn} from "../login/login.service";
@Directive({
    selector: 'my-router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
    publicRoutes:any;
    private parentRouter:Router;

    constructor( _elementRef:ElementRef, _loader:DynamicComponentLoader,
                _parentRouter:Router, @Attribute('name') nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true,
            '/about': true,
            '/home':true
        };
    }

    activate(instruction:ComponentInstruction) {
        var url = instruction.urlPath;
        if (!this.publicRoutes[url] && !isLoggedIn()) {
            this.parentRouter.navigate(['Login']);
        }
        return super.activate(instruction);
    }
}