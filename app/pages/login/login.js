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
 * Created by Administrator on 2016/9/19.
 * 登录模态框
 */
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var postrequest_1 = require('../postrequest');
var config_1 = require('../config');
var index_1 = require("ionic-angular/index");
var ionic_native_1 = require('ionic-native');
var LoginPage = (function () {
    function LoginPage(nav, prequest, config, vctrl) {
        this.nav = nav;
        this.prequest = prequest;
        this.config = config;
        this.vctrl = vctrl;
    }
    LoginPage.prototype.ngOninit = function () {
        ionic_native_1.Keyboard.show();
    };
    LoginPage.prototype.dologin = function () {
        console.log(this.username, this.password);
        var params = { username: this.username, password: this.password };
        var url = this.config.getValue('global_url') + this.config.getValue('login_khd_action');
        var _me = this;
        this.prequest.prequest(params, url, function (data) {
            if (true) {
                console.log(_me.username);
                data = { username: _me.username, isneedwxlogin: true };
                _me.dismiss(data);
            }
        });
    };
    LoginPage.prototype.dismiss = function (data) {
        this.vctrl.dismiss(data);
    };
    LoginPage = __decorate([
        core_1.Component({
            templateUrl: "build/pages/login/login.html",
            providers: [postrequest_1.PostRequest, config_1.ConfigComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, postrequest_1.PostRequest, config_1.ConfigComponent, index_1.ViewController])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
