import { useState } from 'react'
import { exercisesByYear } from '../exercises'
import './ExerciseList.css'

const YEARS = [2025, 2024, 2023, 2022]

function getExerciseType(ex) {
  if (ex.type === 'calcul') return 'calcul'
  return 'geometrie'
}

export default function ExerciseList({ selectedId, onSelect }) {
  const [filterType, setFilterType] = useState('all')

  return (
    <nav className="exercise-list">
      <h1 className="exercise-list-title">CRPE Scratch</h1>

      <div className="filter-type-row">
        {[['all', 'Tous'], ['geometrie', '△ Géom.'], ['calcul', '∑ Calcul']].map(([t, label]) => (
          <button
            key={t}
            className={`filter-type-btn ${filterType === t ? 'active' : ''}`}
            onClick={() => setFilterType(t)}
          >
            {label}
          </button>
        ))}
      </div>

      {YEARS.map((year) => {
        const filtered = (exercisesByYear[year] || []).filter((ex) => {
          if (filterType === 'all') return true
          return getExerciseType(ex) === filterType
        })
        if (filtered.length === 0) return null
        return (
          <div key={year} className="exercise-year-group">
            <h3 className="year-heading">{year}</h3>
            <ul>
              {filtered.map((ex) => {
                const type = getExerciseType(ex)
                return (
                  <li key={ex.id}>
                    <button
                      className={`exercise-item ${selectedId === ex.id ? 'active' : ''}`}
                      onClick={() => onSelect(ex)}
                    >
                      <span className="ex-type-icon">{type === 'calcul' ? '∑' : '△'}</span>
                      <span className="ex-title">{ex.title}</span>
                      {ex.source === 'entrainement' && (
                        <span className="badge-entrainement" title="Exercice d'entraînement">★</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
