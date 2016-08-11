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

@Component({
  templateUrl : 'build/pages/dotosubmit/dotosubmit.html',
  providers : [ConfigComponent,PostRequest,Alert],
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
  private alertcmp : any;

  constructor(navParams:NavParams, navcontroller : NavController , postrequest:PostRequest, config:ConfigComponent , cdr: ChangeDetectorRef , alertcmp : Alert) {
    this.pageparam = navParams.get('nextparam');
    this.detailinfo = navParams.get('detailinfo');
    this.navcontroller = navcontroller;
    this.storage = new Storage(SqlStorage);
    this.postrequest = postrequest;
    this.config = config;
    this.alertcmp = alertcmp;
    //this.cdr = cdr;
  }
  /*********************************************
   * 接收子组件的数据方法
   * ajax
   *********************************************/
  onoptions(options) {
    this.options = options;
    //this.cdr.detectChanges();
  }
  onToSbRead(sb) {
    this.selectusers = sb;
    //this.cdr.detectChanges();
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
          _this.presentAlert('传阅成功~','是否转为已读状态？');
          //跳转回list页面
          _this.navcontroller.push(ToReadPage , {module_id :_this.detailinfo.detailparam.moduleid});
        } else {
          _this.presentAlert('传阅失败!','请重试');
        }
      });
    });
  }
  presentAlert (tt,subt) {
    let alert = this.alertcmp.create({
      title : tt,
      subTitle : subt,
      buttons : ['ok']
    });
    alert.present();
  }




}

