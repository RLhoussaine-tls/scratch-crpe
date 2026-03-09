import { exercises2022 } from './crpe2022'
import { exercises2023 } from './crpe2023'
import { exercises2024 } from './crpe2024'
import { exercises2025 } from './crpe2025'

export const allExercises = [
  ...exercises2022,
  ...exercises2023,
  ...exercises2024,
  ...exercises2025,
]

export const exercisesByYear = {
  2022: exercises2022,
  2023: exercises2023,
  2024: exercises2024,
  2025: exercises2025,
}
