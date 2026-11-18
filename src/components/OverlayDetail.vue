<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
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
const getProgressBarProcess = computed(() => ((curId.value + 1) / store.portfolioList.length) * 100)
const switchButtonState = computed(() => ({ 'prevent-event': isSwitch.value }))

// ===== 手機版的說明：最多顯示 4 行，需要時才展開 =====
// 只有文字真的超過 4 行才顯示「展開」；桌機版不截斷，所以永遠不會出現按鈕
const desExpanded = ref(false)
const desCanExpand = ref(false)

function checkDesOverflow() {
  // 用 DOM 順序找目前這一則（v-for 的 ref 陣列不保證順序）
  const el = detailContent.value?.querySelectorAll<HTMLElement>('.viewDes')[curId.value]
  desCanExpand.value = !!el && (desExpanded.value || el.scrollHeight > el.clientHeight + 1)
}
const recheckDes = () => nextTick(checkDesOverflow)

// 換作品時收合：展開後高度會變長，下一個作品應該從收合的狀態開始
watch(curId, () => {
  desExpanded.value = false
  recheckDes()
})
// 換語言、打開作品介紹時，文字長度或版面會變，重新判斷要不要顯示按鈕
watch(() => [store.lang, store.fullView, store.portfolioList.length], recheckDes)
onMounted(() => window.addEventListener('resize', recheckDes))
onUnmounted(() => window.removeEventListener('resize', recheckDes))

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
  if ((curId.value === store.portfolioList.length - 1 && type === 'next') || (curId.value === 0 && type === 'pre')) {
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
            <!--
              所有作品的文字疊在同一格，只顯示目前這一個：
              容器的高度固定是最長的那一則，切換到文字比較少的作品時，整個區塊不會上下跳動
            -->
            <div class="viewTextStack">
              <div
                v-for="(item, index) in store.portfolioList"
                :key="item.id"
                class="viewText"
                :class="{ current: index === curId }"
                :aria-hidden="index !== curId"
              >
                <div class="viewTitle fz-24">
                  {{ $t(`preview-name-${item.i18Tag}`) }}
                </div>
                <div class="slash"></div>
                <div class="viewTime">
                  <span>{{ $t('preview-date') }}: </span>
                  {{ item.date }}
                </div>
                <!-- 左邊是「標籤:」，右邊是標籤區：換行的標籤會對齊第一個標籤，而不是退到最左邊 -->
                <div class="viewTag">
                  <span>{{ $t('preview-tag') }}: </span>
                  <div class="viewSkillTags">
                    <div class="viewSkillTag" v-for="skill in item.skill" :key="skill">{{ skill }}</div>
                  </div>
                </div>
                <div class="mb-30">
                  <div class="viewDes" :class="{ expanded: index === curId && desExpanded }">
                    <span>{{ $t('preview-des') }}: </span>
                    {{ $t(`preview-des-content-${item.i18Tag}`) }}
                  </div>
                  <button
                    v-if="index === curId && desCanExpand"
                    type="button"
                    class="desToggle"
                    :aria-expanded="desExpanded"
                    @click="desExpanded = !desExpanded"
                  >
                    {{ $t(desExpanded ? 'preview-des-collapse' : 'preview-des-expand') }}
                  </button>
                </div>
              </div>
            </div>
            <div class="linkGroup">
              <div class="linkWrap">
                <a class="viewLink" :href="getCurViewContent.link?.startsWith('http') ? getCurViewContent.link : `https://livoist.github.io${getCurViewContent.link}`" target="_blank">{{
                  $t('preview-more-txt')
                }}</a>
                <span v-if="getCurViewContent.slowStart" class="linkNote">{{ $t('preview-slow-start') }}</span>
              </div>
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

.viewTag {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.viewTag > span {
  flex-shrink: 0;
  white-space: nowrap;
}
.viewSkillTags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px; /* 上下也留間距：換行時第二行不會跟第一行黏在一起 */
}
/* 淺灰底加細框線：看得出是標籤，又不搶標題與說明的視覺焦點 */
.viewSkillTag {
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.88);
  background: rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.55);
  padding: 0 6px;
  border-radius: 2px;
}
@media only screen and (max-width: 768px) {
  .viewTag {
    gap: 1.5vmin;
  }
  .viewSkillTags {
    gap: 1.25vmin 1.5vmin;
  }
  .viewSkillTag {
    font-size: 3vmin;
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
@media only screen and (max-width: 768px) {
  .viewDes {
    line-height: 1.7;
  }
  /* 手機版最多 4 行，按「展開」看全文 */
  .viewDes:not(.expanded) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    overflow: hidden;
  }
}
.desToggle {
  margin-top: 1vmin;
  padding: 0;
  border: none;
  background: none;
  color: #013b63;
  font-size: 3.25vmin;
  letter-spacing: 1px;
  text-decoration: underline;
  cursor: pointer;
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
.viewTextStack {
  display: grid;
}
.viewText {
  grid-area: 1 / 1;
  visibility: hidden;
}
/* `inherit`, not `visible`: an explicit `visibility: visible` on a descendant overrides
   a hidden ancestor, so the current text stayed hit-testable even while the whole
   overlay was hidden — an invisible layer that swallowed wheel events over the grid
   page and stopped smooth-scrollbar from scrolling. `inherit` follows the overlay. */
.viewText.current {
  visibility: inherit;
}
.viewContent .linkGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.linkWrap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
}
.linkNote {
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0.6;
}
@media only screen and (max-width: 768px) {
  .linkNote {
    font-size: 3vmin;
  }
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
