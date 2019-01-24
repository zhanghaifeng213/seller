const Router = require("koa-router")
// 拿到操作user 表的逻辑对象
const user = require('../control/user')
const category = require('../control/category')
const router = new Router
// 设计主页
// 用户登陆
router.post("/user/login", user.login)
// 用户退出
router.get("/user/logout", user.logout)
// 菜单分类
router.get("/category/inquire", user.keepLog, category.inquire)
router.post("/category/add", user.keepLog, category.add)
router.post("/category/delete", user.keepLog, category.delete)
router.post("/category/update", user.keepLog, category.update)
module.exports = router

