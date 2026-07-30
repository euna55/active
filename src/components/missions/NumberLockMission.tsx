import { useState } from 'react';
import './NumberLockMission.css';

interface Props {
  digits: number;
  answer: string;
  prompt: string;
  onSolve: () => void;
}

export default function NumberLockMission({ digits, answer, prompt, onSolve }: Props) {
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(false);

  const press = (key: string) => {
    if (key === '←') {
      setInput((p) => p.slice(0, -1));
      setWrong(false);
      return;
    }
    if (input.length >= digits) return;
    setInput((p) => p + key);
    setWrong(false);
  };

  const submit = () => {
    if (input === answer) {
      onSolve();
    } else {
      setWrong(true);
      setInput('');
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','←','0','✓'];

  return (
    <div className="numlock">
      <p className="numlock__prompt">{prompt}</p>
      <div className="numlock__display">
        {Array.from({ length: digits }, (_, i) => (
          <div key={i} className={`numlock__digit${wrong ? ' numlock__digit--wrong' : ''}`}>
            {input[i] ?? ''}
          </div>
        ))}
      </div>
      {wrong && <p className="numlock__wrong">틀렸어요. 조금 더 힘내요!</p>}
      <div className="numlock__keypad">
        {keys.map((k) => (
          <button
            key={k}
            className={`numlock__key${k === '✓' ? ' numlock__key--submit' : ''}`}
            onClick={k === '✓' ? submit : () => press(k)}
            aria-label={k === '←' ? '지우기' : k === '✓' ? '확인' : k}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
