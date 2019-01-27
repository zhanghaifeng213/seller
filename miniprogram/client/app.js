// app.js
import util from './modules/util';
import Fetch from './modules/fetch';

const myFetch = new Fetch({
  getUserAuthorizationHeader() {
    return {
      'Authorization': `Bearer ${wx.getStorageSync('token')}`
    }
  },
  processHttpStatusCode(httpStatusCode) {
    // 状态码统一处理
    if (httpStatusCode === 200) {
      return true;
    } else {
      wx.showToast({
        title: '服务器错误',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
  },
  processResultHandle(res) {
    // 请求结果统一处理
    return true;
  }
})

wx.util = util;
wx.fetch = myFetch.fetch.bind(myFetch);

App({
  onLaunch: function () {},
  onShow(options) {},
  globalData: {}
})