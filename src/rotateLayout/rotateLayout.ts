import { gsap } from 'gsap'

export interface RevealerOptions {
  angle?: number
}

interface RevealerDOM {
  el: HTMLElement
  inner: HTMLElement
  reverse: HTMLElement | null
}

export default class Revealer {
  options: Required<RevealerOptions>
  DOM: RevealerDOM

  constructor(el: HTMLElement, options?: RevealerOptions) {
    this.options = { angle: 0, ...options }

    const inner = el.firstElementChild as HTMLElement

    this.DOM = {
      el,
      inner,
      reverse: inner.querySelector<HTMLElement>('.content__reverse'),
    }

    this.DOM.inner.style.width = `
			calc(100vw * ${Math.abs(Math.cos((this.options.angle * Math.PI) / 180))}
			+ 100vh * ${Math.abs(Math.sin((this.options.angle * Math.PI) / 180))})`

    this.DOM.inner.style.height = `
			calc(100vw * ${Math.abs(Math.sin((this.options.angle * Math.PI) / 180))}
			+ 100vh * ${Math.abs(Math.cos((this.options.angle * Math.PI) / 180))})`

    this.DOM.el.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`

    // NOTE: the original referenced a bare `TweenMax` global here with no import
    // anywhere in the file or a ProvidePlugin to supply it — it would have thrown a
    // ReferenceError the one time `.content__reverse` actually exists on the element.
    // Imported gsap properly and modernized to `gsap.set`.
    if (this.DOM.reverse) gsap.set(this.DOM.reverse, { rotation: -1 * this.options.angle })
  }
}
