<script setup lang="ts">
// NOTE: the original `DetailView` component's entire pug template was commented
// out (`//-`) and its computed props read Vuex state keys (`curFullView`,
// `gridTimeline`) that were never defined on the store — so it rendered nothing
// and its methods were unreachable dead code. It's also never placed in any
// template (only re-exported from the components barrel); OverlayDetail.vue is
// the component that actually implements this "portfolio detail" overlay.
// Ported as an inert placeholder to keep the barrel export intact.
</script>

<template>
  <div style="display: none"></div>
</template>
