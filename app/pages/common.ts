/**
 * Created by Deng on 2016/8/4.
 */
import {Component,Injectable} from '@angular/core';
import {ParamsJson} from './paramsjson';
import {PostRequest} from "./postrequest";
import {ConfigComponent} from "./config";
import {Storage, SqlStorage} from "ionic-angular/index";
import {isArray} from "rxjs/util/isArray";

@Injectable()
export class CommonComponent {
  private storage;
  private config;
  private postrequest;
  constructor(config : ConfigComponent, postrequest : PostRequest) {
    this.storage = new Storage(SqlStorage);
    this.config = config;
    this.postrequest = postrequest;
  }

  //通用方法之获取通讯录核心方法
  getGroupOrUserList(type,parentid,addressType,callback) {
    //type = 1 为grouplist  2为userlist
    var _this = this;
    this.storage.getJson('userinfo').then(function(info) {
      //数据
      let jsonParams = [
        {key : 'username',value : info.username},
        {key : 'qybm',value : _this.config.getValue('global_qybm')},
        {key : 'xmbm',value : _this.config.getValue('global_xmbm')},
        {key:'type',value : addressType}
      ];
      var gotlisturl = _this.config.getValue('global_url');
      if(type == 1) {
        jsonParams.push({key:'parentid',value : parentid});
        gotlisturl += _this.config.getValue('grouplist_action') ;
      }else{
        jsonParams.push({key:'groupid',value : parentid});
        gotlisturl += _this.config.getValue('userlist_action');
      }
      //请求
      _this.postrequest.prequest(jsonParams,gotlisturl,function(data){
        //回调
        if(data.header.code == 1 && data.result.success == 1) {
          if(type == 1) {
            callback(data.result.grouplist);
          }else{
            callback(_this.ParamsToJson(data.result.userlist));
          }
        }
      });
    });
  }
  ParamsToJson(params) {
    if(!params || (isArray(params) && params.length <= 0)) return [];
    let jdata = [];
    for (var param of params ) {
      var tmp = {};
      for(var item of param) {
        tmp[item.name] = item.text;
      }
      jdata.push(tmp);
    }
    console.log(jdata);
    return jdata;
  }


  //通用方法之列项数量的获取
  gotCount(doctype, callback) {
    var _this = this;
    _this.storage.getJson('userinfo').then((info)=>{
      var jsonParams = [
        {key: 'username', value: info.username},
        {key: 'userid', value: info.userid},
        {key: 'qybm', value: _this.config.getValue('global_qybm')},
        {key: 'xmbm', value: _this.config.getValue('global_xmbm')},
        {key: 'doctype', value: doctype}
      ];
      var gotcounturl = _this.config.getValue('global_url') + _this.config.getValue('modulelist_action');
      _this.postrequest.prequest(jsonParams, gotcounturl, function (data) {
        if (data.header.code == 1) {
          var modulelist = data.result.modulelist;
          var total_count = 0;
          if (modulelist) {
            for (var items of modulelist) {
              total_count += parseInt(items.count);
            }
          }
          callback && callback(total_count, modulelist);
        }
      });
    });
  }
}