<template lang="pug">
#overlayView(:class="{ 'show': isFullView }")
  .viewContentsInner(:class="{ 'show': isFullView }")
    .viewContents
      .viewContentImage(:style="{ backgroundImage: `url(${getFullViewImage})` }")
      .viewContent
        .viewTime.mb-10 2021 / 3 / {{ getCurFullView }}
        .viewTag.fz-32.mb-30 Layout Demo {{ getCurFullView }}
        .viewTitle.fz-28.mb-10 Title {{ getCurFullView }}
        .viewDes.fz-20.mb-30 Welcome to Kazuki Noda's portfolio.This website plays background music.Please select "off" if you would rather not listen to the background music.
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
      getCurFullView: 'curFullView',
      getGridTimeline: 'gridTimeline',
      getNamePos: 'namePos',
      getOverlayState: 'isOverlayTns',
    }),
    getFullViewImage() {
      return require(`@img/${this.getCurFullView}.jpg`)
    }
  },
  methods: {
    async closeView(bool) {
      await this.$store.dispatch('isFullView', bool)
      await this.$store.dispatch('getGridTimelineState', bool)

      const secEl = document.querySelector('.content--second')
      secEl.classList.add('ovh-auto')
    }
  }
}
</script>

<style lang="sass" scoped>
.fz-32
  font-size: 32px
  +breakpoint(sm)
    font-size: 7vmin

.fz-28
  font-size: 28px
  +breakpoint(sm)
    font-size: 6vmin

.fz-20
  font-size: 20px
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
  +size(300px)
  background-size: cover
  background-position: center
  transition: 0.3s
  +breakpoint(sm)
    +size(72vmin)
    margin-bottom: 5vmin

.viewContents
  display: flex
  justify-content: space-between
  max-width: 700px
  width: 100%
  +breakpoint(sm)
    width: 72%
    flex-direction: column
    align-items: center

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
  +breakpoint(sm)
    width: 100%

.viewDes
  line-height: 1.25

.viewOverlayClose
  letter-spacing: 4px
  font-weight: bold
  font-size: 14px

</style>