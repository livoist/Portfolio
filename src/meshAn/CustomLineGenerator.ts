import { Color, Vector3 } from 'three'

import AnimatedMeshLine from './AnimatedMeshLine'
import { getRandomFloat, getRandomItem } from './getCalcRandom'
import LineGenerator, { type LineGeneratorOptions } from './LineGenerator'
import type { AnimatedMeshLineOptions } from './AnimatedMeshLine'

const { random } = Math

// NOTE: the original imported the Vuex store directly to read `colorMap`, coupling
// a framework-agnostic Three.js module to Vuex. Ported to take a color-map getter
// instead, so the caller (the store/Pinia layer, wired up in a later phase) decides
// where the colors come from.
export default class CustomLineGenerator extends LineGenerator {
  private readonly getColorMap: () => (Color | string)[]

  constructor(
    options: LineGeneratorOptions,
    lineProps: Partial<AnimatedMeshLineOptions> | undefined,
    getColorMap: () => (Color | string)[]
  ) {
    super(options, lineProps)
    this.getColorMap = getColorMap
  }

  addLine(): AnimatedMeshLine {
    return super.addLine({
      length: getRandomFloat(6, 10),
      visibleLength: getRandomFloat(0.05, 0.15),
      position: new Vector3((random() - 0.5) * 1.5, random() - 1, (random() - 0.5) * 2).multiplyScalar(
        getRandomFloat(5, 20)
      ),
      turbulence: new Vector3(getRandomFloat(-2, 2), getRandomFloat(-2, 2), getRandomFloat(-2, 2)),
      orientation: new Vector3(getRandomFloat(-1.8, 1.8), 1, 1),
      speed: getRandomFloat(0.004, 0.008),
      color: getRandomItem(this.getColorMap()),
    })
  }
}
