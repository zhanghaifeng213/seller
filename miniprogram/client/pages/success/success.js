const app = getApp();

Page({
  data: {},
  toHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})
