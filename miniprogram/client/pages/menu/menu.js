import apis from '../../modules/api'
const app = getApp();

Page({
  data: {
    categoryList: [],
    menuList: [],
    currentCategory: {}, // 当前选择的分类

    carts: []
  },
  onLoad(option) {
    const {
      id,
      num
    } = option;
    this.option = option;
    wx.setNavigationBarTitle({ title: `${num}桌`});
    this.getCatogory().then(list => {
      if (list && list.length > 0) {
        this.selectCategory(list[0]);
      }
    });
  },
  // 选择分类
  selCatetory(event) {
    const {
      item
    } = event.currentTarget.dataset;
    this.selectCategory(item);
  },
  // 切换分类
  selectCategory(item) {
    this.setData({
      currentCategory: item
    });
    this.getDishedByCid(item.id).then(mList => {
      this.setData({
        menuList: mList.map(i => {
          i.count = 0;
          i.id = i._id;
          return i;
        })
      })
    })
  },
  // 获取分类列表
  getCatogory() {
    return wx.fetch({
      url: apis.categoryList
    }).then(res => {
      const {
        code,
        data
      } = res;
      if (+code === 1) {
        this.setData({
          categoryList: data.list ? data.list : []
        })
        return this.data.categoryList;
      }
    })
  },
  // 根据分类获取菜品
  getDishedByCid(cid) {
    return wx.fetch({
      url: apis.getListByCid,
      data: {
        cid,
        pageNum: 1,
        pageSize: 100
      }
    }).then(res => {
      if (+res.code === 1) {
        return res.data.list;
      }
      return null;
    })
  },

  // 加入购物车
  numOperate(event) {
  //   const {
  //     item,
  //     type
  //   } = event.target.dataset;

  //   let isExist = false;
  //   let count = 0;
  //   this.data.carts.forEach(element => {
  //     if (element.id === item.id) {
  //       isExist = true;
  //       if (type === 'sub') {
  //         element.count--;
  //       } else if (type === 'add') {
  //         element.count++;
  //       }
  //     }
  //     count = element.count;
  //   });
  //   if (!isExist) {
  //     item.count = 1;
  //     count = item.count;
  //     this.data.carts.push(item);
  //   }
  //   console.log(item.index, count);
  //   this.setData({
  //     carts: this.data.carts,
  //     [`menuList[${item.index}].count`]: count
  //   })
  }
})