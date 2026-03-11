import './Notions.css'

const SECTIONS = [
  {
    id: 'systeme-coord',
    title: 'Système de coordonnées Scratch',
    content: [
      { type: 'text', value: 'Dans Scratch, le centre de la scène est le point (0, 0). Les axes s\'étendent de −240 à +240 en x et de −180 à +180 en y.' },
      { type: 'table', headers: ['Axe', 'Min', 'Max', 'Direction'], rows: [
        ['x', '−240', '+240', 'gauche → droite'],
        ['y', '−180', '+180', 'bas → haut'],
      ]},
      { type: 'tip', value: 'Contrairement aux axes mathématiques habituels, les coordonnées y croissent vers le haut dans Scratch.' },
    ],
  },
  {
    id: 'orientation',
    title: 'Orientation du lutin',
    content: [
      { type: 'text', value: 'Dans Scratch, l\'orientation du lutin est mesurée en degrés en partant du haut et en tournant dans le sens horaire.' },
      { type: 'compass', entries: [
        { angle: 0, label: '0° → haut', symbol: '↑' },
        { angle: 90, label: '90° → droite', symbol: '→' },
        { angle: 180, label: '180° → bas', symbol: '↓' },
        { angle: 270, label: '270° → gauche', symbol: '←' },
      ]},
      { type: 'warning', value: 'Attention : dans Scratch, 0° = vers le haut (nord). Ce n\'est pas la même convention que les mathématiques où 0° = vers la droite.' },
      { type: 'tip', value: '"s\'orienter à 90°" pointe vers la droite. "tourner à droite de 90°" fait pivoter dans le sens horaire.' },
    ],
  },
  {
    id: 'polygones',
    title: 'Angles des polygones réguliers',
    content: [
      { type: 'text', value: 'Pour tracer un polygone régulier à n côtés dans Scratch, on répète n fois : avancer + tourner de 360°/n.' },
      { type: 'table', headers: ['Polygone', 'n côtés', 'Angle extérieur (tourner)', 'Angle intérieur'], rows: [
        ['Triangle équilatéral', '3', '120°', '60°'],
        ['Carré', '4', '90°', '90°'],
        ['Pentagone', '5', '72°', '108°'],
        ['Hexagone', '6', '60°', '120°'],
        ['Heptagone', '7', '≈51,4°', '≈128,6°'],
        ['Octogone', '8', '45°', '135°'],
        ['Décagone', '10', '36°', '144°'],
      ]},
      { type: 'formula', value: 'Angle de rotation = 360° ÷ n   (pour un polygone régulier à n côtés)' },
      { type: 'tip', value: 'Pour une étoile à 5 branches : répéter 5 fois { avancer, tourner 144°, avancer, tourner 72° }. L\'angle de pointe est 720°/5 = 144°.' },
    ],
  },
  {
    id: 'tourner-vs-orienter',
    title: 'Différence entre "tourner" et "s\'orienter"',
    content: [
      { type: 'comparison', left: {
        title: 'tourner à droite / gauche de … degrés',
        points: [
          'Change l\'orientation de façon relative',
          'Ajoute ou soustrait des degrés à l\'orientation actuelle',
          'Exemple : si orienté à 90°, tourner droite 45° → 135°',
          'Utile dans les boucles pour les polygones',
        ],
      }, right: {
        title: 's\'orienter à … degrés',
        points: [
          'Fixe l\'orientation de façon absolue',
          'Ignore l\'orientation actuelle',
          'Exemple : s\'orienter à 0° → toujours vers le haut',
          'Utile pour réinitialiser la direction',
        ],
      }},
      { type: 'tip', value: 'Dans les exercices CRPE, "s\'orienter" est souvent utilisé au début pour positionner le lutin, puis "tourner" dans les boucles.' },
    ],
  },
  {
    id: 'variables',
    title: 'Variables dans Scratch',
    content: [
      { type: 'text', value: 'Les variables permettent de stocker des valeurs numériques ou textuelles. Dans Scratch, toutes les variables sont globales (accessibles partout).' },
      { type: 'block-examples', blocks: [
        { label: 'mettre [variable] à [valeur]', desc: 'Affecte une valeur à une variable', color: '#FF8C1A' },
        { label: 'ajouter [valeur] à [variable]', desc: 'Incrémente une variable', color: '#FF8C1A' },
        { label: 'demander [question] et attendre', desc: 'Demande une valeur à l\'utilisateur', color: '#60AFFF' },
      ]},
      { type: 'tip', value: 'Dans les programmes CRPE, les variables sont souvent des lettres (a, b, c, C, N, M…) représentant des longueurs ou des angles à deviner.' },
    ],
  },
  {
    id: 'boucles',
    title: 'Boucles dans Scratch',
    content: [
      { type: 'text', value: 'Scratch propose deux types de boucles principales :' },
      { type: 'block-examples', blocks: [
        { label: 'répéter [n] fois', desc: 'Exécute le bloc n fois (n fixé). C\'est la boucle la plus courante au CRPE.', color: '#FFAB19' },
        { label: 'répéter indéfiniment', desc: 'Boucle infinie (rare au CRPE)', color: '#FFAB19' },
        { label: 'répéter jusqu\'à [condition]', desc: 'Boucle conditionnelle (rare au CRPE)', color: '#FFAB19' },
      ]},
      { type: 'tip', value: 'Pour un polygone à n côtés : répéter n fois { avancer de c pas, tourner à droite de 360/n degrés }.' },
      { type: 'warning', value: 'Attention aux boucles imbriquées : la boucle interne s\'exécute entièrement à chaque itération de la boucle externe.' },
    ],
  },
  {
    id: 'stylo',
    title: 'Commandes du stylo',
    content: [
      { type: 'text', value: 'Le lutin peut tracer des figures en utilisant le stylo :' },
      { type: 'block-examples', blocks: [
        { label: 'stylo en position d\'écriture', desc: 'Abaisse le stylo (le lutin trace en se déplaçant)', color: '#59C059' },
        { label: 'relever le stylo', desc: 'Lève le stylo (le lutin se déplace sans tracer)', color: '#59C059' },
        { label: 'effacer tout', desc: 'Efface tous les tracés', color: '#59C059' },
        { label: 'aller à x: [x] y: [y]', desc: 'Déplace le lutin à une position sans tracer (si stylo levé)', color: '#4C97FF' },
      ]},
    ],
  },
  {
    id: 'blocs-perso',
    title: 'Blocs personnalisés (définir)',
    content: [
      { type: 'text', value: 'Scratch permet de créer des blocs personnalisés (équivalent à des fonctions/procédures) avec "définir [nom du bloc]".' },
      { type: 'block-examples', blocks: [
        { label: 'définir [mon bloc]', desc: 'Définit un bloc personnalisé réutilisable', color: '#FF6680' },
        { label: '[mon bloc]', desc: 'Appelle le bloc personnalisé défini', color: '#FF6680' },
      ]},
      { type: 'tip', value: 'Au CRPE, les blocs personnalisés (ex: "carré", "triangle", "figure_de_base") sont définis une fois puis appelés plusieurs fois dans la boucle principale.' },
      { type: 'warning', value: 'Les blocs personnalisés dans Scratch n\'ont pas de valeur de retour — ils exécutent une séquence d\'instructions.' },
    ],
  },
  {
    id: 'methodo',
    title: 'Méthode pour analyser un programme Scratch au CRPE',
    content: [
      { type: 'steps', steps: [
        { num: 1, title: 'Lire le programme en entier', desc: 'Identifier la structure : variables initiales, boucles, blocs personnalisés.' },
        { num: 2, title: 'Simuler à la main', desc: 'Pour chaque itération, noter la position, l\'orientation et les coordonnées. Utiliser un tableau.' },
        { num: 3, title: 'Calculer les angles', desc: 'Pour les polygones, appliquer 360°/n. Vérifier que la somme des rotations = 360° (un tour complet).' },
        { num: 4, title: 'Vérifier la cohérence', desc: 'Le lutin revient-il à son point de départ ? La figure est-elle fermée ?' },
        { num: 5, title: 'Répondre aux questions', desc: 'Orientation finale = somme des rotations mod 360°. Variables = valeurs calculées.' },
      ]},
      { type: 'tip', value: 'Pour l\'orientation finale : sommer toutes les rotations (droite positive, gauche négative) et calculer le résultat mod 360°.' },
    ],
  },
  {
    id: 'erreurs-classiques',
    title: 'Erreurs classiques des candidats',
    content: [
      { type: 'errors', errors: [
        { title: 'Confondre tourner et s\'orienter', desc: 'tourner 90° ≠ s\'orienter à 90°. Le premier est relatif, le second est absolu.' },
        { title: 'Oublier l\'orientation initiale', desc: 'Par défaut le lutin est orienté à 90° (vers la droite). Vérifier si le script change cette orientation.' },
        { title: 'Angle intérieur vs angle extérieur', desc: 'Scratch tourne de l\'angle extérieur (180° - angle intérieur). Pour un carré : tourner 90°, pas 90° (les deux sont égaux ici, mais pas pour un triangle !).' },
        { title: 'Mauvais sens de rotation', desc: '"tourner à droite" = sens horaire. "tourner à gauche" = sens anti-horaire. Ne pas les inverser.' },
        { title: 'Calcul de l\'hypoténuse', desc: 'Pour un triangle rectangle isocèle de côtés a : hypoténuse = a√2 ≈ 1,414 × a.' },
        { title: 'Coordonnées Scratch vs math', desc: 'Dans Scratch, y croît vers le haut. Les coordonnées x vont de −240 à +240, y de −180 à +180.' },
      ]},
    ],
  },
]

function CompassDisplay({ entries }) {
  return (
    <div className="compass-display">
      {entries.map((e) => (
        <div key={e.angle} className="compass-entry">
          <span className="compass-symbol">{e.symbol}</span>
          <span className="compass-label">{e.label}</span>
        </div>
      ))}
    </div>
  )
}

function ComparisonBlock({ left, right }) {
  return (
    <div className="comparison-block">
      <div className="comparison-side">
        <h4>{left.title}</h4>
        <ul>
          {left.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
      <div className="comparison-vs">VS</div>
      <div className="comparison-side">
        <h4>{right.title}</h4>
        <ul>
          {right.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  )
}

function BlockExamples({ blocks }) {
  return (
    <div className="block-examples">
      {blocks.map((b, i) => (
        <div key={i} className="block-example-row">
          <span className="block-pill" style={{ background: b.color }}>{b.label}</span>
          <span className="block-desc">{b.desc}</span>
        </div>
      ))}
    </div>
  )
}

function StepsList({ steps }) {
  return (
    <ol className="steps-list">
      {steps.map((s) => (
        <li key={s.num} className="step-item">
          <span className="step-num">{s.num}</span>
          <div>
            <strong>{s.title}</strong>
            <p>{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function ErrorsList({ errors }) {
  return (
    <div className="errors-list">
      {errors.map((e, i) => (
        <div key={i} className="error-item">
          <div className="error-icon">!</div>
          <div>
            <strong>{e.title}</strong>
            <p>{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionContent({ items }) {
  return (
    <div className="section-content">
      {items.map((item, i) => {
        switch (item.type) {
          case 'text':
            return <p key={i}>{item.value}</p>
          case 'tip':
            return <div key={i} className="notion-tip"><span className="tip-icon">💡</span>{item.value}</div>
          case 'warning':
            return <div key={i} className="notion-warning"><span className="warning-icon">⚠️</span>{item.value}</div>
          case 'formula':
            return <div key={i} className="notion-formula">{item.value}</div>
          case 'table':
            return (
              <div key={i} className="notion-table-wrap">
                <table className="notion-table">
                  <thead>
                    <tr>{item.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'compass':
            return <CompassDisplay key={i} entries={item.entries} />
          case 'comparison':
            return <ComparisonBlock key={i} left={item.left} right={item.right} />
          case 'block-examples':
            return <BlockExamples key={i} blocks={item.blocks} />
          case 'steps':
            return <StepsList key={i} steps={item.steps} />
          case 'errors':
            return <ErrorsList key={i} errors={item.errors} />
          default:
            return null
        }
      })}
    </div>
  )
}

export default function Notions({ onBack }) {
  return (
    <div className="notions-page">
      <div className="notions-header">
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <h1>Référentiel Scratch — CRPE</h1>
        <p className="notions-subtitle">Toutes les notions Scratch testées au concours</p>
      </div>
      <div className="notions-nav">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="notions-nav-link">{s.title}</a>
        ))}
      </div>
      <div className="notions-content">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="notion-section">
            <h2>{section.title}</h2>
            <SectionContent items={section.content} />
          </section>
        ))}
      </div>
    </div>
  )
}
