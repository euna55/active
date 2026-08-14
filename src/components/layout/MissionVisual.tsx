import type { VisualBlock } from '../../data/spots';
import './MissionVisual.css';

interface Props {
  visual: VisualBlock;
}

export default function MissionVisual({ visual }: Props) {
  if (visual.kind === 'grid3x3') {
    return (
      <div className="mission-visual__grid">
        {visual.cells.map((cell, i) => (
          <div key={i} className="mission-visual__grid-cell">
            {cell === 'EMBLEM' ? <span className="mission-visual__emblem" /> : cell}
          </div>
        ))}
      </div>
    );
  }

  if (visual.kind === 'note') {
    return (
      <div className="mission-visual__note">
        {visual.lines.map((line, i) => (
          <p key={i} className="mission-visual__note-line">
            {line}
          </p>
        ))}
      </div>
    );
  }

  if (visual.kind === 'equations') {
    return (
      <div className="mission-visual__equations">
        {visual.items.map((item, i) => (
          <div key={i} className="mission-visual__equation-row">
            <span
              className={`mission-visual__swatch mission-visual__swatch--${item.shape}`}
              style={{ background: item.colorHex }}
            />
            <span className="mission-visual__equation-text">{item.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mission-visual__image-wrap">
      <img src={visual.src} alt="" className="mission-visual__image" />
    </div>
  );
}
