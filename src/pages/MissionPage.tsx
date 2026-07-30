import { useParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import Timer from '../components/layout/Timer';
import CopGauge from '../components/layout/CopGauge';
import ProgressBar from '../components/layout/ProgressBar';
import NumberLockMission from '../components/missions/NumberLockMission';
import WordAssembleMission from '../components/missions/WordAssembleMission';
import PatternColorMission from '../components/missions/PatternColorMission';
import FlagAssembleMission from '../components/missions/FlagAssembleMission';
import DirectionMission from '../components/missions/DirectionMission';
import BlockShapeMission from '../components/missions/BlockShapeMission';
import FindMarkMission from '../components/missions/FindMarkMission';
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
        {mission.type === 'numberLock' && (
          <NumberLockMission
            digits={mission.digits}
            answer={mission.answer}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'wordAssemble' && (
          <WordAssembleMission
            tiles={mission.tiles}
            answer={mission.answer}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'patternColor' && (
          <PatternColorMission
            sequence={mission.sequence}
            answer={mission.answer}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'flagAssemble' && (
          <FlagAssembleMission
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'direction' && (
          <DirectionMission
            target={mission.target}
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'blockShape' && (
          <BlockShapeMission
            prompt={mission.prompt}
            onSolve={handleSolve}
          />
        )}
        {mission.type === 'findMark' && (
          <FindMarkMission
            markPosition={mission.markPosition}
            prompt={mission.prompt}
            photo={spot.photo}
            onSolve={handleSolve}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
