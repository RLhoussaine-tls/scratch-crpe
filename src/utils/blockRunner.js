export function runBlocks(blocks, engine) {
  for (const block of blocks) {
    executeBlock(block, engine)
  }
}

function executeBlock(block, engine) {
  const { type, args = [] } = block

  switch (type) {
    case 'avancer':
      engine.avancer(args[0])
      break
    case 'reculer':
      engine.reculer(args[0])
      break
    case 'tournerDroite':
      engine.tournerDroite(args[0])
      break
    case 'tournerGauche':
      engine.tournerGauche(args[0])
      break
    case 'allerA':
      engine.allerA(args[0], args[1])
      break
    case 'orienter':
      engine.orienter(args[0])
      break
    case 'styloPoser':
      engine.styloPoser()
      break
    case 'styloRelever':
      engine.styloRelever()
      break
    case 'setCouleur':
      engine.setCouleur(args[0])
      break
    case 'setEpaisseur':
      engine.setEpaisseur(args[0])
      break
    case 'repeter':
      for (let i = 0; i < args[0]; i++) {
        runBlocks(block.body || [], engine)
      }
      break
    default:
      console.warn(`Unknown block type: ${type}`)
  }
}
