import { useState, useEffect, useCallback } from 'react'
import './Progress.css'

const STORAGE_KEY = 'crpe-scratch-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* ignore */ }
}

const SKILL_LABELS = {
  angles: 'Angles & rotations',
  variables: 'Variables',
  boucles: 'Boucles',
  algebre: 'Algèbre',
  geometrie: 'Géométrie',
  blocs: 'Blocs personnalisés',
}

const TYPE_LABELS = {
  geometrie: 'Géométrie',
  calcul: 'Programme de calcul',
  quiz: 'QCM / Analyse',
}

const TYPE_COLORS = {
  geometrie: '#4C97FF',
  calcul: '#9966FF',
  quiz: '#FF8C1A',
}

function getExerciseType(ex) {
  if (ex.type === 'calcul') return 'calcul'
  if (ex.type === 'quiz') return 'quiz'
  return 'geometrie'
}

function StarRating({ value, onChange, readonly }) {
  return (
    <div className="star-rating" title={readonly ? `Note : ${value}/5` : 'Votre note'}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star-btn ${star <= value ? 'filled' : ''}`}
          onClick={() => !readonly && onChange?.(star === value ? 0 : star)}
          disabled={readonly}
          type="button"
          aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function ExerciseProgressRow({ exercise, progress, onToggleDone, onSetRating, onSelect }) {
  const exProg = progress[exercise.id] || {}
  const done = !!exProg.done
  const rating = exProg.rating || 0
  const type = getExerciseType(exercise)

  return (
    <div className={`progress-row ${done ? 'done' : ''}`}>
      <div className="progress-row-info">
        <button className="progress-exercise-title" onClick={() => onSelect(exercise)}>
          {exercise.title}
        </button>
        <div className="progress-row-meta">
          <span className="badge-year">{exercise.year}</span>
          {exercise.groupement && <span className="badge-group">G{exercise.groupement}</span>}
          <span
            className="badge-type"
            style={{ background: TYPE_COLORS[type] }}
          >
            {TYPE_LABELS[type]}
          </span>
        </div>
      </div>
      <div className="progress-row-actions">
        <StarRating value={rating} onChange={(r) => onSetRating(exercise.id, r)} />
        <button
          className={`progress-done-btn ${done ? 'is-done' : ''}`}
          onClick={() => onToggleDone(exercise.id)}
          title={done ? 'Marquer comme non fait' : 'Marquer comme fait'}
        >
          {done ? '✓ Fait' : '○ À faire'}
        </button>
      </div>
    </div>
  )
}

function SkillBar({ label, value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="skill-bar-row">
      <span className="skill-label">{label}</span>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="skill-pct">{pct}%</span>
    </div>
  )
}

export default function Progress({ exercises, onSelectExercise, onBack }) {
  const [progress, setProgress] = useState(loadProgress)
  const [filterYear, setFilterYear] = useState('all')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const handleToggleDone = useCallback((id) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], done: !prev[id]?.done },
    }))
  }, [])

  const handleSetRating = useCallback((id, rating) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], rating },
    }))
  }, [])

  const handleSelect = useCallback((exercise) => {
    onSelectExercise(exercise)
  }, [onSelectExercise])

  const handleReset = useCallback(() => {
    if (window.confirm('Réinitialiser toute la progression ?')) {
      setProgress({})
    }
  }, [])

  // Stats
  const totalExercises = exercises.length
  const doneExercises = exercises.filter((ex) => progress[ex.id]?.done).length
  const avgRating = (() => {
    const rated = exercises.filter((ex) => progress[ex.id]?.rating > 0)
    if (rated.length === 0) return 0
    return rated.reduce((sum, ex) => sum + progress[ex.id].rating, 0) / rated.length
  })()

  // Skill scores (based on exercise type)
  const skillData = {
    angles: { label: SKILL_LABELS.angles, done: 0, total: 0 },
    variables: { label: SKILL_LABELS.variables, done: 0, total: 0 },
    boucles: { label: SKILL_LABELS.boucles, done: 0, total: 0 },
    algebre: { label: SKILL_LABELS.algebre, done: 0, total: 0 },
    geometrie: { label: SKILL_LABELS.geometrie, done: 0, total: 0 },
    blocs: { label: SKILL_LABELS.blocs, done: 0, total: 0 },
  }
  exercises.forEach((ex) => {
    const type = getExerciseType(ex)
    const isDone = !!progress[ex.id]?.done
    if (type === 'calcul') {
      skillData.algebre.total++
      skillData.variables.total++
      if (isDone) { skillData.algebre.done++; skillData.variables.done++ }
    } else {
      skillData.geometrie.total++
      skillData.angles.total++
      skillData.boucles.total++
      if (isDone) { skillData.geometrie.done++; skillData.angles.done++; skillData.boucles.done++ }
    }
    if (ex.blocks?.some?.((b) => b.type === 'definirBloc') ||
        ex.subExercises?.some?.((s) => s.blocks?.some?.((b) => b.type === 'definirBloc'))) {
      skillData.blocs.total++
      if (isDone) skillData.blocs.done++
    }
  })

  // Filter
  const years = [...new Set(exercises.map((e) => e.year))].sort((a, b) => b - a)
  const filteredExercises = exercises.filter((ex) => {
    if (filterYear !== 'all' && String(ex.year) !== filterYear) return false
    if (filterType !== 'all' && getExerciseType(ex) !== filterType) return false
    return true
  })

  return (
    <div className="progress-page">
      <div className="progress-header">
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <h1>Tableau de bord — Progression</h1>
      </div>

      <div className="progress-stats-row">
        <div className="stat-card">
          <div className="stat-value">{doneExercises}/{totalExercises}</div>
          <div className="stat-label">Exercices terminés</div>
          <div className="stat-bar-wrap">
            <div className="stat-bar-fill" style={{ width: `${totalExercises > 0 ? (doneExercises / totalExercises) * 100 : 0}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round((doneExercises / Math.max(totalExercises, 1)) * 100)}%</div>
          <div className="stat-label">Taux de complétion</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgRating > 0 ? avgRating.toFixed(1) : '—'}</div>
          <div className="stat-label">Note moyenne (/5)</div>
        </div>
      </div>

      <div className="progress-skills">
        <h2>Compétences</h2>
        {Object.entries(skillData).map(([key, s]) => (
          <SkillBar key={key} label={s.label} value={s.done} max={s.total} />
        ))}
      </div>

      <div className="progress-filters">
        <label>
          Année :
          <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
            <option value="all">Toutes</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label>
          Type :
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Tous</option>
            <option value="geometrie">Géométrie</option>
            <option value="calcul">Programme de calcul</option>
          </select>
        </label>
        <button className="reset-btn" onClick={handleReset}>Réinitialiser</button>
      </div>

      <div className="progress-list">
        {filteredExercises.map((ex) => (
          <ExerciseProgressRow
            key={ex.id}
            exercise={ex}
            progress={progress}
            onToggleDone={handleToggleDone}
            onSetRating={handleSetRating}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
