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
var ionic_angular_1 = require('ionic-angular');
var OptionsComponent = (function () {
    function OptionsComponent(nav) {
        this.nav = nav;
        this.onoptions = new core_1.EventEmitter();
    }
    OptionsComponent.prototype.alertop = function ($event) {
        this.onoptions.emit($event);
    };
    OptionsComponent.prototype.openumopinion = function () {
        var _this = this;
        var alert = ionic_angular_1.Alert.create();
        alert.setTitle('常用意见：请选择');
        for (var _i = 0, _a = this.umopinion; _i < _a.length; _i++) {
            var um = _a[_i];
            alert.addInput({
                type: "radio",
                label: um.text,
                value: um.text,
            });
        }
        alert.addButton({
            text: "OK",
            handler: function (data) {
                _this.myoptions = data;
            }
        });
        this.nav.present(alert);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "myoptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "umopinion", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "presentAlert", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OptionsComponent.prototype, "onoptions", void 0);
    OptionsComponent = __decorate([
        core_1.Component({
            selector: 'my-options',
            templateUrl: 'build/pages/options/options.html',
            inputs: ['myoptions', 'umopinion', 'presentAlert']
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], OptionsComponent);
    return OptionsComponent;
})();
exports.OptionsComponent = OptionsComponent;
