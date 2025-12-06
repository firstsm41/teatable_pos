# 🍵 티테이블 POS 시스템

티테이블 카페를 위한 포인트 오브 세일(POS) 주문 관리 시스템입니다.

## 주요 기능

- 🔐 **매장 코드 기반 인증**: 고유 매장 코드로 로그인
- 📋 **메뉴 관리**: 메뉴 추가, 수정, 삭제 및 활성화/비활성화 관리
- 💳 **POS 주문 처리**: 실시간 주문 접수 및 처리
- 📦 **주문 확인**: 대기 중인 주문 확인 및 완료 처리
- 📊 **주문 번호 관리**: 자동 주문 번호 할당

## 기술 스택

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Database**: Supabase
- **React**: 19.2.0

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Supabase 프로젝트 및 데이터베이스 설정

### 설치

```bash
# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
tea-table-pos/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── page.tsx      # 로그인 페이지
│   │   ├── home/         # 홈 메뉴
│   │   ├── menu-manage/  # 메뉴 관리
│   │   ├── pos/          # POS 시스템
│   │   └── orders/       # 주문 확인
│   ├── components/       # 공통 컴포넌트
│   │   ├── AuthGuard.tsx # 인증 가드
│   │   └── Navbar.tsx    # 네비게이션 바
│   └── lib/              # 유틸리티 및 설정
│       ├── supabase.ts   # Supabase 클라이언트
│       └── store.ts      # Zustand 상태 관리
├── public/               # 정적 파일
└── .env.local            # 환경 변수 (git에 포함되지 않음)
```

## 데이터베이스 스키마

Supabase에 다음 테이블들이 필요합니다:

- `stores`: 매장 정보 (id, code, name)
- `menus`: 메뉴 정보 (id, store_id, name, price, is_active)
- `orders`: 주문 정보 (id, store_id, order_number, status, created_at)
- `order_items`: 주문 항목 (id, order_id, menu_id, menu_name, price, quantity, is_checked)

## 배포

### GitHub Pages 배포 (권장)

이 프로젝트는 GitHub Pages에 자동 배포되도록 설정되어 있습니다.

#### 설정 방법

1. **GitHub 저장소 설정**
   - 저장소 설정 → Pages → Source를 "GitHub Actions"로 선택

2. **환경 변수 설정**
   - 저장소 설정 → Secrets and variables → Actions
   - 다음 Secrets 추가:
     - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key

3. **자동 배포**
   - `main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다
   - 배포 상태는 Actions 탭에서 확인 가능합니다

#### 배포 URL

- 저장소 이름이 `teatable_pos`인 경우:
  - URL: `https://firstsm41.github.io/teatable_pos`
  - `next.config.ts`의 `basePath`와 `assetPrefix` 주석을 해제해야 할 수 있습니다

### Vercel 배포

1. [Vercel](https://vercel.com)에 프로젝트를 연결
2. 환경 변수를 Vercel 대시보드에 추가
3. 자동 배포 완료

### 다른 플랫폼

Next.js는 모든 주요 호스팅 플랫폼에서 실행할 수 있습니다:
- Netlify
- AWS Amplify
- Docker

## 라이선스

이 프로젝트는 개인 사용을 위한 것입니다.

## 버전

- **현재 버전**: 0.1.0
