import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    category: [],
    newCategory: '', // 新添加类别
    isAdding: false, // 是否正在添加

    editItem: null,
    editCategory: '', // 正在编辑内容
    isEditting: false, // 是否正在编辑

  },
  onLoad() {
    this.getCatogory();
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
          category: data.list ? data.list : []
        })
      }
    })
  },
  // 添加
  switchAddState() {
    this.setData({
      isAdding: true
    })
  },
  // 类别输入
  inputCategory(event) {
    const {
      type
    } = event.currentTarget.dataset;
    const {
      value
    } = event.detail;
    if (type === 'add') {
      this.setData({
        newCategory: value
      })
    } else if (type === 'edit') {
      this.setData({
        editCategory: value
      })
    }
  },
  // 确定添加
  confirmAdd() {
    if (!this.data.newCategory) {
      return wx.showToast({
        title: '类别名称不能为空',
        icon: 'none'
      })
    }
    wx.fetch({
      url: apis.categoryAdd,
      method: 'POST',
      data: {
        name: this.data.newCategory
      }
    }).then(res => {
      if (+res.code === 1) {
        this.setData({
          newCategory: '',
          isAdding: false
        })
        this.getCatogory();
        wx.showToast({
          title: '添加成功'
        })
      } else {
        wx.showToast({
          title: res.errMsg || res.msg,
          icon: 'none'
        })
      }
    })
  },

  // 删除 && 编辑
  operate(event) {
    const {
      op,
      item
    } = event.currentTarget.dataset;
    const {
      name,
      id
    } = item;
    if (op === 'del') {
      wx.showModal({
        title: '删除分类提示',
        content: `你确定删除"${name}"分类? 删除后不可恢复,请确认后再删除。`,
        cancelText: '再想想',
        confirmText: '确定删除',
        success: (res) => {
          if (res.confirm) {
            wx.fetch({
              url: apis.categoryDel,
              method: 'POST',
              data: {
                id
              }
            }).then(res => {
              if (+res.code === 1) this.getCatogory();
              else wx.showToast({
                title: res.errMsg || '删除失败',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (op === 'edit') {
      this.setData({
        editItem: item,
        isEditting: true
      })
    }
  },
  // 取消修改
  cancelEdit() {
    this.setData({
      isEditting: false,
      editCategory: '',
      editItem: null
    })
  },
  // 确定修改
  confirmEdit() {
    if (!this.data.editCategory) {
      return wx.showToast({
        title: '类名不能为空',
        icon: 'none'
      })
    }
    wx.fetch({
      url: apis.categoryUpdate,
      method: 'POST',
      data: {
        id: this.data.editItem.id,
        name: this.data.editCategory
      }
    }).then(res => {
      if (+res.code === 1) {
        this.getCatogory();
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
        this.setData({
          isEditting: false,
          editCategory: '',
          editItem: null
        })
      } else {
        wx.showToast({
          title: res.errMsg || res.msg,
          icon: 'none'
        })
      }
    })
  },
  // 取消添加
  cancelAdd() {
    this.setData({
      isAdding: false
    })
  }
})