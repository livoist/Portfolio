<template lang="pug">
div
  .overlay(
    v-for="n in 4"
    :class="`overlay--${n}`"
    ref="overlays"
  )
    .overlay__inner(:class="`overlay__inner--color-${n}`")
      .portfolioTitle(v-if="n === 1") {{ curName }}

</template>

<script>
export default {
  name: 'TransitionBlock',
  computed: {
    curName() {
      return this.$store.state.tnsName
    }
  },
  methods: {
    getOverlaysElems() {
      const overlays = this.$refs.overlays
      this.$store.dispatch('getOverlaysElems', overlays)
    }
  },
  mounted() {
    this.getOverlaysElems()
  }
}
</script>

<style lang="sass" scoped>
.portfolioTitle
  font-size: 2vw
  text-align: center
  letter-spacing: 1vw
  color: #ffffff
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%) rotate(5deg)
</style>
