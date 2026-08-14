export interface Season {
  id: string;
  hero: {
    name: string;
    realName: string;
    lifespan: string;
    poemTitle: string;
    revealText: string;
  };
  poemLines: string[];
  fragmentOrder: string[];
  guessClues: string[];
  guessOptions: string[];
}

const season: Season = {
  id: '2026-08-shimhun',
  hero: {
    name: '심훈',
    realName: '심대섭',
    lifespan: '1901~1936',
    poemTitle: '그날이 오면',
    revealText:
      '그 시를 쓴 이는… 소설 『상록수』의 작가이자,\n빼앗긴 조국의 광복을 온 몸으로 기다린 독립운동가\n심 훈(沈熏, 1901~1936)이었습니다.',
  },
  poemLines: [
    '그날이 오면 그날이 오면은',
    '삼각산이 일어나 더덩실 춤이라도 추고',
    '한강물이 뒤집혀 용솟음칠 그날이',
    '이 목숨이 끊기기 전에 와주기만 하량이면',
    '나는 밤하늘에 날으는 까마귀와 같이',
    '종로의 인경을 머리로 들이받아 울리오리다',
    '두개골은 깨어져 산산조각이 나도',
    '기뻐서 죽사오매 오히려 무슨 한이 남으오리까',
  ],
  // 8개 스팟에서 모으는 조각(짧은 구절)을 시 낭독 순서대로 나열한 값.
  // spots.ts의 각 spot.fragment와 정확히 일치해야 함 (FinalPuzzlePage 정답 판정용).
  fragmentOrder: [
    '그날이 오면',
    '삼각산이',
    '더덩실 춤이라도 추고',
    '한강물이',
    '용솟음칠',
    '이 목숨이 끊기기 전에',
    '두개골은 깨어져 산산조각이 나도',
    '기뻐서 죽사오매',
  ],
  guessClues: [
    '열아홉 살에 이 문 근처에서 붙잡힘 (스팟 1)',
    '총 대신 펜(신문)을 들었음 (스팟 2)',
    '"늘 푸른 나무" 이야기를 씀 (스팟 3)',
    '그 봄, 학생 신분으로 만세 운동에 뛰어들었다가 붙잡힘 (스팟 4)',
    '저 담장 너머(서대문형무소)에 갇혔던 적이 있음 (스팟 7)',
  ],
  guessOptions: ['심훈', '이육사', '윤동주'],
};

export default season;
