export const CATEGORY_COLORS = {
  motion: '#4C97FF',
  pen: '#0fBD8C',
  control: '#FFAB19',
  event: '#FFD500',
  looks: '#9966FF',
  sensing: '#5CB1D6',
  operators: '#59C059',
  variables: '#FF8C1A',
}

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#888888'
}
