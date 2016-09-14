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
 * Created by Deng on 2016/8/10.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var selectpage_1 = require("../selectpage/selectpage");
var base64pipe_1 = require("../base64pipe");
var common_2 = require("../common");
var ToSbReadComponent = (function () {
    function ToSbReadComponent(commonfn, cdr) {
        this.isnull = true;
        this.toreadcheckbox = false;
        this.openitems = false;
        this.nextcheckbox = [];
        this.addressType = '0'; //'0' or 'C'
        this.selectusers = {};
        this.onToSbRead = new core_1.EventEmitter();
        this.commonfn = commonfn;
        this.cdr = cdr;
    }
    ToSbReadComponent.prototype.onSelect = function (event) {
        this.selectusers = event;
        console.log(this.selectusers);
        if (!this.selectusers || this.commonfn.isEmptyObject(this.selectusers)) {
            this.isnull = true;
            console.log(this.isnull);
        }
        this.openitems = false;
        this.selusers();
        this.onToSbRead.emit(event);
    };
    /*********************************************
     * 展开部门通讯录
     * input : none
     *********************************************/
    ToSbReadComponent.prototype.selectitemsfn = function () {
        if (this.item && (this.item.ispointtoend == 'S' || this.item.ispointtoend == 'Y')) {
            //最后一步
            return;
        }
        else if (this.defaultuser) {
            var tmp = {};
            for (var _i = 0, _a = this.defaultuser; _i < _a.length; _i++) {
                var duser = _a[_i];
                tmp[duser.userid + '@' + duser.username] = true;
            }
            this.selectusers = tmp;
            this.isnull = false;
            this.cdr.detectChanges();
            return;
        }
        var _this = this;
        var type;
        var parent;
        if (!_this.item) {
            type = 1;
            parent = 0;
        }
        else if (_this.item.isdefaultroute) {
            type = 3;
            parent = _this.departmentparam;
        }
        this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (data) {
            _this.selectitems = data;
            _this.openitems = true;
        });
        if (this.item && this.item.multiuser != 0 && !this.toreadcheckbox) {
            this.nextcheckbox = [];
            this.selectusers = {};
            this.isnull = true;
        }
    };
    /*********************************************
     * 删除最终选择项
     * input : key
     *********************************************/
    ToSbReadComponent.prototype.del = function (key) {
        this.selectusers[key] = false;
        var close = true;
        for (var i in this.selectusers) {
            if (this.selectusers[i])
                close = false;
        }
        if (close) {
            this.nextcheckbox = [];
            this.selectusers = {};
            this.isnull = true;
            this.toreadcheckbox = false;
            this.cdr.detectChanges();
            console.log('isnull', this.isnull);
        }
        console.log('notnull');
    };
    /*********************************************
     * 监控变量selectusers改变时，判断selectusers是否为空是否都为false
     * input : none
     *********************************************/
    ToSbReadComponent.prototype.selusers = function () {
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
    ToSbReadComponent.prototype.isEmptyObject = function (obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToSbReadComponent.prototype, "defaultuser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToSbReadComponent.prototype, "departmentparam", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToSbReadComponent.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ToSbReadComponent.prototype, "onToSbRead", void 0);
    ToSbReadComponent = __decorate([
        core_1.Component({
            selector: 'tosbread-com',
            templateUrl: 'build/pages/tosbread/tosbread.html',
            directives: [selectpage_1.SelectPage, common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault],
            providers: [common_2.CommonComponent],
            pipes: [base64pipe_1.KeysPipe, base64pipe_1.KeyToParamsPipe, base64pipe_1.NullToFalse],
            inputs: ['defaultuser', 'departmentparam', 'item'],
        }), 
        __metadata('design:paramtypes', [common_2.CommonComponent, core_1.ChangeDetectorRef])
    ], ToSbReadComponent);
    return ToSbReadComponent;
})();
exports.ToSbReadComponent = ToSbReadComponent;
