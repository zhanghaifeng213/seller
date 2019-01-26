/*
 * @Content: 所有模块路由
 * => 基础API
 * => 用户模块
 * => 菜单模块
 *
 * @Author: Edwin
 * @Last Modified by: Edwin
 * @Last Modified time: 2019-01-24 23:53:34
 * @Last Modified time: 2019-01-26 16:26:27
 */
const Router = require('koa-router')();
const home = require('./home'); // 基础API
const user = require('./user'); // 用户模块
const category = require('./category'); // 菜单模块
const menu = require('./menu'); // 菜单模块

Router.use('/', home.routes(), home.allowedMethods())
Router.use('/user', user.routes(), user.allowedMethods())
Router.use('/category', category.routes(), category.allowedMethods())
Router.use('/menu', menu.routes(), menu.allowedMethods())

module.exports = Router;
