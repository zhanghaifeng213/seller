// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/libs/httpRequest'

import store from './store'

Vue.use(Element)

Vue.http = Vue.prototype.$http = http
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
