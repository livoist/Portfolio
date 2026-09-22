<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Scrollbar from 'smooth-scrollbar'
import Mouse from '@/mouse/mouseEvent'
import { Contact, Header, OverlayDetail, TransitionBlock, TransitionOverlay } from '@c'
import { EnterView, GridLists } from '@/views'
import { usePortfolioStore } from '@/stores/portfolio'
import '@css/main.css'

const store = usePortfolioStore()

const firstEl = ref<HTMLElement | null>(null)
const secEl = ref<HTMLElement | null>(null)

const getLangTrnsState = computed(() => ({ transition: store.isGlbTransition }))
const getSecPageTrnsState = computed(() => ({ hidden: store.fullView, 'ovh-auto': !store.fullView }))
const getFstPageTrsnState = computed(() => ({ 'content--hidden': store.isReverse }))

function getTransitionElems() {
  store.setFirstEl(firstEl.value)
  store.setSecEl(secEl.value)
}

function mouseEvent() {
  const mouseCursor = new Mouse()
  mouseCursor.render()
}

function scrollEvent() {
  const secondPage = document.querySelector<HTMLElement>('.content--second')
  if (secondPage) Scrollbar.init(secondPage, { damping: 0.03 })
}

onMounted(() => {
  mouseEvent()
  getTransitionElems()
  scrollEvent()
})
</script>

<template>
  <div id="mousemoveScope">
    <div class="mousemoveScope__cursor__pointer"></div>

    <div id="app">
      <TransitionOverlay />

      <div class="switchLangTransition" :class="getLangTrnsState">
        <Header />

        <div class="content--second" ref="secEl" :class="getSecPageTrnsState">
          <GridLists />
          <Contact />
        </div>

        <TransitionBlock />

        <div class="content--first" :class="getFstPageTrsnState" ref="firstEl">
          <div class="content__move">
            <div class="content__reverse">
              <EnterView />
            </div>
          </div>
        </div>

        <OverlayDetail />
      </div>
    </div>
  </div>
</template>
