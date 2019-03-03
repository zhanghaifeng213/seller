import apis from '../../modules/api'
const app = getApp();

Page({
  data: {
    categoryList: [],
    menuList: [],
    currentCategory: {}, // 当前选择的分类
    currentIndex: 0,
    cartNum: 0,
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
        this.selectCategory(0, list[0]);
      }
    });
  },
  // 选择分类
  selCatetory(event) {
    const {
      index,
      item
    } = event.currentTarget.dataset;
    this.selectCategory(index, item);
  },
  // 切换分类
  selectCategory(index, item) {
    this.setData({
      currentCategory: item,
      currentIndex: index
    });
    if (this.data.menuList[index] && this.data.menuList[index].length !== 0) return;
    this.getDishedByCid(item.id).then(mList => {
      this.setData({
        [`menuList[${index}]`]: mList.map(i => {
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
    const {
      item,
      type
    } = event.target.dataset;
    // console.log(item);

    let isExist = false;
    this.data.carts.forEach(c => {
      if (c.id === item.id) {
        isExist = true;
        if (type === 'sub' && c.count > 0) {
           c.count--;
           item.count = c.count;
        } else if (type === 'add') {
          c.count++;
          item.count = c.count;
        }
      }
    })

    if (!isExist) {
      item.count = 1;
      this.data.carts.push(item);
    }

    this.setData({
      carts: this.data.carts.filter(cart => cart.count > 0),
      [`menuList[${item.cindex}].[${item.mindex}].count`]: item.count
    })
    this.calcCartNum();
  },
  calcCartNum() {
    let sum = 0;
    this.data.carts.forEach(c => {
      sum += c.count;
    })
    this.setData({
      cartNum: sum
    })
  },

  // 确定下单
  suborder() {
    const postData = {
      tableNum: this.option.id,
      list: this.data.carts.map(cart => {
        return {
          menuItem: cart.id,
          count: cart.count
        }
      })
    }

    wx.fetch({
      url: apis.suborder,
      data: postData,
      method: 'POST'
    }).then(res => {
      console.log(res);
      if (+res.code === 1) {
        wx.navigateTo({
          url: '/pages/success/success'
        })
      }
      return null;
    })
  }
})