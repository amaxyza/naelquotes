import { MECHANICS } from '../data/mechanics'

// The five mechanic buttons. Always renders all five in a fixed order; disabled
// outside the playing phase.
export default function MechanicGrid({ onPress, disabled }) {
  return (
    <div className="mechanic-grid">
      {MECHANICS.map((m) => (
        <button
          key={m.id}
          className="mechanic-btn"
          onClick={() => onPress(m.id)}
          disabled={disabled}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
