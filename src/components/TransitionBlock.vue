<template lang="pug">
div
  .overlay(
    v-for="n in 4"
    :class="`overlay--${n}`"
    ref="overlays"
  )
    .overlay__inner(:class="`overlay__inner--color-${n}`")
      .portfolioTitle(v-if="n === 1") {{ getCurRotateLayoutName }}

</template>

<script>
export default {
  name: 'TransitionBlock',
  computed: {
    getCurRotateLayoutName() {
      return this.$store.state.rotateLayoutName
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
  font-size: 1.2vw
  text-align: center
  letter-spacing: 0.5vw
  color: #ffffff
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%) rotate(5deg)
  +breakpoint(sm)
    font-size: 3.75vmin
    letter-spacing: 1.25vmin
</style>
