import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { login, info } from '@/fetch/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: '',
    role: '',
    avatar: '',
    id: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'lodaing'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.username = payload.username
      state.role = payload.role
      state.avatar = payload.avatar
      state.id = payload.id
    },
    setToken (state, val) {
      state.token = val
    }
  },
  actions: {
    handleLogin ({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user).then(res => {
          if (res.data.code === 1) {
            const token = res.data.data
            console.log(res.data)
            commit('setToken', token)
            localStorage.setItem('token', token)
            resolve(res)
          } else {
            resolve(false)
          }
        }).catch((err) => {
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    handleUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        info()
          .then(res => {
            if (res.data.code === 1) {
              const data = res.data.data
              commit('auth_success', data)
              resolve(data)
            } else {
              resolve(false)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
