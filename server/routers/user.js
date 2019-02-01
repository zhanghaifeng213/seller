/*
 * @Content: 用户模块
 * @Author: Edwin
 * @Date: 2019-01-24 23:18:55
 * @Last Modified by: Edwin
 * @Last Modified time: 2019-01-26 01:13:38
 */
const Router = require('koa-router')();
const user = require('../control/user');


/**
 * @api {post} /user/login 用户注册
 * @apiName reg
 * @apiGroup User
 * @apiParam (params) {String} username 用户名
 * @apiParam (params) {String} password 密码
 * @apiParam (params) {Number} role 用户角色(0 -> 超级管理员； 1 -> 普通)
 * @apiSuccessExample Success-Response:
 * {
        "code": 1,
        "data": "注册成功"
    }
 *
 * @apiErrorExample {json} Error-Response:
 * {
        "code": 0,
        "data": "注册失败"
    }
 */
Router.post('/reg', user.reg)

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam (params) {String} username 用户名
 * @apiParam (params) {String} password 密码
 * @apiSuccessExample Success-Response:
 * {
      "code": 1,
      "data": {
          "role": "0",
          "avatar": "/avatar/default.jpg",
          "username": "admin",
          "id": "5c4445b4975a0b56e0e462dc",
          "token": "xxx"
      }
  }
 *
 * @apiErrorExample {json} Error-Response:
 * {
 *    code: 0,
 *    errMsg: '登录失败'
 * }
 */
Router.post('/login', user.login)

Router.get('/upload', user.upload)

/**
 * @api {get} /user/login 用户信息查询
 * @apiName userinfo
 * @apiGroup User
 * @apiDescription 用户信息查询需要用户登录
 * @apiHeaderExample {json} Header-Example:
 * {
 *    "Authorition": "xxxxxxxxxxxx"
 *  }
 * @apiSuccessExample Success-Response:
 * {
        "code": 1,
        "data": {
            "role": "0",
            "avatar": "/avatar/default.jpg",
            "username": "xiaoqiang",
            "id": "5c4b2e2bfae6477ad8cfb41e"
        }
    }
 */
Router.get('/info', user.getinfo)
Router.get('/logout', user.logout)

module.exports = Router;
