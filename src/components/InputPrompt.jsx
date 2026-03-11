import { useState, useRef, useEffect } from 'react'
import './InputPrompt.css'

export default function InputPrompt({ varName, defaultValue, onSubmit }) {
  const [value, setValue] = useState(String(defaultValue ?? ''))
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = Number(value)
    onSubmit(isNaN(num) ? value : num)
  }

  return (
    <div className="input-prompt-overlay">
      <form className="input-prompt" onSubmit={handleSubmit}>
        <label className="input-prompt-label">
          Quelle est la valeur de <strong>{varName}</strong> ?
        </label>
        <input
          ref={inputRef}
          className="input-prompt-field"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="input-prompt-btn">OK</button>
      </form>
    </div>
  )
}
