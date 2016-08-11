/**
 * Created by Deng on 2016/8/5.
 * toread detail page
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";
import {PostRequest} from '../postrequest';
import {CommonComponent} from "../common";
import {Storage,SqlStorage} from "ionic-angular/index";
import {Base64pipe,KeysPipe} from "../base64pipe";
import {DoToSubmitPage} from "../dotosubmit/dotosubmit";

@Component({
  templateUrl : 'build/pages/item-details/detail.html',
  providers : [CommonComponent,ConfigComponent,PostRequest],
  pipes : [Base64pipe,KeysPipe]
})

export class DetailPage {
  public simpleinfo : any;
  public consttype : string;
  public detail : any;
  public process : any;
  public isdetail : boolean = true;
  public isprocess :boolean =false;
  private detailinfo : any;
  private commonfn : any;
  private postrequest : any;
  private config :any;
  private storage : any;
  private navcontrol : any;
  private nextparam : Array<{doctype : string ,operating : string}>
  constructor(navParams : NavParams , navcontrol : NavController , commonfn : CommonComponent , postrequest : PostRequest , config : ConfigComponent) {
    this.detailinfo = navParams.get('doc');
    this.consttype = navParams.get('doctype');
    this.simpleinfo = this.detailinfo.view;
    this.commonfn = commonfn;
    this.postrequest = postrequest;
    this.config = config;
    this.storage = new Storage(SqlStorage);
    this.navcontrol = navcontrol;
    this.getDocDetail();
    this.nextparam = [
      {doctype : 'toread' , operating : '转传阅'},
      {doctype : 'todo' , operating : '审批'}
    ];
  }
  //请求doc详情
  getDocDetail(){
    //获取存储的个人信息数据
    var _this = this;
    _this.storage.get('userinfo').then(function(info){
      let detailurl = _this.config.getValue('global_url') + _this.config.getValue('docdetail_action');
      let jsonParams = [
        {key : 'username' , value : info.username},
        {key : 'qybm',value : _this.config.getValue('global_qybm')},
        {key : 'xmbm',value : _this.config.getValue('global_xmbm')},
        {key : 'userid' , value : info.userid},
        {key : 'doctype' , value : _this.consttype},
        {key : 'moduleid' , value : _this.detailinfo.detailparam.moduleid},
        {key : 'nodeid' , value :_this.detailinfo.detailparam.nodeid},
        {key : 'docid' , value : _this.detailinfo.detailparam.docid},
        {key : 'appid' , value : _this.detailinfo.detailparam.appid},
      ];
      //请求
      _this.postrequest.prequest(jsonParams,detailurl,function(data){
        if(data.header.code == 1 && data.result.success ==1) {
          _this.detail = data.result.detail.item;
          _this.process = data.result.detail.tracelist;
        }
      });
    });

  }

  //传阅（进入dotosubmit）
  sendread() {
    console.log({nextparam : this.nextparam[0],detailinfo : this.detailinfo});
    this.navcontrol.push(DoToSubmitPage,{nextparam : this.nextparam[0],detailinfo : this.detailinfo});
  }
  //提交已阅(只是单纯接口先不做)
  readed() {

  }



  //取待办下一个节点
  nextroute() {

  }
  //提交待办
  submitTodo(){

  }
}

