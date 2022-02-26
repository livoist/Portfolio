<template lang="pug">
.preloadingAn(
  :class="[{ 'enter': loadingAnStep1 }, { 'event-none': isEventNone }]"
)
  .preloadingText(:class="{ 'enter': loadingAnStep1 }") {{ $t('loading-des') }}
  a.anMaterial(:class="{ 'enter': loadingAnStep2 }")
    span(@click="startLoadingAn") {{ $t('loading-btn') }}
    .line(v-for="n in 4")

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
      }, 2000)
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

@keyframes changeText
  0%
    color: #efecea
  100%
    color: #000

@keyframes changeBg
  0%
    background: #000
  100%
    background: #efecea

@keyframes changeRectColor
  0%
    transform: translateX(-50%) rotate(315deg)
    border-color: #efecea
    color: #efecea
  100%
    transform: translateX(-50%) rotate(315deg)
    border-color: #000
    color: #000

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
  z-index: 100
  background: #000
  &.enter
    animation: changeBg 1s both, materialNoneAn 2s 2.5s both
  &.event-none .anMaterial, .anMaterial2
    pointer-events: none
  .preloadingText
    +setPosAbs(50%,null,null,50%)
    color: #efecea
    font-size: 18px
    transform: translate(-50%,-50%)
    width: 100%
    text-align: center
    letter-spacing: 4px
    +breakpoint(sm)
      font-size: 3vmin
      top: 43%
    &.enter
      animation: changeText 1s both, materialNoneAn 1.5s 1.5s both
  .anMaterial
    +size(50px)
    +setPosAbs(55%,null,null,50%)
    transform: translate(-50%,-50%)
    color: #efecea
    +breakpoint(sm)
      top: 50%
      transform: translate(-50%,-50%) scale(0.8)
    &.enter
      animation: materialNoneAn 0.5s both
      &:before,&:after
        animation: changeRectColor 0.5s both
    .line
      +setPosAbs(60%,null,null,50%)
      transform: translate(-50%,-50%)
      box-sizing: border-box
      +size(100%)
      border: 1px solid #efecea
      @for $i from 1 through 4
        &:nth-of-type(#{$i})
          @if $i == 1
            animation: rotateRect1 5s both
          @if $i == 2
            animation: rotateRect2 5s both
          @if $i == 3 or $i == 4
            display: none

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

    // 7: #876363, 8: #414B6F, 9: #E6B6C2, 10: #D4587A, 11: #DC364C, 12: #778633
    $colorAry: (1: #fff, 2: #EE3239, 3: #5EAA5F, 4: #FECE00, 5: #9D6AB9, 6: #FFEFA1, 7: #FFB21A)
    $colorAry2: (1: #000, 2: #efecea, 3: #000, 4: #efecea, 5: #000, 6: #efecea, 7: #000)

    span
      +size(90%)
      display: inline-block
      &:before
        content: ''
        position: absolute
        +size(100%)
        left: 50%
        top: 50%
        background: transparent
        transform: translate(-50%,-50%)
        z-index: -1
      @each $pos, $color in $colorAry2
        @keyframes colorfulRotate#{$pos}
          0%
            background: transparent
          5%
            background: $color
            transform: translate(-50%,-50%) rotate((($pos - 1) * 22.5deg))
          100%
            background: $color
            transform: translate(-50%,-50%) rotate($pos * 22.5deg)
        // @keyframes beforeRotate#{$pos}
        //   0%
        //     background: transparent
        //   5%
        //     background: rgba(#fff,0.2)
        //     transform: translate(-50%,-50%) rotate((($pos - 1) * 18.5deg))
        //   100%
        //     background: rgba(#fff,0.2)
        //     transform: translate(-50%,-50%) rotate($pos * 18.5deg)
        &:nth-of-type(#{$pos})
          +setPosAbs(50%,null,null,50%)
          transform: translate(-50%,-50%) rotate((($pos - 1) * 22.5deg))
          &.start
            animation: colorfulRotate#{$pos} 0.4s #{$pos * 0.2}s both
            // &:before
            //   animation: beforeRotate#{$pos} 0.4s #{$pos * 0.2}s both

</style>
