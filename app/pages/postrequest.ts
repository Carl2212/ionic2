/**
 * Created by Deng on 2016/7/29.
 */
import {Component,Injectable} from '@angular/core';
import {Headers,Http,URLSearchParams} from '@angular/http';
import {NavController,Modal } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {ParamsJson} from './paramsjson';
import {isArray} from "rxjs/util/isArray";
import {Loading} from "./loading/loading";
import {isUndefined} from "ionic-angular/util";
import {isObject} from "rxjs/util/isObject";
import {isBoolean} from "ionic-angular/util";


@Injectable()
export class PostRequest {
  private http ;
  private nav ;

  constructor(http : Http , nav : NavController ) {
    this.http = http;
    this.nav = nav;

  }

  private postrequerst(params : ParamsJson , url : string,successfn : any ,ismodal : boolean) : Promise<ParamsJson> {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    var jsondata =this.ParamsToJson(params);
    let modal;
    if(ismodal) {
      modal = Modal.create(Loading);
      let view = this.nav.present(modal);
    }

    return this.http.post(url,jsondata,{headers : headers})
      .map(res => res.json())
      .subscribe(
        data =>{ if(ismodal)modal.dismiss();successfn(data)},
        err =>{ if(ismodal)modal.dismiss();this.handleError(err)}
      );
  }
  ParamsToJson(params) {
    if(!params || (isArray(params) && params.length <= 0)) return '';
    let jdata = new URLSearchParams();
    for (var param of params ) {
      jdata.append(param.key,param.value);
    }
    return jdata.toString();
  }
  handleError(error: any) {
    return Promise.reject(error.message || error);
  }
  prequest(p,url,successfn,ismodal) {
    if(isBoolean(successfn) && isUndefined(ismodal)) {
      ismodal = successfn;
      successfn = undefined;
    }
    if(isUndefined(ismodal)) ismodal = true;
    console.log(ismodal);
    this.postrequerst(p,url,successfn,ismodal);
  }
}
