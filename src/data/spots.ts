export type StageA =
  | { kind: 'numberLock'; digits: number; answer: string; prompt: string }
  | { kind: 'confirm'; prompt: string; buttonLabel: string };

export type StageChoice = { kind: 'choice'; options: string[]; answer: string; prompt: string };

export type Mission =
  | { type: 'numberLock'; digits: number; answer: string; prompt: string }
  | { type: 'textInput'; answer: string; prompt: string }
  | {
      type: 'charFind';
      chars: string[];
      revealed: { index: number; order: number }[];
      answer: string;
      prompt: string;
    }
  | {
      type: 'fillBlank';
      quote: string;
      labelA: string;
      labelB: string;
      answerA: string;
      answerB: string;
      prompt: string;
    }
  | { type: 'twoStage'; stageA: StageA; stageB: StageChoice; hintsA?: string[]; hintsB?: string[] };

export type VisualBlock =
  | { kind: 'grid3x3'; cells: string[] }
  | { kind: 'note'; lines: string[] }
  | { kind: 'equations'; items: { colorHex: string; shape: 'circle' | 'square'; text: string }[] }
  | { kind: 'image'; src: string };

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
  hints?: string[];
  visual?: VisualBlock;
  solveExplain: string;
  fragment: string;
  timeLabel: string;
}

// 정답값은 2026-08-15 런칭 확정본 (현장 답사 완료). 이 파일 한 곳에서만 수정할 것.
const spots: Spot[] = [
  {
    id: 1,
    qrToken: 'spot1-abc',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot1.jpg`,
    findHint: '저 멀리 커다란 아치형 돌문이 보이는가? 지도를 보지 말고, 그대 눈으로 저 문을 직접 찾아가게!',
    arriveText: '돌문 앞에 도착했다. 문 위에 숨겨진 쪽지를 확인해보자.',
    radioLine: '저 돌문을 자세히 살펴봐. 숫자를 더해야 문이 열릴 거야.',
    memo: '「과거를 잊은 민족에게 미래는 없다.\n과거를 더해야\n오늘이 보이리라.」',
    task: '기단에 새겨진 숫자들을 더해 자물쇠를 열어라.',
    mission: {
      type: 'numberLock',
      digits: 2,
      answer: '11',
      prompt: '기단에 새겨진 연도 숫자들을 모두 더하면?',
    },
    hints: [
      '그 시절의 깃발은 지금과 달랐다네. 쪽지에 뭐라 적혀 있었지? "과거를 더해야 오늘이 보이리라"… 그 말이 곧 열쇠일세. 더한다 — 무엇을 더하라는 뜻이겠나?',
      '네 귀퉁이의 까만 막대가 몇 줄인지 세어 보았는가? 3줄도 있고, 5줄도 있을 걸세.',
      '이미 적힌 세 숫자를 보게. 오늘의 줄 수와 그 시절의 줄 수를 합한 값일세. 같은 방법으로 빈칸을 채우면 되네.',
    ],
    visual: { kind: 'grid3x3', cells: ['7', '', '11', '', 'EMBLEM', '', '7', '', '?'] },
    solveExplain:
      '독립문이 세워진 1897년 무렵에는 태극기 모양이 정확히 정해져 있지 않았다네. 지금의 모양은 1949년에야 정식으로 정해졌어. 저 문 위의 깃발은 그 시절을 그대로 간직한 흔적일세.',
    fragment: '삼각산이',
    timeLabel: '오후 2시 12분',
  },
  {
    id: 2,
    qrToken: 'spot2-def',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot2.jpg`,
    findHint: '한 손을 높이 든 사람의 동상을 찾게. 글과 신문으로 나라를 지킨 이일세.',
    arriveText: '동상 앞에 도착했다. 새겨진 글자를 살펴보자.',
    radioLine: '동상 기단 명문을 읽어라. 그 신문 이름 네 글자가 답이다.',
    memo:
      '「이 어른은 총을 들지 않았다.\n손에 쥔 종이가 곧 그의 무기였다.\n\n그 이름은 저 문의 이름을 품고 있다.\n품은 것을 내려놓으면\n낯선 하나가 모습을 드러내리라.」',
    task: '겹치는 소리를 지우고, 남는 글자 하나를 입력하라.',
    mission: {
      type: 'textInput',
      answer: '신',
      prompt: '門立獨과 독립신문, 겹치는 소리를 하나씩 지우면 남는 글자는?',
    },
    hints: [
      '이 두 줄을 소리 내어 읽어보게. 한자에도 우리말 소리가 있다네.',
      "門은 '문', 立은 '립', 獨은 '독'이라 읽는다네. 두 줄에서 겹치는 소리를 하나씩 지워보게.",
      '지우고 나면 소리 하나가 남을 걸세. 그것이 답일세.',
    ],
    visual: { kind: 'note', lines: ['門立獨', '독립신문'] },
    solveExplain:
      '1896년, 이 어른은 우리나라 최초의 민간 신문을 만드셨다네. 그때까지 신문이란 한자로 쓰여 배운 이들만 읽을 수 있었지. 그런데 이 어른은 한글로만 찍어냈어.',
    fragment: '더덩실 춤이라도 추고',
    timeLabel: '오후 2시 22분',
  },
  {
    id: 3,
    qrToken: 'spot3-ghi',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot3.jpg`,
    findHint: '기와지붕을 얹은 옛집이 보이는가? 계단 위 그 집으로 가게.',
    arriveText: '독립관 앞에 도착했다. 현판의 글자를 살펴보자.',
    radioLine: '이 여섯 글자를 잘 살펴봐. 폰을 들어 다시 보라는 말, 무슨 뜻일까?',
    memo:
      '「우리는 이 집에서 몰래 모였다.\n여섯 자리 중 셋은 진짜가 아니다.\n폰을 들어 다시 보면 진짜와 순서가 함께 드러난다.\n우리가 여기서 무엇을 했는지 알게 되리라.」',
    task: '카메라로 비춰 숨은 순서를 찾고, 완성된 낱말을 입력하라.',
    mission: {
      type: 'charFind',
      chars: ['산', '론', '토', '강', '문', '회'],
      revealed: [
        { index: 1, order: 2 },
        { index: 2, order: 1 },
        { index: 5, order: 3 },
      ],
      answer: '토론회',
      prompt: '카메라로 비춰 숫자가 뜨는 글자만, 순서대로 읽으면?',
    },
    hints: [
      '여섯 글자를 다 읽어봤니? 뭔가 이상하지 않니? 쪽지에 폰을 들어 보라고 했었지.',
      '화면의 카메라 버튼을 눌러 건물 전체를 비춰 보렴. 모든 글자에 다 숫자가 뜨지는 않을 거야.',
      '숫자가 뜨지 않는 세 글자는 진짜가 아니란다. 숫자 있는 것만 1번부터 순서대로 읽어 보렴.',
    ],
    solveExplain:
      '토론회! 바로 여기서 있었던 일이란다. 서재필 선생이 이끌던 독립협회가 이 건물을 고쳐 짓고 독립관이라 새 이름을 붙였지. 그 뒤로 이곳에서는 나라를 걱정하는 사람들이 모여 밤새 토론을 했단다.',
    fragment: '한강물이',
    timeLabel: '오후 2시 35분',
  },
  {
    id: 4,
    qrToken: 'spot4-jkl',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot4.jpg`,
    findHint: '여러 사람이 함께 만세를 부르는 모습이 새겨진 큰 조각탑을 찾게.',
    arriveText: '기념탑 앞에 도착했다. 발자국과 새겨진 이름들을 살펴보자.',
    radioLine: '탑 아래 발자국과, 탑 뒤 이름들을 잘 세어봐야 할 거야.',
    memo:
      '「순사가 가까이 왔다. 나는 이 길로 몸을 숨겼다.\n이 길에는 발자국이 줄지어 있고, 저 탑 뒤에는 이름이 줄지어 있다.\n발을 남긴 이보다 이름을 남긴 이가 더 많으니, 그 모자란 수를 먼저 찾아라.\n그 수가 가리키는 곳에 다음 실마리가 있다.」',
    task: '모자란 수를 먼저 찾고, 이어서 이름을 찾아라.',
    mission: {
      type: 'twoStage',
      stageA: {
        kind: 'numberLock',
        digits: 1,
        answer: '3',
        prompt: '발자국 30개, 민족대표 33명. 그 모자란 수는?',
      },
      stageB: {
        kind: 'choice',
        options: ['박준승(朴準承)', '이필주(李弼柱)', '정춘수(鄭春洙)', '양순백(梁旬伯)'],
        answer: '이필주(李弼柱)',
        prompt: '탑 뒤 33인의 이름. 오른쪽에서 3번째 줄, 위에서 3번째는?',
      },
      hintsA: [
        '잔디밭 발자국을 세어 보렴.',
        '3·1 독립선언문과 독립만세운동을 주도한 민족대표는 모두 몇 명이었는지 탑 뒤에서 확인해 보렴.',
        '두 수의 차이를 계산해 보렴.',
      ],
      hintsB: [
        '오른쪽 끝 줄부터 세어 보게. 하나, 둘, 셋…',
        '줄을 세었으면, 이번엔 그 줄에서 위에서부터 다시 세어 보게.',
        '오른쪽에서 세 번째 줄, 그리고 위에서 세 번째. 그 자리의 이름을 보기에서 찾아보게.',
      ],
    },
    solveExplain:
      '이 발자국들은 2019년, 그때 살아 계시던 독립운동가 분들이 직접 맨발을 찍으신 거란다. 그리고 이 탑 뒤에 새겨진 서른세 분은 1919년 3월 1일 독립선언서에 이름을 올린 민족대표란다.',
    fragment: '이 목숨이 끊기기 전에',
    timeLabel: '오후 2시 48분',
  },
  {
    id: 5,
    qrToken: 'spot5-mno',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot5.jpg`,
    findHint: '태극기를 높이 든 소녀의 동상이 보이는가? 그 앞으로 가게.',
    arriveText: '동상 앞에 도착했다. 새겨진 문장을 읽어보자.',
    radioLine: '동상 앞 비석의 문장을 처음부터 끝까지 읽어봐.',
    memo: '「이 앞에 새겨진 말을 읽어라.\n두 글자가 지워진 채 남아 있으니,\n온전한 문장으로 되돌려 놓아라.」',
    task: '지워진 두 글자를 채워 문장을 완성하라.',
    mission: {
      type: 'fillBlank',
      quote:
        '내 손톱이 빠져 나가고 내 귀와 코가 잘리고 내 손과 다리가 부러져도 그 고통은 참을 수 있사오나, 내 ( A )를 잃어버린 그 고통만은 견딜 수가 없습니다! ( A )를 위해 바칠 ( B )이 하나밖에 없는 것만이 나의 유일한 슬픔입니다.',
      labelA: '(A)',
      labelB: '(B)',
      answerA: '나라',
      answerB: '목숨',
      prompt: '지워진 두 글자를 채워라.',
    },
    hints: [
      '비석 앞으로 가서 글을 처음부터 끝까지 읽어보렴.',
      '앱에 뜬 문장과 비석의 문장을 한 줄씩 나란히 놓고 비교해 보렴.',
      '"내 ( )를 잃어버린"이라는 자리와, "( )을 위해 바칠"이라는 자리를 비석에서 찾아보렴.',
    ],
    solveExplain:
      '이 글은 유관순 열사께서 마지막으로 남기신 말씀이란다. 손톱이 빠지고 귀와 코가 잘리고 손발이 부러지는 그 모진 고통도 참을 수 있다 하셨지. 그런데 오직 하나, 나라를 잃은 고통만은 견딜 수 없다고 하셨어.',
    fragment: '기뻐서 죽사오매',
    timeLabel: '오후 3시 02분',
  },
  {
    id: 6,
    qrToken: 'spot6-pqr',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot6.jpg`,
    findHint: '하늘로 길게 솟은 뾰족한 탑이 보이는가? 가장 높은 그 탑으로 가게.',
    arriveText: '추념탑 앞에 도착했다. 벽에 새겨진 모습들을 살펴보자.',
    radioLine: '벽에 새겨진 두 목소리의 차이를 잘 살펴봐.',
    memo:
      '「이 벽 위에는 두 개의 목소리가 새겨져 있다.\n하나는 맨손으로 하늘을 향해 외쳤고,\n하나는 쇠붙이를 손에 쥐고 겨누었다.\n더 많은 목소리가 이긴 것처럼 보이지만,\n진짜 답은 그 둘의 차이 속에 있다.」',
    task: '두 무리의 수를 세어 차이를 계산하라.',
    mission: {
      type: 'numberLock',
      digits: 1,
      answer: '3',
      prompt: '맨손으로 외친 이와 쇠붙이를 든 이, 그 수의 차이는?',
    },
    hints: [
      '"맨손으로 하늘을 향해 외쳤다"… 벽 어딘가에 팔을 치켜든 사람들이 있지 않을까? 그런데 그 사람들, 다들 손에 같은 걸 들고 있는지 잘 보게.',
      '"쇠붙이를 손에 쥐고 겨누었다"는 총을 든 이들을 말하는 것 같군. 그리고 만세 부르는 이들 중에는 깃발 없이 맨손으로 함께 외치는 이도 있지 않던가? 빠뜨리지 말고 세어 보게.',
      '쪽지 끝에 뭐라 적혀 있었지? "더 많은 쪽이 이긴 것처럼 보이지만, 답은 차이 속에 있다"… 이 말, 더하라는 뜻이 아닐지도 모르겠네.',
    ],
    visual: {
      kind: 'equations',
      items: [
        { colorHex: '#241f18', shape: 'circle', text: '맨손으로 외친 사람' },
        { colorHex: '#a12b24', shape: 'square', text: '쇠붙이를 든 사람' },
      ],
    },
    solveExplain:
      '태극기를 든 사람이든, 맨손으로 함께 외친 사람이든, 총을 든 사람이든 모두 저마다의 방식으로 나라를 지키려 했다네.',
    fragment: '용솟음칠',
    timeLabel: '오후 3시 15분',
  },
  {
    id: 7,
    qrToken: 'spot7-stu',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot7.jpg`,
    findHint: '땅이 파헤쳐지고 벽돌이 쌓인 발굴 현장이 보이는가? 그곳으로 가게.',
    arriveText: '발굴지에 도착했다. 안내판을 하나씩 살펴보자.',
    radioLine: '안내판에 그려진 도면과 똑같은 그림을 찾아봐.',
    memo:
      '「나는 여기서 갇혔었다.\n이 땅 밑에는 그때의 길이 아직 남아 있다.\n여러 그림 중 내가 걸었던 그 길을 찾아라.\n그림을 찾으면, 내가 걸었던 발걸음을 따라오라.\n시간이 없다.」',
    task: '일치하는 안내판을 찾고, 화살표를 따라가라.',
    mission: {
      type: 'twoStage',
      stageA: {
        kind: 'confirm',
        prompt: '현장의 여러 안내판 중, 아래 도면과 일치하는 것을 찾았다면',
        buttonLabel: '찾았다',
      },
      stageB: {
        kind: 'choice',
        options: ['①', '②', '③', '④'],
        answer: '②',
        prompt: '시작점 [●] → ← ↓ ↓ ← ↑ ↑ ↑ ← ↑\n화살표를 따라가면 도착하는 출구 번호는?',
      },
      hintsB: [
        '이 발굴지에 안내판이 여러 개 있구먼. 화면 속 그림과 하나씩 견주어 보게.',
        '맞는 안내판을 찾았다면, 도면 오른쪽 빨간 점이 시작점일세.',
        '화살표를 하나씩, 순서대로 따라가 보게. 왼쪽·아래·위 한 칸씩 말일세.',
      ],
    },
    solveExplain:
      '②로 나가면 되겠구먼! 이곳은 경성구치감이라 불리던 곳이라네. 서대문형무소보다 앞서 지어져, 수많은 이들이 이곳을 거쳐 갔지.',
    fragment: '두개골은 깨어져 산산조각이 나도',
    timeLabel: '오후 3시 28분',
  },
  {
    id: 8,
    qrToken: 'spot8-vwx',
    photo: `${import.meta.env.BASE_URL}assets/spots/spot8.jpg`,
    findHint: '드디어 여기까지 왔군. 붉은 벽돌의 이 문이 마지막이라네.',
    arriveText: '형무소 입구에 도착했다. 벽돌 문양을 살펴보자.',
    radioLine: '저 붉은 벽돌 문의 생김새를 잘 기억해둬.',
    memo:
      '「이 문의 생김새를 눈으로 그려보라.\n뾰족한 지붕이 있고, 아치문이 있고,\n네모난 돌들이 있고, 높은 탑이 있다.\n다만 그림이 전부는 아니다.\n그려진 대로 믿지 말고, 실제로 본 것을 떠올려라.」',
    task: '그림 속 색깔 규칙과 실제 건물을 비교해 마지막 숫자를 찾아라.',
    mission: {
      type: 'numberLock',
      digits: 1,
      answer: '9',
      prompt: '그림 속 색깔 도형 규칙을 실제 건물과 비교하면, 마지막 숫자는?',
    },
    hints: [
      '색깔마다 도형이 하나씩 숨어 있다네. 초록은 저 둥근 아치문, 파랑은 저 네모난 돌 장식일세.',
      '"+2=6"과 "+12=4"를 보게. 둘 다 도형의 꼭짓점 수에 그림 속 개수를 더한 것일세. 보라색은 저 높은 탑을 가리킨다네.',
      '그림 속 탑은 사각형처럼 보이지 않던가? 실제로 탑 아래에 서서 올려다보게. 그림과 다른 모양이 보일 걸세.',
    ],
    visual: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/spots/spot8-diagram.jpg` },
    solveExplain: '찾았구나… 이제 정말 마지막일세. 지금까지 모은 여덟 조각을 모두 이어보게.',
    fragment: '그날이 오면', // 스팟8만 시 제목 노출 허용
    timeLabel: '오후 3시 42분',
  },
];

export default spots;
