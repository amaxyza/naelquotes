import { useEffect, useRef, useState } from 'react'

const TICK_MS = 50

/**
 * Counts `durationMs` down to 0 while `running` is true.
 *
 * Returns `remaining` (ms, clamped >= 0) and a `reset()` that restarts from the
 * full duration. `onExpire` fires exactly once per countdown when it reaches 0.
 *
 * Pausing (running=false) freezes `remaining`; resuming continues from there.
 * The deadline is recomputed from the frozen remaining time on resume, so wall
 * clock spent paused does not eat into the countdown.
 */
export function useCountdown(durationMs, { running, onExpire }) {
  const [remaining, setRemaining] = useState(durationMs)

  // Refs so the interval always sees current values without re-subscribing.
  const deadlineRef = useRef(0)
  const expiredRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  // Keep the latest callback in a ref so the interval calls the current one
  // without needing to resubscribe. Updated in an effect (not during render).
  useEffect(() => {
    onExpireRef.current = onExpire
  })

  // resetKey lets reset() force a fresh countdown even if duration is unchanged.
  const [resetKey, setResetKey] = useState(0)
  const reset = () => {
    expiredRef.current = false
    setRemaining(durationMs)
    setResetKey((k) => k + 1)
  }

  useEffect(() => {
    if (!running) return

    // Derive the deadline from whatever time is left right now.
    deadlineRef.current = Date.now() + remaining

    const id = setInterval(() => {
      const left = Math.max(0, deadlineRef.current - Date.now())
      setRemaining(left)
      if (left === 0 && !expiredRef.current) {
        expiredRef.current = true
        clearInterval(id)
        onExpireRef.current?.()
      }
    }, TICK_MS)

    return () => clearInterval(id)
    // `remaining` is intentionally omitted: we snapshot it once when (re)starting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, resetKey])

  return { remaining, reset }
}
