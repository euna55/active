import { useState } from 'react';
import './ChoiceMission.css';

interface Props {
  options: string[];
  answer: string;
  prompt?: string;
  onSolve: () => void;
}

export default function ChoiceMission({ options, answer, prompt, onSolve }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  const pick = (opt: string) => {
    setSelected(opt);
    if (opt === answer) {
      setWrong(false);
      onSolve();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="choice-mission">
      {prompt && <p className="choice-mission__prompt">{prompt}</p>}
      <div className="choice-mission__options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`choice-mission__option${selected === opt && wrong ? ' choice-mission__option--wrong' : ''}`}
            onClick={() => pick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {wrong && <p className="choice-mission__wrong">다시 생각해봐요. 할 수 있어요!</p>}
    </div>
  );
}
