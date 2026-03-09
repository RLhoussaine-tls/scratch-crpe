export const exercises2023 = [
  {
    id: '2023-1',
    year: 2023,
    title: 'Le pentagone régulier',
    description:
      'On souhaite tracer un pentagone régulier (5 côtés) à l\'aide de Scratch.',
    question:
      'Quel angle de rotation faut-il utiliser ? Justifier.',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [5],
        category: 'control',
        body: [
          { type: 'avancer', args: [90], category: 'motion' },
          { type: 'tournerDroite', args: [72], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Pour un polygone régulier à n côtés, l\'angle extérieur vaut 360°/n.',
      '360°/5 = 72°.',
    ],
    answer:
      'L\'angle de rotation est 360°/5 = 72°. On obtient un pentagone régulier de côté 90 pas.',
  },
  {
    id: '2023-2',
    year: 2023,
    title: 'L\'étoile à 5 branches',
    description:
      'Un programme Scratch trace une étoile à 5 branches en tournant de 144° à chaque pas.',
    question: 'Pourquoi l\'angle de 144° permet-il de tracer une étoile ?',
    blocks: [
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [5],
        category: 'control',
        body: [
          { type: 'avancer', args: [120], category: 'motion' },
          { type: 'tournerDroite', args: [144], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Pour une étoile à 5 branches, le lutin fait 2 tours complets : 2 × 360° = 720°.',
      '720°/5 = 144°.',
    ],
    answer:
      'Le lutin parcourt 2 tours complets (720°) en 5 étapes : 720°/5 = 144°. Cela crée une étoile à 5 branches.',
  },
  {
    id: '2023-3',
    year: 2023,
    title: 'Deux carrés imbriqués',
    description:
      'Le programme trace deux carrés : un premier carré de côté 100, puis le lutin tourne de 45° et trace un second carré de côté 100.',
    question: 'Décrire la figure obtenue.',
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
      { type: 'tournerDroite', args: [45], category: 'motion' },
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
    hints: [
      'Le deuxième carré est pivoté de 45° par rapport au premier.',
      'Les deux carrés partagent le même centre.',
    ],
    answer:
      'On obtient deux carrés de même taille, pivotés de 45° l\'un par rapport à l\'autre, formant une étoile à 8 pointes.',
  },
]
