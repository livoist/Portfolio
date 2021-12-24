import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const ROTATE_LAYOUT_NAME = 'ROTATE_LAYOUT_NAME'
const GET_OVERLAYS_ELEMS = 'GET_OVERLAYS_ELEMS'
const GET_FIRST_PAGE_EL = 'GET_FIRST_PAGE_EL'
const GET_SEC_PAGE_EL = 'GET_SEC_PAGE_EL'
const TIMELINE_REVERSE = 'TIMELINE_REVERSE'
const GET_GRID_ITEMS = 'GET_GRID_ITEMS'
const FULL_VIEW_STATE = 'FULL_VIEW_STATE'
const CUR_FULL_VIEW = 'CUR_FULL_VIEW'
const GET_GRID_NAMES = 'GET_GRID_NAMES'
const GET_NAME_POS = 'GET_NAME_POS'
const GRID_TIME_REVERSE = 'GRID_TIME_REVERSE'
const SWITCH_COLOR_MAP = 'SWITCH_COLOR_MAP'
const IS_OVERLAY_IN = 'IS_OVERLAY_IN'
const IS_OVERLAY_OUT = 'IS_OVERLAY_OUT'
const I18N_LANG = 'I18N_LANG'
const IS_GLOBAL_TRANSITION = 'IS_GLOBAL_TRANSITION'
const IS_ENTER_MAIN_PAGE = 'IS_ENTER_MAIN_PAGE'
const IS_LOADING_PAGE = 'IS_LOADING_PAGE'


export default new Vuex.Store({
  state: {
    colorMap: ['#FEB75D', '#55C9EA', '#013B63', '#000E2B'],
    rotateLayoutName: 'Visual',
    overlayElems: [],
    firstPageEl: '',
    secPageEl: '',
    isReverse: false,
    gridItems: '',
    fullView: false,
    curFullView: 'a',
    gridNames: [],
    namePos: 0,
    gridTimelineReverse: false,
    isOverlayIn: false,
    isOverlayOut: false,
    lang: 'en',
    isGlbTransition: false,
    isEnterMainPage: false,
    isLoagingPage: true
  },
  mutations: {
    [ROTATE_LAYOUT_NAME](state, name) {
      state.rotateLayoutName = name
    },
    [GET_OVERLAYS_ELEMS](state, ary) {
      state.overlayElems = ary
    },
    [GET_FIRST_PAGE_EL](state, el) {
      state.firstPageEl = el
    },
    [GET_SEC_PAGE_EL](state, el) {
      state.secPageEl = el
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
    },
    [SWITCH_COLOR_MAP](state, colors) {
      state.colorMap = colors
    },
    [IS_OVERLAY_IN](state, bool) {
      state.isOverlayIn = bool
    },
    [IS_OVERLAY_OUT](state, bool) {
      state.isOverlayOut = bool
    },
    [I18N_LANG](state, lang) {
      state.lang = lang
    },
    [IS_GLOBAL_TRANSITION](state, bool) {
      state.isGlbTransition = bool
    },
    [IS_ENTER_MAIN_PAGE](state, bool) {
      state.isEnterMainPage = bool
    },
    [IS_LOADING_PAGE](state, bool) {
      state.isLoagingPage = bool
    }
  },
  actions: {
    setLoagingPageState({ commit }, bool) {
      commit(IS_LOADING_PAGE, bool)
    },
    setEnterMaingPageState({ commit }, bool) {
      commit(IS_ENTER_MAIN_PAGE, bool)
    },
    switchTnsName({ commit }, string) {
      commit(ROTATE_LAYOUT_NAME, string)
    },
    getOverlaysElems({ commit }, array) {
      commit(GET_OVERLAYS_ELEMS, array)
    },
    setFirstEl({ commit }, el) {
      commit(GET_FIRST_PAGE_EL, el)
    },
    setSecEl({ commit }, el) {
      commit(GET_SEC_PAGE_EL, el)
    },
    canReverse({ commit }, isReverse) {
      commit(TIMELINE_REVERSE, isReverse)
    },
    getGridItems({ commit }, elems) {
      commit(GET_GRID_ITEMS, elems)
    },
    setFullViewState({ commit }, bool) {
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
      commit(CUR_FULL_VIEW, getters.getCurGridName)
    },
    setGridTimelineState({ commit }, bool) {
      commit(GRID_TIME_REVERSE, bool)
    },
    switchColorMap({ commit }, colors) {
      commit(SWITCH_COLOR_MAP, colors)
    },
    overlayIn({ commit }, bool) {
      commit(IS_OVERLAY_IN, bool)
    },
    overlayOut({ commit }, bool) {
      commit(IS_OVERLAY_OUT, bool)
    },
    setI18nLangType({ commit }, lang) {
      commit(I18N_LANG, lang)
    },
    setGlbTransitionState({ commit }, bool) {
      commit(IS_GLOBAL_TRANSITION, bool)
    }
  },
  getters: {
    getCurGridName: (state) => {
      return state.gridNames[state.namePos]
    }
  }
})
