import { useGameStore } from '../../store/gameStore';
import './ProgressBar.css';

export default function ProgressBar() {
  const collected = useGameStore((s) => s.collectedFragments.length);

  return (
    <div className="progress-bar" aria-label={`시 조각 ${collected}/8 수집`}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={`progress-bar__piece${i < collected ? ' progress-bar__piece--on' : ''}`} />
      ))}
    </div>
  );
}
