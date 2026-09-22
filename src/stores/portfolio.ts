import { defineStore } from 'pinia'
import type { CustomLineGenerator } from '@/meshAn'

export type I18nLang = 'en' | 'jp'

export interface PortfolioListItem {
  id: number
  date: string
  skill: string[]
  link: string
  i18Tag: string
}

export interface PortfolioState {
  colorMap: string[]
  rotateLayoutName: string
  overlayElems: HTMLElement[]
  firstPageEl: HTMLElement | null
  secPageEl: HTMLElement | null
  isReverse: boolean
  gridItems: HTMLElement[]
  fullView: boolean
  curFullViewID: number
  gridNames: string[]
  namePos: number
  gridTimelineReverse: boolean
  isOverlayIn: boolean
  isOverlayOut: boolean
  lang: I18nLang
  isGlbTransition: boolean
  isEnterMainPage: boolean
  isLoadingPage: boolean
  portfolioList: PortfolioListItem[]
  // NOTE: holds the live line generator (see EnterView.vue's meshLine()) so
  // MeshLineSwitcher.vue can force it to rebuild its lines with the new color map
  // instead of waiting for lines to randomly respawn on their own. Stored via
  // markRaw() at the call site so Vue's reactivity doesn't wrap the THREE.js instance.
  lineGenerator: CustomLineGenerator | null
}

export const usePortfolioStore = defineStore('portfolio', {
  state: (): PortfolioState => ({
    colorMap: ['#FEB75D', '#55C9EA', '#013B63', '#000E2B'],
    rotateLayoutName: 'Visual',
    overlayElems: [],
    firstPageEl: null,
    secPageEl: null,
    isReverse: false,
    gridItems: [],
    fullView: false,
    curFullViewID: 0,
    gridNames: [],
    namePos: 0,
    gridTimelineReverse: false,
    isOverlayIn: false,
    isOverlayOut: false,
    lang: 'en',
    isGlbTransition: false,
    isEnterMainPage: false,
    isLoadingPage: true,
    portfolioList: [],
    lineGenerator: null,
  }),

  actions: {
    getPortfolioList(list: PortfolioListItem[]) {
      this.portfolioList = list
    },
    setLoadingPageState(bool: boolean) {
      this.isLoadingPage = bool
    },
    setEnterMainPageState(bool: boolean) {
      this.isEnterMainPage = bool
    },
    switchTnsName(name: string) {
      this.rotateLayoutName = name
    },
    getOverlaysElems(elems: HTMLElement[]) {
      this.overlayElems = elems
    },
    setFirstEl(el: HTMLElement | null) {
      this.firstPageEl = el
    },
    setSecEl(el: HTMLElement | null) {
      this.secPageEl = el
    },
    canReverse(isReverse: boolean) {
      this.isReverse = isReverse
    },
    getGridItems(elems: HTMLElement[]) {
      this.gridItems = elems
    },
    setFullViewState(bool: boolean) {
      this.fullView = bool
    },
    getCurFullViewID(id: number) {
      this.curFullViewID = id
    },
    getGridNames(names: string[]) {
      this.gridNames = names
    },
    getNamePos(pos: number) {
      this.namePos = pos
    },
    setGridTimelineState(bool: boolean) {
      this.gridTimelineReverse = bool
    },
    switchColorMap(colors: string[]) {
      this.colorMap = colors
    },
    overlayIn(bool: boolean) {
      this.isOverlayIn = bool
    },
    overlayOut(bool: boolean) {
      this.isOverlayOut = bool
    },
    setI18nLangType(lang: I18nLang) {
      this.lang = lang
    },
    setGlbTransitionState(bool: boolean) {
      this.isGlbTransition = bool
    },
    setLineGenerator(generator: CustomLineGenerator | null) {
      this.lineGenerator = generator
    },
  },
})
