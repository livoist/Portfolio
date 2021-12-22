<template lang="pug">
.choiceInfo
  p {{ $t('lang-des') }}
  .en(@click="switchLang('en')" :class="{ 'active': curLangType === 'en' }") En
  .jp(@click="switchLang('jp')" :class="{ 'active': curLangType === 'jp' }") Jp
</template>

<script>
export default {
  name: 'LangSwitcher',
  data() {
    return {
      curLangType: 'en'
    }
  },
  methods: {
    switchLang(type) {
      this.$store.dispatch('setI18nLangType', type)
      this.$i18n.locale = type
      this.curLangType = type
    },
  }
}
</script>