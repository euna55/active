import { useParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import Fragment from '../components/layout/Fragment';
import RadioBubble from '../components/layout/RadioBubble';
import ProgressBar from '../components/layout/ProgressBar';
import { useGameStore } from '../store/gameStore';
import { helpers } from '../data/helpers';
import spots from '../data/spots';
import './RewardPage.css';

export default function RewardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spotId = Number(id);
  const spot = spots.find((s) => s.id === spotId);

  const helperId = useGameStore((s) => s.helperId);
  const collectedFragments = useGameStore((s) => s.collectedFragments);

  if (!spot) return <div>스팟을 찾을 수 없습니다.</div>;

  const helper = helpers.find((h) => h.id === helperId) ?? helpers[3];

  const handleNext = () => {
    if (spotId >= 8) {
      navigate('/final');
    } else {
      navigate(`/spot/${spotId + 1}`);
    }
  };

  return (
    <PhoneFrame>
      <Masthead />
      <ProgressBar />

      <div className="reward__acquired">시 조각 획득!</div>
      <Fragment text={spot.fragment} index={spotId - 1} />

      <p className="reward__count">
        {collectedFragments.length} / 8 조각 수집
      </p>

      <RadioBubble avatarSrc={helper.avatar} name={helper.name} text={spot.solveExplain} />

      <button className="reward__btn" onClick={handleNext}>
        {spotId >= 8 ? '모든 조각을 모았다!' : '다음 거점으로'}
      </button>
    </PhoneFrame>
  );
}
