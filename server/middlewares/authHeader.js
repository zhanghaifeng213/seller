const jsonwebtoken = require('jsonwebtoken');
const {
  jwtSecret
} = require('../Config/config');

// 注册token
const signToken = async (ctx, next) => {
  try {
    const token = jsonwebtoken.sign(payload, jwtSecret, {
      expiresIn: '4h'
    });
    ctx.state.token = token;
  } catch (error) {
    ctx.sendError(-1, '登录失败');
  }
  await next();
}

// 获取并验证token
const verifyToken = async (ctx, next) => {
  const token = getToken(ctx);
  if (!token) return;
  try {
    return await jsonwebtoken.verify(token, jwtSecret);
  } catch (error) {
    ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
  }
  await next();
}


// 获取token
const getToken = (ctx) => {
  if (!ctx.header || !ctx.header.authorization) {
    return;
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
  }
}

module.exports = {
  signToken,
  verifyToken
}



// /* 获取一个期限为4小时的token */
// function getToken(payload = {}) {
//   return jsonwebtoken.sign(payload, jwtSecret, {
//     expiresIn: '4h'
//   });
// }

// /* 通过token获取JWT的payload部分 */
// async function getJWTPayload(token) {
//   const authArr = token.split(' ');
//   if (authArr.length !== 2 || !/^Bearer$/i.test(authArr[0])) {
//     return;
//   }
//   // 验证并解析JWT
//   try {
//     return await jsonwebtoken.verify(authArr[1], jwtSecret);
//   } catch (error) {
//     return;
//   }
// }
