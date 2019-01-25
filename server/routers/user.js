/*
 * @Content: 用户模块
 * @Author: Edwin
 * @Date: 2019-01-24 23:18:55
 * @Last Modified by: Edwin
 * @Last Modified time: 2019-01-25 21:16:11
 */
const Router = require('koa-router')();
const user = require('../control/user');

Router.post('/reg', user.reg)
Router.post('/login', user.login)

Router.get('/upload', user.upload)
Router.get('/info', user.getinfo)
Router.get('/logout', user.logout)

module.exports = Router;
