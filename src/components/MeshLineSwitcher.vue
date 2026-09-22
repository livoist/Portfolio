<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()

const colorMaps: string[][] = [
  ['#FEB75D', '#55C9EA', '#013B63', '#000E2B'],
  ['#EE3239', '#5EAA5F', '#FECE00', '#9D6AB9'],
  ['#FFEFA1', '#FFB21A', '#876363', '#414B6F'],
  ['#E6B6C2', '#D4587A', '#DC364C', '#778633'],
]

const curColorMap = ref(0)
const canSwitchColorMap = ref(true)

const getChoiceInfoClassList = computed(() => ({
  show: !store.isLoadingPage && !store.isReverse,
  duration1: store.isLoadingPage || !store.isLoadingPage,
  duration2: store.isEnterMainPage,
}))

function getColorMapClassList(idx: number) {
  return {
    active: curColorMap.value === idx,
    'pointer-none': !canSwitchColorMap.value,
    prevent: (curColorMap.value !== idx && !canSwitchColorMap.value) || curColorMap.value !== idx,
  }
}

function switchMeshLineColorMap(item: string[], idx: number) {
  curColorMap.value = idx

  const meshCanvas = document.getElementById('#canvas')
  if (!meshCanvas) return

  canSwitchColorMap.value = false

  // Sequence: click -> opacity reaches 0 (canvas.tnsCanvas, a 2s CSS transition in
  // main.css) -> swap the color map + rebuild the lines while fully hidden -> opacity
  // goes back to 1. Wait for the fade-out's own `transitionend` instead of guessing a
  // fixed delay, so the swap can never land mid-fade (visible) or before the canvas is
  // actually transparent.
  let swapped = false
  const swap = () => {
    if (swapped) return
    swapped = true
    meshCanvas.removeEventListener('transitionend', onFadeOut)

    store.switchColorMap(item)
    store.lineGenerator?.rebuild()

    meshCanvas.classList.remove('tnsCanvas')
    canSwitchColorMap.value = true
  }

  const onFadeOut = (event: TransitionEvent) => {
    if (event.propertyName === 'opacity') swap()
  }

  meshCanvas.addEventListener('transitionend', onFadeOut)
  // Fallback in case `transitionend` never fires (e.g. reduced-motion settings
  // skipping the CSS transition entirely) so the switch can't get stuck hidden.
  setTimeout(swap, 2200)

  meshCanvas.classList.add('tnsCanvas')
}
</script>

<template>
  <div class="choiceInfo lines" :class="getChoiceInfoClassList">
    <p>{{ $t('line-des') }}</p>
    <div class="flexBox">
      <div
        v-for="(item, idx) in colorMaps"
        :key="idx"
        class="colorMapBtn"
        :style="{ background: item[1] }"
        :class="getColorMapClassList(idx)"
        @click="switchMeshLineColorMap(item, idx)"
      ></div>
    </div>
  </div>
</template>

<style>
.colorMapBtn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  transition: 2s;
  margin: 0 0.25vw;
  z-index: 1;
}
@media only screen and (max-width: 768px) {
  .colorMapBtn {
    width: 4vmin;
    height: 4vmin;
    margin: 0 0.75vw;
  }
}
.colorMapBtn.pointer-none,
.colorMapBtn.active {
  pointer-events: none;
}
.colorMapBtn.prevent {
  opacity: 0.1;
}
@media (min-width: 996px) {
  .colorMapBtn.prevent:hover {
    opacity: 1;
  }
}
</style>
