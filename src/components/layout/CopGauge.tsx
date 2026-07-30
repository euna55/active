import { useGameStore } from '../../store/gameStore';
import './CopGauge.css';

export default function CopGauge() {
  const gauge = useGameStore((s) => s.copGauge);
  const warning = gauge >= 90;

  return (
    <div className={`cop-gauge${warning ? ' cop-gauge--warning' : ''}`}>
      <span className="cop-gauge__label">순사 접근</span>
      <div className="cop-gauge__track" role="progressbar" aria-valuenow={Math.round(gauge)} aria-valuemin={0} aria-valuemax={100}>
        <div className="cop-gauge__fill" style={{ width: `${gauge}%` }} />
      </div>
      <span className="cop-gauge__icon">{warning ? '🚨' : '👮'}</span>
    </div>
  );
}
