<template lang="pug">
div
  .overlay.overlay--1
    .overlay__inner.overlay__inner--color-1
      .portfolioTitle {{ curName }}

  .overlay.overlay--2
    .overlay__inner.overlay__inner--color-2

  .overlay.overlay--3
    .overlay__inner.overlay__inner--color-3

  .overlay.overlay--4
    .overlay__inner.overlay__inner--color-4

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
      const overlays = [...document.querySelectorAll('.overlay')]
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
