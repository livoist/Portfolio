import { Vector3 } from 'three'
import LineGenerator from './LineGenerator'
import { getRandomFloat, getRandomItem } from './getCalcRandom'
import store from '../store'

const { random } = Math
export default class CustomLineGenerator extends LineGenerator {
  addLine() {
    super.addLine({
      length: getRandomFloat(6, 10),
      visibleLength: getRandomFloat(0.05, 0.15),
      position:
        new Vector3(
          (random() - 0.5) * 1.5,
          random() - 1,
          (random() - 0.5) * 2
        ).multiplyScalar(getRandomFloat(5, 20)),
      turbulence: new Vector3(
        getRandomFloat(-2, 2),
        getRandomFloat(-2, 2),
        getRandomFloat(-2, 2),
      ),
      orientation: new Vector3(getRandomFloat(-1.8, 1.8), 1, 1),
      speed: getRandomFloat(0.004, 0.008),
      color: getRandomItem(store.state.colorMap),
    });
  }
}