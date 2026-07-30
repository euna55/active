import './RadioBubble.css';

interface Props {
  avatarSrc: string;
  name: string;
  text: string;
}

export default function RadioBubble({ avatarSrc, name, text }: Props) {
  return (
    <div className="radio">
      <div className="radio__avatar">
        <img src={avatarSrc} alt={name} />
      </div>
      <div className="radio__bubble">
        <span className="radio__name">{name}</span>
        {text}
      </div>
    </div>
  );
}
