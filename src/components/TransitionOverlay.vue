<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()

const isOverlayIn = computed(() => store.isOverlayIn)
const isOverlayOut = computed(() => store.isOverlayOut)
</script>

<template>
  <div>
    <div class="overlay-in" :class="{ active: isOverlayIn }"></div>
    <div class="overlay-out" :class="{ active: isOverlayOut }"></div>
  </div>
</template>

<style scoped>
.overlay-in,
.overlay-out {
  width: 100vw;
  height: 100vh;
  position: absolute;
  will-change: transform;
  transform: scaleX(0);
  z-index: 999;
  transition: transform 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.overlay-in {
  transform-origin: right center;
  background: #0e0e0e;
}
.overlay-in.active {
  transform-origin: left center;
  transform: scale(1);
}

.overlay-out {
  transform-origin: left center;
  background: #efecea;
}
.overlay-out.active {
  transform-origin: right center;
  transform: scale(1);
}
</style>
