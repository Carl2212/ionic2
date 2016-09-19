/**
 * Created by Deng on 2016/7/28.
 */
export class ConfigComponent {
  private Config : any = {
    pagesize : 8,
    global_qybm: 'AYY',
    global_xmbm: 'AYYOA',
    author_check: false,
    global_url: 'http://14.146.228.41:61002/ms',
    current_user_action: '/wx/user',
    login_action: '/wap/execute?cmd=wxlogin&command=wxlogin',
    login_khd_action: '/wap/execute?cmd=login&command=login',
    modulelist_action: '/wap/execute?cmd=modulelist&command=modulelist',

    //文档列表页获取，详情获取
    doclist_action: '/wap/execute?cmd=doclist&command=doclist',
    docdetail_action: '/wap/execute?cmd=docdetail&command=docdetail',

    //流程项 包括常用意见
    nextroute_action: '/wap/execute?cmd=nextroute&command=nextroute',
    nextroute_group_action:'/wap/execute?cmd=nextroute_group&command=nextroute_group',
    nextroute_user_action: '/wap/execute?cmd=nextroute_user&command=nextroute_user',

    //通讯录组别-用户查询
    grouplist_action:'/wap/execute?cmd=grouplist&command=grouplist',
    userlist_action:'/wap/execute?cmd=userlist&command=userlist',

    //传阅提交
    toread_action:'/wap/execute?cmd=toread&command=toread',

    //通知-列表数据以及详情数据
    noticelist_action:'/wap/execute?cmd=noticelist&command=noticelist',
    noticedetail_action:'/wap/execute?cmd=noticedetail&command=noticedetail',



  };
  constructor() {
  }
  getValue(key) : string{
      return this.Config[key];
  }
}


