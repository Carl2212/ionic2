/**
 * Created by Administrator on 2016/9/20.
 */
import {Directive ,Renderer, ElementRef} from '@angular/core';
import {Keyboard} from 'ionic-native';

@Directive({
  selector : '[focuser]'
})
export class Focuser {

  constructor(
    private renderder : Renderer,
    private eleref : ElementRef
  ){}
  ngAfterViewInit() {
      const element = this.eleref.nativeElement.querySelector('input');
    console.log(element);
    setTimeout(()=>{
      this.renderder.invokeElementMethod(element,'focus',[]);
      Keyboard.show();
    },300);
  }
}
