/**
 * Created by Administrator on 2016/9/18.
 */
import {Component} from '@angular/core';
import {ViewController} from "ionic-angular/index";

@Component({
  template : '<div class="ld-modal"><img class="loading" src="images/loading.gif"></div>',
})

export class Loading {
  private viewCtrl;
  constructor(viewCtrl: ViewController) {
    this.viewCtrl = viewCtrl;
    //this.dismiss();
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
