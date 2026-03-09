export const exercises2022 = [
  {
    id: '2022-1',
    year: 2022,
    title: 'Losange avec variable C',
    description:
      'EST MAT 1, Exercice 4 — Le Programme 1 utilise une variable C (valeur initiale C = 50) pour tracer un quadrilatère. Échelle : 1 cm = 10 pixels. Le Programme 2 utilise le Programme 1 en boucle en modifiant la variable C pour obtenir des losanges emboîtés.',
    question:
      '1) En prenant C = 50 et 1 cm pour 10 pixels, tracer la figure du Programme 1. 2) Quelle est la nature de la figure tracée ? 3) Quelles valeurs attribuer à A et N dans le Programme 2 ?',
    blocks: [
      { type: 'mettre_variable', args: ['C', 50], category: 'variables' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [{ type: 'variable', name: 'C' }], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
    ],
    hints: [
      'Le Programme 1 trace un quadrilatère avec 4 côtés de C pas et des angles de 90°.',
      'Un carré est un losange particulier (losange à angles droits).',
      'Pour le Programme 2, observer comment la variable C évolue à chaque itération.',
    ],
    answer:
      'Le Programme 1 trace un carré (losange à angles droits) de côté 50 pas = 5 cm. Pour le Programme 2, A est la valeur ajoutée à C après chaque losange et N le nombre de répétitions.',
  },
  {
    id: '2022-2',
    year: 2022,
    title: 'Tirets horizontaux',
    description:
      'EST MAT 3, Exercice 4 — Un programme Scratch trace des tirets. Trois sous-questions progressives : tracer un tiret unique, puis des tirets répétés de 10 px séparés de 10 px, puis des tirets sur plusieurs lignes (translation).',
    question:
      '1) Représenter la figure obtenue. 2) Quelles modifications pour obtenir des tirets de 10 px séparés de 10 px ? 3) Comment obtenir des tirets sur plusieurs lignes ? Quelle transformation géométrique ?',
    subExercises: [
      {
        label: 'Q1 — Tiret unique',
        blocks: [
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'avancer', args: [30], category: 'motion' },
        ],
      },
      {
        label: 'Q2 — Tirets répétés',
        blocks: [
          {
            type: 'repeter',
            args: [5],
            category: 'control',
            body: [
              { type: 'styloPoser', args: [], category: 'pen' },
              { type: 'avancer', args: [10], category: 'motion' },
              { type: 'styloRelever', args: [], category: 'pen' },
              { type: 'avancer', args: [10], category: 'motion' },
            ],
          },
        ],
      },
      {
        label: 'Q3 — Plusieurs lignes',
        blocks: [
          { type: 'mettre_variable', args: ['y', 0], category: 'variables' },
          {
            type: 'repeter',
            args: [4],
            category: 'control',
            body: [
              { type: 'allerA', args: [0, { type: 'variable', name: 'y' }], category: 'motion' },
              { type: 'orienter', args: [90], category: 'motion' },
              {
                type: 'repeter',
                args: [5],
                category: 'control',
                body: [
                  { type: 'styloPoser', args: [], category: 'pen' },
                  { type: 'avancer', args: [10], category: 'motion' },
                  { type: 'styloRelever', args: [], category: 'pen' },
                  { type: 'avancer', args: [10], category: 'motion' },
                ],
              },
              { type: 'ajouter_variable', args: ['y', -20], category: 'variables' },
            ],
          },
        ],
      },
    ],
    blocks: [],
    hints: [
      'Q1 : Le lutin trace un simple segment de 30 pixels.',
      'Q2 : Alterner stylo posé/relevé avec avancer(10) pour les tirets et les espaces.',
      'Q3 : Ajouter une boucle externe avec un déplacement vertical. C\'est une translation.',
    ],
    answer:
      'Q2 : Utiliser répéter 5 fois [styloPoser, avancer(10), styloRelever, avancer(10)]. Q3 : Ajouter une boucle externe avec déplacement vertical. La transformation est une translation.',
  },
  {
    id: '2022-3',
    year: 2022,
    title: 'Programme de calcul d\'Adam',
    description:
      'EST MAT 2, Exercice — Programme de calcul : choisir un nombre x, lui ajouter 3, multiplier le résultat par (2x − 4), puis développer. Il faut montrer que le résultat final est 2x² − x − 6.',
    type: 'quiz',
    question:
      'Le programme d\'Adam : choisir x, calculer (2x + 3)(x − 2). Montrer que le résultat est 2x² − x − 6.',
    blocks: [],
    hints: [
      'Développer (2x + 3)(x − 2) en utilisant la double distributivité.',
      '2x × x = 2x², 2x × (−2) = −4x, 3 × x = 3x, 3 × (−2) = −6.',
    ],
    answer:
      '(2x + 3)(x − 2) = 2x² − 4x + 3x − 6 = 2x² − x − 6.',
  },
]
