import type Engine from './engine'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EngineConstructor = new (...args: any[]) => Engine

// NOTE: this mixin is composed together with HandleCameraOrbit via decorator syntax
// in EnterView.vue (`@FullScreenInBackground @HandleCameraOrbit(...) class CustomEngine
// extends Engine {}`), where the actual constructor-argument chain gets exercised.
// Kept 1:1 with the original's positional-arg passing here; revisit when EnterView.vue
// is ported (Phase 5) if the composed constructor args need straightening out.
export default function FullScreenInBackground<TBase extends EngineConstructor>(Target: TBase) {
  return class extends Target {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(window.innerWidth, window.innerHeight, args[0])

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
      // Initial sizing must always run: this.width/height already equal the viewport
      // (set by the Engine constructor), so going through this.resize() would hit the
      // "size unchanged" early return below and the renderer would never be sized.
      super.resize(window.innerWidth, window.innerHeight)
    }

    // Read the viewport size at call time. It used to come from a module-level
    // `const { innerWidth, innerHeight } = window`, captured once when this module was
    // first evaluated — so every later resize re-applied that stale size and the canvas
    // never followed the window.
    resize(): void {
      const w = window.innerWidth
      const h = window.innerHeight
      // renderer.setSize() reallocates the WebGL drawing buffer, so skip it when nothing
      // changed — e.g. a device rotation fires both `orientationchange` and `resize`.
      if (w === this.width && h === this.height) return
      super.resize(w, h)
    }
  }
}
