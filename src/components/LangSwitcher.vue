<template lang="pug">
.choiceInfo
  p {{ $t('lang-des') }}
  .langBtn(
    v-for="item in langList"
    :class="{ 'active': curLangType === item.lang}"
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

<style lang="sass">
.langBtn
  +setFlex
  +size(16px)
  padding: 4px
  color: #000
  border-radius: 2px
  margin: 0 5px
  font-size: 12px
  transition: 0.5s
  cursor: pointer
  position: relative
  z-index: 1
  &.active
    background: rgba(#000,0.7)
    color: #fff
    pointer-events: none
    &:after
      opacity: 0
  &:hover
    z-index: 100
    @media (min-width: 996px)
      &:after
        opacity: 1
  &:after
    content: ''
    +setPosAbs(50%,null,null,50%)
    transform: translate(-50%,-50%)
    +size(100%)
    border: 1px solid rgba(#000,0.3)
    border-radius: 2px
    transition: 1s
    opacity: 0

</style>
