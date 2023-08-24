<template lang="pug">
div
  .gridContainer
    .gridInner
      .gridItem(
        v-for="(item, idx) in gridContents"
        :class="`portfolio${item.id}`"
        ref="gridItems"
        @click="getOverlayDetail(item, idx)"
      )
        p {{ $t(`preview-name-${item.i18Tag}`) }}
        img(:src="require(`@img/portfolio${item.id}.png`)")

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GridLists',
  data() {
    return {
      // gridNames: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
      gridContents: [
        {
          id: 0,
          date: '2021-2022',
          skill: ["Nuxt.js", "PWA", "MapBox", "RWD"],
          link: '/F2E-3-2/',
          i18Tag: "bikeMap"
        },
        {
          id: 1,
          date: '2021-2022',
          skill: ["p5.js"],
          link: '/codeArt-1/',
          i18Tag: "randomWorld"
        },
        {
          id: 2,
          date: '2021-2022',
          skill: ["p5.js"],
          link: '/codeArt-2/',
          i18Tag: "colorsDove"
        },
        {
          id: 3,
          date: '2021-2022',
          skill: ["JavaScript"],
          link: '/DynamicTable/',
          i18Tag: "dynamicTable"
        }
      ]
    }
  },
  computed: {
    ...mapState({
      getGridItems: 'gridItems'
    }),
    getFullViewImage() {
      return require(`@img/${this.$store.state.curFullView}.png`)
    }
  },
  methods: {
    // getItemDetail(name, pos) {
    //   this.$store.dispatch('getCurFullView', name)
    //   this.$store.dispatch('isFullView', true)
    //   this.$store.dispatch('getNamePos', pos)
    //   this.$store.dispatch('getGridTimelineState', true)
    // },
    savePortfolioList() {
      this.$store.dispatch('getPortfolioList', this.gridContents)
    },
    getOverlayDetail(item, pos) {
      this.$store.dispatch('getCurFullViewID', item.id)
      // this.$store.dispatch('getNamePos', pos)
      this.$store.dispatch('setGridTimelineState', true)

      this.$store.dispatch('overlayIn', true)

      setTimeout(() => {
        this.$store.dispatch('setFullViewState', true)
      }, 800)

      setTimeout(() => {
        this.$store.dispatch('overlayIn', false)
      }, 1000)
    },
    saveGridItems() {
      const gridItems = this.$refs.gridItems
      this.$store.dispatch('getGridItems', gridItems)
    },
    getGridNames() {
      this.$store.dispatch('getGridNames', this.gridNames)
    }
  },
  mounted() {
    this.saveGridItems()
    this.getGridNames()
    this.savePortfolioList()
  }
}
</script>

<style lang="sass" scoped>
$mb-grid-items: ("a" "2 / 1 / 4 / 7", "b" "4 / 7 / 6 / 13", "c" "6 / 1 / 8 / 7", "d" "8 / 7 / 10 / 13", "e" "10 / 1 / 12 / 7", "f" "12 / 7 / 14 / 13", "g" "14 / 1 / 16 / 7", "h" "16 / 7 / 18 / 13", "i" "18 / 1 / 20 / 7", "j" "20 / 7 / 22 / 13", "k" "22 / 1 / 24 / 7")

.gridContainer
  display: grid
  height: 100vh

.gridInner
  position: relative
  width: 90%
  height: calc(100vh - 5vh)
  margin: auto
  display: grid
  grid-area: 1 / 1 / 2 / 2
  grid-template-columns: repeat(17, 1fr)
  grid-template-rows: repeat(8, 1fr)
  grid-gap: 1vw
  margin-top: 5vw
  box-sizing: border-box
  perspective: 1000px
  perspective-origin: center center
  +breakpoint(sm)
    grid-gap: 7vw
    margin-top: 20vw
    height: auto
    grid-template-columns: repeat(8, 1fr)
    grid-template-rows: repeat(4, 1fr)

.gridItem
  position: relative
  opacity: 0
  transform: translate3d(0, 0, 0px)
  will-change: transform
  > p
    font-size: 16px
    font-weight: 500
    +breakpoint(sm)
      font-size: 3vmin
      margin-bottom: 2vmin
  > img
    cursor: pointer
    transition: 0.35s ease-out
    width: 100%
  @media (min-width: 1200px)
    &:hover > img
      transform: scale(0.98) !important
  &.portfolio0
    grid-area: 2 / 2 / 2 / 6
    +breakpoint(sm)
      grid-area: 1 / 1 / 1 / 7
  &.portfolio1
    grid-area: 5 / 6 / 5 / 10
    +breakpoint(sm)
      grid-area: 2 / 3 / 2 / 9
  &.portfolio2
    grid-area: 5 / 14 / 5 / 18
    +breakpoint(sm)
        grid-area: 3 / 1 / 3 / 7
  &.portfolio3
    grid-area: 2 / 10 / 2 / 14
    +breakpoint(sm)
      grid-area: 4 / 3 / 4 / 9
  // &.a
  //   grid-area: 2 / 1 / 6 / 5
  // &.b
  //   grid-area: 6 / 2 / 9 / 5
  // &.c
  //   grid-area: 3 / 4 / 7 / 8
  // &.d
  //   grid-area: 1 / 8 / 4 / 10
  // &.e
  //   grid-area: 4 / 11 / 7 / 15
  // &.f
  //   grid-area: 7 / 10 / 9 / 14
  // &.g
  //   grid-area: 6 / 7 / 8 / 10
  // &.h
  //   grid-area: 1 / 5 / 3 / 8
  // &.i
  //   grid-area: 2 / 10 / 4 / 13
  // &.j
  //   grid-area: 4 / 8 / 6 / 11
  // &.k
  //   grid-area: 7 / 5 / 9 / 8
  // &:hover
  //   filter: brightness(1)
  // +breakpoint(sm)
  //   @each $item, $grid in $mb-grid-items
  //     &.#{$item}
  //       grid-area: unquote($grid)
</style>
