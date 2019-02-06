import apis from '../../modules/api'

Page({
  data: {
    tables: [],
    tableIndex: 0,

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
    const {
      num
    } = option;
    if (num) {
      wx.navigateTo({
        url: `/pages/menu/menu?id=${num}`
      })
    }

    this.getTableNums();
  },
  onShow() {},
  viewInfo: function (e) {
    const {
      url
    } = e.currentTarget.dataset.item;
    if (url) wx.navigateTo({
      url
    });
  },
  bindTableChange(event) {
    this.setData({
      tableIndex: event.detail.value
    });
  },
  getTableNums() {
    wx.fetch({
      url: apis.getTableList,
    }).then(res => {
      if (+res.code === 1) {
        this.setData({
          tables: res.data.list
        })
      }
    })
  },
  // 选择桌号去点单
  selectNumber() {
    const { _id, num } = this.data.tables[this.data.tableIndex];
    wx.navigateTo({
      url: `/pages/menu/menu?id=${_id}&num=${num}`
    })
  },
  // 管理员登录
  adminLogin() {
    wx.showModal({
      title: '温馨提示',
      content: `此功能仅对管理员开放，是否继续?`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/admin/center'
          })
        } else if (res.cancel) {}
      }
    })
  }
});