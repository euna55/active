import { useState } from 'react';
import './PatternColorMission.css';

const COLOR_MAP: Record<string, string> = {
  빨강: '#c0392b',
  파랑: '#2471a3',
  초록: '#1e8449',
  노랑: '#d4ac0d',
  검정: '#1a1a1a',
  흰색: '#f0f0f0',
  주황: '#ca6f1e',
  보라: '#7d3c98',
};

interface Props {
  sequence: string[];
  answer: string;
  prompt: string;
  onSolve: () => void;
}

export default function PatternColorMission({ sequence, answer, prompt, onSolve }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);
  const choices = Object.keys(COLOR_MAP);

  const submit = () => {
    if (!selected) return;
    if (selected === answer) {
      onSolve();
    } else {
      setWrong(true);
      setSelected(null);
    }
  };

  return (
    <div className="pattern-color">
      <p className="pattern-color__prompt">{prompt}</p>

      <div className="pattern-color__sequence">
        {sequence.map((color, i) => (
          <div
            key={i}
            className="pattern-color__swatch"
            style={{ background: color === '?' ? undefined : COLOR_MAP[color] }}
          >
            {color === '?' && <span className="pattern-color__q">?</span>}
          </div>
        ))}
      </div>

      {wrong && <p className="pattern-color__wrong">틀렸어요. 다시 살펴봐요!</p>}

      <div className="pattern-color__choices">
        {choices.map((c) => (
          <button
            key={c}
            className={`pattern-color__choice${selected === c ? ' pattern-color__choice--on' : ''}`}
            style={{ background: COLOR_MAP[c] }}
            onClick={() => { setSelected(c); setWrong(false); }}
            aria-label={c}
            aria-pressed={selected === c}
          />
        ))}
      </div>
      <p className="pattern-color__selected">{selected ?? '색을 선택하세요'}</p>

      <button className="pattern-color__submit" onClick={submit} disabled={!selected}>
        확인
      </button>
    </div>
  );
}
