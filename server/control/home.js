class Home {
  constructor () {}

  // 欢迎
  welcome(ctx) {
    ctx.body = {
      state: 1,
      message: `欢迎进入xxx系统. 当前时间: ${new Date().toUTCString()}.`
    }
  }

  // 系统信息
  system (ctx) {
    ctx.body = {
      state: 1,
      data: {
        version: '0.0.1',
        sysname: 'xxx系统',
      },
      message: ''
    }
  }
}

module.exports = new Home();

