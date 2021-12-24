<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    TransitionOverlay

    .switchLangTransition(
      :class="getLangTrnsState"
    )
      Header

      .content--second(
        ref="secEl"
        :class="getSecPageTrnsState"
      )
        GridLists
        Contact

      TransitionBlock

      .content--first(
        :class="getFstPageTrsnState"
        ref="firstEl"
      )
        .content__move
          .content__reverse
            EnterView

      OverlayDetail

</template>

<script>
import { mapState } from 'vuex'
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent.js'
import {
  Header,
  Contact,
  TransitionBlock,
  TransitionOverlay,
  OverlayDetail
} from '@c'
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
    TransitionOverlay,
    OverlayDetail
  },
  mounted() {
    this.mouseEvent()
    this.getTransitionElems()
    this.scrollEvent()
  },
  computed: {
    ...mapState({
      isHiddenContent: 'isReverse',
      isFullView: 'fullView',
      isGlbTransition: 'isGlbTransition'
    }),
    getLangTrnsState() {
      return { 'transition': this.isGlbTransition }
    },
    getSecPageTrnsState() {
      return {
        'hidden': this.isFullView,
        'ovh-auto': !this.isFullView
      }
    },
    getFstPageTrsnState() {
      return { 'content--hidden': this.isHiddenContent }
    }
  },
  methods: {
    getTransitionElems() {
      const { firstEl, secEl } = this.$refs
      this.$store.dispatch('setFirstEl', firstEl)
      this.$store.dispatch('setSecEl', secEl)
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
