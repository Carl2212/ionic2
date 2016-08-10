/**
 * Created by Deng on 2016/7/29.
 */
import {Component,Injectable} from '@angular/core';
import {Headers,Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {ParamsJson} from './paramsjson';
import {isArray} from "rxjs/util/isArray";

@Injectable()
export class PostRequest {
  private http ;
  constructor(http : Http) {
    this.http = http;
  }

  private postrequerst(params : ParamsJson , url : string,successfn : any ) : Promise<ParamsJson> {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    var jsondata =this.ParamsToJson(params);
    return this.http.post(url,jsondata,{headers : headers})
      .map(res => res.json())
      .subscribe(
        data => successfn(data),
        err => this.handleError(err),
        () => console.log('Authentication Complete')
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
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  prequest(p,url,callback) {
    this.postrequerst(p,url,callback);
  }
}
