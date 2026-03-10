import { getCategoryColor } from '../utils/colors'
import './Block.css'

function pathStartsWith(full, prefix) {
  if (!full || full.length < prefix.length) return false
  return prefix.every((v, i) => full[i] === v)
}

function ExprDisplay({ val }) {
  if (val == null) return <span>0</span>
  if (typeof val === 'number' || typeof val === 'string') return <span>{val}</span>
  if (typeof val === 'boolean') return <span>{val ? 'vrai' : 'faux'}</span>
  if (val.type === 'variable') return <span className="block-arg-variable">{val.name}</span>
  if (val.type === 'op') {
    if (val.op === 'sqrt') {
      return <span className="block-arg-expr">&#8730;(<ExprDisplay val={val.left} />)</span>
    }
    return (
      <span className="block-arg-expr">
        (<ExprDisplay val={val.left} /> {val.op} <ExprDisplay val={val.right} />)
      </span>
    )
  }
  if (val.type === 'comp') {
    return (
      <span className="block-arg-expr">
        (<ExprDisplay val={val.left} /> {val.op} <ExprDisplay val={val.right} />)
      </span>
    )
  }
  return <span>{JSON.stringify(val)}</span>
}

function ArgDisplay({ val, argIndex, path, onEditBlock }) {
  if (val && typeof val === 'object') {
    return <ExprDisplay val={val} />
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
  return <span>{String(val)}</span>
}

function ConditionDisplay({ cond }) {
  if (typeof cond === 'boolean') return <span>{cond ? 'vrai' : 'faux'}</span>
  if (typeof cond === 'number') return <span>{cond}</span>
  if (cond && typeof cond === 'object') {
    if (cond.type === 'variable') return <span className="block-arg-variable">{cond.name}</span>
    if (cond.type === 'comp') {
      return (
        <span className="block-arg-expr">
          <ExprDisplay val={cond.left} /> {cond.op} <ExprDisplay val={cond.right} />
        </span>
      )
    }
    if (cond.type === 'et') {
      return <span className="block-arg-expr"><ConditionDisplay cond={cond.left} /> et <ConditionDisplay cond={cond.right} /></span>
    }
    if (cond.type === 'ou') {
      return <span className="block-arg-expr"><ConditionDisplay cond={cond.left} /> ou <ConditionDisplay cond={cond.right} /></span>
    }
    if (cond.type === 'non') {
      return <span className="block-arg-expr">non <ConditionDisplay cond={cond.cond} /></span>
    }
  }
  return <span>{JSON.stringify(cond)}</span>
}

const LABELS = {
  avancer: (args, path, onEdit) => <>avancer de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> pas</>,
  reculer: (args, path, onEdit) => <>reculer de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> pas</>,
  tournerDroite: (args, path, onEdit) => <>tourner &#8635; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degr&eacute;s</>,
  tournerGauche: (args, path, onEdit) => <>tourner &#8634; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degr&eacute;s</>,
  allerA: (args, path, onEdit) => <>aller &agrave; x: <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> y: <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /></>,
  orienter: (args, path, onEdit) => <>s&apos;orienter &agrave; <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  styloPoser: () => "stylo en position d'écriture",
  styloRelever: () => 'relever le stylo',
  setCouleur: (args, path, onEdit) => <>mettre la couleur du stylo &agrave; <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  setEpaisseur: (args, path, onEdit) => <>mettre la taille du stylo &agrave; <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /></>,
  repeter: (args, path, onEdit) => <>r&eacute;p&eacute;ter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> fois</>,
  repeter_jusqu_a: (args) => <>r&eacute;p&eacute;ter jusqu&apos;&agrave; <ConditionDisplay cond={args[0]} /></>,
  si: (args) => <>si <ConditionDisplay cond={args[0]} /> alors</>,
  si_sinon: (args) => <>si <ConditionDisplay cond={args[0]} /> alors</>,
  mettre_variable: (args, path, onEdit) => <>mettre {args[0]} &agrave; <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /></>,
  mettre_variable_op: (args) => <>mettre {args[0]} &agrave; <ExprDisplay val={args[1]} /> {args[2]} <ExprDisplay val={args[3]} /></>,
  mettre_variable_comp: (args) => <>mettre {args[0]} &agrave; <ExprDisplay val={args[1]} /> {args[2]} <ExprDisplay val={args[3]} /></>,
  ajouter_variable: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} /> &agrave; {args[0]}</>,
  ajouter_x: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> &agrave; x</>,
  ajouter_y: (args, path, onEdit) => <>ajouter <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> &agrave; y</>,
  tourner_droite: (args, path, onEdit) => <>tourner &#8635; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degr&eacute;s</>,
  tourner_gauche: (args, path, onEdit) => <>tourner &#8634; de <ArgDisplay val={args[0]} argIndex={0} path={path} onEditBlock={onEdit} /> degr&eacute;s</>,
  stylo_poser: () => "stylo en position d'écriture",
  stylo_relever: () => 'relever le stylo',
  definir_bloc: (args) => <>d&eacute;finir {args[0]}</>,
  appeler_bloc: (args) => <>{args[0]}</>,
  effacer: () => 'tout effacer',
  demander: (args, path, onEdit) => <>demander {args[0]} (d&eacute;faut : <ArgDisplay val={args[1]} argIndex={1} path={path} onEditBlock={onEdit} />)</>,
}

const C_SHAPE_BLOCKS = ['repeter', 'definir_bloc', 'si', 'repeter_jusqu_a']

export default function Block({ block, depth = 0, activePath, blockPath = [], onEditBlock, path = [] }) {
  const { type, args = [], category = 'motion', body } = block
  const color = getCategoryColor(category)
  const labelFn = LABELS[type]
  const label = labelFn ? labelFn(args, path, onEditBlock) : type
  const isActive = pathStartsWith(activePath, blockPath)

  // si_sinon has body + elseBody
  if (type === 'si_sinon') {
    return (
      <div className={`block block-c ${isActive ? 'block-active' : ''}`} style={{ '--block-color': color }}>
        <div className="block-header">{label}</div>
        <div className="block-body">
          {(body || []).map((child, i) => (
            <Block
              key={i}
              block={child}
              depth={depth + 1}
              activePath={activePath}
              blockPath={[...blockPath, 'body', i]}
              onEditBlock={onEditBlock}
              path={[...path, 'body', i]}
            />
          ))}
        </div>
        <div className="block-else-header">sinon</div>
        <div className="block-body">
          {(block.elseBody || []).map((child, i) => (
            <Block
              key={i}
              block={child}
              depth={depth + 1}
              activePath={activePath}
              blockPath={[...blockPath, 'elseBody', i]}
              onEditBlock={onEditBlock}
              path={[...path, 'elseBody', i]}
            />
          ))}
        </div>
        <div className="block-footer" />
      </div>
    )
  }

  if (C_SHAPE_BLOCKS.includes(type)) {
    return (
      <div className={`block block-c ${isActive ? 'block-active' : ''}`} style={{ '--block-color': color }}>
        <div className="block-header">{label}</div>
        <div className="block-body">
          {(body || []).map((child, i) => (
            <Block
              key={i}
              block={child}
              depth={depth + 1}
              activePath={activePath}
              blockPath={[...blockPath, 'body', i]}
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
