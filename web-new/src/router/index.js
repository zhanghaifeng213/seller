import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import main from '@/views/main'
import types from '@/views/main-types'
import dishes from '@/views/main-dishes'
import tables from '@/views/main-table-number'
import info from '@/views/main-info'
import income from '@/views/mian-income'
import records from '@/views/main-order-record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/types',
          name: 'types',
          component: types
        },
        {
          path: '/dishes',
          name: 'dishes',
          component: dishes
        },
        {
          path: '/tables',
          name: 'tables',
          component: tables
        },
        {
          path: '/info',
          name: 'info',
          component: info
        },
        {
          path: '/income',
          name: 'income',
          component: income
        },
        {
          path: '/records',
          name: 'records',
          component: records
        }
      ]
    }
  ]
})
