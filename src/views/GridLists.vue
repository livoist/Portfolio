<template lang="pug">
.gridContainer
  .gridInner
    .gridItem(
      v-for="(item, idx) in gridItems"
      :style="{ backgroundImage: `url(${bgImg(idx + 1)})` }"
      :class="item"
      ref="gridItems"
    )

</template>

<script>
export default {
  name: 'GridLists',
  data() {
    return {
      gridItems: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    }
  },
  methods: {
    bgImg(num) {
      return require(`@img/${num + 1}.jpg`)
    },
    getGridItems() {
      const gridItems = this.$refs.gridItems
      this.$store.dispatch('getGridItems', gridItems)
    }
  },
  mounted() {
    this.getGridItems()
  }
}
</script>

<style lang="sass" scoped>
.gridContainer
  display: grid
  height: 100vh

.gridInner
  position: relative
  width: 90%
  height: calc(100vh - 5vh)
  margin: auto
  display: grid
  grid-area: 1 / 1 / 2 / 2
  grid-template-columns: repeat(13, 1fr)
  grid-template-rows: repeat(8, 1fr)
  grid-gap: 1vw

.gridItem
  position: relative
  background-size: cover
  background-position: center
  opacity: 0
  filter: brightness(0.7)
  transition: 0.2s
  &:hover
    filter: brightness(1)
  &.a
    grid-area: 2 / 1 / 6 / 5
  &.b
    grid-area: 6 / 2 / 9 / 5
  &.c
    grid-area: 3 / 4 / 7 / 7
  &.d
    grid-area: 1 / 8 / 4 / 10
  &.e
    grid-area: 4 / 10 / 7 / 14
  &.f
    grid-area: 6 / 9 / 9 / 12
  &.g
    grid-area: 5 / 1 / 7 / 2
  &.h
    grid-area: 2 / 5 / 3 / 7
  &.i
    grid-area: 2 / 11 / 4 / 13
  &.j
    grid-area: 4 / 7 / 6 / 10
  &.k
    grid-area: 7 / 6 / 9 / 8
  &.l
    grid-area: 7 / 12 / 9 / 14

</style>