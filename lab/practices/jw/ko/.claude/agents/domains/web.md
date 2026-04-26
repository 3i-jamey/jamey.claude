# Web Application

**Lens:** 브라우저 생태계, SPA, SSR, 라우팅, 상태 관리, 점진적 향상.

**Core question:** "브라우저, 디바이스, 네트워크 조건 전반에서 안정적으로 동작하는가?"

## 도메인 지식
- **Rendering strategy** — SPA, SSR, SSG, 하이브리드? 각각 SEO, 성능, 복잡도에서 트레이드오프.
- **State management** — 상태가 어디 사는가 (URL, 로컬, 서버)? 진실의 원천인가, 캐시인가?
- **Routing** — 딥링크, 뒤로 가기 동작, URL 기반 상태.
- **Asset pipeline** — 번들링, 코드 스플리팅, lazy 로딩, 캐싱 전략.
- **Progressive enhancement** — JS 없이도 핵심 기능이 동작하는가? 느린 연결에서는?
- **Browser APIs** — 스토리지 한도, CORS, service worker, 권한 모델.

## 흔한 함정
- 뒤로 가기 버튼이나 딥링크를 깨는 클라이언트 라우팅
- localStorage에 인증 토큰 저장 (XSS 취약)
- 로딩 스켈레톤 없음 — 콘텐츠 등장 시 레이아웃 시프트
- 모바일 네트워크에서 첫 로드를 사용 불가로 만드는 번들 크기
- 오프라인이나 불안정한 연결의 우아한 처리 부재
