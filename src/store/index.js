import Vue from 'vue'
import Vuex from 'vuex'
import { Expo } from 'gsap'

Vue.use(Vuex)

const TNS_NAME = 'TNS_NAME'
const CUR_PAGE_COMPONENT = 'CUR_PAGE_COMPONENT'
const OVERLAYS_ELEMS = 'OVERLAYS_ELEMS'
const ROTATE_LAYOUT = 'ROTATE_LAYOUT'
const FIRST_ELEMS = 'FIRST_ELEMS'
const HIDDEN_CONTENT = 'HIDDEN_CONTENT'
const PRE_PAGE = 'PRE_PAGE'
const INIT_TIMELINE = 'INIT_TIMELINE'
const TIMELINE_REVERSE = 'TIMELINE_REVERSE'
const CUR_TIMELINE = 'CUR_TIMELINE'
const GET_GRID_ITEMS = 'GET_GRID_ITEMS'


const nextTimeline = (state, getters) => {
  const ease = Expo.easeInOut
  const duration = 1.3
  console.log('action')

  state.timeline.to(state.firstElems, duration, {
    ease: ease,
    opacity: 0
  }, 0)

  let t = 0
  for (let i = 0; i <= getters.overlaysTotal - 1; ++i) {
    t = 0.25 * i + 0.25
    state.timeline.to(state.overlays[getters.overlaysTotal - 1 - i].DOM.inner, duration, {
      ease: ease,
      y: '-100%'
    }, i >= 3 ? t * 1.75 : t)
  }

  console.log('for timeline', state.timeline)
}



export default new Vuex.Store({
  state: {
    curPageCom: 'GridLists',
    tnsName: 'Portfolio',
    timeline: '',
    overlays: [],
    overlayElems: [],
    overlaysTotal: 0,
    firstElems: '',
    tnsHidden: false,
    prePage: false,
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
    [ROTATE_LAYOUT](state, ary) {
      state.overlays = ary
    },
    [FIRST_ELEMS](state, dom) {
      state.firstElems = dom
    },
    [HIDDEN_CONTENT](state, boolean) {
      state.tnsHidden = boolean
    },
    [PRE_PAGE](state, boolean) {
      state.prePage = boolean
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
    getRotateLayout({ commit }, array) {
      commit(ROTATE_LAYOUT, array)
    },
    showNextPage({ commit, state, getters }, { comName, tnsName, hidden, page }) {
      commit(TNS_NAME, tnsName)
      commit(HIDDEN_CONTENT, hidden)
      commit(PRE_PAGE, page)
      commit(CUR_PAGE_COMPONENT, comName)

      nextTimeline(state, getters)
    },
    showIntro({ commit, state }, { comName, tnsName }) {
      commit(TNS_NAME, tnsName)
      commit(HIDDEN_CONTENT, false)
      commit(PRE_PAGE, false)
      commit(CUR_PAGE_COMPONENT, comName)

      state.timeline.reverse()
    },
    getFirstElems({ commit }, elems) {
      commit(FIRST_ELEMS, elems)
    },
    initTimeline({ commit }, timeline) {
      commit(INIT_TIMELINE, timeline)
    },
    timelineReverse({ commit, state }, isReverse) {
      commit(TIMELINE_REVERSE, isReverse)

      state.isReverse ? state.curTimeline.reverse() : state.curTimeline
    },
    curTimeline({ commit }, curTimeline) {
      commit(CUR_TIMELINE, curTimeline)
    },
    getGridItems({ commit }, elems) {
      commit(GET_GRID_ITEMS, elems)
    }
  },
  getters: {
    overlaysTotal: state => {
      return state.overlayElems.length
    }
  }
})
