# Claude AI 프로젝트 규칙
**Project:** PROJECT_NAME | **Stack:** <!-- FILL --> | **Spec:** v1.0

---

## 행동 규칙

1. **Think Before Coding** — 가정을 명시. 불확실하면 묻고, 더 단순한 접근이 있으면 말한다.
2. **Simplicity First** — 최소한의 코드. 추측성 기능, 단일 사용을 위한 추상화, 불가능한 시나리오에 대한 에러 처리는 금지.
3. **Surgical Changes** — 인접 코드를 "개선"하지 않는다. 기존 스타일 유지. 본인의 변경으로 더 이상 쓰이지 않게 된 것만 제거.
4. **Goal-Driven Execution** — 성공 기준을 정의하고, 검증될 때까지 반복.
5. **Auto-Commit** — 논리적 단위가 끝나면 커밋. push는 하지 말 것.
6. **Plan Mode** — 3단계 이상 작업은 plan mode 진입. 확정 전에 셀프 리뷰 + 비평 서브에이전트. plan은 `docs/plans/`에 저장.
7. **Sub-agents** — 리서치/탐색을 위임. 에이전트당 작업 1개. 작업 중복 금지.
8. **Self-improvement** — 교정받으면 `memory/lessons-learned.md` 업데이트. 같은 교훈 3회 반복 → CLAUDE.md로 승격.
9. **Autonomous Bug Fixing** — 조사하고 수정. 조사 후에도 불분명할 때만 에스컬레이션.
10. **Verify Before Done** — 끝났다고 선언하기 전에 동작을 증명.

## 워크플로우 규칙
- phase 단계는 사용자 승인을 기다리지 말고 순차적으로 실행. 막힌 경우에만 정지.
- 모든 메모리 파일은 프로젝트 `.claude/memory/`에 위치. 글로벌 `~/.claude/`에는 절대 두지 않는다.

---

## 세션 시작
`.claude/MEMORY.md` 읽기. `memory/` 토픽 파일은 작업이 그 영역과 닿을 때만 파고든다.

## Spec
Claude가 `Documents/Spec/`을 소유한다. 필수: `Spec.md` (인덱스), `00_Changelog.md`, `00_IssueLog.md`.
**작성 규칙:** 쓰기 전에 읽는다. 구조 보존. 정확히 (숫자, API, 데이터 타입, enum). 변경마다 버전 매김 (`1.N`).

## 아키텍처
1. **Separation of Concerns:** Input → Logic → Presentation.
2. **System Ownership:** 두 매니저/서비스가 같은 시스템을 소유하지 않는다.
3. **Communication:** <!-- FILL: messaging pattern (e.g., event bus, REST, gRPC, signals) -->
4. **Performance:** <!-- FILL: stack-specific perf rules (e.g., avoid N+1 queries, cache lookups, lazy loading) -->

## 코딩 컨벤션
<!-- FILL: naming, file organization, linting rules -->

## 테스팅
- **Test command:** <!-- FILL: e.g., `npm test`, `pytest`, `cargo test` -->
- **Strategy:** <!-- FILL: unit, integration, e2e — which layers get tested and how -->
- **Rule:** 동작을 추가하거나 변경하는 모든 phase 단계는 테스트를 추가/업데이트해야 한다. 테스트 스위트가 통과하지 않으면 그 단계는 검증된 것이 아니다.

## 메모리 업데이트 규칙
phase 종료 전 매번 업데이트:
- **항상:** `memory/logs/phaseN-log.md` + `MEMORY.md` Current State.
- **Notes to Spec이 있으면:** Spec 파일 업데이트, 버전 올림.
- **해당 시:** `memory/architecture.md`, `memory/lessons-learned.md`, `memory/spec-tracking.md`.

생략은 워크플로우 위반.

## Phase
프롬프트 템플릿: `prompts/prompt-template.md`. 이름: `phase[N]-[word].md`.

| Phase | Prompt file | Status |
|-------|-------------|--------|

## 프로젝트 설정
<!-- FILL: ports, env vars, external services, build commands -->

## 에이전트 & 스킬

| Agent | Purpose |
|-------|---------|
| `agents/workflow/codebase-scan.md` | Spec 변경과 관련된 기존 코드 찾기 |
| `agents/workflow/phase-planner.md` | Spec 변경 + scan을 phase 프롬프트로 종합 |
| `agents/workflow/code-review.md` | 코드 무결성, 컨벤션, Spec 일치 |
| `agents/workflow/design-review.md` | 다관점 소프트웨어 디자인 리뷰 |

**역할별 전문가 에이전트:**
- `agents/panel/` — 핵심 자문단 (architect, skeptic, simplifier, user-advocate, operator, economist, historian)
- `agents/product/` — 전략 레이어 (product-thinker, growth-mind, storyteller, competitor-scout)
- `agents/craft/` — 실행 품질 (dx-advocate, guardian, perfectionist, scaler)
- `agents/domains/` — 컨텍스트 전문가 (web, mobile, cli, api, desktop, library, pipeline, platform)

**사용법:** 패널 에이전트는 모든 논의에 참여. 제품 에이전트는 방향성을 잡을 때 합류. craft 에이전트는 실행을 검토할 때 합류. 도메인 에이전트는 한 명을 활성화해 대화를 적절한 소프트웨어 유형에 고정.

**탐색 규칙:** 관련 하위 폴더를 glob하고 에이전트 description을 읽어 맞는 전문가를 찾는다. 기억으로 추측하지 말고 파일을 확인.

| Skill | Purpose |
|-------|---------|
| `/new-phase [N] [name]` | 세션의 결정 → phase 프롬프트로 추출 |
| `/review [files]` | 코드 리뷰 |
| `/design [topic]` | 디자인 패널 리뷰 |
| `/update [scope]` | 오래된 Spec 참조 동기화 |
| `/audit [focus]` | 전체 프로젝트 헬스 체크 — Spec 동기화, 아키텍처, 메모리, 보류 작업 |

**서브에이전트 규칙:** 병렬/복잡한 작업에만 사용. 작은 편집이나 메모리 쓰기에는 절대 쓰지 않는다.

## 팀 협업
