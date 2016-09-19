/**
 * Created by Administrator on 2016/9/19.
 * 登录模态框
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PostRequest} from '../postrequest';
import {ConfigComponent} from '../config';
import {ViewController} from "ionic-angular/index";
import {Keyboard} from 'ionic-native';


@Component({
  templateUrl : "build/pages/login/login.html",
  providers : [PostRequest,ConfigComponent]
})
export class LoginPage {
  username;
  password;
  private nav;
  private prequest;
  private config;
  private vctrl;
  constructor(nav : NavController,prequest : PostRequest ,config : ConfigComponent,vctrl : ViewController) {
    this.nav = nav;
    this.prequest = prequest;
    this.config = config;
    this.vctrl = vctrl;
  }
  ngOninit() {
    Keyboard.show();
  }
  dologin() {
    console.log(this.username,this.password);
    let params = {username : this.username , password : this.password};
    let url = this.config.getValue('global_url') + this.config.getValue('login_khd_action');
    var _me = this;
    this.prequest.prequest(params,url,function(data){
      if(true) {
        console.log(_me.username);
        data = {username : _me.username,isneedwxlogin : true};
        _me.dismiss(data);
      }
    });
  }
  dismiss(data) {
    this.vctrl.dismiss(data);
  }
}
