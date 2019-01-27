const jsonwebtoken = require('jsonwebtoken');
const UserModel = require("../models/user")
const encrypt = require('../util/encrypt')

const { jwtSecret, imagePath } = require('../config/config');

class User {
  // 用户注册(添加)
  async reg(ctx, next) {
    const {
      username,
      password,
      role = 1,
      avatar = `${imagePath}/avatar/default.jpg`
    } = ctx.request.body;
    if (!username || !password) {
      return ctx.sendError(0, '用户名或者密码不能为空');
    }

    if (role === 0 && !(username === 'admin' && password === 'admin')) {
      return ctx.sendError(0, '管理员不可注册，请联系超级管理员添加!');
    }

    // 用户是否已存在查询
    const queryData = await UserModel.find({ username });
    if (queryData && queryData.length === 0) {
      const newUser = new UserModel({
        username: username,
        password: encrypt(password),
        role,
        avatar
      });
      const result = await newUser.save();
      if (result) return ctx.send({}, '注册成功');
      else ctx.sendError(0, '注册失败');
    } else {
      return ctx.sendError(0, '注册失败, 用户已存在');
    }
  }

  // 用户修改
  async update(ctx) {
    const {
      username,
      password,
      id,
      role
    } = ctx.request.body;
    if (role == 0) {
      await UserModel.updateOne({ _id: id }, { username, password: encrypt(password) });
      ctx.body = {
        code: 1,
        data: '修改成功'
      }
    } else {
      ctx.body = {
        code: 0,
        data: '',
        errMsg: '没有权限!'
      }
    }

  }

  // 用户删除
  async del(ctx) {
    const {
      userId,
      role
    } = ctx.request.body;
    if (role == 0) {
      await UserModel.findById(userId)
        .then(data => data.remove())
        .catch(err => {
          return ctx.body = {
            code: 0,
            data: '',
            errMsg: '用户删除错误'
          };
        })
      return ctx.body = {
        code: 1,
        data: '删除成功',
      };
    } else {
      return ctx.body = {
        code: 0,
        data: '',
        errMsg: '没有权限'
      };
    }
  }
  // 用户查询
  async inquire(ctx) {
    let {
      pageNum,
      pageSize,
    } = ctx.query;

    const maxNum = await UserModel.estimatedDocumentCount((err, num) =>
      err ? console.log(err) : num
    )
    if (pageNum && pageSize) {
      pageNum--
      pageNum = parseInt(pageNum)
      pageSize = parseInt(pageSize)
      await UserModel.find()
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .then(data => {
          return ctx.body = {
            code: 1,
            data: {
              userLists: data,
              totalPage: maxNum
            }
          }
        })
        .catch(err => {
          return ctx.body = {
            code: 0,
            data: '',
            message: err
          }
        })

    } else {
      return ctx.body = {
        code: 0,
        data: '',
        message: '请传入分页'
      }
    }
  }

  // 用户登录
  async login(ctx, next) {
    const {
      username,
      password
    } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 0,
        data: '',
        errMsg: '用户名或者密码不能为空'
      }
      return;
    }

    await new Promise((resolve, reject) => {
        UserModel.find({
          username: username
        }, (err, data) => {
          if (err) return reject(err)
          if (data.length === 0) return reject('用户名不存在')
          if (data[0].password === encrypt(password)) {
            return resolve(data)
          }
          resolve("")
        })
      })
      .then(async data => {
        if (!data) {
          return ctx.body = {
            code: 0,
            data: '',
            errMsg: "密码不正确，登陆失败"
          }
        }
        const {
          role,
          avatar,
          username,
          id
        } = data[0];
        ctx.body = {
          code: 1,
          data: {
            role,
            avatar,
            username,
            id,
            token: jsonwebtoken.sign(({
              id,
              username
            }), jwtSecret, {
              expiresIn: '4h'
            })
          }
        }
      })
      .catch(async err => {
        return ctx.body = {
          code: 0,
          errMsg: "登陆失败"
        }
      })
  }

  // 图像修改
  async upload(ctx, next) {
    const { user } = ctx.state;
    if (user) {
      const {
        id
      } = payload;
      const filename = ctx.req.file.filename
      let data = {}
      await User.update({
        _id: id
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
    } else {
      return ctx.body = {
        code: 0,
        message: '查询失败',
        data: '请先登录'
      }
    }
  }

  // 用户信息修改
  async getinfo(ctx, next) {
    const { user } = ctx.state;
    if (user) {
      const result = await UserModel.findById(user.id);
      if(result !== null){
        const res = {
            id: result.id,
            name: result.username,
            role: result.role,
            avatar: result.avatar
        };
        return ctx.send(res, '查询成功');
      } else{
        return ctx.sendError(0, '查询失败');
      }
    } else {
      return ctx.sendError(0, '请重新登录');
    }
  }

  // 获取并验证token
  async verifyToken(ctx, next) {
    const token = getToken(ctx);
    if (!token) return ctx.body = {
      code: 0,
      message: '请先登录',
      data: ''
    };
    try {
      if (await jsonwebtoken.verify(token, jwtSecret)) {
        await next();
      } else {
        return ctx.body = {
          code: 0,
          message: '验证登陆失败',
          data: ''
        };
      };
    } catch (error) {
      ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
      return ctx.body = {
        code: 0,
        message: '服务器错误',
        data: ''
      };
    }

  }
}

module.exports = new User();
