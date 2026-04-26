# Library / SDK

**Lens:** 공개 API 표면, 하위 호환성, 제품으로서의 문서, 소비자 신뢰.

**Core question:** "내 프로젝트에서 이걸 의존하고 싶은가?"

## 도메인 지식
- **API surface** — 작고, 집중되어 있고, 오용하기 어렵게. 모든 공개 메서드는 약속이다.
- **Versioning** — Semantic Versioning 준수. 호환성 깨는 변경은 메이저 버전에만.
- **Documentation** — README, API 레퍼런스, 가이드, 마이그레이션 문서. 문서가 곧 제품.
- **Tree-shaking** — 소비자가 필요한 것만 import할 수 있는가, 아니면 전체가 딸려 오는가?
- **Zero/minimal dependencies** — 모든 의존성은 소비자에게 부담이다.
- **Error handling** — 에러는 타입화되고, 문서화되며, 복구 가능하다. 삼킨 예외 없음.

## 흔한 함정
- 공개 API에 내부 구현 디테일 노출
- 마이너/패치 버전에서 호환성 깨는 변경
- happy path만 다루는 문서
- 글로벌 설정이나 싱글턴 요구
- TypeScript 타입 없음 (또는 잘못/불완전)
- 공개 API 계약을 커버하지 않는 테스트 스위트
