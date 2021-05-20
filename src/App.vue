<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    Header

    .content--second(
      ref="secEl"
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

  DetailView

</template>

<script>
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent.js'
import { Header, Contact, TransitionBlock, DetailView } from '@c'
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
    DetailView
  },
  mounted() {
    this.mouseEvent()
    this.getTransitionElems()
    this.scrollEvent()
  },
  computed: {
    curPage() {
      return this.$store.state.curPageCom
    },
    hiddenContent() {
      return this.$store.state.isReverse
    }
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
