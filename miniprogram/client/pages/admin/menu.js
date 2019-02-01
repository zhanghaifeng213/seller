import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    menus: [], // 菜单列表
  },
  onShow() {
    this.getMenuList();
  },
  onLoad() {
    // this.setData({
    //   menus: [{
    //     id: '21345y4365',
    //     name: '红烧牛肉面',
    //     price: '28.00',
    //   }]
    // })
  },
  // 获取菜单列表
  getMenuList() {
    wx.fetch({
      url: apis.menuList,
    }).then(res => {
      if (+res.code === 1) {
        this.setData({
          menus: res.data.list
        })
      } else {
        console.log('error');
      }
    })
  },
  // 添加 or 编辑
  toEdit(event) {
    const {
      item
    } = event.currentTarget.dataset;
    let params = '';
    if (item) {
      item.id = item._id;
      params = `?item=${encodeURIComponent(JSON.stringify(item))}`
    }
    wx.navigateTo({
      url: `/pages/admin/menu_edit${params}`
    })
  }
})