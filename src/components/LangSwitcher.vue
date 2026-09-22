<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePortfolioStore } from '@/stores/portfolio'
import type { I18nLang } from '@/stores/portfolio'

const store = usePortfolioStore()
const { locale } = useI18n({ useScope: 'global' })

const langInfo = ref<HTMLElement | null>(null)
const curLangType = ref<I18nLang>('en')
const langList: { name: string; lang: I18nLang }[] = [
  { name: 'En', lang: 'en' },
  { name: 'Ja', lang: 'jp' },
]

watch(
  () => store.isLoadingPage,
  (val) => {
    if (!val) delayAddClass()
  }
)

function langBtnClassList(target: I18nLang) {
  return { active: curLangType.value === target }
}

function delayAddClass() {
  setTimeout(() => langInfo.value?.classList.add('normalStyle'), 2000)
}

function switchLang(type: I18nLang) {
  store.setGlbTransitionState(true)
  setTimeout(() => store.setGlbTransitionState(false), 1000)

  store.setI18nLangType(type)
  setTimeout(() => {
    locale.value = type
  }, 1000)
  curLangType.value = type
}
</script>

<template>
  <div class="choiceInfo lang" ref="langInfo">
    <p class="lang">{{ $t('lang-des') }}</p>
    <div
      v-for="item in langList"
      :key="item.lang"
      class="langBtn"
      :class="langBtnClassList(item.lang)"
      @click="switchLang(item.lang)"
    >{{ item.name }}</div>
  </div>
</template>

<style>
.choiceInfo.lang {
  margin: 0;
}
.choiceInfo p.lang {
  color: #efecea;
}
.choiceInfo.normalStyle p.lang {
  color: rgba(0, 0, 0, 0.7);
}
.choiceInfo.normalStyle .langBtn {
  color: rgba(0, 0, 0, 0.7);
}
.choiceInfo.normalStyle .langBtn.active {
  background: rgba(0, 0, 0, 0.7);
  color: #efecea;
}
.choiceInfo.normalStyle .langBtn::after {
  border-color: rgba(0, 0, 0, 0.7);
}

.langBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 4px;
  color: #efecea;
  border-radius: 2px;
  margin: 0 5px;
  font-size: 12px;
  transition: 1s;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.langBtn.active {
  background: #efecea;
  color: #000;
  pointer-events: none;
}
.langBtn.active::after {
  opacity: 0;
}
.langBtn:hover {
  z-index: 100;
}
@media (min-width: 996px) {
  .langBtn:hover::after {
    opacity: 1;
  }
}
.langBtn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 1px solid rgba(239, 236, 234, 0.3);
  border-radius: 2px;
  transition: 1s;
  opacity: 0;
}
</style>
