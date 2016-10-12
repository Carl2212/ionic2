/**
 * Created by Administrator on 2016/9/23.
 * 辅助组件 helper
 */

import {TxlPage} from '../txl/txl';
import {NoticeListPage} from '../notice/noticelist';
import {DocSearchPage} from '../docsearch/docsearch';
import {ToDoPage} from '../todo/todo';
import {CordovaPage} from '../cordova/cordova';
import {ToReadPage} from '../toread/toread';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {LoginPage} from '../login/login';
import {Injectable} from '@angular/core';

@Injectable()
export class helper{

  constructor() {

  }
  getpages() {
    let pages= [
      { title: 'Hello Ionic111', component: HelloIonicPage ,params :{}},
      { title: '通讯录', component: TxlPage ,params :{}},
      { title:'待阅', component : ToReadPage ,params : {doctype : 'toread'}},
      { title:'查文', component : DocSearchPage ,params : {}},
      { title:'待办', component : ToReadPage,params :{doctype : 'todo'}},
      { title:'公告通知', component : NoticeListPage ,params :{}},
      { title:'测试cordova', component : CordovaPage ,params :{}},
    ];
    return pages;
  }
}

