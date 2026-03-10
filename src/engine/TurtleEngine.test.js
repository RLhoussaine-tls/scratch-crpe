import { describe, it, expect } from 'vitest'
import TurtleEngine from './TurtleEngine'

describe('TurtleEngine', () => {
  it('reset() sets default state', () => {
    const engine = new TurtleEngine()
    engine.x = 50
    engine.angle = 180
    engine.penDown = true
    engine.reset()
    expect(engine.x).toBe(0)
    expect(engine.y).toBe(0)
    expect(engine.angle).toBe(90)
    expect(engine.penDown).toBe(false)
  })

  it('avancer(100) at angle=90 moves right', () => {
    const engine = new TurtleEngine()
    engine.avancer(100)
    expect(engine.x).toBeCloseTo(100, 1)
    expect(engine.y).toBeCloseTo(0, 1)
  })

  it('avancer(100) at angle=0 moves up', () => {
    const engine = new TurtleEngine()
    engine.angle = 0
    engine.avancer(100)
    expect(engine.x).toBeCloseTo(0, 1)
    expect(engine.y).toBeCloseTo(100, 1)
  })

  it('reculer(50) is equivalent to avancer(-50)', () => {
    const engine = new TurtleEngine()
    engine.reculer(50)
    expect(engine.x).toBeCloseTo(-50, 1)
    expect(engine.y).toBeCloseTo(0, 1)
  })

  it('tournerDroite(90) from angle=90 gives angle=180', () => {
    const engine = new TurtleEngine()
    engine.tournerDroite(90)
    expect(engine.angle).toBe(180)
  })

  it('tournerGauche(45) from angle=90 gives angle=45', () => {
    const engine = new TurtleEngine()
    engine.tournerGauche(45)
    expect(engine.angle).toBe(45)
  })

  it('orienter(270) sets angle to 270', () => {
    const engine = new TurtleEngine()
    engine.orienter(270)
    expect(engine.angle).toBe(270)
  })

  it('styloPoser + avancer creates a segment', () => {
    const engine = new TurtleEngine()
    engine.styloPoser()
    engine.avancer(100)
    expect(engine.segments).toHaveLength(1)
  })

  it('styloRelever + avancer creates no segment', () => {
    const engine = new TurtleEngine()
    engine.styloRelever()
    engine.avancer(100)
    expect(engine.segments).toHaveLength(0)
  })

  it('styloPoser + avancer(100) produces correct segment coordinates', () => {
    const engine = new TurtleEngine()
    engine.styloPoser()
    engine.avancer(100)
    const seg = engine.segments[0]
    expect(seg.fromX).toBeCloseTo(0, 1)
    expect(seg.fromY).toBeCloseTo(0, 1)
    expect(seg.toX).toBeCloseTo(100, 1)
    expect(seg.toY).toBeCloseTo(0, 1)
  })

  it('allerA(50, -30) sets position', () => {
    const engine = new TurtleEngine()
    engine.allerA(50, -30)
    expect(engine.x).toBe(50)
    expect(engine.y).toBe(-30)
  })

  it('ajouterX(20) from x=10 gives x=30', () => {
    const engine = new TurtleEngine()
    engine.x = 10
    engine.ajouterX(20)
    expect(engine.x).toBe(30)
  })

  it('ajouterY(-15) from y=5 gives y=-10', () => {
    const engine = new TurtleEngine()
    engine.y = 5
    engine.ajouterY(-15)
    expect(engine.y).toBe(-10)
  })

  it('setCouleur sets color', () => {
    const engine = new TurtleEngine()
    engine.setCouleur('#FF0000')
    expect(engine.color).toBe('#FF0000')
  })

  it('setEpaisseur sets thickness', () => {
    const engine = new TurtleEngine()
    engine.setEpaisseur(3)
    expect(engine.thickness).toBe(3)
  })

  it('getState() returns expected properties', () => {
    const engine = new TurtleEngine()
    const state = engine.getState()
    expect(state).toEqual({
      x: 0,
      y: 0,
      angle: 90,
      penDown: false,
      visible: true,
    })
  })

  it('getSegments() returns a copy that does not affect the engine', () => {
    const engine = new TurtleEngine()
    engine.styloPoser()
    engine.avancer(50)
    const segs = engine.getSegments()
    expect(segs).toHaveLength(1)
    segs.push({ fake: true })
    expect(engine.getSegments()).toHaveLength(1)
  })
})
