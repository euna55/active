import { useState } from 'react';
import './TextInputMission.css';

interface Props {
  answer: string;
  prompt: string;
  placeholder?: string;
  onSolve: () => void;
}

export default function TextInputMission({ answer, prompt, placeholder, onSolve }: Props) {
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    if (input.trim() === answer) {
      onSolve();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="text-input-mission">
      <p className="text-input-mission__prompt">{prompt}</p>
      <div className="text-input-mission__row">
        <input
          className="text-input-mission__field"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setWrong(false);
          }}
          placeholder={placeholder ?? '답을 입력하시오'}
        />
        <button className="text-input-mission__submit" onClick={submit}>
          확인
        </button>
      </div>
      {wrong && <p className="text-input-mission__wrong">다시 생각해봐요. 할 수 있어요!</p>}
    </div>
  );
}
