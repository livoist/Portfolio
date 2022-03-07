<template lang="pug">
.choiceInfo.lang(ref="langInfo")
  p.lang {{ $t('lang-des') }}
  .langBtn(
    v-for="item in langList"
    :class="langBtnClassList(item.lang)"
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
  watch: {
    isLoading: {
      handler(val) {
        if(!val) {
          this.delayAddClass()
        }
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoagingPage
    }
  },
  methods: {
    langBtnClassList(target) {
      return { 'active': this.curLangType === target }
    },
    delayAddClass() {
      setTimeout(() => { this.$refs.langInfo.classList.add('normalStyle') }, 2000)
    },
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
.choiceInfo
  &.lang
    margin: 0
  p.lang
    color: #efecea
  &.normalStyle
    p.lang
      color: rgba(#000,0.7)
    .langBtn
      color: rgba(#000,0.7)
      &.active
        background: rgba(#000,0.7)
        color: #efecea
      &:after
        border-color: rgba(#000,0.7)

.langBtn
  +setFlex
  +size(16px)
  padding: 4px
  color: #efecea
  border-radius: 2px
  margin: 0 5px
  font-size: 12px
  transition: 1s
  cursor: pointer
  position: relative
  z-index: 1
  &.active
    background: #efecea
    color: #000
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
    border: 1px solid rgba(#efecea,0.3)
    border-radius: 2px
    transition: 1s
    opacity: 0

</style>
