export const exercises2025 = [
  {
    id: '2025-1',
    year: 2025,
    title: 'Patron de pyramide SABCD',
    description:
      "EST MAT 1, Exercice 6 — La pyramide SABCD a une base carrée ABCD de côté 4 cm et des faces latérales triangulaires équilatérales de côté 4 cm. Un script Scratch trace le patron. Échelle : 1 cm = 20 pas (donc 4 cm = 80 pas). Le lutin s'oriente à 90° au départ.",
    question:
      "Déterminer les valeurs à attribuer aux lettres M, N, P, R et T pour que le script permette de construire le patron de la pyramide SABCD.",
    blocks: [
      { type: 'effacer', args: [], category: 'pen' },
      { type: 'allerA', args: [0, 0], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'definir_bloc',
        args: ['carré'],
        category: 'custom',
        body: [
          {
            type: 'repeter',
            args: [4],
            category: 'control',
            body: [
              { type: 'avancer', args: [80], category: 'motion' },
              { type: 'tournerGauche', args: [90], category: 'motion' },
            ],
          },
        ],
      },
      {
        type: 'definir_bloc',
        args: ['arêtes latérales'],
        category: 'custom',
        body: [
          { type: 'tournerGauche', args: [30], category: 'motion' },
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
          { type: 'avancer', args: [80], category: 'motion' },
        ],
      },
      { type: 'appeler_bloc', args: ['carré'], category: 'custom' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'appeler_bloc', args: ['arêtes latérales'], category: 'custom' },
          { type: 'tournerGauche', args: [90], category: 'motion' },
        ],
      },
    ],
    hints: [
      "Le côté de la base ABCD = 4 cm = 80 pas (échelle 1 cm = 20 pas).",
      "M = 80 (côté du carré en pas). N = 90 (angle gauche pour fermer le carré).",
      "P = 80 (côté du triangle = 4 cm = 80 pas).",
      "R = 30 (angle de rotation vers l'extérieur pour orienter le triangle).",
      "T = 4 (4 faces latérales, une par côté du carré). Chaque face est un triangle équilatéral.",
      "L'angle extérieur du triangle équilatéral est 120°.",
    ],
    answer:
      "M = 80 (côté du carré en pas), N = 90 (tourner à gauche de 90° pour le carré), P = 80 (côté du triangle en pas), R = 30 (angle d'orientation vers l'extérieur), T = 4 (4 triangles latéraux). Le script trace d'abord le carré central, puis les 4 triangles équilatéraux en pivotant de 90° entre chaque.",
  },
  {
    id: '2025-2',
    year: 2025,
    title: 'Triangle rectangle isocèle',
    description:
      "EST MAT 2, Exercice 5 — Le programme demande la valeur de « a » puis trace un triangle rectangle isocèle. Le lutin s'oriente à 90° au départ. Programme de base (a=40) : avancer a, tourner droite 90°, avancer a, tourner droite 135°, avancer a√2, tourner droite 135°, avancer a, tourner droite 90°.\nProgramme A : ajoute « avancer de a+10 pas » à la fin → décale le départ vers la droite.\nProgramme B : supprime le dernier « avancer a » et « tourner droite 90° » → triangle sans retour.\nProgramme C : ajoute « ajouter 10 à a » à la fin → triangles de taille croissante.",
    question:
      "1) Pour a = 40, tracer la figure obtenue (1 cm = 10 pas). 2) Indiquer l'orientation du lutin à la fin. 3) Associer chaque programme modifié (A, B, C) à la figure correspondante parmi les figures 1 à 4.",
    subExercises: [
      {
        subtitle: "Q1 — Programme de base (a=40)",
        description: "Le programme de base trace un triangle rectangle isocèle pour a = 40.",
        question: "Tracer la figure obtenue pour a = 40 (1 cm = 10 pas). Indiquer l'orientation finale du lutin.",
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [135], category: 'motion' },
          { type: 'avancer', args: [57], category: 'motion' },
          { type: 'tournerDroite', args: [135], category: 'motion' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
        answer: "Triangle rectangle isocèle de côtés 40 pas et hypoténuse ≈ 57 pas. Orientation finale : 90° (vers la droite, après un tour complet de 90+135+135+90=450° = 360°+90°).",
      },
      {
        subtitle: "Programme A → Figure 2",
        description: "Programme A : programme de base + « avancer de a+10 pas » (soit 50 pas) à la fin. Chaque répétition décale le point de départ vers la droite.",
        question: "À quelle figure correspond le programme A ?",
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [135], category: 'motion' },
          { type: 'avancer', args: [57], category: 'motion' },
          { type: 'tournerDroite', args: [135], category: 'motion' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
          { type: 'avancer', args: [50], category: 'motion' },
        ],
        answer: "Programme A → Figure 2 : triangles en escalier vers la droite. Le lutin avance de a+10=50 pas après chaque triangle, décalant le départ.",
      },
      {
        subtitle: "Programme B → Figure 4",
        description: "Programme B : programme de base sans le dernier « avancer a » ni « tourner droite 90° ».",
        question: "À quelle figure correspond le programme B ?",
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [135], category: 'motion' },
          { type: 'avancer', args: [57], category: 'motion' },
        ],
        answer: "Programme B → Figure 4 : grand triangle avec diagonales parallèles à l'intérieur. Sans le retour, chaque triangle partage la diagonale du suivant.",
      },
      {
        subtitle: "Programme C → Figure 3",
        description: "Programme C : programme de base + « ajouter 10 à a » à la fin. Triangles de taille croissante (a = 40, 50, 60, 70…).",
        question: "À quelle figure correspond le programme C ?",
        blocks: [
          { type: 'mettre_variable', args: ['a', 30], category: 'variables' },
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'ajouter_variable', args: ['a', 10], category: 'variables' },
            { type: 'orienter', args: [90], category: 'motion' },
            { type: 'styloPoser', args: [], category: 'pen' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [90], category: 'motion' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [135], category: 'motion' },
            { type: 'avancer', args: [57], category: 'motion' },
            { type: 'tournerDroite', args: [135], category: 'motion' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [90], category: 'motion' },
          ]},
        ],
        answer: "Programme C → Figure 3 : triangles de taille croissante vers la gauche. La valeur de a augmente de 10 à chaque itération (40, 50, 60, 70…).",
      },
    ],
    blocks: [],
    hints: [
      "Le triangle rectangle isocèle a un angle de 90° et deux angles de 45°.",
      "L'hypoténuse = a√2 ≈ 40 × 1,414 ≈ 56,6 pas (arrondi à 57 pas).",
      "Programme A → Figure 2 : triangles identiques décalés vers la droite.",
      "Programme B → Figure 4 : triangles imbriqués partageant la diagonale.",
      "Programme C → Figure 3 : triangles de taille croissante.",
    ],
    answer:
      "1) Triangle rectangle isocèle de côtés 40 pas (4 cm) et hypoténuse ≈ 57 pas. 2) Orientation finale : 90° (tour complet : 90+135+135+90=450°=360°+90°). 3) Programme A → Figure 2, Programme B → Figure 4, Programme C → Figure 3.",
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
      {
        type: 'repeter',
        args: [3],
        category: 'control',
        body: [
          { type: 'avancer', args: [40], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
        ],
      },
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
      "L'angle extérieur d'un triangle équilatéral est 120° → L2 = 120.",
      'Un triangle a 3 côtés → L1 = 3.',
      '10 pas = 1 cm, donc côté de 4 cm = 40 pas.',
      'Le patron a un carré central de 40 pas de côté et 4 triangles adjacents.',
    ],
    answer:
      "L1 = 3 (répéter 3 fois pour un triangle). L2 = 120 (tourner de 120° = angle extérieur du triangle équilatéral). L3, L4, L5 définissent l'agencement des triangles autour du carré.",
  },
]
