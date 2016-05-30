"use strict";
///<reference path="../typings/jquery/jquery.d.ts" />
var Script = (function () {
    function Script() {
    }
    Script.hideAlert = function () {
        $(".alert").fadeTo(1000, 0).slideUp(1000, function () {
            $(this).hide();
        });
    };
    Script.showAlert = function () {
        $(".alert").show();
    };
    return Script;
}());
exports.Script = Script;
//# sourceMappingURL=script.js.map