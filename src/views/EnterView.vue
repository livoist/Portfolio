<template lang="pug">
#about.wrapper
  .person.container
    LoadingPage(@step1State="getStep1State")

    .person-content(:class="{ 'transition': isGlbTransition }")
      .en-heading(:class="{ 'show': curI18nLang === 'en'}")
        .person-heading.c1(ref="enTitle1") More Try
        .person-heading.c2(ref="enTitle2") More Possibility
      .jp-heading(:class="{ 'show': curI18nLang === 'jp'}")
        .person-heading.c1(ref="jpTitle1") より多くの探索
        .person-heading.c2(ref="jpTitle2") より多くの可能性

      a.btn.btn-enter(
        ref="enterBtn"
        href="javascript:void('0')"
      ) {{ $t('home-btn') }}

</template>

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
import { LoadingPage } from '@c'

export default {
  name: 'EnterView',
  data () {
    return {
      engine: '',
      step1State: false
    }
  },
  components: {
    LoadingPage
  },
  computed: {
    ...mapState({
      getGridItems: 'gridItems',
      getOverlays: 'overlayElems',
      getFirstPageEl: 'firstPageEl',
      getSecPageEl: 'secPageEl',
      curI18nLang: 'lang',
      isGlbTransition: 'isGlbTransition',
      isEnterMainPage: 'isEnterMainPage',
      isLoadingPage: 'isLoagingPage'
    })
  },
  watch: {
    isLoadingPage: {
      immediate: true,
      handler(val) {
        if (!val) {
          setTimeout(() => {
            this.meshLine()
          }, 6500)
        }
      }
    }
  },
  methods: {
    getStep1State(val) {
      this.step2State = val
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
      this.curI18nLang === 'en'
        ? timelineTarget = firstPageContent1
        : timelineTarget = firstPageContent2

      const randomFloat = (min, max) => parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(2))

      const prePage = document.querySelector('.logo')
      const nextPage = enterBtn

      const overlays = []
      const overlaysTotal = this.getOverlays.length
      this.getOverlays.forEach((overlay, i) => overlays.push(new RotateLayout(overlay, { angle: i % 3 === 0 ? -5 : 5 })))

      const enterNextPage = () => {
        this.$store.dispatch('setEnterMaingPageState', true)

        let nextPageName
        this.curI18nLang === 'en'
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
        this.curI18nLang === 'en'
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

      const linegenerator = new CustomLineGenerator({frequency: 0.2}, static_props)
      linegenerator.start()

      engine.add(linegenerator)
      engine.start()
    },
    charmingText () {
      const { enterBtn, enTitle1, enTitle2, jpTitle1, jpTitle2 } = this.$refs

       // charming text and add span tag
      const targetArray = [enTitle1, enTitle2, jpTitle1, jpTitle2]
      targetArray.forEach(item => charming(item))

      // select all span tag text
      const letterAnimTargets = [
        ...enTitle1.querySelectorAll('span'),
        ...enTitle2.querySelectorAll('span'),
        ...jpTitle1.querySelectorAll('span'),
        ...jpTitle2.querySelectorAll('span')
      ]

      // random sort
      letterAnimTargets.sort(() => Math.round(Math.random()) - 0.5)
      // random < 0.5
      let letters = letterAnimTargets.filter(() => Math.random() < 0.5)
      // add EventListener func
      const onEnterHoverFn = () => {
        // random > 0.5
        letters = letterAnimTargets.filter(() => Math.random() > 0.5)
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
      enterBtn.addEventListener('mouseenter', onEnterHoverFn)
    }
  },
  mounted () {
    this.charmingText()
    this.enterViewTimeline()
  }
}
</script>
