import Block from './Block'
import './BlockSequence.css'

export default function BlockSequence({ blocks }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="block-sequence">
      <div className="block-sequence-hat">
        ⚑ quand drapeau vert cliqué
      </div>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
