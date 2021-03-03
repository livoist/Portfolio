import Vue from 'vue'
import Vuex from 'vuex'
import { TimelineMax, Expo } from 'gsap'
import RotateLayout from '@/rotateLayout/rotateLayout.js'

Vue.use(Vuex)

const TNS_NAME = 'TNS_NAME'
const CUR_PAGE_NAME = 'CUR_PAGE_NAME'
const OVERLAYS_ELEMS = 'OVERLAYS_ELEMS'
const ROTATE_LAYOUT = 'ROTATE_LAYOUT'
const FIRST_ELEMS = 'FIRST_ELEMS'
const HIDDEN_CONTENT = 'HIDDEN_CONTENT'
const PRE_PAGE = 'PRE_PAGE'

const pageToggleTimeline = new TimelineMax()
const ease = Expo.easeInOut
const duration = 1.3

const nextTimeline = (state, getters) => {
  console.log('callTime')
  pageToggleTimeline.to(state.firstElems, duration, {
    ease: ease,
    opacity: 0
  }, 0)

  let t = 0
  for (let i = 0; i <= getters.overlaysTotal - 1; ++i) {
    t = 0.25 * i + 0.25
    console.log('in for')
    console.log('DOM', state.overlays[getters.overlaysTotal - 1 - i].DOM.inner)
    pageToggleTimeline
      .to(state.overlays[getters.overlaysTotal - 1 - i].DOM.inner, duration, {
        ease: ease,
        y: '-100%'
      }, i >= 3 ? t * 1.75 : t)
  }
}



export default new Vuex.Store({
  state: {
    curPageCom: 'GridLists',
    tnsName: 'Portfolio',
    overlays: [],
    overlayElems: [],
    overlaysTotal: 0,
    firstElems: '',
    tnsHidden: false,
    prePage: false
  },
  mutations: {
    [TNS_NAME](state, name) {
      state.tnsName = name
    },
    [CUR_PAGE_NAME](state, name) {
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
    }
  },
  actions: {
    switchTnsName({ commit }, string) {
      commit(TNS_NAME, string)
    },
    switchCurPageComponent({ commit }, string) {
      commit(CUR_PAGE_NAME, string)
    },
    getOverlaysElems({ commit }, array) {
      commit(OVERLAYS_ELEMS, array)
    },
    getRotateLayout({ commit }, array) {
      commit(ROTATE_LAYOUT, array)
    },
    showNextPage({ commit, state, getters }, { comName, hidden, page }) {
      commit(CUR_PAGE_NAME, comName)
      commit(HIDDEN_CONTENT, hidden)
      commit(PRE_PAGE, page)

      nextTimeline(state, getters)
    },
    showIntro({ commit }, { comName, tnsName }) {
      commit(CUR_PAGE_NAME, comName)
      commit(TNS_NAME, tnsName)
      commit(HIDDEN_CONTENT, false)
      commit(PRE_PAGE, false)

      pageToggleTimeline.reverse()
    },
    getFirstElems({ commit }, elems) {
      commit(FIRST_ELEMS, elems)
    }
  },
  getters: {
    overlaysTotal: state => {
      return state.overlayElems.length
    }
  }
})
