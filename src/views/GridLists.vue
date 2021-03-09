<template lang="pug">
div
  .gridContainer
    .gridInner
      .gridItem(
        v-for="(item, idx) in gridItems"
        :style="{ backgroundImage: `url(${bgImg(idx + 1)})` }"
        :class="[item]"
        ref="gridItems"
        @click="getItemDetail(idx)"
      )
    
  .fullView(
    :class="{ 'showContent': isFullView }"
  )
    .fullViewContent
      .fullViewImage(
        :class="{ tnsOpacity: tnsAn }"
      )
        .fullViewImageInner(
          :style="{ backgroundImage: `url(${bgImg(curFullView + 1)})` }"
          :class="{ 'switchImage': tnsAn }"
        )
      .fullViewDes(
        :class="{ 'tnsOpacity': tnsAn }"
      )
        .fullViewTitle Title {{ curFullView }}
        .fullViewDes Description

      .fullViewDate(
        :class="{ 'tnsOpacity': tnsAn }"
      )
        p 2021/3/{{ curFullView }}

      .fullViewTag(
        :class="{ 'tnsOpacity': tnsAn }"
      )
        p Layout Demo {{ curFullView }}

      .fullViewNext(
        @click="switchImage"
        :class="{ 'canSwitch': isSwitch }"
      ) →

      .fullViewClose(
        @click="openFullView(false)"
      )


</template>

<script>
import { TimelineMax, Sine } from 'gsap'

export default {
  name: 'GridLists',
  data() {
    return {
      gridItems: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
      curFullView: '',
      tnsAn: false,
      isSwitch: false,
      gridTimeline: ''
    }
  },
  computed: {
    isFullView() {
      return this.$store.state.fullView
    },
    getGridItems() {
      return this.$store.state.gridItems
    }
  },
  methods: {
    getItemDetail(idx) {
      this.curFullView = idx
      this.openFullView(true)

      this.gridTimeline = new TimelineMax()
      .to(this.getGridItems, 0.6, {
        z: () => Math.floor(Math.random() * -250),
        ease: Sine
      })
    },
    switchImage() {
      this.tnsAn = true
      this.isSwitch = true
      setTimeout(() => {
        this.tnsAn = false
        this.isSwitch = false
      }, 500)

      if (this.tnsAn) {
        setTimeout(() => {
          this.curFullView += 1
        }, 100)
      }

      if (this.curFullView > 14) {
        this.curFullView = 1
      }
    },
    openFullView(bool) {
      this.$store.dispatch('isFullView', bool)
      if (!bool) this.gridTimeline.reverse()
    },
    bgImg(num) {
      return require(`@img/${num}.jpg`)
    },
    saveGridItems() {
      const gridItems = this.$refs.gridItems
      this.$store.dispatch('getGridItems', gridItems)
    }
  },
  mounted() {
    this.saveGridItems()
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

@keyframes tnsOpacity
  0%
    opacity: 0
  50%
    opacity: 1

@keyframes switchAn
  0%
    transform: translateX(0)
    opacity: 1
  50%
    transform: translateX(-150%)
    opacity: 1
  50.1%
    transform: translateX(0)
    opacity: 0
  62.5%
    transform: translateX(0)
    opacity: 1

.fullView
  +setPosition(fixed,50%,null,null,50%)
  +size(100vw,100vh)
  transform: translate(-50%,-50%)
  background: rgba(#000, 0.8)
  visibility: hidden
  transition: 0.5s
  opacity: 0
  z-index: 999
  &.showContent
    opacity: 1
    visibility: visible
  .fullViewContent
    +size(100%)
    display: grid
    grid-template-columns: repeat(14, 1fr)
    grid-template-rows: repeat(8, 1fr)
    grid-gap: 1vw
    position: relative
    color: #fff
  .fullViewImage
    grid-area: 2 / 6 / 7 / 10
    will-change: opacity
    overflow: hidden
    .fullViewImageInner
      +size(100%)
      background-size: cover
      background-position: center
      transition: 0.3s
      &.switchImage
        animation: switchAn 1s both

  .fullViewDes
    grid-area: 7 / 6 / 9 / 10
    transition: 0.3s
    &.tnsOpacity
      animation: tnsOpacity 1s both
    > div
      letter-spacing: 10px
    .fullViewTitle
      font-size: 50px
    .fullViewDes
      font-size: 36px

  .fullViewDate
    grid-area: 2 / 5 / 2 / 7
    transform: rotate(-90deg)
    position: relative
    transition: 0.3s
    &.tnsOpacity
      animation: tnsOpacity 1s both
    p
      position: absolute
      right: 75px
      font-size: 20px
      letter-spacing: 5px
      margin-bottom: 0

  .fullViewTag
    position: relative
    grid-area: 6 / 9 / 6 / 11
    transform: rotate(90deg)
    transition: 0.3s
    &.tnsOpacity
      animation: tnsOpacity 1s both
    p
      font-size: 20px
      position: absolute
      margin-bottom: 0

  .fullViewNext
    font-size: 80px
    grid-area: 2 / 10 / 2 / 10
    cursor: pointer
    &.canSwitch
      pointer-events: none

  .fullViewClose
    +size(50px)
    grid-area: 3 / 10 / 3 / 10
    border: 1px solid #fff
    border-radius: 50%
    position: relative
    cursor: pointer
    &::after,&::before
      content: ''
      +size(70%,2px)
      +setPosition(absolute,50%,null,null,50%)
      background: #fff
    &::after
      transform: translate(-50%,-50%) rotate(45deg)
    &::before
      transform: translate(-50%,-50%) rotate(-45deg)
</style>
