/**
 * Created by Deng on 2016/8/5.
 *
 */
/**
 * Created by Deng on 2016/8/5.
 * toread detail page
 */
import {Component , ChangeDetectorRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";
import {PostRequest} from '../postrequest';
import {Storage,SqlStorage} from "ionic-angular/index";
import {KeysPipe,KeyToParamsPipe,NullToFalse} from "../base64pipe";
import {isArray} from "rxjs/util/isArray";
import {ToReadPage} from "../toread/toread";
import {OptionsComponent} from "../options/options";
import {ToSbReadComponent} from "../tosbread/tosbread";
import {Alert} from'ionic-angular'
import {isObject} from "rxjs/util/isObject";
import {CommonComponent} from "../common";

@Component({
  templateUrl : 'build/pages/dotosubmit/dotosubmit.html',
  providers : [ConfigComponent,PostRequest,CommonComponent],
  directives : [OptionsComponent,ToSbReadComponent],
  pipes : [KeysPipe,KeyToParamsPipe,NullToFalse]
})

export class DoToSubmitPage {
  private postrequest:any;
  private config:any;
  public pageparam:any;
  private addressType:string = '0';//'0' or 'C'
  public sureselect:any = false;
  private storage:any;
  public options:any;
  private detailinfo:any;
  private cdr : any;
  private navcontroller : any;
  private selectusers :any;
  private commonfn : any;
  private nodelist : any;
  private umopinion : any;

  public issbread : boolean = false;


  constructor(navParams:NavParams, navcontroller : NavController , postrequest:PostRequest, config:ConfigComponent , cdr: ChangeDetectorRef , commonfn : CommonComponent) {
    this.pageparam = navParams.get('nextparam');
    this.detailinfo = navParams.get('detailinfo');
    console.log(this.pageparam,this.detailinfo);
    this.navcontroller = navcontroller;
    this.storage = new Storage(SqlStorage);
    this.postrequest = postrequest;
    this.config = config;
    this.cdr = cdr;
    this.commonfn = commonfn;
    //请求接口获取当前模块操作项
    if(this.pageparam.doctype == 'todo') {
      this.nextroute();
    }
    if(this.pageparam.doctype == 'toread' || this.detailinfo.detailparam.moduleid == 'accept_doc_manager') {
      this.issbread = true;
    }
  }
  nextroute() {
    //获取存储的个人信息数据
    var _this = this;
    _this.storage.get('userinfo').then(function(info){
      info = JSON.parse(info);
      let detailurl = _this.config.getValue('global_url') + _this.config.getValue('nextroute_action');
      let jsonParams = [
        {key : 'qybm',value : _this.config.getValue('global_qybm')},
        {key : 'xmbm',value : _this.config.getValue('global_xmbm')},
        {key : 'userid' , value : info.userid},
        {key : 'doctype' , value : _this.pageparam.doctype},
        {key : 'moduleid' , value : _this.detailinfo.detailparam.moduleid},
        {key : 'nodeid' , value :_this.detailinfo.detailparam.nodeid},
        {key : 'docid' , value : _this.detailinfo.detailparam.docid},
        {key : 'appid' , value : _this.detailinfo.detailparam.appid},
      ];
      //请求
      _this.postrequest.prequest(jsonParams,detailurl,function(data){
        if(data.header.code == 1 && data.result.success ==1 && data.result.nodelist) {
          _this.nodelist = data.result.nodelist.node;
          _this.umopinion = data.result.nodelist.umopinion;
          _this.cdr.detectChanges();
          if(!isArray(_this.nodelist)) _this.nodelist = [_this.nodelist];
          for(var temp in _this.nodelist) {
            if(_this.nodelist[temp]['defaultuser']) {
              _this.nodelist[temp]['defaultuser'] = _this.commonfn.ParamsToJson(_this.nodelist[temp]['defaultuser']);
            }
            if(_this.nodelist[temp]['departmentparam']) {
              _this.nodelist[temp]['departmentparam'] = _this.commonfn.OneToJson(_this.nodelist[temp]['departmentparam']);
            }
            if(_this.nodelist[temp]['item']) {
              _this.nodelist[temp]['item'] = _this.commonfn.OneToJson(_this.nodelist[temp]['item']);
            }
          }
          console.log(_this.nodelist);
        }
      });
    });
  }
  /*********************************************
   * 接收子组件的数据方法
   * ajax
   *********************************************/
  onoptions(options) {
    this.options = options;
  }
  onToSbRead(sb) {
    this.selectusers = sb;
  }


  /*********************************************
   * 提交传阅信息
   * ajax
   *********************************************/
  Submitfn() {
    var _this = this;
    _this.storage.get('userinfo').then(function (info) {
      var jsoninfo = JSON.parse(info);
      var touserid = [];
      if (_this.selectusers) {
        for (var user in _this.selectusers) {
          if(_this.selectusers[user]) {
            var items = user.split("@");
            touserid.push(items[0]);
          }
        }
      }
      var jsonParams = [
        {key: 'userid', value: jsoninfo.userid},
        {key: 'moduleid', value: _this.detailinfo.detailparam.moduleid},
        {key: 'appid', value: _this.detailinfo.detailparam.appid},
        {key: 'touserid', value: touserid},
        {key: 'toreadmsg', value: _this.options},
        {key: 'qybm', value: _this.config.getValue('global_qybm')},
        {key: 'xmbm', value: _this.config.getValue('global_xmbm')}
      ];

      var dotosubmiturl = _this.config.getValue('global_url') + _this.config.getValue('toread_action');
      _this.postrequest.prequest(jsonParams, dotosubmiturl, function (data) {
        if (data.header.code == 1 && data.result.success == 1) {
          _this.presentAlert({subTitle : '传阅成功~是否转为已阅状态',buttons : [{text : 'OK',handler:()=>{
            _this.navcontroller.push(ToReadPage , {module_id :_this.detailinfo.detailparam.moduleid});          //跳转回list页面
          }}]});
        } else {
          _this.presentAlert({subTitle : '传阅失败~请重试',buttons :['ok']});
        }
      });
    });
  }
  presentAlert (initalert) {
    let alert = Alert.create(initalert);
    this.navcontroller.present(alert);
  }
}

