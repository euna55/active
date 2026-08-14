import { useState } from 'react';
import NumberLockMission from './NumberLockMission';
import ChoiceMission from './ChoiceMission';
import HintPanel from '../layout/HintPanel';
import type { StageA, StageChoice } from '../../data/spots';
import './TwoStageMission.css';

interface Props {
  stageA: StageA;
  stageB: StageChoice;
  hintsA?: string[];
  hintsB?: string[];
  onSolve: () => void;
}

export default function TwoStageMission({ stageA, stageB, hintsA, hintsB, onSolve }: Props) {
  const [stage, setStage] = useState<'a' | 'b'>('a');

  return (
    <div className="two-stage">
      {stage === 'a' && (
        <>
          {stageA.kind === 'numberLock' && (
            <NumberLockMission
              digits={stageA.digits}
              answer={stageA.answer}
              prompt={stageA.prompt}
              onSolve={() => setStage('b')}
            />
          )}
          {stageA.kind === 'confirm' && (
            <div className="two-stage__confirm">
              <p className="two-stage__confirm-prompt">{stageA.prompt}</p>
              <button className="two-stage__confirm-btn" onClick={() => setStage('b')}>
                {stageA.buttonLabel}
              </button>
            </div>
          )}
          {hintsA && <HintPanel hints={hintsA} />}
        </>
      )}

      {stage === 'b' && (
        <>
          <ChoiceMission
            options={stageB.options}
            answer={stageB.answer}
            prompt={stageB.prompt}
            onSolve={onSolve}
          />
          {hintsB && <HintPanel hints={hintsB} />}
        </>
      )}
    </div>
  );
}
