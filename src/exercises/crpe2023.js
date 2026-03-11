export const exercises2023 = [
  {
    id: '2023-g1-triangles',
    year: 2023,
    groupement: 1,
    title: 'Triangles emboîtés',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      'EST MAT 1, Exercice 3 — Un programme utilise un bloc « Triangle » paramétré par la variable « côté ». Le script appelle ce bloc plusieurs fois en augmentant « côté » de 20 à chaque itération, en partant de côté = 20.',
    question:
      'a) Quelles sont les coordonnées du point de départ du tracé ? b) Combien de triangles sont dessinés ? c) Quelle est la nature des triangles ? d) Quelle est la longueur d\'un côté du 2e triangle ?',
    blocks: [
      { type: 'mettre_variable', args: ['côté', 20], category: 'variables' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [4],
        category: 'control',
        body: [
          {
            type: 'repeter',
            args: [3],
            category: 'control',
            body: [
              { type: 'avancer', args: [{ type: 'variable', name: 'côté' }], category: 'motion' },
              { type: 'tournerDroite', args: [120], category: 'motion' },
            ],
          },
          { type: 'ajouter_variable', args: ['côté', 20], category: 'variables' },
        ],
      },
    ],
    hints: [
      'Le lutin commence à (0, 0).',
      'L\'angle extérieur d\'un triangle équilatéral est 120°.',
      'La variable côté augmente de 20 à chaque triangle : 20, 40, 60, 80.',
    ],
    answer:
      'a) (0, 0). b) 4 triangles. c) Triangles équilatéraux (3 côtés égaux, angle extérieur 120°). d) Le 2e triangle a côté = 40 pas.',
  },
  {
    id: '2023-g3-carre',
    year: 2023,
    groupement: 3,
    title: 'Carré — Qui a raison ?',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      'EST MAT 3, Exercice 3, Q1 — Un script trace « répéter 4 fois [avancer de 100 pas, tourner ↻ de 90 degrés] ». Quatre élèves commentent : Pierre dit « c\'est un losange », Ana dit « ce n\'est pas un rectangle », Karim dit « c\'est un quadrilatère », Lucie dit « c\'est un carré ».',
    question:
      'Dire si chaque affirmation est vraie ou fausse en justifiant. Pierre : « C\'est un losange. » Ana : « Ce n\'est pas un rectangle. » Karim : « C\'est un quadrilatère. » Lucie : « C\'est un carré. »',
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
    hints: [
      'Un carré a 4 côtés égaux et 4 angles droits.',
      'Un carré est à la fois un losange, un rectangle et un quadrilatère.',
    ],
    answer:
      'Pierre : VRAI (un carré est un losange particulier). Ana : FAUX (un carré est un rectangle). Karim : VRAI (un carré est un quadrilatère). Lucie : VRAI.',
  },
  {
    id: '2023-g3-etoile',
    year: 2023,
    groupement: 3,
    title: 'Étoile à 5 branches',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    description:
      'EST MAT 3, Exercice 3, Q2c — Un script Scratch incomplet trace une étoile à 5 branches. Le lutin est orienté à 90° (vers la droite). Il faut compléter le nombre de répétitions et l\'angle de rotation aux pointes.',
    question:
      'Compléter le script pour construire l\'étoile à 5 branches. Combien de répétitions ? Quel angle de rotation aux pointes ?',
    blocks: [
      { type: 'orienter', args: [90], category: 'motion' },
      { type: 'styloPoser', args: [], category: 'pen' },
      {
        type: 'repeter',
        args: [5],
        category: 'control',
        body: [
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [144], category: 'motion' },
          { type: 'avancer', args: [80], category: 'motion' },
          { type: 'tournerDroite', args: [72], category: 'motion' },
        ],
      },
    ],
    hints: [
      'L\'étoile a 5 branches donc on répète 5 fois.',
      'Pour une étoile à 5 branches, l\'angle aux pointes vaut 144° (= 720°/5).',
      'L\'angle dans les creux vaut 72° (= 360°/5).',
    ],
    answer:
      'Répéter 5 fois. L\'angle aux pointes est 144° (le lutin fait 2 tours complets : 720°/5 = 144°). L\'angle dans les creux est 72°. Le périmètre est 5 × (80 + 80) = 800 pas.',
  },
  {
    id: '2023-g2-programmes-calcul',
    year: 2023,
    groupement: 2,
    title: 'Programmes de calcul A et B',
    sourceUrl: 'https://www.devenirenseignant.gouv.fr/les-sujets-des-epreuves-ecrites-du-crpe-externe-et-du-crpe-externe-special-899',
    type: 'calcul',
    description: "Deux programmes de calcul : le programme A utilise des blocs Scratch exécutables, le programme B est décrit textuellement.",
    question: "1. Montrer que si l'utilisateur saisit 2, le programme A retourne 54.\n2. Calculer le résultat du programme A pour 1, 15.\n3. Pour quels nombres le programme A retourne-t-il 0 ?\n4a. Programme B pour x=3 ?\n4b. Programme B pour x=3/4 ?\n7. Pour quels nombres les deux programmes retournent-ils le même résultat ?",
    hints: [
      'Programme A : pour x=2 → b=2×2+5=9, c=5×2−4=6, résultat=9×6=54',
      'Programme A retourne (2x+5)(5x−4) = 10x²+17x−20',
      'Programme B retourne (2x+5)²',
      'A=B ⟺ (2x+5)(5x−4) = (2x+5)² ⟺ (2x+5)(5x−4−2x−5) = 0 ⟺ (2x+5)(3x−9) = 0',
    ],
    answer: "Programme A = (2x+5)(5x−4) = 10x²+17x−20. Programme B = (2x+5)². Égaux pour x=−5/2 ou x=3 (résoudre (2x+5)(3x−9)=0).",
    subExercises: [
      {
        subtitle: 'Programme A',
        description: "Choisir un nombre x, calculer b = 2x+5, calculer c = 5x−4, calculer résultat = b×c.\nPour x=2 → b=9, c=6, résultat=54. Pour x=1 → résultat=(2+5)(5−4)=7×1=7. Pour x=−5/2 → résultat=0.",
        blocks: [
          { type: 'demander', args: ['x', 2], category: 'sensing' },
          { type: 'mettre_variable_op', args: ['b', { type: 'variable', name: 'x' }, '*', 2], category: 'variables' },
          { type: 'mettre_variable_op', args: ['b', { type: 'variable', name: 'b' }, '+', 5], category: 'variables' },
          { type: 'mettre_variable_op', args: ['c', { type: 'op', op: '*', left: 5, right: { type: 'variable', name: 'x' } }, '-', 4], category: 'variables' },
          { type: 'mettre_variable_op', args: ['résultat', { type: 'variable', name: 'b' }, '*', { type: 'variable', name: 'c' }], category: 'variables' },
        ],
      },
      {
        subtitle: 'Programme B',
        type: 'quiz',
        description: "Choisir un nombre x, prendre son double, ajouter 5, calculer le carré du résultat → (2x+5)².",
        blocks: [
          { type: 'demander', args: ['x', 3], category: 'sensing' },
          { type: 'mettre_variable_op', args: ['b', { type: 'op', op: '*', left: 2, right: { type: 'variable', name: 'x' } }, '+', 5], category: 'variables' },
          { type: 'mettre_variable_op', args: ['résultat', { type: 'variable', name: 'b' }, '*', { type: 'variable', name: 'b' }], category: 'variables' },
        ],
      },
    ],
  },
]
