---
name: git.commit
description: Conventional Commits 형식으로 적절한 파일만 스테이징하고 목적이 명확한 커밋을 생성합니다. 사용자가 커밋을 요청하거나 하나의 논리적 작업 단위가 끝났을 때 사용.
argument-hint: "[선택: 범위 힌트 또는 메시지 지정]"
model: sonnet
---

# 커밋: $ARGUMENTS

**Conventional Commits**(`<type>: <subject>`)를 따릅니다. 스코프(`(scope)`)는 사용하지 않습니다 — 영역은 제목의 평문으로 드러냅니다. 옛 이모지 prefix(`✨ 🐛 💄`)도 사용하지 않습니다 — **단, 버전 업데이트 커밋만** `🔖:` 형식을 유지합니다.

## 워크플로우

1. 병렬로 실행:
   - `git status` (추적/미추적 변경 확인)
   - `git diff` (스테이징 안 된 변경)
   - `git diff --cached` (이미 스테이징된 변경)
   - `git log -n 10 --oneline` (최근 스타일 재확인)
   - `git branch --show-current` (티켓 컨텍스트)
2. 변경사항을 **하나의 논리적 단위**로 묶습니다. 관련 없는 여러 관심사가 섞여 있으면 멈추고 분리 여부를 사용자에게 묻습니다.
3. 파일은 경로를 명시해서 스테이징합니다.
4. 비밀값으로 보이는 파일(`.env`, `local.properties`, `credentials*`, `*.pem`, `*.key`, 토큰 패턴)은 거부하고 사용자에게 경고합니다.
5. `CLAUDE.md` / `CONTRIBUTING.md`에 명시된 아키텍처·코딩 규칙(레이어/모듈 위치, 비동기/동시성, null 안전성, 라이프사이클, 의존 방향 등)을 이번 변경이 위반하면 멈추고 사용자에게 보고합니다.
6. 커밋 메시지 작성:
   - **타입(필수):** `feat` / `fix` / `refactor` / `chore` / `docs` / `style` / `test` / `perf` / `build` / `ci`
   - **스코프 사용 안 함** — 영역(`gps`, `domain` 등)은 제목 본문의 평문으로 드러냅니다. `feat(gps): ...` 대신 `feat: Add GPS tracking core`.
   - **설명:** 명령형이지만 **첫 글자는 대문자**(`Add`, `Fix`, `Refactor` — `added`/`fixed` 아님), 72자 이내, 마침표 없음
   - **본문(필수):** 제목과 빈 줄로 구분 후 **`-` 불릿 한 줄 이상**으로 *무엇/왜*를 적는다. 단순 변경도 한 줄은 남긴다.
   - 예시:
     ```
     chore: Add gitignore for editor noise

     - Exclude .obsidian/ (Obsidian vault config)
     - Exclude .claude/ (local Claude Code project state)
     ```
7. 버전 업데이트 커밋만 예외 형식 유지:
   ```
   🔖: Version Update X.Y.Z ( BUILDNUMBER )
   🔖: Version Update Debug X.Y.Z ( BUILDNUMBER )
   ```
   이 형식은 **버전 bump 외 다른 변경에는 쓰지 않습니다**.
8. HEREDOC으로 커밋:
   ```
   git commit -m "$(cat <<'EOF'
   <type>: <제목>

   - <본문 불릿 1>
   - <본문 불릿 2, 선택>
   EOF
   )"
   ```
9. pre-commit 훅이 실패하면: 근본 원인 수정 → 재스테이징 → **새 커밋**.
10. 결과 커밋 SHA와 짧은 메시지를 보고합니다.

## 반드시 지킬 규칙

- 한 커밋에 하나의 논리적 변경만 담는다 — 섞이면 리뷰·revert·히스토리 조사가 모두 어려워집니다.
- Conventional Commits 형식을 지킨다 (이모지 prefix는 버전 업데이트 외 금지) — 자동화·체인지로그가 형식에 의존합니다.
- 스코프(`(scope)`)를 쓰지 않는다 — 영역은 제목 평문으로 충분히 드러나고, 스코프 표기 변형이 누적되면 일관성이 깨집니다.
- 제목 첫 글자는 대문자로 쓴다 — 팀 로그 스타일 일관성. `chore: add ...`(소문자) 금지.
- 본문에 `-` 불릿 최소 한 줄을 둔다 — 제목만으로는 *왜*가 빠집니다. `git log --oneline`이 아닌 `git show`를 보는 사람을 위한 정보입니다.
- 비밀값/키/인증 파일은 거부한다 — 한 번 푸시되면 회수가 어렵고 회전 비용이 큽니다.
- `git add -A` / `git add .`을 쓰지 않는다 — 비밀값·생성 파일·관련 없는 WIP가 함께 들어갈 위험.
- pre-commit 훅을 우회하지 않는다 (`--no-verify`, `--no-gpg-sign`) — 사용자가 명시 요청한 경우만 예외. 훅은 팀의 안전장치입니다.
- `--amend`로 실패한 훅을 덮지 않는다 — 훅 실패 시 커밋이 안 만들어졌으므로 amend는 *직전* 커밋을 수정합니다. 새 커밋을 만들어야 합니다.
- `CLAUDE.md` / `CONTRIBUTING.md` 위반은 자동으로 고치지 않고 사용자에게 보고한다 — 위반의 의도성·우선순위는 사용자가 판단할 영역입니다.

## 기본 규칙

- 이 스킬로 push 하지 않는다 — 커밋과 공개는 별개의 결정입니다.
- `$ARGUMENTS`가 주어져도 분석을 건너뛰지 않는다 — 사용자가 준 메시지가 실제 변경과 어긋날 수 있습니다.
- 브랜치 이름의 티켓 번호(`[A-Z]+-\d+`)를 메시지에 자동 삽입하지 않는다 — 보통 PR 메타데이터에 이미 들어가는 정보입니다. 스코프·본문에서 자연스러울 때만 언급.
