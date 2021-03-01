<template lang="pug">
.sideMenu
  ul
    li(
      v-for="item in sideLists" 
      class="item.title.toLowerCase()"
    ) {{ item.title }}
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      sideLists: [
        {
          title: 'Home',
        },
        {
          title: 'Portfolio'
        },
        {
          title: 'Contact'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.sideMenu
  position: fixed
  z-index: 100
  right: 0
  top: 0
  height: 100vh
  width: 126px
  background: #efecea
  ul
    padding: 0 20px
    position: absolute
    right: 0
    top: 33%
    li
      padding: 20px 0
      letter-spacing: 5px
      text-align: center
      cursor: pointer
      font-weight: bold
      margin-bottom: 70px
      font-size: 12px
      transition: 0.3s
      transform: rotate(90deg)
      &:hover
        color: orange
</style>