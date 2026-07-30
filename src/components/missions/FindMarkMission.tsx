import { useState } from 'react';
import './FindMarkMission.css';

interface Props {
  markPosition: { x: number; y: number };
  prompt: string;
  photo: string;
  onSolve: () => void;
}

const HIT_RADIUS = 12;

export default function FindMarkMission({ markPosition, prompt, photo, onSolve }: Props) {
  const [tapped, setTapped] = useState<{ x: number; y: number } | null>(null);
  const [wrong, setWrong] = useState(false);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTapped({ x, y });

    const dx = x - markPosition.x;
    const dy = y - markPosition.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= HIT_RADIUS) {
      onSolve();
    } else {
      setWrong(true);
      setTimeout(() => { setTapped(null); setWrong(false); }, 1000);
    }
  };

  return (
    <div className="find-mark">
      <p className="find-mark__prompt">{prompt}</p>

      <div className="find-mark__box" onClick={handleTap}>
        <img src={photo} alt="" className="find-mark__img" draggable={false} />
        {tapped && (
          <div
            className={`find-mark__tap${wrong ? ' find-mark__tap--wrong' : ''}`}
            style={{ left: `${tapped.x}%`, top: `${tapped.y}%` }}
          />
        )}
      </div>

      {wrong && <p className="find-mark__wrong">거기가 아니에요. 다시 살펴봐요!</p>}
      <p className="find-mark__tip">사진을 탭해서 표식을 찾아보세요.</p>
    </div>
  );
}
