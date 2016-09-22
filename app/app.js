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
var ionic_native_1 = require('ionic-native');
var hello_ionic_1 = require('./pages/hello-ionic/hello-ionic');
var login_1 = require('./pages/login/login');
var txl_1 = require('./pages/txl/txl');
var noticelist_1 = require('./pages/notice/noticelist');
var docsearch_1 = require('./pages/docsearch/docsearch');
var toread_1 = require('./pages/toread/toread');
var cordova_1 = require('./pages/cordova/cordova');
var common_1 = require('./pages/common');
var config_1 = require('./pages/config');
var postrequest_1 = require('./pages/postrequest');
var index_1 = require("ionic-angular/index");
var util_1 = require("ionic-angular/util");
var ionic_native_2 = require('ionic-native');
var ionic_native_3 = require('ionic-native');
var MyApp = (function () {
    function MyApp(
        //private common :  CommonComponent,
        platform, menu) {
        this.platform = platform;
        this.menu = menu;
        this.storage = new index_1.Storage(index_1.SqlStorage);
        this.getUserInfo();
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Hello Ionic111', component: hello_ionic_1.HelloIonicPage, params: {} },
            { title: '通讯录', component: txl_1.TxlPage, params: {} },
            { title: '待阅', component: toread_1.ToReadPage, params: { doctype: 'toread' } },
            { title: '查文', component: docsearch_1.DocSearchPage, params: {} },
            { title: '待办', component: toread_1.ToReadPage, params: { doctype: 'todo' } },
            { title: '公告通知', component: noticelist_1.NoticeListPage, params: {} },
            { title: '测试cordova', component: cordova_1.CordovaPage, params: {} },
        ];
    }
    MyApp.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            console.log('6', cur, prev);
        }
    };
    MyApp.prototype.ngOnInit = function () {
        console.log('7');
    };
    //获取用户信息
    MyApp.prototype.getUserInfo = function () {
        console.log('3');
        var username = this.getURLParam('username');
        var _me = this;
        if (username) {
            this.storage.setJson('userinfo', { username: username });
            this.rootPage = hello_ionic_1.HelloIonicPage;
        }
        else {
            this.storage.get('userinfo').then(function (userinfo) {
                var userinfo = (util_1.isString(userinfo) && userinfo != '') ? JSON.parse(userinfo) : undefined;
                if (!userinfo || !userinfo.username) {
                    //跳转到登录页面
                    _me.rootPage = login_1.LoginPage;
                }
                else {
                    _me.rootPage = hello_ionic_1.HelloIonicPage;
                }
            });
        }
    };
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            //好鸡冻。要尝试检测app是否安装的原生接口了。
            var app;
            if (ionic_native_3.Device.device.platform == 'ios') {
                console.log(ionic_native_3.Device.device);
                app = 'alipay://';
            }
            else if (ionic_native_3.Device.device.platform == 'Android') {
                app = 'com.eg.android.AlipayGphone';
                console.log(ionic_native_3.Device.device);
            }
            ionic_native_2.AppAvailability.check(app).then(function (data) { return console.log(app + 'is available'); }, function (error) { return console.log(app + 'is not available'); });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component, page.params);
    };
    MyApp.prototype.getURLParam = function (key) {
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
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav), 
        __metadata('design:type', ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'build/app.html',
            providers: [config_1.ConfigComponent, postrequest_1.PostRequest, common_1.CommonComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.MenuController])
    ], MyApp);
    return MyApp;
})();
ionic_angular_1.ionicBootstrap(MyApp);
