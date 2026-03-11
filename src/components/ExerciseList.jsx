import { exercisesByYear } from '../exercises'
import './ExerciseList.css'

const YEARS = [2025, 2024, 2023, 2022]

export default function ExerciseList({ selectedId, onSelect, freeMode, onFreeMode }) {
  return (
    <nav className="exercise-list">
      <h1 className="exercise-list-title">CRPE Scratch</h1>
      <button
        className={`exercise-item free-mode-btn ${freeMode ? 'active' : ''}`}
        onClick={onFreeMode}
      >
        Mode libre
      </button>
      {YEARS.map((year) => (
        <div key={year} className="exercise-year-group">
          <h3 className="year-heading">{year}</h3>
          <ul>
            {(exercisesByYear[year] || []).map((ex) => (
              <li key={ex.id}>
                <button
                  className={`exercise-item ${selectedId === ex.id ? 'active' : ''}`}
                  onClick={() => onSelect(ex)}
                >
                  {ex.title}
                  {ex.source === 'entrainement' && (
                    <span className="badge-entrainement" title="Exercice d'entraînement (non officiel)">entraînement</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
