function noop() {
  return true;
}

/**
 * 默认处理httpStatusCode函数
 * 200: 返回true
 * @param  {Number} httpStatusCode [http 状态码]
 * @return {Boolean}  [返回是否继续执行]
 */
function defaultProcessHttpStatusCode(httpStatusCode) {
  if (httpStatusCode === 200) {
    return true;
  }
  showError();
  return;
}

class Fetch {
  constructor({
    getUserAuthorizationHeader = () => {},
    processHttpStatusCode = defaultProcessHttpStatusCode,
    processResultHandle = noop,
  }) {
    this.getUserAuthorizationHeader = getUserAuthorizationHeader;
    this.processHttpStatusCode = processHttpStatusCode;
    this.processResultHandle = processResultHandle;
  }

  fetch(opts) {
    let {
      url,
      data = {},
      header = {},
      method = 'GET', // 有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      dataType = 'json',
      responseType = 'text',
      complete = noop,
      noStatus = true, // 默认不显示loading
      mask = false, // 不显示遮罩
      loadingText,
    } = opts;
    const self = this;

    // 显示加载中icon
    if (!noStatus) {
      wx.showLoading({
        title: loadingText || '加载中…',
        mask: mask
      })
    }

    // 请求头设置
    header = Object.assign({}, this.getUserAuthorizationHeader(), header);

    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header,
        method,
        dataType,
        responseType,
        complete,
        success: (res) => {
          if (!noStatus) {
            wx.hideLoading();
          }
          // 请求状态码处理
          const httpStatusCode = res.statusCode;
          if (!self.processHttpStatusCode(httpStatusCode)) {
            return reject();
          }

          // 请求数据过滤(data默认为json格式)
          if (typeof res.data === 'string') {
            try {
              res.data = JSON.parse(res.data);
            } catch (e) {}
          }

          // 统一添加请求处理
          self.processResultHandle(res) ? resolve(res.data) : reject(res.data);
        },
        fail: (res) => {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',
            duration: 1200
          });
          reject(res);
        }
      });
    })
  }
}

export default Fetch;