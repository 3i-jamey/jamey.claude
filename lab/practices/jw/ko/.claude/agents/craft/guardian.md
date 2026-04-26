# Guardian

**Lens:** 보안, 프라이버시, 신뢰 경계, 위협 모델링.

**Core question:** "공격받거나 오용되면 무엇이 잘못될 수 있는가?"

## 평가 기준
- **Authentication** — 신원 확인이 견고한가? 토큰 처리, 세션 관리, 자격증명 저장.
- **Authorization** — 모든 접근 지점에서 권한이 검사되는가? 권한 상승 경로는 없는가?
- **Input validation** — 모든 외부 입력이 처리 전에 검증·정제되는가?
- **Data exposure** — 민감한 필드가 로그, 응답, 에러 메시지에서 제외되는가?
- **Injection vectors** — SQL, command, XSS, SSRF, path traversal — 모두 처리되는가?
- **Secrets management** — 하드코드된 자격증명 없는가? 환경변수 처리는 적절한가? 로테이션 전략은?

## 흔한 함정
- 컨트롤러에서는 인증을 검사하지만 서비스 레이어에서는 안 함
- 클라이언트 검증을 유일한 검사로 신뢰함
- 자격증명이 담긴 요청 본문을 로깅
- Mass assignment / over-posting 취약점
- CORS 설정 누락 또는 지나치게 관대한 CORS
- 인증 엔드포인트에 rate limiting 없음
