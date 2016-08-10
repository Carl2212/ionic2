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
var common_1 = require("../common");
var index_1 = require("ionic-angular/index");
var isArray_1 = require("rxjs/util/isArray");
var base64pipe_1 = require("../base64pipe");
var detail_1 = require("../item-details/detail");
var ToReadPage = (function () {
    function ToReadPage(navCtrl, navParams, commonfn, postrequest, config) {
        this.consttype = 'toread';
        this.pagesize = 8;
        this.navCtrl = navCtrl;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.postrequest = postrequest;
        this.commonfn = commonfn;
        this.config = config;
        this.listinfo = navParams.get('item');
        if (!this.listinfo) {
            var _this = this;
            _this.commonfn.gotCount(_this.consttype, function (count, modulelist) {
                _this.listinfo = modulelist;
            });
        }
        this.listpage = navParams.get('module_id');
        if (this.listpage) {
            this.openlist(this.listpage, 1);
        }
    }
    //点击进入列表页
    ToReadPage.prototype.openlist = function (module_id, pageindex) {
        if (!pageindex)
            pageindex = 1;
        this.selecteditem = module_id;
        //读取存储数据
        var _this = this;
        _this.storage.getJson('userinfo').then(function (info) {
            //post参数
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'userid', value: info.userid },
                { key: 'doctype', value: _this.consttype },
                { key: 'moduleid', value: module_id },
                { key: 'pageindex', value: pageindex },
                { key: 'pagesize', value: _this.pagesize }
            ];
            var doclisturl = _this.config.getValue('global_url') + _this.config.getValue('doclist_action');
            _this.postrequest.prequest(jsonParams, doclisturl, function (data) {
                if (data.header.code == 1 && data.result.success == 1) {
                    _this.doclist = _this.ParamsToJson(data.result.doclist);
                    console.log(_this.doclist);
                }
            });
        });
    };
    //数据转化
    ToReadPage.prototype.ParamsToJson = function (params) {
        if (!params || (isArray_1.isArray(params) && params.length <= 0))
            return params;
        var jdata = [];
        for (var _i = 0; _i < params.length; _i++) {
            var param = params[_i];
            var view = {};
            for (var _a = 0, _b = param.view; _a < _b.length; _a++) {
                var it = _b[_a];
                view[it.name] = it.text;
            }
            var detailparam = {};
            for (var _c = 0, _d = param.detailparam; _c < _d.length; _c++) {
                var it = _d[_c];
                detailparam[it.name] = it.text;
            }
            jdata.push({ view: view, detailparam: detailparam });
        }
        return jdata;
    };
    ToReadPage.prototype.updo = function () {
        this.selecteditem = false;
    };
    ToReadPage.prototype.opendetail = function (detail) {
        this.navCtrl.push(detail_1.DetailPage, { doc: detail, doctyoe: this.consttype });
    };
    ToReadPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/toread/toread.html',
            providers: [common_1.CommonComponent, config_1.ConfigComponent, postrequest_1.PostRequest],
            pipes: [base64pipe_1.Base64pipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, common_1.CommonComponent, postrequest_1.PostRequest, config_1.ConfigComponent])
    ], ToReadPage);
    return ToReadPage;
})();
exports.ToReadPage = ToReadPage;
