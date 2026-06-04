// Visual countdown: a depleting bar plus the seconds remaining. `tone` colors
// the bar to match the current phase (e.g. 'grace' during the success pause).
export default function Timer({ remaining, total, tone = 'round' }) {
  const pct = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const seconds = (remaining / 1000).toFixed(1)

  return (
    <div className="timer">
      <div className={`timer-bar tone-${tone}`} style={{ width: `${pct * 100}%` }} />
      <span className="timer-label">{seconds}s</span>
    </div>
  )
}
