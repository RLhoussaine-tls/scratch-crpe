import { useState, useEffect, useRef, useCallback } from 'react'
import './ExamMode.css'

const EXAM_DURATION = 3 * 60 * 60 // 3 hours in seconds

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
}

export default function ExamMode({ exercises, onSelect, onExit }) {
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION)
  const [answers, setAnswers] = useState({})
  const [started, setStarted] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!started) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [started])

  const handleStart = () => setStarted(true)

  const handleMarkDone = useCallback((exerciseId) => {
    setAnswers((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }))
  }, [])

  const completedCount = Object.values(answers).filter(Boolean).length
  const totalCount = exercises.length
  const isTimeUp = timeLeft === 0

  if (!started) {
    return (
      <div className="exam-mode">
        <div className="exam-start-screen">
          <h2>Mode Examen CRPE</h2>
          <p>Durée : 3 heures</p>
          <p>{totalCount} exercices disponibles</p>
          <button className="exam-start-btn" onClick={handleStart}>
            Commencer l'examen
          </button>
          <button className="exam-exit-btn" onClick={onExit}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="exam-mode">
      <div className={`exam-timer ${isTimeUp ? 'time-up' : timeLeft < 600 ? 'warning' : ''}`}>
        {isTimeUp ? 'Temps écoulé !' : formatTime(timeLeft)}
      </div>
      <div className="exam-progress">
        {completedCount} / {totalCount} terminé{completedCount > 1 ? 's' : ''}
      </div>
      <div className="exam-exercise-list">
        {exercises.map((ex) => (
          <div key={ex.id} className={`exam-exercise-row ${answers[ex.id] ? 'done' : ''}`}>
            <button className="exam-exercise-btn" onClick={() => onSelect(ex)}>
              {ex.title}
            </button>
            <button
              className={`exam-check-btn ${answers[ex.id] ? 'checked' : ''}`}
              onClick={() => handleMarkDone(ex.id)}
              title={answers[ex.id] ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
            >
              {answers[ex.id] ? '✓' : '○'}
            </button>
          </div>
        ))}
      </div>
      <button className="exam-exit-btn" onClick={onExit}>
        Quitter l'examen
      </button>
    </div>
  )
}
