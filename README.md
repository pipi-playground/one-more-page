# 📚 One More Page

> 나만의 독서 기록 & AI 독서 친구

한 페이지씩 읽어가는 독서 습관을 돕는 모바일 퍼스트 웹앱입니다. 책을 검색해서 책장에 담고, AI 요약과 독서 루틴을 생성하며, 하이라이트를 기록하고, AI와 책에 대해 토론할 수 있습니다.

---

🔗 **[한장더 바로가기](https://one-more-page-one.vercel.app/)**

---

## ✨ 주요 기능

### 📖 책장 관리
- 알라딘 API로 책 검색 및 책장에 추가
- 독서 상태 관리 — 읽고 싶어요 / 읽는 중 / 완독
- 현재 페이지 및 진행률 트래킹
- 별점 평가

### 🤖 AI 기능 (Claude Haiku)
- **AI 책 요약** — 책의 핵심을 3~5문장으로 요약
- **독서 루틴 생성** — 주차별 목표, 하루 권장 독서 시간, 팁 자동 생성
- **AI 토론** — 책을 읽은 AI 친구와 스트리밍 대화

### 🖊️ 하이라이트
- 인상 깊은 구절 및 페이지 번호 저장
- 나의 감상 메모 추가
- 공개 / 비공개 설정 토글
- 하이라이트 수정 / 삭제

### 🌐 커뮤니티 하이라이트
- 다른 독자들이 공개한 하이라이트를 홈 화면 하단에 카드로 표시
- 5개 초과 시 더보기 버튼 → 전체 목록 페이지(`/highlights`)
- 긴 내용은 더보기 / 접기 토글, 줄바꿈 보존

### 📅 출석 & 스트릭
- 매일 독서 체크인
- 연속 출석 스트릭 및 최고 기록 표시
- 월별 출석 캘린더

### 🎯 독서 목표
- 연간 독서 목표 일수 설정
- 현재 스트릭 및 목표 달성률 확인

### 🎨 테마
- 라이트 / 다크 / 세피아 / 포레스트 4가지 테마
- 테마에 따라 토스트 알림 색상도 자동 변경

### 🔐 인증
- 이메일 / 비밀번호 회원가입 및 로그인 (Supabase Auth)
- 이메일 인증 없이 즉시 사용 가능

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS) |
| AI | Anthropic Claude Haiku |
| 책 검색 | 알라딘 Open API |
| PWA | next/manifest (standalone) |
| 배포 | Vercel |

---

## 🗂️ 프로젝트 구조

```
bookmind/
├── app/
│   ├── (auth)/              # 로그인 / 회원가입
│   ├── (main)/
│   │   └── (routes)/
│   │       ├── page.tsx         # 홈 대시보드
│   │       ├── books/           # 책장, 책 상세, 검색, AI 토론
│   │       ├── highlights/      # 공개 하이라이트 전체 목록
│   │       ├── attendance/      # 출석 캘린더
│   │       ├── goals/           # 독서 목표
│   │       └── profile/         # 프로필
│   └── api/
│       ├── ai/chat/             # AI 토론 스트리밍 API
│       ├── ai/summary/          # AI 요약 & 루틴 생성 API
│       ├── books/               # 책 검색 / 랭킹 API
│       └── highlights/public/   # 공개 하이라이트 API
├── components/
│   ├── books/               # 하이라이트 폼, 책 카드
│   ├── highlights/          # 공개 하이라이트 카드
│   ├── attendance/          # 캘린더, 스트릭 디스플레이
│   ├── chat/                # AI 채팅 인터페이스
│   ├── layout/              # 사이드바, 하단 네비게이션
│   └── ui/                  # shadcn 공통 컴포넌트
├── lib/
│   ├── supabase.ts          # DB 클라이언트 & 타입 정의
│   ├── claude.ts            # Anthropic 클라이언트
│   ├── aladin.ts            # 알라딘 API 유틸
│   └── utils.ts             # 공통 유틸 (cn, formatDate)
└── hooks/
    ├── use-user.ts          # 현재 로그인 유저
    ├── use-streak.ts        # 스트릭 & 체크인
    └── use-theme.ts         # 테마 관리
```

---

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 아래 값을 채워주세요

# 개발 서버 실행
npm run dev
```

### 필요한 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
ALADIN_TTB_KEY=
```

---

## 🗄️ 데이터베이스 스키마

| 테이블 | 설명 |
|--------|------|
| `books` | 알라딘에서 가져온 책 정보 |
| `user_books` | 유저별 책장 (상태, 진행률, AI 요약, 루틴) |
| `highlights` | 하이라이트 및 감상 메모 (`is_public` 공개 여부 포함) |
| `ai_conversations` | AI 토론 대화 내역 |
| `attendance` | 일별 독서 체크인 기록 |
| `reading_goals` | 유저별 독서 목표 및 스트릭 |

### 🔒 보안 (RLS)

모든 개인 데이터 테이블에 Row Level Security가 적용되어 있습니다.

- 기본 정책: `auth.uid() = user_id` — 본인 데이터만 접근 가능
- `highlights` 예외: `is_public = true`인 행은 누구나 읽기 가능
- 레포를 클론해 별도 Supabase를 연결하면 각 인스턴스의 데이터는 완전히 분리됨

---

## 🗺️ 로드맵

- [x] 공개 하이라이트 피드 (커뮤니티)
- [x] 하이라이트 공개 / 비공개 설정
- [x] 4가지 테마 (라이트 / 다크 / 세피아 / 포레스트)
- [x] PWA (홈 화면 추가, standalone 모드)
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] 독서 통계 페이지 (월별 완독 수, 장르 분포)
- [ ] 책 추천 기능 (읽은 책 기반 AI 추천)
- [ ] 친구 기능 — 독서 현황 공유
- [ ] 푸시 알림 (PWA) — 매일 독서 리마인더
- [ ] E2E 테스트 작성

---

## 📝 개발 메모

- 모바일 퍼스트 PWA로 설계 (`display: standalone`)
- 하단 네비게이션은 모바일 전용 (`md:hidden`), 데스크탑은 사이드바
- AI 토론은 `ReadableStream` 기반 서버 스트리밍 응답
- 공개 하이라이트 API는 `force-dynamic` + `no-store`로 항상 최신 데이터 반환
- 알라딘 랭킹 API는 Vercel CDN에서 1시간 캐시 (`s-maxage=3600`)
