<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    Header

    .content--second(
      ref="secEl"
    )
      //- components(:is="curPage")
      GridLists
      //- Contact

    TransitionBlock

    .content--first(
      :class="{ 'content--hidden': hiddenContent }"
      ref="firstEl"
    )
      .content__move
        .content__reverse
          EnterView

</template>

<script>
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent.js'
import { Header, Contact, TransitionBlock } from '@c'
import GridLists from '@/views/GridLists.vue'
import EnterView from '@/views/EnterView.vue'
import Portfolio from '@/views/PortfolioList.vue'
import '@css'

export default {
  name: 'App',
  components: {
    Header,
    EnterView,
    Portfolio,
    GridLists,
    Contact,
    TransitionBlock
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

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0

</style>
