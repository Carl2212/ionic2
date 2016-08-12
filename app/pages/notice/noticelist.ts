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

@Component({
  templateUrl : 'build/pages/notice/noticelist.html',
  providers : [ConfigComponent,PostRequest,CommonComponent],
})

export class NoticeListPage {
  private navCtrl :any;
  private navParams :any;
  private postrequest :any;
  private config :any;
  private storage : any;
  private commonfn :any;
  public doclist : any;
  public isdetail : boolean = false;
  private docdetail : any;

  constructor(navCtrl : NavController , navParams : NavParams , postrequest : PostRequest , config : ConfigComponent , commonfn : CommonComponent) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.postrequest = postrequest;
    this.config = config;
    this.storage = new Storage(SqlStorage);
    this.commonfn = commonfn;
    this.Initpage('PublishInfo',1);
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
          console.log(_this.doclist);
        }
      });
    });
  }
  opendetail(doc) {
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
          console.log(_this.docdetail);
        }
      });
    });

  }
  updo() {
    this.isdetail = false;
  }
}
