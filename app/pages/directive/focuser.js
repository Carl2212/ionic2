var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Administrator on 2016/9/20.
 */
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var Focuser = (function () {
    function Focuser(renderder, eleref) {
        this.renderder = renderder;
        this.eleref = eleref;
    }
    Focuser.prototype.ngAfterViewInit = function () {
        var _this = this;
        var element = this.eleref.nativeElement.querySelector('input');
        console.log(element);
        setTimeout(function () {
            _this.renderder.invokeElementMethod(element, 'focus', []);
            ionic_native_1.Keyboard.show();
        }, 300);
    };
    Focuser = __decorate([
        core_1.Directive({
            selector: '[focuser]'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], Focuser);
    return Focuser;
})();
exports.Focuser = Focuser;
