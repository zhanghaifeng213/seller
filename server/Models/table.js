const { db } = require('../Schema/config')

const TableSchema = require('../Schema/order')
const Table = db.model("orders", TableSchema)

module.exports = Table