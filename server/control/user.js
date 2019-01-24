// const Article = require("../Models/article")
const User = require("../Models/user")
// const Comment = require("../Models/comment")
const encrypt = require('../util/encrypt')

exports.login = async ctx => {
  const user = ctx.request.body
  const username = user.username
  const password = user.password
  await new Promise((resolve, reject) => {
    User.find({ username: username }, (err, data) => {
      // console.log("查询数据库username：" + data)
      if (err) return reject(err)
      if (data.length === 0) return reject('用户名不存在')
      // 把用户传过来密码加密跟数据库比对
      if (data[0].password === encrypt(password)) {
        return resolve(data)
      }
      resolve("")
    })
  })
    .then(async data => {
      if (!data) {
        return ctx.body = {
          state: 0,
          message: "密码不正确，登陆失败"
        }
      }
      // 让用户在他的 cookie 里设置 username password 加密后的权限
      ctx.cookies.set("username", username, {
        domain: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: true, // 不让客户端访问这个cookie
        overwrite: false,
        signed: true
      })
      // 用户在数据库的_id 值
      ctx.cookies.set("uid", data[0]._id, {
        domain: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: true, // 不让客户端访问这个cookie
        overwrite: false,
        signed: true
      })
      ctx.session = {
        username,
        uid: data[0]._id,
        avatar: data[0].avatar,
        role: data[0].role
      }
      ctx.body = {
        state: 1,
        message: "登陆成功"
      }
    })
    .catch(async err => {
      ctx.body = {
        state: 0,
        message: "登陆失败"
      }
    })
}


// 确定用户状态， 保持用户的状态
exports.keepLog = async (ctx, next) => {
  console.log('session')
  if (ctx.session.isNew) { // session没有
    if (ctx.cookies.get('username')) {
      let uid = ctx.cookies.get('uid')
      const avatar = await User.findById(uid)
        .then(data => {
          data.avatar
        })
      ctx.session = {
        username: ctx.cookies.get('username'),
        uid: ctx.cookies.get('uid')
      }
    }

  }
  await next()
}

exports.logout = async ctx => {
  ctx.session = null
  ctx.cookies.set("username", null, {
    maxAge: 0
  })
  ctx.cookies.set("uid", null, {
    maxAge: 0
  })
  // 在后台重定向到跟页面
  ctx.body = {
    state: 1,
    message: "退出成功"
  }
}

exports.upload = async ctx => {
  const filename = ctx.req.file.filename
  let data = {}
  await User.update({
    _id: ctx.session.uid
  }, {
      $set: {
        avatar: "/avatar/" + filename
      }
    }, (err, res) => {
      if (err) {
        data = {
          status: 0,
          message: err
        }
      } else {
        data = {
          status: 1,
          message: "上传成功"
        }
      }
    })
  ctx.body = data
}

