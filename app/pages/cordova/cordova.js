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
 * Created by Deng on 2016/7/27.
 */
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var config_1 = require("../config");
var postrequest_1 = require('../postrequest');
var index_1 = require("ionic-angular/index");
var common_1 = require("../common");
var ionic_native_1 = require('ionic-native');
var CordovaPage = (function () {
    function CordovaPage(navCtrl, navParams, postrequest, config, commonfn) {
        this.isdetail = false;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postrequest = postrequest;
        this.config = config;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.commonfn = commonfn;
        this.Initpage('PublishInfo', 1);
        this.doc = this.navParams.get('docdetail');
        if (this.doc) {
            this.detailpage(this.doc);
        }
        this.inactionsheet();
    }
    CordovaPage.prototype.inactionsheet = function () {
        var buttonLabels = ['Share via Facebook', 'Share via Twitter'];
        console.log(ionic_native_1.ActionSheet);
        ionic_native_1.ActionSheet.show({
            'title': 'What do you want with this image?',
            'buttonLabels': buttonLabels,
            'addCancelButtonWithLabel': 'Cancel',
            'addDestructiveButtonWithLabel': 'Delete'
        }).then(function (buttonIndex) {
            console.log('Button pressed: ' + buttonIndex);
        });
    };
    //初始化页面数据
    CordovaPage.prototype.Initpage = function (module_id, pageindex) {
        if (!pageindex)
            pageindex = 1;
        //读取存储数据
        var _this = this;
        _this.storage.getJson('userinfo').then(function (info) {
            //post参数
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'userid', value: info.userid },
                { key: 'moduleid', value: module_id },
                { key: 'pageindex', value: pageindex },
                { key: 'pagesize', value: _this.config.getValue('pagesize') }
            ];
            var doclisturl = _this.config.getValue('global_url') + _this.config.getValue('noticelist_action');
            _this.postrequest.prequest(jsonParams, doclisturl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    _this.doclist = _this.commonfn.ParamsToJson(data.result.noticelist);
                }
            });
        });
    };
    CordovaPage.prototype.opendetail = function (doc) {
        this.navCtrl.push(CordovaPage, { docdetail: doc });
    };
    CordovaPage.prototype.detailpage = function (doc) {
        //读取存储数据
        var _this = this;
        _this.storage.getJson('userinfo').then(function (info) {
            //post参数
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'userid', value: info.userid },
                { key: 'moduleid', value: doc.moduleid },
                { key: 'noticeid', value: doc.noticeid },
            ];
            var doclisturl = _this.config.getValue('global_url') + _this.config.getValue('noticedetail_action');
            _this.postrequest.prequest(jsonParams, doclisturl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    _this.docdetail = data.result.detail.item;
                    _this.isdetail = true;
                }
            });
        });
    };
    CordovaPage.prototype.updo = function () {
        this.isdetail = false;
    };
    CordovaPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/cordova/cordova.html',
            providers: [config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent],
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, postrequest_1.PostRequest, config_1.ConfigComponent, common_1.CommonComponent])
    ], CordovaPage);
    return CordovaPage;
})();
exports.CordovaPage = CordovaPage;
