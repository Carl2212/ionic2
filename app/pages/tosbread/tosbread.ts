/**
 * Created by Deng on 2016/8/10.
 */
import {Component , ChangeDetectorRef ,Input,Output , EventEmitter  } from '@angular/core';
import {NgSwitch ,NgSwitchCase , NgSwitchDefault } from '@angular/common';
import {SelectPage} from "../selectpage/selectpage";
import {KeysPipe,KeyToParamsPipe,NullToFalse} from "../base64pipe";
import {CommonComponent} from "../common";
import {isEmpty} from "rxjs/operator/isEmpty";


@Component({
  selector : 'tosbread-com',
  templateUrl : 'build/pages/tosbread/tosbread.html',
  directives : [SelectPage ,NgSwitch ,NgSwitchCase , NgSwitchDefault ],
  providers : [CommonComponent],
  pipes : [KeysPipe,KeyToParamsPipe,NullToFalse],
  inputs : ['defaultuser','departmentparam','item'],
})

export class ToSbReadComponent {
  public isnull : boolean = true;
  private toreadcheckbox : boolean = false;
  private openitems:any = false;
  private nextcheckbox : any = [];
  private addressType:string = '0';//'0' or 'C'
  public selectitems:any;
  private commonfn:any;
  public selectusers: any = {};
  private cdr : any;
  @Input() defaultuser : any;
  @Input() departmentparam : any;
  @Input() item : any;
  @Output() onToSbRead = new EventEmitter<any>();

  constructor(commonfn : CommonComponent ,cdr: ChangeDetectorRef) {
    this.commonfn = commonfn;
    this.cdr = cdr;
  }
  onSelect(event) {
    this.selectusers =event;
    console.log(this.selectusers);
    if(!this.selectusers || this.commonfn.isEmptyObject(this.selectusers)) {
      this.isnull = true;
      console.log(this.isnull);
    }
    this.openitems = false;
    this.selusers();
    this.onToSbRead.emit(event);
  }
  /*********************************************
   * 展开部门通讯录
   * input : none
   *********************************************/
  selectitemsfn() {
    if(this.item && (this.item.ispointtoend == 'S' || this.item.ispointtoend == 'Y' )) {
      //最后一步
      return ;
    }else if(this.defaultuser) {
      var tmp = {};
      for(var duser of this.defaultuser) {
        tmp[duser.userid+'@'+ duser.username]= true;
      }
      this.selectusers = tmp;
      this.isnull = false;
      this.cdr.detectChanges();
      return ;
    }
    var _this = this;
    var type : number;
    var parent : any;
    if(!_this.item) {
      type = 1;
      parent = 0;
    }else if(_this.item.isdefaultroute){
      type = 3;
      parent = _this.departmentparam;
    }
    this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (data) {
      _this.selectitems = data;
      _this.openitems = true;
    });
    if(this.item && this.item.multiuser != 0 && !this.toreadcheckbox) {
      this.nextcheckbox = [];
      this.selectusers = {};
      this.isnull = true;
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
      this.selectusers = {};
      this.isnull = true;
      this.toreadcheckbox = false;
      this.cdr.detectChanges();
      console.log('isnull',this.isnull);
    }
    console.log('notnull');
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
}
