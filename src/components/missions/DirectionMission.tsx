import { useState } from 'react';
import './DirectionMission.css';

const DIRECTIONS = ['북', '동북', '동', '동남', '남', '서남', '서', '서북'] as const;
type Dir = typeof DIRECTIONS[number];

interface Props {
  target: string;
  prompt: string;
  onSolve: () => void;
}

export default function DirectionMission({ target, prompt, onSolve }: Props) {
  const [selected, setSelected] = useState<Dir | null>(null);
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    if (!selected) return;
    if (selected === target) {
      onSolve();
    } else {
      setWrong(true);
      setSelected(null);
    }
  };

  return (
    <div className="direction">
      <p className="direction__prompt">{prompt}</p>

      <div className="direction__compass">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="var(--cream)" stroke="var(--line)" strokeWidth="2" />
          <circle cx="60" cy="60" r="4" fill="var(--red)" />
          <text x="60" y="14" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fill="var(--red-deep)" fontWeight="800">북</text>
          <text x="107" y="64" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fill="var(--ink)">동</text>
          <text x="60" y="112" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fill="var(--ink)">남</text>
          <text x="13" y="64" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fill="var(--ink)">서</text>
          <line x1="60" y1="60" x2="60" y2="20" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="60" x2="60" y2="96" stroke="var(--line)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="direction__buttons">
        {DIRECTIONS.map((d) => (
          <button
            key={d}
            className={`direction__btn${selected === d ? ' direction__btn--on' : ''}`}
            onClick={() => { setSelected(d); setWrong(false); }}
            aria-pressed={selected === d}
          >
            {d}
          </button>
        ))}
      </div>

      {wrong && <p className="direction__wrong">방향이 달라요. 다시 살펴봐요!</p>}

      <button className="direction__submit" onClick={submit} disabled={!selected}>
        확인
      </button>
    </div>
  );
}
