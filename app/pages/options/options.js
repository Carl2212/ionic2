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
 * Created by Deng on 2016/8/10.
 */
var core_1 = require('@angular/core');
var OptionsComponent = (function () {
    function OptionsComponent() {
        this.onoptions = new core_1.EventEmitter();
        this.test = 1;
    }
    OptionsComponent.prototype.alertop = function ($event) {
        this.onoptions.emit($event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "myoptions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "onoptions", void 0);
    OptionsComponent = __decorate([
        core_1.Component({
            selector: 'my-options',
            templateUrl: 'build/pages/options/options.html',
            inputs: ['myoptions']
        }), 
        __metadata('design:paramtypes', [])
    ], OptionsComponent);
    return OptionsComponent;
})();
exports.OptionsComponent = OptionsComponent;
