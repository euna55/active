import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import season from '../data/season';
import './RevealPage.css';

export default function RevealPage() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <Masthead />
      <p className="reveal__kicker">— 정체 공개 —</p>
      <p className="reveal__poem-title">「{season.hero.poemTitle}」</p>

      <div className="reveal__poem">
        {season.poemLines.map((line, i) => (
          <p key={i} className="reveal__poem-line">{line}</p>
        ))}
      </div>

      <hr className="reveal__rule" />

      <p className="reveal__question">이 시를 쓴 사람은 누구인가?</p>
      <p className="reveal__name">{season.hero.name}</p>
      <p className="reveal__info">
        {season.hero.realName} · {season.hero.lifespan}
      </p>
      <p className="reveal__text">{season.hero.revealText}</p>

      <hr className="reveal__rule" />
      <p className="reveal__liberation">
        1945년 8월 15일 — 광복.<br />
        그날이 마침내 왔습니다.
      </p>

      <button className="reveal__btn" onClick={() => navigate('/reveal/reward')}>
        임무 완수 · 기념 굿즈 받기
      </button>
    </PhoneFrame>
  );
}
