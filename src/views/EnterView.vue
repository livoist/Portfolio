<template lang="pug">
#about.wrapper
  .person.container
    LoadingPage(
      @step2State="getStep2State"
      @step1State="getStep1State"
    )

    .person-content(:class="{ 'transition': isGlbTransitionState }")
      .en-heading(:class="{ 'show': getI18nLang === 'en'}")
        .person-heading.c1(ref="enTitle1") More Try
        .person-heading.c2(ref="enTitle2") More Possibility
      .jp-heading(:class="{ 'show': getI18nLang === 'jp'}")
        .person-heading.c1(ref="jpTitle1") より多くの探索
        .person-heading.c2(ref="jpTitle2") より多くの可能性

      a.btn.btn-enter(
        ref="enterBtn"
        href="javascript:void('0')"
      ) {{ $t('home-btn') }}

  .choiceInfos
    .choiceInfo.lines(:class="{ 'show': step2State }")
      p {{ $t('line-des') }}
      .flexBox
        .colorMapBtn(
          v-for="(item, idx) in colorMaps"
          :style="{ background: item[1] }"
          :class="getColorMapClassList(idx)"
          @click="switchMeshLineColorMap(item, idx)"
        )
    LangSwitcher

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
import { LangSwitcher, LoadingPage } from '@c'

export default {
  name: 'EnterView',
  data () {
    return {
      engine: '',
      step2State: false,
      step1State: false,
      colorMaps: [
        ['#EE3239', '#5EAA5F', '#FECE00', '#9D6AB9'],
        ['#FFEFA1', '#FFB21A', '#876363', '#414B6F'],
        ['#E6B6C2', '#D4587A', '#DC364C', '#778633']
      ],
      curColorMap: 0,
      canSwitchColorMap: true
    }
  },
  components: {
    LangSwitcher,
    LoadingPage
  },
  computed: {
    ...mapState({
      getGridItems: 'gridItems',
      getOverlays: 'overlayElems',
      getFirstPageEl: 'firstPageEl',
      getReverse: 'isReverse',
      getFullView: 'fullView',
      getSecPageEl: 'secPageEl',
      getI18nLang: 'lang',
      isGlbTransitionState: 'isGlbTransition'
    })
  },
  watch: {
    step1State: {
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
    getStep2State(val) {
      this.step2State = val
    },
    getStep1State(val) {
      this.step1State = val
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
    enterViewTimeline() {
      const {
        enTitle1,
        enTitle2,
        jpTitle1,
        jpTitle2,
        textAn,
        enterBtn
      } = this.$refs

      const firstPageContent1 = {
        enTitle1: enTitle1,
        enTitle2: enTitle2,
        textAn: textAn,
        enterBtn: enterBtn
      }

      const firstPageContent2 = {
        jpTitle1: jpTitle1,
        jpTitle2: jpTitle2,
        textAn: textAn,
        enterBtn: enterBtn
      }

      let timelineTarget
      this.getI18nLang === 'en'
        ? timelineTarget = firstPageContent1
        : timelineTarget = firstPageContent2

      const randomFloat = (min, max) => parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(2))

      const prePage = document.querySelector('.logo')
      const nextPage = enterBtn

      const overlays = []
      const overlaysTotal = this.getOverlays.length
      this.getOverlays.forEach((overlay, i) => overlays.push(new RotateLayout(overlay, { angle: i % 3 === 0 ? -5 : 5 })))

      const enterNextPage = () => {
        let nextPageName
        this.getI18nLang === 'en'
          ? nextPageName = 'Portfolio'
          : nextPageName = 'ポートフォリオ'

        this.$store.dispatch('canReverse', true)
        this.$store.dispatch('switchTnsName', nextPageName)

        const ease = Expo.easeInOut
        const duration = 1.3
  
        this.pageToggleTimeline = new TimelineMax()
          .to(timelineTarget.jobTitle1, duration, {
              ease: ease,
              opacity: 0,
              y: '-100%',
          }, 0)
          .to(timelineTarget.jobTitle2, duration * 1.25, {
              ease: ease,
              opacity: 0,
              y: '-100%',
          }, 0)
          .to(timelineTarget.textAn, duration, {
              ease: ease,
              opacity: 0,
              y: '-100%',
          }, 0)
          .to(timelineTarget.enterBtn, duration * 0.6, {
              ease: ease,
              opacity: 0
          }, 0)
          .to(this.getFirstPageEl, duration, {
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

        this.getSecPageEl.classList.add('ovh-auto')

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
        let prePageName
        this.getI18nLang === 'en'
          ? prePageName = 'Visual'
          : prePageName = 'ビジュアル'

        this.$store.dispatch('canReverse', false)
        this.$store.dispatch('switchTnsName', prePageName)

        await this.pageToggleTimeline.reverse()
        this.getSecPageEl.classList.remove('ovh-auto')
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
      const { enterBtn, enTitle1, enTitle2, jpTitle1, jpTitle2 } = this.$refs
      const hoverEffect = {
      // event btn
        enterBtn: enterBtn,
        // animation text
        enTitle1: enTitle1,
        enTitle2: enTitle2,
        jpTitle1: jpTitle1,
        jpTitle2: jpTitle2
      }
      // charming text add span tag
      charming(hoverEffect.enTitle1)
      charming(hoverEffect.enTitle2)
      charming(hoverEffect.jpTitle1)
      charming(hoverEffect.jpTitle2)

      // select all span tag text
      hoverEffect.personalLetters = [
        ...hoverEffect.enTitle1.querySelectorAll('span'),
        ...hoverEffect.enTitle2.querySelectorAll('span'),
        ...hoverEffect.jpTitle1.querySelectorAll('span'),
        ...hoverEffect.jpTitle2.querySelectorAll('span')
      ]
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
