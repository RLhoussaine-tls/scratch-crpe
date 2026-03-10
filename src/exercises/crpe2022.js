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
  {
    id: '2022-g2-adam',
    year: 2022,
    title: "Programme d'Adam",
    type: 'quiz',
    description: "Adam a créé un programme de calcul dans Scratch. L'utilisateur saisit un nombre x. Le programme calcule (x−3) et (2x+2), puis les multiplie.",
    question: "Si l'utilisateur saisit le nombre 2, montrer que le programme retourne −6. Puis montrer que pour tout nombre x, le programme retourne 2x²−x−6.",
    hints: [
      'Pour x=2 : (2−3)=−1 et (2×2+2)=6, donc (−1)×6=−6',
      'Développer (x−3)(2x+2) = 2x²+2x−6x−6 = 2x²−x−6 (sic)',
    ],
    answer: 'Le programme retourne 2x²−x−6 pour tout x.',
  },
  {
    id: '2022-g3-tirets',
    year: 2022,
    title: 'Tirets et transformations',
    description: "Un programme Scratch trace des tirets. Le lutin est initialement orienté vers la droite (90°).",
    subExercises: [
      {
        id: '2022-g3-tirets-q1',
        subtitle: 'Q1 — Figure originale',
        description: 'Exécuter le programme tel quel : le lutin trace un tiret, avance sans tracer, puis tourne de 90°. Répéter 4 fois.',
        question: 'Représenter la figure obtenue (1 mm = 1 pixel).',
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'stylo_poser', category: 'pen' },
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'stylo_relever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'tourner_droite', args: [90], category: 'motion' },
            { type: 'stylo_poser', category: 'pen' },
          ]},
        ],
        answer: 'On obtient un L composé de 4 tirets formant un carré ouvert.',
      },
      {
        id: '2022-g3-tirets-q2',
        subtitle: 'Q2 — Tirets en ligne',
        description: 'Marie modifie le programme : répéter 8 fois, sans tourner.',
        question: 'Quelles modifications apporter pour obtenir 8 tirets alignés horizontalement ?',
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'stylo_poser', category: 'pen' },
          { type: 'repeter', args: [8], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'stylo_relever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'stylo_poser', category: 'pen' },
          ]},
        ],
        answer: "Supprimer le bloc 'tourner' et passer le répéter à 8 fois.",
      },
      {
        id: '2022-g3-tirets-q3',
        subtitle: 'Q3 — Tirets en étoile',
        description: 'Lo modifie le programme pour obtenir des tirets en étoile. Tourner de 45° au lieu de 90°, répéter 8 fois.',
        question: "Quelles modifications pour obtenir une étoile de tirets ? Quelle transformation géométrique passe d'un tiret à l'autre ?",
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'stylo_poser', category: 'pen' },
          { type: 'repeter', args: [8], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'stylo_relever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'tourner_droite', args: [45], category: 'motion' },
            { type: 'stylo_poser', category: 'pen' },
          ]},
        ],
        answer: 'Changer 90° en 45° et répéter 8 fois. La transformation est une rotation de 45°.',
      },
    ],
    blocks: [],
    hints: [
      'Q1 : Le lutin trace un tiret de 10 px, avance sans tracer de 10 px, puis tourne de 90°.',
      'Q2 : Sans le bloc tourner, les tirets restent alignés horizontalement.',
      'Q3 : Avec 45° au lieu de 90°, les tirets forment une étoile (8 × 45° = 360°).',
    ],
    answer: 'Q1 : carré ouvert de tirets. Q2 : 8 tirets en ligne. Q3 : étoile de tirets (rotation de 45°).',
  },
  {
    id: '2022-g4-patron-cube',
    year: 2022,
    title: 'Patron de cube',
    description: "Une enseignante veut faire construire des dés cubiques de 3 cm de côté avec Scratch. 1 pas = 0.05 cm, donc 60 pas = 3 cm. Le bloc 'carré' trace un carré de 60 pas puis avance de 60 pas stylo relevé.",
    subExercises: [
      {
        id: '2022-g4-patron-q1',
        subtitle: 'Q1 — Patron en croix',
        description: 'Compléter le bloc carré (avancer 60, tourner 90°, répéter 4 fois) puis ordonner les instructions pour tracer le patron en croix.',
        blocks: [
          { type: 'definir_bloc', args: ['carré'], category: 'custom', body: [
            { type: 'stylo_poser', category: 'pen' },
            { type: 'repeter', args: [4], category: 'control', body: [
              { type: 'avancer', args: [60], category: 'motion' },
              { type: 'tourner_droite', args: [90], category: 'motion' },
            ]},
            { type: 'stylo_relever', category: 'pen' },
            { type: 'avancer', args: [60], category: 'motion' },
          ]},
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
          { type: 'ajouter_y', args: [60], category: 'motion' },
          { type: 'ajouter_x', args: [-180], category: 'motion' },
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
          { type: 'ajouter_y', args: [-120], category: 'motion' },
          { type: 'ajouter_x', args: [-60], category: 'motion' },
          { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
        ],
        answer: 'Le patron forme une croix de 6 carrés.',
      },
      {
        id: '2022-g4-patron-q2',
        subtitle: 'Q2 — Second patron',
        description: "Un second algorithme utilise deux boucles imbriquées : répéter 2 fois { carré, répéter 3 fois { ajouter -60 à x }, ajouter -60 à y }.",
        question: 'Dessiner ce patron à main levée.',
        blocks: [
          { type: 'definir_bloc', args: ['carré'], category: 'custom', body: [
            { type: 'stylo_poser', category: 'pen' },
            { type: 'repeter', args: [4], category: 'control', body: [
              { type: 'avancer', args: [60], category: 'motion' },
              { type: 'tourner_droite', args: [90], category: 'motion' },
            ]},
            { type: 'stylo_relever', category: 'pen' },
            { type: 'avancer', args: [60], category: 'motion' },
          ]},
          { type: 'repeter', args: [2], category: 'control', body: [
            { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
            { type: 'repeter', args: [3], category: 'control', body: [
              { type: 'ajouter_x', args: [-60], category: 'motion' },
            ]},
            { type: 'ajouter_y', args: [-60], category: 'motion' },
          ]},
        ],
        answer: "On obtient un patron en L : 1 carré en haut à gauche, puis 3 en dessous formant une colonne décalée.",
      },
    ],
    blocks: [],
    hints: [
      "Le bloc 'carré' trace un carré de 60 pas de côté puis avance de 60 pas stylo relevé.",
      "Pour le patron en croix, il faut positionner 6 carrés en forme de +.",
      'Le second patron utilise des boucles imbriquées pour positionner les carrés.',
    ],
    answer: "Q1 : patron en croix (6 carrés). Q2 : patron en L (2 carrés alignés puis décalés).",
  },
]
