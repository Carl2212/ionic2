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
var common_1 = require("../common");
var index_1 = require("ionic-angular/index");
var base64pipe_1 = require("../base64pipe");
var toread_1 = require("../toread/toread");
var options_1 = require("../options/options");
var DoToSubmitPage = (function () {
    function DoToSubmitPage(navParams, navcontroller, commonfn, postrequest, config, cdr) {
        this.addressType = '0'; //'0' or 'C'
        this.selectusers = [];
        this.sureselect = false;
        this.isnull = true;
        this.nextcheckbox = [];
        this.pageparam = navParams.get('nextparam');
        this.detailinfo = navParams.get('detailinfo');
        this.commonfn = commonfn;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.postrequest = postrequest;
        this.config = config;
        this.cdr = cdr;
        this.navcontroller = navcontroller;
    }
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
            console.log(jsonParams);
            var dotosubmiturl = _this.config.getValue('global_url') + _this.config.getValue('toread_action');
            _this.postrequest.prequest(jsonParams, dotosubmiturl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    alert('传阅成功~<br>是否转为已读状态？');
                    //跳转回list页面
                    _this.navcontroller.push(toread_1.ToReadPage, { module_id: _this.detailinfo.detailparam.moduleid });
                }
                else {
                    alert('传阅失败!<br>请重试');
                }
            });
        });
    };
    /*********************************************
     * 展开部门通讯录
     * input : none
     *********************************************/
    DoToSubmitPage.prototype.selectitemsfn = function () {
        //获取部门通讯录
        var _this = this;
        this.commonfn.getGroupOrUserList(1, 0, this.addressType, function (data) {
            _this.selectitems = data;
            _this.openitems = true;
        });
        if (!this.toreadcheckbox) {
            this.nextcheckbox = [];
            this.selectusers = [];
            this.isnull = true;
        }
    };
    /*********************************************
     * 下一个选择框
     * input : aa userid
     *         istoggle 是否切换
     *         callback 回调
     *********************************************/
    DoToSubmitPage.prototype.nextselectfn = function (aa, istoggle, callback) {
        if (!callback && istoggle) {
            callback = istoggle;
            istoggle = undefined;
        }
        if (istoggle == undefined) {
            istoggle = true;
        }
        var _this = this;
        this.commonfn.getGroupOrUserList(2, aa, this.addressType, function (tmpdata) {
            if (_this.nextselect == undefined) {
                var tmp = {};
                tmp[aa] = tmpdata;
                _this.nextselect = tmp;
            }
            else if (!_this.nextselect[aa]) {
                _this.nextselect[aa] = tmpdata;
            }
            if (istoggle) {
                _this.nextselect[aa]['isopen'] = !_this.nextselect[aa]['isopen'];
            }
            else {
                _this.nextselect[aa]['isopen'] = true;
            }
            callback && callback();
        });
    };
    /*********************************************
     * 确定按钮【控制选项框与内容框的切换】
     * input : none
     *********************************************/
    DoToSubmitPage.prototype.sureselectfn = function () {
        if (this.selectusers) {
            this.openitems = false;
        }
    };
    /*********************************************
     * 删除最终选择项
     * input : key
     *********************************************/
    DoToSubmitPage.prototype.del = function (key) {
        this.selectusers[key] = false;
        var close = true;
        for (var i in this.selectusers) {
            if (this.selectusers[i])
                close = false;
        }
        if (close) {
            this.nextcheckbox = [];
            this.selectusers = [];
            this.isnull = true;
            this.toreadcheckbox = false;
        }
    };
    /*********************************************
     * 监控变量selectusers改变时，判断selectusers是否为空是否都为false
     * input : none
     *********************************************/
    DoToSubmitPage.prototype.selusers = function () {
        if (!this.selectusers || this.isEmptyObject(this.selectusers)) {
            this.isnull = true;
            this.toreadcheckbox = false;
        }
        else {
            for (var i in this.selectusers) {
                if (this.selectusers[i]) {
                    this.isnull = false;
                    this.cdr.detectChanges();
                    return;
                }
            }
            this.isnull = true;
            this.toreadcheckbox = false;
        }
    };
    /*********************************************
     * 判断对象是否为空
     * input : obj 对象
     *********************************************/
    DoToSubmitPage.prototype.isEmptyObject = function (obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    };
    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    DoToSubmitPage.prototype.selectall = function (aa, e) {
        var _this = this;
        this.nextselectfn(aa, false, function () {
            _this.ChooseallOrnot(e, _this.nextselect[aa]);
        });
    };
    /*********************************************
     * 全选以及全不选
     * input :  e  boolean 选择项的值 tmpdata 子部门数据
     *********************************************/
    DoToSubmitPage.prototype.ChooseallOrnot = function (e, tmpdata) {
        if (e) {
            //全选
            for (var _i = 0; _i < tmpdata.length; _i++) {
                var t = tmpdata[_i];
                this.selectusers[t.userid + '@' + t.username] = true;
            }
        }
        else {
            //全不选
            for (var _a = 0; _a < tmpdata.length; _a++) {
                var t = tmpdata[_a];
                this.selectusers[t.userid + '@' + t.username] = false;
            }
        }
        this.selusers();
    };
    DoToSubmitPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/dotosubmit/dotosubmit.html',
            providers: [common_1.CommonComponent, config_1.ConfigComponent, postrequest_1.PostRequest, options_1.OptionsComponent],
            pipes: [base64pipe_1.KeysPipe, base64pipe_1.KeyToParamsPipe, base64pipe_1.NullToFalse]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, common_1.CommonComponent, postrequest_1.PostRequest, config_1.ConfigComponent, core_1.ChangeDetectorRef])
    ], DoToSubmitPage);
    return DoToSubmitPage;
})();
exports.DoToSubmitPage = DoToSubmitPage;
