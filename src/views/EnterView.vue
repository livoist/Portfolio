<template lang="pug">
#about.wrapper
  .person.container
    //- .preloadingAn(ref="preloadingAn")
    //-   .preloadingText(ref="preloadingText") Welcome Ben Porfolio Website

    .job-title(ref="title") Front-End Developer

    .person-content
      .person-heading(ref="heading") Hello I&apos;m Ben
      .input-text(ref="input") Start Coding?
      a.btn.btn-enter(
        ref="btn" href.prevent="javascript:void('0')"
        @click="showNextPage"
      ) ENTER

</template>

<style lang="sass" scoped>
@keyframes transitionBgAn
  0%
    opacity: 1
    z-index: 100
  65%
    opacity: 1
  100%
    opacity: 0
    z-index: -1

@keyframes textNoneAn
  0%
    opacity: 1
    z-index: 100
    color: #000
    letter-spacing: 4px
  65%
    opacity: 1
    letter-spacing: 8px
  100%
    color: #000
    opacity: 0
    z-index: -1
    letter-spacing: 8px

@keyframes mobileTextNoneAn
  0%
    opacity: 1
    z-index: 100
    color: #000
    letter-spacing: 0.75vmin
  65%
    opacity: 1
    letter-spacing: 1.25vmin
  100%
    color: #000
    opacity: 0
    z-index: -1
    letter-spacing: 1.25vmin

@keyframes fullBorderAn
  0%
    width: 25vw
  100%
    width: 100vw

@keyframes fillBarAn
  0%
    width: 0
  10%
    width: 5vw
  25%
    width: 30vw
  99%
    width: 30vw
  100%
    width: 100vw

@keyframes mobileFillBarAn
  0%
    width: 0
  10%
    width: 5vw
  25%
    width: 30vw
  100%
    width: 100vw

.preloadingAn
  +size(100vw,100vh)
  position: absolute
  background: #efecea
  z-index: 100
  cursor: none
  &.enter
    animation: transitionBgAn 6s 5s both
    +breakpoint(sm)
      animation-duration: 7s
  .preloadingText
    +setPosition(absolute,50%,null,null,50%)
    color: #000
    font-size: 14px
    transform: translate(-50%,-50%)
    width: 100%
    text-align: center
    +breakpoint(sm)
      font-size: 3vmin
    &.enter
      animation: textNoneAn 5s 3s both
      +breakpoint(sm)
        animation: mobileTextNoneAn 5.5s 4s both
    &::after
      content: ''
      +setPosition(absolute,null,null,-20px,50%)
      +size(25vw,1px)
      transform: translateX(-50%)
      background: #000
      animation: fullBorderAn 6s 4s both
    &::before
      content: ''
      +setPosition(absolute,null,null,-20px,50%)
      +size(25vw,1px)
      transform: translateX(-50%)
      background: #efecea
      animation: fillBarAn 8s 1s both
      z-index: 2
      +breakpoint(sm)
        animation: mobileFillBarAn 8s 1s both
</style>

<script>
import { TimelineMax, Quad, Quint, Expo } from 'gsap/all'
import { 
  Engine,
  CustomLineGenerator,
  HandleCameraOrbit,
  FullScreenInBackground
} from '@/meshAn'
import charming from 'charming'

export default {
  name: 'EnterView',
  data () {
    return {
      engine: '',
      pageToggleTimeline: '',
      viewTimeline: ''
    }
  },
  computed: {
    getGridItems() {
      return this.$store.state.gridItems
    }
  },
  methods: {
    preloadingAn() {
      const { preloadingAn, preloadingText } = this.$refs
      preloadingText.classList.add('enter')
      preloadingAn.classList.add('enter')
    },
    showNextPage() {
      this.$store.dispatch('showNextPage', { comName: 'GridLists', tnsName: 'Portfolio', hidden: true, page: true })
      this.enterViewTimeline()
    },
    initTimelineMax() {
      this.pageToggleTimeline = new TimelineMax()
      this.$store.dispatch('initTimeline', this.pageToggleTimeline)
    },
    enterViewTimeline() {
      const { title, heading, input, btn } = this.$refs

      const randomFloat = (min, max) => parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(2))

      const firstPageContent = {
        jobText: title,
        heading: heading,
        inputAn: input,
        enterBtn: btn
      }
      
        const ease = Expo.easeInOut;
        const duration = 1.3;

        this.viewTimeline = new TimelineMax()
        .to(firstPageContent.jobText, duration * 0.7, {
            ease: ease,
            opacity: 0
        }, 0)
        .to(firstPageContent.heading, duration, {
            ease: ease,
            opacity: 0,
            y: '-100%',
        }, 0)
        .to(firstPageContent.inputAn, duration, {
            ease: ease,
            opacity: 0,
            y: '-100%',
        }, 0)
        .to(firstPageContent.enterBtn, duration * 0.6, {
            ease: ease,
            opacity: 0
        }, 0)
        .fromTo(this.getGridItems, {
          y: () => randomFloat(100, 500)
        }, {
          duration: 1,
          ease: 'Expo.easeOut',
          y: 0,
          opacity: 1,
          delay: 0.5
        })

        this.$store.dispatch('curTimeline', this.viewTimeline)
        console.log('curTimeline', this.viewTimeline)
        console.log('store time', this.$store.state.curTimeline)
        console.log('store time2', this.$store.state.timeline)

        console.log('===', this.$store.state.curTimeline === this.$store.state.timeline)
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
      const hoverEffect = {
        // event btn
        button: document.querySelector('.btn-enter'),
        // animation text
        personal: document.querySelector('.person-heading')
      }
      // charming text add span tag
      charming(hoverEffect.personal)
      // select all span tag text
      hoverEffect.personalLetters = [...hoverEffect.personal.querySelectorAll('span')]
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
      // add mouseenter event in btn
      hoverEffect.button.addEventListener('mouseenter', onEnterHoverFn)
    }
  },
  mounted () {
    // window.addEventListener('load', this.preloadingAn())
    this.charmingText()
    this.meshLine()
    this.initTimelineMax()

    // this.viewTimeline
  },
  beforeDestory() {
    // window.removeEventListener('load', this.preloadingAn())
    window.removeEventListener('mouseenter', this.charmingText())
  }
}
</script>
