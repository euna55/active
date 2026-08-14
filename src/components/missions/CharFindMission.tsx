import { useState } from 'react';
import './CharFindMission.css';

interface Props {
  chars: string[];
  revealed: { index: number; order: number }[];
  answer: string;
  prompt: string;
  onSolve: () => void;
}

export default function CharFindMission({ chars, revealed, answer, prompt, onSolve }: Props) {
  const [cameraOn, setCameraOn] = useState(false);
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(false);

  const orderOf = (index: number) => revealed.find((r) => r.index === index)?.order;

  const submit = () => {
    if (input.trim() === answer) {
      onSolve();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="char-find">
      <p className="char-find__prompt">{prompt}</p>

      <div className="char-find__grid">
        {chars.map((c, i) => (
          <div key={i} className="char-find__cell">
            <span className="char-find__char">{c}</span>
            {cameraOn && orderOf(i) !== undefined && (
              <span className="char-find__order">{orderOf(i)}</span>
            )}
          </div>
        ))}
      </div>

      <button className="char-find__camera" onClick={() => setCameraOn((v) => !v)}>
        {cameraOn ? '카메라 끄기' : '카메라로 비추기'}
      </button>

      <div className="char-find__row">
        <input
          className="char-find__field"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setWrong(false);
          }}
          placeholder="글자를 입력하시오"
        />
        <button className="char-find__submit" onClick={submit}>
          확인
        </button>
      </div>
      {wrong && <p className="char-find__wrong">다시 생각해봐요. 할 수 있어요!</p>}
    </div>
  );
}
