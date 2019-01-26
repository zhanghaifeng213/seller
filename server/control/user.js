const jsonwebtoken = require('jsonwebtoken');
const UserModel = require("../Models/user")
const encrypt = require('../util/encrypt')

const {
  jwtSecret
} = require('../Config/config');

class User {
  // 用户注册(添加)
  async reg(ctx, next) {
    const {
      username,
      password,
      role = 1
    } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 0,
        data: '',
        errMsg: '用户名或者密码不能为空'
      }
    }

    if (role === 0 && username !== 'admin' && password !== 'admin') {
      return ctx.body = {
        code: 0,
        data: '',
        errMsg: '管理员角色已关闭注册，请联系管理员添加!'
      }
    }

    await new Promise((resolve, reject) => {
      UserModel.find({
        username
      }).then(data => {
        if (data.length === 0) {
          new UserModel({
            username: username,
            password: encrypt(password),
            role,
          }).save().then(data => {
            return resolve({
              code: 1,
              data: '注册成功',
            });
          }).catch(err => {
            // console.log('管理员账号检查失败')
            return resolve({
              code: 0,
              data: '',
              errMsg: '数据查询错误'
            });
          })
        } else {
          return resolve({
            code: 0,
            data: '',
            errMsg: '用户名已存在'
          });
        }
      })
    }).then(res => {
      return ctx.body = res;
    })
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
            data: { userLists: data, totalPage: maxNum }
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
            token: signToken({
              id,
              username
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
    if (!ctx.header || !ctx.header.authorization) {
      ctx.status = 401;
      next();
      return;
    }
    // 前端访问时会附带token在请求头
    const payload = await getJWTPayload(ctx.headers.authorization);
    if (payload) {
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
    if (!ctx.header || !ctx.header.authorization) {
      ctx.body = {
        code: 0,
        errMsg: '请先登录',
        data: ''
      }
      return;
    }
    // 前端访问时会附带token在请求头
    const payload = await getJWTPayload(ctx.headers.authorization);
    if (payload) {
      const {
        id
      } = payload;
      await new Promise((resolve, reject) => {
        UserModel.find({
          _id: id
        }, (err, data) => {
          if (err) {
            return {
              code: 0,
              errMsg: '服务器错误'
            }
          };
          if (!data) {
            return {
              code: 0,
              errMsg: '当前用户不存在'
            }
          };
          resolve(data[0]);
        })
      })
        .then(data => {
          const {
            role,
            avatar,
            username,
            id
          } = data;
          return ctx.body = {
            code: 1,
            data: {
              role,
              avatar,
              username,
              id
            }
          };
        })
        .catch(err => {
          ctx.status = 401;
          ctx.body = {
            code: 0,
            errMsg: '查询失败'
          }
        })
    } else {
      return ctx.body = {
        code: 0,
        errMsg: '查询失败, 请先登录',
      }
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

/* 获取一个期限为4小时的token */
function signToken(payload = {}) {
  return jsonwebtoken.sign(payload, jwtSecret, {
    expiresIn: '4h'
  });
}

/* 通过token获取JWT的payload部分 */
async function getJWTPayload(token) {
  const authArr = token.split(' ');
  if (authArr.length !== 2 || !/^Bearer$/i.test(authArr[0])) {
    return;
  }
  // 验证并解析JWT
  try {
    return await jsonwebtoken.verify(authArr[1], jwtSecret);
  } catch (error) {
    return;
  }
}

// 获取token
const getToken = (ctx) => {
  if (!ctx.header || !ctx.header.authorization) {
    return false;
  }
  const parts = ctx.header.authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
  }
  if (!opts.passthrough) {
    ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
    return false
  }
}

