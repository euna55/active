import { useParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import Timer from '../components/layout/Timer';
import CopGauge from '../components/layout/CopGauge';
import Memo from '../components/layout/Memo';
import RadioBubble from '../components/layout/RadioBubble';
import ProgressBar from '../components/layout/ProgressBar';
import { useGameStore } from '../store/gameStore';
import { helpers, helperLines } from '../data/helpers';
import spots from '../data/spots';
import './MemoPage.css';

export default function MemoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spotId = Number(id);
  const spot = spots.find((s) => s.id === spotId);

  const helperId = useGameStore((s) => s.helperId);

  if (!spot) return <div>스팟을 찾을 수 없습니다.</div>;

  const helper = helpers.find((h) => h.id === helperId) ?? helpers[3];
  const override = helperId ? helperLines[helperId]?.[spotId] : undefined;
  const radioText = override?.radio ?? spot.radioLine;

  return (
    <PhoneFrame>
      <Masthead />
      <div className="memo-page__hud">
        <Timer />
        <CopGauge />
      </div>
      <ProgressBar />

      <p className="memo-page__arrive">
        <span className="memo-page__arrive-stamp">도착 확인</span>
      </p>
      <p className="memo-page__arrive-desc">{spot.arriveText}</p>

      <RadioBubble avatarSrc={helper.avatar} name={helper.name} text={radioText} />
      <Memo text={spot.memo} task={spot.task} />

      <button className="memo-page__btn" onClick={() => navigate(`/mission/${spotId}`)}>
        암호 풀기
      </button>
    </PhoneFrame>
  );
}
