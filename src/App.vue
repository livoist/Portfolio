<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    .overlay-in(:class="{ 'active': isOverlayIn }")
    .overlay-out(:class="{ 'active': isOverlayOut }")

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
      isOverlayIn: 'isOverlayIn',
      isOverlayOut: 'isOverlayOut',
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
.overlay-in,.overlay-out
  position: absolute
  width: 100vw
  height: 100vh
  will-change: transform
  transform: scaleX(0)
  z-index: 999
  transition: transform 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86)

.overlay-in
  transform-origin: right center
  background: #efecea
  &.active
    transform-origin: left center
    transform: scale(1)

.overlay-out
  transform-origin: left center
  background: #0e0e0e
  &.active
    transform-origin: right center
    transform: scale(1)
</style>
