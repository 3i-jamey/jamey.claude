---
name: git.branch
description: 이슈 티켓을 기준으로 일관된 이름의 새 git 브랜치를 통합 브랜치에서 생성합니다. 새 작업을 시작할 때 사용 — 티켓 번호와 종류(task/bug/refactor/hotfix)를 받아 컨벤션에 맞는 슬러그를 만들고 통합 브랜치 최신본에서 분기합니다.
argument-hint: "[<TICKET>] [task|bug|refactor|hotfix] [작업 요약]"
model: haiku
context: fork
---

# 브랜치: $ARGUMENTS

이슈 트래커 티켓을 기준으로 브랜치를 따는 워크플로우입니다. 베이스는 팀의 **통합 브랜치**(보통 `stage`/`develop`. `master`/`main`은 프로덕션이라 분기 대상 아님)이고, 프로젝트별로 어느 이름을 쓰는지 자동 감지합니다.

## 워크플로우

1. 병렬로 실행:
   - `git status` (미커밋 변경 확인)
   - `git branch --show-current` (현재 브랜치)
   - `git branch -r --list 'origin/stage' 'origin/develop' 'origin/main' 'origin/master'` (통합 브랜치 후보 확인)
2. **베이스 브랜치 결정**: `CLAUDE.md` / `CONTRIBUTING.md`에 명시된 통합 브랜치가 있으면 그것을, 없으면 `stage` → `develop` 순으로 첫 존재하는 것을 사용. 둘 다 없으면 사용자에게 물어봅니다.
3. 미커밋 변경이 있으면 멈추고 stash / commit / 중단 중 어떻게 할지 사용자에게 물어봅니다.
4. `$ARGUMENTS`에서 세 가지 추출:
   - **티켓 번호** — `[A-Z]+-\d+` 형태(예: `PROJ-1234`). 숫자만 들어오면 현재 디렉토리의 기존 브랜치/커밋에서 가장 흔한 prefix를 추론하거나 사용자에게 묻습니다. task/bug에서 누락되면 사용자에게 묻습니다.
   - **종류** — 이슈 타입에 따라:
     - `task` / `story` / `feature` → `feature/`
     - `bug` → `bugfix/`
     - `refactor` → `refactor/` (티켓 없는 정리 작업도 허용)
     - `hotfix` → `hotfix/` (긴급 프로덕션 수정)
   - **요약** — 티켓 타이틀에서 추출한 영어 단어 2~5개.
5. **기존 슬러그 재사용 시도** — 같은 티켓 번호로 시작하는 디렉토리/문서/브랜치가 이미 있으면 그 슬러그를 우선 사용해 일관성을 유지합니다:
   - `git branch -a --list "*<TICKET>*"` 로 과거/원격 브랜치 확인
   - 프로젝트의 docs/notes 디렉토리에서 `<TICKET>-*` 폴더 검색
   - 발견 시: 해당 슬러그를 그대로 채택하고 prefix만 이슈 타입에 맞게 결정
6. 슬러그가 없으면 `string.short.kebabcase` 스킬을 호출해 티켓 타이틀/요약에서 슬러그를 생성한다. 슬러그 규칙(3~4단어, 관사·전치사 제거, kebab-case 정규화 등)은 그 스킬에서 단일 출처로 관리하므로 여기서 다시 정의하지 않는다.
7. **이슈 트래커 자동 조회(가능하면)** — Atlassian/Linear/GitHub 등 MCP 도구가 활성화되어 있으면 티켓 정보(summary, issuetype)를 가져와 슬러그·prefix 결정에 활용합니다. 실패하면 사용자에게 직접 묻습니다.
8. 최종 브랜치 이름 조합:
   ```
   feature/<TICKET>-<slug>
   bugfix/<TICKET>-<slug>
   refactor/<TICKET>-<slug>     // 티켓 있을 때
   refactor/<slug>               // 티켓 없는 정리 작업
   hotfix/<slug>                 // 긴급 핫픽스
   ```
9. **사용자 확인** — 최종 브랜치명을 보여주고 확인을 받습니다. 자동 생성 금지.
10. 통합 브랜치 최신본에서 분기:
    ```bash
    git fetch origin
    git checkout -b <branch> origin/<integration-branch>
    ```
11. `git status`로 확인 후 새 브랜치 이름과 베이스 SHA를 보고합니다.

## 반드시 지킬 규칙

- 베이스는 팀의 통합 브랜치(`stage`/`develop` 등)에서 분기한다 — `master`/`main`은 프로덕션이라 작업 분기 대상이 아니고, 다른 feature 브랜치에서 따면 머지 시 의도치 않은 변경이 섞입니다.
- 통합 브랜치 이름은 프로젝트마다 다르므로 자동 감지하거나 사용자에게 묻는다 — 한 팀의 컨벤션을 모든 레포에 강제하면 다른 팀 워크플로우가 깨집니다.
- 사용자 확인 없이 브랜치를 만들지 않는다 — 슬러그·prefix 추론이 틀렸을 때 자동 생성하면 잘못된 이름이 굳어집니다.
- task/bug 작업에는 티켓 번호를 요구한다 — 트래커와 코드 추적성이 깨지면 후속 히스토리 조사가 불가능해집니다.
- 같은 이름의 기존 브랜치는 강제 리셋하지 않는다 — 사용자의 미완료 작업일 수 있습니다. 슬러그 변형(`-v2`, 더 구체적 단어)이나 사용자 확인을 먼저 받습니다.
- 자동 push 하지 않는다 — 첫 push는 사용자 결정 또는 PR 생성 시점입니다.

## 기본 규칙

- 같은 티켓의 기존 슬러그가 디렉토리/브랜치에 있으면 그것을 재사용한다 — 일관성을 유지해 추적·검색이 쉬워집니다.
- 슬러그가 길어지면 뒤쪽 단어부터 자른다 — 앞 단어가 보통 더 구체적이라 의미를 덜 잃습니다.
- 티켓이 정말 없는 task/bug라면 `refactor/`나 `hotfix/`로 재분류 가능한지 먼저 확인한다 — task/bug 라벨은 티켓 추적성을 전제로 합니다.
- 이슈 트래커 MCP가 있으면 자동 조회를 시도하고 실패하면 조용히 사용자 입력으로 폴백한다 — 추가 입력 부담을 줄이지만 도구 의존을 강제하진 않습니다.

## 예시

- 입력: "PROJ-1234 task Implement GPS tracking core logic"
  출력: `feature/PROJ-1234-gps-tracking-core`
- 입력: "PROJ-2001 bug Pixel 10 crash on launch"
  출력: `bugfix/PROJ-2001-pixel10-crash`
- 입력: "refactor Remaining Storage Popup"
  출력: `refactor/remaining-storage-popup`
- 입력: "hotfix Login token refresh fails"
  출력: `hotfix/login-token-refresh`
