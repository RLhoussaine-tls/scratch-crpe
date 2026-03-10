import Block from './Block'
import './BlockSequence.css'

export default function BlockSequence({ blocks, activePath, onEditBlock }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="block-sequence">
      <div className="block-sequence-hat">
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 6 }}>
          <polygon points="3,1 14,8 3,15" fill="#4CBF56" />
        </svg>
        quand 🚩 est cliqué
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
