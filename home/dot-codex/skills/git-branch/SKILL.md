---
name: git-branch
description: 이슈 티켓을 기준으로 일관된 이름의 새 git 브랜치를 통합 브랜치에서 생성합니다. 새 작업을 시작할 때 사용. 티켓 번호와 종류(task/bug/refactor/hotfix)를 받아 컨벤션에 맞는 슬러그를 만들고 통합 브랜치 최신본에서 분기합니다.
---

# 브랜치: $ARGUMENTS

이슈 트래커 티켓을 기준으로 브랜치를 따는 워크플로우입니다. 베이스는 팀의 **통합 브랜치**(보통 `stage`/`develop`. `master`/`main`은 프로덕션이라 분기 대상 아님)이고, 프로젝트별로 어느 이름을 쓰는지 자동 감지합니다.

## 워크플로우

1. 병렬로 실행:
   - `git status` (미커밋 변경 확인)
   - `git branch --show-current` (현재 브랜치)
   - `git branch -r --list 'origin/stage' 'origin/develop' 'origin/main' 'origin/master'` (통합 브랜치 후보 확인)
2. **베이스 브랜치 결정**: `AGENTS.md` / `CONTRIBUTING.md`에 명시된 통합 브랜치가 있으면 그것을, 없으면 `stage` → `develop` 순으로 첫 존재하는 것을 사용. 둘 다 없으면 묻는다.
3. 미커밋 변경이 있으면 멈추고 stash / commit / 중단 중 어떻게 할지 묻는다.
4. `$ARGUMENTS`에서 세 가지 추출:
   - **티켓 번호**: `[A-Z]+-\d+` 형태(예: `PROJ-1234`). 숫자만 들어오면 현재 디렉토리의 기존 브랜치/커밋에서 가장 흔한 prefix를 추론하거나 묻는다. task/bug에서 누락되면 묻는다.
   - **종류**: 이슈 타입에 따라
     - `task` / `story` / `feature` → `feature/`
     - `bug` → `bugfix/`
     - `refactor` → `refactor/` (티켓 없는 정리 작업도 허용)
     - `hotfix` → `hotfix/` (긴급 프로덕션 수정)
   - **요약**: 티켓 타이틀에서 추출한 영어 단어 2~5개.
5. **기존 슬러그 재사용 시도**: 같은 티켓 번호로 시작하는 디렉토리/문서/브랜치가 있으면 그 슬러그를 우선 사용한다.
   - `git branch -a --list "*<TICKET>*"` 로 과거/원격 브랜치 확인
   - 프로젝트의 docs/notes 디렉토리에서 `<TICKET>-*` 폴더 검색
   - 발견 시 해당 슬러그를 그대로 채택하고 prefix만 이슈 타입에 맞게 결정
6. 슬러그가 없으면 `$string-short-kebabcase` 스킬을 사용해 티켓 타이틀/요약에서 슬러그를 생성한다. 슬러그 규칙(3~4단어, 관사·전치사 제거, kebab-case 정규화 등)은 그 스킬에서 단일 출처로 관리하므로 여기서 다시 정의하지 않는다.
7. **이슈 트래커 자동 조회**: Jira URL이 입력에 있으면 해당 hostname을 `cloudId`로 우선 시도하고, 없거나 실패하면 `mcp__jira__getAccessibleAtlassianResources`로 접근 가능한 Jira 리소스를 확인한다. `cloudId`가 결정되면 `mcp__jira__getJiraIssue`로 티켓 정보(summary, issuetype)를 가져와 슬러그·prefix 결정에 활용한다. 조회가 실패하거나 리소스가 모호하면 사용자 입력으로 폴백한다.
8. 최종 브랜치 이름 조합:
   ```
   feature/<TICKET>-<slug>
   bugfix/<TICKET>-<slug>
   refactor/<TICKET>-<slug>     // 티켓 있을 때
   refactor/<slug>               // 티켓 없는 정리 작업
   hotfix/<slug>                 // 긴급 핫픽스
   ```
9. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 스킬 실행을 마친다.

## 반드시 지킬 규칙

- 베이스는 팀의 통합 브랜치(`stage`/`develop` 등)에서 분기한다.
- 통합 브랜치 이름은 자동 감지하거나 묻는다.
- 새 브랜치는 통합 브랜치를 upstream으로 추적하지 않는다 (`--no-track` 필수).
- 사용자 확인 없이 브랜치를 만들지 않는다.
- task/bug 작업에는 티켓 번호를 요구한다.
- 같은 이름의 기존 브랜치는 강제 리셋하지 않는다. 슬러그 변형(`-v2`, 더 구체적 단어)이나 사용자 확인을 먼저 받는다.
- 자동 push 하지 않는다.
- 영어로 작성한다.

## 기본 규칙

- 같은 티켓의 기존 슬러그가 디렉토리/브랜치에 있으면 그것을 재사용한다.
- 슬러그가 길어지면 뒤쪽 단어부터 자른다.
- 티켓이 없는 task/bug라면 `refactor/`나 `hotfix/`로 재분류 가능한지 먼저 확인한다.
- 이슈 트래커 MCP 조회가 실패하면 사용자 입력으로 폴백한다.

## 마무리 규칙

- 검증: 통합 브랜치 미감지 / 미커밋 변경 잔존 / task·bug에 티켓 누락 / 같은 이름 브랜치 존재 → `BLOCKED: <NO_INTEGRATION_BRANCH|DIRTY_TREE|MISSING_TICKET|BRANCH_EXISTS>`와 한 줄 사유로 종료.
- 보고: 슬러그 후보·티켓 raw·기존 브랜치 검색 결과는 헤딩 위쪽에 두거나 출력 안 함. 최종 응답에 포함하지 않는다.

## 리턴 형식

```
베이스: <integration-branch>
브랜치명: <feature|bugfix|refactor|hotfix>/<TICKET>-<slug>

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 Codex 세션이 `git fetch origin && git checkout -b <브랜치명> --no-track origin/<베이스>` 실행. upstream 비어 있는지 `git branch -vv`로 확인 후 SHA와 브랜치명 보고.

## 예시

- 입력: "PROJ-1234 task Implement GPS tracking core logic"
  출력: `feature/PROJ-1234-gps-tracking-core`
- 입력: "PROJ-2001 bug Pixel 10 crash on launch"
  출력: `bugfix/PROJ-2001-pixel10-crash`
- 입력: "refactor Remaining Storage Popup"
  출력: `refactor/remaining-storage-popup`
- 입력: "hotfix Login token refresh fails"
  출력: `hotfix/login-token-refresh`
