import { useRef, useEffect } from 'react'
import './TurtleCanvas.css'

const CANVAS_W = 480
const CANVAS_H = 360

export default function TurtleCanvas({ segments, turtleState }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Clear
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Draw grid
    drawGrid(ctx)

    // Transform: origin at center, Y-up
    ctx.save()
    ctx.translate(CANVAS_W / 2, CANVAS_H / 2)

    // Draw segments
    for (const seg of segments) {
      ctx.beginPath()
      ctx.strokeStyle = seg.color
      ctx.lineWidth = seg.thickness
      ctx.lineCap = 'round'
      ctx.moveTo(seg.fromX, -seg.fromY)
      ctx.lineTo(seg.toX, -seg.toY)
      ctx.stroke()
    }

    // Draw turtle
    if (turtleState && turtleState.visible) {
      drawTurtle(ctx, turtleState)
    }

    ctx.restore()
  }, [segments, turtleState])

  return (
    <div className="turtle-canvas-wrapper">
      <canvas
        ref={canvasRef}
        style={{ width: CANVAS_W, height: CANVAS_H }}
        className="turtle-canvas"
      />
    </div>
  )
}

function drawGrid(ctx) {
  ctx.save()
  ctx.strokeStyle = '#E8E8E8'
  ctx.lineWidth = 0.5

  // Vertical lines
  for (let x = 0; x <= CANVAS_W; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, CANVAS_H)
    ctx.stroke()
  }
  // Horizontal lines
  for (let y = 0; y <= CANVAS_H; y += 40) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(CANVAS_W, y)
    ctx.stroke()
  }

  // Axes
  ctx.strokeStyle = '#CCCCCC'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(CANVAS_W / 2, 0)
  ctx.lineTo(CANVAS_W / 2, CANVAS_H)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, CANVAS_H / 2)
  ctx.lineTo(CANVAS_W, CANVAS_H / 2)
  ctx.stroke()

  // Origin label
  ctx.fillStyle = '#999'
  ctx.font = '10px sans-serif'
  ctx.fillText('0', CANVAS_W / 2 + 3, CANVAS_H / 2 + 12)
  ctx.restore()
}

function drawTurtle(ctx, state) {
  const { x, y, angle } = state
  const size = 10
  // Scratch angle: 0=up, 90=right => math: rad = (90 - angle) * PI/180
  const rad = ((90 - angle) * Math.PI) / 180

  ctx.save()
  ctx.translate(x, -y)
  ctx.rotate(-rad + Math.PI / 2)

  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(-size * 0.6, size * 0.5)
  ctx.lineTo(size * 0.6, size * 0.5)
  ctx.closePath()

  ctx.fillStyle = 'rgba(76, 151, 255, 0.7)'
  ctx.fill()
  ctx.strokeStyle = '#3373CC'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()
}
