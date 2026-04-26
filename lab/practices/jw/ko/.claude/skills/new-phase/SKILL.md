---
name: new-phase
description: 이번 세션의 디자인 결정을 집중된 phase 프롬프트로 정제. 디자인 대화 후 사용.
disable-model-invocation: true
argument-hint: "[phase-number] [single-word-name]"
---

# New Phase: Phase $ARGUMENTS

현재 세션의 디자인 결정으로부터 phase 구현 프롬프트를 생성.

## 워크플로우

### Step 1: 추출 & 분류 (인라인)

전체 대화를 검토하고 논의된 모든 디자인 결정, 합의, 사양을 추출. 그다음:

1. 결정을 토픽/시스템별로 **그룹화** (예: "Auth", "API", "Database", "UI").
2. 스코프로 카테고리를 **랭킹** — 가장 많은 결정, 가장 깊은 영향, 가장 상호 연결된 변경을 가진 것.
3. **메인 테마 선택** — 단일 최대 카테고리가 phase 포커스가 된다.
4. **나머지 보류** — 다른 모든 카테고리는 한 줄 이유와 함께 deferred 목록으로 (예: "메인 테마와 무관," "사소한 결정 하나뿐," "아직 만들지 않은 시스템에 의존").
5. **이전 보류 항목 재평가:**
   - `.claude/memory/deferred.md`를 읽고 — 이전에 보류된 항목 중 현재 메인 테마와 매칭되는 것이 있는지 확인. 매칭되면 사용자에게 명시적으로 표시하고 끌어온다. 태그 메모:
     - `[FEATURE]` 항목은 이미 Spec에 있음 — Spec 작성 단계를 건너뛰고 바로 phase 계획으로.
     - `[DECISION]` 항목은 Spec에 없음 — Step 2에서 새 세션 결정과 함께 Spec에 기록 필요.

사용자에게 분류를 제시:
- 메인 테마와 포함된 결정
- **백로그에서 회수** — 테마와 매칭되는 이전 보류 항목, 태그와 원래 보류된 시점 표시
- 보류 항목 (신규)과 이유
- 진행 전 확정 요청

### Step 2: Spec 업데이트 (인라인, 사용자 확정 후)

**아직 Spec에 없는** in-scope 항목 (새 세션 결정 + 회수된 `[DECISION]` 항목)을 적절한 `Documents/Spec/` 파일에 기록. 회수된 `[FEATURE]` 항목은 건너뛴다 — 이미 specced.

1. `.claude/CLAUDE.md` Spec Reference에 나열된 컨벤션 파일을 먼저 읽는다.
2. 편집 전에 각 대상 Spec 파일을 읽는다.
3. `.claude/CLAUDE.md`의 모든 Spec Writing Rules를 따른다.
4. `Documents/Spec/Spec.md`의 버전을 올리고 `Documents/Spec/00_Changelog.md`에 changelog 항목 추가.

### Step 3: 디자인 리뷰 (선택, Step 4와 병렬)

in-scope 결정이 중요한 새 시스템이나 아키텍처를 포함한다면:

**Agent — design-review** (Plan):
`.claude/agents/workflow/design-review.md`의 지시를 읽고 실행.
in-scope Spec 섹션을 입력으로 제공. 패널의 종합을 phase 프롬프트 초안과 함께 사용자에게 제시.

작고 점진적인 변경이나 순수 리팩터에는 이 단계 건너뛰기.

### Step 4: 코드베이스 스캔 (에이전트)

**Agent — codebase-scan** (Explore):
`.claude/agents/workflow/codebase-scan.md`의 지시를 읽고 실행.
in-scope 결정을 검색 타깃으로 사용.

### Step 5: 계획 (Step 2-4 완료 후)

**Agent — phase-planner** (Plan):
`.claude/agents/workflow/phase-planner.md`의 지시를 읽고 실행.
in-scope 결정 (이제 Spec에 있음), Step 4의 코드베이스 스캔, Step 3의 디자인 리뷰 출력 (있을 경우)을 입력으로 제공.
phase 번호와 이름: $ARGUMENTS

### Step 6: 이전 phase 아카이브

새 프롬프트를 저장하기 전에 완료된 phase를 아카이브:
1. `.claude/CLAUDE.md`의 phase 표에서 status가 `Done`인 phase 확인
2. 각각에 대해 프롬프트 파일을 `.claude/prompts/`에서 `.claude/prompts/archive/`로 이동 (필요 시 폴더 생성)
3. CLAUDE.md phase 표의 프롬프트 파일 경로를 `prompts/archive/phase[N]-[name].md`로 갱신

### Step 7: 출력

1. 생성된 프롬프트를 `.claude/prompts/phase[N]-[name].md`에 저장
2. `.claude/CLAUDE.md`의 표에 status `Pending`으로 phase 추가
3. `.claude/memory/spec-tracking.md`를 새 Spec 버전으로 갱신
4. `.claude/memory/deferred.md` 갱신 — 회수된 항목 제거, 새로 보류된 항목을 적절한 태그 (`[DECISION]` Spec에 기록되지 않은 아이디어, `[FEATURE]` 이제 Spec에 specced된 항목), 날짜, 한 줄 이유와 함께 추가
5. 사용자에게 초안 프롬프트 (Claude's Opinion, 가능 시 Design Panel 피드백, Deferred Changes 포함)를 보여주고 구현 전에 승인 요청
