import { Vector3 } from 'three'

import type Engine from './engine'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EngineConstructor = new (...args: any[]) => Engine

// NOTE: the original checked a global `app.isMobile` that is never defined anywhere
// in the codebase — referencing it would throw a ReferenceError. Replaced with an
// actual feature check.
const isMobileDevice = (): boolean =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export interface CameraAmplitude {
  x: number
  y: number
}

// NOTE: composed with FullScreenInBackground via decorator syntax in EnterView.vue —
// see the note in FullScreenInBackground.ts about the constructor-arg chain.
export default function HandleCameraOrbit(
  cameraAmpl: CameraAmplitude = { x: 5, y: 5 },
  velocity = 0.1,
  lookAt: Vector3 = new Vector3()
) {
  return function <TBase extends EngineConstructor>(Target: TBase) {
    return class extends Target {
      cameraAmpl: CameraAmplitude
      cameraVelocity: number
      lookAt: Vector3
      mousePosition = { x: 0, y: 0 }
      normalizedOrientation = new Vector3()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args)

        this.cameraAmpl = cameraAmpl
        this.cameraVelocity = velocity
        this.lookAt = lookAt

        this.update = this.update.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleOrientationMove = this.handleOrientationMove.bind(this)

        if (isMobileDevice()) {
          window.addEventListener('deviceorientation', this.handleOrientationMove)
        } else {
          window.addEventListener('mousemove', this.handleMouseMove)
        }
      }

      handleMouseMove(event: MouseEvent | TouchEvent): void {
        const clientX = 'clientX' in event ? event.clientX : event.touches?.[0]?.clientX
        const clientY = 'clientY' in event ? event.clientY : event.touches?.[0]?.clientY

        this.mousePosition.x = clientX ?? this.mousePosition.x
        this.mousePosition.y = clientY ?? this.mousePosition.y

        this.normalizedOrientation.set(
          -(this.mousePosition.x / this.width - 0.5) * this.cameraAmpl.x,
          (this.mousePosition.y / this.height - 0.5) * this.cameraAmpl.y,
          0.5
        )
      }

      handleOrientationMove(event: DeviceOrientationEvent): void {
        // https://stackoverflow.com/questions/40716461/how-to-get-the-angle-between-the-horizon-line-and-the-device-in-javascript
        if (event.gamma === null || event.beta === null) return
        const rad = Math.atan2(event.gamma, event.beta)
        if (Math.abs(rad) > 1.5) return
        this.normalizedOrientation.x = -rad * this.cameraAmpl.y
        // TODO handle orientation.y
      }

      update(): void {
        super.update()

        this.camera.position.x += (this.normalizedOrientation.x - this.camera.position.x) * this.cameraVelocity
        this.camera.position.y += (this.normalizedOrientation.y - this.camera.position.y) * this.cameraVelocity
        this.camera.lookAt(this.lookAt)
      }
    }
  }
}
