import { useMemo, useState } from 'react'
import './App.css'

import quotes from './data/quotes'
import { ALL_TAGS } from './data/tags'
import { DEFAULT_SECONDS } from './config'
import { useCountdown } from './hooks/useCountdown'
import { useTheme } from './hooks/useTheme'

import NaelStage from './components/NaelStage'
import Timer from './components/Timer'
import SequenceTrack from './components/SequenceTrack'
import Controls from './components/Controls'
import ThemeToggle from './components/ThemeToggle'
import Cheatsheet from './components/Cheatsheet'
import FilterModal from './components/FilterModal'

// Pick a random quote from `pool`, never returning `exclude` (the just-played
// one) so the same quote never appears twice in a row.
function pickQuote(pool, exclude) {
  if (pool.length <= 1) return pool[0]
  let next
  do {
    next = pool[Math.floor(Math.random() * pool.length)]
  } while (next === exclude)
  return next
}

const STATUS = {
  playing: 'Parse the quote!',
  failed: 'Wrong! Here is the correct order.',
  success: 'Correct!',
}

export default function App() {
  const [theme, toggleTheme] = useTheme()

  // phase: 'idle' | 'playing' | 'failed' | 'success'
  const [phase, setPhase] = useState('idle')
  const [quote, setQuote] = useState(null)
  const [progress, setProgress] = useState(0) // count of correct presses this round
  const [showCheatsheet, setShowCheatsheet] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [hideSlots, setHideSlots] = useState(false) // hide progress slots as an anti-crutch option
  const [answerSeconds, setAnswerSeconds] = useState(DEFAULT_SECONDS)
  const roundMs = answerSeconds * 1000

  // Enabled tags (all on by default). A quote is in the pool if any of its tags
  // is enabled. If the data has no tags at all, every quote is available.
  const [enabledTags, setEnabledTags] = useState(() => new Set(ALL_TAGS))
  const pool = useMemo(() => {
    if (ALL_TAGS.length === 0) return quotes
    return quotes.filter((q) => (q.tags ?? []).some((t) => enabledTags.has(t)))
  }, [enabledTags])

  const roundTimer = useCountdown(roundMs, {
    running: phase === 'playing',
    onExpire: () => setPhase('failed'),
  })

  // Start a fresh round on a new random quote from the pool (excluding `prev`).
  function beginRound(prev) {
    setQuote(pickQuote(pool, prev))
    setProgress(0)
    setPhase('playing')
    roundTimer.reset()
  }

  const toggleTag = (tag) =>
    setEnabledTags((prev) => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })

  // Return to the initial idle state from any phase.
  function goToMenu() {
    setPhase('idle')
    setQuote(null)
    setProgress(0)
  }

  function handleMechanicPress(id) {
    if (phase !== 'playing') return
    const expected = quote.correct_sequence[progress]
    if (id !== expected) {
      setPhase('failed')
      return
    }
    const next = progress + 1
    setProgress(next)
    // Full sequence entered correctly -> success; player advances with Next.
    if (next === quote.correct_sequence.length) setPhase('success')
  }

  // When slots are hidden, still reveal them on failure so the player learns the
  // correct answer — the crutch only matters while actively guessing.
  const showSequence = quote && phase !== 'idle' && (!hideSlots || phase === 'failed')

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {phase !== 'idle' && (
        <button className="menu-btn" onClick={goToMenu}>
          ← Main Menu
        </button>
      )}

      <NaelStage quote={phase === 'idle' ? null : quote} />

      {phase !== 'idle' && <p className={`status status-${phase}`}>{STATUS[phase]}</p>}

      {phase === 'playing' && (
        <Timer remaining={roundTimer.remaining} total={roundMs} tone="round" />
      )}

      {showSequence && (
        <SequenceTrack
          sequence={quote.correct_sequence}
          progress={progress}
          revealed={phase === 'failed'}
        />
      )}

      <Controls
        phase={phase}
        onStart={() => beginRound(null)}
        onMechanicPress={handleMechanicPress}
        onRetry={() => beginRound(quote)}
        onNext={() => beginRound(quote)}
        onOpenCheatsheet={() => setShowCheatsheet(true)}
        onOpenFilter={() => setShowFilter(true)}
        canStart={pool.length > 0}
        hideSlots={hideSlots}
        onToggleHideSlots={() => setHideSlots((v) => !v)}
        answerSeconds={answerSeconds}
        onChangeSeconds={setAnswerSeconds}
      />

      {showCheatsheet && <Cheatsheet onClose={() => setShowCheatsheet(false)} />}
      {showFilter && (
        <FilterModal
          enabled={enabledTags}
          onToggle={toggleTag}
          onSelectAll={() => setEnabledTags(new Set(ALL_TAGS))}
          onClearAll={() => setEnabledTags(new Set())}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  )
}
