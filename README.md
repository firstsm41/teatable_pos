# 🍵 티테이블 POS 시스템

티테이블 카페를 위한 포인트 오브 세일(POS) 주문 관리 시스템입니다.

## 🌐 배포 사이트

**👉 [https://teatable-pos.vercel.app](https://teatable-pos.vercel.app)**

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

이 프로젝트는 Vercel에 배포되어 있습니다: **[https://teatable-pos.vercel.app](https://teatable-pos.vercel.app)**

Vercel은 Next.js를 만든 회사에서 제공하는 플랫폼으로, 가장 쉽고 빠르게 실제 프로덕션 환경에 배포할 수 있습니다.

#### 📝 배포 가이드

**1단계: Vercel 가입 및 프로젝트 연결**
```
1. https://vercel.com 접속
2. "Sign Up" 클릭 → GitHub 계정으로 로그인
3. 대시보드에서 "Add New..." → "Project" 클릭
4. "Import Git Repository" 선택
5. `firstsm41/teatable_pos` 저장소 선택
6. "Import" 클릭
```

**2단계: 환경 변수 설정 (중요!)**
```
프로젝트 설정 화면에서:
1. "Environment Variables" 섹션 클릭
2. 다음 변수를 하나씩 추가:

   변수 1:
   - Name: NEXT_PUBLIC_SUPABASE_URL
   - Value: your_supabase_project_url
   - Environment: Production, Preview, Development 모두 체크
   
   변수 2:
   - Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Value: your_supabase_anon_key
   - Environment: Production, Preview, Development 모두 체크

3. 각 변수 추가 후 "Save" 클릭
```

**3단계: 배포 실행**
```
1. "Deploy" 버튼 클릭
2. 빌드 진행 상황 확인 (약 1-2분 소요)
3. 배포 완료 후 URL 생성
```

#### 🔄 자동 배포

- ✅ `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다
- ✅ Pull Request 생성 시 프리뷰 배포가 자동 생성됩니다
- ✅ 배포 상태는 Vercel 대시보드에서 실시간 확인 가능합니다

#### 🌐 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 설정 → Domains
2. 원하는 도메인 입력 (예: `pos.teatable.com`)
3. DNS 설정 안내에 따라 도메인 제공자의 DNS 레코드 추가
4. SSL 인증서는 자동으로 발급됩니다

### 다른 배포 옵션

- **Netlify**: [netlify.com](https://www.netlify.com) - 무료 플랜 제공
- **Railway**: [railway.app](https://railway.app) - 서버리스 및 데이터베이스 지원
- **Render**: [render.com](https://render.com) - 무료 티어 제공

## 사용 방법

1. 배포된 사이트에 접속: [https://teatable-pos.vercel.app](https://teatable-pos.vercel.app)
2. 매장 고유 코드를 입력하여 로그인
3. 홈 화면에서 원하는 기능 선택:
   - 📋 메뉴 관리: 메뉴 추가/수정/삭제
   - 💳 POS: 주문 접수 및 처리
   - 📦 주문 확인: 대기 중인 주문 확인 및 완료 처리

## 라이선스

이 프로젝트는 개인 사용을 위한 것입니다.

## 버전

- **현재 버전**: 0.1.0

## 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요.
