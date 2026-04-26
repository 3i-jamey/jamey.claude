---
name: github.pull-request
description: 작업 브랜치(feature/bugfix/refactor/hotfix)에 대해 통합 브랜치(stage)를 베이스로 하는 GitHub PR을 생성합니다. 브랜치 이름의 티켓 번호를 PR 제목·본문에 연결하고, push와 `gh pr create`까지 한 번에 처리합니다.
argument-hint: "[선택: base 브랜치 또는 PR 제목 힌트]"
model: sonnet
---

# Pull Request: $ARGUMENTS

기본 PR 흐름:
- **베이스 브랜치 = `stage`** (master/main은 release/hotfix 머지에서만 사용)
- 브랜치 이름의 티켓(`[A-Z]+-\d+`)을 PR 제목·본문에 자연스럽게 노출

## 워크플로우

1. 병렬로 실행:
   - `git status` (미커밋 작업 확인)
   - `git branch --show-current`
   - `git fetch origin` (베이스 최신 확인용)
   - `git log origin/stage..HEAD --oneline` (이 브랜치의 커밋, 베이스가 사용자 지정이면 해당 베이스 사용)
   - `git diff origin/stage...HEAD` (브랜치 전체 diff)
2. 워킹 트리에 미커밋 변경이 있으면 거부 — 커밋하거나 stash 하라고 요청합니다.
3. 현재 브랜치 이름에서 메타데이터 추출:
   - `feature/<TICKET>-...` 또는 `bugfix/<TICKET>-...` → 티켓 번호 확보
   - `refactor/...`, `hotfix/...` → 티켓 없을 수도 있음, 있으면 본문에 명시
4. 브랜치의 **모든** 커밋을 분석합니다. 최신 커밋만 보지 않습니다 — 요약은 전체 범위를 다뤄야 합니다.
5. PR 초안 작성:
   - **제목** 70자 이내, 명령형, 첫 글자 대문자, 마침표 없음. 스코프(`(scope)`)는 사용하지 않습니다. 티켓이 있으면 **`[<TICKET>]` 대괄호 prefix**로 시작.
     형식 예:
     - `[<TICKET>] feat: Add GPS tracking core`
     - `[<TICKET>] fix: Remove dog from tracking mode bottom sheet`
     - `[<TICKET>] fix: Pixel 10 crash from GPU accelerator`
     - 티켓이 없으면 prefix 없이 conventional commit 형식만 사용: `refactor: Split lesson logger interface`
   - **본문** 구조 (HEREDOC 본문 그대로 사용):
     ```
     ## Summary
     - <무엇이 왜 바뀌었는지 1–3 bullet>
     - <티켓 작업 컨텍스트, 있다면>

     ## Test plan
     - [ ] <어떻게 검증할지>
     - [ ] <엣지 케이스>
     - [ ] 로컬 테스트 스위트 통과 (해당 프로젝트의 테스트 명령으로)
     ```
6. 베이스 브랜치 결정:
   - `$ARGUMENTS`에 베이스가 명시(`master`, `main`, `release/X.Y.Z`)되면 그것 사용
   - 그 외는 **`stage`** 기본값
   - hotfix 브랜치라도 별도 지시 없으면 stage가 안전한 기본값입니다 (master 직접 PR은 매우 드묾)
7. 업스트림이 없는 브랜치면 push:
   ```
   git push -u origin <branch>
   ```
8. HEREDOC 본문으로 PR 생성:
   ```
   gh pr create --base stage --title "<제목>" --body "$(cat <<'EOF'
   ## Summary
   ...

   ## Test plan
   - [ ] ...
   EOF
   )"
   ```
9. 생성된 PR URL을 보고합니다.

## 반드시 지킬 규칙

- 베이스 기본값은 `stage`다. 사용자가 명시적으로 다른 베이스를 지정하지 않는 한 master/main에 PR을 만들지 않는다 — 잘못된 베이스 PR은 release 흐름 전체를 망칩니다.
- 사용자가 명시적으로 요청하지 않는 한 force-push 하지 않는다. 베이스 브랜치(stage/master/release/*)에는 어떤 경우에도 force-push 금지 — 다른 사람의 작업을 덮어쓸 수 있습니다.
- PR을 ready로 전환하거나 merge/close 하지 않는다 — PR 라이프사이클은 사용자 결정입니다.
- 제목과 요약이 애매하면 확인 없이 사용자 대신 PR을 만들지 않는다 — PR은 다른 사람에게 보이는 산출물입니다.

## 기본 규칙

- 사용자가 요청하지 않는 한 라벨, 리뷰어, 마일스톤, assignee를 추가하지 않는다 — 팀의 자동화·routing 룰을 흐트러뜨릴 수 있습니다.
- 브랜치 이름에 티켓 번호가 있는데 본문에 누락되면 자동으로 한 줄 추가한다 (`Related: <TICKET>`) — 트래커 연결은 PR의 핵심 가치입니다.
- submodule pointer 변경이 포함되면 본문 Test plan에 `git submodule status` 확인 항목을 추가한다 — 잘못 머지되면 다른 사람 환경에서 빌드가 깨집니다.
