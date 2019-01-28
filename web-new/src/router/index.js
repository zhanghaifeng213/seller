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
      path: '/login',
      name: 'login',
      component: login,
      meta: { requireAuth: false }
    },
    {
      path: '/',
      name: 'main',
      redirect: { name: 'types' },
      component: main,
      meta: { requireAuth: true },
      children: [
        {
          path: '/types',
          name: 'types',
          component: types,
          meta: { requireAuth: true }
        },
        {
          path: '/dishes',
          name: 'dishes',
          component: dishes,
          meta: { requireAuth: true }
        },
        {
          path: '/tables',
          name: 'tables',
          component: tables,
          meta: { requireAuth: true }
        },
        {
          path: '/info',
          name: 'info',
          component: info,
          meta: { requireAuth: true }
        },
        {
          path: '/income',
          name: 'income',
          component: income,
          meta: { requireAuth: true }
        },
        {
          path: '/records',
          name: 'records',
          component: records,
          meta: { requireAuth: true }
        }
      ]
    }
  ]
})
