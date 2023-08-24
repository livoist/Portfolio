<template lang="pug">
#overlayView(:class="{ 'show': isFullView }")
  .viewContentsInner(:class="{ 'show': isFullView }")
    .viewContents
      .viewSwitcher
        .preBtn(@click="switchPortfolio('pre')" :class="switchButtonState")
          svg(viewBox='0 0 26 47' xmlns='http://www.w3.org/2000/svg')
            path(d='M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z')
        .progressBar
          .innerBar(:style="{ width: `${getProgressBarProcess}%` }")
          .portfolioNum {{ curId + 1 }}
        .nextBtn(@click="switchPortfolio('next')" :class="switchButtonState")
          svg(viewBox='0 0 26 47' xmlns='http://www.w3.org/2000/svg')
            path(d='M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z')

      .viewContentGroup
        .viewContentImage(ref="detailImg" :class="{ 'switch': isSwitch }")
          img(:src="require(`@img/portfolio${curId}.png`)" :class="{ 'switch': isSwitch }")

        .viewContent(ref="detailContent" :class="{ 'switch': isSwitch }")
          div
            .viewTitle.fz-24 {{ getCurViewContent.name }}
            .slash
            .viewTime
              span Date: 
              | {{ getCurViewContent.date }}
            .viewTag
              span Tag: 
              .viewSkillTag(v-for="item in getCurViewContent.skill") {{ item }}
            .viewDes.mb-30
              span Description: 
              | {{ getCurViewContent.des }}
          div
            a.viewLink(
              :href="`https://livoist.github.io${getCurViewContent.link}`"
              target="_blank"
            ) More
            .viewOverlayClose(@click="closeView(false)" style="cursor: pointer") Close

</template>

<script>
import { mapState } from 'vuex'
import { TimelineMax, Linear } from 'gsap'

export default {
  name: 'OverlayView',
  data() {
    return {
      detailTimeline: "",
      curId: 0,
      isSwitch: false
    }
  },
  computed: {
    ...mapState({
      isFullView: 'fullView',
      getCurFullViewID: 'curFullViewID',
      portfolioList: 'portfolioList'
    }),
    getFullViewImg() {
      return require(`@img/portfolio${this.curId}.png`)
    },
    getCurViewContent() {
      return this.portfolioList.length > 0 ? this.portfolioList[this.curId] : {}
    },
    getProgressBarProcess() {
      return (this.curId + 1) / 4 * 100
    },
    switchButtonState() {
      return { 'prevent-event': this.isSwitch }
    }
  },
  watch: {
    getCurFullViewID: {
      immediate: true,
      handler(val) {
        if (val) {
          this.curId = val
        }
      }
    },
    isFullView: {
      immediate: true,
      handler(val) {
        if (val) {
          this.detailInAnim()
        }
      }
    }
  },
  methods: {
    async closeView(bool) {
      await this.$store.dispatch('setGridTimelineState', bool)
      await this.$store.dispatch('overlayOut', true)
      this.detailInAnimReverse()

      setTimeout(() => {
        this.$store.dispatch('setFullViewState', false)
      }, 800)

      setTimeout(() => {
        this.$store.dispatch('overlayOut', false)
        this.curId = 0
      }, 1000)
    },
    async switchPortfolio(type) {
      if (
        (this.curId === 3 && type === 'next') ||
        (this.curId === 0 && type === 'pre')
      ) {
        this.closeView(true)
        return
      }

      this.isSwitch = true
      setTimeout(() => { this.isSwitch = false }, 1800)

      if (this.isSwitch) {
        if (type === 'pre') {
          setTimeout(() => { this.curId-- }, 1800)
          if (this.curId <= 0) {
            setTimeout(() => {
              this.closeView(true)
              setTimeout(() => { this.curId = 0 }, 600)
            }, 1000)
          }
        }
        if (type === 'next') {
          setTimeout(() => { this.curId++ }, 1800)
          if (this.curId >= 3) {
            setTimeout(() => {
              this.closeView(true)
              setTimeout(() => { this.curId = 0 }, 600)
            }, 1000)
          }
        }
      }
    },
    detailInAnim() {
      this.detailTimeline = new TimelineMax()

      this.detailTimeline
        .to(this.$refs.detailImg, 1.25, {
          ease: Linear.easeIn,
          opacity: 1,
          x: '0%'
        })
        .to(this.$refs.detailContent, 0.65, {
          ease: Linear.easeIn,
          opacity: 1,
          x: '0%'
        })
    },
    detailInAnimReverse() {
      this.detailTimeline.reverse()
    }
  }
}
</script>

<style lang="sass" scoped>
.fz-24
  font-size: 24px
  +breakpoint(sm)
    font-size: 4.5vmin

.fz-28
  font-size: 28px
  +breakpoint(sm)
    font-size: 7vmin

.fz-20
  font-size: 16px
  +breakpoint(sm)
    font-size: 3.75vmin

.mb-30
  margin-bottom: 30px
  +breakpoint(sm)
    margin-bottom: 5vmin

.mb-10
  margin-bottom: 10px
  +breakpoint(sm)
    margin-bottom: 2vmin

.m-flex
  +breakpoint(sm)
    display: flex

#overlayView
  +size(100vw,100vh)
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%,-50%)
  visibility: hidden
  &.show
    visibility: visible

.viewContentImage
  opacity: 0
  width: 38%
  +breakpoint(sm)
    width: 80%
  img
    +size(100%)
    transition: 1s
    max-width: 100%
    &.switch
      opacity: 0

.viewContents
  display: flex
  justify-content: space-between
  flex-direction: column
  // max-width: 700px
  max-width: 1200px
  width: 100%
  +breakpoint(sm)
    flex-direction: column
    align-items: center

.viewSwitcher
  font-size: 30px
  font-weight: bold
  +setFlex
  margin-bottom: 60px
  +breakpoint(sm)
    margin: 0 auto 8vmin 
  .progressBar
    width: 200px
    height: 2px
    background: rgba(0,0,0,0.3)
    margin: 0 30px
    position: relative
    +breakpoint(sm)
      width: 30vmin
    .portfolioNum
      position: absolute
      left: 50%
      top: -40px
      transform: translateX(-50%)
      font-size: 20px
      +breakpoint(sm)
        font-size: 4.5vmin
        top: -9vmin
    .innerBar
      position: absolute
      top: 50%
      left: 0
      transform: translateY(-50%)
      +size(0,1px)
      background: #000
      transition: width 0.5s
  .preBtn,.nextBtn
    cursor: pointer
    position: relative
    &:after
      content: 'Close'
      position: absolute
      font-size: 12px
      top: 50%
      transform: translateY(-50%)
      transition: 0.5s
      opacity: 0
    &.prevent-event
      pointer-events: none
    +breakpoint(sm)
      line-height: 2vmin
    svg
      width: 14px
      +breakpoint(sm)
        width: 2vmin
  .preBtn:after
    left: -600%
    &.showLCloseHint:after
      opacity: 1
  .nextBtn
    transform: rotate(180deg)
    &.showRCloseHint:after
      opacity: 1
    &:after
      left: -600%
      transform: translateY(-50%) rotate(-180deg)

.skillBox
  +breakpoint(sm)
    +setFlex

.slash
  width: 100%
  margin-top: 20px
  border-bottom: 1px solid #000
  +breakpoint(sm)
    margin-top: 4vmin

.viewSkillTag
  display: inline-block
  margin-right: 10px
  font-size: 12px
  background: rgba(#000,0.8)
  color: rgba(#fff,0.8)
  padding: 0 6px
  border-radius: 2px
  +breakpoint(sm)
    margin-right: 1vmin
    line-height: 1.7

.viewTime,.viewTag,.viewDes
  line-height: 1.7
  letter-spacing: 1px
  font-size: 14px
  +breakpoint(sm)
    font-size: 3.25vmin
    line-height: 2
  span 
    letter-spacing: 1px
    font-size: 16px
    +breakpoint(sm)
      font-size: 3.5vmin

.viewLink
  border-bottom: 1px solid #013B63
  color: #013B63
  font-weight: bold
  +breakpoint(sm)
    font-size: 3.5vmin

.viewTime
  margin-top: 10px
  +breakpoint(sm)
    margin-right: 6vmin

.viewTitle
  margin-bottom: 30px
  +breakpoint(sm)
    margin: 6vmin auto
    text-align: center
    letter-spacing: 1px

.viewContentsInner
  +size(100%)
  +setFlex
  position: fixed
  top: 0
  left: 0
  background: #efecea
  opacity: 0
  visibility: hidden
  transition: 0.5s
  &.show
    opacity: 1
    visibility: visible

.viewContentGroup
  +setFlex(space-between,flex-start)
  +breakpoint(sm)
    flex-direction: column
    +setFlex
    min-height: 132vmin

@keyframes delayBlurIn
  0%
    opacity: 1
    filter: blur(0)
  100%
    opacity: 0
    filter: blur(10px)

.viewContent
  opacity: 0
  width: 55%
  position: relative
  display: flex
  flex-direction: column
  +breakpoint(sm)
    width: 80%
  &.switch
    opacity: 0
    filter: blur(2px)
    transition: 1.5s
    animation: delayBlurIn both 0.25s 2s
        // @for $i from 1 through 6
        //   &:nth-of-type(#{$i})
        //     animation: delayBlurIn both 0.4s $i * 0.2s

.viewOverlayClose
  letter-spacing: 2px
  font-size: 12px
  position: absolute
  bottom: 0
  right: 0
  +breakpoint(sm)
    font-size: 4vmin
    right: 50%
    bottom: -10vmin
    transform: translateX(50%)

</style>