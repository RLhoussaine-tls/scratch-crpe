import { useState, useEffect } from 'react'
import './ExercisePanel.css'

export default function ExercisePanel({ exercise, activeSubIndex, onSubSelect }) {
  const [showHints, setShowHints] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setShowHints(false)
    setShowAnswer(false)
  }, [exercise?.id, activeSubIndex])

  if (!exercise) {
    return (
      <div className="exercise-panel exercise-panel-empty">
        <p>← Sélectionnez un exercice dans la liste</p>
      </div>
    )
  }

  const isQuiz = exercise.type === 'quiz'
  const activeSub = exercise.subExercises?.[activeSubIndex]

  const description = activeSub?.description || exercise.description
  const question = activeSub?.question || exercise.question
  const answer = activeSub?.answer || exercise.answer

  return (
    <div className="exercise-panel">
      <div className="exercise-header">
        <span className="exercise-year">{exercise.year}</span>
        {exercise.groupement && (
          <span className="exercise-groupement">G{exercise.groupement}</span>
        )}
        {exercise.source === 'entrainement' && (
          <span className="badge-entrainement">entraînement</span>
        )}
        <h2>{exercise.title}</h2>
        {exercise.sourceUrl && (
          <a
            className="exercise-source-link"
            href={exercise.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le sujet officiel
          </a>
        )}
      </div>
      {exercise.type === 'incomplete' && (
        <div className="exercise-incomplete-banner">
          Exercice reconstitué — certaines valeurs peuvent différer du sujet original.
        </div>
      )}
      <p className="exercise-description" style={{ whiteSpace: 'pre-line' }}>
        {description}
      </p>
      {exercise.subExercises && (
        <div className="sub-exercise-tabs">
          {exercise.subExercises.map((sub, i) => (
            <button
              key={i}
              className={`sub-tab ${activeSubIndex === i ? 'active' : ''}`}
              onClick={() => onSubSelect(i)}
            >
              {sub.subtitle || sub.label}
            </button>
          ))}
        </div>
      )}
      {question && (
        <div className="exercise-question" style={{ whiteSpace: 'pre-line' }}>
          <strong>Question :</strong> {question}
        </div>
      )}
      {isQuiz && exercise.hints && exercise.hints.length > 0 && (
        <div className="exercise-hints-quiz">
          {exercise.hints.map((hint, i) => (
            <details key={i} className="hint-detail">
              <summary>Indice {i + 1}</summary>
              <p>{hint}</p>
            </details>
          ))}
        </div>
      )}
      {!isQuiz && exercise.hints && exercise.hints.length > 0 && (
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
      {answer && (
        <div className="exercise-answer">
          <button
            className="toggle-btn"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '▾ Masquer la réponse' : '▸ Voir la réponse'}
          </button>
          {showAnswer && <p className="answer-text">{answer}</p>}
        </div>
      )}
    </div>
  )
}
