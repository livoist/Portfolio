<template lang="pug">
div
  .gridContainer
    .gridInner
      .gridItem(
        v-for="(item, idx) in gridNames"
        :style="{ backgroundImage: `url(${require(`@img/${item}.jpg`)})` }"
        :class="item"
        ref="gridItems"
        @click="getItemDetail(item, idx)"
      )
</template>

<script>
import { TimelineMax, Sine } from 'gsap'

export default {
  name: 'GridLists',
  data() {
    return {
      gridNames: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
      gridTimeline: ''
    }
  },
  computed: {
    getGridItems() {
      return this.$store.state.gridItems
    },
    getGridTimelineState() {
      return this.$store.state.gridTimelineReverse
    },
    getFullViewImage() {
      return require(`@img/${this.$store.state.curFullView}.jpg`)
    }
  },
  watch: {
    getGridTimelineState: {
      handler(val) {
        if (!val) this.gridTimeline.reverse()
      }
    }
  },
  methods: {
    getItemDetail(name, pos) {
      this.$store.dispatch('getCurFullView', name)
      this.$store.dispatch('isFullView', true)
      this.$store.dispatch('getNamePos', pos)
      this.$store.dispatch('getGridTimelineState', true)

      this.gridTimeline = new TimelineMax()
      .to(this.getGridItems, 0.6, {
        x: () => Math.random() * -100,
        z: () => Math.floor(Math.random() * -250),
        rotateZ: () => Math.random() > 0.5 ? Math.random() * -100 : Math.random() * 100,
        skewX: () => Math.random() * 100,
        skewY: () => Math.random() * 10,
        ease: Sine
      })
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
  }
}
</script>

<style lang="sass" scoped>
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
  grid-template-columns: repeat(14, 1fr)
  grid-template-rows: repeat(8, 1fr)
  grid-gap: 1vw
  padding-top: 5vw
  box-sizing: border-box
  perspective: 1000px
  perspective-origin: center center
  +breakpoint(sm)
    grid-template-columns: repeat(12, 1fr)
    grid-template-rows: repeat(24, 1fr)
  +breakpoint(xs)
    height: auto
    grid-gap: 4vw
  

$mb-grid-items: ("a" "2 / 1 / 4 / 7", "b" "4 / 7 / 6 / 13", "c" "6 / 1 / 8 / 7", "d" "8 / 7 / 10 / 13", "e" "10 / 1 / 12 / 7", "f" "12 / 7 / 14 / 13", "g" "14 / 1 / 16 / 7", "h" "16 / 7 / 18 / 13", "i" "18 / 1 / 20 / 7", "j" "20 / 7 / 22 / 13", "k" "22 / 1 / 24 / 7")


.gridItem
  position: relative
  background-size: cover
  background-position: center
  opacity: 0
  filter: brightness(0.3)
  transform: translate3d(0, 0, 0px)
  will-change: transform
  cursor: pointer
  &.a
    grid-area: 2 / 1 / 6 / 5
  &.b
    grid-area: 6 / 2 / 9 / 5
  &.c
    grid-area: 3 / 4 / 7 / 8
  &.d
    grid-area: 1 / 8 / 4 / 10
  &.e
    grid-area: 4 / 11 / 7 / 15
  &.f
    grid-area: 7 / 10 / 9 / 14
  &.g
    grid-area: 6 / 7 / 8 / 10
  &.h
    grid-area: 1 / 5 / 3 / 8
  &.i
    grid-area: 2 / 10 / 4 / 13
  &.j
    grid-area: 4 / 8 / 6 / 11
  &.k
    grid-area: 7 / 5 / 9 / 8
  &:hover
    filter: brightness(1)
    // grid-area: 3 / 5 / 5 / 11
  +breakpoint(sm)
    @each $item, $grid in $mb-grid-items
      &.#{$item}
        grid-area: unquote($grid)
</style>
