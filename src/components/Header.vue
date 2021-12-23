<template lang="pug">
  .header
    .navbar
      a.logo(
        href="javascript:void('0')"
        :class="getLogoClassList"
      ) B

      //- .nav.u-z-index_7
      //-   //-a.menu-toggle(href='#popup-overlay')
      //-     span

      //-   #popup-overlay.popup-menu
      //-     a.popup-menu__close.u-z-index_7(href='#!')
      //-       span
      //-       span

      //-     .bar-container.bg-black.u-px-30
      //-       ul.u-pt-100
      //-         li(v-for="item in headerLinks")
      //-           a.popup-menu__item(:href='`#${ item.title }`') {{ item.title.toUpperCase() }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState({
      prePage: 'isReverse',
      getFullViewState: 'fullView',
    }),
    getLogoClassList() {
      return {
        'pointer-initial': this.prePage,
        'hidden': this.getFullViewState
      }
    }
  }
}
</script>
