const Category = require("../Models/category")
exports.inquire = async ctx => {
  console.log('category')
  const category = await Category.find()
    .then(data => data)
    .catch(err => console.log(err))
  console.log(category)
  ctx.body = category
}

exports.add = async ctx => {
  if (ctx.session.isNew) {
    // true 就没登录   就不需要就查询数据库
    return (ctx.body = {
      msg: '用户未登录',
      status: 0
    })
  }
  new Category(data).save().then(data => {
    ctx.body = {
      msg: '发表成功',
      status: 1
    }
  })
    .catch(err => {
      ctx.body = {
        msg: '发表失败',
        status: 0
      }
    })
}
exports.delete = async ctx => {
  const _id = ctx.params.id
  let res = {
    state: 1,
    message: '成功'
  }
  await Article.findById(_id)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state: 0,
        message: err
      }
    })

  ctx.body = res
}
exports.update = async ctx => {
  const data = ctx.request.body
  let res = {
    state: 1,
    message: '更新成功'
  }
  Category.update({ _id: data.id }, { $inc: { name: data.name } }, err => {
    if (err) return console.log(err)
    console.log('更新成功')
    ctx.body = res
  })
}

