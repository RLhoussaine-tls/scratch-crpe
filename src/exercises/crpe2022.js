export const exercises2022 = [
  {
    id: '2022-g1-polygone',
    year: 2022,
    groupement: 1,
    title: 'Polygone régulier avec variable C',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      'EST MAT 1, Exercice 4 — Programme 1 : répéter 4 fois [avancer C pas, tourner droite 90°]. Variable C initialisée à 50. Échelle : 1 cm = 10 pixels (C=50 → 5 cm de côté). Programme 2 : répéter N fois [exécuter Programme 1, tourner droite A°].',
    question:
      '1) En prenant C = 50 et 1 cm pour 10 pixels, tracer la figure du Programme 1. 2) Quelle est la nature de la figure tracée ? 3) Quelles valeurs attribuer à A et N dans le Programme 2 pour obtenir une rosace carrée ? 4) Quelle est la valeur de C après exécution du Programme 1 ? 5) Comment modifier le programme pour que chaque segment fasse 30 pixels ?',
    blocks: [
      { type: 'mettreVariable', args: ['C', 50], category: 'variables' },
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
      'Le Programme 1 répète 4 fois : avancer C pas + tourner droite 90°.',
      '4 côtés égaux et 4 angles de 90° → la figure est un carré.',
      'Pour une rosace, A × N doit être un multiple de 360°. Exemple : A=30°, N=12.',
      'C ne change pas car le Programme 1 ne modifie pas la variable C.',
      'Pour des segments de 30 px, remplacer C=50 par C=30.',
    ],
    answer:
      'Le Programme 1 trace un carré de côté C=50 pas = 5 cm (4 côtés égaux, 4 angles droits de 90°). La figure est un carré. Pour une rosace carrée : A=30° et N=12 (ou tout multiple de 360° : A=45°/N=8, A=90°/N=4…). C ne change pas après exécution car le programme ne modifie pas la variable. Pour des segments de 30 px : initialiser C à 30.',
    corrige: {
      figure: "Carré de côté 50 pas (= 5 cm à l'échelle 1 cm = 10 pas)",
      variables: { C: 50 },
      etapes: [
        "Programme 1 : répéter 4 fois { avancer C=50 pas, tourner droite 90° } → carré de 5 cm",
        "4 côtés égaux + 4 angles droits → carré",
        "Programme 2 : rosace avec A=30°, N=12 (30×12=360°) ou A=45°, N=8 etc.",
        "C reste à 50 après exécution (programme ne modifie pas C)",
        "Pour C=30 px : mettre C à 30 au lieu de 50",
      ],
      erreurs_classiques: [
        "Appeler la figure 'losange' : un carré est un losange particulier, mais la réponse attendue est 'carré'",
        "Oublier de justifier géométriquement (4 côtés égaux ET 4 angles droits)",
        "Penser que C change après exécution alors que le programme ne modifie pas la variable",
      ],
      difficulte: 2,
    },
  },
  {
    id: '2022-g2-adam',
    year: 2022,
    groupement: 2,
    title: "Programme d'Adam",
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    type: 'calcul',
    description: "CRPE 2022, Groupement 2, Exercice 4 — Adam a créé un programme de calcul dans Scratch. L'utilisateur choisit un nombre x, l'élève au carré, soustrait 3, multiplie par 2, puis soustrait le nombre de départ. Cela donne f(x) = (x²−3)×2 − x = 2x²−x−6.",
    question: "Exécuter le programme pour différentes valeurs de x. Montrer que pour tout nombre x, le programme retourne 2x²−x−6. Factoriser cette expression.",
    blocks: [
      { type: 'demander', args: ['x', 3], category: 'sensing' },
      { type: 'mettreVariableOp', args: ['résultat', { type: 'variable', name: 'x' }, '*', { type: 'variable', name: 'x' }], category: 'operators' },
      { type: 'ajouterVariable', args: ['résultat', -3], category: 'variables' },
      { type: 'mettreVariableOp', args: ['résultat', { type: 'variable', name: 'résultat' }, '*', 2], category: 'operators' },
      { type: 'mettreVariableOp', args: ['résultat', { type: 'variable', name: 'résultat' }, '-', { type: 'variable', name: 'x' }], category: 'operators' },
    ],
    hints: [
      "pour x=2 : 2×(2²)−2−6 = 8−2−6 = 0 ✔",
      'Pour tout x : résultat = x², puis −3 → x²−3, puis ×2 → 2x²−6, puis −x → 2x²−x−6',
      'On peut factoriser : 2x²−x−6 = (2x+3)(x−2)',
    ],
    answer: 'Pour tout x : x²→x²−3→2(x²−3)=2x²−6→2x²−6−x=2x²−x−6. Factorisation : 2x²−x−6 = (2x+3)(x−2). Pour x=3 : 2(9)−3−6 = 9. Pour x=0 : −6. Pour x=2 : 0.',
    corrige: {
      figure: "Programme de calcul — résultat algébrique : 2x²−x−6",
      variables: { "f(x)": "2x²−x−6", "factorisation": "(2x+3)(x−2)", "racines": "x=−3/2 ou x=2" },
      etapes: [
        "Étape 1 : x² (résultat ← x × x)",
        "Étape 2 : x² − 3 (ajouter −3)",
        "Étape 3 : 2(x²−3) = 2x²−6 (× 2)",
        "Étape 4 : 2x²−6−x = 2x²−x−6 (soustraire x)",
        "Factorisation : chercher (ax+b)(cx+d) → a×c=2, b×d=−6 → (2x+3)(x−2)",
        "Vérification : (2x+3)(x−2) = 2x²−4x+3x−6 = 2x²−x−6 ✓",
      ],
      erreurs_classiques: [
        "Oublier de développer pour vérifier la factorisation",
        "Confondre les signes lors de la décomposition",
        "Ne pas tester des valeurs particulières pour vérifier (x=2 → 0)",
      ],
      difficulte: 3,
    },
  },
  {
    id: '2022-g3-tirets',
    year: 2022,
    groupement: 3,
    title: 'Tirets et transformations',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description: "Un programme Scratch trace des tirets. Le lutin est initialement orienté vers la droite (90°).",
    subExercises: [
      {
        id: '2022-g3-tirets-q1',
        subtitle: 'Q1 — Figure originale',
        description: 'Exécuter le programme tel quel : le lutin trace un tiret, avance sans tracer, puis tourne de 90°. Répéter 4 fois.',
        question: 'Représenter la figure obtenue (1 mm = 1 pixel).',
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', category: 'pen' },
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'styloRelever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'tournerDroite', args: [90], category: 'motion' },
            { type: 'styloPoser', category: 'pen' },
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
          { type: 'styloPoser', category: 'pen' },
          { type: 'repeter', args: [8], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'styloRelever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'styloPoser', category: 'pen' },
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
          { type: 'styloPoser', category: 'pen' },
          { type: 'repeter', args: [8], category: 'control', body: [
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'styloRelever', category: 'pen' },
            { type: 'avancer', args: [10], category: 'motion' },
            { type: 'tournerDroite', args: [45], category: 'motion' },
            { type: 'styloPoser', category: 'pen' },
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
    id: '2022-S4-4a',
    year: 2022,
    title: 'Patron de cube — Bloc carré',
    description: "Un élève souhaite construire le patron d'un cube de 3 cm de côté avec Scratch. 1 pas = 0,05 cm donc 3 cm = 60 pas.",
    question: "Compléter le bloc `carré` : avancer de combien de pas ? Tourner de combien de degrés ? Répéter combien de fois ?",
    blocks: [
      {
        type: 'definirBloc',
        args: ['carré'],
        category: 'custom',
        body: [
          { type: 'styloPoser', args: [], category: 'pen' },
          {
            type: 'repeter', args: [4], category: 'control',
            body: [
              { type: 'avancer', args: [60], category: 'motion' },
              { type: 'tournerDroite', args: [90], category: 'motion' },
            ]
          },
          { type: 'styloRelever', args: [], category: 'pen' },
          { type: 'avancer', args: [60], category: 'motion' },
        ]
      },
      { type: 'effacer', args: [], category: 'pen' },
      { type: 'allerA', args: [-150, -60], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      // Ligne du bas : 4 carrés
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      // Remonter pour la ligne du milieu
      { type: 'allerA', args: [-150, 0], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      // Remonter encore pour la ligne du haut
      { type: 'allerA', args: [-90, 0], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
    ],
    answer: "Avancer de 60 pas (car 3 cm ÷ 0,05 = 60), tourner de 90°, répéter 4 fois. Le patron est une croix de 4 carrés en ligne + 2 carrés décalés.",
  },
  {
    id: '2022-S4-4b',
    year: 2022,
    title: 'Patron de cube — Algorithme en T',
    description: "Un deuxième algorithme trace un autre patron de cube avec répétitions imbriquées.",
    question: "Dessiner le patron obtenu par ce programme : répéter 3 fois [appeler carré, ajouter -60 à x], puis répéter 2 fois [ajouter -60 à y, appeler carré].",
    type: 'quiz',
    blocks: [
      {
        type: 'definirBloc', args: ['carré'], category: 'custom',
        body: [
          { type: 'styloPoser', args: [], category: 'pen' },
          {
            type: 'repeter', args: [4], category: 'control',
            body: [
              { type: 'avancer', args: [60], category: 'motion' },
              { type: 'tournerDroite', args: [90], category: 'motion' },
            ]
          },
          { type: 'styloRelever', args: [], category: 'pen' },
        ]
      },
      { type: 'effacer', args: [], category: 'pen' },
      { type: 'allerA', args: [-90, 60], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      {
        type: 'repeter', args: [3], category: 'control',
        body: [
          { type: 'appelerBloc', args: ['carré'], category: 'custom' },
          { type: 'ajouterX', args: [-60], category: 'motion' },
        ]
      },
      {
        type: 'repeter', args: [2], category: 'control',
        body: [
          { type: 'ajouterY', args: [-60], category: 'motion' },
          { type: 'appelerBloc', args: ['carré'], category: 'custom' },
        ]
      },
    ],
    answer: "Le patron obtenu est une croix en T inversé : 3 carrés en ligne horizontale et 2 carrés vers le bas depuis le carré central.",
  },
]
