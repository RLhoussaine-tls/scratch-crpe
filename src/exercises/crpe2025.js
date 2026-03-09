export const exercises2025 = [
  {
    id: '2025-1',
    year: 2025,
    title: 'L\'octogone régulier',
    description:
      'On souhaite tracer un octogone régulier (8 côtés) à l\'aide de Scratch.',
    question: 'Quel angle de rotation faut-il utiliser ? Compléter le programme.',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [8],
        category: 'control',
        body: [
          { type: 'avancer', args: [60], category: 'motion' },
          { type: 'tournerDroite', args: [45], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Pour un polygone régulier à n côtés, l\'angle extérieur vaut 360°/n.',
      '360°/8 = 45°.',
    ],
    answer:
      'L\'angle de rotation est 360°/8 = 45°. On obtient un octogone régulier de côté 60 pas.',
  },
  {
    id: '2025-2',
    year: 2025,
    title: 'Le cercle approché',
    description:
      'Pour approcher un cercle, on répète un grand nombre de fois : avancer d\'un petit pas puis tourner d\'un petit angle.',
    question:
      'Expliquer pourquoi ce programme trace approximativement un cercle. Quel est le rayon approximatif ?',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [36],
        category: 'control',
        body: [
          { type: 'avancer', args: [10], category: 'motion' },
          { type: 'tournerDroite', args: [10], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Le périmètre total est 36 × 10 = 360 pas.',
      'La formule du périmètre d\'un cercle est P = 2πr.',
      'Donc r ≈ 360 / (2π) ≈ 57 pas.',
    ],
    answer:
      'Le lutin fait de petits pas (10) en tournant de petits angles (10°), ce qui approxime un cercle. Le périmètre vaut 36 × 10 = 360 pas, donc r ≈ 360/(2π) ≈ 57 pas.',
  },
  {
    id: '2025-3',
    year: 2025,
    title: 'Le triangle rectangle isocèle',
    description:
      'On trace un triangle rectangle isocèle dont les côtés de l\'angle droit mesurent 100 pas.',
    question: 'Quels angles de rotation utilise-t-on ?',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      { type: 'avancer', args: [100], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [100], category: 'motion' },
      { type: 'tournerDroite', args: [135], category: 'motion' },
      { type: 'avancer', args: [141], category: 'motion' },
      { type: 'tournerDroite', args: [135], category: 'motion' },
    ],
    hints: [
      'Le triangle a un angle de 90° et deux angles de 45°.',
      'Les angles extérieurs sont : 180° − 90° = 90° et 180° − 45° = 135°.',
      'L\'hypoténuse mesure 100√2 ≈ 141 pas.',
    ],
    answer:
      'Les angles de rotation sont 90° (pour l\'angle droit) et 135° (pour les angles de 45°). L\'hypoténuse mesure 100√2 ≈ 141 pas.',
  },
]
