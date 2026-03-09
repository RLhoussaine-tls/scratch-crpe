import './Toolbar.css'

export default function Toolbar({ onRun, onReset }) {
  return (
    <div className="toolbar">
      <button className="toolbar-btn toolbar-run" onClick={onRun}>
        ▶ Exécuter
      </button>
      <button className="toolbar-btn toolbar-reset" onClick={onReset}>
        ↺ Réinitialiser
      </button>
    </div>
  )
}
