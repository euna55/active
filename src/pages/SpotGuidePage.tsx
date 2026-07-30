import { useParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import Timer from '../components/layout/Timer';
import CopGauge from '../components/layout/CopGauge';
import RadioBubble from '../components/layout/RadioBubble';
import ProgressBar from '../components/layout/ProgressBar';
import { useGameStore } from '../store/gameStore';
import { helpers, helperLines } from '../data/helpers';
import spots from '../data/spots';
import './SpotGuidePage.css';

export default function SpotGuidePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spotId = Number(id);
  const spot = spots.find((s) => s.id === spotId);

  const helperId = useGameStore((s) => s.helperId);
  const spotStatus = useGameStore((s) => s.spotStatus);
  const currentSpot = useGameStore((s) => s.currentSpot);
  const arriveAtSpot = useGameStore((s) => s.arriveAtSpot);

  if (!spot) return <div>스팟을 찾을 수 없습니다.</div>;

  // 순서 강제: 아직 열리지 않은 스팟 접근 차단
  if (spotId > currentSpot) {
    return (
      <PhoneFrame>
        <Masthead />
        <div className="spot-guide__locked">
          <p>아직 이 거점을 열 수 없어요.</p>
          <p>{currentSpot}번 거점을 먼저 찾으세요.</p>
          <button className="spot-guide__btn" onClick={() => navigate(`/spot/${currentSpot}`)}>
            {currentSpot}번 거점으로
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const helper = helpers.find((h) => h.id === helperId) ?? helpers[3];
  const override = helperId ? helperLines[helperId]?.[spotId] : undefined;
  const radioText = override?.radio ?? spot.radioLine;

  const status = spotStatus[spotId];

  const handleArrive = () => {
    arriveAtSpot(spotId);
    navigate(`/spot/${spotId}/memo`);
  };

  return (
    <PhoneFrame>
      <Masthead />
      <div className="spot-guide__hud">
        <Timer />
        <CopGauge />
      </div>
      <ProgressBar />

      <p className="spot-guide__num">{spotId}번째 거점</p>
      <img src={spot.photo} alt="" className="spot-guide__photo" />
      <p className="spot-guide__hint">{spot.findHint}</p>

      <RadioBubble avatarSrc={helper.avatar} name={helper.name} text={radioText} />

      {status === 'locked' && (
        <button className="spot-guide__btn" onClick={handleArrive}>
          이 장소로 출발!
        </button>
      )}
      {status !== 'locked' && (
        <button className="spot-guide__btn" onClick={() => navigate(`/spot/${spotId}/memo`)}>
          쪽지 확인하기
        </button>
      )}
    </PhoneFrame>
  );
}
