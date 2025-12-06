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

### Vercel 배포 (권장) ⚡

Vercel은 Next.js를 만든 회사에서 제공하는 플랫폼으로, 가장 쉽고 빠르게 배포할 수 있습니다.

#### 빠른 배포 방법

1. **Vercel 가입 및 프로젝트 연결**
   - [vercel.com](https://vercel.com)에 접속하여 GitHub 계정으로 가입/로그인
   - "Add New Project" 클릭
   - `firstsm41/teatable_pos` 저장소 선택
   - "Import" 클릭

2. **환경 변수 설정**
   - 프로젝트 설정 화면에서 "Environment Variables" 섹션으로 이동
   - 다음 변수 추가:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://soeivyxsazxuvxhmipag.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_29pe6qFwHxU2n9IuyjCSjw_hyLPdFcm
     ```
   - Environment: Production, Preview, Development 모두 선택
   - "Save" 클릭

3. **배포 실행**
   - "Deploy" 버튼 클릭
   - 빌드가 완료되면 자동으로 URL이 생성됩니다 (예: `https://teatable-pos.vercel.app`)

4. **자동 배포 설정 (이미 완료)**
   - `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다

#### 배포 후 확인사항

- 배포 완료 후 제공되는 URL로 접속하여 앱이 정상 작동하는지 확인
- 로그인 페이지가 표시되면 성공!

### 다른 배포 옵션

- **Netlify**: [netlify.com](https://www.netlify.com) - 무료 플랜 제공
- **Railway**: [railway.app](https://railway.app) - 서버리스 및 데이터베이스 지원
- **Render**: [render.com](https://render.com) - 무료 티어 제공

### 다른 플랫폼

Next.js는 모든 주요 호스팅 플랫폼에서 실행할 수 있습니다:
- Netlify
- AWS Amplify
- Docker

## 라이선스

이 프로젝트는 개인 사용을 위한 것입니다.

## 버전

- **현재 버전**: 0.1.0
