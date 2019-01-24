const mongoose = require("mongoose")
const db = mongoose.createConnection("mongodb://localhost:27040/seller", {
  useNewUrlParser: true
})
// 用原生 ES6的promise代替mongoose 自实现的promise
mongoose.Promise = global.Promise
// 把mongoose的schema取出来
const Schema = mongoose.Schema
db.on("error", () => {
  console.log("连接数据库失败")
})
db.on("open", () => {
  console.log("连接seller数据库成功")
})
module.exports = {
  db,
  Schema
}