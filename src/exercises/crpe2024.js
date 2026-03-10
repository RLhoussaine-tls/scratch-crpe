export const exercises2024 = [
  {
    id: '2024-1',
    year: 2024,
    title: 'Géoplan Scratch',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      "EST MAT 1, Exercice 5, Partie B.3 — Un programme Scratch construit une figure sur un géoplan de 25 picots (deux picots contigus = 3 cm). Échelle : 3 cm = 70 pas. Le point de départ est (−140 ; 140). Le lutin s'oriente à 90° (vers la droite). Il faut déterminer les valeurs de A, B et C.",
    question:
      'En prenant 3 cm pour 70 pas, déterminer les valeurs attribuées aux lettres A, B et C pour que le script permette de construire la figure.',
    blocks: [
      { type: 'effacer', args: [], category: 'pen' },
      { type: 'allerA', args: [-140, 140], category: 'motion' },
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'setEpaisseur', args: [3], category: 'pen' },
      { type: 'styloPoser', args: [], category: 'pen' },
      { type: 'avancer', args: [210], category: 'motion' },
      { type: 'tournerDroite', args: [90], category: 'motion' },
      { type: 'avancer', args: [70], category: 'motion' },
      { type: 'tournerDroite', args: [135], category: 'motion' },
      { type: 'avancer', args: [99], category: 'motion' },
      { type: 'tournerDroite', args: [135], category: 'motion' },
      { type: 'avancer', args: [280], category: 'motion' },
      { type: 'styloRelever', args: [], category: 'pen' },
    ],
    hints: [
      '3 cm = 70 pas (1 case). 210 pas = 3 cases horizontales.',
      'La diagonale B : 3 cases en diagonale = 3√2 cm ≈ 4,24 cm ≈ 99 pas.',
      'A = 135° : depuis l\'orientation vers le bas (après tourner 90°), tourner encore 135° oriente vers le haut-gauche.',
      'C = 135° : même logique pour clore la figure vers la gauche.',
    ],
    answer:
      "A = 135° (angle pour s'orienter en diagonale vers le haut-gauche), B ≈ 99 pas (diagonale de 3 cases = 3√2 cm × 70/3 ≈ 98,99 pas, arrondi à 99), C = 135° (angle pour s'orienter vers la gauche). Échelle : 3 cm = 70 pas.",
  },
  {
    id: '2024-2',
    year: 2024,
    title: 'Programme de calcul x² + 3x − 4',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    type: 'calcul',
    description:
      'EST MAT 2, Exercice 3 — Un script Scratch exécute un programme de calcul : choisir x, calculer x², ajouter 3x, soustraire 4. Le résultat est x² + 3x − 4.',
    question:
      'Exécuter le programme pour différentes valeurs de x. Montrer que le résultat est x² + 3x − 4. Factoriser cette expression.',
    blocks: [
      { type: 'demander', args: ['x', 5], category: 'sensing' },
      { type: 'mettre_variable_op', args: ['résultat', { type: 'variable', name: 'x' }, '*', { type: 'variable', name: 'x' }], category: 'operators' },
      { type: 'mettre_variable_op', args: ['résultat', { type: 'variable', name: 'résultat' }, '+', { type: 'op', op: '*', left: { type: 'variable', name: 'x' }, right: 3 }], category: 'operators' },
      { type: 'ajouter_variable', args: ['résultat', -4], category: 'variables' },
    ],
    hints: [
      'Le programme calcule x² + 3x − 4.',
      'Pour x=5 : 25 + 15 − 4 = 36.',
      'On peut factoriser : x² + 3x − 4 = (x − 1)(x + 4).',
      'Pour x=1 : 1 + 3 − 4 = 0. Pour x=−4 : 16 − 12 − 4 = 0.',
    ],
    answer:
      'Le résultat est x² + 3x − 4 = (x − 1)(x + 4). Pour x=5 : 36. Pour x=1 : 0. Pour x=−4 : 0.',
  },
  {
    id: '2024-3',
    year: 2024,
    title: 'Figure de base — Carré puis triangle',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      'EST MAT 3, Exercice 4 — Un script utilise un bloc « figure_de_base » avec une variable « longueur ». Le script initial trace des carrés. On demande ensuite de modifier le bloc pour tracer des triangles équilatéraux et de comparer les aires.',
    question:
      '1) Quelle est la nature de la figure de base ? 2) Tracer la figure obtenue après clic sur le drapeau vert. 3a) Quelles modifications pour obtenir un triangle équilatéral ? 3b) Quel est le rapport entre les aires des deux triangles ?',
    blocks: [
      { type: 'mettre_variable', args: ['longueur', 50], category: 'variables' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [{ type: 'variable', name: 'longueur' }], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
      { type: 'ajouter_variable', args: ['longueur', 50], category: 'variables' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          { type: 'avancer', args: [{ type: 'variable', name: 'longueur' }], category: 'motion' },
          { type: 'tournerDroite', args: [90], category: 'motion' },
        ],
      },
    ],
    hints: [
      'La figure de base répète 4 fois avec angle 90° → c\'est un carré.',
      'Pour un triangle équilatéral : 3 répétitions, angle extérieur 120°.',
      'Le rapport des aires de figures semblables est le carré du rapport de similitude.',
    ],
    answer:
      '1) Carré (4 côtés, angle 90°). 2) Deux carrés emboîtés de côtés 50 et 100. 3a) Remplacer 4 par 3 et 90° par 120°. 3b) Le rapport de similitude est 100/50 = 2, donc le rapport des aires est 2² = 4.',
  },
]
