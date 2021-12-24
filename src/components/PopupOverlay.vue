<template lang="pug">
.nav.u-z-index_7
  //-a.menu-toggle(href='#popup-overlay')
    span

  #popup-overlay.popup-menu
    a.popup-menu__close.u-z-index_7(href='#!')
      span
      span

    .bar-container.bg-black.u-px-30
      ul.u-pt-100
        li(v-for="item in headerLinks")
          a.popup-menu__item(:href='`#${ item.title }`') {{ item.title.toUpperCase() }}

</template>

<script>
export default {
  name: 'PopupOverlay',
  data() {
    return {
      headerLinks: []
    }
  }
}
</script>

<style lang="sass" scoped>
.nav
  visibility: hidden
  opacity: 0
  display: none
  +breakpoint(sm)
    visibility: visible
    opacity: 1
    display: block

.navbar
  .navbar__social-bar
    padding: 24px
    display: inline-block

  .menu-toggle
    +size(50px)
    display: block
    box-sizing: border-box
    cursor: pointer
    position: relative
    &:hover span
      &::before
        transform-origin: center left;
        transform: scaleX(0)
      &::after
        transform-origin: center right;
        transform: scaleX(0)
    span
      +size(32px,2px)
      display: block
      background-color: #000
      margin-bottom: 8px
      transition: all 0.3s
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
      &::before,&::after
        content: ''
        position: absolute
        +size(32px,2px)
        background-color: #000
        left: 0
        right: 0
        transition: transform 0.5s ease
        transform: scaleX(1)
      &::before
        top: -10px
        transform-origin: center right
      &::after
        bottom: -10px
        transform-origin: center left

  .popup-menu
    +size(100%)
    +setPosition(fixed,0,null,null,0)
    opacity: 0
    visibility: hidden
    transform: translateY(-100%)
    background-color: white
    transition: all 0.6s
    display: flex

.bar-container
  position: relative
  width: 100%
  margin: 0 auto
  ul
    width: 70vw
    margin: 0 auto

.navbar
  .popup-menu__close
    +setPosAbs(10px,10px,null,null)
    +size(50px)
    transition: all 0.3s
    span
      +size(32px,2px)
      background-color: black
      +setPosAbs(50%,50%,null,null)
      &:nth-child(1)
        transform: translate(50%, 50%) rotate(-45deg)
      &:nth-child(2)
        transform: translate(50%, 50%) rotate(45deg)

  .popup-menu .popup-menu__item
    display: block
    text-align: center
    position: relative
    +setFont(20px,900,null,rgb(82, 82, 82))
    line-height: 80px
    opacity: 0
    transition: color .5s, transform 1s .5s

  .popup-menu .popup-menu__item
    &::before
      +size(5px)
      content: ''
      border-radius: 50%
      background-color: black
      +setPosAbs(50%,null,null,13vw)
      opacity: 0
      transition: .5s
      transform: translateY(-50%)
    &:hover
      color: #fede43
      &::before
        opacity: 1

.bg-black
  background-color: rgb(247, 247, 247)

.navbar #popup-overlay:target
  visibility: visible
  opacity: 1
  transform: translateY(0%)
  .popup-menu__item
    opacity: 0.85

</style>