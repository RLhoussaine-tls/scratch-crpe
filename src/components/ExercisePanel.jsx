import { useState } from 'react'
import './ExercisePanel.css'

export default function ExercisePanel({ exercise }) {
  const [showHints, setShowHints] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  if (!exercise) {
    return (
      <div className="exercise-panel exercise-panel-empty">
        <p>← Sélectionnez un exercice dans la liste</p>
      </div>
    )
  }

  return (
    <div className="exercise-panel">
      <div className="exercise-header">
        <span className="exercise-year">{exercise.year}</span>
        <h2>{exercise.title}</h2>
      </div>
      <p className="exercise-description">{exercise.description}</p>
      {exercise.question && (
        <div className="exercise-question">
          <strong>Question :</strong> {exercise.question}
        </div>
      )}
      {exercise.hints && exercise.hints.length > 0 && (
        <div className="exercise-hints">
          <button
            className="toggle-btn"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? '▾ Masquer les indices' : '▸ Afficher les indices'}
          </button>
          {showHints && (
            <ul>
              {exercise.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {exercise.answer && (
        <div className="exercise-answer">
          <button
            className="toggle-btn"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '▾ Masquer la réponse' : '▸ Afficher la réponse'}
          </button>
          {showAnswer && <p className="answer-text">{exercise.answer}</p>}
        </div>
      )}
    </div>
  )
}
