import { TweenLite, Power4 } from 'gsap'

export default class MouseCursor {
  constructor () {
    this.page = document.querySelector('#app')
    // mouse range
    const cursor = document.querySelector('.mousemoveScope__cursor__pointer')
    // cursor
    TweenLite.to(cursor, {
      autoAlpha: 0
    })
  }

  // cursor move position
  moveMousePos (e) {
    const mousePosX = e.clientX
    const mousePosY = e.clientY
    const cursor = document.querySelector('.mousemoveScope__cursor__pointer')
    TweenLite.to(cursor, {
      x: mousePosX,
      y: mousePosY,
      ease: Power4.easeOut
    })
  }

  enterMouse () {
    const cursor = document.querySelector('.mousemoveScope__cursor__pointer')
    TweenLite.to(cursor, {
      autoAlpha: 1,
      ease: Power4.easeIn
    })
  }

  // listener range
  handleMousePos () {
    if (window.innerWidth > 1024) {
      this.page.addEventListener('mouseenter', this.enterMouse)
      this.page.addEventListener('mousemove', this.moveMousePos, false)
    }
  }

  updateOnHover (e) {
    const { tagName, className } = e.target
    // update hover status, if tag === target change class
    console.log('e', e.target.className)
    if (
      tagName === 'A'
      || tagName === 'BUTTON'
      || tagName === 'IMG'
      || e.target.classList.contains('gridItem')
      || e.target.classList.contains('fullViewNext')
      || e.target.classList.contains('fullViewClose')
      || e.target.parentElement.tagName === 'A'
    ) {
      // switch class
      document.querySelector('html').classList.toggle('is-hover')
    }
  }

  // update cursor
  handleLinkHover () {
    if (window.innerWidth > 1024) {
      this.page.addEventListener('mouseover', this.updateOnHover.bind(this))
      this.page.addEventListener('mouseout', this.updateOnHover.bind(this))
    }
  }

  render () {
    this.handleMousePos()
    this.handleLinkHover()
  }
}