<template lang="pug">
#overlayView(:class="{ 'show': isFullView }")
  .viewContentsInner(:class="{ 'show': isFullView }")
    .viewContents
      .viewSwitcher
        .preBtn(@click="switchPortfolio('pre')" :class="{ 'prevent-event': isSwitch }")
          svg(viewBox='0 0 26 47' xmlns='http://www.w3.org/2000/svg')
            path(d='M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z')
        .progressBar
          .innerBar(:style="{ width: `${getProgressBarProcess}%` }")
          .portfolioNum {{ curId + 1 }}
        .nextBtn(@click="switchPortfolio('next')" :class="{ 'prevent-event': isSwitch }")
          svg(viewBox='0 0 26 47' xmlns='http://www.w3.org/2000/svg')
            path(d='M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z')

      .viewContentGroup
        .viewContentImage
          img(:src="require(`@img/portfolio${curId}.png`)" :class="{ 'switch': isSwitch }")

        .viewContent(:class="{ 'switch': isSwitch }")
          .viewTitle.fz-36 {{ getCurViewContent.name }}
          .viewTime.fz-16
            span Date: 
            | {{ getCurViewContent.date }}
          .viewTag.fz-16
            span Tag: 
            | {{ getCurViewContent.tag }}
          .viewSkill.fz-16
            span UseSkill: 
            | {{ getCurViewContent.skill }}
          .viewDes.fz-16.mb-30
            span Description: 
            | {{ getCurViewContent.des }}
          a.viewLink(
            :href="`https://livoist.github.io${getCurViewContent.link}`"
            target="_blank"
          ) Portfolio link
          .viewOverlayClose(@click="closeView(false)" style="cursor: pointer") ← back

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OverlayView',
  data() {
    return {
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
    }
  },
  methods: {
    async closeView(bool) {
      await this.$store.dispatch('setGridTimelineState', bool)
      await this.$store.dispatch('overlayOut', true)

      setTimeout(() => {
        this.$store.dispatch('setFullViewState', false)
      }, 800)

      setTimeout(() => {
        this.$store.dispatch('overlayOut', false)
        this.curId = 0
      }, 1000)
    },
    switchPortfolio(type) {
      if (
        (this.curId === 3 && type === 'next') ||
        (this.curId === 0 && type === 'pre')
      ) {
        this.closeView(true)
        return
      }

      this.isSwitch = true
      setTimeout(() => { this.isSwitch = false }, 1200)

      if (this.isSwitch) {
        if (type === 'pre') {
          setTimeout(() => { this.curId-- }, 1200)
          if (this.curId <= 0) {
            setTimeout(() => {
              this.closeView(true)
              setTimeout(() => { this.curId = 0 }, 600)
            }, 1000)
          }
        }
        if (type === 'next') {
          setTimeout(() => { this.curId++ }, 1200)
          if (this.curId >= 3) {
            setTimeout(() => {
              this.closeView(true)
              setTimeout(() => { this.curId = 0 }, 600)
            }, 1000)
          }
        }
      }
    }
  },
  mounted() {
    this.curId = this.getCurFullViewID
  }
}
</script>

<style lang="sass" scoped>
.fz-36
  font-size: 36px
  +breakpoint(sm)
    font-size: 6vmin

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
  // +size(300px)
  +size(500px,320px)
  background-size: cover
  background-position: center
  +breakpoint(sm)
    +size(100%,58vmin)
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
    margin: 8vmin auto 0
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
    &.prevent-event
      pointer-events: none
    +breakpoint(sm)
      line-height: 2vmin
    svg
      width: 14px
      +breakpoint(sm)
        width: 2vmin
  .nextBtn
    transform: rotate(180deg)

.viewTime,.viewTag,.viewDes,.viewSkill
  line-height: 2.2
  letter-spacing: 2px
  font-size: 14px
  +breakpoint(sm)
    font-size: 3.25vmin
    line-height: 2
  span 
    font-weight: bold
    letter-spacing: 1px
    font-size: 16px
    +breakpoint(sm)
      font-size: 3.5vmin

.viewLink
  border-bottom: 1px solid #013B63
  color: #013B63
  font-weight: bold
  +breakpoint(sm)
    font-size: 4vmin

.viewTime
  +breakpoint(sm)
    margin-right: 6vmin

.viewTitle
  margin-bottom: 30px
  letter-spacing: 4px
  +breakpoint(sm)
    margin: 4vmin auto
    text-align: center
    letter-spacing: 0.5vmin

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

.viewContent
  +size(52%,100%)
  position: relative
  transition: 0.7s 0.5s
  +breakpoint(sm)
    width: 90%
  &.switch
    opacity: 0

.viewDes
  line-height: 1.25

.viewOverlayClose
  letter-spacing: 2px
  font-size: 14px
  position: absolute
  bottom: 0
  right: 0
  +breakpoint(sm)
    font-size: 12px
    right: 50%
    bottom: -10vmin
    transform: translateX(50%)

</style>