// The five mechanics that appear across every quote in quotes.js, in the fixed
// order they are rendered as buttons. `id` must match the strings used in each
// quote's correct_sequence.
export const MECHANICS = [
  { id: 'in', label: 'In' },
  { id: 'out', label: 'Out' },
  { id: 'stack', label: 'Stack' },
  { id: 'spread', label: 'Spread' },
  { id: 'tankbuster', label: 'Tankbuster' },
]

// Display label for a mechanic id, falling back to the raw id if unknown.
export const labelFor = (id) => MECHANICS.find((m) => m.id === id)?.label ?? id
