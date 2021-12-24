<template lang="pug">
.preloadingAn(
  :class="[{ 'enter': loadingAnStep1 }, { 'event-none': isEventNone }]"
)
  .preloadingText(:class="{ 'enter': loadingAnStep1 }") {{ $t('loading-des') }}
  a.anMaterial(:class="{ 'enter': loadingAnStep2 }")
    span(@click="startLoadingAn") {{ $t('loading-btn') }}

  .anMaterial2(:class="{ 'enter': loadingAnStep1 }")
    span(:class="{ 'start': loadingAnStep2 }" v-for="n in 12")

</template>

<script>
export default {
  name: 'LoadingPage',
  data() {
    return {
      loadingAnStep1: false,
      loadingAnStep2: false,
      isEventNone: false
    }
  },
  methods: {
    async startLoadingAn() {
      this.isEventNone = true
      this.loadingAnStep2 = true
      this.$emit('step2State', this.loadingAnStep2)
      await this.$store.dispatch('setLoagingPageState', false)
      setTimeout(() => {
        this.loadingAnStep1 = true
        this.$emit('step1State', this.loadingAnStep1)
      }, 2500)
    },
  }
}
</script>

<style lang="sass" scoped>
@keyframes materialNoneAn
  0%
    opacity: 1
    z-index: 100
  100%
    opacity: 0
    z-index: -1

@keyframes rotateRect1
  0%
    transform: translateX(-50%) rotate(0deg)
  33%
    transform: translateX(-50%) rotate
  66%
    transform: translateX(-50%) rotate
  95%,100%
    transform: translateX(-50%) rotate(315deg)

@keyframes rotateRect2
  0%
    transform: translateX(-50%) rotate(0deg)
  33%
    transform: translateX(-50%) rotate
  66%
    transform: translateX(-50%) rotate
  95%,100%
    transform: translateX(-50%) rotate(-315deg)

@keyframes delayShow
  0%
    opacity: 0
    pointer-events: none
  100%
    opacity: 1
    cursor: pointer

.preloadingAn
  +size(100vw,100vh)
  position: absolute
  background: #efecea
  z-index: 100
  &.enter
    animation: materialNoneAn 2s 2.5s both
  &.event-none .anMaterial, .anMaterial2
    pointer-events: none
  .preloadingText
    +setPosAbs(50%,null,null,50%)
    color: #000
    font-size: 18px
    transform: translate(-50%,-50%)
    width: 100%
    text-align: center
    letter-spacing: 4px
    +breakpoint(sm)
      font-size: 3vmin
      top: 43%
    &.enter
      animation: materialNoneAn 1.5s 1.5s both
  .anMaterial
    +size(50px)
    +setPosAbs(55%,null,null,50%)
    transform: translate(-50%,-50%)
    +breakpoint(sm)
      top: 50%
      transform: translate(-50%,-50%) scale(0.8)
    &.enter
      animation: materialNoneAn 0.5s both
    &::after,&::before
      content: ''
      +setPosAbs(60%,null,null,50%)
      transform: translate(-50%,-50%)
      +size(100%)
      border: 1px solid rgba(#000, 0.4)
      box-sizing: border-box
    &::after
      animation: rotateRect1 5s both
    &::before
      animation: rotateRect2 5s both
    span
      display: inline-block
      +setFlex
      +size(100%)
      +setPosAbs(110%,null,null,50%,300)
      font-size: 12px
      transform: translate(-50%,-50%) rotate3d(0,0,0,0)
      animation: delayShow 1.25s 4.5s both

  .anMaterial2
    +setPosAbs(58.5%,null,null,50%,200)
    transform: translate(-50%,-50%)
    +size(50px)
    pointer-events: none
    &.enter
      animation: materialNoneAn 1.5s 1.5s both
    +breakpoint(sm)
      top: 54%
      transform: translate(-50%,-50%) scale(0.8)

    $colorAry: (1: #EE3239, 2: #5EAA5F, 3: #FECE00, 4: #9D6AB9, 5: #FFEFA1, 6: #FFB21A, 7: #876363, 8: #414B6F, 9: #E6B6C2, 10: #D4587A, 11: #DC364C, 12: #778633)
    span
      +size(90%)
      display: inline-block
      @each $pos, $color in $colorAry
        @keyframes colorfulRotate#{$pos}
          0%
            background: transparent
          5%
            background: $color
            transform: translate(-50%,-50%) rotate((($pos - 1) * 22.5deg))
          100%
            background: $color
            transform: translate(-50%,-50%) rotate($pos * 22.5deg)
        &:nth-of-type(#{$pos})
          +setPosAbs(50%,null,null,50%)
          transform: translate(-50%,-50%) rotate((($pos - 1) * 22.5deg))
          &.start
            animation: colorfulRotate#{$pos} 1s #{$pos * 0.2}s both

</style>
