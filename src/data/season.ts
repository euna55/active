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
};

export default season;
