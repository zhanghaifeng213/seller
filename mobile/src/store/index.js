import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableNum: sessionStorage.getItem("tableNum"),
    tableNumId: sessionStorage.getItem("tableNumId")
  },
  mutations: {
    setTable(state, payload) {
      sessionStorage.setItem("tableNumId", payload.tableNumId)
      sessionStorage.setItem("tableNum", payload.tableNum)
      state.tableNumId = payload.tableNumId
      state.tableNum = payload.tableNum
    },
  }
})
