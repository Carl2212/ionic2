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
 * Created by Deng on 2016/8/5.
 * toread detail page
 */
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var config_1 = require("../config");
var postrequest_1 = require('../postrequest');
var common_1 = require("../common");
var index_1 = require("ionic-angular/index");
var base64pipe_1 = require("../base64pipe");
var dotosubmit_1 = require("../dotosubmit/dotosubmit");
var DetailPage = (function () {
    function DetailPage(navParams, navcontrol, commonfn, postrequest, config) {
        this.isdetail = true;
        this.isprocess = false;
        this.detailinfo = navParams.get('doc');
        this.consttype = navParams.get('doctype');
        this.simpleinfo = this.detailinfo.view;
        this.commonfn = commonfn;
        this.postrequest = postrequest;
        this.config = config;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.navcontrol = navcontrol;
        this.getDocDetail();
        this.nextparam = [
            { doctype: 'toread', operating: '转传阅' },
            { doctype: 'todo', operating: '审批' }
        ];
    }
    //请求doc详情
    DetailPage.prototype.getDocDetail = function () {
        //获取存储的个人信息数据
        var _this = this;
        _this.storage.get('userinfo').then(function (info) {
            var detailurl = _this.config.getValue('global_url') + _this.config.getValue('docdetail_action');
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'userid', value: info.userid },
                { key: 'doctype', value: _this.consttype },
                { key: 'moduleid', value: _this.detailinfo.detailparam.moduleid },
                { key: 'nodeid', value: _this.detailinfo.detailparam.nodeid },
                { key: 'docid', value: _this.detailinfo.detailparam.docid },
                { key: 'appid', value: _this.detailinfo.detailparam.appid },
            ];
            //请求
            _this.postrequest.prequest(jsonParams, detailurl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    _this.detail = data.result.detail.item;
                    _this.process = data.result.detail.tracelist;
                }
            });
        });
    };
    //传阅（进入dotosubmit）
    DetailPage.prototype.sendread = function () {
        console.log({ nextparam: this.nextparam[0], detailinfo: this.detailinfo });
        this.navcontrol.push(dotosubmit_1.DoToSubmitPage, { nextparam: this.nextparam[0], detailinfo: this.detailinfo });
    };
    //提交已阅(只是单纯接口先不做)
    DetailPage.prototype.readed = function () {
    };
    //取待办下一个节点
    DetailPage.prototype.nextroute = function () {
    };
    //提交待办
    DetailPage.prototype.submitTodo = function () {
    };
    DetailPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/item-details/detail.html',
            providers: [common_1.CommonComponent, config_1.ConfigComponent, postrequest_1.PostRequest],
            pipes: [base64pipe_1.Base64pipe, base64pipe_1.KeysPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, common_1.CommonComponent, postrequest_1.PostRequest, config_1.ConfigComponent])
    ], DetailPage);
    return DetailPage;
})();
exports.DetailPage = DetailPage;
