import { useState, useRef, useCallback } from 'react'
import TurtleEngine from './engine/TurtleEngine'
import { runBlocksAnimated } from './utils/blockRunner'
import ExerciseList from './components/ExerciseList'
import ExercisePanel from './components/ExercisePanel'
import BlockSequence from './components/BlockSequence'
import TurtleCanvas from './components/TurtleCanvas'
import Toolbar from './components/Toolbar'
import './App.css'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function setValueAtPath(arr, path, val) {
  let target = arr
  for (let i = 0; i < path.length - 1; i++) {
    target = target[path[i]]
  }
  target[path[path.length - 1]] = val
}

export default function App() {
  const engineRef = useRef(new TurtleEngine())
  const cancelRef = useRef(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const [segments, setSegments] = useState([])
  const [turtleState, setTurtleState] = useState(engineRef.current.getState())
  const [activeBlockIndex, setActiveBlockIndex] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [animDelay, setAnimDelay] = useState(300)
  const [editedBlocks, setEditedBlocks] = useState(null)

  const activeBlocks = selectedExercise?.subExercises
    ? selectedExercise.subExercises[activeSubIndex]?.blocks ?? []
    : selectedExercise?.blocks ?? []

  const displayBlocks = editedBlocks ?? activeBlocks

  const isQuiz = selectedExercise?.type === 'quiz'
  const hasBlocks = displayBlocks && displayBlocks.length > 0
  const showCanvas = selectedExercise && !isQuiz
  const showBlocksReadOnly = selectedExercise && isQuiz && hasBlocks

  const handleEditBlock = useCallback((path, newValue) => {
    const base = editedBlocks ?? activeBlocks
    const copy = deepClone(base)
    setValueAtPath(copy, path, newValue)
    setEditedBlocks(copy)
  }, [editedBlocks, activeBlocks])

  const handleRun = useCallback(async () => {
    if (!selectedExercise || isQuiz || isRunning) return
    setIsRunning(true)
    setActiveBlockIndex(null)
    cancelRef.current = false
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())

    await runBlocksAnimated(
      displayBlocks,
      engine,
      {},
      (index) => {
        setActiveBlockIndex(index)
        setSegments([...engine.getSegments()])
        setTurtleState({ ...engine.getState() })
      },
      animDelay,
      cancelRef
    )

    setSegments(engine.getSegments())
    setTurtleState(engine.getState())
    setActiveBlockIndex(null)
    setIsRunning(false)
  }, [selectedExercise, displayBlocks, isQuiz, isRunning, animDelay])

  const handleStop = useCallback(() => {
    cancelRef.current = true
    setIsRunning(false)
    setActiveBlockIndex(null)
  }, [])

  const handleResetCanvas = useCallback(() => {
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  const handleResetExercise = useCallback(() => {
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  const handleSelect = useCallback((exercise) => {
    setSelectedExercise(exercise)
    setActiveSubIndex(0)
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  const handleSubSelect = useCallback((i) => {
    setActiveSubIndex(i)
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  return (
    <div className="app">
      <header className="scratch-header">
        <div className="scratch-logo">scratch-CRPE</div>
        <div className="scratch-subtitle">Annales CRPE 2022-2025</div>
      </header>
      <div className="app-body">
        <ExerciseList
          selectedId={selectedExercise?.id}
          onSelect={handleSelect}
        />
        <main className="main-area">
          <ExercisePanel
            exercise={selectedExercise}
            activeSubIndex={activeSubIndex}
            onSubSelect={handleSubSelect}
          />
          {showBlocksReadOnly && (
            <div className="workspace workspace-readonly">
              <div className="scripts-area">
                <div className="readonly-label">Programme Scratch a analyser</div>
                <BlockSequence blocks={displayBlocks} />
              </div>
            </div>
          )}
          {showCanvas && displayBlocks.length > 0 && (
            <div className="workspace">
              <div className="scripts-area">
                <BlockSequence
                  blocks={displayBlocks}
                  activeIndex={activeBlockIndex}
                  onEditBlock={handleEditBlock}
                />
                <Toolbar
                  onRun={handleRun}
                  onStop={handleStop}
                  onResetCanvas={handleResetCanvas}
                  onResetExercise={handleResetExercise}
                  isRunning={isRunning}
                  animDelay={animDelay}
                  onSpeedChange={setAnimDelay}
                  hasEdits={editedBlocks !== null}
                />
              </div>
              <div className="canvas-area">
                <TurtleCanvas segments={segments} turtleState={turtleState} />
              </div>
            </div>
          )}
          {showCanvas && displayBlocks.length === 0 && selectedExercise?.subExercises && (
            <div className="exercise-panel exercise-panel-empty">
              <p>Selectionnez une question ci-dessus pour voir les blocs</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
