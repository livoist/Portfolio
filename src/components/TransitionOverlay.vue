<template lang="pug">
div
  .overlay-in(:class="{ 'active': isOverlayIn }")
  .overlay-out(:class="{ 'active': isOverlayOut }")

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TransitionOverlay',
  computed: {
    ...mapState({
      isOverlayIn: 'isOverlayIn',
      isOverlayOut: 'isOverlayOut',
    })
  }
}
</script>

<style lang="sass" scoped>
.overlay-in,.overlay-out
  +size(100vw,100vh)
  position: absolute
  will-change: transform
  transform: scaleX(0)
  z-index: 999
  transition: transform 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86)

.overlay-in
  transform-origin: right center
  background: #0e0e0e
  &.active
    transform-origin: left center
    transform: scale(1)

.overlay-out
  transform-origin: left center
  background: #efecea
  &.active
    transform-origin: right center
    transform: scale(1)

</style>
