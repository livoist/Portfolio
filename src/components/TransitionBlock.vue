<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const overlays = ref<HTMLElement[]>([])

function getOverlaysElems() {
  store.getOverlaysElems(overlays.value)
}

onMounted(() => {
  getOverlaysElems()
})
</script>

<template>
  <div>
    <div v-for="n in 4" :key="n" class="overlay" :class="`overlay--${n}`" ref="overlays">
      <div class="overlay__inner" :class="`overlay__inner--color-${n}`">
        <div v-if="n === 1" class="portfolioTitle">{{ store.rotateLayoutName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolioTitle {
  font-size: 1.2vw;
  text-align: center;
  letter-spacing: 0.5vw;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(5deg);
}
@media only screen and (max-width: 768px) {
  .portfolioTitle {
    font-size: 3.75vmin;
    letter-spacing: 1.25vmin;
  }
}
</style>
