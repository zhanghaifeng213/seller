// import apis from '../../modules/api'

Page({
  data: {
    showCameraAuthLayer: false, // 授权信息
    list: [{
      name: '车品',
      url: '',
      image: 'https://img2.tuhu.org/activity/image/FhDPkqZiVIhIVvEiZaf-EqDpaD69_w750_h230.png',
    }, {
      name: '年终狂欢 爆款直降·单单送礼',
      url: '',
      image: 'https://img2.tuhu.org/activity/image/Fo87vAv-aSgbzo6pneRy-jEYBkzE_w750_h230.png',
    }, {
      name: '年终狂欢 爆款直降·单单送礼',
      url: '',
      image: 'https://img2.tuhu.org/activity/image/119d/4842/2dd9e7743a701a4569137863_w750_h230.jpg',
    }, {
      name: '新年拼一拼',
      url: '',
      image: 'https://img2.tuhu.org/activity/image/FjreLyEbirgoH633pl687aJEl5NN_w750_h230.png',
    }]
  },
  onLoad(option) {
    const { num } = option;
    if(num) {
      wx.navigateTo({
        url: `/pages/menu/menu?id=${num}`
      })
    }
  },
  onShow() {},
  viewInfo: function (e) {
    const { url } = e.currentTarget.dataset.item;
    if (url) wx.navigateTo({ url });
  },
  // 选择桌号去点单
  selectNumber() {
    wx.showActionSheet({
      itemList: ['1号桌'],
      success(res) {
        wx.navigateTo({
          url: `/pages/menu/menu?id=${res.tapIndex}`
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 管理员登录
  adminLogin() {
    wx.navigateTo({
      url: '/pages/admin/center'
    })
  }
});