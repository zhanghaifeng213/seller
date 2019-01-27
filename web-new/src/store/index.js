import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'lodaing'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.username = payload.username
    }
  },
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/login', user).then(res => {
          const token = res.data.data.token
          const username = res.data.data.username
          const payload = {
            'token': token,
            'username': username
          }
          localStorage.setItem('token', token)
          // 添加token到请求头里验证
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', payload)
          resolve(res)
        }).catch((err) => {
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
