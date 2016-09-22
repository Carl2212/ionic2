/**
 * Created by Administrator on 2016/9/19.
 * 登录模态框
 */
import {Component} from '@angular/core';
import {NavController ,MenuController} from 'ionic-angular';
import {PostRequest} from '../postrequest';
import {ConfigComponent} from '../config';
import {ViewController} from "ionic-angular/index";
import {Focuser} from '../directive/focuser';
import {Storage, SqlStorage} from "ionic-angular/index";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

@Component({
  templateUrl : "build/pages/login/login.html",
  providers : [PostRequest,ConfigComponent],
  directives :[Focuser]
})
export class LoginPage {
  username;
  password;
  private nav;
  private prequest;
  private config;
  private vctrl;
  private menu;
  private storage;
  constructor(nav : NavController,prequest : PostRequest ,config : ConfigComponent,vctrl : ViewController ,menu : MenuController) {
    this.nav = nav;
    this.prequest = prequest;
    this.config = config;
    this.vctrl = vctrl;
    this.menu = menu;
    this.menu.swipeEnable(false);
    this.storage = new Storage(SqlStorage);
  }

  dologin() {
    console.log(this.username,this.password);
    let params = {username : this.username , password : this.password};
    let url = this.config.getValue('global_url') + this.config.getValue('login_khd_action');
    var _me = this;
    this.prequest.prequest(params,url,function(data){
      if(true) {
        console.log( _me.username);
        _me.storage.setJson('userinfo',{username : _me.username,userid: data.userid,cnname :data.cnname,isLeader: data.isLeader});
        _me.nav.setRoot(HelloIonicPage);
      }
    });
  }
  //dismiss(data) {
  //  this.menu.swipeEnable(true);
  //  this.vctrl.dismiss(data);
  //}
}
