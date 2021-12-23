<template lang="pug">
.choiceInfo
  p {{ $t('lang-des') }}
  div(
    v-for="item in langList"
    :class="[{ 'active': curLangType === item.lang}, item.lang]"
    @click="switchLang(item.lang)"
  ) {{ item.name }}

</template>

<script>
export default {
  name: 'LangSwitcher',
  data() {
    return {
      curLangType: 'en',
      langList: [
        {
          name: 'En',
          lang: 'en'
        },
        {
          name: 'Ja',
          lang: 'jp'
        }
      ]
    }
  },
  methods: {
    switchLang(type) {
      this.$store.dispatch('setGlbTransitionState', true)
      setTimeout(() => { this.$store.dispatch('setGlbTransitionState', false) }, 1000)

      this.$store.dispatch('setI18nLangType', type)
      setTimeout(() => { this.$i18n.locale = type }, 1000)
      this.curLangType = type
    },
  }
}
</script>