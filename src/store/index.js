import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TNS_NAME = 'TNS_NAME'
const GET_OVERLAYS_ELEMS = 'GET_OVERLAYS_ELEMS'
const GET_FIRST_ELEM = 'FIRST_ELEMS'
const GET_SEC_ELEM = 'GET_SEC_ELEM'
const TIMELINE_REVERSE = 'TIMELINE_REVERSE'
const GET_GRID_ITEMS = 'GET_GRID_ITEMS'
const FULL_VIEW_STATE = 'FULL_VIEW_STATE'
const CUR_FULL_VIEW = 'CUR_FULL_VIEW'
const GET_GRID_NAMES = 'GET_GRID_NAMES'
const GET_NAME_POS = 'GET_NAME_POS'
const GRID_TIME_REVERSE = 'GRID_TIME_REVERSE'


export default new Vuex.Store({
  state: {
    tnsName: 'VisionPage',
    overlayElems: [],
    firstEl: '',
    secEl: '',
    isReverse: false,
    gridItems: '',
    fullView: false,
    curFullView: 'a',
    gridNames: [],
    namePos: 0,
    gridTimelineReverse: false
  },
  mutations: {
    [TNS_NAME](state, name) {
      state.tnsName = name
    },
    [GET_OVERLAYS_ELEMS](state, ary) {
      state.overlayElems = ary
    },
    [GET_FIRST_ELEM](state, el) {
      state.firstEl = el
    },
    [GET_SEC_ELEM](state, el) {
      state.secEl = el
    },
    [TIMELINE_REVERSE](state, isReverse) {
      state.isReverse = isReverse
    },
    [FULL_VIEW_STATE](state, bool) {
      state.fullView = bool
    },
    [CUR_FULL_VIEW](state, num) {
      state.curFullView = num
    },
    [GET_GRID_NAMES](state, ary) {
      state.gridNames = ary
    },
    [GET_GRID_ITEMS](state, ary) {
      state.gridItems = ary
    },
    [GET_NAME_POS](state, num) {
      state.namePos = num
    },
    [GRID_TIME_REVERSE](state, bool) {
      state.gridTimelineReverse = bool
    }
  },
  actions: {
    switchTnsName({ commit }, string) {
      commit(TNS_NAME, string)
    },
    getOverlaysElems({ commit }, array) {
      commit(GET_OVERLAYS_ELEMS, array)
    },
    getFirstEl({ commit }, el) {
      commit(GET_FIRST_ELEM, el)
    },
    getSecEl({ commit }, el) {
      commit(GET_SEC_ELEM, el)
    },
    canReverse({ commit }, isReverse) {
      commit(TIMELINE_REVERSE, isReverse)
    },
    curTimeline({ commit }, curTimeline) {
      commit(CUR_TIMELINE, curTimeline)
    },
    getGridItems({ commit }, elems) {
      commit(GET_GRID_ITEMS, elems)
    },
    isFullView({ commit }, bool) {
      commit(FULL_VIEW_STATE, bool)
    },
    getCurFullView({ commit }, num) {
      commit(CUR_FULL_VIEW, num)
    },
    getGridTimeline({ commit }, el) {
      commit(GRID_TIMELINE, el)
    },
    getGridNames({ commit }, ary) {
      commit(GET_GRID_NAMES, ary)
    },
    getNamePos({ commit }, num) {
      commit(GET_NAME_POS, num)
    },
    switchCurView({ commit, getters }) {
      commit(CUR_FULL_VIEW, getters.getCurPos)
    },
    getGridTimelineState({ commit }, bool) {
      commit(GRID_TIME_REVERSE, bool)
    }
  },
  getters: {
    getCurPos: (state) => {
      return state.gridNames[state.namePos]
    }
  }
})
