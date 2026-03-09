import { getCategoryColor } from '../utils/colors'
import './Block.css'

const LABELS = {
  avancer: (args) => `avancer de ${args[0]} pas`,
  reculer: (args) => `reculer de ${args[0]} pas`,
  tournerDroite: (args) => `tourner ↻ de ${args[0]} degrés`,
  tournerGauche: (args) => `tourner ↺ de ${args[0]} degrés`,
  allerA: (args) => `aller à x: ${args[0]} y: ${args[1]}`,
  orienter: (args) => `s'orienter à ${args[0]}°`,
  styloPoser: () => 'stylo en position d\'écriture',
  styloRelever: () => 'relever le stylo',
  setCouleur: (args) => `mettre la couleur du stylo à ${args[0]}`,
  setEpaisseur: (args) => `mettre la taille du stylo à ${args[0]}`,
  repeter: (args) => `répéter ${args[0]} fois`,
}

export default function Block({ block, depth = 0 }) {
  const { type, args = [], category = 'motion', body } = block
  const color = getCategoryColor(category)
  const labelFn = LABELS[type]
  const label = labelFn ? labelFn(args) : type

  if (type === 'repeter') {
    return (
      <div className="block block-c" style={{ '--block-color': color }}>
        <div className="block-header">{label}</div>
        <div className="block-body">
          {(body || []).map((child, i) => (
            <Block key={i} block={child} depth={depth + 1} />
          ))}
        </div>
        <div className="block-footer" />
      </div>
    )
  }

  return (
    <div className="block block-stack" style={{ '--block-color': color }}>
      {label}
    </div>
  )
}
