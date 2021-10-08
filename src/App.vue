<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    .overlayBlock(:class="{ 'inTfm': getOverlayState }")

    Header

    .content--second(
      ref="secEl"
      :class="{ 'hidden': getFullViewState }"
    )
      GridLists
      Contact

    TransitionBlock

    .content--first(
      :class="{ 'content--hidden': hiddenContent }"
      ref="firstEl"
    )
      .content__move
        .content__reverse
          EnterView

    OverlayDetail
    //- ModalDetail

</template>

<script>
import { mapState } from 'vuex'
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent.js'
import { Header, Contact, TransitionBlock, ModalDetail, OverlayDetail } from '@c'
import { GridLists, EnterView } from '@/views'
import '@css'

export default {
  name: 'App',
  components: {
    Header,
    EnterView,
    GridLists,
    Contact,
    TransitionBlock,
    ModalDetail,
    OverlayDetail
  },
  mounted() {
    this.mouseEvent()
    this.getTransitionElems()
    this.scrollEvent()
  },
  computed: {
    ...mapState({
      curPage: 'curPageCom',
      hiddenContent: 'isReverse',
      getOverlayState: 'isOverlayTns',
      getFullViewState: 'fullView'
    })
  },
  methods: {
    getTransitionElems() {
      const { firstEl, secEl } = this.$refs
      this.$store.dispatch('getFirstEl', firstEl)
      this.$store.dispatch('getSecEl', secEl)
    },
    mouseEvent() {
      const mouseCursor = new Mouse()
      mouseCursor.render()
    },
    scrollEvent() {
      Scrollbar.init(document.querySelector('.content--second'), { damping: 0.03 })
    }
  }
}
</script>

<style lang="sass" scoped>
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