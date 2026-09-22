<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import MeshLineSwitcher from './MeshLineSwitcher.vue'
import LangSwitcher from './LangSwitcher.vue'

const store = usePortfolioStore()

const getLogoClassList = computed(() => ({
  'pointer-initial': store.isReverse,
  hidden: store.fullView || store.isLoadingPage,
  duration1: store.isLoadingPage || !store.isLoadingPage,
  duration2: store.isEnterMainPage,
}))

const getChoiceInfosClassList = computed(() => ({ 'pointer-none': store.isGlbTransition }))
</script>

<template>
  <div class="header">
    <div class="navbar">
      <div class="logo" :class="getLogoClassList">B</div>
    </div>

    <div class="choiceInfos" :class="getChoiceInfosClassList">
      <MeshLineSwitcher />
      <LangSwitcher />
    </div>
  </div>
</template>
