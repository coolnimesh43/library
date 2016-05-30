///<reference path="../typings/jquery/jquery.d.ts" />
export class Script{
    public static hideAlert():void{
        $(".alert").fadeTo(1000, 0).slideUp(1000, function(){
            $(this).hide();
        });
    }

    public static showAlert():void{
        $(".alert").show();
    }
}