import { useState } from 'react';
import './HintPanel.css';

interface Props {
  hints: string[];
}

export default function HintPanel({ hints }: Props) {
  const [stage, setStage] = useState(0);
  const maxed = stage >= hints.length;

  return (
    <div className="hint-panel">
      <button
        className="hint-panel__btn"
        disabled={maxed}
        onClick={() => setStage((s) => Math.min(hints.length, s + 1))}
      >
        {maxed ? '힌트 모두 확인함' : `힌트 보기 (${stage}/${hints.length})`}
      </button>
      {hints.slice(0, stage).map((h, i) => (
        <p key={i} className="hint-panel__hint">
          {h}
        </p>
      ))}
    </div>
  );
}
