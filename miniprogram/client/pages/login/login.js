import apis from "../../modules/api";

const app = getApp();

Page({
  data: {
    type: 'login', // login | reg
    isAgree: true,
  },
  onLoad(options) {
    let { pageback } = options;
    if (pageback) this.pageback = decodeURIComponent(pageback);

    this.username = '';
    this.pwd = '';
  },
  bindInput(event) {
    const {
      type
    } = event.currentTarget.dataset;
    let {
      value
    } = event.detail;
    value = value.trim();

    if (type === 'name') {
      this.username = value;
    } else if (type === 'pwd') {
      this.pwd = value;
    }
  },
  // 登录
  login() {
    const {
      username,
      pwd
    } = this;
    if (!username || !pwd) {
      return wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none'
      })
    }
    wx.fetch({
      url: apis.login,
      method: 'POST',
      data: {
        username,
        password: pwd
      }
    }).then(data => {
      const {
        code
      } = data;
      if (+code === 1) {
        try {
          wx.setStorageSync('token', data.data || data.token);
          wx.showToast({
            title: '登录成功'
          })
          wx.redirectTo({
            url: this.pageback ? this.pageback : '/pages/admin/center'
          })
        } catch (e) {
          console.error('存储异常');
        }
      } else {
        wx.showToast({
          title: data.msg || data.errMsg,
          icon: 'none'
        })
      }
    })
  },
  // 同意条款
  bindAgreeChange() {
    this.setData({
      isAgree: !this.data.isAgree
    })
  }
})