import { useState } from 'react'
import './AskModal.css'

export default function AskModal({ label, defaultVal, onConfirm }) {
  const [value, setValue] = useState(String(defaultVal ?? ''))

  const handleConfirm = () => {
    onConfirm(value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm()
  }

  return (
    <div className="ask-modal-overlay">
      <div className="ask-modal">
        <div className="ask-modal-label">{label}</div>
        <input
          className="ask-modal-input"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="ask-modal-btn" onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  )
}
