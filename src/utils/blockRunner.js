const MAX_ITERATIONS = 10000

/**
 * Resolve a value that may be a literal, a variable reference, or an operator expression.
 * Supports recursive resolution for nested expressions.
 * @param {*} val - A number, string, { type: 'variable', name } or { type: 'op', op, left, right }
 * @param {Object} variables - Current variable scope
 * @returns {*} The resolved value
 */
function resolveValue(val, variables) {
  if (val == null) return 0
  if (typeof val === 'number' || typeof val === 'string') return val
  if (typeof val !== 'object') return val

  // Variable reference
  if (val.type === 'variable') {
    return variables[val.name] ?? 0
  }

  // Operator expression: { type: 'op', op: '+', left, right }
  if (val.type === 'op') {
    const left = resolveValue(val.left, variables)
    switch (val.op) {
      case '+': return left + resolveValue(val.right, variables)
      case '-': return left - resolveValue(val.right, variables)
      case '*': return left * resolveValue(val.right, variables)
      case '/': {
        const right = resolveValue(val.right, variables)
        return right !== 0 ? left / right : 0
      }
      case '%': {
        const right = resolveValue(val.right, variables)
        return right !== 0 ? left % right : 0
      }
      case 'sqrt': return Math.sqrt(left)
      default:
        console.warn(`Unknown operator: ${val.op}`)
        return 0
    }
  }

  // Comparison expression: { type: 'comp', op: '<', left, right }
  if (val.type === 'comp') {
    return resolveCondition(val, variables)
  }

  return val
}

/**
 * Resolve a condition expression to a boolean.
 * @param {*} cond - A boolean, number (truthy/falsy), variable ref, or { type: 'comp', op, left, right }
 * @param {Object} variables
 * @returns {boolean}
 */
function resolveCondition(cond, variables) {
  if (typeof cond === 'boolean') return cond
  if (typeof cond === 'number') return cond !== 0

  if (cond && typeof cond === 'object') {
    if (cond.type === 'variable') {
      return !!resolveValue(cond, variables)
    }
    if (cond.type === 'comp') {
      const left = resolveValue(cond.left, variables)
      const right = resolveValue(cond.right, variables)
      switch (cond.op) {
        case '<': return left < right
        case '>': return left > right
        case '=': return left === right
        case '==': return left === right
        case '<=': return left <= right
        case '>=': return left >= right
        case '!=': return left !== right
        default:
          console.warn(`Unknown comparator: ${cond.op}`)
          return false
      }
    }
  }

  return !!cond
}

export function runBlocks(blocks, engine, variables = {}, registry = {}) {
  for (const block of blocks) {
    executeBlock(block, engine, variables, registry)
  }
  return variables
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function runBlocksAnimated(blocks, engine, variables = {}, onStep, onDraw, delay = 300, cancelRef = null, registry = {}, currentPath = []) {
  for (let i = 0; i < blocks.length; i++) {
    if (cancelRef && cancelRef.current) return
    const block = blocks[i]
    if (block.type === 'definir_bloc') {
      executeBlock(block, engine, variables, registry)
      continue
    }
    onStep([...currentPath, i])
    await sleep(delay)
    if (cancelRef && cancelRef.current) return

    if (block.type === 'repeter') {
      const rawTimes = resolveValue(block.args[0], variables)
      const times = Math.min(rawTimes, MAX_ITERATIONS)
      if (rawTimes > MAX_ITERATIONS) {
        console.error(`Boucle répéter limitée à ${MAX_ITERATIONS} itérations`)
      }
      for (let j = 0; j < times; j++) {
        if (cancelRef && cancelRef.current) return
        await runBlocksAnimated(block.body || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'body'])
      }
    } else if (block.type === 'repeter_jusqu_a') {
      let iterations = 0
      while (!resolveCondition(block.args[0], variables)) {
        if (cancelRef && cancelRef.current) return
        if (iterations++ >= MAX_ITERATIONS) {
          console.error(`Boucle repeter_jusqu_a limitée à ${MAX_ITERATIONS} itérations`)
          break
        }
        await runBlocksAnimated(block.body || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'body'])
      }
    } else if (block.type === 'si') {
      if (resolveCondition(block.args[0], variables)) {
        await runBlocksAnimated(block.body || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'body'])
      }
    } else if (block.type === 'si_sinon') {
      if (resolveCondition(block.args[0], variables)) {
        await runBlocksAnimated(block.body || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'body'])
      } else {
        await runBlocksAnimated(block.elseBody || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'elseBody'])
      }
    } else if (block.type === 'appeler_bloc') {
      if (registry[block.args[0]]) {
        await runBlocksAnimated(registry[block.args[0]], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'custom'])
      }
    } else {
      executeBlock(block, engine, variables, registry)
      onDraw()
    }
  }
}

function executeBlock(block, engine, variables, registry = {}) {
  const { type, args = [] } = block

  switch (type) {
    case 'avancer':
      engine.avancer(Math.round(resolveValue(args[0], variables)))
      break
    case 'reculer':
      engine.reculer(Math.round(resolveValue(args[0], variables)))
      break
    case 'tournerDroite':
    case 'tourner_droite':
      engine.tournerDroite(resolveValue(args[0], variables))
      break
    case 'tournerGauche':
    case 'tourner_gauche':
      engine.tournerGauche(resolveValue(args[0], variables))
      break
    case 'effacer':
      engine.clearSegments()
      break
    case 'allerA':
      engine.allerA(resolveValue(args[0], variables), resolveValue(args[1], variables))
      break
    case 'orienter':
      engine.orienter(resolveValue(args[0], variables))
      break
    case 'styloPoser':
    case 'stylo_poser':
      engine.styloPoser()
      break
    case 'styloRelever':
    case 'stylo_relever':
      engine.styloRelever()
      break
    case 'setCouleur':
      engine.setCouleur(resolveValue(args[0], variables))
      break
    case 'setEpaisseur':
      engine.setEpaisseur(resolveValue(args[0], variables))
      break
    case 'mettre_variable':
      variables[args[0]] = resolveValue(args[1], variables)
      break
    case 'ajouter_variable':
      variables[args[0]] = (variables[args[0]] ?? 0) + resolveValue(args[1], variables)
      break
    case 'ajouter_x':
      engine.ajouterX(resolveValue(args[0], variables))
      break
    case 'ajouter_y':
      engine.ajouterY(resolveValue(args[0], variables))
      break

    /**
     * Operator block: compute valA OP valB and store in variable.
     * { type: 'mettre_variable_op', args: ['varName', valA, operator, valB] }
     * operator in '+' | '-' | '*' | '/' | '%'
     */
    case 'mettre_variable_op': {
      const varName = args[0]
      const a = resolveValue(args[1], variables)
      const op = args[2]
      const b = resolveValue(args[3], variables)
      switch (op) {
        case '+': variables[varName] = a + b; break
        case '-': variables[varName] = a - b; break
        case '*': variables[varName] = a * b; break
        case '/': variables[varName] = b !== 0 ? a / b : 0; break
        case '%': variables[varName] = b !== 0 ? a % b : 0; break
        default: console.warn(`mettre_variable_op: unknown operator ${op}`)
      }
      break
    }

    /**
     * Comparison block: compare valA and valB, store boolean in variable.
     * { type: 'mettre_variable_comp', args: ['varName', valA, comparator, valB] }
     * comparator in '<' | '>' | '=' | '<=' | '>='
     */
    case 'mettre_variable_comp': {
      const varName = args[0]
      const a = resolveValue(args[1], variables)
      const comp = args[2]
      const b = resolveValue(args[3], variables)
      switch (comp) {
        case '<': variables[varName] = a < b; break
        case '>': variables[varName] = a > b; break
        case '=': variables[varName] = a === b; break
        case '<=': variables[varName] = a <= b; break
        case '>=': variables[varName] = a >= b; break
        default: console.warn(`mettre_variable_comp: unknown comparator ${comp}`)
      }
      break
    }

    case 'definir_bloc':
      registry[args[0]] = block.body || []
      break
    case 'appeler_bloc':
      if (registry[args[0]]) {
        runBlocks(registry[args[0]], engine, variables, registry)
      } else {
        console.warn(`Unknown custom block: ${args[0]}`)
      }
      break

    case 'repeter': {
      const rawTimes = resolveValue(args[0], variables)
      const times = Math.min(rawTimes, MAX_ITERATIONS)
      if (rawTimes > MAX_ITERATIONS) {
        console.error(`Boucle répéter limitée à ${MAX_ITERATIONS} itérations`)
      }
      for (let i = 0; i < times; i++) {
        runBlocks(block.body || [], engine, variables, registry)
      }
      break
    }

    /** Repeat until condition is true */
    case 'repeter_jusqu_a': {
      let iterations = 0
      while (!resolveCondition(args[0], variables)) {
        if (iterations++ >= MAX_ITERATIONS) {
          console.error(`Boucle repeter_jusqu_a limitée à ${MAX_ITERATIONS} itérations`)
          break
        }
        runBlocks(block.body || [], engine, variables, registry)
      }
      break
    }

    /** Conditional: execute body if condition is true */
    case 'si':
      if (resolveCondition(args[0], variables)) {
        runBlocks(block.body || [], engine, variables, registry)
      }
      break

    /** Conditional with else: execute body or elseBody */
    case 'si_sinon':
      if (resolveCondition(args[0], variables)) {
        runBlocks(block.body || [], engine, variables, registry)
      } else {
        runBlocks(block.elseBody || [], engine, variables, registry)
      }
      break

    default:
      console.warn(`Unknown block type: ${type}`)
  }
}
