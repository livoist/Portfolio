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
    const { clientX, clientY } = e
    const cursor = document.querySelector('.mousemoveScope__cursor__pointer')

    TweenLite.to(cursor, {
      x: clientX,
      y: clientY,
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

    const normalTargetMap = [
      'A', 'BUTTON', 'IMG',
      'gridItem', 'fullViewNext',
      'fullViewClose', 'viewOverlayClose',
      'anMaterial', 'flexBox'
    ]

    const cursorNoneMap = [
      'en', 'jp',
      'colorMapBtn', 'choiceInfo'
    ]

    const isContainsTarget = (target) => {
      let result

      const checkContainTarget = (list) => {
        return e.target.classList.contains(list)
        || e.target.parentElement.classList.contains(list)
        || e.target.tagName === list
        || e.target.parentElement.tagName === list
      }

      if (Array.isArray(target)) {
        result = target.some(item => checkContainTarget(item))
      } else {
        result = checkContainTarget(target)
      }

      return result
    }

    // add normal cursor
    if (isContainsTarget(normalTargetMap)) {
      document.querySelector('html').classList.toggle('normalCursor')
    }

    // change cursor z-index
    if (isContainsTarget('fab') && isContainsTarget('A')) {
      document.querySelector('html').classList.toggle('changeCursorZindex')
    }

    // custom cursor none
    if (isContainsTarget(cursorNoneMap)) {
      document.querySelector('html').classList.toggle('customCursorNone')
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