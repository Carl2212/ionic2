/**
 * Created by Deng on 2016/7/27.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";
import {PostRequest} from '../postrequest';
import {Storage,SqlStorage} from "ionic-angular/index";
import {isArray} from "rxjs/util/isArray";
import {CommonComponent} from "../common";
import { ActionSheet } from 'ionic-native';
import {Badge} from 'ionic-native';

@Component({
  templateUrl : 'build/pages/cordova/cordova.html',
  providers : [ConfigComponent,PostRequest,CommonComponent],
})

export class CordovaPage {
  private navCtrl :any;
  private navParams :any;
  private postrequest :any;
  private config :any;
  private storage : any;
  private commonfn :any;
  public doclist : any;
  public isdetail : boolean = false;
  private docdetail : any;

  private doc : any;

  constructor(navCtrl : NavController , navParams : NavParams , postrequest : PostRequest , config : ConfigComponent , commonfn : CommonComponent) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.postrequest = postrequest;
    this.config = config;
    this.storage = new Storage(SqlStorage);
    this.commonfn = commonfn;
    this.Initpage('PublishInfo',1);
    this.doc = this.navParams.get('docdetail');
    if(this.doc) {
      this.detailpage(this.doc);
    }
    this.inactionsheet();
  }

  inactionsheet() {
    let buttonLabels = ['Share via Facebook', 'Share via Twitter'];
    console.log(ActionSheet);
    ActionSheet.show({
      'title': 'What do you want with this image?',
      'buttonLabels': buttonLabels,
      'addCancelButtonWithLabel': 'Cancel',
      'addDestructiveButtonWithLabel' : 'Delete'
    }).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
    });
    //设置小图标数字
    Badge.increase(1);
  }

    //初始化页面数据
  Initpage(module_id,pageindex){
    if(!pageindex) pageindex = 1;
    //读取存储数据
    let _this = this;
    _this.storage.getJson('userinfo').then(function(info){
      //post参数
      let jsonParams = [
        {key : 'username' , value : info.username},
        {key : 'qybm',value : _this.config.getValue('global_qybm')},
        {key : 'xmbm',value : _this.config.getValue('global_xmbm')},
        {key : 'userid' , value : info.userid},
        {key : 'moduleid' , value : module_id},
        {key : 'pageindex' , value : pageindex},
        {key : 'pagesize' , value : _this.config.getValue('pagesize')}
      ];
      let doclisturl = _this.config.getValue('global_url') + _this.config.getValue('noticelist_action');
      _this.postrequest.prequest(jsonParams,doclisturl,function(data){
        if(data.header.code == 1 && data.result.success == 1) {
          _this.doclist = _this.commonfn.ParamsToJson(data.result.noticelist);
        }
      });
    });
  }
  opendetail(doc) {
    this.navCtrl.push(CordovaPage , {docdetail : doc});
  }
  detailpage(doc) {
    //读取存储数据
    let _this = this;
    _this.storage.getJson('userinfo').then(function(info){
      //post参数
      let jsonParams = [
        {key : 'username' , value : info.username},
        {key : 'qybm',value : _this.config.getValue('global_qybm')},
        {key : 'xmbm',value : _this.config.getValue('global_xmbm')},
        {key : 'userid' , value : info.userid},
        {key : 'moduleid' , value : doc.moduleid},
        {key : 'noticeid' , value : doc.noticeid},

      ];
      let doclisturl = _this.config.getValue('global_url') + _this.config.getValue('noticedetail_action');
      _this.postrequest.prequest(jsonParams,doclisturl,function(data){
        if(data.header.code == 1 && data.result.success == 1) {
          _this.docdetail = data.result.detail.item;
          _this.isdetail = true;
        }
      });
    });

  }
  updo() {
    this.isdetail = false;
  }
}
