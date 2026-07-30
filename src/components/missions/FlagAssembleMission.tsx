import { useState } from 'react';
import './FlagAssembleMission.css';

interface Props {
  prompt: string;
  onSolve: () => void;
}

type Trigram = 'heaven' | 'earth' | 'water' | 'fire';

const TRIGRAMS: { id: Trigram; label: string; lines: boolean[] }[] = [
  { id: 'heaven', label: '건(乾)', lines: [true, true, true] },
  { id: 'earth',  label: '곤(坤)', lines: [false, false, false] },
  { id: 'water',  label: '감(坎)', lines: [false, true, false] },
  { id: 'fire',   label: '리(離)', lines: [true, false, true] },
];

// 정답: 좌상=건, 우하=곤, 좌하=감, 우상=리
const CORRECT: Record<string, Trigram> = {
  topLeft: 'heaven',
  bottomRight: 'earth',
  bottomLeft: 'water',
  topRight: 'fire',
};

const POSITIONS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;
type Position = typeof POSITIONS[number];

const POS_LABEL: Record<Position, string> = {
  topLeft: '좌상',
  topRight: '우상',
  bottomLeft: '좌하',
  bottomRight: '우하',
};

export default function FlagAssembleMission({ prompt, onSolve }: Props) {
  const [placements, setPlacements] = useState<Partial<Record<Position, Trigram>>>({});
  const [wrong, setWrong] = useState(false);
  const [active, setActive] = useState<Position | null>(null);

  const place = (pos: Position, tg: Trigram) => {
    setPlacements((p) => ({ ...p, [pos]: tg }));
    setActive(null);
    setWrong(false);
  };

  const submit = () => {
    const ok = POSITIONS.every((pos) => placements[pos] === CORRECT[pos]);
    if (ok) {
      onSolve();
    } else {
      setWrong(true);
      setPlacements({});
    }
  };

  const allFilled = POSITIONS.every((pos) => placements[pos]);

  return (
    <div className="flag-assemble">
      <p className="flag-assemble__prompt">{prompt}</p>

      <div className="flag-assemble__flag">
        <div className="flag-assemble__taeguk">
          <svg viewBox="0 0 100 66" aria-hidden="true">
            <rect width="100" height="66" fill="#f3ead3" stroke="#241f18" strokeWidth="2" />
            <circle cx="50" cy="33" r="16" fill="#a12b24" />
            <path d="M50 17 a16 16 0 0 1 0 32 a8 8 0 0 0 0-16 a8 8 0 0 1 0-16" fill="#241f18" />
          </svg>
        </div>
        {POSITIONS.map((pos) => {
          const tg = placements[pos] ? TRIGRAMS.find((t) => t.id === placements[pos]) : null;
          return (
            <button
              key={pos}
              className={`flag-assemble__corner flag-assemble__corner--${pos}${active === pos ? ' flag-assemble__corner--active' : ''}`}
              onClick={() => setActive(active === pos ? null : pos)}
              aria-label={`${POS_LABEL[pos]} 괘 선택`}
            >
              {tg ? (
                <div className="flag-assemble__trigram">
                  {tg.lines.map((solid, i) => (
                    <div key={i} className={`flag-assemble__line${solid ? '' : ' flag-assemble__line--broken'}`} />
                  ))}
                </div>
              ) : (
                <span className="flag-assemble__empty">?</span>
              )}
              <span className="flag-assemble__pos-label">{POS_LABEL[pos]}</span>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="flag-assemble__picker">
          <p className="flag-assemble__pick-label">{POS_LABEL[active]}에 놓을 괘:</p>
          <div className="flag-assemble__options">
            {TRIGRAMS.map((tg) => (
              <button key={tg.id} className="flag-assemble__option" onClick={() => place(active, tg.id)}>
                <div className="flag-assemble__trigram">
                  {tg.lines.map((solid, i) => (
                    <div key={i} className={`flag-assemble__line${solid ? '' : ' flag-assemble__line--broken'}`} />
                  ))}
                </div>
                <span>{tg.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {wrong && <p className="flag-assemble__wrong">태극기 배치가 달라요. 다시 해봐요!</p>}

      <button className="flag-assemble__submit" onClick={submit} disabled={!allFilled}>
        확인
      </button>
    </div>
  );
}
