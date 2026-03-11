import { useState, useRef, useCallback } from 'react'
import TurtleEngine from './engine/TurtleEngine'
import { runBlocksAnimated } from './utils/blockRunner'
import ExerciseList from './components/ExerciseList'
import ExercisePanel from './components/ExercisePanel'
import BlockSequence from './components/BlockSequence'
import TurtleCanvas from './components/TurtleCanvas'
import Toolbar from './components/Toolbar'
import VariablePanel from './components/VariablePanel'
import InputPrompt from './components/InputPrompt'
import BlockPalette from './components/BlockPalette'
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
  const [activePath, setActivePath] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [animDelay, setAnimDelay] = useState(300)
  const [editedBlocks, setEditedBlocks] = useState(null)
  const [variables, setVariables] = useState({})
  const [promptState, setPromptState] = useState(null)
  const promptResolveRef = useRef(null)
  const [freeMode, setFreeMode] = useState(false)
  const [freeBlocks, setFreeBlocks] = useState([])

  const activeBlocks = freeMode
    ? freeBlocks
    : selectedExercise?.subExercises
      ? selectedExercise.subExercises[activeSubIndex]?.blocks ?? []
      : selectedExercise?.blocks ?? []

  const displayBlocks = editedBlocks ?? activeBlocks

  const activeSub = selectedExercise?.subExercises?.[activeSubIndex]
  const isQuiz = !freeMode && (activeSub?.type === 'quiz' || (!activeSub && selectedExercise?.type === 'quiz'))
  const isCalcul = !freeMode && selectedExercise?.type === 'calcul' && !isQuiz
  const hasBlocks = displayBlocks && displayBlocks.length > 0
  const showCanvas = freeMode || (selectedExercise && !isQuiz)
  const showBlocksReadOnly = !freeMode && selectedExercise && isQuiz && hasBlocks

  const handleEditBlock = useCallback((path, newValue) => {
    const base = editedBlocks ?? activeBlocks
    const copy = deepClone(base)
    setValueAtPath(copy, path, newValue)
    setEditedBlocks(copy)
  }, [editedBlocks, activeBlocks])

  const handleRun = useCallback(async () => {
    if ((!selectedExercise && !freeMode) || isQuiz || isRunning) return
    setIsRunning(true)
    setActivePath(null)
    cancelRef.current = false
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    const vars = {}
    setVariables(vars)

    const handlePrompt = (varName, defaultValue) => {
      return new Promise((resolve) => {
        promptResolveRef.current = resolve
        setPromptState({ varName, defaultValue })
      })
    }

    await runBlocksAnimated(
      displayBlocks,
      engine,
      vars,
      (path) => { setActivePath(path) },
      () => {
        setSegments([...engine.getSegments()])
        setTurtleState({ ...engine.getState() })
        setVariables({ ...vars })
      },
      animDelay,
      cancelRef,
      {},
      [],
      handlePrompt
    )

    setSegments(engine.getSegments())
    setTurtleState(engine.getState())
    setVariables({ ...vars })
    setActivePath(null)
    setIsRunning(false)
  }, [selectedExercise, displayBlocks, isQuiz, isRunning, animDelay])

  const handleStop = useCallback(() => {
    cancelRef.current = true
    setIsRunning(false)
    setActivePath(null)
  }, [])

  const handleResetCanvas = useCallback(() => {
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    setVariables({})
  }, [])

  const handleResetExercise = useCallback(() => {
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    setVariables({})
  }, [])

  const handleSelect = useCallback((exercise) => {
    setFreeMode(false)
    setSelectedExercise(exercise)
    setActiveSubIndex(0)
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    setVariables({})
  }, [])

  const handlePromptSubmit = useCallback((value) => {
    if (promptResolveRef.current) {
      promptResolveRef.current(value)
      promptResolveRef.current = null
    }
    setPromptState(null)
  }, [])

  const handleSubSelect = useCallback((i) => {
    setActiveSubIndex(i)
    setEditedBlocks(null)
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    setVariables({})
  }, [])

  const handleDropBlock = useCallback((e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/scratch-block')
    if (!data) return
    try {
      const newBlock = JSON.parse(data)
      if (freeMode) {
        setFreeBlocks(prev => [...prev, newBlock])
      } else {
        const base = editedBlocks ?? activeBlocks
        const copy = deepClone(base)
        copy.push(newBlock)
        setEditedBlocks(copy)
      }
    } catch { /* ignore invalid data */ }
  }, [freeMode, editedBlocks, activeBlocks])

  const handleEnterFreeMode = useCallback(() => {
    setFreeMode(true)
    setSelectedExercise(null)
    setEditedBlocks(null)
    setFreeBlocks([])
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
    setVariables({})
  }, [])

  const handleDragOver = useCallback((e) => {
    if (e.dataTransfer.types.includes('application/scratch-block')) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }
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
          freeMode={freeMode}
          onFreeMode={handleEnterFreeMode}
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
                <div className="readonly-label">Programme Scratch à analyser</div>
                <BlockSequence blocks={displayBlocks} />
              </div>
            </div>
          )}
          {showCanvas && (freeMode || displayBlocks.length > 0) && (
            <div className="workspace">
              <BlockPalette />
              <div
                className="scripts-area"
                onDrop={handleDropBlock}
                onDragOver={handleDragOver}
              >
                <BlockSequence
                  blocks={displayBlocks}
                  activePath={activePath}
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
                {isCalcul ? (
                  <VariablePanel variables={variables} />
                ) : (
                  <TurtleCanvas segments={segments} turtleState={turtleState} variables={variables} />
                )}
              </div>
            </div>
          )}
          {showCanvas && displayBlocks.length === 0 && selectedExercise?.subExercises && (
            <div className="exercise-panel exercise-panel-empty">
              <p>Sélectionnez une question ci-dessus pour voir les blocs</p>
            </div>
          )}
        </main>
      </div>
      {promptState && (
        <InputPrompt
          varName={promptState.varName}
          defaultValue={promptState.defaultValue}
          onSubmit={handlePromptSubmit}
        />
      )}
    </div>
  )
}
