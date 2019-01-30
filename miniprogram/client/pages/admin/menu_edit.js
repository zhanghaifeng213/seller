import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    pageType: 'add', // add/edit
    item: {},
    selIndex: 0,
    category: [{
      name: '暂无分类'
    }],
    isSell: true, // 是否上架
  },
  onLoad(options) {
    const {
      item
    } = options;
    if (item) {
      this.setData({
        pageType: 'edit',
        item: JSON.parse(decodeURIComponent(item))
      })
    }
    this.getCatogory();
  },
  // 获取菜品分类列表
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
          category: data.list ? data.list : []
        })

        if (this.data.item && this.data.item.cid) {
          data.list.forEach((l, index) => {
            if (this.data.item.cid === l.id) {
              this.setData({
                selIndex: index
              })
            }
          });
        }
      }
    })
  },
  // 选择类别
  bindchange(event) {
    this.setData({
      selIndex: event.detail.value
    })
  },
  // 内容输入
  inputHandle(event) {
    const {
      field
    } = event.currentTarget.dataset;
    const {
      value
    } = event.detail;
    if (field === 'name') {
      this.setData({
        'item.name': value
      })
    } else if (field === 'price') {
      this.setData({
        'item.price': value
      })
    } else if (field === 'desc') {
      this.setData({
        'item.desc': value
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
  // 添加 or 跟新
  confirmAdd() {
    let {
      name,
      price,
      desc,
      img
    } = this.data.item;
    const selCate = this.data.category[this.data.selIndex];
    if (!name || !name.trim() || !price || !price.trim()) {
      return wx.showToast({
        title: '名称和价格不能为空',
        icon: 'none'
      })
    }

    name = name.trim();
    price = price.trim();
    const fetchData = {
      name,
      desc,
      price,
      cid: selCate.id,
      isSell: this.data.isSell,
      img
    };
    let fethUrl = apis.menuAdd;
    if (this.data.pageType === 'edit') {
      fethUrl = apis.menuUpdate;
      Object.assign(fetchData, {
        id: this.data.item.id
      });
    }

    wx.fetch({
      url: fethUrl,
      method: 'POST',
      data: fetchData
    }).then(res => {
      if (+res.code === 1) {
        wx.navigateBack();
      } else {
        wx.showToast({
          title: `${res.errMsg}`,
          icon: 'none'
        })
      }
    })
  },
  // 删除菜品
  delete() {
    wx.showModal({
      title: '删除菜品提示',
      content: `你确定删除"${this.data.item.name}"分类? 删除后不可恢复,请确认后再删除。`,
      cancelText: '再想想',
      confirmText: '确定删除',
      success: (res) => {
        if (res.confirm) {
          wx.fetch({
            url: apis.menuDelete,
            method: 'POST',
            data: {
              id: this.data.item.id
            }
          }).then(res => {
            if (+res.code === 1) {
              wx.navigateBack();
            } else {
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 菜品图片上传
  uploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apis.imgUplod,
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            if (res.data && (typeof res.data === 'string')) {
              res.data = JSON.parse(res.data);
              if (+res.data.code === 1) {
                this.setData({
                  'item.img': res.data.data.path
                })
              }
            }
          }
        })
      }
    })
  }
})