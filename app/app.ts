import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {TxlPage} from './pages/txl/txl';
import {NoticeListPage} from './pages/notice/noticelist';
import {DocSearchPage} from './pages/docsearch/docsearch';
import {ToDoPage} from './pages/todo/todo';
import {ToReadPage} from './pages/toread/toread';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic111', component: HelloIonicPage },
      { title: '通讯录', component: TxlPage },
      { title:'待阅', component : ToReadPage},
      { title:'查文', component : DocSearchPage},
      { title:'待办', component : ToDoPage},
      { title:'公告通知', component : NoticeListPage},
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
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
