import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {TxlPage} from './pages/txl/txl';
import {NoticeListPage} from './pages/notice/noticelist';
import {DocSearchPage} from './pages/docsearch/docsearch';
import {ToDoPage} from './pages/todo/todo';
import {ToReadPage} from './pages/toread/toread';
import {CordovaPage} from './pages/cordova/cordova';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any ,params : any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic111', component: HelloIonicPage ,params :{}},
      { title: '通讯录', component: TxlPage ,params :{}},
      { title:'待阅', component : ToReadPage ,params : {doctype : 'toread'}},
      { title:'查文', component : DocSearchPage ,params : {}},
      { title:'待办', component : ToReadPage,params :{doctype : 'todo'}},
      { title:'公告通知', component : NoticeListPage ,params :{}},
      { title:'测试cordova', component : CordovaPage ,params :{}},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component ,page.params);

  }
}

ionicBootstrap(MyApp);
