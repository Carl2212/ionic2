/**
 * Created by Deng on 2016/8/10.
 */
import {Component , ChangeDetectorRef ,Input,Output , EventEmitter } from '@angular/core';
import {SelectPage} from "../selectpage/selectpage";
import {KeysPipe,KeyToParamsPipe,NullToFalse} from "../base64pipe";
import {CommonComponent} from "../common";


@Component({
  selector : 'tosbread-com',
  templateUrl : 'build/pages/tosbread/tosbread.html',
  directives : [SelectPage],
  providers : [CommonComponent],
  pipes : [KeysPipe,KeyToParamsPipe,NullToFalse]
})

export class ToSbReadComponent {
  public isnull : boolean = true;
  private toreadcheckbox : any;
  private openitems:any;
  private nextcheckbox : any = [];
  private addressType:string = '0';//'0' or 'C'
  public selectitems:any;
  private commonfn:any;
  public selectusers: any = [];
  private cdr : any;
  @Input() node : any;
  @Output() onToSbRead = new EventEmitter<any>();
  constructor(commonfn : CommonComponent ,cdr: ChangeDetectorRef) {
    this.commonfn = commonfn;
    this.cdr = cdr;
    console.log(this.node);
  }
  onSelect(event) {
    this.selectusers =event;
    this.openitems = false;
    this.selusers();
    this.onToSbRead.emit(event);
  }
  /*********************************************
   * 展开部门通讯录
   * input : none
   *********************************************/
  selectitemsfn() {
    var _this = this;
    this.commonfn.getGroupOrUserList(1, 0, this.addressType, function (data) {
      _this.selectitems = data;
      _this.openitems = true;
    });
    if(!this.toreadcheckbox) {
      this.nextcheckbox = [];
      this.selectusers = [];
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
      this.selectusers = [];
      this.isnull = true;
      this.toreadcheckbox = false;
    }
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
