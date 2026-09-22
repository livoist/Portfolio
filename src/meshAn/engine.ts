import { Color, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

type ColorInput = Color | string | number

export interface EngineOptions {
  backgroundColor?: ColorInput
  z?: number
}

export type UpdatableObject3D = Object3D & { update?: () => void }

export default class Engine {
  width: number
  height: number
  meshCount = 0
  meshListeners: (() => void)[] = []
  devicePixelRatio: number
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  dom: HTMLCanvasElement

  constructor(w: number, h: number, { backgroundColor, z = 10 }: EngineOptions = {}) {
    this.width = w
    this.height = h
    this.devicePixelRatio = window.devicePixelRatio ? Math.min(1.6, window.devicePixelRatio) : 1
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(this.devicePixelRatio)
    if (backgroundColor !== undefined) this.renderer.setClearColor(new Color(backgroundColor))
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(50, this.width / this.height, 1, 1000)
    this.camera.position.set(0, 0, z)

    this.dom = this.renderer.domElement

    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
  }

  /**
   * * *******************
   * * SCENE MANAGMENT
   * * *******************
   */
  add(mesh: UpdatableObject3D): void {
    this.scene.add(mesh)
    if (!mesh.update) return
    this.meshListeners.push(mesh.update)
    this.meshCount++
  }

  remove(mesh: UpdatableObject3D): void {
    this.scene.remove(mesh)
    if (!mesh.update) return
    const index = this.meshListeners.indexOf(mesh.update)
    if (index > -1) this.meshListeners.splice(index, 1)
    this.meshCount--
  }

  start(): void {
    this.update()
  }

  // Update render
  update(): void {
    let i = this.meshCount
    while (--i >= 0) {
      this.meshListeners[i]()
    }
    this.render()
    // Loop
    requestAnimationFrame(this.update)
  }

  render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  // Resize
  resize(w: number, h: number): void {
    this.width = w
    this.height = h
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.resizeRender()
  }

  resizeRender(): void {
    this.renderer.setSize(this.width, this.height)
  }
}
