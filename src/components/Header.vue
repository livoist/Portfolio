<template lang="pug">
  .header
    .navbar
      a.logo(
        href="javascript:void('0')"
        :class="{ 'pointer-initial': prePage }"
      ) B
      .nav.u-z-index_7
        //-a.menu-toggle(href='#popup-overlay')
          span

        #popup-overlay.popup-menu
          a.popup-menu__close.u-z-index_7(href='#!')
            span
            span

          .bar-container.bg-black.u-px-30
            ul.u-pt-100
              li(v-for="item in headerLinks")
                a.popup-menu__item(:href='`#${ item.title }`') {{ item.title.toUpperCase() }}
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      headerLinks: [
        {
          title: 'about',
        },
        {
          title: 'portfolio'
        },
        {
          title: 'contact'
        }
      ]
    }
  },
  computed: {
    prePage() {
      return this.$store.state.isReverse
    }
  },
  methods: {
    scrollTarget(target) {
      window.scroll({
        top: target,
        behavior: 'smooth'
      })
    },
    showIntro() {
      this.$store.dispatch('showIntro', { comName: 'Portfolio', tnsName: 'Home' })
      this.$store.dispatch('timelineReverse', true)
    }
  }
}
</script>
