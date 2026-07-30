import './Masthead.css';

export default function Masthead() {
  return (
    <header className="masthead">
      <span className="masthead__date-col masthead__date-col--left">一八九六年</span>
      <h1 className="masthead__title">독립신문</h1>
      <svg className="masthead__flag" viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="20" fill="#f3ead3" stroke="#241f18" strokeWidth="1" />
        <circle cx="15" cy="10" r="5" fill="#a12b24" />
        <path
          d="M15 5 a5 5 0 0 1 0 10 a2.5 2.5 0 0 0 0 -5 a2.5 2.5 0 0 1 0 -5"
          fill="#241f18"
        />
      </svg>
      <span className="masthead__date-col masthead__date-col--right">四月七日</span>
    </header>
  );
}
