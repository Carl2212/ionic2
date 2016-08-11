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
 *
 */
/**
 * Created by Deng on 2016/8/5.
 * toread detail page
 */
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var config_1 = require("../config");
var postrequest_1 = require('../postrequest');
var index_1 = require("ionic-angular/index");
var base64pipe_1 = require("../base64pipe");
var toread_1 = require("../toread/toread");
var options_1 = require("../options/options");
var tosbread_1 = require("../tosbread/tosbread");
var ionic_angular_2 = require('ionic-angular');
var DoToSubmitPage = (function () {
    function DoToSubmitPage(navParams, navcontroller, postrequest, config, cdr, alertcmp) {
        this.addressType = '0'; //'0' or 'C'
        this.sureselect = false;
        this.pageparam = navParams.get('nextparam');
        this.detailinfo = navParams.get('detailinfo');
        this.navcontroller = navcontroller;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.postrequest = postrequest;
        this.config = config;
        this.alertcmp = alertcmp;
        //this.cdr = cdr;
    }
    /*********************************************
     * 接收子组件的数据方法
     * ajax
     *********************************************/
    DoToSubmitPage.prototype.onoptions = function (options) {
        this.options = options;
        //this.cdr.detectChanges();
    };
    DoToSubmitPage.prototype.onToSbRead = function (sb) {
        this.selectusers = sb;
        //this.cdr.detectChanges();
    };
    /*********************************************
     * 提交传阅信息
     * ajax
     *********************************************/
    DoToSubmitPage.prototype.Submitfn = function () {
        var _this = this;
        _this.storage.get('userinfo').then(function (info) {
            var jsoninfo = JSON.parse(info);
            var touserid = [];
            if (_this.selectusers) {
                for (var user in _this.selectusers) {
                    if (_this.selectusers[user]) {
                        var items = user.split("@");
                        touserid.push(items[0]);
                    }
                }
            }
            var jsonParams = [
                { key: 'userid', value: jsoninfo.userid },
                { key: 'moduleid', value: _this.detailinfo.detailparam.moduleid },
                { key: 'appid', value: _this.detailinfo.detailparam.appid },
                { key: 'touserid', value: touserid },
                { key: 'toreadmsg', value: _this.options },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') }
            ];
            var dotosubmiturl = _this.config.getValue('global_url') + _this.config.getValue('toread_action');
            _this.postrequest.prequest(jsonParams, dotosubmiturl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    _this.presentAlert('传阅成功~', '是否转为已读状态？');
                    //跳转回list页面
                    _this.navcontroller.push(toread_1.ToReadPage, { module_id: _this.detailinfo.detailparam.moduleid });
                }
                else {
                    _this.presentAlert('传阅失败!', '请重试');
                }
            });
        });
    };
    DoToSubmitPage.prototype.presentAlert = function (tt, subt) {
        var alert = this.alertcmp.create({
            title: tt,
            subTitle: subt,
            buttons: ['ok']
        });
        alert.present();
    };
    DoToSubmitPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/dotosubmit/dotosubmit.html',
            providers: [config_1.ConfigComponent, postrequest_1.PostRequest, ionic_angular_2.Alert],
            directives: [options_1.OptionsComponent, tosbread_1.ToSbReadComponent],
            pipes: [base64pipe_1.KeysPipe, base64pipe_1.KeyToParamsPipe, base64pipe_1.NullToFalse]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, postrequest_1.PostRequest, config_1.ConfigComponent, core_1.ChangeDetectorRef, ionic_angular_2.Alert])
    ], DoToSubmitPage);
    return DoToSubmitPage;
})();
exports.DoToSubmitPage = DoToSubmitPage;
