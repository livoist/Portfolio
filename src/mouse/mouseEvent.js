import { TweenLite, Power4 } from 'gsap'

export default class MouseCursor {
  constructor () {
    // mouse scope
    this.page = document.querySelector('#app')

    // get cursor
    const cursor = document.querySelector('.mousemoveScope__cursor__pointer')
    TweenLite.to(cursor, {
      autoAlpha: 0
    })
  }

  // get mouse pos
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

  // listener scope
  handleMousePos () {
    if (window.innerWidth > 1024) {
      this.page.addEventListener('mouseenter', this.enterMouse)
      this.page.addEventListener('mousemove', this.moveMousePos, false)
    }
  }

  updateOnHover (e) {
    // update hover status, if tag === target change class
    const { tagName } = e.target

    if (
      tagName === 'A'
      || tagName === 'BUTTON'
      || tagName === 'IMG'
      || e.target.classList.contains('gridItem')
      || e.target.classList.contains('fullViewNext')
      || e.target.classList.contains('fullViewClose')
      || e.target.classList.contains('viewOverlayClose')
      || e.target.classList.contains('colorMapBtn')
      || e.target.parentElement.tagName === 'A'
    ) {
      // switch style1
      document.querySelector('html').classList.toggle('is-hover')
    }

    if (
      (e.target.classList.contains('fab') && tagName === 'A')
    ) {
      // switch style2
      document.querySelector('html').classList.toggle('is-hover2')
    }
  }

  // update mouse
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