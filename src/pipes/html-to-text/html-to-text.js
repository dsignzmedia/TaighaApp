var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the HtmlToTextPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var HtmlToTextPipe = /** @class */ (function () {
    function HtmlToTextPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    HtmlToTextPipe.prototype.transform = function (value) {
        return value.replaceAll("\\<[^>]*>", "");
    };
    HtmlToTextPipe = __decorate([
        Pipe({
            name: 'htmlToText',
        })
    ], HtmlToTextPipe);
    return HtmlToTextPipe;
}());
export { HtmlToTextPipe };
//# sourceMappingURL=html-to-text.js.map