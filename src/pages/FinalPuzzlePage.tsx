import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import { useGameStore } from '../store/gameStore';
import season from '../data/season';
import './FinalPuzzlePage.css';

export default function FinalPuzzlePage() {
  const navigate = useNavigate();
  const collectedFragments = useGameStore((s) => s.collectedFragments);
  const finish = useGameStore((s) => s.finish);

  // 현재 순서(드래그로 재배열)
  const [order, setOrder] = useState<number[]>(
    collectedFragments.map((_, i) => i)
  );
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);

  const correctOrder = season.fragmentOrder;

  const reorder = (from: number, to: number) => {
    const next = [...order];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
    setWrong(false);
  };

  const submit = () => {
    const arranged = order.map((i) => collectedFragments[i]);
    const correct = correctOrder.every((line, i) => line === arranged[i]);
    if (correct) {
      finish();
      navigate('/guess');
    } else {
      setWrong(true);
    }
  };

  return (
    <PhoneFrame>
      <Masthead />
      <p className="final__title">여덟 조각을 올바른 순서로 배열하라</p>
      <p className="final__desc">조각을 길게 눌러 드래그하거나 탭하여 순서를 바꾸세요.</p>

      <div className="final__list">
        {order.map((fragIdx, listPos) => (
          <div
            key={listPos}
            className={`final__line${dragFrom === listPos ? ' final__line--dragging' : ''}`}
            draggable
            onDragStart={() => setDragFrom(listPos)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragFrom !== null && dragFrom !== listPos) {
                reorder(dragFrom, listPos);
              }
              setDragFrom(null);
            }}
          >
            <span className="final__num">{listPos + 1}</span>
            <span className="final__text">{collectedFragments[fragIdx]}</span>
            <span className="final__handle">⠿</span>
          </div>
        ))}
      </div>

      {wrong && <p className="final__wrong">순서가 다릅니다. 다시 배열해봐요!</p>}

      <button className="final__btn" onClick={submit}>
        배열 완성!
      </button>
    </PhoneFrame>
  );
}
