import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    panal: [
      { url: '', text: '分类管理' },
      { url: '', text: '菜品管理' },
    ]
  },
  onLoad() {
  },
  // 跳转
  navigateTo(event) {
    const { url } = event.currentTarget.dataset;
    wx.navigateTo({
      url
    })
  }
})