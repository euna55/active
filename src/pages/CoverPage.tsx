import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/layout/PhoneFrame';
import Masthead from '../components/layout/Masthead';
import './CoverPage.css';

export default function CoverPage() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <Masthead />
      <p className="cover__kicker">號 外 · 비 상 경 보</p>
      <h2 className="cover__headline">
        다들<br />
        어디까지<br />
        <span className="cover__headline--em">알고 있어?</span>
      </h2>
      <hr className="cover__rule cover__rule--double" />
      <p className="cover__body">
        독립군의 마지막 <strong>군자금</strong>과 비밀 인쇄기를 숨긴 독립운동가가
        자취를 감추었다. 그가 남긴 <strong>시(詩)</strong> 한 장이 여덟 조각으로
        찢겨 흩어졌으니— <strong>한 시간</strong> 안에 모두 찾아야 한다.
      </p>
      <hr className="cover__rule" />
      <p className="cover__call">요원 「무명」, 임무를 수락하겠는가?</p>
      <button className="cover__btn" onClick={() => navigate('/select')}>
        임무 시작하기
      </button>
    </PhoneFrame>
  );
}
