import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import { helpers } from '../data/helpers';
import type { HelperId } from '../data/helpers';
import { useGameStore } from '../store/gameStore';
import './SelectHelperPage.css';

export default function SelectHelperPage() {
  const navigate = useNavigate();
  const selectHelper = useGameStore((s) => s.selectHelper);

  const handleSelect = (id: HelperId) => {
    selectHelper(id);
    navigate('/spot/1');
  };

  return (
    <PhoneFrame>
      <Masthead />
      <p className="select__kicker">조력자를 선택하라</p>
      <p className="select__desc">
        독립운동 선배들이 무전으로 도움을 전한다.<br />
        난이도는 동일, 말투만 다르다.
      </p>
      <div className="select__grid">
        {helpers.map((h) => (
          <button key={h.id} className="select__card" onClick={() => handleSelect(h.id)}>
            <img src={h.avatar} alt={h.name} className="select__avatar" />
            <p className="select__name">{h.name}</p>
            <p className="select__trait">{h.trait}</p>
          </button>
        ))}
      </div>
    </PhoneFrame>
  );
}
