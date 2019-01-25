const jsonwebtoken = require('jsonwebtoken');
const UserModel = require("../Models/User")
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
      role = 0
    } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        state: 0,
        data: '注册失败',
        message: '用户名或者密码不能为空'
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
            const {
              role,
              avatar,
              id,
              username
            } = data;
            return resolve({
              state: 1,
              data: {
                role,
                avatar,
                id,
                username
              },
              message: '注册成功'
            });
          }).catch(err => {
            // console.log('管理员账号检查失败')
            return resolve({
              state: 0,
              data: '数据查找错误',
              message: '注册失败'
            });
          })
        } else {
          return resolve({
            state: 0,
            data: '用户名已存在',
            message: '注册失败'
          });
        }
      })
    }).then(res => {
      return ctx.body = res;
    })
  }

  // 用户登录
  async login(ctx, next) {
    const {
      username,
      password
    } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        state: 0,
        data: '参数错误',
        message: '用户名或者密码不能为空'
      }
      return;
    }

    await new Promise((resolve, reject) => {
        UserModel.find({
          username: username
        }, (err, data) => {
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

        ctx.body = {
          state: 1,
          message: "登陆成功",
          data: {
            token: getToken({
              id: data[0].id,
              username
            })
          }
        }
      })
      .catch(async err => {
        ctx.body = {
          state: 0,
          message: "登陆失败"
        }
      })
  }

  // 退出登录(客户端清除token等相关本地信息即可)
  async logout(ctx, next) {
    ctx.body = {
      state: 1,
      message: "退出成功"
    }
    next();
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
        state: 0,
        message: '查询失败',
        data: '请先登录'
      }
    }
  }

  // 用户信息修改
  async getinfo(ctx, next) {
    if (!ctx.header || !ctx.header.authorization) {
      ctx.body = {
        state: 0,
        message: '查询失败',
        data: '请先登录'
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
                state: 0,
                message: '服务器错误'
              }
            };
            if (!data) {
              return {
                state: 0,
                message: '当前用不存在'
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
            state: 1,
            message: '查询成功',
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
            state: 0,
            message: "查询失败"
          }
        })
    } else {
      return ctx.body = {
        state: 0,
        message: '查询失败',
        data: '请先登录'
      }
    }
  }
}

module.exports = new User();




/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
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
