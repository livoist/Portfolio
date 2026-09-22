import type Engine from './engine'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EngineConstructor = new (...args: any[]) => Engine

const { innerWidth, innerHeight } = window

// NOTE: this mixin is composed together with HandleCameraOrbit via decorator syntax
// in EnterView.vue (`@FullScreenInBackground @HandleCameraOrbit(...) class CustomEngine
// extends Engine {}`), where the actual constructor-argument chain gets exercised.
// Kept 1:1 with the original's positional-arg passing here; revisit when EnterView.vue
// is ported (Phase 5) if the composed constructor args need straightening out.
export default function FullScreenInBackground<TBase extends EngineConstructor>(Target: TBase) {
  return class extends Target {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(innerWidth, innerHeight, args[0])

      // Put automatically the canvas in background
      this.dom.style.position = 'absolute'
      this.dom.style.top = '0'
      this.dom.style.left = '0'
      this.dom.style.zIndex = '-1'
      this.dom.id = '#canvas'
      document.getElementsByClassName('person')[0]?.appendChild(this.dom)
      this.resize = this.resize.bind(this)

      window.addEventListener('resize', this.resize)
      window.addEventListener('orientationchange', this.resize)
      this.resize()
    }

    resize(): void {
      super.resize(innerWidth, innerHeight)
    }
  }
}
