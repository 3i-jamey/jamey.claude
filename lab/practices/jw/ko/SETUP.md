# 프로젝트 셋업 체크리스트

첫 세션에서 Claude와 함께 진행하세요. 끝나면 이 파일은 삭제합니다.

---

## 1. 프로젝트 정체성
`.claude/CLAUDE.md`를 열고 다음을 채워 넣습니다:
- [ ] `PROJECT_NAME` — 프로젝트 이름
- [ ] `Stack` 필드 — 예: `Node.js + Express`, `Python + FastAPI`, `Vite + React`, `Rust + Axum`

## 2. Spec 구조
`Documents/Spec/`을 만들고 토픽 분할을 결정합니다:
- [ ] `Documents/Spec/Spec.md` 생성 — 마스터 인덱스, 핵심 컨셉, 버전 번호 (`v1.0`로 시작)
- [ ] `Documents/Spec/00_Changelog.md` 생성 — 비어 있는 상태로 헤더만
- [ ] `Documents/Spec/00_IssueLog.md` 생성 — 비어 있는 상태로 헤더만
- [ ] 컨벤션 파일 생성 (예: `06_Conventions.md`) — 이 프로젝트의 엔지니어링 규칙
- [ ] 필요한 토픽 파일 추가 (API, 데이터 모델, 인증, 통합 등)
- [ ] `CLAUDE.md`의 Spec Reference 목록 업데이트 — 토픽 파일 항목 주석 해제 및 편집

## 3. 아키텍처 & 테스팅
`CLAUDE.md`의 `<!-- FILL -->` 자리표시자를 채워 넣습니다:
- [ ] **Inter-System Communication** — 어떤 메시징/통합 패턴인가?
- [ ] **Performance** — 스택 특화 성능 규칙
- [ ] **Coding Conventions** — 프로젝트별 패턴 추가 (네이밍, 린팅)
- [ ] **Testing** — 테스트 명령어, 전략 (unit/integration/e2e), 테스트 대상 레이어
- [ ] **Project Config** — 포트, 환경변수, 외부 서비스, 빌드 명령어
- [ ] **Read-Only Directories** — Claude가 절대 건드리면 안 되는 서드파티 폴더가 있는가?
- [ ] **Checkpoint Directories** — phase 사전 스냅샷에 포함할 폴더는?

## 4. 코드 리뷰 체크리스트
`.claude/agents/workflow/code-review.md`를 열고 채웁니다:
- [ ] **Coding Conventions** 섹션 — 3단계의 컨벤션과 일치하는 체크 추가
- [ ] **Read-Only Boundaries** 섹션 — read-only 디렉토리와 일치시키기

## 5. 메모리 검증
- [ ] `.claude/MEMORY.md` 링크가 정확한지 확인
- [ ] `.claude/memory/feedback.md` 검토 — 적용되는 선호는 유지, 아닌 것은 제거

## 6. 첫 디자인 세션
- [ ] 프로그램의 핵심 컨셉에 대해 Claude와 디자인 대화
- [ ] `/design [topic]` 실행 — 디자인 패널의 다관점 리뷰 (선택)
- [ ] `/new-phase 1 [name]` 실행 — 첫 phase 프롬프트 생성
- [ ] 프롬프트 검토, 승인, 빌드 시작

---

## 팀 셋업 (해당 시)
- [ ] `CLAUDE.md`의 `Team Collaboration` 섹션 채우기
- [ ] `.claude/settings.json`에 hook 설정 (Edit/Write에 린터, .env 차단)
- [ ] 여러 프로젝트를 동시에 돌린다면 `Port Allocation` 표 채우기
- [ ] `.claude/`를 버전 관리에 커밋

## 선택사항
- [ ] 셋업에서 결정된 기반 결정사항을 `.claude/memory/decisions.md`에 업데이트
- [ ] 프레임워크를 쓴다면 `.claude/memory/framework.md`에 패턴 문서화
- [ ] UI가 필요 없으면 `.claude/agents/design/` 삭제 — 패널 에이전트가 소프트웨어 아키텍처를 다룸
- [ ] 브랜드/마케팅이 필요 없으면 `.claude/agents/design/brand-marketing.md` 삭제
