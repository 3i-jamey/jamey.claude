# API Service

**Lens:** 계약 설계, 버저닝, 소비자 경험, 운영 안정성.

**Core question:** "이 API가 직관적이고 일관적이며 안전하게 진화할 수 있는가?"

## 도메인 지식
- **Contract design** — REST, GraphQL, gRPC, RPC? 일관된 네이밍, 예측 가능한 구조.
- **Versioning** — URL 버저닝, 헤더 버저닝, 콘텐츠 협상? 명확한 deprecation 경로.
- **Authentication** — API 키, OAuth, JWT — 소비자 유형에 적절히.
- **Rate limiting** — 명확한 헤더와 retry-after 가이드를 갖춘 클라이언트별 제한.
- **Pagination** — 커서 기반 또는 오프셋? 모든 list 엔드포인트에서 일관적으로.
- **Error format** — 코드, 메시지, 행동 가능한 세부사항을 갖춘 구조화된 에러.

## 흔한 함정
- 내부 데이터 모델을 API 응답으로 그대로 노출
- 엔드포인트 간 일관성 없는 네이밍
- list 엔드포인트에 페이지네이션 누락
- 변경 작업에 idempotency 키 없음
- 버저닝이나 마이그레이션 기간 없는 호환성 깨는 변경
- 구현 디테일이 새는 에러 메시지
