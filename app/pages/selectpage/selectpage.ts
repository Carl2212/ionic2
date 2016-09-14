/**
 * Created by Deng on 2016/8/11.
 */
import {Component , Input , Output ,EventEmitter , ChangeDetectorRef} from '@angular/core';
import {CommonComponent} from "../common";
import {NgSwitch ,NgSwitchCase , NgSwitchDefault } from '@angular/common';
import {KeysPipe,KeyToParamsPipe,NullToFalse} from "../base64pipe";

@Component({
  selector : 'my-select',
  templateUrl : 'build/pages/selectpage/selectpage.html',
  directives : [NgSwitch ,NgSwitchCase , NgSwitchDefault ],
  pipes : [KeysPipe,KeyToParamsPipe,NullToFalse],
  inputs : ['selectitems','selectusers','departmentparam','multiuser']
})

export class SelectPage {
  private commonfn:any;
  private addressType:string = '0';//'0' or 'C'
  public nextselect:any =[];
  public nextcheckbox :any=[];
  private selectradio : string;
  private cdr : any;
  @Input() selectusers: any;
  @Input() selectitems : any;
  @Input() departmentparam : any;
  @Input() multiuser : any;
  @Output() onSelect = new EventEmitter<any>();

  constructor(commonfn : CommonComponent ,cdr: ChangeDetectorRef) {
    this.commonfn = commonfn;
    this.cdr = cdr;
  }


  /*********************************************
   * 下一个选择框
   * input : aa userid
   *         istoggle 是否切换
   *         callback 回调
   *********************************************/
  nextselectfn(aa:string,istoggle : boolean,callback : any) {
    this.cdr.detectChanges();
    if(!callback && istoggle) {
      callback = istoggle;
      istoggle = undefined;
    }
    if(istoggle == undefined) {
      istoggle = true;
    }
    var type : number ;
    var parent : any;
    if(this.departmentparam) {
      type = 4;
      parent = this.departmentparam;
    }else{
      type = 2;
      parent = aa;
    }
    var _this = this;
    this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (tmpdata) {
      if (_this.nextselect == undefined) {
        var tmp = {};
        tmp[aa] = tmpdata;
        _this.nextselect = tmp;
      } else if (!_this.nextselect[aa]) {
        _this.nextselect[aa] = tmpdata;
      }
      if(istoggle) {
        _this.nextselect[aa]['isopen'] = !_this.nextselect[aa]['isopen'];
      }else{
        _this.nextselect[aa]['isopen'] =  true;
      }
      callback && callback();
    });
  }
  /*********************************************
   * 确定按钮【控制选项框与内容框的切换】
   * input : none
   *********************************************/
  sureselectfn() {
    if(this.selectradio) {
      this.selectusers[this.selectradio] = true;
    }
    console.log(this.selectusers);
    this.onSelect.emit(this.selectusers);
  }

  /*********************************************
   * 二级父checkbox选择框
   * input : aa userid e  boolean 选择项的值
   *********************************************/
  selectall(aa : string,e : any) {
    var _this = this;
    this.nextselectfn(aa,false,function() {
      _this.ChooseallOrnot(e,_this.nextselect[aa]);
    });
  }
  /*********************************************
   * 全选以及全不选
   * input :  e  boolean 选择项的值 tmpdata 子部门数据
   *********************************************/
  ChooseallOrnot(e,tmpdata) {
    if(e) {
      //全选
      for(let t of tmpdata) {
        this.selectusers[t.userid+'@'+t.username] = true;
      }
    }else{
      //全不选
      for(let t of tmpdata) {
        this.selectusers[t.userid + '@' + t.username] = false;
      }
    }
    //this.selusers();
  }
}
