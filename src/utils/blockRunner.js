function resolveValue(val, variables) {
  if (val && typeof val === 'object' && val.type === 'variable') {
    return variables[val.name] ?? 0
  }
  return val
}

export function runBlocks(blocks, engine, variables = {}) {
  for (const block of blocks) {
    executeBlock(block, engine, variables)
  }
  return variables
}

function executeBlock(block, engine, variables) {
  const { type, args = [] } = block

  switch (type) {
    case 'avancer':
      engine.avancer(resolveValue(args[0], variables))
      break
    case 'reculer':
      engine.reculer(resolveValue(args[0], variables))
      break
    case 'tournerDroite':
      engine.tournerDroite(resolveValue(args[0], variables))
      break
    case 'tournerGauche':
      engine.tournerGauche(resolveValue(args[0], variables))
      break
    case 'allerA':
      engine.allerA(resolveValue(args[0], variables), resolveValue(args[1], variables))
      break
    case 'orienter':
      engine.orienter(resolveValue(args[0], variables))
      break
    case 'styloPoser':
      engine.styloPoser()
      break
    case 'styloRelever':
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
    case 'repeter': {
      const times = resolveValue(args[0], variables)
      for (let i = 0; i < times; i++) {
        runBlocks(block.body || [], engine, variables)
      }
      break
    }
    default:
      console.warn(`Unknown block type: ${type}`)
  }
}
