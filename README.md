# 🍵 티테이블 POS 시스템

티테이블 카페를 위한 포인트 오브 세일(POS) 주문 관리 시스템입니다.

**🌐 배포 사이트**: [https://teatable-pos.vercel.app](https://teatable-pos.vercel.app)

## 주요 기능

- 🔐 매장 코드 기반 인증
- 📋 메뉴 관리 (추가/수정/삭제)
- 💳 POS 주문 처리
- 📦 주문 확인 및 완료 처리
- 📊 자동 주문 번호 관리

## 기술 스택

- Next.js 16.0.7 (App Router)
- TypeScript
- Tailwind CSS 4
- Zustand (상태 관리)
- Supabase (데이터베이스)

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 개발 서버 실행

```bash
npm run dev
```

## 배포

Vercel에 배포되어 있습니다. 자세한 배포 방법은 [DEPLOY.md](./DEPLOY.md)를 참고하세요.

## 데이터베이스

Supabase에 다음 테이블이 필요합니다:
- `stores` - 매장 정보
- `menus` - 메뉴 정보
- `orders` - 주문 정보
- `order_items` - 주문 항목

## 버전

v0.1.0
