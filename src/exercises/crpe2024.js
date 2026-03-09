export const exercises2024 = [
  {
    id: '2024-1',
    year: 2024,
    title: 'La spirale carrée',
    description:
      'Un programme Scratch trace une spirale en augmentant la longueur du pas à chaque segment. Le lutin avance de 20 pas, puis 40, 60, 80… en tournant de 90° à chaque fois.',
    question: 'Décrire la figure obtenue après 8 segments.',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      { type: 'avancer', args: [20], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [40], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [60], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [80], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [100], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [120], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [140], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [160], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
    ],
    hints: [
      'Chaque segment est 20 pas plus long que le précédent.',
      'Le lutin tourne toujours de 90° (angle droit).',
      'Cela forme une spirale qui s\'éloigne du centre.',
    ],
    answer:
      'On obtient une spirale carrée. Le lutin trace des segments de plus en plus longs en tournant toujours à angle droit.',
  },
  {
    id: '2024-2',
    year: 2024,
    title: 'Le losange',
    description:
      'Un programme trace un losange dont les angles mesurent 60° et 120°.',
    question: 'Quels angles de rotation utiliser pour tracer ce losange ?',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [2],
        category: 'control',
        body: [
          { type: 'avancer', args: [100], category: 'motion' },
          { type: 'tournerDroite', args: [60], category: 'motion' },
          { type: 'avancer', args: [100], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Un losange a ses côtés opposés parallèles.',
      'Les angles extérieurs sont 60° et 120° (supplémentaires à 180° des angles intérieurs).',
    ],
    answer:
      'Les angles de rotation sont 60° et 120°. L\'angle extérieur est le supplément de l\'angle intérieur : 180° − 120° = 60° et 180° − 60° = 120°.',
  },
]
