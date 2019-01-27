const { Schema } = require("./config");

const UserSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 1
  },
  avatar: {
    type: String,
    default: ''
  }
}, { versionKey: false })

module.exports = UserSchema
