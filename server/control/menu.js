const MenuModel = require('../models/menu');
const CategoryModel = require('../models/category');

class Menu {
  // 添加菜品
  async add(ctx, next) {
    // 登录
    const { user } = ctx.state;
    if (!user) return ctx.sendError(401, '请先登录');
    const {
      name,
      cid,
      price,
      desc,
      img
    } = ctx.request.body;
    if (!name || !cid || price === undefined) return ctx.sendError(-1, '缺少必填参数');

    // 分类校验
    const result = await CategoryModel.findOne({
      _id: cid
    });
    if (!result) {
      return ctx.sendError(0, '分类参数值错误');
    }

    // 是否重复校验
    const queryResult = await MenuModel.findOne({
      name,
      cid
    });
    if (queryResult) return ctx.sendError(0, '当前菜品已存在, 请勿重复添加');

    const model = new MenuModel({
      name,
      cid,
      price: price || 0,
      desc: desc || '暂无描述',
      img: img || '/avatar/default.jpg'
    });
    const addResult = await model.save();
    if (addResult) {
      ctx.send({
        id: addResult.id,
      }, '菜品添加成功')
    } else {
      ctx.sendError(0, '添加失败');
    }
  }

  // 获取所有菜列表
  async allList(ctx, next) {
    const result = await MenuModel.find();
    if (result) {
      ctx.send({
        list: result.map(item => {
          return {
            id: item.id,
            cid: item.cid,
            name: item.name,
            desc: item.desc,
            price: item.price,
            img: item.img,
            createTime: item.createTime,
            updateTime: item.updateTime
          }
        }),
        total: result.length
      })
    } else {
      ctx.send({
        list: []
      })
    }
  }

  // 获取所有菜列表
  async getListByCid(ctx, next) {
    const {
      cid
    } = ctx.request.query;
    if (!cid) return ctx.sendError(-1, '缺少必填参数');
    const result = await MenuModel.find({
      cid
    });
    if (result) {
      ctx.send({
        cid,
        list: result.map(item => {
          return {
            id: item.id,
            name: item.name,
            desc: item.desc,
            price: item.price,
            img: item.img,
            createTime: item.createTime,
            updateTime: item.updateTime
          }
        }),
        total: result.length
      })
    } else {
      ctx.send({
        list: []
      })
    }
  }

  // 删除菜品
  async delete(ctx, next) {
    const { user } = ctx.state;
    if (!user) return ctx.sendError(401, '请先登录');
    const {
      id
    } = ctx.request.body;
    if (!id) return ctx.sendError(-1, '参数错误');

    const result = await MenuModel.findOne({
      _id: id
    });
    if (result) {
      await MenuModel.deleteOne({
        _id: id
      });
      ctx.send('删除成功');
    } else {
      ctx.sendError(0, '当前菜品不存在')
    }
  }

  async update(ctx, next) {
    const {
      id,
      name,
      cid,
      price,
      desc,
      img
    } = ctx.request.body;
    if (!id || !name || !cid || !price || !desc) return ctx.sendError(-1, '缺少必填参数');

    const queryResult = await MenuModel.findOne({
      id,
      cid
    });
    if (queryResult) return ctx.sendError(0, '当前菜品已存在, 请勿重复添加');

    // 分类校验
    const result = await CategoryModel.find({
      _id: cid
    });
    if (!result || result.length === 0) {
      return ctx.sendError(0, '分类参数值错误');
    }

    const newMenu = {
      id,
      cid,
      name,
      price,
      desc,
      img,
      updateTime: new Date()
    };
    const updateResult = await MenuModel.updateOne({
      _id: id
    }, newMenu);
    if (updateResult) {
      const {
        name,
        cid,
        price,
        desc,
        img,
        updateTime
      } = await MenuModel.findOne({
        _id: id
      });
      ctx.send({
        id,
        name,
        cid,
        price,
        desc,
        img,
        updateTime
      }, '更新成功')
    } else {
      ctx.sendError(0, '更新失败')
    }
  }
}


module.exports = new Menu();
