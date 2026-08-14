import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import ChoiceMission from '../components/missions/ChoiceMission';
import season from '../data/season';
import './GuessPage.css';

export default function GuessPage() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <Masthead />
      <p className="guess__kicker">최종 · 정체 추리</p>
      <h2 className="guess__title">
        이 시를 쓰고, 독립 자금을 숨긴 채 사라진 그 사람은 누구일까요?
      </h2>

      <div className="guess__clues">
        {season.guessClues.map((clue, i) => (
          <p key={i} className="guess__clue">
            · {clue}
          </p>
        ))}
      </div>

      <ChoiceMission
        options={season.guessOptions}
        answer={season.hero.name}
        onSolve={() => navigate('/reveal')}
      />
    </PhoneFrame>
  );
}
