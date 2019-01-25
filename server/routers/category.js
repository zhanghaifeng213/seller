/*
 * @Content: 菜单管理
 * @Author: Edwin
 * @Date: 2019-01-24 23:44:32
 * @Last Modified by: Edwin
 * @Last Modified time: 2019-01-26 00:25:01
 */
const Router = require('koa-router')();
const Category = require('../control/category');

Router.get("/query", Category.inquire);
Router.post("/add", Category.add)
Router.post("/delete", Category.delete)
Router.post("/update", Category.update)

module.exports = Router;
