export default class TurtleEngine {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = 0
    this.y = 0
    this.angle = 0 // Scratch default: 0° = pointing up
    this.penDown = true
    this.color = '#0000FF'
    this.thickness = 1
    this.segments = []
    this.visible = true
  }

  // Scratch: 0°=up, 90°=right, 180°=down, 270°=left
  // We store angle in Scratch degrees and convert for movement
  _scratchToRad(scratchDeg) {
    // Scratch 0°=up => math 90°, Scratch 90°=right => math 0°
    return ((90 - scratchDeg) * Math.PI) / 180
  }

  avancer(n) {
    const rad = this._scratchToRad(this.angle)
    const toX = this.x + n * Math.cos(rad)
    const toY = this.y + n * Math.sin(rad)
    if (this.penDown) {
      this.segments.push({
        fromX: this.x,
        fromY: this.y,
        toX,
        toY,
        color: this.color,
        thickness: this.thickness,
      })
    }
    this.x = toX
    this.y = toY
  }

  reculer(n) {
    this.avancer(-n)
  }

  tournerDroite(deg) {
    this.angle = (this.angle + deg) % 360
  }

  tournerGauche(deg) {
    this.angle = ((this.angle - deg) % 360 + 360) % 360
  }

  allerA(x, y) {
    if (this.penDown) {
      this.segments.push({
        fromX: this.x,
        fromY: this.y,
        toX: x,
        toY: y,
        color: this.color,
        thickness: this.thickness,
      })
    }
    this.x = x
    this.y = y
  }

  ajouterX(dx) {
    this.x += dx
  }

  ajouterY(dy) {
    this.y += dy
  }

  orienter(deg) {
    this.angle = ((deg % 360) + 360) % 360
  }

  styloPoser() {
    this.penDown = true
  }

  styloRelever() {
    this.penDown = false
  }

  setCouleur(c) {
    this.color = c
  }

  setEpaisseur(n) {
    this.thickness = n
  }

  getState() {
    return {
      x: this.x,
      y: this.y,
      angle: this.angle,
      penDown: this.penDown,
      visible: this.visible,
    }
  }

  getSegments() {
    return [...this.segments]
  }
}
