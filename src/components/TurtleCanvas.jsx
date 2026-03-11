import { useRef, useEffect, useCallback } from 'react'
import './TurtleCanvas.css'

const CANVAS_W = 480
const CANVAS_H = 360

export default function TurtleCanvas({ segments, turtleState, variables = {} }) {
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

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Create a temporary canvas at 1x DPR for clean export
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = CANVAS_W
    exportCanvas.height = CANVAS_H
    const ctx = exportCanvas.getContext('2d')
    ctx.drawImage(canvas, 0, 0, CANVAS_W, CANVAS_H)
    const link = document.createElement('a')
    link.download = 'scratch-crpe.png'
    link.href = exportCanvas.toDataURL('image/png')
    link.click()
  }, [])

  const handleDownloadSVG = useCallback(() => {
    const lines = segments.map((seg) => {
      const x1 = (CANVAS_W / 2 + seg.fromX).toFixed(2)
      const y1 = (CANVAS_H / 2 - seg.fromY).toFixed(2)
      const x2 = (CANVAS_W / 2 + seg.toX).toFixed(2)
      const y2 = (CANVAS_H / 2 - seg.toY).toFixed(2)
      return `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${seg.color}" stroke-width="${seg.thickness}" stroke-linecap="round" />`
    })
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}">
  <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="#fff" />
${lines.join('\n')}
</svg>`
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.download = 'scratch-crpe.svg'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }, [segments])

  const direText = variables['__dire__'] || ''

  return (
    <div className="turtle-canvas-wrapper">
      <div className="turtle-canvas-container">
        <canvas
          ref={canvasRef}
          style={{ width: CANVAS_W, height: CANVAS_H }}
          className="turtle-canvas"
        />
        {direText && (
          <div className="dire-bubble">{direText}</div>
        )}
      </div>
      <div className="turtle-coords">
        x : {Math.round(turtleState?.x ?? 0)} &nbsp;&nbsp;
        y : {Math.round(turtleState?.y ?? 0)} &nbsp;&nbsp;
        direction : {Math.round(turtleState?.angle ?? 0)}°
        {segments.length > 0 && (
          <>
            <button className="download-btn" onClick={handleDownload} title="Télécharger en PNG">
              PNG
            </button>
            <button className="download-btn" onClick={handleDownloadSVG} title="Télécharger en SVG">
              SVG
            </button>
          </>
        )}
      </div>
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

  // Labels axe X
  ctx.fillStyle = '#999'
  ctx.font = '9px sans-serif'
  ctx.textAlign = 'center'
  for (const x of [-240, -200, -160, -120, -80, -40, 40, 80, 120, 160, 200, 240]) {
    ctx.fillText(String(x), CANVAS_W / 2 + x, CANVAS_H / 2 + 12)
  }
  // Labels axe Y
  ctx.textAlign = 'right'
  for (const y of [-180, -140, -100, -60, -20, 20, 60, 100, 140, 180]) {
    ctx.fillText(String(y), CANVAS_W / 2 - 4, CANVAS_H / 2 - y + 3)
  }
  ctx.restore()
}

function drawTurtle(ctx, state) {
  const { x, y, angle } = state
  // Scratch angle: 0=up, 90=right => canvas rotation
  const rad = ((angle - 90) * Math.PI) / 180

  ctx.save()
  ctx.translate(x, -y)
  ctx.rotate(rad)

  // Draw a Scratch-style cat sprite silhouette
  const s = 1.2 // scale factor

  // Body (orange)
  ctx.fillStyle = '#FF8C1A'
  ctx.beginPath()
  ctx.ellipse(0, 0, 8 * s, 10 * s, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#CC6600'
  ctx.lineWidth = 1
  ctx.stroke()

  // Head
  ctx.fillStyle = '#FF8C1A'
  ctx.beginPath()
  ctx.arc(0, -12 * s, 7 * s, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Ears
  ctx.fillStyle = '#FF8C1A'
  ctx.beginPath()
  ctx.moveTo(-5 * s, -16 * s)
  ctx.lineTo(-8 * s, -22 * s)
  ctx.lineTo(-1 * s, -18 * s)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(5 * s, -16 * s)
  ctx.lineTo(8 * s, -22 * s)
  ctx.lineTo(1 * s, -18 * s)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Eyes
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.ellipse(-3 * s, -13 * s, 2.5 * s, 3 * s, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(3 * s, -13 * s, 2.5 * s, 3 * s, 0, 0, Math.PI * 2)
  ctx.fill()

  // Pupils
  ctx.fillStyle = '#333'
  ctx.beginPath()
  ctx.arc(-3 * s, -13 * s, 1.2 * s, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(3 * s, -13 * s, 1.2 * s, 0, Math.PI * 2)
  ctx.fill()

  // Direction arrow
  ctx.fillStyle = 'rgba(76, 151, 255, 0.6)'
  ctx.beginPath()
  ctx.moveTo(0, -26 * s)
  ctx.lineTo(-3 * s, -20 * s)
  ctx.lineTo(3 * s, -20 * s)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}
