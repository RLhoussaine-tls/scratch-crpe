/**
 * Script to export exercises data to JSON.
 * Run with: node --experimental-vm-modules scripts/export-exercises-json.js
 *
 * This generates public/exercises.json for use with the static export.
 */

// Since the exercises are ES modules, we use dynamic import
import { createWriteStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const { allExercises } = await import('../src/exercises/index.js')

  // Strip heavy blocks data, keep metadata for JSON summary
  const summary = allExercises.map((ex) => ({
    id: ex.id,
    year: ex.year,
    groupement: ex.groupement || null,
    type: ex.type || 'geometrie',
    title: ex.title,
    description: ex.description,
    question: ex.question,
    answer: ex.answer,
    corrige: ex.corrige || null,
    hints: ex.hints || [],
    source: ex.source || 'officiel',
    sourceUrl: ex.sourceUrl || null,
  }))

  const outputPath = resolve(__dirname, '../public/exercises.json')
  const stream = createWriteStream(outputPath)
  stream.write(JSON.stringify(summary, null, 2))
  stream.end()
  console.log(`Exported ${summary.length} exercises to ${outputPath}`)
}

main().catch(console.error)
