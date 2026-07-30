import { useState } from 'react';
import './WordAssembleMission.css';

interface Props {
  tiles: string[];
  answer: string[];
  prompt: string;
  onSolve: () => void;
}

export default function WordAssembleMission({ tiles, answer, prompt, onSolve }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);
  const [pool, setPool] = useState([...tiles]);

  const pickTile = (char: string, idx: number) => {
    setSelected((p) => [...p, char]);
    setPool((p) => p.filter((_, i) => i !== idx));
    setWrong(false);
  };

  const removeLast = () => {
    if (selected.length === 0) return;
    const last = selected[selected.length - 1];
    setSelected((p) => p.slice(0, -1));
    setPool((p) => [...p, last]);
    setWrong(false);
  };

  const submit = () => {
    if (selected.join('') === answer.join('')) {
      onSolve();
    } else {
      setWrong(true);
      setPool([...tiles]);
      setSelected([]);
    }
  };

  return (
    <div className="word-assemble">
      <p className="word-assemble__prompt">{prompt}</p>

      <div className="word-assemble__answer">
        {answer.map((_, i) => (
          <div key={i} className={`word-assemble__slot${wrong ? ' word-assemble__slot--wrong' : ''}`}>
            {selected[i] ?? ''}
          </div>
        ))}
      </div>

      {wrong && <p className="word-assemble__wrong">다시 해봐요. 할 수 있어요!</p>}

      <div className="word-assemble__pool">
        {pool.map((char, i) => (
          <button key={i} className="word-assemble__tile" onClick={() => pickTile(char, i)}>
            {char}
          </button>
        ))}
      </div>

      <div className="word-assemble__actions">
        <button className="word-assemble__back" onClick={removeLast} disabled={selected.length === 0}>
          ← 지우기
        </button>
        <button
          className="word-assemble__submit"
          onClick={submit}
          disabled={selected.length !== answer.length}
        >
          확인
        </button>
      </div>
    </div>
  );
}
