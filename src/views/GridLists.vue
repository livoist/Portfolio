<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { getImg } from '@img'
import type { PortfolioListItem } from '@/stores/portfolio'

const store = usePortfolioStore()

const gridItems = ref<HTMLElement[]>([])

const gridContents: PortfolioListItem[] = [
  {
    id: 0,
    date: '2021-2022',
    skill: ['Nuxt.js', 'PWA', 'MapBox', 'RWD'],
    link: '/F2E-3-2/',
    i18Tag: 'bikeMap',
  },
  {
    id: 1,
    date: '2021-2022',
    skill: ['p5.js'],
    link: '/codeArt-1/',
    i18Tag: 'randomWorld',
  },
  {
    id: 2,
    date: '2021-2022',
    skill: ['p5.js'],
    link: '/codeArt-2/',
    i18Tag: 'colorsDove',
  },
  {
    id: 3,
    date: '2021-2022',
    skill: ['JavaScript'],
    link: '/DynamicTable/',
    i18Tag: 'dynamicTable',
  },
]

function savePortfolioList() {
  store.getPortfolioList(gridContents)
}

function getOverlayDetail(item: PortfolioListItem) {
  store.getCurFullViewID(item.id)
  store.setGridTimelineState(true)

  store.overlayIn(true)

  setTimeout(() => {
    store.setFullViewState(true)
  }, 800)

  setTimeout(() => {
    store.overlayIn(false)
  }, 1000)
}

function saveGridItems() {
  store.getGridItems(gridItems.value)
}

onMounted(() => {
  saveGridItems()
  savePortfolioList()
})
</script>

<template>
  <div>
    <div class="gridContainer">
      <div class="gridInner">
        <div
          v-for="item in gridContents"
          :key="item.id"
          class="gridItem"
          :class="`portfolio${item.id}`"
          ref="gridItems"
          @click="getOverlayDetail(item)"
        >
          <p>{{ $t(`preview-name-${item.i18Tag}`) }}</p>
          <img :src="getImg(`portfolio${item.id}.png`)" :alt="$t(`preview-name-${item.i18Tag}`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gridContainer {
  display: grid;
  height: 100vh;
}

.gridInner {
  position: relative;
  width: 90%;
  height: calc(100vh - 5vh);
  margin: auto;
  display: grid;
  grid-area: 1 / 1 / 2 / 2;
  grid-template-columns: repeat(17, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 1vw;
  margin-top: 5vw;
  box-sizing: border-box;
  perspective: 1000px;
  perspective-origin: center center;
}
@media only screen and (max-width: 768px) {
  .gridInner {
    grid-gap: 7vw;
    margin-top: 20vw;
    height: auto;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}

.gridItem {
  position: relative;
  opacity: 0;
  transform: translate3d(0, 0, 0px);
  will-change: transform;
}
.gridItem > p {
  font-size: 16px;
  font-weight: 500;
}
@media only screen and (max-width: 768px) {
  .gridItem > p {
    font-size: 3vmin;
    margin-bottom: 2vmin;
  }
}
.gridItem > img {
  cursor: pointer;
  transition: 0.35s ease-out;
  width: 100%;
}
@media (min-width: 1200px) {
  .gridItem:hover > img {
    transform: scale(0.98) !important;
  }
}
.gridItem.portfolio0 {
  grid-area: 2 / 2 / 2 / 6;
}
@media only screen and (max-width: 768px) {
  .gridItem.portfolio0 {
    grid-area: 1 / 1 / 1 / 7;
  }
}
.gridItem.portfolio1 {
  grid-area: 5 / 6 / 5 / 10;
}
@media only screen and (max-width: 768px) {
  .gridItem.portfolio1 {
    grid-area: 2 / 3 / 2 / 9;
  }
}
.gridItem.portfolio2 {
  grid-area: 5 / 14 / 5 / 18;
}
@media only screen and (max-width: 768px) {
  .gridItem.portfolio2 {
    grid-area: 3 / 1 / 3 / 7;
  }
}
.gridItem.portfolio3 {
  grid-area: 2 / 10 / 2 / 14;
}
@media only screen and (max-width: 768px) {
  .gridItem.portfolio3 {
    grid-area: 4 / 3 / 4 / 9;
  }
}
</style>
