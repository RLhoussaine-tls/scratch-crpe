# scratch-crpe

Réplique de Scratch pour s'entraîner aux exercices de programmation des annales du CRPE (Concours de Recrutement de Professeurs des Écoles).

## Démo

[lien GitHub Pages]

## Installation

```bash
git clone https://github.com/RLhoussaine-tls/scratch-crpe
cd scratch-crpe
npm install
npm run dev
```

## Build et déploiement

```bash
npm run build
npm run deploy  # déploie sur GitHub Pages via gh-pages
```

## Structure du projet

```
src/
├── engine/
│   └── TurtleEngine.js       # Moteur de dessin tortue (Canvas HTML5, coordonnées Scratch)
├── utils/
│   ├── blockRunner.js         # Exécuteur de blocs Scratch (async, animé)
│   └── colors.js              # Palette couleurs Scratch 3.0 par catégorie
├── components/
│   ├── App.jsx                # Composant principal
│   ├── AskModal.jsx           # Modal interactive pour le bloc demander
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

## Exercices couverts

15 exercices issus des annales officielles CRPE 2022–2025.

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
| 2024 | Segments directionnels — Touches a, b, c | Géométrie |
| 2025 | Patron de pyramide SABCD | Géométrie |
| 2025 | Triangle rectangle isocèle | Géométrie |
| 2025 | Patron pyramide — Bloc triangle | Géométrie |

## Technologies

React 18, Vite 6, CSS vanilla, Canvas HTML5

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

Types de blocs supportés (tous en camelCase) : `avancer`, `reculer`, `tournerDroite`, `tournerGauche`, `allerA`, `orienter`, `styloPoser`, `styloRelever`, `setCouleur`, `setEpaisseur`, `effacer`, `repeter`, `repeterJusqua`, `si`, `siSinon`, `mettreVariable`, `ajouterVariable`, `mettreVariableOp`, `mettreVariableComp`, `ajouterX`, `ajouterY`, `definirBloc`, `appelerBloc`, `demander`, `dire`.

Les valeurs d'arguments peuvent être :
- Un nombre : `100`
- Une référence de variable : `{ type: 'variable', name: 'x' }`
- Une expression : `{ type: 'op', op: '*', left: ..., right: ... }`

## Licence

MIT
