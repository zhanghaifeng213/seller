import apis from '../../modules/api'
const app = getApp();

Page({
  data: {
    pagename: 'about',
    weuiImageUrl: 'https://user-images.githubusercontent.com/2395166/29502325-ada080f6-8661-11e7-94c2-23d638210f45.jpg'
  },
  onLoad(option) {
    const { id } = option;
    console.log(id);
    this.getCategoryList();
  },
  // 获取分类
  getCategoryList() {
    wx.fetch({
      url: apis.categoryList
    }).then(data => {
      console.log(data);
    })
  }
})
