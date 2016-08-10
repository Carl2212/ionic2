var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
* txl 通讯录 这个页面数据页面有3个： 本部门（?state = selfgroup） 常用分组(?state = common) 以及通讯录（默认）
* 子页面 组列页面 用户列页面 用户信息页面
*
* */
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var config_1 = require('../config');
var postrequest_1 = require('../postrequest');
var index_1 = require("ionic-angular/index");
var common_1 = require("../common");
var TxlPage = (function () {
    function TxlPage(navCtrl, navParams, config, postrequest, common) {
        this.navCtrl = navCtrl;
        this.addressType = '0'; //'0' or 'C'
        // If we navigated to this page, we will have an item available as a nav param
        this.config = config;
        this.postrequest = postrequest;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.items = [];
        this.useritems = [];
        this.common = common;
        var _this = this;
        this.common.getGroupOrUserList(1, 0, this.addressType, function (data) {
            _this.items = data;
        });
    }
    //请求通讯录组
    TxlPage.prototype.itemTapped = function (event, item) {
        this.selectedItem = item;
        var _this = this;
        this.common.getGroupOrUserList(2, item.groupid, this.addressType, function (data) {
            _this.useritems = data;
        });
    };
    TxlPage.prototype.updo = function () {
        this.selectedItem = false;
        this.selecteduser = false;
    };
    TxlPage.prototype.userinfo = function (event, user) {
        this.selecteduser = user;
    };
    TxlPage.prototype.closecard = function () {
        this.selecteduser = false;
    };
    TxlPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/txl/txl.html',
            providers: [config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent])
    ], TxlPage);
    return TxlPage;
})();
exports.TxlPage = TxlPage;
