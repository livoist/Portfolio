<template lang="pug">
#about.wrapper
  .person.container
    .preloadingAn(:class="{ 'enter': loadingAnStep1 }")
      .preloadingText(:class="{ 'enter': loadingAnStep1 }") Welcome Ben Porfolio Website
      .anMaterial(:class="{ 'enter': loadingAnStep2 }")
        span(@click="startLoagingAn") enter

      .anMaterial2(:class="{ 'enter': loadingAnStep1 }")
        span(:class="{ 'start': loadingAnStep2 }" v-for="n in 12")

    .person-content
      .person-heading.c1(ref="jobTitle1") Frontend
      .person-heading.c2(ref="jobTitle2") Developer

      a.btn.btn-enter(
        ref="enterBtn"
        href="javascript:void('0')"
      ) ENTER

  .switchColorMaps(:class="{ 'show': loadingAnStep2 }")
    p Switch LineColors
    .flexBox
      .colorMapBtn(
        v-for="(item, idx) in colorMaps"
        :style="{ background: item[1] }"
        :class="getColorMapClassList(idx)"
        @click="switchMeshLineColorMap(item, idx)"
      )
  //- .switchBgModal(@click="switchBgModal()") switch

</template>

<script>
import { mapState } from 'vuex'
import { TimelineMax, Quad, Quint, Expo } from 'gsap'
import { 
  Engine,
  CustomLineGenerator,
  HandleCameraOrbit,
  FullScreenInBackground,
  AnimatedText3D,
  Hastouch
} from '@/meshAn'
import RotateLayout from '@/rotateLayout/rotateLayout.js'
import charming from 'charming'

export default {
  name: 'EnterView',
  data () {
    return {
      engine: '',
      loadingAnStep1: false,
      loadingAnStep2: false,
      colorMaps: [
        ['#EE3239', '#5EAA5F', '#FECE00', '#9D6AB9'],
        ['#FFEFA1', '#FFB21A', '#876363', '#414B6F'],
        ['#E6B6C2', '#D4587A', '#DC364C', '#778633']
      ],
      curColorMap: 0,
      canSwitchColorMap: true
    }
  },
  computed: {
    ...mapState({
      getGridItems: 'gridItems',
      getOverlays: 'overlayElems',
      getFirstElems: 'firstEl',
      getReverse: 'isReverse',
      getFullView: 'fullView'
    })
  },
  watch: {
    loadingAnStep1: {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.meshLine()
          }, 2000)
        }
      }
    }
  },
  methods: {
    switchBgModal() {
      const body = document.body
      body.classList.add('darkModal')
    },
    getColorMapClassList(idx) {
      return {
        'active': this.curColorMap === idx,
        'pointer-none': !this.canSwitchColorMap,
        'prevent': (this.curColorMap !== idx && !this.canSwitchColorMap) || this.curColorMap !== idx
      }
    },
    switchMeshLineColorMap(item, idx) {
      this.$store.dispatch('switchColorMap', item)
      this.curColorMap = idx

      const meshCanvas = document.getElementById('#canvas')
      meshCanvas.classList.add('tnsCanvas')

      this.canSwitchColorMap = false

      setTimeout(() => {
        meshCanvas.classList.remove('tnsCanvas')
        this.canSwitchColorMap = true
      }, 1500)
    },
    startLoagingAn() {
      this.loadingAnStep2 = true
      setTimeout(() => {
        this.loadingAnStep1 = true
      }, 2500)
    },
    enterViewTimeline() {
      const { jobTitle1, jobTitle2, textAn, enterBtn } = this.$refs
      const firstPageContent = {
        // jobTitle: jobTitle,
        jobTitle1: jobTitle1,
        jobTitle2: jobTitle2,
        textAn: textAn,
        enterBtn: enterBtn
      }

      const randomFloat = (min, max) => parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(2))

      const prePage = document.querySelector('.logo')
      const nextPage = enterBtn

      const secEl = document.querySelector('.content--second')

      const overlays = []
      const overlaysTotal = this.getOverlays.length
      this.getOverlays.forEach((overlay, i) => overlays.push(new RotateLayout(overlay, { angle: i % 3 === 0 ? -5 : 5 })))

      const enterNextPage = () => {
        this.$store.dispatch('canReverse', true)
        this.$store.dispatch('switchTnsName', 'Portfolio')

        const ease = Expo.easeInOut
        const duration = 1.3
  
        this.pageToggleTimeline = new TimelineMax()
        // .to(firstPageContent.jobTitle, duration * 0.7, {
        //     ease: ease,
        //     opacity: 0
        // }, 0)
        .to(firstPageContent.jobTitle1, duration, {
            ease: ease,
            opacity: 0,
            y: '-100%',
        }, 0)
        .to(firstPageContent.jobTitle2, duration * 1.25, {
            ease: ease,
            opacity: 0,
            y: '-100%',
        }, 0)
        .to(firstPageContent.textAn, duration, {
            ease: ease,
            opacity: 0,
            y: '-100%',
        }, 0)
        .to(firstPageContent.enterBtn, duration * 0.6, {
            ease: ease,
            opacity: 0
        }, 0)
        .to(this.getFirstElems, duration, {
            ease: ease,
            opacity: 0
        }, 0)
        .fromTo(this.getGridItems, {
          y: () => randomFloat(10, 200)
        }, {
          duration: 1.25,
          ease: "Expo.easeOut",
          y: 0,
          opacity: 1,
          delay: 0.85
        })

        secEl.classList.add('ovh-auto')

        let t = 0
        for (let i = 0; i <= overlaysTotal - 1; i++) {
          t = 0.25 * i + 0.25
          this.pageToggleTimeline.to(overlays[overlaysTotal - 1 - i].DOM.inner, duration, {
            ease: ease,
            y: '-100%'
          }, i >= 3 ? t * 1.75 : t)
        }
      }
      

      const introPage = async () => {
        this.$store.dispatch('canReverse', false)
        this.$store.dispatch('switchTnsName', 'Visual')

        await this.pageToggleTimeline.reverse()
        secEl.classList.remove('ovh-auto')
      }

      if (nextPage) nextPage.addEventListener('click', enterNextPage)
      if (prePage) prePage.addEventListener('click', introPage)
    },
    meshLine() {
      const static_props = {
        width: 0.08, // meshLine width
        nbrOfPoints: 4, // meshLine turn point
      }

      @FullScreenInBackground // auto background canvas
      @HandleCameraOrbit({x: 4, y: 4}) // camera perspective

      class CustomEngine extends Engine {} // init customEngine
      const engine = new CustomEngine()

      const isMobile = Hastouch()
      const threeText = new AnimatedText3D('Confetti', { color: '#0f070a', size: isMobile ? 0.6 : 0.8 })
      console.log('threeText', threeText)
      threeText.position.x -= threeText.basePosition * 0.5
      engine.add(threeText)

      const linegenerator = new CustomLineGenerator({frequency: 0.2}, static_props)
      linegenerator.start()

      engine.add(linegenerator)
      engine.start()
    },
    charmingText () {
      const { enterBtn, jobTitle1, jobTitle2 } = this.$refs
      const hoverEffect = {
        // event btn
        enterBtn: enterBtn,
        // animation text
        jobTitle1: jobTitle1,
        jobTitle2: jobTitle2
      }
      // charming text add span tag
      charming(hoverEffect.jobTitle1)
      charming(hoverEffect.jobTitle2)
      // select all span tag text
      hoverEffect.personalLetters = [...hoverEffect.jobTitle1.querySelectorAll('span'), ...hoverEffect.jobTitle2.querySelectorAll('span')]
      // random sort
      hoverEffect.personalLetters.sort(() => Math.round(Math.random()) - 0.5)
      // random < 0.5
      let letters = hoverEffect.personalLetters.filter(() => Math.random() < 0.5)
      // add EventListener func
      const onEnterHoverFn = () => {
        // random > 0.5
        letters = hoverEffect.personalLetters.filter(() => Math.random() > 0.5)
        new TimelineMax({ onComplete: () => {} })
          .staggerTo(letters, 0.2, {
            ease: Quad.easeIn,
            y: '-100%',
            opacity: 0
          }, 0.04, 0)
          .staggerTo(letters, 0.6, {
            ease: Quint.easeOut,
            startAt: { y: '55%' },
            y: '0%',
            opacity: 1
          }, 0.04, 0.4)
      }
      // add mouseenter event on btn
      hoverEffect.enterBtn.addEventListener('mouseenter', onEnterHoverFn)
    }
  },
  mounted () {
    this.charmingText()
    this.enterViewTimeline()
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
    transform: translateX(-50%) rotate3d(0,0,0,45deg)
  33%
    transform: translateX(-50%) rotate3d(0.9,0,0.9,315deg)
  66%
    transform: translateX(-50%) rotate3d(0,0,0,45deg)
  95%,100%
    transform: translateX(-50%) rotate3d(0.9,0,0.9,315deg)

@keyframes rotateRect2
  0%
    transform: translateX(-50%) rotate3d(0,0,0,-45deg)
  33%
    transform: translateX(-50%) rotate3d(0.9,0,0.9,-315deg)
  66%
    transform: translateX(-50%) rotate3d(0,0,0,-45deg)
  95%,100%
    transform: translateX(-50%) rotate3d(0.9,0,0.9,-315deg)

@keyframes delayShow
  0%
    opacity: 0
    pointer-events: none
  100%
    opacity: 1
    cursor: pointer

.switchBgModal
  position: fixed
  z-index: 100
  right: 0

.switchColorMaps
  position: absolute
  right: 40px
  top: 5%
  transition: 2s 4s
  opacity: 0
  visibility: hidden
  border-bottom: 1px solid rgba(#000,0.2)
  padding-bottom: 8px
  +setFlex
  +breakpoint(sm)
    top: 3.25%
    right: 5%
    padding-bottom: 1vmin
  &.show
    opacity: 1
    visibility: visible
  > p
    text-align: center
    margin: 0 0.75vw 0 0
    +breakpoint(sm)
      font-size: 3vmin

.flexBox
  +setFlex

.colorMapBtn
  width: 30px
  height: 30px
  border-radius: 50%
  margin-bottom: 20px
  cursor: pointer
  position: relative
  transition: 2s
  margin: 0 0.25vw
  +breakpoint(sm)
    +size(4vmin)
    margin: 0 0.75vw
  &.pointer-none
    pointer-events: none
  &.prevent
    opacity: 0.1

.preloadingAn
  +size(100vw,100vh)
  position: absolute
  background: #efecea
  z-index: 100
  &.enter
    animation: materialNoneAn 2s 1s both
  .preloadingText
    +setPosition(absolute,50%,null,null,50%)
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
      animation: materialNoneAn 1s both
  .anMaterial
    +size(50px)
    +setPosition(absolute,55%,null,null,50%)
    transform: translate(-50%,-50%)
    +breakpoint(sm)
      top: 50%
      transform: translate(-50%,-50%) scale(0.8)
    &.enter
      animation: materialNoneAn 0.3s both
    &::after,&::before
      content: ''
      +setPosition(absolute,60%,null,null,50%)
      transform: translate(-50%,-50%)
      +size(100%)
      border: 1px solid rgba(#000, 0.4)
      box-sizing: border-box
    &::after
      animation: rotateRect1 7s both
    &::before
      animation: rotateRect2 7s both
    span
      display: inline-block
      +setFlex
      +size(100%)
      +setPosition(absolute,110%,null,null,50%)
      font-size: 12px
      transform: translate(-50%,-50%) rotate3d(0,0,0,0)
      animation: delayShow 1.25s 6.5s both
      z-index: 300

  .anMaterial2
    +setPosition(absolute,59%,null,null,50%)
    transform: translate(-50%,-50%)
    z-index: 200
    +size(50px)
    pointer-events: none
    &.enter
      animation: materialNoneAn 1s both
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
          +setPosition(absolute,50%,null,null,50%)
          transform: translate(-50%,-50%) rotate((($pos - 1) * 22.5deg))
          &.start
            animation: colorfulRotate#{$pos} 2s #{$pos * 0.15}s both

</style>