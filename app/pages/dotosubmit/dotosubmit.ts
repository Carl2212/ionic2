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
import {CommonComponent} from "../common";
import {Storage,SqlStorage} from "ionic-angular/index";
import {KeysPipe,KeyToParamsPipe,NullToFalse} from "../base64pipe";
import {isArray} from "rxjs/util/isArray";
import {ToReadPage} from "../toread/toread";
import {OptionsComponent} from "../options/options";

@Component({
  templateUrl : 'build/pages/dotosubmit/dotosubmit.html',
  providers : [CommonComponent,ConfigComponent,PostRequest,OptionsComponent],
  pipes : [KeysPipe,KeyToParamsPipe,NullToFalse]
})

export class DoToSubmitPage {
  private commonfn:any;
  private postrequest:any;
  private config:any;
  public pageparam:any;
  public nextselect:any;
  public selectitems:any;
  private addressType:string = '0';//'0' or 'C'
  public selectusers: any = [];
  public sureselect:any = false;
  private storage:any;
  public options:any;
  private detailinfo:any;
  private openitems:any;
  public isnull : boolean = true;
  private toreadcheckbox : any;
  private nextcheckbox : any = [];
  private cdr : any;
  private navcontroller : any;

  constructor(navParams:NavParams, navcontroller : NavController ,commonfn:CommonComponent, postrequest:PostRequest, config:ConfigComponent , cdr: ChangeDetectorRef) {
    this.pageparam = navParams.get('nextparam');
    this.detailinfo = navParams.get('detailinfo');
    this.commonfn = commonfn;
    this.storage = new Storage(SqlStorage);
    this.postrequest = postrequest;
    this.config = config;
    this.cdr = cdr;
    this.navcontroller = navcontroller;
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
      console.log(jsonParams);
      var dotosubmiturl = _this.config.getValue('global_url') + _this.config.getValue('toread_action');
      _this.postrequest.prequest(jsonParams, dotosubmiturl, function (data) {
        if (data.header.code == 1 && data.result.success == 1) {
          alert('传阅成功~<br>是否转为已读状态？');
          //跳转回list页面
          _this.navcontroller.push(ToReadPage , {module_id :_this.detailinfo.detailparam.moduleid});
        } else {
          alert('传阅失败!<br>请重试');
        }
      });
    });
  }
  /*********************************************
   * 展开部门通讯录
   * input : none
   *********************************************/
  selectitemsfn() {
    //获取部门通讯录
    var _this = this;
    this.commonfn.getGroupOrUserList(1, 0, this.addressType, function (data) {
      _this.selectitems = data;
      _this.openitems = true;
    });
    if(!this.toreadcheckbox) {
      this.nextcheckbox = [];
      this.selectusers = [];
      this.isnull = true;
    }
  }
  /*********************************************
   * 下一个选择框
   * input : aa userid
   *         istoggle 是否切换
   *         callback 回调
   *********************************************/
  nextselectfn(aa:string,istoggle : boolean,callback : any) {
    if(!callback && istoggle) {
      callback = istoggle;
      istoggle = undefined;
    }
    if(istoggle == undefined) {
      istoggle = true;
    }
    var _this = this;
    this.commonfn.getGroupOrUserList(2, aa, this.addressType, function (tmpdata) {
      if (_this.nextselect == undefined) {
        var tmp = {};
        tmp[aa] = tmpdata;
        _this.nextselect = tmp;
      } else if (!_this.nextselect[aa]) {
        _this.nextselect[aa] = tmpdata;
      }
      if(istoggle) {
        _this.nextselect[aa]['isopen'] = !_this.nextselect[aa]['isopen'];
      }else{
        _this.nextselect[aa]['isopen'] =  true;
      }
      callback && callback();
    });
  }
  /*********************************************
   * 确定按钮【控制选项框与内容框的切换】
   * input : none
   *********************************************/
  sureselectfn() {
    if (this.selectusers) {
      this.openitems = false;
    }
  }

  /*********************************************
   * 删除最终选择项
   * input : key
   *********************************************/
  del(key:string) {
    this.selectusers[key] = false;
    var close = true;
    for(var i in this.selectusers) {
      if(this.selectusers[i]) close = false;
    }
    if(close) {
      this.nextcheckbox = [];
      this.selectusers = [];
      this.isnull = true;
      this.toreadcheckbox = false;
    }
  }
  /*********************************************
   * 监控变量selectusers改变时，判断selectusers是否为空是否都为false
   * input : none
   *********************************************/
  selusers() {
    if(!this.selectusers || this.isEmptyObject(this.selectusers)) {
      this.isnull = true;
      this.toreadcheckbox = false;
    }else{
      for(var i in this.selectusers) {
        if(this.selectusers[i]) {
          this.isnull = false;
          this.cdr.detectChanges();
          return;
        }
      }
      this.isnull = true;
      this.toreadcheckbox = false;
    }
  }
  /*********************************************
   * 判断对象是否为空
   * input : obj 对象
   *********************************************/
  isEmptyObject(obj) {
    for(var i in obj) {
      return false;
    }
    return true;
  }
  /*********************************************
   * 二级父checkbox选择框
   * input : aa userid e  boolean 选择项的值
   *********************************************/
  selectall(aa : string,e : any) {
    var _this = this;
    this.nextselectfn(aa,false,function() {
      _this.ChooseallOrnot(e,_this.nextselect[aa]);
    });
  }
  /*********************************************
   * 全选以及全不选
   * input :  e  boolean 选择项的值 tmpdata 子部门数据
   *********************************************/
  ChooseallOrnot(e,tmpdata) {
    if(e) {
      //全选
      for(let t of tmpdata) {
        this.selectusers[t.userid+'@'+t.username] = true;
      }
    }else{
      //全不选
      for(let t of tmpdata) {
        this.selectusers[t.userid + '@' + t.username] = false;
      }
    }
    this.selusers();
  }
}

