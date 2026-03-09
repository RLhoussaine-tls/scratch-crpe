export const exercises2025 = [
  {
    id: '2025-1',
    year: 2025,
    title: 'Patron de pyramide SABCD',
    type: 'incomplete',
    description:
      'EST MAT 1, Exercice 6 — La pyramide SABCD a une base carrée ABCD de côté 4 cm et des faces latérales en triangles équilatéraux. Un script Scratch incomplet trace le patron. Échelle : 1 cm = 20 pas. Il faut trouver les valeurs M, N, P, R, T.',
    question:
      'En prenant 1 cm pour 20 pas, déterminer les valeurs à attribuer aux lettres M, N, P, R et T pour que le script permette de construire le patron de la pyramide SABCD.',
    // Script reconstitué d'après la Figure 4 du sujet (image PDF).
    // Valeurs confirmées par la géométrie : côté 4cm×20=80pas, angle extérieur
    // triangle équilatéral=120°, angle de dépliage entre carré et triangle=60°.
    // M=80, N=120, P=80, R=60, T=80 font consensus.
    blocks: [
      { type: 'allerA', args: [0, 0], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      // Carré de base (côté 80 pas = 4 cm)
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
      // Triangle 1 (face latérale)
      { type: 'tournerGauche', args: [60], category: 'motion' },
      {
        type: 'repeter',
        args: [3],
        category: 'control',
        body: [
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerGauche', args: [120], category: 'motion' },
        ],
      },
      // Repositionnement pour triangle 2
      { type: 'tournerDroite', args: [60], category: 'motion' },
      { type: 'avancer', args: [80], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'tournerGauche', args: [60], category: 'motion' },
      {
        type: 'repeter',
        args: [3],
        category: 'control',
        body: [
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerGauche', args: [120], category: 'motion' },
        ],
      },
    ],
    note: 'Script reconstitué d\'après la Figure 4 du sujet (image PDF). M=80, N=120, P=80, R=60, T=80 sont confirmés par la géométrie (côté 4cm×20=80pas, angle extérieur 120°, angle de dépliage 60°). Ces valeurs font consensus.',
    hints: [
      'Le côté du carré ABCD = 4 cm = 80 pas.',
      'Les faces latérales sont des triangles équilatéraux de côté 4 cm = 80 pas.',
      'L\'angle extérieur d\'un triangle équilatéral est 120°.',
      'Les angles du patron entre le carré et les triangles dépendent du pliage (60°).',
    ],
    answer:
      'M = 80 (côté du carré en pas), N = 120 (angle extérieur du triangle équilatéral), P = 80 (côté du triangle), R = 60 (angle d\'articulation dans le patron), T = 80 (côté). Le patron est composé du carré central et de 4 triangles équilatéraux.',
  },
  {
    id: '2025-2',
    year: 2025,
    title: 'Triangle rectangle isocèle',
    type: 'incomplete',
    description:
      'EST MAT 2, Exercice 5 — Le programme demande la valeur de « a » puis trace un triangle rectangle isocèle. Le lutin s\'oriente à 90° au départ. Pour a = 40 : tracer la figure, indiquer l\'orientation finale. Puis associer 3 programmes modifiés (A, B, C) à 4 figures. Note : le bloc « demander la valeur de a » est omis dans cette simulation (canvas statique) ; la figure est tracée pour a = 40.',
    question:
      '1) Pour a = 40, tracer la figure obtenue (1 cm = 10 pas). 2) Indiquer l\'orientation du lutin à la fin. 3) Associer chaque programme modifié (A, B, C) à la figure correspondante parmi les figures 1 à 4.',
    blocks: [
      { type: 'mettre_variable', args: ['a', 40], category: 'variables' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
      { type: 'tournerDroite', args: [135], category: 'motion' },
      // Hypoténuse = a√2 ≈ 56.6 pas (arrondi à 57)
      { type: 'avancer', args: [57], category: 'motion' },
    ],
    note: 'Le script principal est fidèle au sujet. L\'association programmes A/B/C → figures 1-4 nécessite les images du sujet original.',
    hints: [
      'Le triangle rectangle isocèle a un angle de 90° et deux angles de 45°.',
      'L\'hypoténuse = a√2 ≈ 40 × 1,414 ≈ 56,6 pas (arrondi à 57 pas).',
      'Les angles extérieurs sont 90° (pour l\'angle droit) et 135° (pour les angles de 45°).',
      'Le bloc « demander la valeur de a » est omis dans cette simulation (canvas statique). La figure est tracée pour a = 40.',
    ],
    answer:
      '1) Triangle rectangle isocèle de côtés 40 pas (4 cm) et hypoténuse ≈ 57 pas. 2) Le lutin finit orienté à 315° (nord-ouest) : départ 90°, +90° = 180°, +135° = 315°. 3) Associations à déterminer avec les images du sujet.',
  },
  {
    id: '2025-3',
    year: 2025,
    title: 'Patron pyramide — Bloc triangle',
    description:
      'EST MAT 3, Exercice 5 — Un bloc « triangle » trace un triangle équilatéral de côté 40 pas. Il faut compléter L1 et L2 du bloc, puis L3, L4, L5 du script pour tracer le patron d\'un moule pyramidal (base carrée de 4 cm, faces = triangles équilatéraux). Échelle : 10 pas = 1 cm.',
    question:
      'a) Compléter L1 et L2 du bloc triangle pour tracer un triangle équilatéral de côté 40 pas. b) Compléter L3, L4, L5 du script pour tracer le patron complet.',
    blocks: [
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      // Bloc "triangle" : L1 = 3 (répétitions), L2 = 120 (angle)
      {
        type: 'repeter',
        args: [3],
        category: 'control',
        body: [
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
        ],
      },
      // Carré de base (côté 40 pas = 4 cm)
      { type: 'tournerDroite', args: [60], category: 'motion' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
    ],
    hints: [
      'L\'angle extérieur d\'un triangle équilatéral est 120° → L2 = 120.',
      'Un triangle a 3 côtés → L1 = 3.',
      '10 pas = 1 cm, donc côté de 4 cm = 40 pas.',
      'Le patron a un carré central de 40 pas de côté et 4 triangles adjacents.',
    ],
    answer:
      'L1 = 3 (répéter 3 fois pour un triangle). L2 = 120 (tourner de 120° = angle extérieur du triangle équilatéral). L3, L4, L5 définissent l\'agencement des triangles autour du carré.',
  },
]
