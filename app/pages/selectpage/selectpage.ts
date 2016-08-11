/**
 * Created by Deng on 2016/8/11.
 */
import {Component , Input , Output ,EventEmitter} from '@angular/core';
import {CommonComponent} from "../common";

@Component({
  selector : 'my-select',
  templateUrl : 'build/pages/selectpage/selectpage.html',
  inputs : ['selectitems','selectusers']
})

export class SelectPage {
  private commonfn:any;
  private addressType:string = '0';//'0' or 'C'
  public nextselect:any =[];
  public nextcheckbox :any=[];
  @Input() selectusers: any;
  @Input() selectitems : any;
  @Output() onSelect = new EventEmitter<any>();
  constructor(commonfn : CommonComponent) {
    this.commonfn = commonfn;
  }


  /*********************************************
   * 下一个选择框
   * input : aa userid
   *         istoggle 是否切换
   *         callback 回调
   *********************************************/
  nextselectfn(aa:string,istoggle : boolean,callback : any) {
    if(!callback && istoggle) {
      callback = istoggle;
      istoggle = undefined;
    }
    if(istoggle == undefined) {
      istoggle = true;
    }
    var _this = this;
    this.commonfn.getGroupOrUserList(2, aa, this.addressType, function (tmpdata) {
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
