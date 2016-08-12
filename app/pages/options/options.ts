/**
 * Created by Deng on 2016/8/10.
 */
import {Component,Input ,Output ,EventEmitter ,ViewChild} from '@angular/core';
import {ViewController ,NavController , Alert} from'ionic-angular';

@Component({
  selector : 'my-options',
  templateUrl : 'build/pages/options/options.html',
  inputs : ['myoptions','umopinion','presentAlert' ]
})

export class OptionsComponent {
  @Input() myoptions:any;
  @Input() umopinion : any;
  @Input() presentAlert : any;
  @Output() onoptions = new EventEmitter<any>();
  constructor(private nav : NavController ) {
  }
  alertop($event) {
    this.onoptions.emit($event);
  }
  openumopinion() {
    let alert = Alert.create();
    alert.setTitle('常用意见：请选择');
    for(var um of this.umopinion) {
      alert.addInput({
        type : "radio",
        label :um.text,
        value : um.text,
      });
    }
    alert.addButton({
      text : "OK",
      handler : data=>{
        this.myoptions =data;
      }
    });
    this.nav.present(alert);
  }
}
