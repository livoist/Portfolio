<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()

const emit = defineEmits<{
  step1State: [value: boolean]
  step2State: [value: boolean]
}>()

const loadingAnStep1 = ref(false)
const loadingAnStep2 = ref(false)
const isEventNone = ref(false)

async function startLoadingAn() {
  isEventNone.value = true
  loadingAnStep2.value = true
  emit('step2State', loadingAnStep2.value)
  store.setLoadingPageState(false)
  setTimeout(() => {
    loadingAnStep1.value = true
    emit('step1State', loadingAnStep1.value)
  }, 2000)
}
</script>

<template>
  <div class="preloadingAn" :class="[{ enter: loadingAnStep1 }, { 'event-none': isEventNone }]">
    <div class="preloadingText" :class="{ enter: loadingAnStep1 }">{{ $t('loading-des') }}</div>
    <a class="anMaterial" :class="{ enter: loadingAnStep2 }">
      <span @click="startLoadingAn">{{ $t('loading-btn') }}</span>
      <div class="line" v-for="n in 4" :key="n"></div>
    </a>

    <div class="anMaterial2" :class="{ enter: loadingAnStep1 }">
      <span :class="{ start: loadingAnStep2 }" v-for="n in 12" :key="n"></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes materialNoneAn {
  0% {
    opacity: 1;
    z-index: 100;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}

@keyframes changeText {
  0% {
    color: #efecea;
  }
  100% {
    color: #000;
  }
}

@keyframes changeBg {
  0% {
    background: #000;
  }
  100% {
    background: #efecea;
  }
}

@keyframes changeRectColor {
  0% {
    transform: translateX(-50%) rotate(315deg);
    border-color: #efecea;
    color: #efecea;
  }
  100% {
    transform: translateX(-50%) rotate(315deg);
    border-color: #000;
    color: #000;
  }
}

@keyframes rotateRect1 {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  33% {
    transform: translateX(-50%) rotate();
  }
  66% {
    transform: translateX(-50%) rotate();
  }
  95%,
  100% {
    transform: translateX(-50%) rotate(315deg);
  }
}

@keyframes rotateRect2 {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  33% {
    transform: translateX(-50%) rotate();
  }
  66% {
    transform: translateX(-50%) rotate();
  }
  95%,
  100% {
    transform: translateX(-50%) rotate(-315deg);
  }
}

@keyframes delayShow {
  0% {
    opacity: 0;
    pointer-events: none;
  }
  100% {
    opacity: 1;
    cursor: pointer;
  }
}

@keyframes colorfulRotate1 {
  0% {
    background: transparent;
  }
  5% {
    background: #000;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    background: #000;
    transform: translate(-50%, -50%) rotate(22.5deg);
  }
}
@keyframes colorfulRotate2 {
  0% {
    background: transparent;
  }
  5% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(22.5deg);
  }
  100% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
@keyframes colorfulRotate3 {
  0% {
    background: transparent;
  }
  5% {
    background: #000;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  100% {
    background: #000;
    transform: translate(-50%, -50%) rotate(67.5deg);
  }
}
@keyframes colorfulRotate4 {
  0% {
    background: transparent;
  }
  5% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(67.5deg);
  }
  100% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
@keyframes colorfulRotate5 {
  0% {
    background: transparent;
  }
  5% {
    background: #000;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  100% {
    background: #000;
    transform: translate(-50%, -50%) rotate(112.5deg);
  }
}
@keyframes colorfulRotate6 {
  0% {
    background: transparent;
  }
  5% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(112.5deg);
  }
  100% {
    background: #efecea;
    transform: translate(-50%, -50%) rotate(135deg);
  }
}
@keyframes colorfulRotate7 {
  0% {
    background: transparent;
  }
  5% {
    background: #000;
    transform: translate(-50%, -50%) rotate(135deg);
  }
  100% {
    background: #000;
    transform: translate(-50%, -50%) rotate(157.5deg);
  }
}

.preloadingAn {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  background: #000;
}
.preloadingAn.enter {
  animation: changeBg 1s 0.5s both, materialNoneAn 2s 2.5s both;
}
.preloadingAn.event-none .anMaterial,
.preloadingAn .anMaterial2 {
  pointer-events: none;
}
.preloadingAn .preloadingText {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  color: #efecea;
  font-size: 18px;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  letter-spacing: 4px;
}
@media only screen and (max-width: 768px) {
  .preloadingAn .preloadingText {
    font-size: 3vmin;
    top: 43%;
  }
}
.preloadingAn .preloadingText.enter {
  animation: changeText 1s 0.5s both, materialNoneAn 1.5s 1.5s both;
}
.preloadingAn .anMaterial {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 55%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  color: #efecea;
}
@media only screen and (max-width: 768px) {
  .preloadingAn .anMaterial {
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8);
  }
}
.preloadingAn .anMaterial.enter {
  animation: materialNoneAn 0.5s both;
}
.preloadingAn .anMaterial.enter::before,
.preloadingAn .anMaterial.enter::after {
  animation: changeRectColor 0.5s both;
}
.preloadingAn .anMaterial .line {
  position: absolute;
  top: 60%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #efecea;
}
.preloadingAn .anMaterial .line:nth-of-type(1) {
  animation: rotateRect1 5s both;
}
.preloadingAn .anMaterial .line:nth-of-type(2) {
  animation: rotateRect2 5s both;
}
.preloadingAn .anMaterial .line:nth-of-type(3),
.preloadingAn .anMaterial .line:nth-of-type(4) {
  display: none;
}
.preloadingAn .anMaterial span {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 110%;
  left: 50%;
  z-index: 300;
  font-size: 12px;
  transform: translate(-50%, -50%) rotate3d(0, 0, 0, 0);
  animation: delayShow 1.25s 4.5s both;
}
.preloadingAn .anMaterial2 {
  position: absolute;
  top: 58.5%;
  left: 50%;
  z-index: 200;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  pointer-events: none;
}
.preloadingAn .anMaterial2.enter {
  animation: materialNoneAn 1.5s 1.5s both;
}
@media only screen and (max-width: 768px) {
  .preloadingAn .anMaterial2 {
    top: 54%;
    transform: translate(-50%, -50%) scale(0.8);
  }
}
.preloadingAn .anMaterial2 span {
  width: 90%;
  height: 90%;
  display: inline-block;
}
.preloadingAn .anMaterial2 span::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  background: transparent;
  transform: translate(-50%, -50%);
  z-index: -1;
}
.preloadingAn .anMaterial2 span:nth-of-type(1) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(0deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(1).start {
  animation: colorfulRotate1 0.7s 0.2s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(2) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(22.5deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(2).start {
  animation: colorfulRotate2 0.7s 0.4s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(3) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(45deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(3).start {
  animation: colorfulRotate3 0.7s 0.6s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(4) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(67.5deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(4).start {
  animation: colorfulRotate4 0.7s 0.8s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(5) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(90deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(5).start {
  animation: colorfulRotate5 0.7s 1s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(6) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(112.5deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(6).start {
  animation: colorfulRotate6 0.7s 1.2s both;
}
.preloadingAn .anMaterial2 span:nth-of-type(7) {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(135deg);
}
.preloadingAn .anMaterial2 span:nth-of-type(7).start {
  animation: colorfulRotate7 0.7s 1.4s both;
}
</style>
