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
export default {
  name: 'TransitionBlock',
  computed: {
    curName() {
      return this.$store.state.tnsName
    }
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
