---
name: 'git-commit'
description: '스테이징된 변경만으로 Conventional Commits 형식의 커밋을 만든다. 사용자가 커밋을 요청하거나 한 논리적 작업 단위가 끝났을 때 사용. 스테이징은 사용자가 끝낸 상태여야 한다.'
---

# 커밋: 사용자 요청

이 스킬은 **`git add` 로 스테이징된 변경만** 커밋한다.
**Conventional Commits**(`<type>: <subject>`)를 따른다. 스코프(`(scope)`)는 사용하지 않으며 영역은 제목 평문으로 드러낸다. 이모지 prefix(`✨ 🐛 💄`)도 사용하지 않는다. **단, 버전 업데이트 커밋만** `🔖:` 형식을 유지한다.

## 워크플로우

1. 병렬로 실행:
   - `git status` (전체 상태 확인)
   - `git diff --cached` (스테이징된 변경 ← 커밋 대상)
   - `git diff --cached --stat` (스테이징 규모)
   - `git log -n 10 --oneline` (최근 스타일 재확인)
   - `git branch --show-current` (티켓 컨텍스트)
2. **스테이징 상태 점검**:
   - 스테이징된 변경이 0개면 작업을 **중단**하고 사용자에게 알린다.
3. **스테이징된 변경**이 하나의 논리적 단위인지 판단. 아니면 어떻게 진행할지 묻는다.
4. 스테이징된 파일에 비밀값으로 보이는 것(`.env`, `local.properties`, `credentials*`, `*.pem`, `*.key`, 토큰 패턴)이 있으면 커밋을 거부하고 사용자에게 경고한다.
5. `AGENTS.md` / `CONTRIBUTING.md`에 명시된 아키텍처·코딩 규칙을 스테이징된 변경이 위반하면 멈추고 사용자에게 보고한다.
6. **타입 힌트 수집**: 브랜치명에서 티켓(`[A-Z]+-\d+`)을 추출하고, `Jira/Atlassian issue 조회 도구`로 이슈 타입(Bug/Story/Task)을 조회해 commit 타입 결정에 참고한다.
   - Bug 또는 명백한 버그 픽스 → `fix:`
   - 새 기능/기능 개선 → `feat:`
   - 동작 변경 없는 구조 개선 → `refactor:`
   - 빌드/설정/의존성/테스트/스타일/단순 정리 등 사용자 영향 없는 작업 → `chore:`
   - 문서/주석 변경만 → `docs:`
7. 커밋 메시지 작성:
   - **타입(필수):** `feat` / `fix` / `refactor` / `chore` / `docs` 중 하나. 이 5개 외 타입(`style` / `test` / `perf` / `build` / `ci` 등)은 사용하지 않고 `chore`로 묶는다.
   - **스코프 사용 안 함**. 영역(`gps`, `domain` 등)은 제목 본문의 평문으로 드러낸다. `feat(gps): ...` 대신 `feat: Add GPS tracking core`.
   - **설명:** 명령형이지만 **첫 글자는 대문자**(`Add`, `Fix`, `Refactor`. `added`/`fixed` 아님), 72자 이내, 마침표 없음.
   - **본문(필수):** 제목과 빈 줄로 구분 후 **`-` 불릿 한 줄 이상**으로 *무엇/왜*를 적는다. 단순 변경도 한 줄은 남긴다.
   - **티켓 참조(브랜치에 티켓이 있으면 필수):** 현재 브랜치명에서 티켓(`[A-Z]+-\d+`)이 추출되면 본문 마지막 줄에 **무조건** JIRA 링크를 붙인다. 형식: `https://3iai.atlassian.net/browse/{TICKET}` (예: `https://3iai.atlassian.net/browse/PVPLUS-0000`). 본문 불릿과 빈 줄 한 칸으로 구분. 브랜치에 티켓이 없으면 추가하지 않는다.
   - 예시 (티켓 브랜치가 아닐 때):
     ```
     chore: Add gitignore for editor noise

     - Exclude .obsidian/ (Obsidian vault config)
     - Exclude .codex/ (local Codex project state)
     ```
   - 예시 (브랜치명이 `feature/PVPLUS-0000-...`처럼 티켓을 포함할 때):
     ```
     feat: Add GPS tracking core

     - Introduce GpsTracker with foreground service lifecycle
     - Persist last known location to DataStore for cold start

     https://3iai.atlassian.net/browse/PVPLUS-0000
     ```
8. 버전 업데이트 커밋만 예외 형식 유지:
   ```
   🔖: Version Update X.Y.Z ( BUILDNUMBER )
   🔖: Version Update Debug X.Y.Z ( BUILDNUMBER )
   ```
   이 형식은 **버전 bump 외 다른 변경에는 쓰지 않는다**.
9. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 스킬 실행 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 이 스킬은 **스테이징을 하지 않는다**. `git add` / `git rm` / `git restore --staged` 어느 것도 호출하지 않는다.
- `Co-Authored-By` 푸터는 자동 추가하지 않는다.
- 스테이징된 변경이 0개면 커밋하지 않는다.
- 사용자 확인 없이 커밋하지 않는다.
- 스테이징된 파일에 비밀값/키/인증 파일이 섞여 있으면 거부한다.
- pre-commit 훅을 우회하지 않는다 (`--no-verify`, `--no-gpg-sign`). 사용자 명시 요청 시에만 예외.
- `--amend`로 실패한 훅을 덮지 않는다.
- 이 스킬로 push 하지 않는다.
- Conventional Commits 형식을 지킨다 (이모지 prefix는 버전 업데이트 외 금지).
- `AGENTS.md` / `CONTRIBUTING.md` 위반은 고치지 않고 사용자에게 보고한다.
- 영어로 작성한다.

## 기본 규칙

- 한 커밋에 하나의 논리적 변경만 담는다. 분할은 사용자가 unstage 로 직접 한다.
- 스코프(`(scope)`)를 쓰지 않는다.
- 제목 첫 글자는 대문자로 쓴다. `chore: add ...`(소문자) 금지.
- 본문에 `-` 불릿 최소 한 줄을 둔다.
- `사용자 요청`가 주어져도 분석을 건너뛰지 않는다.
- 브랜치 이름에서 티켓(`[A-Z]+-\d+`)이 추출되면 본문 마지막 줄에 JIRA 링크(`https://3iai.atlassian.net/browse/{TICKET}`)를 붙인다. 티켓 없는 브랜치(`main`, `chore/...`)에서는 붙이지 않는다.
- 이슈 트래커 MCP 응답은 타입 결정에 참고만 한다.

## 마무리 규칙

- 검증: 스테이징 0건 / 비밀값 후보 / `AGENTS.md`·`CONTRIBUTING.md` 위반 / 다중 논리 단위 → `BLOCKED: <NO_STAGED|SECRETS|RULE_VIOLATION|MIXED_UNITS>`와 한 줄 사유로 종료.
- 보고: diff 본문·MCP raw 응답·중간 추론은 출력하지 않는다.

## 리턴 형식

```
<type>: <제목>

- <본문 불릿 1>
- <본문 불릿 2, 선택>

[티켓 브랜치인 경우만:
https://3iai.atlassian.net/browse/<TICKET>]

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 현재 Codex 세션이 위 메시지 그대로 HEREDOC으로 `git commit` 실행. pre-commit 훅 실패 시 근본 원인 보고 후 멈춘다 (`--amend` 금지).
