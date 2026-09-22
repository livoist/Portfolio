// `three.meshline` ships no type definitions and isn't covered by DefinitelyTyped —
// this is a minimal shim covering only the API surface this project uses.
declare module 'three.meshline' {
  import { BufferGeometry, Color, Geometry, ShaderMaterial, ShaderMaterialParameters, Vector2, Vector3 } from 'three'

  export class MeshLine extends BufferGeometry {
    // back-compat getter that just returns `this` (MeshLine itself is a BufferGeometry)
    readonly geometry: MeshLine

    setGeometry(
      points: Vector2[] | Vector3[] | Geometry | BufferGeometry | Float32Array | number[],
      widthCallback?: false | ((p: number) => number)
    ): void
  }

  export interface MeshLineMaterialParameters extends ShaderMaterialParameters {
    lineWidth?: number
    dashArray?: number
    dashOffset?: number
    dashRatio?: number
    opacity?: number
    color?: Color | string
    resolution?: Vector2
    sizeAttenuation?: number | boolean
  }

  export class MeshLineMaterial extends ShaderMaterial {
    constructor(parameters?: MeshLineMaterialParameters)
  }
}
