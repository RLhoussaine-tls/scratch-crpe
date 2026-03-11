import Block from './Block'
import './BlockSequence.css'

export default function BlockSequence({ blocks, activePath, onEditBlock }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="block-sequence">
      <div className="block-sequence-hat">
        <svg className="flag-icon" width="18" height="18" viewBox="0 0 18 18">
          <rect x="3" y="2" width="2" height="14" rx="1" fill="#45993D" />
          <path d="M5,3 L15,3 C15,3 14,5.5 15,8 L5,8 Z" fill="#4CBF56" />
        </svg>
        quand
        <svg className="flag-icon-inline" width="14" height="14" viewBox="0 0 18 18">
          <rect x="3" y="2" width="2" height="14" rx="1" fill="#45993D" />
          <path d="M5,3 L15,3 C15,3 14,5.5 15,8 L5,8 Z" fill="#4CBF56" />
        </svg>
        est cliqué
      </div>
      {blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
          activePath={activePath}
          blockPath={[i]}
          onEditBlock={onEditBlock}
          path={[i]}
        />
      ))}
    </div>
  )
}
