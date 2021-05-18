<template lang="pug">
#about.wrapper
  .person.container
    .preloadingAn(:class="{ 'enter': loadingAn }")
      .preloadingText(:class="{ 'enter': loadingAn }") Welcome Ben Porfolio Website
      .anMaterial(:class="{ 'enter': loadingAn }")

    .person-content
      .person-heading.c1(ref="jobTitle1") FrontEnd
      .person-heading.c2(ref="jobTitle2") Developer

      a.btn.btn-enter(
        ref="enterBtn"
        href.prevent="javascript:void('0')"
      ) ENTER

</template>

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

.preloadingAn
  +size(100vw,100vh)
  position: absolute
  background: #efecea
  z-index: 100
  cursor: none
  &.enter
    animation: materialNoneAn 2s 8s both
    +breakpoint(sm)
      animation-duration: 7s
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
    &.enter
      animation: materialNoneAn 1s 7s both
      +breakpoint(sm)
        animation: materialNoneAn 5.5s 4s both
  .anMaterial
    +size(100%)
    +setPosition(absolute,50%,null,null,50%)
    transform: translate(-50%,-50%)
    animation: materialNoneAn 1s 6.5s both
    &::after,&::before
      content: ''
      +setPosition(absolute,60%,null,null,50%)
      +size(50px)
      border: 1px solid #000
      box-sizing: border-box
    &::after
      animation: rotateRect1 7s both
    &::before
      animation: rotateRect2 7s both
    
</style>

<script>
import { mapState } from 'vuex'
import { TimelineMax, Quad, Quint, Expo } from 'gsap'
import { 
  Engine,
  CustomLineGenerator,
  HandleCameraOrbit,
  FullScreenInBackground
} from '@/meshAn'
import RotateLayout from '@/rotateLayout/rotateLayout.js'
import charming from 'charming'

export default {
  name: 'EnterView',
  data () {
    return {
      engine: '',
      loadingAn: false
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
  methods: {
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
        this.$store.dispatch('switchTnsName', 'VisionPage')

        await this.pageToggleTimeline.reverse()
        secEl.classList.remove('ovh-auto')
      }

      if (nextPage) nextPage.addEventListener('click', enterNextPage)
      if (prePage) prePage.addEventListener('click', introPage)
    },
    meshLine() {
      const static_props = {
        width: 0.08, // meshLine width
        nbrOfPoints: 4 // meshLine turn point 
      }

      @FullScreenInBackground // auto background canvas
      @HandleCameraOrbit({x: 4, y: 4}) // camera perspective

      class CustomEngine extends Engine {} // init customEngine
      this.engine = new CustomEngine()

      const linegenerator = new CustomLineGenerator({frequency: 0.2}, static_props)
      linegenerator.start()

      this.engine.add(linegenerator)
      this.engine.start()
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
    this.loadingAn = true
    setTimeout(() => {
      this.meshLine()
    }, 9000)
  }
}
</script>
