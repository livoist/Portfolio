import { gsap } from 'gsap'

export default class MouseCursor {
  private readonly page: HTMLElement | null
  private readonly cursor: HTMLElement | null
  private readonly xTo: (value: number) => void
  private readonly yTo: (value: number) => void

  constructor() {
    // mouse scope
    this.page = document.querySelector<HTMLElement>('#app')

    // get cursor
    this.cursor = document.querySelector<HTMLElement>('.mousemoveScope__cursor__pointer')
    gsap.to(this.cursor, {
      opacity: 0,
    })

    // quickTo sets up the tween once and just updates its target value on each
    // call, instead of `gsap.to()` creating a brand new tween on every mousemove
    // (which can fire 100+ times/sec) — much cheaper for high-frequency updates.
    this.xTo = gsap.quickTo(this.cursor, 'x', { ease: 'power4.out' })
    this.yTo = gsap.quickTo(this.cursor, 'y', { ease: 'power4.out' })

    this.moveMousePos = this.moveMousePos.bind(this)
    this.enterMouse = this.enterMouse.bind(this)
  }

  // get mouse pos
  moveMousePos(e: MouseEvent): void {
    this.xTo(e.clientX)
    this.yTo(e.clientY)
  }

  enterMouse(): void {
    gsap.to(this.cursor, {
      opacity: 1,
      ease: 'power4.in',
    })
  }

  // listener scope
  handleMousePos(): void {
    if (window.innerWidth > 1024) {
      this.page?.addEventListener('mouseenter', this.enterMouse)
      this.page?.addEventListener('mousemove', this.moveMousePos)
    }
  }

  updateOnHover(e: MouseEvent): void {
    // update hover status, if tag === target change class
    const target = e.target as Element
    const parent = target.parentElement

    const normalTargetMap = [
      'A',
      'BUTTON',
      'IMG',
      'gridItem',
      'fullViewNext',
      'fullViewClose',
      'viewOverlayClose',
      'anMaterial',
      'flexBox',
      'preBtn',
      'nextBtn',
    ]

    const cursorNoneMap = ['en', 'jp', 'colorMapBtn', 'choiceInfo']

    const isContainsTarget = (target_: string | string[]): boolean => {
      const checkContainTarget = (list: string): boolean =>
        target.classList.contains(list) ||
        !!parent?.classList.contains(list) ||
        target.tagName === list ||
        parent?.tagName === list

      return Array.isArray(target_) ? target_.some((item) => checkContainTarget(item)) : checkContainTarget(target_)
    }

    // add normal cursor
    if (isContainsTarget(normalTargetMap)) {
      document.querySelector('html')?.classList.toggle('normalCursor')
    }

    // change cursor z-index
    if (isContainsTarget('fab') && isContainsTarget('A')) {
      document.querySelector('html')?.classList.toggle('changeCursorZindex')
    }

    // custom cursor none
    if (isContainsTarget(cursorNoneMap)) {
      document.querySelector('html')?.classList.toggle('customCursorNone')
    }
  }

  // update mouse
  handleLinkHover(): void {
    if (window.innerWidth > 1024) {
      this.page?.addEventListener('mouseover', this.updateOnHover.bind(this))
      this.page?.addEventListener('mouseout', this.updateOnHover.bind(this))
    }
  }

  render(): void {
    this.handleMousePos()
    this.handleLinkHover()
  }
}
