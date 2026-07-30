import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import './Timer.css';

export default function Timer() {
  const startedAt = useGameStore((s) => s.startedAt);
  const updateCopGauge = useGameStore((s) => s.updateCopGauge);
  const [remaining, setRemaining] = useState(3600);

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setRemaining(Math.max(0, 3600 - elapsed));
      updateCopGauge();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt, updateCopGauge]);

  const m = Math.floor(remaining / 60).toString().padStart(2, '0');
  const s = (remaining % 60).toString().padStart(2, '0');

  return (
    <div className="timer" aria-label={`남은 시간 ${m}분 ${s}초`}>
      <span>⏱</span>
      <span>{m}:{s}</span>
    </div>
  );
}
