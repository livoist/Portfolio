import { BufferGeometry, Color, Mesh, SplineCurve, Vector2, Vector3 } from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

import { getRandomFloat } from './getCalcRandom'

export interface AnimatedMeshLineOptions {
  width?: number
  speed?: number
  visibleLength?: number
  color?: Color | string
  opacity?: number
  position?: Vector3
  // Array of points already done
  points?: Vector3[] | false
  // Params to create the array of points
  length?: number
  nbrOfPoints?: number
  orientation?: Vector3
  turbulence?: Vector3
  transformLineMethod?: false | ((p: number) => number)
}

export default class AnimatedMeshLine extends Mesh {
  private readonly meshLineMaterial: MeshLineMaterial
  private readonly speed: number
  private readonly dashLength: number
  private readonly dyingAt: number
  private readonly diedAt: number

  constructor({
    width = 0.1,
    speed = 0.01,
    visibleLength = 0.5,
    color = new Color('#000000'),
    opacity = 1,
    position = new Vector3(0, 0, 0),
    points = false,
    length = 2,
    nbrOfPoints = 3,
    orientation = new Vector3(1, 0, 0),
    turbulence = new Vector3(0, 0, 0),
    transformLineMethod = false,
  }: AnimatedMeshLineOptions = {}) {
    // * ******************************
    // * Create the main line
    let linePoints: Vector3[] | BufferGeometry = []
    if (!points) {
      const currentPoint = new Vector3()
      // The size of each segment oriented in the good direction
      const segment = orientation.normalize().multiplyScalar(length / nbrOfPoints)
      const rawPoints: Vector3[] = [currentPoint.clone()]
      for (let i = 0; i < nbrOfPoints - 1; i++) {
        // Increment the point depending on the orientation
        currentPoint.add(segment)
        // Add turbulence to the current point
        rawPoints.push(
          currentPoint.clone().set(
            currentPoint.x + getRandomFloat(-turbulence.x, turbulence.x),
            currentPoint.y + getRandomFloat(-turbulence.y, turbulence.y),
            currentPoint.z + getRandomFloat(-turbulence.z, turbulence.z)
          )
        )
      }
      // Finish the curve to the correct point without turbulence
      rawPoints.push(currentPoint.add(segment).clone())

      // * ******************************
      // * Smooth the line
      // NOTE: three's SplineCurve only interpolates Vector2 (x/y) — it reads .x/.y off
      // each point and ignores .z, so the z-turbulence computed above is not reflected
      // in the final curve. This is inherited as-is from the original implementation;
      // treat it as a known quirk rather than something this port silently changed.
      const curve = new SplineCurve(rawPoints as unknown as Vector2[])
      // NOTE: the original built this with the legacy `THREE.Geometry` class and relied
      // on three.meshline@1.2.0's `setGeometry()`, which special-cased `instanceof
      // THREE.Geometry` and read `.vertices` directly. three.meshline@1.4.0 (this repo's
      // pinned version) dropped that branch — `setGeometry()` now unconditionally calls
      // `g.getAttribute('position')`, which only exists on `BufferGeometry`, so a legacy
      // `Geometry` here throws `g.getAttribute is not a function` at runtime. Switched to
      // `BufferGeometry` (also deprecated-free — `Geometry` was removed from three.js in
      // later releases) to match what setGeometry actually expects now.
      linePoints = new BufferGeometry().setFromPoints(curve.getPoints(50))
    } else {
      linePoints = points
    }

    // * ******************************
    // * Create the MeshLineGeometry
    const line = new MeshLine()
    line.setGeometry(linePoints, transformLineMethod)
    const geometry = line.geometry

    // * ******************************
    // * Create the Line Material
    // dashArray - the length and space between dashes. (0 - no dash)
    // dashRatio - defines the ratio between that is visible or not (0 - more visible, 1 - more invisible).
    // dashOffset - defines the location where the dash will begin. Ideal to animate the line.
    // DashArray: The length of a dash = dashArray * length.
    // Here 2 means a dash is 2 times longer than the original length
    const dashArray = 2
    // Start at 0, decremented to reveal the dashed line
    const dashOffset = 0
    // The ratio between what's visible and what isn't
    const dashRatio = 1 - visibleLength * 0.5 // has to be between 0.5 and 1

    const material = new MeshLineMaterial({
      lineWidth: width,
      dashArray,
      dashOffset,
      dashRatio,
      opacity,
      transparent: true,
      depthWrite: false,
      color,
    })

    // * ******************************
    // * Init
    super(geometry, material)
    this.position.copy(position)

    this.meshLineMaterial = material
    this.speed = speed
    const voidLength = dashArray * dashRatio // when the visible part is out
    this.dashLength = dashArray - voidLength

    this.dyingAt = 1
    this.diedAt = this.dyingAt + this.dashLength

    // Bind
    this.update = this.update.bind(this)
  }

  /**
   * * *******************
   * * UPDATE
   * * *******************
   */
  update(): void {
    // Increment the dash
    this.meshLineMaterial.uniforms.dashOffset.value -= this.speed

    // Reduce the opacity as the dash starts to disappear
    if (this.isDying()) {
      this.meshLineMaterial.uniforms.opacity.value =
        0.9 + (this.meshLineMaterial.uniforms.dashOffset.value + 1) / this.dashLength
    }
  }

  /**
   * * *******************
   * * CONDITIONS
   * * *******************
   */
  isDied(): boolean {
    return this.meshLineMaterial.uniforms.dashOffset.value < -this.diedAt
  }

  isDying(): boolean {
    return this.meshLineMaterial.uniforms.dashOffset.value < -this.dyingAt
  }
}
