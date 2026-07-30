# 액티브 인 서대문 · 웹앱 개발 문서

> 서대문독립공원 야외 추리형 방탈출 웹앱 — **8월 심훈 편**
> 대상: 가족 단위(초등 전 학년) · 런칭: 2026년 8월 15일(광복절)

이 문서는 Claude Code로 웹앱을 개발하기 위한 명세서입니다. 게임 로직, 데이터 모델, 화면 명세, 구현 순서를 포함합니다.

---

## 1. 프로젝트 개요

### 1.1 무엇을 만드는가

참가자가 스마트폰으로 서대문독립공원 8개 거점을 순서대로 이동하며, 각 거점의 QR을 스캔해 미션(쪽지 암호)을 풀고 "찢어진 시 조각"을 모아, 마지막에 사라진 독립운동가의 정체(심훈)를 밝히는 **위치 기반 야외 방탈출 웹앱**.

### 1.2 핵심 요구사항

| 항목 | 내용 |
|------|------|
| 플랫폼 | 모바일 웹앱 (반응형, 세로 전용). 앱 설치 불필요(Web) |
| 진입 | 각 거점 QR 스캔 → 해당 스팟 화면으로 딥링크 |
| 조력자 | 게임 시작 시 4인(유관순·안중근·윤봉길·김구) 중 1인 선택. 난이도는 동일, **대사(말투)만 차등** |
| 타이머 | 전체 60분 카운트다운. 시간 경과에 따라 "순사 게이지" 상승 |
| 진행 저장 | 새로고침·앱 종료 후 재접속해도 진행 상태 유지 |
| 언어 | 한국어 (다국어 확장 대비 구조만 마련) |
| 정체 은폐 | "그날이 오면"·"심훈"은 마지막 스팟 전까지 노출 금지 |

### 1.3 전체 화면 흐름

```
표지(비상 호외)
  → 조력자 선택
  → [스팟 1~8] 각각:
       장소 안내(사진·명칭 비공개)
       → 도착 확인(버튼)
       → 쪽지 해독
       → 미션(스팟마다 다른 유형)
       → 시 조각 획득
  → 여덟 조각 배열(재정렬 퍼즐)
  → 정체 공개(심훈)
  → 완주 보상(기념 굿즈)
```

---

## 2. 기술 스택

### 2.1 권장 스택

- **프레임워크**: React 18 + Vite (SPA, 빠른 빌드)
- **라우팅**: React Router v6 (`/`, `/select`, `/spot/:id`, `/mission/:id`, `/final`, `/reveal`)
- **상태관리**: Zustand (가볍고 localStorage 연동 쉬움) — 또는 Context API
- **스타일**: CSS Modules 또는 Tailwind CSS (기존 목업은 순수 CSS 사용)
- **진행 저장**: localStorage (진행 상태 JSON 직렬화)
- **QR**: URL 쿼리 파라미터 방식 (`/spot/1?token=xxx`). 별도 스캐너 앱 불필요 — 참가자가 폰 기본 카메라로 QR 스캔 시 웹앱 URL로 진입
- **배포**: Vercel / Netlify / GitHub Pages (정적 호스팅)

### 2.2 폴백/대안

- 상태관리를 굳이 추가하기 싫으면 React Context + useReducer로 충분
- 애니메이션이 필요하면 Framer Motion (선택)
- PWA로 만들어 "홈 화면 추가"를 지원하면 야외 사용성 향상 (선택, manifest + service worker)

### 2.3 오프라인 고려

야외(공원)에서 통신이 불안정할 수 있음. 이미지·데이터를 **최초 로드 시 프리페치**하고, 진행 상태는 localStorage에 저장해 네트워크 없이도 진행되게 설계할 것. PWA + Service Worker 캐싱을 적용하면 안정적.

---

## 3. 디자인 시스템

기존 목업(`active_in_seodaemun_app_full.html`)의 톤을 그대로 계승한다. **독립신문(1896) 지면** 느낌.

### 3.1 색상 토큰

```css
:root{
  --paper:    #e9ddc3;  /* 낡은 신문지 배경 */
  --paper2:   #ded0b0;  /* 보조 배경 */
  --ink:      #241f18;  /* 잉크 검정 (제목/버튼) */
  --red:      #a12b24;  /* 강조 붉은색 */
  --red-deep: #7d1f1a;  /* 진한 강조 */
  --sepia:    #5c4a2e;  /* 보조 텍스트 */
  --line:     #3a2f20;  /* 테두리/괘선 */
  --cream:    #f3ead3;  /* 카드/조각/버튼 텍스트 */
}
```

### 3.2 서체

- 제호·본문: **Nanum Myeongjo** (옛 활자 느낌)
- 손글씨 쪽지: **Gaegu** (사라진 이의 필체)
- 세로 날짜 기둥: 한자 명조
- Google Fonts import:
  `https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Gaegu:wght@400;700&display=swap`

### 3.3 시그니처 컴포넌트

- **신문 제호 헤더**(`.masthead`): 이중 괘선(border 3px double) + 태극기 SVG + 좌우 세로 한자 날짜
- **손글씨 쪽지**(`.memo`): 살짝 기울고(rotate -0.6deg) 그림자, 붉은 좌측 보더, 줄노트 배경
- **찢어진 시 조각**(`.fragment`): 점선 테두리, 살짝 기울어짐
- **순사 게이지**(`.cop`): 하단 진행바, 붉은 사선 패턴이 차오름
- **도착 확인 스탬프**(`.arrive-stamp`): 이중 테두리 도장 느낌, rotate -4deg

기존 목업 HTML의 CSS를 컴포넌트 스타일의 출발점으로 그대로 재사용할 것.

---

## 4. 데이터 모델

게임 데이터는 코드에서 분리해 **JSON/JS 데이터 파일**로 관리한다. 매달 인물이 바뀌므로(심훈 → 강우규 → …), 데이터만 교체하면 되는 구조가 핵심.

### 4.1 시즌(월별 인물) 데이터 구조

```typescript
// src/data/season.ts
interface Season {
  id: string;               // "2026-08-shimhun"
  hero: {
    name: string;           // "심훈" (정체 공개 전까지 UI 노출 금지)
    realName: string;       // "심대섭"
    lifespan: string;       // "1901~1936"
    poemTitle: string;      // "그날이 오면" (마지막까지 숨김)
    revealText: string;     // 정체 공개 화면 문구
  };
  poemLines: string[];      // 시 8행 (배열 순서 = 정답 순서)
  spots: Spot[];            // 8개 스팟
  goods: Goods[];           // 완주 보상 굿즈 5종
}
```

### 4.2 스팟 데이터 구조

```typescript
interface Spot {
  id: number;               // 1~8
  qrToken: string;          // QR 검증용 토큰 (스팟별 고유)
  photo: string;            // 장소 안내 사진 경로
  // 장소 안내 (명칭 비공개 — 사진 속 특징으로만 유도)
  findHint: string;         // "저 멀리 커다란 아치형 돌문이..."
  arriveText: string;       // 도착 확인 화면 안내문
  // 쪽지·미션
  radioLine: string;        // 조력자 무전 (기본/공통 톤)
  memo: string;             // 사라진 이가 남긴 쪽지(암호문)
  task: string;             // 한 줄 지시
  mission: Mission;         // 미션 정의 (아래 4.3)
  // 보상
  fragment: string;         // 획득 시 조각 (시의 한 구절)
  nextHint: string;         // 다음 거점 안내
  timeLabel: string;        // 화면 표시용 예시 시간 (실제 타이머는 별도)
}
```

### 4.3 미션 타입 (스팟마다 다른 유형)

미션은 **discriminated union**으로 설계해 유형별 컴포넌트를 분기 렌더링한다.

```typescript
type Mission =
  | { type: "numberLock"; digits: number; answer: string; prompt: string }      // 스팟1: 숫자 자물쇠(116)
  | { type: "wordAssemble"; tiles: string[]; answer: string[]; prompt: string } // 스팟2: 글자 조합(독립신문)
  | { type: "patternColor"; sequence: string[]; answer: string; prompt: string }// 스팟3: 단청 색 규칙
  | { type: "numberLock"; digits: number; answer: string; prompt: string }      // 스팟4: 숫자 조합(331919)
  | { type: "flagAssemble"; answer: "correct"; prompt: string }                 // 스팟5: 태극기 맞추기
  | { type: "direction"; target: string; prompt: string }                       // 스팟6: 방향 찾기
  | { type: "blockShape"; answer: "arch"; prompt: string }                       // 스팟7: 도형 조합
  | { type: "findMark"; markPosition: {x:number;y:number}; prompt: string };     // 스팟8: 숨은그림찾기
```

### 4.4 조력자 데이터 (대사만 차등)

```typescript
interface Helper {
  id: "yugwansun" | "ahnjunggeun" | "yunbonggil" | "kimgu";
  name: string;             // "유관순"
  avatar: string;           // 캐릭터 이미지 경로
  trait: string;            // "용기·직관"
  tone: string;             // 말투 설명 (개발 참고)
}

// 스팟별·조력자별 대사 오버라이드 (선택)
// 기본은 spot.radioLine을 쓰되, 조력자별 말투 버전이 있으면 그것을 우선 사용
interface HelperLines {
  [helperId: string]: {
    [spotId: number]: { radio: string; next: string };
  };
}
```

> **난이도 동일 원칙**: 조력자에 따라 정답·제한시간·힌트 정보량이 달라지면 안 됨. 오직 `radioLine`/`nextHint`의 **문체만** 교체.

### 4.5 실제 데이터 (심훈 편) — 8스팟 요약

| id | 장소(내부용) | 미션 타입 | 정답 | 획득 구절 |
|----|-------------|----------|------|----------|
| 1 | 독립문 | numberLock | `116` (19+97) | 삼각산이 |
| 2 | 서재필 동상 | wordAssemble | 독·립·신·문 | 더덩실 춤이라도 추고 |
| 3 | 독립관 | patternColor | 초록 | 한강물이 |
| 4 | 3·1독립선언기념탑 | numberLock | `331919` | 이 목숨이 끊기기 전에 |
| 5 | 유관순 동상 | flagAssemble | 태극기 완성 | 오면은 |
| 6 | 순국선열추념탑 | direction | 형무소 방향 | 용솟음칠 |
| 7 | 경성감옥 발굴지 | blockShape | 아치 | 두개골은 깨어져 산산조각이 나도 |
| 8 | 서대문형무소역사관 입구 | findMark | 표식 위치 | **그날이 오면** |

**시(그날이 오면 제1연) 정답 배열 순서** (스팟 획득 순서와 다름 — 마지막 재배열 퍼즐):
```
1. 그날이 오면 그날이 오면은
2. 삼각산이 일어나 더덩실 춤이라도 추고
3. 한강물이 뒤집혀 용솟음칠 그날이
4. 이 목숨이 끊기기 전에 와주기만 하량이면
5. 나는 밤하늘에 날으는 까마귀와 같이
6. 종로의 인경을 머리로 들이받아 울리오리다
7. 두개골은 깨어져 산산조각이 나도
8. 기뻐서 죽사오매 오히려 무슨 한이 남으오리까
```

> ⚠️ **현장 답사 확정 필요**: 스팟1 독립문 건립연도 표기, 스팟2 서재필 기단 명문, 스팟3 단청 실제 색 순서, 스팟4 민족대표 수 표기, 스팟5 유관순 어록/태극기 형태, 스팟6 추념탑 방향, 스팟7 발굴지 안내판, 스팟8 표식 위치. 답사 전까지는 위 정답을 **임시값**으로 두고, 데이터 파일 한 곳에서만 수정 가능하게 할 것.

---

## 5. 게임 상태 관리

### 5.1 전역 상태

```typescript
interface GameState {
  helperId: string | null;        // 선택한 조력자
  startedAt: number | null;       // 타이머 시작 timestamp
  currentSpot: number;            // 진행 중인 스팟 (1~8)
  collectedFragments: string[];   // 획득한 시 조각 (획득 순)
  spotStatus: Record<number, "locked" | "arrived" | "solved">;
  copGauge: number;               // 0~100 순사 게이지
  finished: boolean;
}
```

### 5.2 localStorage 저장/복원

- 키: `active-seodaemun-progress`
- 상태 변경 시마다 직렬화 저장, 앱 로드 시 복원
- "처음부터 다시하기" 버튼으로 초기화 기능 제공

### 5.3 타이머 & 순사 게이지 로직

- 전체 60분. `elapsed = now - startedAt`
- 남은 시간 = `3600 - elapsed(초)`
- 순사 게이지 = `min(100, elapsed / 3600 * 100)`
- 게이지가 특정 임계(예: 90%) 도달 시 "순사 접근!" 경고 배너
- **시간 초과해도 게임오버 아님** — 완주는 가능하되 엔딩 등급만 하락(`'그날' 엔딩` vs `'무명으로 남음' 엔딩`)

---

## 6. 화면별 명세

각 화면은 라우트 + 컴포넌트로 구현. 기존 목업 HTML의 해당 화면을 시각 레퍼런스로 사용.

### 6.1 표지 `/`
- 신문 제호 헤더, 비상 호외 헤드라인, 임무 설명
- [임무 시작하기] → `/select`

### 6.2 조력자 선택 `/select`
- 4인 캐릭터 카드(2×2). 원본 일러스트 사용(변형 금지)
- 선택 시 `helperId` 저장, `startedAt` 기록 → 첫 스팟 안내로

### 6.3 스팟 장소 안내 `/spot/:id`
- **명칭 비공개**: 사진 + "N번째 시 조각이 있는 곳" + 조력자 힌트(사진 속 특징)
- [이 장소로 출발] → 도착 확인 상태로 전환

### 6.4 도착 확인 (같은 라우트, 상태 전환 또는 `/spot/:id/arrive`)
- 타이머·순사 게이지 표시, 사진, [도착 확인] 스탬프
- [도착했어요!] → 쪽지 해독으로
- **실제 운영**: QR 스캔으로 이 화면에 진입하면 위치 검증 가능(토큰). GPS 검증은 선택.

### 6.5 쪽지 해독 (`/spot/:id/memo`)
- 조력자 무전 말풍선 + 손글씨 쪽지(암호문) + 지시문
- [암호 풀기] → 미션으로

### 6.6 미션 `/mission/:id`
- `mission.type`에 따라 컴포넌트 분기:
  - `NumberLockMission` (자물쇠 + 키패드)
  - `WordAssembleMission` (글자 타일 드래그/탭)
  - `PatternColorMission` (색 선택)
  - `FlagAssembleMission` (태극기 조각 배치)
  - `DirectionMission` (나침반 방향)
  - `BlockShapeMission` (블록 조합)
  - `FindMarkMission` (사진 위 표식 탭)
- 정답 시 → 시 조각 획득 화면. 오답 시 재시도(응원 메시지)
- 하단 진행바(모은 조각 N/8) 표시

### 6.7 시 조각 획득 (`/mission/:id/reward`)
- 찢어진 조각 연출 + 획득 구절 + 조력자 다음 안내
- `collectedFragments`에 추가, `spotStatus[id]='solved'`, `currentSpot++`
- [다음 거점으로] → 다음 스팟 안내 (스팟8이면 → `/final`)

### 6.8 시 조각 배열 `/final`
- 획득한 8조각을 **시 순서대로 재배열**하는 드래그 퍼즐
- 정답 배열 시 → `/reveal`

### 6.9 정체 공개 `/reveal`
- "그 시를 쓴 사람은…" → **심훈** 대반전 문구 → 광복절 메시지
- [임무 완수 · 기념 굿즈 받기] → 보상

### 6.10 완주 보상 (`/reveal/reward`)
- 심훈 정체 카드 + 굿즈 5종 안내(시집 미니북·우드 책갈피·스티커 팩·정체 카드·자수 손수건)

---

## 7. 컴포넌트 구조 (제안)

```
src/
├── main.tsx
├── App.tsx                      # 라우터
├── store/
│   └── gameStore.ts             # Zustand + localStorage
├── data/
│   ├── season.ts                # 심훈 편 시즌 데이터 (교체 단위)
│   ├── spots.ts                 # 8스팟 상세
│   └── helpers.ts               # 조력자 4인 + 대사
├── components/
│   ├── layout/
│   │   ├── PhoneFrame.tsx        # 공통 신문지 배경 프레임
│   │   ├── Masthead.tsx          # 신문 제호 헤더
│   │   ├── Timer.tsx             # 타이머
│   │   ├── CopGauge.tsx          # 순사 게이지
│   │   ├── Memo.tsx              # 손글씨 쪽지
│   │   ├── RadioBubble.tsx       # 조력자 무전 말풍선
│   │   ├── Fragment.tsx          # 찢어진 시 조각
│   │   └── ProgressBar.tsx       # 조각 N/8
│   └── missions/
│       ├── NumberLockMission.tsx
│       ├── WordAssembleMission.tsx
│       ├── PatternColorMission.tsx
│       ├── FlagAssembleMission.tsx
│       ├── DirectionMission.tsx
│       ├── BlockShapeMission.tsx
│       └── FindMarkMission.tsx
├── pages/
│   ├── CoverPage.tsx
│   ├── SelectHelperPage.tsx
│   ├── SpotGuidePage.tsx
│   ├── ArrivePage.tsx
│   ├── MemoPage.tsx
│   ├── MissionPage.tsx
│   ├── RewardPage.tsx
│   ├── FinalPuzzlePage.tsx
│   └── RevealPage.tsx
├── styles/
│   └── tokens.css               # 색상/서체 토큰
└── assets/
    ├── characters/              # 조력자 4인 (원본, 변형 금지)
    └── spots/                   # 8스팟 현장 사진
```

---

## 8. QR / 딥링크 설계

- 각 거점에 물리 QR 부착. QR은 `https://앱주소/spot/{id}?t={token}` 형태
- 참가자가 폰 기본 카메라로 스캔 → 웹앱의 해당 스팟 화면으로 진입
- **순서 강제(선택)**: `currentSpot`과 스캔한 `id`가 다르면 "아직 이 거점을 열 수 없어요. N번 거점을 먼저 찾으세요" 안내
- **부정 방지(선택)**: `token`을 서버에서 검증하거나, 간단히는 클라이언트 상수로 대조

---

## 9. 구현 순서 (Claude Code 작업 단위)

권장 순서. 각 단계는 독립적으로 커밋 가능.

1. **프로젝트 셋업**: Vite + React + Router + Zustand, 폰트/토큰 CSS 적용
2. **레이아웃 컴포넌트**: PhoneFrame, Masthead, Timer, CopGauge, Memo, RadioBubble, Fragment, ProgressBar
3. **데이터 파일**: season.ts / spots.ts / helpers.ts (위 4장 값 입력, 임시 정답 포함)
4. **상태관리**: gameStore (localStorage 저장/복원, 타이머, 게이지)
5. **정적 흐름**: 표지 → 조력자 선택 → 스팟 안내 → 도착 → 쪽지 (미션 전까지 라우팅 연결)
6. **미션 컴포넌트 7종**: 타입별로 하나씩. 정답/오답 처리 + 조각 획득 연동
7. **최종 퍼즐**: 8조각 재배열 드래그
8. **정체 공개 + 보상**: 심훈 반전 연출
9. **QR 딥링크 + 순서 검증**
10. **오프라인/PWA + 프리페치** (선택)
11. **QA**: 전체 플로우 통과, 새로고침 복원, 타이머 경계값, 오답 재시도

---

## 10. 접근성 · UX 주의사항

- **가족·초등 대상**: 큰 버튼, 명확한 대비, 짧은 문장. 오답 시 질책 없이 응원("조금 더 힘내요!")
- **야외 가독성**: 밝은 햇빛 대비 충분한 명도차. 순사 게이지·타이머는 상단 고정
- **무섭지 않게**: 순사는 우스꽝스러운 캐릭터. 죽음·고문 직접 묘사 금지
- **정체 은폐**: "심훈"·"그날이 오면" 문자열이 스팟 1~7 화면·소스에서 조기 노출되지 않도록 주의(특히 이미지 alt, 조각 텍스트). 조각은 구절만 노출하고 시 제목은 최종에만.
- **세로 전용**: 가로 회전 시 세로 권장 안내

---

## 11. 매달 콘텐츠 교체 가이드

다음 달(예: 강우규 편)로 바꿀 때 수정할 것은 **데이터 3종뿐**:

1. `season.ts`의 `hero`(이름·시 제목·정체 공개 문구), `poemLines`(대표 시/어록 8행)
2. `spots.ts`의 각 스팟 `memo`/`task`/`mission.answer`/`fragment`/`nextHint`/`findHint`
3. `helpers.ts`의 스팟별 대사 (인물 연결 부분)

**바뀌지 않는 것**: 세계관, 화면 흐름, 조력자 4인, 순사 시스템, 미션 컴포넌트, 디자인 시스템. → 이 분리가 지켜지도록 데이터/로직을 철저히 분리할 것.

---

## 12. 참고 자산

- 화면 시각 레퍼런스: `active_in_seodaemun_app_full.html` (전체 45화면 목업)
- 기획 문서: `active_in_seodaemun_shimhun.docx` (스토리·미션·굿즈)
- 캐릭터 원본 4종, 8스팟 현장 사진 (변형 없이 사용)
