export const exercises2022 = [
  {
    id: '2022-1',
    year: 2022,
    title: 'Le carré',
    description:
      'Un programme Scratch permet de tracer un carré de côté 100 pas. Le lutin part du centre de la scène orienté vers la droite.',
    question: 'Quelle figure obtient-on en exécutant ce programme ?',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [100], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
    ],
    hints: ['Un carré a 4 côtés égaux et 4 angles droits.', 'L\'angle extérieur d\'un carré est 90°.'],
    answer: 'On obtient un carré de côté 100 pas.',
  },
  {
    id: '2022-2',
    year: 2022,
    title: 'Le triangle équilatéral',
    description:
      'Un programme Scratch trace un polygone régulier. Le lutin part du centre orienté vers le haut.',
    question: 'Quelle figure est tracée par ce programme ?',
    blocks: [
      { type: 'orienter', args: [0], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [3],
        category: 'control',
        body: [
          { type: 'avancer', args: [120], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Le lutin tourne de 120° à chaque sommet.',
      'L\'angle extérieur d\'un triangle équilatéral vaut 360°/3 = 120°.',
    ],
    answer: 'On obtient un triangle équilatéral de côté 120 pas.',
  },
  {
    id: '2022-3',
    year: 2022,
    title: 'L\'hexagone régulier',
    description:
      'Un programme Scratch trace un polygone régulier à 6 côtés. Le lutin part du centre.',
    question: 'Déterminer la figure obtenue et justifier l\'angle de rotation.',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [6],
        category: 'control',
        body: [
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [60], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Un hexagone régulier a 6 côtés.',
      'L\'angle extérieur vaut 360°/6 = 60°.',
    ],
    answer:
      'On obtient un hexagone régulier de côté 80 pas. L\'angle de rotation est 360°/6 = 60°.',
  },
]
