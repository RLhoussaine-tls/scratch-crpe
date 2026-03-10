import { useState, useRef, useCallback } from 'react'
import TurtleEngine from './engine/TurtleEngine'
import { runBlocks } from './utils/blockRunner'
import ExerciseList from './components/ExerciseList'
import ExercisePanel from './components/ExercisePanel'
import BlockSequence from './components/BlockSequence'
import TurtleCanvas from './components/TurtleCanvas'
import Toolbar from './components/Toolbar'
import './App.css'

export default function App() {
  const engineRef = useRef(new TurtleEngine())
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const [segments, setSegments] = useState([])
  const [turtleState, setTurtleState] = useState(engineRef.current.getState())

  const activeBlocks = selectedExercise?.subExercises
    ? selectedExercise.subExercises[activeSubIndex]?.blocks ?? []
    : selectedExercise?.blocks ?? []

  const isQuiz = selectedExercise?.type === 'quiz'
  const hasBlocks = activeBlocks && activeBlocks.length > 0
  const showCanvas = selectedExercise && !isQuiz
  const showBlocksReadOnly = selectedExercise && isQuiz && hasBlocks

  const handleRun = useCallback(() => {
    if (!selectedExercise || isQuiz) return
    const engine = engineRef.current
    engine.reset()
    runBlocks(activeBlocks, engine, {})
    setSegments(engine.getSegments())
    setTurtleState(engine.getState())
  }, [selectedExercise, activeBlocks, isQuiz])

  const handleReset = useCallback(() => {
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  const handleSelect = useCallback((exercise) => {
    setSelectedExercise(exercise)
    setActiveSubIndex(0)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  return (
    <div className="app">
      <ExerciseList
        selectedId={selectedExercise?.id}
        onSelect={handleSelect}
      />
      <main className="main-area">
        <ExercisePanel
          exercise={selectedExercise}
          activeSubIndex={activeSubIndex}
          onSubSelect={(i) => {
            setActiveSubIndex(i)
            const engine = engineRef.current
            engine.reset()
            setSegments([])
            setTurtleState(engine.getState())
          }}
        />
        {showBlocksReadOnly && (
          <div className="workspace workspace-readonly">
            <div className="blocks-area">
              <div className="readonly-label">Programme Scratch à analyser</div>
              <BlockSequence blocks={activeBlocks} />
            </div>
          </div>
        )}
        {showCanvas && activeBlocks.length > 0 && (
          <div className="workspace">
            <div className="blocks-area">
              <BlockSequence blocks={activeBlocks} />
              <Toolbar onRun={handleRun} onReset={handleReset} />
            </div>
            <div className="canvas-area">
              <TurtleCanvas segments={segments} turtleState={turtleState} />
            </div>
          </div>
        )}
        {showCanvas && activeBlocks.length === 0 && selectedExercise?.subExercises && (
          <div className="exercise-panel exercise-panel-empty">
            <p>← Sélectionnez une question ci-dessus pour voir les blocs</p>
          </div>
        )}
      </main>
    </div>
  )
}
