<template lang="pug">
.header
  .navbar
    .logo(:class="getLogoClassList") B

  .choiceInfos(:class="getChoiceInfosClassList")
    MeshLineSwitcher
    LangSwitcher

</template>

<script>
import { mapState } from 'vuex'
import MeshLineSwitcher from './MeshLineSwitcher.vue'
import LangSwitcher from './LangSwitcher.vue'

export default {
  name: 'Header',
  components: {
    MeshLineSwitcher,
    LangSwitcher
  },
  computed: {
    ...mapState({
      isTimelineReverse: 'isReverse',
      isFullView: 'fullView',
      isEnterMainPage: 'isEnterMainPage',
      isLoadingPage: 'isLoagingPage',
      isGlbTransition: 'isGlbTransition'
    }),
    getLogoClassList() {
      return {
        'pointer-initial': this.isTimelineReverse,
        'hidden': this.isFullView || this.isLoadingPage,
        'duration1': (this.isLoadingPage || !this.isLoadingPage),
        'duration2': this.isEnterMainPage
      }
    },
    getChoiceInfosClassList() {
      return { 'pointer-none': this.isGlbTransition }
    }
  }
}
</script>
