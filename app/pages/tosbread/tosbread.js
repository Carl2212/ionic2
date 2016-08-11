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
var selectpage_1 = require("../selectpage/selectpage");
var base64pipe_1 = require("../base64pipe");
var common_1 = require("../common");
var ToSbReadComponent = (function () {
    function ToSbReadComponent(commonfn, cdr) {
        this.isnull = true;
        this.nextcheckbox = [];
        this.addressType = '0'; //'0' or 'C'
        this.selectusers = [];
        this.onToSbRead = new core_1.EventEmitter();
        this.commonfn = commonfn;
        this.cdr = cdr;
    }
    ToSbReadComponent.prototype.onSelect = function (event) {
        this.selectusers = event;
        this.openitems = false;
        this.selusers();
        this.onToSbRead.emit(event);
    };
    /*********************************************
     * 展开部门通讯录
     * input : none
     *********************************************/
    ToSbReadComponent.prototype.selectitemsfn = function () {
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
            this.selectusers = [];
            this.isnull = true;
            this.toreadcheckbox = false;
        }
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
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ToSbReadComponent.prototype, "onToSbRead", void 0);
    ToSbReadComponent = __decorate([
        core_1.Component({
            selector: 'tosbread-com',
            templateUrl: 'build/pages/tosbread/tosbread.html',
            directives: [selectpage_1.SelectPage],
            providers: [common_1.CommonComponent],
            pipes: [base64pipe_1.KeysPipe, base64pipe_1.KeyToParamsPipe, base64pipe_1.NullToFalse]
        }), 
        __metadata('design:paramtypes', [common_1.CommonComponent, core_1.ChangeDetectorRef])
    ], ToSbReadComponent);
    return ToSbReadComponent;
})();
exports.ToSbReadComponent = ToSbReadComponent;
