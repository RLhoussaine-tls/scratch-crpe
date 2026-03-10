import './Toolbar.css'

export default function Toolbar({ onRun, onStop, onResetCanvas, onResetExercise, isRunning, animDelay, onSpeedChange, hasEdits }) {
  return (
    <div className="toolbar">
      <div className="toolbar-buttons">
        <button className="toolbar-btn toolbar-run" onClick={onRun} disabled={isRunning}>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 4, verticalAlign: 'middle' }}>
            <polygon points="3,1 14,8 3,15" fill="#4CBF56" />
          </svg>
          Exécuter
        </button>
        {isRunning && (
          <button className="toolbar-btn toolbar-stop" onClick={onStop}>
            ⏹ Stop
          </button>
        )}
        <button className="toolbar-btn toolbar-reset" onClick={onResetCanvas} disabled={isRunning}>
          Réinitialiser le canvas
        </button>
        {hasEdits && (
          <button className="toolbar-btn toolbar-reset-exercise" onClick={onResetExercise} disabled={isRunning}>
            Remettre l&apos;exercice
          </button>
        )}
      </div>
      <div className="speed-control">
        <label>Vitesse :</label>
        <input
          type="range"
          min="50"
          max="800"
          step="50"
          value={animDelay}
          onChange={e => onSpeedChange(Number(e.target.value))}
        />
        <span className="speed-label">
          {animDelay >= 600 ? 'Lente' : animDelay >= 300 ? 'Normale' : 'Rapide'}
        </span>
      </div>
    </div>
  )
}
