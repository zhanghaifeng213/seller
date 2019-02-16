import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    number: ''
  },
  mutations: {
    auth_success(state, payload) {
      state.id = payload.id
      state.number = payload.number
    },
  }
})
