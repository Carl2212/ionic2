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
var focuser_1 = require('../directive/focuser');
var index_2 = require("ionic-angular/index");
var hello_ionic_1 = require('../hello-ionic/hello-ionic');
var LoginPage = (function () {
    function LoginPage(nav, prequest, config, vctrl, menu) {
        this.nav = nav;
        this.prequest = prequest;
        this.config = config;
        this.vctrl = vctrl;
        this.menu = menu;
        this.menu.swipeEnable(false);
        this.storage = new index_2.Storage(index_2.SqlStorage);
    }
    LoginPage.prototype.dologin = function () {
        console.log(this.username, this.password);
        var params = { username: this.username, password: this.password };
        var url = this.config.getValue('global_url') + this.config.getValue('login_khd_action');
        var _me = this;
        this.prequest.prequest(params, url, function (data) {
            if (true) {
                console.log(_me.username);
                _me.storage.setJson('userinfo', { username: _me.username, userid: data.userid, cnname: data.cnname, isLeader: data.isLeader });
                _me.nav.setRoot(hello_ionic_1.HelloIonicPage);
            }
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            templateUrl: "build/pages/login/login.html",
            providers: [postrequest_1.PostRequest, config_1.ConfigComponent],
            directives: [focuser_1.Focuser]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, postrequest_1.PostRequest, config_1.ConfigComponent, index_1.ViewController, ionic_angular_1.MenuController])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
