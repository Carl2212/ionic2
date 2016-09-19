/**
 * Created by Deng on 2016/7/27.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";
import {PostRequest} from '../postrequest';
import {CommonComponent} from "../common";
import {Storage,SqlStorage} from "ionic-angular/index";
import {isArray} from "rxjs/util/isArray";
import {Base64pipe} from "../base64pipe";
import {DetailPage} from "../item-details/detail";

@Component({
  templateUrl : 'build/pages/toread/toread.html',
  providers : [CommonComponent,ConfigComponent,PostRequest],
  pipes : [Base64pipe]
})

export class ToReadPage {
  private navCtrl : any;
  private consttype : string;
  private pagesize : number = 8;
  private listinfo : any;
  private commonfn : any;
  private postrequest : any;
  private storage : any;
  private config : any;
  public doclist : any;
  public selecteditem : boolean = false;
  private listpage : any;
  private text : string;
  constructor(navCtrl : NavController , navParams : NavParams , commonfn : CommonComponent , postrequest : PostRequest , config : ConfigComponent) {
    this.navCtrl=navCtrl;
    this.storage = new Storage(SqlStorage);
    this.postrequest = postrequest;
    this.commonfn = commonfn;
    this.config = config;

    this.consttype = navParams.get('doctype');
    this.listpage = navParams.get('module_id');
    if(this.listpage) {
      //二级列表页
      this.openlist(this.listpage,1);
    }else{
      this.listinfo = navParams.get('item');
      if(!this.listinfo) {
        let _this = this;
        _this.commonfn.gotCount(_this.consttype,function(count,modulelist){
          _this.listinfo = modulelist;
        });
      }
    }
  }
  //点击进入
  nextlist(module) {
    this.navCtrl.push(ToReadPage,{module_id : module, doctype : this.consttype });
  }
  //进入列表页
  openlist(module,pageindex){
    if(!module) return;
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
        {key : 'doctype' , value : _this.consttype},
        {key : 'moduleid' , value : module},
        {key : 'pageindex' , value : pageindex},
        {key : 'pagesize' , value : _this.pagesize}
      ];
      let doclisturl = _this.config.getValue('global_url') + _this.config.getValue('doclist_action');
      _this.postrequest.prequest(jsonParams,doclisturl,function(data){
        if(data.header.code == 1 && data.result.success == 1 && isArray(data.result.doclist)) {
          _this.doclist = _this.ParamsToJson(data.result.doclist);
          _this.selecteditem = true;
        }
      });
    });
  }
  //数据转化
  ParamsToJson(params) {
    if(!params || (isArray(params) && params.length <= 0)) return params;
    let jdata = [];
    for (var param of params ) {
      var view ={};
      for(var it of param.view) {
        view[it.name] = it.text;
      }
      var detailparam = {};
      for(var it of param.detailparam) {
        detailparam[it.name] = it.text;
      }
      jdata.push({view :view , detailparam :detailparam });
    }
    return jdata;
  }
  updo() {
    this.selecteditem = false;
  }
  opendetail(detail) {
    this.navCtrl.push(DetailPage,{doc:detail,doctype : this.consttype});
  }
}
