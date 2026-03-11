/**
 * Block definitions registry.
 * Each block type maps to its category, shape, and default arguments.
 * shape: 'stack' | 'reporter' | 'boolean' | 'hat' | 'cap' | 'c-shape'
 */
export const blockDefinitions = {
  // Motion
  avancer:        { category: 'motion',    shape: 'stack', label: 'avancer de {0} pas',             defaultArgs: [10] },
  reculer:        { category: 'motion',    shape: 'stack', label: 'reculer de {0} pas',             defaultArgs: [10] },
  tournerDroite:  { category: 'motion',    shape: 'stack', label: 'tourner ↻ de {0} degrés',        defaultArgs: [15] },
  tournerGauche:  { category: 'motion',    shape: 'stack', label: 'tourner ↺ de {0} degrés',        defaultArgs: [15] },
  allerA:         { category: 'motion',    shape: 'stack', label: 'aller à x: {0} y: {1}',          defaultArgs: [0, 0] },
  orienter:       { category: 'motion',    shape: 'stack', label: "s'orienter à {0}",               defaultArgs: [90] },
  ajouter_x:      { category: 'motion',    shape: 'stack', label: 'ajouter {0} à x',               defaultArgs: [10] },
  ajouter_y:      { category: 'motion',    shape: 'stack', label: 'ajouter {0} à y',               defaultArgs: [10] },

  // Pen
  styloPoser:     { category: 'pen',       shape: 'stack', label: "stylo en position d'écriture",   defaultArgs: [] },
  styloRelever:   { category: 'pen',       shape: 'stack', label: 'relever le stylo',               defaultArgs: [] },
  effacer:        { category: 'pen',       shape: 'stack', label: 'tout effacer',                   defaultArgs: [] },
  setCouleur:     { category: 'pen',       shape: 'stack', label: 'mettre la couleur du stylo à {0}', defaultArgs: ['#0000ff'] },
  setEpaisseur:   { category: 'pen',       shape: 'stack', label: 'mettre la taille du stylo à {0}',  defaultArgs: [1] },

  // Control
  repeter:        { category: 'control',   shape: 'c-shape', label: 'répéter {0} fois',             defaultArgs: [10], hasBody: true },
  repeter_jusqu_a:{ category: 'control',   shape: 'c-shape', label: 'répéter jusqu\'à {0}',         defaultArgs: [true], hasBody: true },
  si:             { category: 'control',   shape: 'c-shape', label: 'si {0} alors',                 defaultArgs: [true], hasBody: true },
  si_sinon:       { category: 'control',   shape: 'c-shape', label: 'si {0} alors / sinon',         defaultArgs: [true], hasBody: true, hasElseBody: true },

  // Sensing
  demander:       { category: 'sensing',   shape: 'stack', label: 'demander {0} (défaut : {1})',    defaultArgs: ['x', 0] },

  // Variables
  mettre_variable:     { category: 'variables', shape: 'stack', label: 'mettre {0} à {1}',          defaultArgs: ['var', 0] },
  ajouter_variable:    { category: 'variables', shape: 'stack', label: 'ajouter {1} à {0}',         defaultArgs: ['var', 1] },
  mettre_variable_op:  { category: 'variables', shape: 'stack', label: 'mettre {0} à {1} {2} {3}',  defaultArgs: ['var', 0, '+', 0] },

  // Looks
  dire:           { category: 'looks',     shape: 'stack', label: 'dire {0}',                       defaultArgs: ['Bonjour !'] },

  // Custom
  definir_bloc:   { category: 'custom',    shape: 'c-shape', label: 'définir {0}',                  defaultArgs: ['monBloc'], hasBody: true },
  appeler_bloc:   { category: 'custom',    shape: 'stack', label: '{0}',                            defaultArgs: ['monBloc'] },
}

/**
 * Get blocks grouped by category for palette display.
 */
export function getBlocksByCategory() {
  const categories = {}
  for (const [type, def] of Object.entries(blockDefinitions)) {
    if (!categories[def.category]) {
      categories[def.category] = []
    }
    categories[def.category].push({ type, ...def })
  }
  return categories
}

export const CATEGORY_LABELS = {
  motion: 'Mouvement',
  pen: 'Stylo',
  control: 'Contrôle',
  sensing: 'Capteurs',
  variables: 'Variables',
  looks: 'Apparence',
  custom: 'Mes blocs',
}

export const CATEGORY_ORDER = ['motion', 'pen', 'control', 'sensing', 'variables', 'looks', 'custom']
