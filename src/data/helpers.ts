export type HelperId = 'yugwansun' | 'ahnjunggeun' | 'yunbonggil' | 'kimgu';

export interface Helper {
  id: HelperId;
  name: string;
  avatar: string;
  trait: string;
  tone: string;
}

export const helpers: Helper[] = [
  {
    id: 'yugwansun',
    name: '유관순',
    avatar: `${import.meta.env.BASE_URL}assets/characters/yugwansun.png`,
    trait: '용기·직관',
    tone: '밝고 용감하게, 짧고 힘찬 문장으로',
  },
  {
    id: 'ahnjunggeun',
    name: '안중근',
    avatar: `${import.meta.env.BASE_URL}assets/characters/ahnjunggeun.png`,
    trait: '정의·결단',
    tone: '단호하고 무게감 있게, 명확한 지시',
  },
  {
    id: 'yunbonggil',
    name: '윤봉길',
    avatar: `${import.meta.env.BASE_URL}assets/characters/yunbonggil.png`,
    trait: '희생·열정',
    tone: '뜨겁고 시적으로, 감성적인 표현',
  },
  {
    id: 'kimgu',
    name: '김구',
    avatar: `${import.meta.env.BASE_URL}assets/characters/kimgu.png`,
    trait: '신중·지혜',
    tone: '차분하고 어른스럽게, 격려 중심',
  },
];

// 조력자별 스팟 대사 오버라이드
// 기본은 spot.radioLine 사용. 조력자별 대사가 있으면 우선 사용.
// 난이도(정답·힌트 정보량)는 반드시 동일하게 유지할 것.
export const helperLines: Record<HelperId, Partial<Record<number, { radio: string }>>> = {
  yugwansun: {
    1: { radio: '첫 번째야! 저 돌문을 자세히 봐. 숫자를 더해야 문이 열릴 거야!' },
    2: { radio: '이 분이 만든 신문 이름이 뭔지 알아? 겹치는 소리를 지워봐!' },
  },
  ahnjunggeun: {
    1: { radio: '기단 숫자를 확인하라. 더하면 답이 나온다.' },
    2: { radio: '기단 명문을 읽어라. 겹치는 소리를 지우면 답이 남는다.' },
  },
  yunbonggil: {
    1: { radio: '저 돌문에 새겨진 숫자들이 보여? 하나씩 더해보면 비밀이 열릴 거야…' },
    2: { radio: '두 줄에 겹치는 소리… 하나씩 지우면 무엇이 남을까?' },
  },
  kimgu: {
    1: { radio: '저 돌문을 잘 살펴보게. 새겨진 숫자들을 더하면 자물쇠가 열릴 거야.' },
    2: { radio: '동상 기단에 새겨진 소리 중, 겹치는 것을 지워보게.' },
  },
};
