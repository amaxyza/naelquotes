import { labelFor } from '../data/mechanics'

// Shows the expected sequence as slots, filling in as the player presses the
// correct mechanic. `revealed` controls whether upcoming slots show their label
// (true) or stay blank placeholders (false) — blank while playing keeps it a
// real recall test; revealed on fail so the player sees the answer.
export default function SequenceTrack({ sequence, progress, revealed }) {
  return (
    <div className="sequence-track">
      {sequence.map((id, i) => {
        const done = i < progress
        const show = done || revealed
        return (
          <span key={i} className={`seq-slot ${done ? 'is-done' : ''}`}>
            {show ? labelFor(id) : '?'}
          </span>
        )
      })}
    </div>
  )
}
