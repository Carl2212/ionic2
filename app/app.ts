import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar,AppAvailability,Device,BackgroundGeolocation} from 'ionic-native';
import {CommonComponent} from './pages/common';
import {ConfigComponent} from './pages/config';
import {PostRequest} from './pages/postrequest';
import {Storage, SqlStorage} from "ionic-angular/index";
import {isString} from "ionic-angular/util";
import {TxlPage} from './pages/txl/txl';
import {NoticeListPage} from './pages/notice/noticelist';
import {DocSearchPage} from './pages/docsearch/docsearch';
import {ToDoPage} from './pages/todo/todo';
import {CordovaPage} from './pages/cordova/cordova';
import {ToReadPage} from './pages/toread/toread';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {LoginPage} from './pages/login/login';
import {Badge} from 'ionic-native';
import {BackgroundMode} from 'ionic-native';
import {isNumber} from "ionic-angular/util";

@Component({
  templateUrl: 'build/app.html',
  providers: [ConfigComponent,PostRequest,CommonComponent]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any ,params : any}>;
  private storage;
  constructor(
    //private common :  CommonComponent,
    private platform: Platform,
    private menu: MenuController

  ) {
    this.storage = new Storage(SqlStorage);
    this.getUserInfo();
    this.initializeApp();
    // set our app's pages
    this.pages =[
      { title: 'Hello Ionic111', component: HelloIonicPage ,params :{}},
      { title: '通讯录', component: TxlPage ,params :{}},
      { title:'待阅', component : ToReadPage ,params : {doctype : 'toread'}},
      { title:'查文', component : DocSearchPage ,params : {}},
      { title:'待办', component : ToReadPage,params :{doctype : 'todo'}},
      { title:'公告通知', component : NoticeListPage ,params :{}},
      { title:'测试cordova', component : CordovaPage ,params :{}},
    ];
  }
  ngOnChanges(changes: {[propertyName: string]: any}) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log('6',cur,prev);
    }
  }
  ngOnInit() {
    console.log('7');
  }
  //获取用户信息
  getUserInfo() {
    console.log('3');

    let username = this.getURLParam('username');
    let _me = this;
    if(username) {
      this.storage.setJson('userinfo',{username : username});
      this.rootPage = HelloIonicPage;
    }else{
      this.storage.get('userinfo').then(function(userinfo) {
        var userinfo = (isString(userinfo) && userinfo !='') ? JSON.parse(userinfo) : undefined;
        if(!userinfo || !userinfo.username){
          //跳转到登录页面
          _me.rootPage = LoginPage;
        }else{
          _me.rootPage = HelloIonicPage;
        }
      });
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //好鸡冻。要尝试检测app是否安装的原生接口了。
      var app;
      if(Device.device.platform == 'ios') {
        console.log(Device.device);
        app = 'alipay://';
      }else if(Device.device.platform == 'Android') {
        app = 'com.eg.android.AlipayGphone';
        console.log(Device.device);
      }
      AppAvailability.check(app).then(
        (data)=> console.log(app+'is available'),
        (error) => console.log(app+'is not available')
      );

      //根据后台地理位置信息。请求不同的资源
      let config = {
        desiredAccuracy : 100,//地理位置比例 以米为单位
        stationaryRadius : 20 ,//半径。精度半径
        distanceFilter : 30 ,//
        debug : true,
        stopOnTerminate : false,
      }
      BackgroundGeolocation.configure((location) => {
        console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
        BackgroundGeolocation.finish(); // FOR IOS ONLY
      }, (error) => {
        console.log('BackgroundGeolocation error');
      }, config);

      BackgroundGeolocation.start();

      //设置小图标数字
      Badge.set(1);

      //后台运行模式
      if(BackgroundMode.isEnabled() || BackgroundMode.enable()) {
        setTimeout(function(){
          Badge.increase(1);
        },50000);
      }
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component ,page.params);

  }
  getURLParam(key){
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      if (null == key) return str;
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        var perParam = strs[i].split("=");
        if (perParam[0] == key) return perParam[1];
      }
    }
  }
}

ionicBootstrap(MyApp);
