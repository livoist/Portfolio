<template lang="pug">
#overlayView
  .overlayBlock(:class="{ 'inTfm': isFullView }")

  .viewContents
    .viewContentImage(:style="{ backgroundImage: `url(${getFullViewImage})` }")
    .viewContent
      .viewTime 2021/3/{{ getCurFullView }}
      .viewTag Layout Demo {{ getCurFullView }}
      .viewTitle Title {{ getCurFullView }}
      .viewDes Description
      .colse(@click="closeView(false)" style="position: relative; z-index: 999") close

    

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
      getNamePos: 'namePos'
    }),
    getFullViewImage() {
      return require(`@img/${this.getCurFullView}.jpg`)
    }
  },
  methods: {
    closeView(bool) {
      this.$store.dispatch('isFullView', bool)
      this.$store.dispatch('getGridTimelineState', bool)
    }
  }
}
</script>

<style lang="sass" scoped>

#overlayView
  position: fixed
  top: 0
  left: 0

.overlayBlock
  position: absolute
  background: #efecea
  width: 100vw
  height: 100vh
  will-change: transform
  transform: scaleX(0)
  transform-origin: right center
  transition: transform 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86)
  z-index: 999
  &.inTfm
    transform-origin: left center
    transform: scale(1)

</style>