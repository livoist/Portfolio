<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Linear, TimelineMax } from 'gsap'
import { usePortfolioStore } from '@/stores/portfolio'
import { getImg } from '@img'

const store = usePortfolioStore()

const detailImg = ref<HTMLElement | null>(null)
const detailContent = ref<HTMLElement | null>(null)

let detailTimeline = new TimelineMax()
const curId = ref(0)
const isSwitch = ref(false)

const isFullView = computed(() => store.fullView)
const getCurViewContent = computed(() =>
  store.portfolioList.length > 0 ? store.portfolioList[curId.value] : ({} as Partial<(typeof store.portfolioList)[number]>)
)
const getProgressBarProcess = computed(() => ((curId.value + 1) / 4) * 100)
const switchButtonState = computed(() => ({ 'prevent-event': isSwitch.value }))

watch(
  () => store.curFullViewID,
  (val) => {
    curId.value = val
  },
  { immediate: true }
)

watch(
  () => store.fullView,
  (val) => {
    if (val) detailInAnim()
  },
  { immediate: true }
)

async function closeView(bool: boolean) {
  store.setGridTimelineState(bool)
  store.overlayOut(true)
  detailInAnimReverse()

  setTimeout(() => {
    store.setFullViewState(false)
  }, 800)

  setTimeout(() => {
    store.overlayOut(false)
    curId.value = 0
    store.getCurFullViewID(0)
  }, 1000)
}

function switchPortfolio(type: 'pre' | 'next') {
  if ((curId.value === 3 && type === 'next') || (curId.value === 0 && type === 'pre')) {
    closeView(true)
    return
  }

  isSwitch.value = true
  setTimeout(() => {
    isSwitch.value = false
  }, 1800)

  if (type === 'pre') {
    setTimeout(() => {
      curId.value--
      store.getCurFullViewID(curId.value)
    }, 1800)
  }
  if (type === 'next') {
    setTimeout(() => {
      curId.value++
      store.getCurFullViewID(curId.value)
    }, 1800)
  }
}

function detailInAnim() {
  detailTimeline = new TimelineMax()

  detailTimeline
    .to(detailImg.value, 1.25, {
      ease: Linear.easeIn,
      opacity: 1,
      x: '0%',
    })
    .to(detailContent.value, 0.65, {
      ease: Linear.easeIn,
      opacity: 1,
      x: '0%',
    })
}

function detailInAnimReverse() {
  detailTimeline.reverse()
}
</script>

<template>
  <div id="overlayView" :class="{ show: isFullView }">
    <div class="viewContentsInner" :class="{ show: isFullView }">
      <div class="viewContents">
        <div class="viewSwitcher">
          <div class="preBtn" @click="switchPortfolio('pre')" :class="switchButtonState">
            <svg viewBox="0 0 26 47" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z" />
            </svg>
          </div>
          <div class="progressBar">
            <div class="innerBar" :style="{ width: `${getProgressBarProcess}%` }"></div>
            <div class="portfolioNum">{{ $t(`preview-num-${curId + 1}`) }}</div>
          </div>
          <div class="nextBtn" @click="switchPortfolio('next')" :class="switchButtonState">
            <svg viewBox="0 0 26 47" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.1 46.2l2.8-2.7L5.5 23.1 25.9 2.7 23.1 0 0 23.1l23.1 23.1z" />
            </svg>
          </div>
        </div>

        <div class="viewContentGroup">
          <div class="viewContentImage" ref="detailImg" :class="{ switch: isSwitch }">
            <img
              :src="getImg(`portfolio${curId}.png`)"
              :alt="getCurViewContent.i18Tag ? $t(`preview-name-${getCurViewContent.i18Tag}`) : ''"
              :class="{ switch: isSwitch }"
            />
          </div>

          <div class="viewContent" ref="detailContent" :class="{ switch: isSwitch }">
            <div>
              <div v-if="getCurViewContent.i18Tag" class="viewTitle fz-24">
                {{ $t(`preview-name-${getCurViewContent.i18Tag}`) }}
              </div>
              <div class="slash"></div>
              <div class="viewTime">
                <span>{{ $t('preview-date') }}: </span>
                {{ getCurViewContent.date }}
              </div>
              <div class="viewTag">
                <span>{{ $t('preview-tag') }}: </span>
                <div class="viewSkillTag" v-for="item in getCurViewContent.skill" :key="item">{{ item }}</div>
              </div>
              <div v-if="getCurViewContent.i18Tag" class="viewDes mb-30">
                <span>{{ $t('preview-des') }}: </span>
                {{ $t(`preview-des-content-${getCurViewContent.i18Tag}`) }}
              </div>
            </div>
            <div class="linkGroup">
              <a class="viewLink" :href="`https://livoist.github.io${getCurViewContent.link}`" target="_blank">{{
                $t('preview-more-txt')
              }}</a>
              <div class="viewOverlayClose" @click="closeView(false)" style="cursor: pointer">
                {{ $t('preview-close-txt') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fz-24 {
  font-size: 24px;
}
@media only screen and (max-width: 768px) {
  .fz-24 {
    font-size: 4.5vmin;
  }
}

.mb-30 {
  margin-bottom: 30px;
}
@media only screen and (max-width: 768px) {
  .mb-30 {
    margin-bottom: 5vmin;
  }
}

@media only screen and (max-width: 768px) {
  .m-flex {
    display: flex;
  }
}

#overlayView {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}
#overlayView.show {
  visibility: visible;
}

.viewContentImage {
  opacity: 0;
  width: 38%;
  aspect-ratio: 8 / 5;
}
@media only screen and (max-width: 768px) {
  .viewContentImage {
    width: 80%;
  }
}
.viewContentImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 1s;
  max-width: 100%;
}
.viewContentImage img.switch {
  opacity: 0;
}

.viewContents {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
}
@media only screen and (max-width: 768px) {
  .viewContents {
    flex-direction: column;
    align-items: center;
  }
}

.viewSwitcher {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
}
@media only screen and (max-width: 768px) {
  .viewSwitcher {
    margin: 0 auto 8vmin;
  }
}
.viewSwitcher .progressBar {
  width: 200px;
  height: 2px;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 30px;
  position: relative;
}
@media only screen and (max-width: 768px) {
  .viewSwitcher .progressBar {
    width: 30vmin;
  }
}
.viewSwitcher .progressBar .portfolioNum {
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%);
  font-size: 20px;
}
@media only screen and (max-width: 768px) {
  .viewSwitcher .progressBar .portfolioNum {
    font-size: 4.5vmin;
    top: -9vmin;
  }
}
.viewSwitcher .progressBar .innerBar {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 0;
  height: 1px;
  background: #000;
  transition: width 0.5s;
}
.viewSwitcher .preBtn,
.viewSwitcher .nextBtn {
  cursor: pointer;
  position: relative;
}
.viewSwitcher .preBtn::after,
.viewSwitcher .nextBtn::after {
  content: 'Close';
  position: absolute;
  font-size: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.5s;
  opacity: 0;
}
.viewSwitcher .preBtn.prevent-event,
.viewSwitcher .nextBtn.prevent-event {
  pointer-events: none;
}
@media only screen and (max-width: 768px) {
  .viewSwitcher .preBtn,
  .viewSwitcher .nextBtn {
    line-height: 2vmin;
  }
}
.viewSwitcher .preBtn svg,
.viewSwitcher .nextBtn svg {
  width: 14px;
}
@media only screen and (max-width: 768px) {
  .viewSwitcher .preBtn svg,
  .viewSwitcher .nextBtn svg {
    width: 2vmin;
  }
}
.viewSwitcher .preBtn:after {
  left: -600%;
}
.viewSwitcher .preBtn.showLCloseHint:after {
  opacity: 1;
}
.viewSwitcher .nextBtn {
  transform: rotate(180deg);
}
.viewSwitcher .nextBtn.showRCloseHint:after {
  opacity: 1;
}
.viewSwitcher .nextBtn:after {
  left: -600%;
  transform: translateY(-50%) rotate(-180deg);
}

.slash {
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #000;
}
@media only screen and (max-width: 768px) {
  .slash {
    margin-top: 4vmin;
  }
}

.viewSkillTag {
  display: inline-block;
  margin-right: 10px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.8);
  padding: 0 6px;
  border-radius: 2px;
}
@media only screen and (max-width: 768px) {
  .viewSkillTag {
    margin-right: 1vmin;
    line-height: 1.7;
  }
}

.viewTime,
.viewTag,
.viewDes {
  line-height: 1.7;
  letter-spacing: 1px;
  font-size: 14px;
}
@media only screen and (max-width: 768px) {
  .viewTime,
  .viewTag,
  .viewDes {
    font-size: 3.25vmin;
    line-height: 2;
  }
}
.viewTime span,
.viewTag span,
.viewDes span {
  letter-spacing: 1px;
  font-size: 16px;
}
@media only screen and (max-width: 768px) {
  .viewTime span,
  .viewTag span,
  .viewDes span {
    font-size: 3.5vmin;
  }
}

.viewLink {
  border-bottom: 1px solid #013b63;
  color: #013b63;
  font-weight: bold;
}
@media only screen and (max-width: 768px) {
  .viewLink {
    font-size: 3.5vmin;
  }
}

.viewTime {
  margin-top: 10px;
}
@media only screen and (max-width: 768px) {
  .viewTime {
    margin-right: 6vmin;
  }
}

.viewTitle {
  margin-bottom: 30px;
}
@media only screen and (max-width: 768px) {
  .viewTitle {
    margin: 5vmin auto;
    text-align: center;
    letter-spacing: 1px;
  }
}

.viewContentsInner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #efecea;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}
.viewContentsInner.show {
  opacity: 1;
  visibility: visible;
}

.viewContentGroup {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
@media only screen and (max-width: 768px) {
  .viewContentGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

@keyframes delayBlurIn {
  0% {
    opacity: 1;
    filter: blur(0);
  }
  100% {
    opacity: 0;
    filter: blur(10px);
  }
}

.viewContent {
  opacity: 0;
  width: 55%;
  position: relative;
  display: flex;
  flex-direction: column;
}
@media only screen and (max-width: 768px) {
  .viewContent {
    width: 80%;
  }
}
.viewContent.switch {
  opacity: 0;
  filter: blur(2px);
  transition: 1.5s;
  animation: delayBlurIn both 0.25s 2s;
}
.viewContent .linkGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.viewOverlayClose {
  letter-spacing: 2px;
  font-size: 12px;
}
@media only screen and (max-width: 768px) {
  .viewOverlayClose {
    font-size: 3.5vmin;
  }
}
</style>
