import { getCategoryColor } from '../utils/colors'
import './Block.css'

function ArgDisplay({ val, argIndex, path, onEditBlock }) {
  if (val && typeof val === 'object' && val.type === 'variable') {
    return <span className="block-arg-variable">{val.name}</span>
  }
  if (typeof val === 'number' && onEditBlock) {
    return (
      <input
        type="number"
        className="block-arg-input"
        value={val}
        onChange={(e) => {
          const newVal = Number(e.target.value)
          if (!isNaN(newVal)) {
            onEditBlock([...path, 'args', argIndex], newVal)
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />
    )
  }
  return <span>{val}</span>
}

const LABELS = {
  avancer: (args, path, onEdit) => <>avancer de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> pas</>,
  reculer: (args, path, onEdit) => <>reculer de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> pas</>,
  tournerDroite: (args, path, onEdit) => <>tourner &#8635; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degres</>,
  tournerGauche: (args, path, onEdit) => <>tourner &#8634; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degres</>,
  allerA: (args, path, onEdit) => <>aller a x: <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> y: <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /></>,
  orienter: (args, path, onEdit) => <>s&apos;orienter a <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  styloPoser: () => "stylo en position d'ecriture",
  styloRelever: () => 'relever le stylo',
  setCouleur: (args, path, onEdit) => <>mettre la couleur du stylo a <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  setEpaisseur: (args, path, onEdit) => <>mettre la taille du stylo a <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  repeter: (args, path, onEdit) => <>repeter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> fois</>,
  mettre_variable: (args, path, onEdit) => <>mettre {args[0]} a <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /></>,
  ajouter_variable: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /> a {args[0]}</>,
  ajouter_x: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> a x</>,
  ajouter_y: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> a y</>,
  tourner_droite: (args, path, onEdit) => <>tourner &#8635; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degres</>,
  tourner_gauche: (args, path, onEdit) => <>tourner &#8634; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degres</>,
  stylo_poser: () => "stylo en position d'ecriture",
  stylo_relever: () => 'relever le stylo',
  definir_bloc: (args) => <>definir {args[0]}</>,
  appeler_bloc: (args) => <>{args[0]}</>,
  effacer: () => 'tout effacer',
}

export default function Block({ block, depth = 0, activeIndex, blockIndex, onEditBlock, path = [] }) {
  const { type, args = [], category = 'motion', body } = block
  const color = getCategoryColor(category)
  const labelFn = LABELS[type]
  const label = labelFn ? labelFn(args, path, onEditBlock) : type
  const isActive = activeIndex !== null && activeIndex !== undefined && blockIndex === activeIndex

  if (type === 'repeter' || type === 'definir_bloc') {
    return (
      <div className={`block block-c ${isActive ? 'block-active' : ''}`} style={{ '--block-color': color }}>
        <div className="block-header">{label}</div>
        <div className="block-body">
          {(body || []).map((child, i) => (
            <Block
              key={i}
              block={child}
              depth={depth + 1}
              onEditBlock={onEditBlock}
              path={[...path, 'body', i]}
            />
          ))}
        </div>
        <div className="block-footer" />
      </div>
    )
  }

  return (
    <div className={`block block-stack ${isActive ? 'block-active' : ''}`} style={{ '--block-color': color }}>
      {label}
    </div>
  )
}
