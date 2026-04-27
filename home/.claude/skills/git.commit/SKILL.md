---
name: git.commit
description: Conventional Commits 형식으로 적절한 파일만 스테이징하고 목적이 명확한 커밋을 생성합니다. 사용자가 커밋을 요청하거나 하나의 논리적 작업 단위가 끝났을 때 사용.
argument-hint: "[선택: 범위 힌트 또는 메시지 지정]"
model: sonnet
context: fork
---

# 커밋: $ARGUMENTS

**Conventional Commits**(`<type>: <subject>`)를 따릅니다. 스코프(`(scope)`)는 사용하지 않습니다 — 영역은 제목의 평문으로 드러냅니다. 옛 이모지 prefix(`✨ 🐛 💄`)도 사용하지 않습니다 — **단, 버전 업데이트 커밋만** `🔖:` 형식을 유지합니다.

## 워크플로우

1. 병렬로 실행:
   - `git status` (추적/미추적 변경 확인)
   - `git diff` (스테이징 안 된 변경)
   - `git diff --cached` (이미 스테이징된 변경)
   - `git diff --cached --stat` (스테이징 규모)
   - `git log -n 10 --oneline` (최근 스타일 재확인)
   - `git branch --show-current` (티켓 컨텍스트)
2. **현재 상태 점검**:
   - 스테이징된 파일이 없으면 사용자에게 알리고 어떻게 할지 묻습니다 — `git add -A`로 자동 추가 금지.
   - unstaged/untracked 파일이 있으면 목록만 보여주고 어떻게 처리할지 묻습니다.
3. 변경사항을 **하나의 논리적 단위**로 묶을 수 있는지 판단. 관련 없는 여러 관심사가 섞여 있거나 변경 규모가 비정상적으로 크면(파일 20개 이상 또는 1000줄 이상) 분리 여부를 사용자에게 묻습니다.
4. 파일은 경로를 명시해서 스테이징합니다.
5. 비밀값으로 보이는 파일(`.env`, `local.properties`, `credentials*`, `*.pem`, `*.key`, 토큰 패턴)은 거부하고 사용자에게 경고합니다.
6. `CLAUDE.md` / `CONTRIBUTING.md`에 명시된 아키텍처·코딩 규칙(레이어/모듈 위치, 비동기/동시성, null 안전성, 라이프사이클, 의존 방향 등)을 이번 변경이 위반하면 멈추고 사용자에게 보고합니다.
7. **타입 힌트 수집(가능하면)**: 브랜치명에서 티켓(`[A-Z]+-\d+`)을 추출하고, 이슈 트래커 MCP가 활성화되어 있으면 이슈 타입(Bug/Story/Task)을 조회해 commit 타입 결정에 참고합니다.
   - Bug 또는 명백한 버그 픽스 → `fix:`
   - 새 기능/기능 개선 → `feat:`
   - 동작 변경 없는 구조 개선 → `refactor:`
   - 빌드/설정/의존성/테스트/스타일/단순 정리 등 사용자 영향 없는 작업 → `chore:`
   - 문서/주석 변경만 → `docs:`
8. 커밋 메시지 작성:
   - **타입(필수):** `feat` / `fix` / `refactor` / `chore` / `docs` 중 하나. 이 5개 외 타입(`style` / `test` / `perf` / `build` / `ci` 등)은 사용하지 않고 `chore`로 묶습니다.
   - **스코프 사용 안 함** — 영역(`gps`, `domain` 등)은 제목 본문의 평문으로 드러냅니다. `feat(gps): ...` 대신 `feat: Add GPS tracking core`.
   - **설명:** 명령형이지만 **첫 글자는 대문자**(`Add`, `Fix`, `Refactor` — `added`/`fixed` 아님), 72자 이내, 마침표 없음
   - **본문(필수):** 제목과 빈 줄로 구분 후 **`-` 불릿 한 줄 이상**으로 *무엇/왜*를 적는다. 단순 변경도 한 줄은 남긴다.
   - **티켓 참조(브랜치에 티켓이 있으면 필수):** 현재 브랜치명에서 티켓(`[A-Z]+-\d+`)이 추출되면 본문 마지막 줄에 **무조건** JIRA 링크를 붙입니다. 형식: `https://3iai.atlassian.net/browse/{TICKET}` (예: `https://3iai.atlassian.net/browse/PVPLUS-0000`). 본문 불릿과 빈 줄 한 칸으로 구분합니다. 브랜치에 티켓이 없으면 추가하지 않습니다.
   - 예시 (티켓 브랜치가 아닐 때):
     ```
     chore: Add gitignore for editor noise

     - Exclude .obsidian/ (Obsidian vault config)
     - Exclude .claude/ (local Claude Code project state)
     ```
   - 예시 (브랜치명이 `feature/PVPLUS-0000-...`처럼 티켓을 포함할 때):
     ```
     feat: Add GPS tracking core

     - Introduce GpsTracker with foreground service lifecycle
     - Persist last known location to DataStore for cold start

     https://3iai.atlassian.net/browse/PVPLUS-0000
     ```
9. 버전 업데이트 커밋만 예외 형식 유지:
   ```
   🔖: Version Update X.Y.Z ( BUILDNUMBER )
   🔖: Version Update Debug X.Y.Z ( BUILDNUMBER )
   ```
   이 형식은 **버전 bump 외 다른 변경에는 쓰지 않습니다**.
10. **사용자 확인** — 작성한 메시지 전문을 보여주고 그대로 커밋할지 물어봅니다. 자동 커밋 금지. 수정 요청이 있으면 반영 후 다시 확인.
11. HEREDOC으로 커밋:
    ```bash
    git commit -m "$(cat <<'EOF'
    <type>: <제목>

    - <본문 불릿 1>
    - <본문 불릿 2, 선택>
    EOF
    )"
    ```
12. pre-commit 훅이 실패하면: 근본 원인 수정 → 재스테이징 → **새 커밋**.
13. 결과 커밋 SHA와 짧은 메시지를 보고합니다.

## 반드시 지킬 규칙

- 사용자 확인 없이 커밋하지 않는다 — 자동 생성된 메시지가 실제 의도와 어긋날 수 있고, 한 번 만들어진 히스토리는 정정 비용이 큽니다.
- 한 커밋에 하나의 논리적 변경만 담는다 — 섞이면 리뷰·revert·히스토리 조사가 모두 어려워집니다.
- Conventional Commits 형식을 지킨다 (이모지 prefix는 버전 업데이트 외 금지) — 자동화·체인지로그가 형식에 의존합니다.
- 스코프(`(scope)`)를 쓰지 않는다 — 영역은 제목 평문으로 충분히 드러나고, 스코프 표기 변형이 누적되면 일관성이 깨집니다.
- 제목 첫 글자는 대문자로 쓴다 — 팀 로그 스타일 일관성. `chore: add ...`(소문자) 금지.
- 본문에 `-` 불릿 최소 한 줄을 둔다 — 제목만으로는 *왜*가 빠집니다. `git log --oneline`이 아닌 `git show`를 보는 사람을 위한 정보입니다.
- 비밀값/키/인증 파일은 거부한다 — 한 번 푸시되면 회수가 어렵고 회전 비용이 큽니다.
- `git add -A` / `git add .`을 쓰지 않는다 — 비밀값·생성 파일·관련 없는 WIP가 함께 들어갈 위험.
- unstaged/untracked 파일을 사용자 동의 없이 스테이징하지 않는다 — 의도하지 않은 파일이 커밋에 섞이는 가장 흔한 사고 경로입니다.
- pre-commit 훅을 우회하지 않는다 (`--no-verify`, `--no-gpg-sign`) — 사용자가 명시 요청한 경우만 예외. 훅은 팀의 안전장치입니다.
- `--amend`로 실패한 훅을 덮지 않는다 — 훅 실패 시 커밋이 안 만들어졌으므로 amend는 *직전* 커밋을 수정합니다. 새 커밋을 만들어야 합니다.
- `CLAUDE.md` / `CONTRIBUTING.md` 위반은 자동으로 고치지 않고 사용자에게 보고한다 — 위반의 의도성·우선순위는 사용자가 판단할 영역입니다.

## 기본 규칙

- 이 스킬로 push 하지 않는다 — 커밋과 공개는 별개의 결정입니다.
- `$ARGUMENTS`가 주어져도 분석을 건너뛰지 않는다 — 사용자가 준 메시지가 실제 변경과 어긋날 수 있습니다.
- 브랜치 이름에서 티켓(`[A-Z]+-\d+`)이 추출되면 본문 마지막 줄에 **무조건** JIRA 링크(`https://3iai.atlassian.net/browse/{TICKET}`)를 붙인다 — PR 본문이 아닌 커밋 자체에서도 티켓 추적이 가능하도록 하기 위한 팀 컨벤션. 티켓이 없는 브랜치(예: `main`, `chore/...`)에서는 붙이지 않는다.
- 이슈 트래커 MCP가 있으면 타입 결정에 참고하되 결과를 그대로 강제하지는 않는다 — 실제 변경 성격이 티켓 타입과 다를 수 있습니다.
- `Co-Authored-By` 푸터는 자동 추가하지 않는다 — 사용자가 명시 요청한 경우에만.
