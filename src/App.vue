<template lang="pug">
#mousemoveScope
  .mousemoveScope__cursor__pointer

  #app
    Header

    .content--second
      Portfolio
      Contact

    TransitionBlock

    .content--first
      .content__move
        .content__reverse
          EnterView

</template>

<script>
import { TweenMax, TimelineMax } from 'gsap'
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent.js'
import { Header, Contact, TransitionBlock } from '@c'
import EnterView from '@/views/EnterView.vue'
import Portfolio from '@/views/PortfolioList.vue'
import '@css'

export default {
  name: 'App',
  components: {
    Header,
    EnterView,
    Portfolio,
    Contact,
    TransitionBlock
  },
  mounted () {
    this.mouseEvent()
    this.scrollEvent()
  },
  methods: {
    mouseEvent () {
      const mouseCursor = new Mouse()
      mouseCursor.render()
    },
    scrollEvent() {
      Scrollbar.init(document.querySelector('.content--second'), { damping: 0.03 })
    }
  }
}
</script>
