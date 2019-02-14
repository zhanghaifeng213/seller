const {
  Schema
} = require("./config")
const ObjectId = Schema.Types.ObjectId
const ChildrenSchema = new Schema({
  menuList: {
    type: ObjectId,
    ref: 'menus'
  },
  amount: Number,
  realAmount: Number,
  remarks: String
})
const OrderSchema = new Schema({
  num: { type: ObjectId, ref: "tables" },
  status: Number,
  list: [ChildrenSchema],
  Amount: Number
}, { versionKey: false, timestamps: { createdAt: "created" } })
module.exports = OrderSchema
