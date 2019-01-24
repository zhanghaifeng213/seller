const { Schema } = require("./config")
const ObjectId = Schema.Types.ObjectId

const MenuSchema = new Schema({
  name: String,
  categaty: {
    type: ObjectId,
    ref: "categories"
  },
  price: String,
  desc: String,
  img: String

}, { versionKey: false })



module.exports = MenuSchema