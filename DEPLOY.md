# 🚀 빠른 배포 가이드

## Vercel 배포 (5분 완성!)

### 즉시 배포하기

1. **Vercel 접속 및 로그인**
   ```
   https://vercel.com → GitHub로 로그인
   ```

2. **프로젝트 Import**
   ```
   Add New → Project → firstsm41/teatable_pos 선택 → Import
   ```

3. **환경 변수 추가** (중요!)
   ```
   Environment Variables 섹션에서:
   
   NEXT_PUBLIC_SUPABASE_URL
   → https://soeivyxsazxuvxhmipag.supabase.co
   
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   → sb_publishable_29pe6qFwHxU2n9IuyjCSjw_hyLPdFcm
   
   ※ Production, Preview, Development 모두 체크!
   ```

4. **Deploy 클릭!** 
   ```
   약 1-2분 후 배포 완료 → URL 생성됨
   ```

5. **접속 확인**
   ```
   https://teatable-pos-xxx.vercel.app 형태의 URL로 접속
   ```

### 배포 완료 후

✅ 자동 배포: `main` 브랜치에 푸시하면 자동 재배포
✅ 실시간 로그: Vercel 대시보드에서 확인
✅ 프리뷰: Pull Request 생성 시 자동 프리뷰 URL 생성

### 문제 해결

- 빌드 실패 시: Vercel 대시보드 → Deployments → 해당 배포 → Build Logs 확인
- 환경 변수 누락: Settings → Environment Variables 확인
- 접속 오류: 배포 완료 후 1-2분 대기 후 재시도

---
**문의사항이 있으시면 이슈를 등록해주세요!**
