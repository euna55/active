import { useState } from 'react';
import './BlockShapeMission.css';

type Shape = 'arch' | 'square' | 'triangle' | 'cross';

const SHAPES: { id: Shape; label: string; path: string }[] = [
  {
    id: 'arch',
    label: '아치형',
    path: 'M10 60 L10 30 Q10 10 30 10 Q50 10 50 30 L50 60 Z',
  },
  {
    id: 'square',
    label: '사각형',
    path: 'M10 10 L50 10 L50 60 L10 60 Z',
  },
  {
    id: 'triangle',
    label: '삼각형',
    path: 'M30 10 L55 60 L5 60 Z',
  },
  {
    id: 'cross',
    label: '십자형',
    path: 'M25 10 L35 10 L35 25 L50 25 L50 35 L35 35 L35 50 L25 50 L25 35 L10 35 L10 25 L25 25 Z',
  },
];

interface Props {
  prompt: string;
  onSolve: () => void;
}

export default function BlockShapeMission({ prompt, onSolve }: Props) {
  const [selected, setSelected] = useState<Shape | null>(null);
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    if (!selected) return;
    if (selected === 'arch') {
      onSolve();
    } else {
      setWrong(true);
      setSelected(null);
    }
  };

  return (
    <div className="block-shape">
      <p className="block-shape__prompt">{prompt}</p>

      <div className="block-shape__options">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            className={`block-shape__option${selected === s.id ? ' block-shape__option--on' : ''}`}
            onClick={() => { setSelected(s.id); setWrong(false); }}
            aria-pressed={selected === s.id}
          >
            <svg viewBox="0 0 60 70" aria-hidden="true">
              <path d={s.path} fill={selected === s.id ? 'var(--red)' : 'var(--ink)'} />
            </svg>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {wrong && <p className="block-shape__wrong">다른 모양이에요. 안내판을 다시 봐요!</p>}

      <button className="block-shape__submit" onClick={submit} disabled={!selected}>
        확인
      </button>
    </div>
  );
}
