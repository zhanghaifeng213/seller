/*
 * @Content: 基础API
 * @Author: Edwin
 * @Date: 2019-01-24 23:18:55
 * @Last Modified by: Edwin
 * @Last Modified time: 2019-01-25 21:39:02
 */
const Router = require('koa-router')();
const home = require('../control/home');

// 欢迎页面
Router.get('home', home.welcome)

// 系统基本信息
Router.get('system', home.system)

module.exports = Router;
