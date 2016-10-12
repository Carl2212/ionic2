/**
 * Created by Administrator on 2016/9/23.
 * 辅助组件 helper
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var txl_1 = require('../txl/txl');
var noticelist_1 = require('../notice/noticelist');
var docsearch_1 = require('../docsearch/docsearch');
var cordova_1 = require('../cordova/cordova');
var toread_1 = require('../toread/toread');
var hello_ionic_1 = require('../hello-ionic/hello-ionic');
var core_1 = require('@angular/core');
var helper = (function () {
    function helper() {
    }
    helper.prototype.getpages = function () {
        var pages = [
            { title: 'Hello Ionic111', component: hello_ionic_1.HelloIonicPage, params: {} },
            { title: '通讯录', component: txl_1.TxlPage, params: {} },
            { title: '待阅', component: toread_1.ToReadPage, params: { doctype: 'toread' } },
            { title: '查文', component: docsearch_1.DocSearchPage, params: {} },
            { title: '待办', component: toread_1.ToReadPage, params: { doctype: 'todo' } },
            { title: '公告通知', component: noticelist_1.NoticeListPage, params: {} },
            { title: '测试cordova', component: cordova_1.CordovaPage, params: {} },
        ];
        return pages;
    };
    helper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], helper);
    return helper;
})();
exports.helper = helper;
