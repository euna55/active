export type Mission =
  | { type: 'numberLock'; digits: number; answer: string; prompt: string }
  | { type: 'wordAssemble'; tiles: string[]; answer: string[]; prompt: string }
  | { type: 'patternColor'; sequence: string[]; answer: string; prompt: string }
  | { type: 'flagAssemble'; answer: 'correct'; prompt: string }
  | { type: 'direction'; target: string; prompt: string }
  | { type: 'blockShape'; answer: 'arch'; prompt: string }
  | { type: 'findMark'; markPosition: { x: number; y: number }; prompt: string };

export interface Spot {
  id: number;
  qrToken: string;
  photo: string;
  findHint: string;
  arriveText: string;
  radioLine: string;
  memo: string;
  task: string;
  mission: Mission;
  fragment: string;
  nextHint: string;
  timeLabel: string;
}

// ⚠️ 정답값은 현장 답사 전 임시값. 이 파일 한 곳에서만 수정할 것.
const spots: Spot[] = [
  {
    id: 1,
    qrToken: 'spot1-abc',
    photo: '/assets/spots/spot1.jpg',
    findHint: '저 멀리 커다란 아치형 돌문이 보인다. 나라를 되찾겠다는 의지로 세운 문—그 앞에 서 있어.',
    arriveText: '도착했어! 이 돌문에는 숫자 비밀이 숨어 있어. 기단 어딘가에 새겨진 연도를 찾아봐.',
    radioLine: '첫 번째 거점이야. 저 돌문을 자세히 살펴봐. 건립 연도 숫자가 있을 거야.',
    memo: '문이 세워진 해, 1896. 거기서 앞 두 자리를 더하면 문이 열린다.',
    task: '자물쇠 숫자를 맞혀라: 1+8+9+6+… 힌트를 풀어라.',
    mission: {
      type: 'numberLock',
      digits: 3,
      answer: '116', // 임시값 — 답사 후 수정
      prompt: '기단에 새겨진 연도 숫자들을 모두 더하면?',
    },
    fragment: '삼각산이',
    nextHint: '다음은 독립신문을 창간한 분의 동상이야. 공원 중앙 쪽을 찾아봐.',
    timeLabel: '오후 2시 12분',
  },
  {
    id: 2,
    qrToken: 'spot2-def',
    photo: '/assets/spots/spot2.jpg',
    findHint: '돌로 된 인물 동상이 높은 받침대 위에 서 있어. 아래 기단에 한자가 새겨져 있어.',
    arriveText: '이 분이 만든 신문 이름을 글자 조각으로 맞춰봐.',
    radioLine: '동상 기단 명문을 잘 봐. 그 분이 만든 신문 이름 네 글자가 있어.',
    memo: '나라의 소식을 온 백성에게 전하려 했던 신문. 네 글자.',
    task: '아래 글자 조각을 올바른 순서로 놓아라.',
    mission: {
      type: 'wordAssemble',
      tiles: ['신', '독', '문', '립'],
      answer: ['독', '립', '신', '문'], // 임시값
      prompt: '이 분이 창간한 신문 이름을 순서대로 맞춰라.',
    },
    fragment: '더덩실 춤이라도 추고',
    nextHint: '다음은 옛 독립운동의 집결지였던 건물이야. 단청이 화려하게 남아 있어.',
    timeLabel: '오후 2시 22분',
  },
  {
    id: 3,
    qrToken: 'spot3-ghi',
    photo: '/assets/spots/spot3.jpg',
    findHint: '기와지붕에 단청이 칠해진 건물이야. 처마 아래 색깔 패턴을 찾아봐.',
    arriveText: '단청 색깔 규칙을 찾아라. 빠진 색이 뭔지 맞히면 다음 조각을 얻어.',
    radioLine: '단청 무늬 색 패턴을 살펴봐. 빠진 색을 찾아야 해.',
    memo: '청—적—청—적—? 다음에 올 색은 무엇인가.',
    task: '단청 색 규칙의 다음 색을 골라라.',
    mission: {
      type: 'patternColor',
      sequence: ['파랑', '빨강', '파랑', '빨강', '?'],
      answer: '초록', // 임시값 — 현장 답사 후 수정
      prompt: '단청 색 패턴에서 빠진 색은?',
    },
    fragment: '한강물이',
    nextHint: '다음은 3·1 독립선언 기념탑이야. 공원 안쪽 넓은 광장에 있어.',
    timeLabel: '오후 2시 35분',
  },
  {
    id: 4,
    qrToken: 'spot4-jkl',
    photo: '/assets/spots/spot4.jpg',
    findHint: '높은 탑이 서 있는 광장이야. 탑 아래에 숫자가 새겨진 비문이 있어.',
    arriveText: '탑 비문에서 날짜 숫자를 찾아봐. 자물쇠를 열어야 해.',
    radioLine: '이 탑은 3·1운동을 기념해. 기념탑에 새겨진 날짜를 그대로 입력해.',
    memo: '만세를 외친 그날—1919년 3월 1일.',
    task: '자물쇠에 3·1운동 날짜를 입력하라.',
    mission: {
      type: 'numberLock',
      digits: 6,
      answer: '331919', // 임시값
      prompt: '3·1운동이 일어난 날짜를 6자리로 입력해: 월일년',
    },
    fragment: '이 목숨이 끊기기 전에',
    nextHint: '다음은 유관순 열사의 동상이야. 공원 한편에 서 있어.',
    timeLabel: '오후 2시 48분',
  },
  {
    id: 5,
    qrToken: 'spot5-mno',
    photo: '/assets/spots/spot5.jpg',
    findHint: '한 손을 높이 든 여성 독립운동가 동상이야. 받침대에 이름이 새겨져 있어.',
    arriveText: '이 분이 들고 있는 태극기 조각을 올바르게 맞춰봐.',
    radioLine: '태극기를 완성해야 해. 조각 위치를 잘 맞춰봐.',
    memo: '태극기의 뜻을 기억해. 빨강은 위, 파랑은 아래.',
    task: '태극기 조각을 올바른 위치에 맞춰라.',
    mission: {
      type: 'flagAssemble',
      answer: 'correct',
      prompt: '태극기를 완성하라.',
    },
    fragment: '오면은',
    nextHint: '다음은 순국선열추념탑이야. 높은 탑 앞에 넓은 공간이 있어.',
    timeLabel: '오후 3시 02분',
  },
  {
    id: 6,
    qrToken: 'spot6-pqr',
    photo: '/assets/spots/spot6.jpg',
    findHint: '높고 날카롭게 솟은 기념탑이야. 탑 꼭대기를 향해 서 보면 방향이 보여.',
    arriveText: '탑 앞에 서서 나침반으로 방향을 찾아봐. 옛 형무소가 있던 방향은?',
    radioLine: '이 탑에서 옛 서대문형무소 방향을 찾아야 해. 나침반 방향으로 힌트가 숨어 있어.',
    memo: '추념탑에서 봤을 때, 형무소는 동쪽에 있었다.',
    task: '추념탑에서 형무소 방향을 찾아라.',
    mission: {
      type: 'direction',
      target: '동', // 임시값 — 현장 답사 후 수정
      prompt: '추념탑에서 옛 서대문형무소가 있는 방향은?',
    },
    fragment: '용솟음칠',
    nextHint: '다음은 경성감옥 발굴지야. 땅 아래 흔적이 남아 있어.',
    timeLabel: '오후 3시 15분',
  },
  {
    id: 7,
    qrToken: 'spot7-stu',
    photo: '/assets/spots/spot7.jpg',
    findHint: '땅 아래 옛 감옥 흔적이 발굴된 곳이야. 안내판이 있어.',
    arriveText: '안내판에 그려진 도형 블록으로 옛 감옥 입구 모양을 맞춰봐.',
    radioLine: '발굴지 안내판을 봐. 옛 입구의 모양을 블록으로 맞춰야 해.',
    memo: '옛 경성감옥 정문은 아치형이었다. 블록을 쌓아 그 모양을 만들어라.',
    task: '옛 감옥 입구 모양을 블록으로 맞춰라.',
    mission: {
      type: 'blockShape',
      answer: 'arch',
      prompt: '옛 경성감옥 정문 모양은?',
    },
    fragment: '두개골은 깨어져 산산조각이 나도',
    nextHint: '마지막! 서대문형무소역사관 입구야. 바로 옆에 있어.',
    timeLabel: '오후 3시 28분',
  },
  {
    id: 8,
    qrToken: 'spot8-vwx',
    photo: '/assets/spots/spot8.jpg',
    findHint: '서대문형무소역사관 입구야. 담벼락 어딘가에 숨겨진 표식을 찾아봐.',
    arriveText: '입구 담벼락에서 작은 표식을 찾아 탭해봐. 그곳에 마지막 조각이 숨어 있어.',
    radioLine: '마지막이야. 담벼락 어딘가에 숨겨진 표식을 찾아봐. 잘 살펴봐!',
    memo: '담벼락 오른편, 눈높이 아래. 작은 원이 새겨져 있다.',
    task: '담벼락에서 숨겨진 표식을 찾아 탭하라.',
    mission: {
      type: 'findMark',
      markPosition: { x: 60, y: 38 }, // 임시값 — 현장 답사 후 수정 (퍼센트 좌표)
      prompt: '담벼락 어딘가에 숨겨진 표식을 찾아봐.',
    },
    fragment: '그날이 오면', // 스팟8만 시 제목 노출 허용
    nextHint: '',
    timeLabel: '오후 3시 42분',
  },
];

export default spots;
