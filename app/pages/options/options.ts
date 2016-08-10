/**
 * Created by Deng on 2016/8/10.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigComponent} from "../config";

@Component({
  templateUrl : 'build/pages/item-details/detail.html',
  selector : 'my-options'
})

export class OptionsComponent {

  constructor(navParams:NavParams, navcontrol:NavController) {

  }
}
