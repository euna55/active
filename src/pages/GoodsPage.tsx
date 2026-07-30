import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import { useGameStore } from '../store/gameStore';
import season from '../data/season';
import './GoodsPage.css';

const GOODS = [
  { emoji: '📖', name: '시집 미니북', desc: '「그날이 오면」 수록 미니 시집' },
  { emoji: '🔖', name: '우드 책갈피', desc: '심훈 친필 문구 각인' },
  { emoji: '🎨', name: '스티커 팩', desc: '8스팟 현장 일러스트 스티커' },
  { emoji: '🃏', name: '정체 카드', desc: '심훈 독립운동가 카드' },
  { emoji: '🧣', name: '자수 손수건', desc: '태극 문양 손수건' },
];

export default function GoodsPage() {
  const navigate = useNavigate();
  const reset = useGameStore((s) => s.reset);

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  return (
    <PhoneFrame>
      <Masthead />
      <p className="goods__title">임무 완수!</p>
      <p className="goods__hero">— {season.hero.name} —</p>
      <p className="goods__desc">
        여덟 조각을 모두 모아 독립운동가의 정체를 밝혔습니다.<br />
        아래 굿즈를 현장 스태프에게 보여주세요.
      </p>

      <div className="goods__list">
        {GOODS.map((g) => (
          <div key={g.name} className="goods__item">
            <span className="goods__emoji">{g.emoji}</span>
            <div>
              <p className="goods__name">{g.name}</p>
              <p className="goods__item-desc">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="goods__restart" onClick={handleRestart}>
        처음부터 다시하기
      </button>
    </PhoneFrame>
  );
}
