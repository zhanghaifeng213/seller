import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { login, info } from '@/fetch/user'
import { getTypeInfo } from '@/fetch/types'
import { addTypesList, deleteType, updataType } from '../fetch/types'
import { inquire, userReg, userUpdate } from '../fetch/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: sessionStorage.getItem('token') || '',
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
            sessionStorage.setItem('token', token)
            resolve(res)
          } else {
            resolve(false)
          }
        }).catch((err) => {
          sessionStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        sessionStorage.removeItem('token')
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
    handleUpdataType({ commit }, data) {
      return new Promise((resolve, reject) => {
        updataType(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetUserLists({ commit }) {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      return new Promise((resolve, reject) => {
        inquire(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleUserReg({ commit }, data) {
      return new Promise((resolve, reject) => {
        userReg(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleUpdateUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        userUpdate(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
