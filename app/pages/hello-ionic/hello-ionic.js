var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var postrequest_1 = require('../postrequest');
var txl_1 = require('../txl/txl');
var noticelist_1 = require('../notice/noticelist');
var docsearch_1 = require('../docsearch/docsearch');
var todo_1 = require('../todo/todo');
var cordova_1 = require('../cordova/cordova');
var toread_1 = require('../toread/toread');
var config_1 = require('../config');
var index_1 = require("ionic-angular/index");
var common_1 = require("../common");
var login_1 = require("../login/login");
var HelloIonicPage = (function () {
    function HelloIonicPage(nav, config, postrequest, commonfn) {
        this.todonum = 0;
        this.toreadnum = 0;
        this.nav = nav;
        //let alert = Alert.create({subTitle : '传阅失败~请重试',buttons :['ok']});
        //this.nav.present(alert);
        //let modal = Modal.create(Loading);
        //this.nav.present(modal);
        this.config = config;
        this.pages = [
            { title: 'TxlPage', component: txl_1.TxlPage },
            { title: 'ToReadPage', component: toread_1.ToReadPage },
            { title: 'DocSearchPage', component: docsearch_1.DocSearchPage },
            { title: 'ToDoPage', component: todo_1.ToDoPage },
            { title: 'NoticeListPage', component: noticelist_1.NoticeListPage },
            { title: 'CordovaPage', component: cordova_1.CordovaPage },
        ];
        this.postrequest = postrequest;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.commonfn = commonfn;
        this.Initpage();
    }
    //页面加载初始化
    HelloIonicPage.prototype.Initpage = function () {
        var _this = this;
        _this.getUserInfo(function (notlogin) {
            if (notlogin) {
                _this.gotTodoCount();
                _this.gotToreadCount();
            }
            else {
                _this.isLogin(function () {
                    //获取各列表项的值
                    _this.gotTodoCount();
                    _this.gotToreadCount();
                });
            }
        });
    };
    //初始化内容存储类
    HelloIonicPage.prototype.saveUser = function () {
        this.storage.setJson('userinfo', { username: this.username, userid: this.userid, cnname: this.cnname, isLeader: this.isLeader });
    };
    //获取用户信息
    HelloIonicPage.prototype.getUserInfo = function (callback) {
        var userinfourl = this.config.getValue('global_url') + this.config.getValue('modulelist_action');
        var jsonParams = [
            { key: 'username', value: this.username },
            { key: 'userid', value: this.userid },
            { key: 'qybm', value: this.config.getValue('global_qybm') },
            { key: 'xmbm', value: this.config.getValue('global_xmbm') },
            { key: 'doctype', value: this.doctype }
        ];
        if (this.config.getValue('author_check')) {
            this.postrequest.prequest(jsonParams, userinfourl);
            callback && callback();
        }
        else {
            this.username = this.getURLParam('username');
            if (this.username) {
                callback && callback();
            }
            else {
                var _me = this;
                this.storage.get('userinfo').then(function (userinfo) {
                    if (userinfo && userinfo.username) {
                        _me.username = userinfo.username;
                        _me.userid = userinfo.userid;
                        _me.cnname = userinfo.cnname;
                        _me.isLeader = userinfo.isLeader;
                        if (_me.username && !_me.userid) {
                            callback && callback();
                        }
                        else {
                            callback && callback(true);
                        }
                    }
                    else {
                        //跳转到登录页面
                        _me.nav.setRoot(login_1.LoginPage);
                    }
                });
            }
        }
    };
    //判断登录
    HelloIonicPage.prototype.isLogin = function (callback) {
        var userinfourl = this.config.getValue('global_url') + this.config.getValue('login_action');
        var jsonParams = [
            { key: 'username', value: this.username },
            { key: 'qybm', value: this.config.getValue('global_qybm') },
            { key: 'xmbm', value: this.config.getValue('global_xmbm') },
        ];
        var _this = this;
        var cb = function (data) {
            if (data.header.code == 1) {
                var userlist = data.result.userlist[0];
                var user = {};
                if (userlist) {
                    for (var _i = 0; _i < userlist.length; _i++) {
                        var items = userlist[_i];
                        user[items.name] = items.text;
                    }
                }
                _this.isLeader = data.result.isLeader;
                _this.userid = user['userid'];
                _this.cnname = user['cnname'];
                _this.saveUser();
                callback && callback();
            }
        };
        this.postrequest.prequest(jsonParams, userinfourl, cb);
    };
    //获取待阅数量
    HelloIonicPage.prototype.gotToreadCount = function () {
        var _this = this;
        _this.commonfn.gotCount('toread', function (count, modulelist) {
            _this.toreadnum = count;
            _this.toreadlist = modulelist;
        });
    };
    //获取待办数量
    HelloIonicPage.prototype.gotTodoCount = function () {
        var _this = this;
        _this.commonfn.gotCount('todo', function (count, modulelist) {
            _this.todonum = count;
            _this.todolist = modulelist;
        });
    };
    HelloIonicPage.prototype.openPage = function (p, item, doctype) {
        if (item) {
            this.nav.setRoot(this.pages[p].component, { item: item, doctype: doctype });
        }
        else {
            this.nav.setRoot(this.pages[p].component);
        }
    };
    HelloIonicPage.prototype.getURLParam = function (key) {
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
    HelloIonicPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
            providers: [config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent])
    ], HelloIonicPage);
    return HelloIonicPage;
})();
exports.HelloIonicPage = HelloIonicPage;
