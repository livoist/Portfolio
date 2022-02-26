<template lang="pug">
.choiceInfo.lines(
  :class="getChoiceInfoClassList")
  p {{ $t('line-des') }}
  .flexBox
    .colorMapBtn(
      v-for="(item, idx) in colorMaps"
      :style="{ background: item[1] }"
      :class="getColorMapClassList(idx)"
      @click="switchMeshLineColorMap(item, idx)"
    )

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MeshLineSwitcher",
  data() {
    return {
      colorMaps: [
        ['#FEB75D', '#55C9EA', '#013B63', '#000E2B'],
        ["#EE3239", "#5EAA5F", "#FECE00", "#9D6AB9"],
        ["#FFEFA1", "#FFB21A", "#876363", "#414B6F"],
        ["#E6B6C2", "#D4587A", "#DC364C", "#778633"],
      ],
      curColorMap: 0,
      canSwitchColorMap: true,
    };
  },
  computed: {
    ...mapState({
      isEnterMainPage: "isEnterMainPage",
      isTimelineReverse: "isReverse",
      isLoadingPage: "isLoagingPage",
    }),
    getChoiceInfoClassList() {
      return {
        'show': !this.isLoadingPage && !this.isTimelineReverse,
        'duration1': this.isLoadingPage || !this.isLoadingPage,
        'duration2': this.isEnterMainPage
      };
    },
  },
  methods: {
    getColorMapClassList(idx) {
      return {
        'active': this.curColorMap === idx,
        'pointer-none': !this.canSwitchColorMap,
        'prevent':
          (this.curColorMap !== idx && !this.canSwitchColorMap) ||
          this.curColorMap !== idx,
      };
    },
    switchMeshLineColorMap(item, idx) {
      setTimeout(() => { this.$store.dispatch("switchColorMap", item) }, 750)
      this.curColorMap = idx;

      const meshCanvas = document.getElementById("#canvas")
      meshCanvas.classList.add("tnsCanvas")

      this.canSwitchColorMap = false

      setTimeout(() => {
        meshCanvas.classList.remove("tnsCanvas")
        this.canSwitchColorMap = true
      }, 3000);
    },
  },
};
</script>

<style lang="sass">
.colorMapBtn
  +size(30px)
  border-radius: 50%
  margin-bottom: 20px
  cursor: pointer
  position: relative
  transition: 2s
  margin: 0 0.25vw
  z-index: 1
  +breakpoint(sm)
    +size(4vmin)
    margin: 0 0.75vw
  &.pointer-none, &.active
    pointer-events: none
  &.prevent
    opacity: 0.1
    @media (min-width: 996px)
      &:hover
        opacity: 1

</style>