<script setup lang="ts">
import { markRaw, onMounted, ref, watch } from 'vue'
import { Expo, Quad, Quint, TimelineMax } from 'gsap'
import charming from 'charming'
import { CustomLineGenerator, Engine, FullScreenInBackground, HandleCameraOrbit } from '@/meshAn'
import RotateLayout from '@/rotateLayout/rotateLayout'
import { usePortfolioStore } from '@/stores/portfolio'
import { LoadingPage } from '@c'

const store = usePortfolioStore()

const enTitle1 = ref<HTMLElement | null>(null)
const enTitle2 = ref<HTMLElement | null>(null)
const jpTitle1 = ref<HTMLElement | null>(null)
const jpTitle2 = ref<HTMLElement | null>(null)
const enterBtn = ref<HTMLElement | null>(null)
// NOTE: the original read `this.$refs.textAn`, but no template element ever carried
// `ref="textAn"` — it was always undefined there too. Kept as an always-null ref so
// the GSAP calls below stay 1:1 with the original (harmless no-op targets).
const textAn = ref<HTMLElement | null>(null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pageToggleTimeline: any = ''
const step2State = ref(false)

function getStep1State(val: boolean) {
  // NOTE: the original assigned to `this.step2State` here (a typo for step1State) —
  // an ad hoc property nothing else in the component reads. Preserved as-is.
  step2State.value = val
}

watch(
  () => store.isLoadingPage,
  (val) => {
    if (!val) {
      setTimeout(() => {
        meshLine()
      }, 6500)
    }
  },
  { immediate: true }
)

function enterViewTimeline() {
  // NOTE: the original built two lookalike objects (`firstPageContent1`/`2`) keyed
  // `enTitle1`/`enTitle2` vs `jpTitle1`/`jpTitle2`, then animated `timelineTarget.jobTitle1`
  // /`.jobTitle2` below — a property neither object had, so those two `.to()` calls always
  // animated `undefined` regardless of language. Normalized to one `titleEl1`/`titleEl2`
  // pair per language so the title actually animates.
  const timelineTarget =
    store.lang === 'en'
      ? { titleEl1: enTitle1.value, titleEl2: enTitle2.value, textAn: textAn.value, enterBtn: enterBtn.value }
      : { titleEl1: jpTitle1.value, titleEl2: jpTitle2.value, textAn: textAn.value, enterBtn: enterBtn.value }

  const randomFloat = (min: number, max: number) => parseFloat(Math.min(min + Math.random() * (max - min), max).toFixed(2))

  const prePage = document.querySelector('.logo')
  const nextPage = enterBtn.value

  const overlays: RotateLayout[] = []
  const overlaysTotal = store.overlayElems.length
  store.overlayElems.forEach((overlay, i) => overlays.push(new RotateLayout(overlay, { angle: i % 3 === 0 ? -5 : 5 })))

  const enterNextPage = () => {
    store.setEnterMainPageState(true)

    const nextPageName = store.lang === 'en' ? 'Portfolio' : 'ポートフォリオ'

    store.canReverse(true)
    store.switchTnsName(nextPageName)

    const ease = Expo.easeInOut
    const duration = 1.3

    pageToggleTimeline = new TimelineMax()
      .to(timelineTarget.titleEl1, duration, {
        ease,
        opacity: 0,
        y: '-8%',
      }, 0)
      .to(timelineTarget.titleEl2, duration * 1.25, {
        ease,
        opacity: 0,
        y: '-8%',
      }, 0)
      .to(timelineTarget.textAn, duration, {
        ease,
        opacity: 0,
        y: '-8%',
      }, 0)
      .to(timelineTarget.enterBtn, duration * 0.6, {
        ease,
        opacity: 0,
      }, 0)
      .to(store.firstPageEl, duration, {
        ease,
        opacity: 0,
      }, 0)
      .fromTo(
        store.gridItems,
        {
          y: () => randomFloat(10, 200),
        },
        {
          duration: 1.25,
          ease: 'Expo.easeOut',
          y: 0,
          opacity: 1,
          delay: 0.85,
        }
      )

    store.secPageEl?.classList.add('ovh-auto')

    let t = 0
    for (let i = 0; i <= overlaysTotal - 1; i++) {
      t = 0.25 * i + 0.25
      pageToggleTimeline.to(
        overlays[overlaysTotal - 1 - i].DOM.inner,
        duration,
        {
          ease,
          y: '-100%',
        },
        i >= 3 ? t * 1.75 : t
      )
    }
  }

  const introPage = async () => {
    const prePageName = store.lang === 'en' ? 'Visual' : 'ビジュアル'

    store.canReverse(false)
    store.switchTnsName(prePageName)

    await pageToggleTimeline.reverse()
    store.secPageEl?.classList.remove('ovh-auto')
  }

  if (nextPage) nextPage.addEventListener('click', enterNextPage)
  if (prePage) prePage.addEventListener('click', introPage)
}

function meshLine() {
  const staticProps = {
    width: 0.08, // meshLine width
    nbrOfPoints: 4, // meshLine turn point
  }

  // auto background canvas + camera perspective, composed the same way the original
  // stacked `@FullScreenInBackground @HandleCameraOrbit({x:4,y:4})` class decorators.
  // Cast to a zero-arg constructor: FullScreenInBackground/HandleCameraOrbit hardcode
  // their own args internally (see their NOTE comments), so the public constructor
  // really does take none, but TS widens the generic mixin chain's inferred signature.
  const ComposedEngine = FullScreenInBackground(HandleCameraOrbit({ x: 4, y: 4 })(Engine)) as unknown as new () => Engine
  const engine = new ComposedEngine()

  const linegenerator = new CustomLineGenerator({ frequency: 0.2 }, staticProps, () => store.colorMap)
  linegenerator.start()

  engine.add(linegenerator)
  engine.start()

  // markRaw: skip wrapping the THREE.js instance in a reactive proxy — it's an
  // imperative handle (MeshLineSwitcher.vue calls .rebuild() on it), not view state.
  store.setLineGenerator(markRaw(linegenerator))
}

function charmingText() {
  // charming text and add span tag
  const targetArray = [enTitle1.value, enTitle2.value, jpTitle1.value, jpTitle2.value]
  targetArray.forEach((item) => item && charming(item))

  // select all span tag text
  const letterAnimTargets = [
    ...(enTitle1.value?.querySelectorAll('span') ?? []),
    ...(enTitle2.value?.querySelectorAll('span') ?? []),
    ...(jpTitle1.value?.querySelectorAll('span') ?? []),
    ...(jpTitle2.value?.querySelectorAll('span') ?? []),
  ]

  // random sort
  letterAnimTargets.sort(() => Math.round(Math.random()) - 0.5)
  // random < 0.5
  let letters = letterAnimTargets.filter(() => Math.random() < 0.5)
  // add EventListener func
  const onEnterHoverFn = () => {
    // random > 0.5
    letters = letterAnimTargets.filter(() => Math.random() > 0.5)
    // NOTE: GSAP 2's `.staggerTo(targets, duration, vars, stagger, position)` no longer
    // exists in GSAP 3 — stagger now lives inside `vars.stagger`, dropping the separate
    // 5-argument form. Ported to the GSAP 3 signature (targets, duration, vars, position).
    new TimelineMax({ onComplete: () => {} })
      .staggerTo(
        letters,
        0.2,
        {
          ease: Quad.easeIn,
          y: '-100%',
          opacity: 0,
          stagger: 0.04,
        },
        0
      )
      .staggerTo(
        letters,
        0.6,
        {
          ease: Quint.easeOut,
          startAt: { y: '55%' },
          y: '0%',
          opacity: 1,
          stagger: 0.04,
        },
        0.4
      )
  }
  // add mouseenter event on btn
  enterBtn.value?.addEventListener('mouseenter', onEnterHoverFn)
}

onMounted(() => {
  pageToggleTimeline = new TimelineMax()
  charmingText()
  enterViewTimeline()
})
</script>

<template>
  <div id="about" class="wrapper">
    <div class="person container">
      <LoadingPage @step1-state="getStep1State" />

      <div class="person-content" :class="{ transition: store.isGlbTransition }">
        <div class="en-heading" :class="{ show: store.lang === 'en' }">
          <div class="person-heading c1" ref="enTitle1">More Try</div>
          <div class="person-heading c2" ref="enTitle2">More Possibility</div>
        </div>
        <div class="jp-heading" :class="{ show: store.lang === 'jp' }">
          <div class="person-heading c1" ref="jpTitle1">より多くの探索</div>
          <div class="person-heading c2" ref="jpTitle2">より多くの可能性</div>
        </div>

        <a class="btn btn-enter" ref="enterBtn" href="javascript:void('0')">{{ $t('home-btn') }}</a>
      </div>
    </div>
  </div>
</template>
