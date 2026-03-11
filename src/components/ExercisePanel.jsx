import { useState, useEffect } from 'react'
import './ExercisePanel.css'

const TYPE_LABELS = {
  calcul: 'Programme de calcul',
  quiz: 'QCM / Analyse',
  geometrie: 'Géométrie',
}

const TYPE_COLORS = {
  calcul: '#9966FF',
  quiz: '#FF8C1A',
  geometrie: '#4C97FF',
}

function getExerciseType(exercise) {
  if (exercise.type === 'calcul') return 'calcul'
  if (exercise.type === 'quiz') return 'quiz'
  return 'geometrie'
}

function DifficultyStars({ level }) {
  if (!level) return null
  return (
    <span className="difficulty-stars" title={`Difficulté : ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= level ? 'star-on' : 'star-off'}>★</span>
      ))}
    </span>
  )
}

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
        <div className="empty-panel-content">
          <div className="empty-panel-icon">📐</div>
          <p>Sélectionnez un exercice dans la liste de gauche</p>
          <p className="empty-panel-hint">ou utilisez le <strong>mode libre</strong> pour explorer le simulateur</p>
        </div>
      </div>
    )
  }

  const isQuiz = exercise.type === 'quiz'
  const activeSub = exercise.subExercises?.[activeSubIndex]
  const exerciseType = getExerciseType(exercise)

  const description = activeSub?.description || exercise.description
  const question = activeSub?.question || exercise.question
  const answer = activeSub?.answer || exercise.answer
  const hints = exercise.hints || []

  return (
    <div className="exercise-panel">
      <div className="exercise-header">
        <div className="exercise-badges">
          <span className="exercise-year">{exercise.year}</span>
          {exercise.groupement && (
            <span className="exercise-groupement">G{exercise.groupement}</span>
          )}
          <span
            className="badge-type"
            style={{ background: TYPE_COLORS[exerciseType] }}
          >
            {TYPE_LABELS[exerciseType]}
          </span>
          {exercise.source === 'entrainement' && (
            <span className="badge-entrainement">entraînement</span>
          )}
          {exercise.corrige?.difficulte && (
            <DifficultyStars level={exercise.corrige.difficulte} />
          )}
        </div>
        <h2>{exercise.title}</h2>
        {exercise.sourceUrl && (
          <a
            className="exercise-source-link"
            href={exercise.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le sujet officiel ↗
          </a>
        )}
      </div>

      {exercise.type === 'incomplete' && (
        <div className="exercise-incomplete-banner">
          Exercice reconstitué — certaines valeurs peuvent différer du sujet original.
        </div>
      )}

      {description && (
        <p className="exercise-description" style={{ whiteSpace: 'pre-line' }}>
          {description}
        </p>
      )}

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
          <span className="question-label">Question</span>
          {question}
        </div>
      )}

      {hints.length > 0 && (
        <div className="exercise-hints">
          {isQuiz ? (
            hints.map((hint, i) => (
              <details key={i} className="hint-detail">
                <summary>Indice {i + 1}</summary>
                <p>{hint}</p>
              </details>
            ))
          ) : (
            <>
              <button
                className="toggle-btn"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? '▾ Masquer les indices' : '▸ Afficher les indices'}
              </button>
              {showHints && (
                <ul className="hints-list">
                  {hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}

      {answer && (
        <div className="exercise-answer">
          <button
            className="toggle-btn answer-toggle"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '▾ Masquer le corrigé' : '▸ Voir le corrigé'}
          </button>
          {showAnswer && (
            <div className="answer-content">
              <p className="answer-text" style={{ whiteSpace: 'pre-line' }}>{answer}</p>
              {exercise.corrige && (
                <CorrigeDetails corrige={exercise.corrige} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CorrigeDetails({ corrige }) {
  return (
    <div className="corrige-details">
      {corrige.figure && (
        <div className="corrige-section">
          <strong>Figure attendue :</strong> {corrige.figure}
        </div>
      )}
      {corrige.variables && Object.keys(corrige.variables).length > 0 && (
        <div className="corrige-section">
          <strong>Valeurs :</strong>
          <div className="corrige-vars">
            {Object.entries(corrige.variables).map(([k, v]) => (
              <span key={k} className="corrige-var">
                <code>{k}</code> = <strong>{v}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
      {corrige.etapes && corrige.etapes.length > 0 && (
        <div className="corrige-section">
          <strong>Étapes clés :</strong>
          <ol className="corrige-etapes">
            {corrige.etapes.map((e, i) => <li key={i}>{e}</li>)}
          </ol>
        </div>
      )}
      {corrige.erreurs_classiques && corrige.erreurs_classiques.length > 0 && (
        <div className="corrige-section corrige-errors">
          <strong>Erreurs classiques :</strong>
          <ul>
            {corrige.erreurs_classiques.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
