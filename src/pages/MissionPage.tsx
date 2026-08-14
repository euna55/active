import { useParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import Timer from '../components/layout/Timer';
import CopGauge from '../components/layout/CopGauge';
import ProgressBar from '../components/layout/ProgressBar';
import HintPanel from '../components/layout/HintPanel';
import MissionVisual from '../components/layout/MissionVisual';
import NumberLockMission from '../components/missions/NumberLockMission';
import TextInputMission from '../components/missions/TextInputMission';
import CharFindMission from '../components/missions/CharFindMission';
import FillBlankMission from '../components/missions/FillBlankMission';
import TwoStageMission from '../components/missions/TwoStageMission';
import { useGameStore } from '../store/gameStore';
import spots from '../data/spots';
import './MissionPage.css';

export default function MissionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spotId = Number(id);
  const spot = spots.find((s) => s.id === spotId);
  const solveSpot = useGameStore((s) => s.solveSpot);

  if (!spot) return <div>스팟을 찾을 수 없습니다.</div>;

  const handleSolve = () => {
    solveSpot(spotId, spot.fragment);
    navigate(`/mission/${spotId}/reward`);
  };

  const { mission } = spot;

  return (
    <PhoneFrame>
      <Masthead />
      <div className="mission-page__hud">
        <Timer />
        <CopGauge />
      </div>
      <ProgressBar />
      <p className="mission-page__title">{spotId}번 미션</p>

      <div className="mission-page__content">
        {spot.visual && <MissionVisual visual={spot.visual} />}

        {mission.type === 'numberLock' && (
          <NumberLockMission
            digits={mission.digits}
            answer={mission.answer}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'textInput' && (
          <TextInputMission answer={mission.answer} prompt={mission.prompt} onSolve={handleSolve} />
        )}
        {mission.type === 'charFind' && (
          <CharFindMission
            chars={mission.chars}
            revealed={mission.revealed}
            answer={mission.answer}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'fillBlank' && (
          <FillBlankMission
            quote={mission.quote}
            labelA={mission.labelA}
            labelB={mission.labelB}
            answerA={mission.answerA}
            answerB={mission.answerB}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'twoStage' && (
          <TwoStageMission
            stageA={mission.stageA}
            stageB={mission.stageB}
            hintsA={mission.hintsA}
            hintsB={mission.hintsB}
            onSolve={handleSolve}
          />
        )}

        {mission.type !== 'twoStage' && spot.hints && <HintPanel hints={spot.hints} />}
      </div>
    </PhoneFrame>
  );
}
