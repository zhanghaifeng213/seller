const Koa = require('koa');
const static = require('koa-static');
const logger = require('koa-logger');
const body = require('koa-body');
const path = require('path');
const jwt = require('koa-jwt'); // 用于路由权限控制
const errorHandle = require('./middlewares/errorHandle'); //错误处理
const sendHandle = require('./middlewares/sendHandle'); // 数据返回统一处理

const {
  jwtSecret
} = require('./Config/config');

// jwt配置
const jwtConfig = jwt({
  secret: jwtSecret
}).unless({
  path: [
    /^\/user\/login/,
    /^\/user\/reg/,
    /^\/system/,
    /^\/home/,
    /^\/apidoc/,
  ]
})

const router = require('./routers/router');
const {
  serverPort
} = require('./Config/config');

const app = new Koa();
app.use(errorHandle) // 错误处理
  .use(sendHandle()) // 数据返回统一处理
  .use(logger()) // 日志
  .use(body()) // 配置koa-body处理post请求数据
  .use(static(path.join(__dirname, 'public'))) // 配置静态资源目录
  .use(router.routes()).use(router.allowedMethods()) // 注册路由信息
  .use(jwtConfig) // token处理

app.listen(serverPort, () => {
  console.log(`Server is running at http://127.0.0.1:${serverPort}`);
  init();
})

// 系统初始化操作
// 1. 创建一个超级管理员用户 admin/admin
function init() {
  const request = require('request');
  request.post(`http://127.0.0.1:${serverPort}/user/reg`, {
    form: {
      username: 'admin',
      password: 'admin',
      role: 0
    }
  })
}
