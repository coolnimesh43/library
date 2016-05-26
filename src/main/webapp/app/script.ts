///<reference path="../../typings/jquery/jquery.d.ts" />
import {Directive} from "angular2/core";
@Directive()
export class Script{
    public static hideAlert():void{
        window.setTimeout(function() {
            $(".alert").fadeTo(1000, 0).slideUp(1000, function(){
                $(this).remove();
            });
        }, 2000);
    }
}