import { useState } from 'react';
import './FillBlankMission.css';

interface Props {
  quote: string;
  labelA: string;
  labelB: string;
  answerA: string;
  answerB: string;
  prompt: string;
  onSolve: () => void;
}

export default function FillBlankMission({
  quote,
  labelA,
  labelB,
  answerA,
  answerB,
  prompt,
  onSolve,
}: Props) {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    if (inputA.trim() === answerA && inputB.trim() === answerB) {
      onSolve();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="fill-blank">
      <p className="fill-blank__prompt">{prompt}</p>
      <p className="fill-blank__quote">{quote}</p>
      <div className="fill-blank__row">
        <input
          className="fill-blank__field"
          value={inputA}
          onChange={(e) => {
            setInputA(e.target.value);
            setWrong(false);
          }}
          placeholder={labelA}
        />
        <input
          className="fill-blank__field"
          value={inputB}
          onChange={(e) => {
            setInputB(e.target.value);
            setWrong(false);
          }}
          placeholder={labelB}
        />
      </div>
      <button className="fill-blank__submit" onClick={submit}>
        확인
      </button>
      {wrong && <p className="fill-blank__wrong">다시 생각해봐요. 할 수 있어요!</p>}
    </div>
  );
}
