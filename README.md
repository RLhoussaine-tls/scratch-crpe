# scratch-CRPE

Outil d'entraînement interactif pour les exercices de programmation Scratch des annales du CRPE (Concours de Recrutement de Professeurs des Écoles).

## Stack technique

- React 18
- Vite 6
- CSS vanilla
- Canvas HTML5 (480×360, origine au centre, Y vers le haut)

## Installation

```bash
npm install
npm run dev
```

## Structure des fichiers

```
src/
├── engine/
│   └── TurtleEngine.js       # Moteur tortue (segments, angles Scratch)
├── utils/
│   ├── blockRunner.js         # Exécution sync (runBlocks) et async animée (runBlocksAnimated)
│   └── colors.js              # Palette couleurs par catégorie de bloc
├── components/
│   ├── App.jsx                # Composant principal
│   ├── Block.jsx              # Rendu visuel d'un bloc Scratch
│   ├── BlockSequence.jsx      # Séquence de blocs empilés
│   ├── ExerciseList.jsx       # Liste des exercices par année
│   ├── ExercisePanel.jsx      # Détail d'un exercice (description, question, réponse)
│   ├── Toolbar.jsx            # Boutons exécuter/stop/reset + slider vitesse
│   ├── TurtleCanvas.jsx       # Canvas de rendu avec grille et tortue
│   └── VariablePanel.jsx      # Affichage des variables pour les exercices de calcul
└── exercises/
    ├── index.js               # Export centralisé
    ├── crpe2022.js            # Exercices CRPE 2022
    ├── crpe2023.js            # Exercices CRPE 2023
    ├── crpe2024.js            # Exercices CRPE 2024
    └── crpe2025.js            # Exercices CRPE 2025
```

## Comment ajouter un exercice

Chaque exercice est un objet JavaScript avec la structure suivante :

```js
{
  id: 'YYYY-N',              // Identifiant unique
  year: 2025,                // Année du CRPE
  title: 'Titre',            // Titre court
  type: 'quiz' | 'calcul',  // Optionnel. 'quiz' = lecture seule, 'calcul' = affiche variables
  description: '...',        // Contexte de l'exercice
  question: '...',           // Question posée
  blocks: [                  // Blocs Scratch à exécuter
    { type: 'avancer', args: [100], category: 'motion' },
    { type: 'repeter', args: [4], category: 'control', body: [...] },
  ],
  subExercises: [],          // Optionnel : sous-questions avec leurs propres blocs
  hints: ['...'],            // Indices progressifs
  answer: '...',             // Réponse complète
}
```

Types de blocs supportés : `avancer`, `reculer`, `tournerDroite`, `tournerGauche`, `allerA`, `orienter`, `styloPoser`, `styloRelever`, `setCouleur`, `setEpaisseur`, `repeter`, `repeter_jusqu_a`, `si`, `si_sinon`, `mettre_variable`, `ajouter_variable`, `mettre_variable_op`, `mettre_variable_comp`, `definir_bloc`, `appeler_bloc`, `effacer`, `ajouter_x`, `ajouter_y`.

Les valeurs d'arguments peuvent être :
- Un nombre : `100`
- Une référence de variable : `{ type: 'variable', name: 'x' }`
- Une expression : `{ type: 'op', op: '*', left: ..., right: ... }`

## Exercices couverts

| Année | Exercice | Type |
|-------|----------|------|
| 2022 | Losange avec variable C | Géométrie |
| 2022 | Programme d'Adam | Calcul |
| 2022 | Tirets et transformations | Géométrie |
| 2022 | Patron de cube | Géométrie |
| 2023 | Triangles emboîtés | Géométrie |
| 2023 | Carré — Qui a raison ? | Géométrie |
| 2023 | Étoile à 5 branches | Géométrie |
| 2023 | Programmes de calcul A et B | Calcul |
| 2024 | Géoplan Scratch | Géométrie |
| 2024 | Programme de calcul x²+3x−4 | Calcul |
| 2024 | Figure de base — Carré puis triangle | Géométrie |
| 2025 | Patron de pyramide SABCD | Géométrie |
| 2025 | Triangle rectangle isocèle | Géométrie |
| 2025 | Patron pyramide — Bloc triangle | Géométrie |

## Comment contribuer

1. Forker le repository
2. Créer une branche pour votre fonctionnalité
3. Ajouter vos exercices dans `src/exercises/crpeXXXX.js`
4. Vérifier que `npm run build` passe sans erreur
5. Ouvrir une Pull Request

## Licence

MIT
