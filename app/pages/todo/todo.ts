/**
 * Created by Deng on 2016/7/27.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";
import {PostRequest} from '../postrequest';
import {CommonComponent} from "../common";
import {Badge} from 'ionic-native';

@Component({
  templateUrl : 'build/pages/todo/todo.html',
  providers : [CommonComponent,ConfigComponent,PostRequest]
})

export class ToDoPage {
  private listinfo : any;
  private commonfn : any;
  constructor(navParams : NavParams , commonfn : CommonComponent) {
    this.commonfn = commonfn;
    this.listinfo = navParams.get('item');
    if(!this.listinfo) {
      var _this = this;
      this.commonfn.gotCount('todo',function(count,modulelist){
        _this.listinfo = modulelist;

      });
    }
    //清除app 图标的数量
    Badge.clear();
  }



}
