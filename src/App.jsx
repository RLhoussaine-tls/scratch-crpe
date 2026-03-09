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
  const [segments, setSegments] = useState([])
  const [turtleState, setTurtleState] = useState(engineRef.current.getState())

  const handleRun = useCallback(() => {
    if (!selectedExercise) return
    const engine = engineRef.current
    engine.reset()
    runBlocks(selectedExercise.blocks, engine)
    setSegments(engine.getSegments())
    setTurtleState(engine.getState())
  }, [selectedExercise])

  const handleReset = useCallback(() => {
    const engine = engineRef.current
    engine.reset()
    setSegments([])
    setTurtleState(engine.getState())
  }, [])

  const handleSelect = useCallback((exercise) => {
    setSelectedExercise(exercise)
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
        <ExercisePanel exercise={selectedExercise} />
        {selectedExercise && (
          <div className="workspace">
            <div className="blocks-area">
              <BlockSequence blocks={selectedExercise.blocks} />
              <Toolbar onRun={handleRun} onReset={handleReset} />
            </div>
            <div className="canvas-area">
              <TurtleCanvas segments={segments} turtleState={turtleState} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
