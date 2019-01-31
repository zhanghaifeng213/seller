import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { login, info } from '@/fetch/user'
import { getTypeInfo } from '@/fetch/types'
import { addTypesList, deleteType, updataType } from '../fetch/types'

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
    auth_request(state) {
      state.status = 'lodaing'
    },
    auth_success(state, payload) {
      state.status = 'success'
      state.username = payload.username
      state.role = payload.role
      state.avatar = payload.avatar
      state.id = payload.id
    },
    setToken(state, val) {
      state.token = val
    }
  },
  actions: {
    handleLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user).then(res => {
          if (res.data.code === 1) {
            const token = res.data.data
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
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    handleUserInfo({ commit }) {
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
    },
    handleGetTypeInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getTypeInfo().then(res => {
          if (res.data.code === 1) {
            const data = res.data.data
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddTypesList({ commit }, list) {
      const typeslist = {}
      typeslist.name = list.name
      if (list.desc) {
        typeslist.desc = list.desc
      }
      return new Promise((resolve, reject) => {
        addTypesList(typeslist).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteType({ commit }, id) {
      const itemId = {}
      itemId.id = id
      return new Promise((resolve, reject) => {
        deleteType(itemId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleUpdataType ({commit}, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        updataType(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
