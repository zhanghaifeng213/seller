import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    panal: [{
        url: './user',
        text: '用户管理',
        img: '../../images/list.png'
      },
      {
        url: './category',
        text: '分类管理',
        img: '../../images/list.png'
      },
      {
        url: './menu',
        text: '菜品管理',
        img: '../../images/list.png'
      }
    ]
  },
  onLoad() {
    try {
      const value = wx.getStorageSync('token');
      if (!value) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    } catch (e) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  // 跳转
  navigateTo(event) {
    const {
      url
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url
    })
  },
  // 退出登录
  logout() {
    try {
      wx.clearStorageSync();
      wx.showToast({
        title: '退出成功'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000);
    } catch (e) {
      wx.showToast({
        title: '退出失败',
        icon: 'none'
      })
    }
  }
})