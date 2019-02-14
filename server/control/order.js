const OrderModel = require("../models/order");

class Order {
  // 新增订单
  async add(ctx) {
    const {
      num,
      menuList
    } = ctx.request.body;
    // menuList[{id,num}]
    if (menuList.length === 0 || num) return ctx.sendError(-1, '参数错误');
    const model = new OrderModel({
      num: { type: ObjectId, ref: "tables" },
      status: Number,
      list: [ChildrenSchema],
      Amount: Number
    });
  }
}


module.exports = new Order();
