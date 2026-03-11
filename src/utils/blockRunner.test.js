import { describe, it, expect, vi } from 'vitest'
import { resolveValue, resolveCondition, runBlocks } from './blockRunner'

// Minimal mock engine that records calls
function createMockEngine() {
  const calls = []
  return {
    calls,
    x: 0, y: 0, angle: 90, penDown: false,
    avancer(n) { calls.push(['avancer', n]) },
    reculer(n) { calls.push(['reculer', n]) },
    tournerDroite(a) { calls.push(['tournerDroite', a]); this.angle += a },
    tournerGauche(a) { calls.push(['tournerGauche', a]); this.angle -= a },
    allerA(x, y) { calls.push(['allerA', x, y]) },
    orienter(a) { calls.push(['orienter', a]); this.angle = a },
    styloPoser() { calls.push(['styloPoser']); this.penDown = true },
    styloRelever() { calls.push(['styloRelever']); this.penDown = false },
    setCouleur(c) { calls.push(['setCouleur', c]) },
    setEpaisseur(e) { calls.push(['setEpaisseur', e]) },
    ajouterX(dx) { calls.push(['ajouterX', dx]) },
    ajouterY(dy) { calls.push(['ajouterY', dy]) },
    clearSegments() { calls.push(['clearSegments']) },
    getSegments() { return [] },
    getState() { return { x: this.x, y: this.y, angle: this.angle } },
  }
}

// ─── resolveValue ───

describe('resolveValue', () => {
  it('returns literal numbers', () => {
    expect(resolveValue(42, {})).toBe(42)
  })

  it('returns literal strings', () => {
    expect(resolveValue('hello', {})).toBe('hello')
  })

  it('returns 0 for null/undefined', () => {
    expect(resolveValue(null, {})).toBe(0)
    expect(resolveValue(undefined, {})).toBe(0)
  })

  it('resolves variable references', () => {
    expect(resolveValue({ type: 'variable', name: 'x' }, { x: 7 })).toBe(7)
  })

  it('returns 0 for undefined variables', () => {
    expect(resolveValue({ type: 'variable', name: 'y' }, {})).toBe(0)
  })

  it('resolves op +', () => {
    expect(resolveValue({ type: 'op', op: '+', left: 3, right: 4 }, {})).toBe(7)
  })

  it('resolves op -', () => {
    expect(resolveValue({ type: 'op', op: '-', left: 10, right: 3 }, {})).toBe(7)
  })

  it('resolves op *', () => {
    expect(resolveValue({ type: 'op', op: '*', left: 5, right: 6 }, {})).toBe(30)
  })

  it('resolves op / with safe division', () => {
    expect(resolveValue({ type: 'op', op: '/', left: 10, right: 2 }, {})).toBe(5)
    expect(resolveValue({ type: 'op', op: '/', left: 10, right: 0 }, {})).toBe(0)
  })

  it('resolves op sqrt', () => {
    expect(resolveValue({ type: 'op', op: 'sqrt', left: 4 }, {})).toBe(2)
    expect(resolveValue({ type: 'op', op: 'sqrt', left: 2 }, {})).toBeCloseTo(1.4142, 3)
  })

  it('resolves nested expressions', () => {
    // (x * x) where x=5 => 25
    const expr = {
      type: 'op', op: '*',
      left: { type: 'variable', name: 'x' },
      right: { type: 'variable', name: 'x' }
    }
    expect(resolveValue(expr, { x: 5 })).toBe(25)
  })

  it('resolves deeply nested expressions', () => {
    // a * sqrt(2) where a=40
    const expr = {
      type: 'op', op: '*',
      left: { type: 'variable', name: 'a' },
      right: { type: 'op', op: 'sqrt', left: 2 }
    }
    expect(resolveValue(expr, { a: 40 })).toBeCloseTo(56.568, 2)
  })
})

// ─── resolveCondition ───

describe('resolveCondition', () => {
  it('handles booleans', () => {
    expect(resolveCondition(true, {})).toBe(true)
    expect(resolveCondition(false, {})).toBe(false)
  })

  it('handles numbers (truthy/falsy)', () => {
    expect(resolveCondition(0, {})).toBe(false)
    expect(resolveCondition(1, {})).toBe(true)
    expect(resolveCondition(-1, {})).toBe(true)
  })

  it('handles comp <', () => {
    expect(resolveCondition({ type: 'comp', op: '<', left: 3, right: 5 }, {})).toBe(true)
    expect(resolveCondition({ type: 'comp', op: '<', left: 5, right: 3 }, {})).toBe(false)
  })

  it('handles comp = with variables', () => {
    const cond = { type: 'comp', op: '=', left: { type: 'variable', name: 'x' }, right: 10 }
    expect(resolveCondition(cond, { x: 10 })).toBe(true)
    expect(resolveCondition(cond, { x: 5 })).toBe(false)
  })

  it('handles logical et', () => {
    const cond = {
      type: 'et',
      left: { type: 'comp', op: '>', left: 5, right: 3 },
      right: { type: 'comp', op: '<', left: 5, right: 10 },
    }
    expect(resolveCondition(cond, {})).toBe(true)
  })

  it('handles logical ou', () => {
    const cond = {
      type: 'ou',
      left: { type: 'comp', op: '<', left: 5, right: 3 },
      right: { type: 'comp', op: '>', left: 5, right: 3 },
    }
    expect(resolveCondition(cond, {})).toBe(true)
  })

  it('handles logical non', () => {
    const cond = {
      type: 'non',
      cond: { type: 'comp', op: '<', left: 5, right: 3 },
    }
    expect(resolveCondition(cond, {})).toBe(true)
  })
})

// ─── runBlocks ───

describe('runBlocks', () => {
  it('executes repeter', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'styloPoser', args: [] },
      { type: 'repeter', args: [3], body: [
        { type: 'avancer', args: [50] },
        { type: 'tournerDroite', args: [120] },
      ]},
    ]
    runBlocks(blocks, engine)
    // 1 styloPoser + 3 * (avancer + tournerDroite) = 7 calls
    expect(engine.calls).toHaveLength(7)
    expect(engine.calls[0]).toEqual(['styloPoser'])
    expect(engine.calls[1]).toEqual(['avancer', 50])
    expect(engine.calls[2]).toEqual(['tournerDroite', 120])
  })

  it('executes si (true)', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['x', 5] },
      { type: 'si', args: [{ type: 'comp', op: '>', left: { type: 'variable', name: 'x' }, right: 3 }], body: [
        { type: 'avancer', args: [100] },
      ]},
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.x).toBe(5)
    expect(engine.calls).toEqual([['avancer', 100]])
  })

  it('executes si (false)', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['x', 1] },
      { type: 'si', args: [{ type: 'comp', op: '>', left: { type: 'variable', name: 'x' }, right: 3 }], body: [
        { type: 'avancer', args: [100] },
      ]},
    ]
    runBlocks(blocks, engine)
    expect(engine.calls).toHaveLength(0)
  })

  it('executes siSinon', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['x', 1] },
      { type: 'siSinon',
        args: [{ type: 'comp', op: '>', left: { type: 'variable', name: 'x' }, right: 3 }],
        body: [{ type: 'avancer', args: [100] }],
        elseBody: [{ type: 'avancer', args: [50] }],
      },
    ]
    runBlocks(blocks, engine)
    expect(engine.calls).toEqual([['avancer', 50]])
  })

  it('executes repeterJusqua', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['i', 0] },
      { type: 'repeterJusqua',
        args: [{ type: 'comp', op: '>=', left: { type: 'variable', name: 'i' }, right: 3 }],
        body: [
          { type: 'avancer', args: [10] },
          { type: 'ajouterVariable', args: ['i', 1] },
        ]},
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.i).toBe(3)
    expect(engine.calls.filter(c => c[0] === 'avancer')).toHaveLength(3)
  })

  it('guards repeter against MAX_ITERATIONS', () => {
    const engine = createMockEngine()
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const blocks = [
      { type: 'repeter', args: [20000], body: [
        { type: 'avancer', args: [1] },
      ]},
    ]
    runBlocks(blocks, engine)
    expect(engine.calls.filter(c => c[0] === 'avancer')).toHaveLength(10000)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('guards repeterJusqua against MAX_ITERATIONS', () => {
    const engine = createMockEngine()
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    // Condition never becomes true
    const blocks = [
      { type: 'repeterJusqua',
        args: [false],
        body: [{ type: 'avancer', args: [1] }],
      },
    ]
    runBlocks(blocks, engine)
    expect(engine.calls.filter(c => c[0] === 'avancer')).toHaveLength(10000)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('repeter_jusqu_a'))
    spy.mockRestore()
  })

  it('guards repeter_jusqu_a with variable condition that never becomes true', () => {
    const engine = createMockEngine()
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const blocks = [
      { type: 'mettre_variable', args: ['done', false] },
      { type: 'repeter_jusqu_a',
        args: [{ type: 'variable', name: 'done' }],
        body: [{ type: 'avancer', args: [1] }],
      },
    ]
    runBlocks(blocks, engine)
    // Should stop at MAX_ITERATIONS (10000), not hang
    expect(engine.calls.filter(c => c[0] === 'avancer')).toHaveLength(10000)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('10000'))
    spy.mockRestore()
  })

  it('executes demander block', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'demander', args: ['x', 7] },
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.x).toBe(7)
  })

  it('executes mettreVariableOp', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['a', 10] },
      { type: 'mettreVariableOp', args: ['b', { type: 'variable', name: 'a' }, '*', 3] },
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.b).toBe(30)
  })

  it('executes mettreVariableComp', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'mettreVariable', args: ['a', 10] },
      { type: 'mettreVariableComp', args: ['flag', { type: 'variable', name: 'a' }, '>', 5] },
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.flag).toBe(true)
  })

  it('executes dire block', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'dire', args: ['Bonjour !'] },
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.__dire__).toBe('Bonjour !')
  })

  it('dire with variable', () => {
    const engine = createMockEngine()
    const blocks = [
      { type: 'demander', args: ['x', 42] },
      { type: 'dire', args: [{ type: 'variable', name: 'x' }] },
    ]
    const vars = runBlocks(blocks, engine)
    expect(vars.__dire__).toBe('42')
  })
})
