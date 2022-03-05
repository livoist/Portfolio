<template lang="pug">
#overlayView(:class="{ 'show': isFullView }")
  .viewContentsInner(:class="{ 'show': isFullView }")
    .viewContents
      .viewContentImage(
        :style="{ backgroundImage: `url(${getFullViewImg})` }"
      )
      .viewContent
        .viewTitle.fz-36 {{ getCurFullView.name }}
        .m-flex
          .viewTime.fz-20.mb-10
            span Date: 
            | {{ getCurFullView.date }}
          .viewTag.fz-20.mb-10
            span Tag: 
            | {{ getCurFullView.tag }}
        .viewSkill.fz-20.mb-30
          span UseSkill: 
          | {{ getCurFullView.skill }}
        .viewDes.fz-20.mb-30
          span Description: 
          | {{ getCurFullView.des }}
        .viewOverlayClose(@click="closeView(false)" style="cursor: pointer") ← back

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OverlayView',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isFullView: 'fullView',
      getCurFullView: 'curFullView'
    }),
    getFullViewImg() {
      if (this.getCurFullView !== 1) {
        return require(`@img/portfolio${this.getCurFullView.id}.png`)
      } else {
        return require(`@img/portfolio1.png`)
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

      setTimeout(() => { this.$store.dispatch('overlayOut', false) }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
#overlayView
  font-family: 'sans-serif'
.fz-36
  font-size: 36px
  +breakpoint(sm)
    font-size: 7vmin

.fz-28
  font-size: 28px
  +breakpoint(sm)
    font-size: 7vmin

.fz-20
  font-size: 18px
  +breakpoint(sm)
    font-size: 3.75vmin

.mb-30
  margin-bottom: 30px
  +breakpoint(sm)
    margin-bottom: 7vmin

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
  +size(500px,350px)
  background-size: cover
  background-position: center
  transition: 0.3s
  +breakpoint(sm)
    +size(100%,72vmin)
    margin-bottom: 5vmin

.viewContents
  display: flex
  justify-content: space-between
  // max-width: 700px
  max-width: 1200px
  width: 100%
  +breakpoint(sm)
    flex-direction: column
    align-items: center

.viewTime
  +breakpoint(sm)
    margin-right: 6vmin

.viewTitle
  margin-bottom: 30px
  letter-spacing: 4px
  +breakpoint(sm)
    margin-bottom: 3vmin

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

.viewContent
  width: 52%
  position: relative
  +breakpoint(sm)
    width: 90%

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

</style>