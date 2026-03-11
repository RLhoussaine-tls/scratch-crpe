export const exercises2025 = [
  {
    id: '2025-g1-pyramide',
    year: 2025,
    groupement: 1,
    title: 'Patron de pyramide SABCD',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
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
        type: 'definirBloc',
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
        type: 'definirBloc',
        args: ['arêtes latérales'],
        category: 'custom',
        body: [
          { type: 'tournerGauche', args: [30], category: 'motion' },
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [120], category: 'motion' },
          { type: 'avancer', args: [80], category: 'motion' },
        ],
      },
      { type: 'appelerBloc', args: ['carré'], category: 'custom' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'appelerBloc', args: ['arêtes latérales'], category: 'custom' },
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
    id: '2025-g2-triangle-iso',
    year: 2025,
    groupement: 2,
    title: 'Triangle rectangle isocèle',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
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
        description: "Programme C : programme de base + « ajouter 10 à a » à la fin. Triangles de taille croissante (a = 40, 50, 60, 70…). L'hypoténuse vaut a×√2 (calculée dynamiquement).",
        question: "À quelle figure correspond le programme C ?",
        blocks: [
          { type: 'mettreVariable', args: ['a', 30], category: 'variables' },
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'ajouterVariable', args: ['a', 10], category: 'variables' },
            { type: 'orienter', args: [90], category: 'motion' },
            { type: 'styloPoser', args: [], category: 'pen' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [90], category: 'motion' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [135], category: 'motion' },
            { type: 'avancer', args: [{ type: 'op', op: '*', left: { type: 'variable', name: 'a' }, right: { type: 'op', op: 'sqrt', left: 2 } }], category: 'motion' },
            { type: 'tournerDroite', args: [135], category: 'motion' },
            { type: 'avancer', args: [{ type: 'variable', name: 'a' }], category: 'motion' },
            { type: 'tournerDroite', args: [90], category: 'motion' },
          ]},
        ],
        answer: "Programme C → Figure 3 : triangles de taille croissante vers la gauche. La valeur de a augmente de 10 à chaque itération (40, 50, 60, 70…). L'hypoténuse = a×√2.",
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
    id: '2025-g3-patron-triangle',
    year: 2025,
    groupement: 3,
    title: 'Patron pyramide — Bloc triangle',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      "EST MAT 3, Exercice 5 — Un bloc « triangle » trace un triangle équilatéral de côté 40 pas. Il faut compléter L1 et L2 du bloc, puis L3, L4, L5 du script pour tracer le patron d'un moule pyramidal (base carrée de 4 cm, faces = triangles équilatéraux). Échelle : 10 pas = 1 cm.",
    question:
      "a) Compléter L1 et L2 du bloc triangle pour tracer un triangle équilatéral de côté 40 pas. b) Compléter L3, L4, L5 du script pour tracer le patron complet.",
    subExercises: [
      {
        subtitle: "Q1 — Bloc triangle (L1 et L2)",
        description: "Le bloc 'triangle' trace un triangle équilatéral de côté 40 pas. L1 est le nombre de répétitions, L2 est l'angle de rotation.",
        question: "Compléter L1 et L2. L1 = ? L2 = ?",
        blocks: [
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'repeter', args: [3], category: 'control', body: [
            { type: 'avancer', args: [40], category: 'motion' },
            { type: 'tournerDroite', args: [120], category: 'motion' },
          ]},
        ],
        answer: "L1 = 3 (un triangle a 3 côtés). L2 = 120° (angle extérieur d'un triangle équilatéral = 360°/3 = 120°).",
      },
      {
        subtitle: "Q2 — Patron complet (L3, L4, L5)",
        description: "Le script trace le patron : carré central de 40 pas, puis 4 triangles équilatéraux sur chaque côté. Utilise le bloc 'triangle' défini en Q1.",
        question: "Compléter L3, L4, L5 du script pour tracer le patron complet.",
        blocks: [
          { type: 'definirBloc', args: ['triangle'], category: 'custom', body: [
            { type: 'repeter', args: [3], category: 'control', body: [
              { type: 'avancer', args: [40], category: 'motion' },
              { type: 'tournerDroite', args: [120], category: 'motion' },
            ]},
          ]},
          { type: 'orienter', args: [90], category: 'motion' },
          { type: 'styloPoser', args: [], category: 'pen' },
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'avancer', args: [40], category: 'motion' },
            { type: 'tournerGauche', args: [90], category: 'motion' },
          ]},
          { type: 'repeter', args: [4], category: 'control', body: [
            { type: 'tournerGauche', args: [60], category: 'motion' },
            { type: 'appelerBloc', args: ['triangle'], category: 'custom' },
            { type: 'tournerGauche', args: [30], category: 'motion' },
            { type: 'avancer', args: [40], category: 'motion' },
          ]},
        ],
        answer: "L3 = appeler 'triangle' (trace le triangle sur le côté courant). L4 = tourner à gauche de 30° (réorientation). L5 = avancer de 40 pas (passage au côté suivant). Le patron est composé du carré central et de 4 triangles équilatéraux.",
      },
    ],
    blocks: [],
    hints: [
      "L1 = 3 (triangle = 3 côtés), L2 = 120° (angle extérieur du triangle équilatéral).",
      "Le carré a 4 côtés de 40 pas, angle intérieur 90°, angle extérieur pour tourner gauche = 90°.",
      "Pour placer un triangle sur un côté du carré : s'orienter vers l'extérieur (tourner gauche 60°), tracer le triangle, puis se réorienter (tourner gauche 30°) et avancer de 40 pas pour passer au côté suivant.",
      "60° + 30° = 90° = angle de rotation entre deux côtés du carré.",
    ],
    answer:
      "L1 = 3, L2 = 120°. L3 = appeler 'triangle', L4 = tourner gauche 30°, L5 = avancer 40. Le patron est composé du carré central et de 4 triangles équilatéraux.",
  },
]
