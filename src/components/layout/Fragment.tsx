import './Fragment.css';

interface Props {
  text: string;
  index?: number;
}

export default function Fragment({ text, index }: Props) {
  const rotation = ((index ?? 0) % 3) - 1;
  return (
    <div className="fragment" style={{ transform: `rotate(${rotation}deg)` }}>
      <p className="fragment__label">— 시 조각 획득 —</p>
      <p className="fragment__text">{text}</p>
    </div>
  );
}
