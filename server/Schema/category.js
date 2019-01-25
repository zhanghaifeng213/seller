const {
  Schema
} = require("./config")

const CategorySchema = new Schema({
  name: String,
}, {
  versionKey: false
})
module.exports = CategorySchema
