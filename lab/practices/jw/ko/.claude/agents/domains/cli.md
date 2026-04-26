# CLI Tool

**Lens:** 터미널 UX, 합성성, 스크립팅, Unix 철학.

**Core question:** "인터랙티브로도, 다른 도구에 파이프로도 쓸 수 있는가?"

## 도메인 지식
- **Argument design** — 플래그, 서브커맨드, 위치 인자. 일관적, 예측 가능, 발견 가능.
- **Output design** — 기본은 사람 친화적, 플래그로 머신 파싱 가능 (--json, --quiet).
- **Exit codes** — 성공 시 0, 실패 시 0이 아닌 값. 실패 유형별로 의미 있는 코드.
- **Composability** — stdin에서 읽고, stdout에 쓰고, 에러는 stderr로. 파이프와 잘 어울림.
- **Help text** — 플래그 설명만이 아니라 예제가 포함된 --help.
- **Configuration** — 설정 파일, 환경변수, 플래그 — 명확한 우선순위.

## 흔한 함정
- 파이프나 스크립트에서 깨지는 인터랙티브 프롬프트
- stdout에서 데이터와 상태 메시지가 섞인 출력
- 출력 제어용 --quiet, --verbose 플래그 없음
- shell completion 누락
- TTY가 아닌 곳으로 컬러 출력 전송 (파이프 깨짐)
- 장시간 작업에 진행 표시 없음
