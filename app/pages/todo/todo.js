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
var ionic_native_1 = require('ionic-native');
var ToDoPage = (function () {
    function ToDoPage(navParams, commonfn) {
        this.commonfn = commonfn;
        this.listinfo = navParams.get('item');
        if (!this.listinfo) {
            var _this = this;
            this.commonfn.gotCount('todo', function (count, modulelist) {
                _this.listinfo = modulelist;
            });
        }
        //清除app 图标的数量
        ionic_native_1.Badge.clear();
    }
    ToDoPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/todo/todo.html',
            providers: [common_1.CommonComponent, config_1.ConfigComponent, postrequest_1.PostRequest]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, common_1.CommonComponent])
    ], ToDoPage);
    return ToDoPage;
})();
exports.ToDoPage = ToDoPage;
