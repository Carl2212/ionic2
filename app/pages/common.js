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
 * Created by Deng on 2016/8/4.
 */
var core_1 = require('@angular/core');
var postrequest_1 = require("./postrequest");
var config_1 = require("./config");
var index_1 = require("ionic-angular/index");
var isArray_1 = require("rxjs/util/isArray");
var CommonComponent = (function () {
    function CommonComponent(config, postrequest) {
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.config = config;
        this.postrequest = postrequest;
    }
    //通用方法之获取通讯录核心方法
    CommonComponent.prototype.getGroupOrUserList = function (type, parentid, addressType, callback) {
        //type = 1 为grouplist  2为userlist
        var _this = this;
        this.storage.getJson('userinfo').then(function (info) {
            //数据
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'type', value: addressType }
            ];
            var gotlisturl = _this.config.getValue('global_url');
            if (type == 1) {
                jsonParams.push({ key: 'parentid', value: parentid });
                gotlisturl += _this.config.getValue('grouplist_action');
            }
            else if (type == 2) {
                jsonParams.push({ key: 'groupid', value: parentid });
                gotlisturl += _this.config.getValue('userlist_action');
            }
            else if (type == 3) {
                jsonParams.push({ key: 'moduleid', value: parentid.moduleid });
                jsonParams.push({ key: 'docid', value: parentid.docid });
                jsonParams.push({ key: 'nextnodeid', value: parentid.nextnodeid });
                gotlisturl += _this.config.getValue('nextroute_group_action');
            }
            else if (type == 4) {
                jsonParams.push({ key: 'moduleid', value: parentid.moduleid });
                jsonParams.push({ key: 'docid', value: parentid.docid });
                jsonParams.push({ key: 'nextnodeid', value: parentid.nextnodeid });
                jsonParams.push({ key: 'groupid', value: 'Role' });
                gotlisturl += _this.config.getValue('nextroute_user_action');
            }
            //请求
            _this.postrequest.prequest(jsonParams, gotlisturl, function (data) {
                //回调
                if (data.header.code == 1 && data.result.success == 1) {
                    if (type == 1 || type == 3) {
                        callback(data.result.grouplist);
                    }
                    else {
                        callback(_this.ParamsToJson(data.result.userlist));
                    }
                }
            });
        });
    };
    CommonComponent.prototype.ParamsToJson = function (params, k, v) {
        if (k === void 0) { k = "name"; }
        if (v === void 0) { v = "text"; }
        if (!params || !isArray_1.isArray(params) || params.length <= 0)
            return [];
        var jdata = [];
        for (var _i = 0; _i < params.length; _i++) {
            var param = params[_i];
            jdata.push(this.OneToJson(param, k, v));
        }
        return jdata;
    };
    CommonComponent.prototype.OneToJson = function (param, k, v) {
        if (k === void 0) { k = "name"; }
        if (v === void 0) { v = "text"; }
        if (!param || !isArray_1.isArray(param) || param.length <= 0)
            return [];
        var tmp = [];
        for (var _i = 0; _i < param.length; _i++) {
            var item = param[_i];
            tmp[item[k]] = item[v];
        }
        return tmp;
    };
    //通用方法之列项数量的获取
    CommonComponent.prototype.gotCount = function (doctype, callback) {
        var _this = this;
        _this.storage.getJson('userinfo').then(function (info) {
            var jsonParams = [
                { key: 'username', value: info.username },
                { key: 'userid', value: info.userid },
                { key: 'qybm', value: _this.config.getValue('global_qybm') },
                { key: 'xmbm', value: _this.config.getValue('global_xmbm') },
                { key: 'doctype', value: doctype }
            ];
            var gotcounturl = _this.config.getValue('global_url') + _this.config.getValue('modulelist_action');
            _this.postrequest.prequest(jsonParams, gotcounturl, function (data) {
                if (data.header.code == 1) {
                    var modulelist = data.result.modulelist;
                    var total_count = 0;
                    if (modulelist) {
                        for (var _i = 0; _i < modulelist.length; _i++) {
                            var items = modulelist[_i];
                            total_count += parseInt(items.count);
                        }
                    }
                    callback && callback(total_count, modulelist);
                }
            }, false);
        });
    };
    CommonComponent.prototype.getURLParam = function (key) {
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (null == key)
                return str;
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var perParam = strs[i].split("=");
                if (perParam[0] == key)
                    return perParam[1];
            }
        }
    };
    CommonComponent.prototype.isEmptyObject = function (obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    };
    CommonComponent = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_1.ConfigComponent, postrequest_1.PostRequest])
    ], CommonComponent);
    return CommonComponent;
})();
exports.CommonComponent = CommonComponent;
