import naelImg from '../assets/nael.png'
import SpeechBubble from './SpeechBubble'

// Nael's portrait with the speech bubble anchored above it.
export default function NaelStage({ quote }) {
  return (
    <div className="nael-stage">
      <SpeechBubble quote={quote} />
      <img className="nael-img" src={naelImg} alt="Nael deus Darnus" />
    </div>
  )
}
