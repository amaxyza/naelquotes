import MechanicGrid from './MechanicGrid'
import TimeSetting from './TimeSetting'

// The action area below the timer. Its contents depend on the current phase:
//   idle    -> Start
//   playing -> the mechanic buttons
//   failed  -> Retry
//   success -> Next (player advances to the next quote when ready)
export default function Controls({
  phase,
  onStart,
  onMechanicPress,
  onRetry,
  onNext,
  onOpenCheatsheet,
  onOpenFilter,
  canStart,
  hideSlots,
  onToggleHideSlots,
  answerSeconds,
  onChangeSeconds,
}) {
  switch (phase) {
    case 'idle':
      return (
        <div className="controls-menu">
          <div className="controls">
            <button className="primary-btn" onClick={onStart} disabled={!canStart}>
              Start
            </button>
            <button className="secondary-btn" onClick={onOpenFilter}>
              Filter
            </button>
            <button className="secondary-btn" onClick={onOpenCheatsheet}>
              Cheatsheet
            </button>
          </div>
          <label className="menu-option">
            <input type="checkbox" checked={hideSlots} onChange={onToggleHideSlots} />
            Hide progress slots
          </label>
          <TimeSetting seconds={answerSeconds} onChange={onChangeSeconds} />
          {!canStart && (
            <p className="menu-hint">No quotes match the current filter.</p>
          )}
        </div>
      )

    case 'playing':
      return <MechanicGrid onPress={onMechanicPress} disabled={false} />

    case 'failed':
      return (
        <div className="controls">
          <button className="primary-btn" onClick={onRetry}>
            Retry
          </button>
        </div>
      )

    case 'success':
      return (
        <div className="controls">
          <button className="primary-btn" onClick={onNext}>
            Next
          </button>
        </div>
      )

    default:
      return null
  }
}
