var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:3030"',
  SOCKETIO: '"http://127.0.0.1:3030"'
})
