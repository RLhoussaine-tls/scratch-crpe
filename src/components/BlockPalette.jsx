import { useState } from 'react'
import { getBlocksByCategory, CATEGORY_LABELS, CATEGORY_ORDER } from '../data/blockDefinitions'
import { getCategoryColor } from '../utils/colors'
import './BlockPalette.css'

const blocksByCategory = getBlocksByCategory()

function PaletteBlock({ blockDef }) {
  const color = getCategoryColor(blockDef.category)

  const handleDragStart = (e) => {
    const blockData = {
      type: blockDef.type,
      args: [...blockDef.defaultArgs],
      category: blockDef.category,
    }
    if (blockDef.hasBody) {
      blockData.body = []
    }
    if (blockDef.hasElseBody) {
      blockData.elseBody = []
    }
    e.dataTransfer.setData('application/scratch-block', JSON.stringify(blockData))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div
      className="palette-block"
      draggable
      onDragStart={handleDragStart}
      style={{ '--block-color': color }}
    >
      {blockDef.label.replace(/\{[0-9]+\}/g, '◻')}
    </div>
  )
}

export default function BlockPalette() {
  const [openCategory, setOpenCategory] = useState('motion')

  return (
    <div className="block-palette">
      <div className="palette-categories">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            className={`palette-cat-btn ${openCategory === cat ? 'active' : ''}`}
            style={{ '--cat-color': getCategoryColor(cat) }}
            onClick={() => setOpenCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      <div className="palette-blocks">
        {(blocksByCategory[openCategory] || []).map((def) => (
          <PaletteBlock key={def.type} blockDef={def} />
        ))}
      </div>
    </div>
  )
}
