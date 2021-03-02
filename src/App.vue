<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    Header

    .content--second
      components(:is="curPage")

    TransitionBlock

    .content--first
      .content__move
        .content__reverse
          EnterView

</template>

<script>
// import Scrollbar from 'smooth-scrollbar'
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
  mounted () {
    this.mouseEvent()
    // this.scrollEvent()
  },
  computed: {
    curPage() {
      return this.$store.state.curPageCom
    }
  },
  methods: {
    mouseEvent () {
      const mouseCursor = new Mouse()
      mouseCursor.render()
    },
    // scrollEvent() {
    //   Scrollbar.init(document.querySelector('.content--second'), { damping: 0.03 })
    // }
  }
}
</script>
