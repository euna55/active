import './Memo.css';

interface Props {
  text: string;
  task?: string;
}

export default function Memo({ text, task }: Props) {
  return (
    <div className="memo">
      <p className="memo__label">— 발견된 쪽지 —</p>
      <p className="memo__text">{text}</p>
      {task && <p className="memo__task">{task}</p>}
    </div>
  );
}
