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
 * Created by Deng on 2016/8/11.
 */
var core_1 = require('@angular/core');
var common_1 = require("../common");
var common_2 = require('@angular/common');
var base64pipe_1 = require("../base64pipe");
var SelectPage = (function () {
    function SelectPage(commonfn, cdr) {
        this.addressType = '0'; //'0' or 'C'
        this.nextselect = [];
        this.nextcheckbox = [];
        this.onSelect = new core_1.EventEmitter();
        this.commonfn = commonfn;
        this.cdr = cdr;
    }
    //生命周期钩子 初始化
    SelectPage.prototype.ngOnInit = function () {
    };
    /*********************************************
     * 下一个选择框
     * input : aa object || string
     *         istoggle 是否切换
     *         callback 回调
     *********************************************/
    SelectPage.prototype.nextselectfn = function (aa, istoggle, callback) {
        //aa 可能是选择的父选项对象 也可能只是选择的父选项对象的groupid
        var selectitem = aa;
        this.cdr.detectChanges();
        //aa 是对象 并且有子项childlist 说明有子目录 进入子目录选项
        if (aa instanceof Object) {
            if (aa.childlist != undefined) {
                this.selectitems = aa.childlist;
                return;
            }
            //兼容最初版本aa 只是groupid
            aa = aa.groupid;
        }
        if (!callback && istoggle) {
            callback = istoggle;
            istoggle = undefined;
        }
        if (istoggle == undefined) {
            istoggle = true;
        }
        var type;
        var parent;
        if (this.departmentparam && this.commonfn.isEmptyObject(selectitem.parentid)) {
            type = 4;
            parent = this.departmentparam;
        }
        else {
            type = 2;
            parent = aa;
        }
        var _this = this;
        this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (tmpdata) {
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
    SelectPage.prototype.sureselectfn = function () {
        if (this.selectradio) {
            this.selectusers = [];
            this.selectusers[this.selectradio] = true;
        }
        this.onSelect.emit(this.selectusers);
    };
    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    SelectPage.prototype.selectall = function (aa, e) {
        var _this = this;
        this.nextselectfn(aa, false, function () {
            _this.ChooseallOrnot(e, _this.nextselect[aa]);
        });
    };
    /*********************************************
     * 全选以及全不选
     * input :  e  boolean 选择项的值 tmpdata 子部门数据
     *********************************************/
    SelectPage.prototype.ChooseallOrnot = function (e, tmpdata) {
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
        //this.selusers();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "selectusers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "selectitems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "departmentparam", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "multiuser", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "onSelect", void 0);
    SelectPage = __decorate([
        core_1.Component({
            selector: 'my-select',
            templateUrl: 'build/pages/selectpage/selectpage.html',
            directives: [common_2.NgSwitch, common_2.NgSwitchCase, common_2.NgSwitchDefault],
            pipes: [base64pipe_1.KeysPipe, base64pipe_1.KeyToParamsPipe, base64pipe_1.NullToFalse],
            inputs: ['selectitems', 'selectusers', 'departmentparam', 'multiuser']
        }), 
        __metadata('design:paramtypes', [common_1.CommonComponent, core_1.ChangeDetectorRef])
    ], SelectPage);
    return SelectPage;
})();
exports.SelectPage = SelectPage;
