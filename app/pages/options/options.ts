/**
 * Created by Deng on 2016/8/10.
 */
import {Component,Input ,Output ,EventEmitter} from '@angular/core';

@Component({
  selector : 'my-options',
  templateUrl : 'build/pages/options/options.html',
  inputs : ['myoptions']
})

export class OptionsComponent {
  @Input() myoptions:any;
  @Output() onoptions = new EventEmitter<any>();
  public test : number = 1;
  private cdr : any;
  constructor() {
  }
  alertop($event) {
    this.onoptions.emit($event);
  }
}
