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
export const helperLines: Record<HelperId, Partial<Record<number, { radio: string; next: string }>>> = {
  yugwansun: {
    1: {
      radio: '첫 번째야! 저 돌문을 자세히 봐. 숫자가 새겨져 있을 거야!',
      next: '잘했어! 다음도 할 수 있어. 신문 만든 분 동상을 찾아봐!',
    },
    2: {
      radio: '이 분이 만든 신문 이름이 뭔지 알아? 글자 조각으로 맞춰봐!',
      next: '완벽해! 이번엔 단청이 있는 건물로 가봐!',
    },
  },
  ahnjunggeun: {
    1: {
      radio: '기단 숫자를 확인하라. 연도를 더하면 답이 나온다.',
      next: '좋아. 다음은 독립신문 창간자의 동상이다. 이동하라.',
    },
    2: {
      radio: '기단 명문을 읽어라. 그 신문 이름 네 글자가 답이다.',
      next: '정확하다. 단청 건물로 이동하라.',
    },
  },
  yunbonggil: {
    1: {
      radio: '저 돌문에 새겨진 연도들이 보여? 하나씩 더해보면 비밀이 열릴 거야…',
      next: '조각 하나를 손에 쥐었어. 다음엔 신문을 만든 분의 발자취를 따라가봐.',
    },
    2: {
      radio: '자유를 향한 소식을 담은 신문… 그 이름 네 글자를 맞춰줘.',
      next: '멋져. 이번엔 단청이 빛나는 곳으로.',
    },
  },
  kimgu: {
    1: {
      radio: '저 돌문을 잘 살펴보게. 건립 연도 숫자들을 더하면 자물쇠가 열릴 거야.',
      next: '잘했네. 이제 독립신문을 창간한 분의 동상으로 가보게.',
    },
    2: {
      radio: '동상 기단에 새겨진 신문 이름을 글자 조각으로 맞춰보게.',
      next: '훌륭해. 다음은 단청이 있는 건물로 가보게.',
    },
  },
};
