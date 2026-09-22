import { Object3D } from 'three'

import AnimatedMeshLine, { type AnimatedMeshLineOptions } from './AnimatedMeshLine'

export interface LineGeneratorOptions {
  frequency?: number
}

export default class LineGenerator extends Object3D {
  protected frequency: number
  protected lineStaticProps: Partial<AnimatedMeshLineOptions> | undefined
  protected isStarted = false
  protected i = 0
  protected lines: AnimatedMeshLine[] = []
  protected nbrOfLines = -1

  constructor({ frequency = 0.1 }: LineGeneratorOptions = {}, lineProps?: Partial<AnimatedMeshLineOptions>) {
    super()
    this.frequency = frequency
    this.lineStaticProps = lineProps

    this.update = this.update.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  /**
   * * *******************
   * * ANIMATION
   * * *******************
   */
  start(): void {
    this.isStarted = true
  }

  stop(): void {
    this.isStarted = false
    // TODO callback when all lines are hidden
  }

  /**
   * * *******************
   * * LINES
   * * *******************
   */
  addLine(props?: AnimatedMeshLineOptions): AnimatedMeshLine {
    const line = new AnimatedMeshLine(Object.assign({}, this.lineStaticProps, props))
    this.lines.push(line)
    this.add(line)
    this.nbrOfLines++
    return line
  }

  removeLine(line: AnimatedMeshLine): void {
    this.remove(line)
    this.nbrOfLines--
  }

  /**
   * * *******************
   * * REBUILD
   * * *******************
   */
  private static readonly DEFAULT_REBUILD_COUNT = 10

  // Drop every current line immediately (no fade-out) — used when the lines need to
  // be regenerated from scratch, e.g. after a color-map switch.
  //
  // NOTE: can't loop calling removeLine() here — removeLine() only decrements
  // nbrOfLines and pulls the mesh out of the scene graph; `this.lines` itself is only
  // ever re-sliced inside update()'s died-line filter. A `while (this.lines.length > 0)
  // removeLine(...)` loop would never shrink `this.lines.length` and hang the tab.
  clear(): void {
    for (let idx = this.lines.length - 1; idx >= 0; idx--) {
      this.remove(this.lines[idx])
    }
    this.lines = []
    this.nbrOfLines = -1
  }

  // Clear and immediately recreate the same number of lines (falling back to a
  // default when there were none yet), so callers can rebuild synchronously with
  // whatever `addLine()` picks up right now (e.g. a freshly switched color map)
  // instead of waiting for lines to respawn at random.
  rebuild(): void {
    const count = this.lines.length || LineGenerator.DEFAULT_REBUILD_COUNT
    this.clear()
    for (let n = 0; n < count; n++) this.addLine()
  }

  /**
   * * *******************
   * * UPDATE
   * * *******************
   */
  update(): void {
    // Add lines randomly
    if (this.isStarted && Math.random() < this.frequency) this.addLine()

    // Update current Lines
    for (this.i = this.nbrOfLines; this.i >= 0; this.i--) {
      this.lines[this.i].update()
    }

    // Filter and remove died lines
    const filteredLines: AnimatedMeshLine[] = []
    for (this.i = this.nbrOfLines; this.i >= 0; this.i--) {
      if (this.lines[this.i].isDied()) {
        this.removeLine(this.lines[this.i])
      } else {
        filteredLines.push(this.lines[this.i])
      }
    }
    this.lines = filteredLines
  }
}
