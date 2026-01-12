# YouTube Shorts Generator 🎬

AI가 자동으로 유튜브 쇼츠 영상을 생성하는 웹 애플리케이션입니다.

주제를 입력하면 AI가 자동으로:
- 📚 주제 조사
- ✍️ 대본 생성 (4개 섹션)
- 🎨 이미지 생성 (Imagen 4.0, 9:16 비율)
- 🎙️ 음성 생성 (OpenAI TTS)
- 🎬 비디오 조립

## 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Testing**: Playwright (E2E)

## 시작하기

### 필수 조건

- Node.js 20+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 페이지
│   ├── layout.tsx         # 레이아웃
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── TopicInput.tsx     # 주제 입력
│   ├── OptionsPanel.tsx   # 생성 옵션
│   ├── ProgressModal.tsx  # 진행 상황 모달
│   ├── ResultPage.tsx     # 결과 페이지
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/                   # 유틸리티 및 설정
│   ├── types.ts          # TypeScript 타입
│   ├── store.ts          # Zustand 스토어
│   └── utils.ts          # 유틸리티 함수
└── e2e/                  # E2E 테스트
    └── example.spec.ts   # Playwright 테스트
```

## 사용 가능한 스크립트

```bash
# 개발
npm run dev           # 개발 서버 시작

# 빌드
npm run build         # 프로덕션 빌드
npm start            # 프로덕션 서버 시작

# 테스트
npm run test:e2e          # E2E 테스트 실행
npm run test:e2e:ui       # UI 모드로 테스트
npm run test:e2e:headed   # 헤디드 모드로 테스트
npm run test:e2e:debug    # 디버그 모드

# 코드 검사
npm run lint           # ESLint 실행
```

## 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# API Keys (백엔드 연결 시 필요)
NEXT_PUBLIC_API_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Vercel 배포

### 1. GitHub에 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel에 배포

1. [Vercel](https://vercel.com/new) 접속
2. GitHub 리포지토리 import
3. 프로젝트 설정 확인
4. Deploy 클릭

### 3. 환경 변수 설정

Vercel 대시보드에서 환경 변수 추가:
- `NEXT_PUBLIC_API_URL`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`

### 4. 자동 배포

main 브랜치에 푸시하면 자동으로 배포됩니다.

## 기능

- ✅ 주제 입력 및 예시 주제 선택
- ✅ 음성 목소리 선택 (6종)
- ✅ 영상 속도 조절 (0.5x - 1.5x)
- ✅ 화면 비율 선택 (9:16, 1:1, 16:9)
- ✅ 자막 추가 옵션
- ✅ 실시간 진행 상황 표시
- ✅ 비디오 미리보기
- ✅ 다운로드 기능

## TODO

- [ ] 백엔드 API 연결
- [ ] 유튜브 업로드 기능
- [ ] 대본 편집 기능
- [ ] 템플릿 라이브러리
- [ ] 생성 히스토리

## 라이선스

MIT
