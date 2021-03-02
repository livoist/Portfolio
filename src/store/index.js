import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TNS_NAME = 'TNS_NAME'
const CUR_PAGE_NAME = 'CUR_PAGE_NAME'

export default new Vuex.Store({
  state: {
    curPageCom: 'GridLists',
    tnsName: 'Portfolio'
  },

  mutations: {
    [TNS_NAME](state, name) {
      state.tnsName = name
    },
    [CUR_PAGE_NAME](state, name) {
      state.curPageCom = name
    }
  },

  actions: {
    switchTnsName({ commit }, string) {
      commit(TNS_NAME, string)
    },
    switchCurPageComponent({ commit }, string) {
      commit(CUR_PAGE_NAME, string)
    }
  },
})
