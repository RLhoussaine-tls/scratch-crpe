import { getCategoryColor } from '../utils/colors'
import './Block.css'

function formatArg(val) {
  if (val && typeof val === 'object' && val.type === 'variable') {
    return val.name
  }
  return val
}

const LABELS = {
  avancer: (args) => `avancer de ${formatArg(args[0])} pas`,
  reculer: (args) => `reculer de ${formatArg(args[0])} pas`,
  tournerDroite: (args) => `tourner ↻ de ${formatArg(args[0])} degrés`,
  tournerGauche: (args) => `tourner ↺ de ${formatArg(args[0])} degrés`,
  allerA: (args) => `aller à x: ${formatArg(args[0])} y: ${formatArg(args[1])}`,
  orienter: (args) => `s'orienter à ${formatArg(args[0])}°`,
  styloPoser: () => 'stylo en position d\'écriture',
  styloRelever: () => 'relever le stylo',
  setCouleur: (args) => `mettre la couleur du stylo à ${formatArg(args[0])}`,
  setEpaisseur: (args) => `mettre la taille du stylo à ${formatArg(args[0])}`,
  repeter: (args) => `répéter ${formatArg(args[0])} fois`,
  mettre_variable: (args) => `mettre ${args[0]} à ${formatArg(args[1])}`,
  ajouter_variable: (args) => `ajouter ${formatArg(args[1])} à ${args[0]}`,
  ajouter_x: (args) => `ajouter ${formatArg(args[0])} à x`,
  ajouter_y: (args) => `ajouter ${formatArg(args[0])} à y`,
  tourner_droite: (args) => `tourner ↻ de ${formatArg(args[0])} degrés`,
  tourner_gauche: (args) => `tourner ↺ de ${formatArg(args[0])} degrés`,
  stylo_poser: () => 'stylo en position d\'écriture',
  stylo_relever: () => 'relever le stylo',
  definir_bloc: (args) => `définir ${args[0]}`,
  appeler_bloc: (args) => `${args[0]}`,
}

export default function Block({ block, depth = 0 }) {
  const { type, args = [], category = 'motion', body } = block
  const color = getCategoryColor(category)
  const labelFn = LABELS[type]
  const label = labelFn ? labelFn(args) : type

  if (type === 'repeter' || type === 'definir_bloc') {
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
