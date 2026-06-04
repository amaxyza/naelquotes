// The quote text shown above Nael. Falls back to an idle prompt when no quote
// is active.
export default function SpeechBubble({ quote }) {
  return (
    <div className={`speech-bubble ${quote ? '' : 'is-idle'}`}>
      {quote ? quote.quote : 'Press Start to begin.'}
    </div>
  )
}
