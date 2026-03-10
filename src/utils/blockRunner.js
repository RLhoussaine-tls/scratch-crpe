function resolveValue(val, variables) {
  if (val && typeof val === 'object' && val.type === 'variable') {
    return variables[val.name] ?? 0
  }
  return val
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
      const times = resolveValue(block.args[0], variables)
      for (let j = 0; j < times; j++) {
        if (cancelRef && cancelRef.current) return
        await runBlocksAnimated(block.body || [], engine, variables, onStep, onDraw, delay, cancelRef, registry, [...currentPath, i, 'body'])
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
      engine.avancer(resolveValue(args[0], variables))
      break
    case 'reculer':
      engine.reculer(resolveValue(args[0], variables))
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
      const times = resolveValue(args[0], variables)
      for (let i = 0; i < times; i++) {
        runBlocks(block.body || [], engine, variables, registry)
      }
      break
    }
    default:
      console.warn(`Unknown block type: ${type}`)
  }
}
