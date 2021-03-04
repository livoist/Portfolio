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
import RotateLayout from '@/rotateLayout/rotateLayout.js'

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

      const layouts = []
      overlays.forEach((overlay, i) => layouts.push(new RotateLayout(overlay, { angle: i % 3 === 0 ? -5 : 5 })))
      this.$store.dispatch('getRotateLayout', layouts)
    }
  },
  mounted() {
    this.getOverlaysElems()
  }
}
</script>

<style lang="sass" scoped>
.portfolioTitle
  font-size: 42px
  letter-spacing: 20px
  color: #ffffff
  position: absolute
  left: 50%
  top: 50%
  transform: rotate(5deg) translate(-50%, -50%)
</style>
