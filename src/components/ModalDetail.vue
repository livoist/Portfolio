<template lang="pug">
//- .fullView(
//-     :class="{ 'showContent': isFullView }"
//-   )
//-     .fullViewContent
//-       .fullViewImage(
//-         :class="{ tnsOpacity: tnsAn }"
//-       )
//-         .fullViewImageInner(
//-           :style="{ backgroundImage: `url(${getFullViewImage})` }"
//-           :class="{ 'switchImage': tnsAn }"
//-         )
//-       .fullViewDes(
//-         :class="{ 'tnsOpacity': tnsAn }"
//-       )
//-         .fullViewTitle Title {{ getCurFullView }}
//-         .fullViewDes Description

//-       .fullViewDate(
//-         :class="{ 'tnsOpacity': tnsAn }"
//-       )
//-         p 2021/3/{{ getCurFullView }}

//-       .fullViewTag(
//-         :class="{ 'tnsOpacity': tnsAn }"
//-       )
//-         p Layout Demo {{ getCurFullView }}

//-       .fullViewNext(
//-         @click="switchImage"
//-         :class="{ 'canSwitch': isSwitch }"
//-       ) →

//-       .fullViewClose(
//-         @click="closeFullView(false)"
//-       )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DetailView',
  data() {
    return {
      gridTimeline: '',
      tnsAn: false,
      isSwitch: false
    }
  },
  computed: {
    ...mapState({
      isFullView: 'fullView',
      getCurFullView: 'curFullView',
      getGridTimeline: 'gridTimeline',
      getNamePos: 'namePos'
    }),
    getFullViewImage() {
      return require(`@img/${this.getCurFullView}.jpg`)
    }
  },
  methods: {
    switchImage() {
      this.tnsAn = true
      this.isSwitch = true

      setTimeout(() => {
        this.tnsAn = false
        this.isSwitch = false
      }, 500)

      if (this.tnsAn) {
        this.$store.state.namePos++
        if (this.getNamePos > 10) this.$store.dispatch('getNamePos', 0)

        setTimeout(() => {
          this.$store.dispatch('switchCurView')
        }, 200)
      }

      if (this.getCurFullView === 'k') {
        this.$store.dispatch('getCurFullView', 'a')
      }
    },
    closeFullView(bool) {
      this.$store.dispatch('isFullView', bool)
      this.$store.dispatch('getGridTimelineState', bool)
    }
  },
  mounted() {
    console.log(this.$store.state.curFullView)
  }
}
</script>

<style lang="sass" scoped>
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
    +breakpoint(xs)
      grid-template-columns: repeat(9, 1fr)
  .fullViewImage
    grid-area: 2 / 6 / 7 / 10
    will-change: opacity
    overflow: hidden
    +breakpoint(xs)
      grid-area: 2 / 2 / 7 / 9
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
    +breakpoint(xs)
      grid-area: 7 / 2 / 9 / 9
    &.tnsOpacity
      animation: tnsOpacity 1s both
    > div
      letter-spacing: 10px
    .fullViewTitle
      font-size: 50px
      white-space: nowrap
      +breakpoint(xs)
        font-size: 5vmin
    .fullViewDes
      font-size: 36px
      +breakpoint(xs)
        font-size: 3.5vmin

  .fullViewDate
    grid-area: 2 / 5 / 2 / 7
    transform: rotate(-90deg)
    position: relative
    transition: 0.3s
    +breakpoint(xs)
      grid-area: 2 / 1 / 2 / 4
    &.tnsOpacity
      animation: tnsOpacity 1s both
    p
      position: absolute
      right: 75px
      font-size: 20px
      letter-spacing: 5px
      margin-bottom: 0
      +breakpoint(xs)
        font-size: 12px

  .fullViewTag
    position: relative
    grid-area: 6 / 9 / 6 / 11
    transform: rotate(90deg)
    transition: 0.3s
    +breakpoint(xs)
      grid-area: 6 / 7 / 6 / 10
    &.tnsOpacity
      animation: tnsOpacity 1s both
    p
      font-size: 20px
      position: absolute
      margin-bottom: 0
      +breakpoint(xs)
        font-size: 12px

  .fullViewNext
    font-size: 80px
    grid-area: 2 / 10 / 2 / 10
    cursor: pointer
    &.canSwitch
      pointer-events: none
    +breakpoint(xs)
      grid-area: 2 / 9 / 2 / 9
      font-size: 10vmin
    

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
    +breakpoint(xs)
      grid-area: 3 / 9 / 3 / 9
      +size(6vmin)
</style>