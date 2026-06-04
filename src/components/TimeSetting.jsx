import { MIN_SECONDS, MAX_SECONDS, STEP_SECONDS, TIME_PRESETS } from '../config'

const clamp = (n) => Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, n))

// Lets the player set the answer time: preset buttons plus a linked slider and
// number input (both drive the same value in seconds).
export default function TimeSetting({ seconds, onChange }) {
  // Commit a parsed number from the input, ignoring transient empty/NaN states.
  const handleInput = (e) => {
    const n = parseFloat(e.target.value)
    if (Number.isFinite(n)) onChange(clamp(n))
  }

  return (
    <div className="time-setting">
      <span className="time-label">Answer time</span>

      <div className="time-presets">
        {TIME_PRESETS.map((p) => (
          <button
            key={p.label}
            className={`preset-btn ${seconds === p.seconds ? 'is-active' : ''}`}
            onClick={() => onChange(p.seconds)}
          >
            {p.label} ({p.seconds}s)
          </button>
        ))}
      </div>

      <div className="time-controls">
        <input
          type="range"
          min={MIN_SECONDS}
          max={MAX_SECONDS}
          step={STEP_SECONDS}
          value={seconds}
          onChange={handleInput}
        />
        <input
          type="number"
          className="time-number"
          min={MIN_SECONDS}
          max={MAX_SECONDS}
          step={STEP_SECONDS}
          value={seconds}
          onChange={handleInput}
        />
        <span className="time-unit">s</span>
      </div>
    </div>
  )
}
