import Vue from 'vue'
import Vuex from 'vuex'
// import { Expo } from 'gsap'

Vue.use(Vuex)

const TNS_NAME = 'TNS_NAME'
const CUR_PAGE_COMPONENT = 'CUR_PAGE_COMPONENT'
const OVERLAYS_ELEMS = 'OVERLAYS_ELEMS'
const GET_FIRST_ELEM = 'FIRST_ELEMS'
const GET_SEC_ELEM = 'GET_SEC_ELEM'
const INIT_TIMELINE = 'INIT_TIMELINE'
const TIMELINE_REVERSE = 'TIMELINE_REVERSE'
const CUR_TIMELINE = 'CUR_TIMELINE'
const GET_GRID_ITEMS = 'GET_GRID_ITEMS'


// const nextTimeline = (state, getters) => {
//   const ease = Expo.easeInOut
//   const duration = 1.3

//   state.timeline.to(state.firstElems, duration, {
//     ease: ease,
//     opacity: 0
//   }, 0)

//   let t = 0
//   for (let i = 0; i <= getters.overlaysTotal - 1; ++i) {
//     t = 0.25 * i + 0.25
//     state.timeline.to(state.overlays[getters.overlaysTotal - 1 - i].DOM.inner, duration, {
//       ease: ease,
//       y: '-100%'
//     }, i >= 3 ? t * 1.75 : t)
//   }
// }


export default new Vuex.Store({
  state: {
    curPageCom: 'GridLists',
    tnsName: 'Portfolio',
    timeline: '',
    overlayElems: [],
    firstEl: '',
    secEl: '',
    isReverse: false,
    curTimeline: '',
    gridItems: ''
  },
  mutations: {
    [TNS_NAME](state, name) {
      state.tnsName = name
    },
    [CUR_PAGE_COMPONENT](state, name) {
      state.curPageCom = name
    },
    [OVERLAYS_ELEMS](state, ary) {
      state.overlayElems = ary
    },
    [GET_FIRST_ELEM](state, el) {
      state.firstEl = el
    },
    [GET_SEC_ELEM](state, el) {
      state.secEl = el
    },
    [INIT_TIMELINE](state, el) {
      state.timeline = el
    },
    [TIMELINE_REVERSE](state, isReverse) {
      state.isReverse = isReverse
    },
    [CUR_TIMELINE](state, timeline) {
      state.curTimeline = timeline
    },
    [GET_GRID_ITEMS](state, elems) {
      state.gridItems = elems
    }
  },
  actions: {
    switchTnsName({ commit }, string) {
      commit(TNS_NAME, string)
    },
    switchCurPageComponent({ commit }, string) {
      commit(CUR_PAGE_COMPONENT, string)
    },
    getOverlaysElems({ commit }, array) {
      commit(OVERLAYS_ELEMS, array)
    },
    showNextPage({ commit, state, getters }, { comName, tnsName }) {
      commit(TNS_NAME, tnsName)

      commit(CUR_PAGE_COMPONENT, comName)
      nextTimeline(state, getters)
    },
    async showIntro({ commit, state }, { comName, tnsName }) {
      commit(TNS_NAME, tnsName)
      commit(HIDDEN_CONTENT, false)
      commit(PRE_PAGE, false)

      await state.timeline.reverse()
      commit(CUR_PAGE_COMPONENT, comName)
    },
    getFirstEl({ commit }, el) {
      commit(GET_FIRST_ELEM, el)
    },
    getSecEl({ commit }, el) {
      commit(GET_SEC_ELEM, el)
    },
    initTimeline({ commit }, timeline) {
      commit(INIT_TIMELINE, timeline)
    },
    canReverse({ commit }, isReverse) {
      commit(TIMELINE_REVERSE, isReverse)
    },
    curTimeline({ commit }, curTimeline) {
      commit(CUR_TIMELINE, curTimeline)
    },
    getGridItems({ commit }, elems) {
      commit(GET_GRID_ITEMS, elems)
    }
  }
})
