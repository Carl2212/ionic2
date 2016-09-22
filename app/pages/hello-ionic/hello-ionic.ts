import {Component} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, NavController ,Modal} from 'ionic-angular';
import {PostRequest} from '../postrequest';
import {ParamsJson} from '../paramsjson';
import {TxlPage} from '../txl/txl';
import {NoticeListPage} from '../notice/noticelist';
import {DocSearchPage} from '../docsearch/docsearch';
import {ToDoPage} from '../todo/todo';
import {CordovaPage} from '../cordova/cordova';
import {ToReadPage} from '../toread/toread';
import {ConfigComponent} from '../config';
import {Storage, SqlStorage} from "ionic-angular/index";
import {CommonComponent} from "../common";
import {Loading} from "../loading/loading";
import {Alert} from'ionic-angular'
import {ModalCmp} from "ionic-angular/components/modal/modal";
import {LoginPage} from "../login/login";
import {isString} from "ionic-angular/util";

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [ConfigComponent,PostRequest,CommonComponent]
})

export class HelloIonicPage {
  private nav;
  private config;
  pages : Array<{title : string ,component : any}>;
  private postrequest;
  private username ;
  private userid;
  private doctype;
  private isLeader;
  private cnname;
  public todonum : number = 0;
  public toreadnum : number = 0;
  private storage;
  private toreadlist;
  private todolist;
  private commonfn;
  constructor(nav : NavController,config : ConfigComponent,postrequest : PostRequest ,commonfn : CommonComponent) {
    console.log('1');
    this.nav = nav;
    this.config = config;
    this.pages = [
      { title: 'TxlPage', component: TxlPage },
      { title:'ToReadPage', component : ToReadPage},
      { title:'DocSearchPage', component : DocSearchPage},
      { title:'ToDoPage', component : ToDoPage},
      { title:'NoticeListPage', component : NoticeListPage},
      { title:'CordovaPage', component : CordovaPage},
    ];
    this.postrequest = postrequest;
    this.storage = new Storage(SqlStorage);
    this.commonfn = commonfn;
    this.Initpage();
  }
  ngOnInit() {
    console.log('8');
  }
  //页面加载初始化
  Initpage() {
    var _this = this;
    _this.getUserInfo(function(notlogin){
      if(notlogin) {
        _this.gotTodoCount();
        _this.gotToreadCount();
      }else{
        _this.isLogin(function(){
          //获取各列表项的值
          _this.gotTodoCount();
          _this.gotToreadCount();
        });
      }
    });
  }
  //初始化内容存储类
  saveUser() {
    this.storage.setJson('userinfo',{username : this.username,userid: this.userid,cnname :this.cnname,isLeader: this.isLeader});
  }
  //获取用户信息
  getUserInfo(callback) {
    var userinfourl = this.config.getValue('global_url')+this.config.getValue('modulelist_action');
    var jsonParams = [
      {key : 'username',value : this.username},
      {key : 'userid',value : this.userid},
      {key : 'qybm',value : this.config.getValue('global_qybm')},
      {key : 'xmbm',value : this.config.getValue('global_xmbm')},
      {key : 'doctype',value : this.doctype}
    ];
    if(this.config.getValue('author_check')) {
      this.postrequest.prequest(jsonParams,userinfourl);
        callback && callback();
    }else{
      let _me = this;
      this.storage.get('userinfo').then(function(userinfo) {
        var userinfo = (isString(userinfo) && userinfo !='') ? JSON.parse(userinfo) : undefined;
        if(!_me.commonfn.isEmptyObject(userinfo)){
          _me.username = userinfo.username;
          _me.userid = userinfo.userid;
          _me.cnname = userinfo.cnname;
          _me.isLeader =userinfo.isLeader;
          if(_me.username && !_me.userid) {
            callback && callback();
          }else{
            callback && callback(true);
          }
        }else{
          //跳转到登录页面
          _me.nav.setRoot(LoginPage);
        }
      });
    }
  }
  //判断登录
  isLogin(callback) {
    var userinfourl = this.config.getValue('global_url')+this.config.getValue('login_action');
    var jsonParams = [
      {key : 'username',value : this.username},
      {key : 'qybm',value : this.config.getValue('global_qybm')},
      {key : 'xmbm',value : this.config.getValue('global_xmbm')},
    ];
    var _this = this;
    let cb = function(data :any) {
      if(data.header.code == 1) {
        var userlist = data.result.userlist[0];
        var user = {};
        if(userlist) {
          for(var items of userlist) {
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
    this.postrequest.prequest(jsonParams,userinfourl,cb);
  }



  //获取待阅数量
  gotToreadCount() {
    var _this = this;
    _this.commonfn.gotCount('toread',function(count,modulelist){
      _this.toreadnum = count ;
      _this.toreadlist = modulelist;
    });
  }
  //获取待办数量
  gotTodoCount() {
    var _this = this;
    _this.commonfn.gotCount('todo',function(count,modulelist){
      _this.todonum = count ;
      _this.todolist = modulelist;
    });
  }


  openPage(p,item,doctype){
      if(item) {
        this.nav.setRoot(this.pages[p].component,{item : item , doctype : doctype});
      }else{
        this.nav.setRoot(this.pages[p].component);
      }
  }
}



