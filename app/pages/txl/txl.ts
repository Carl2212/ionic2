/*
* txl 通讯录 这个页面数据页面有3个： 本部门（?state = selfgroup） 常用分组(?state = common) 以及通讯录（默认）
* 子页面 组列页面 用户列页面 用户信息页面
*
* */
import {Component} from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {ConfigComponent} from '../config';
import {ParamsJson} from '../paramsjson';
import {PostRequest} from '../postrequest';
import {Storage, SqlStorage} from "ionic-angular/index";
import {isArray} from "rxjs/util/isArray";
import {CommonComponent} from "../common";

@Component({
  templateUrl: 'build/pages/txl/txl.html',
  providers : [ConfigComponent,PostRequest,CommonComponent]
})
export class TxlPage {
  selectedItem: any;
  selecteduser : any;
  icons: string[];
  items: Array<{groupname:string,groupid:string , hashchild:string,layer :string,order:string,parentid:string}>;
  useritems :Array<{order : string , userid : string , username : string,cnname : string,fullname:string,officephone : string,mobile : string,email : string,groupid : string,groupname : string,orgid :string,orgname:string}>
  private config;
  private username ;
  private addressType : string = '0';//'0' or 'C'
  private postrequest;
  private storage;
  private common ;

  constructor(private navCtrl: NavController, navParams: NavParams , config : ConfigComponent , postrequest : PostRequest , common : CommonComponent) {
    // If we navigated to this page, we will have an item available as a nav param
    this.config = config;
    this.postrequest = postrequest;

    this.storage = new Storage(SqlStorage);
    this.items = [];
    this.useritems = [];
    this.common = common;
    var _this = this;
    this.common.getGroupOrUserList(1,0,this.addressType,function(data) {
      _this.items = data;
    });
  }
  //请求通讯录组


  itemTapped(event, item) {
    this.selectedItem = item;
    var _this = this;
    this.common.getGroupOrUserList(2,item.groupid,this.addressType,function(data) {
      _this.useritems =data;
    });
  }
  updo() {
    this.selectedItem = false;
    this.selecteduser = false;
  }
  userinfo(event, user) {
    this.selecteduser = user;
  }
  closecard() {
    this.selecteduser = false;
  }
}
