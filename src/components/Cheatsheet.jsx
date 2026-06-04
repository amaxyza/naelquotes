import quotes from '../data/quotes'
import { labelFor } from '../data/mechanics'

// Modal listing every quote and its correct mechanic sequence. Clicking the
// backdrop or the close button dismisses it.
export default function Cheatsheet({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* stop propagation so clicks inside the panel don't close it */}
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cheatsheet</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <ul className="cheat-list">
          {quotes.map((q, i) => (
            <li key={i} className="cheat-row">
              <span className="cheat-quote">{q.quote}</span>
              <span className="cheat-seq">
                {q.correct_sequence.map((id, j) => (
                  <span key={j} className="cheat-chip">
                    {labelFor(id)}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
