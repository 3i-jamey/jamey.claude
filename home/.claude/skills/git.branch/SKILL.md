---
name: git.branch
description: 이슈 티켓을 기준으로 일관된 이름의 새 git 브랜치를 통합 브랜치(stage)에서 생성합니다. 새 작업을 시작할 때 사용 — 티켓 번호와 종류(task/bug/refactor/hotfix)를 받아 컨벤션에 맞는 슬러그를 만들고 stage 최신본에서 분기합니다.
argument-hint: "[<TICKET>] [task|bug|refactor|hotfix] [작업 요약]"
model: sonnet
context: fork
---

# 브랜치: $ARGUMENTS

이슈 트래커에서 발행된 티켓을 기준으로 브랜치를 따는 워크플로우입니다. 베이스 브랜치는 항상 **`stage`** 입니다 (`master`/`main`은 프로덕션이라 분기 대상 아님).

## 워크플로우

1. `git status`와 `git branch --show-current`로 현재 상태 확인.
2. 미커밋 변경이 있으면 멈추고 stash / commit / 중단 중 어떻게 할지 사용자에게 물어봅니다.
3. `$ARGUMENTS`에서 세 가지 추출:
   - **티켓 번호** — `[A-Z]+-\d+` 형태 (예: `PROJ-1234`). task/bug에서 누락이면 사용자에게 묻습니다.
   - **종류** — 이슈 타입에 따라:
     - `task` → `feature/`
     - `bug` → `bugfix/`
     - `refactor` → `refactor/` (티켓 없는 정리 작업도 허용)
     - `hotfix` → `hotfix/` (긴급 프로덕션 수정)
   - **요약** — 티켓 타이틀에서 추출한 영어 단어 2~5개.
4. 슬러그 규칙:
   - lowercase, kebab-case, 영어만
   - 관사(`the/a/an`)·전치사·중복 단어 제거
   - 같은 의미면 짧게: `implement`/`add` 등 동사는 보통 생략 가능
   - 30자 이내 권장
5. 최종 브랜치 이름 조합:
   ```
   feature/<TICKET>-<slug>
   bugfix/<TICKET>-<slug>
   refactor/<TICKET>-<slug>     // 티켓 있을 때
   refactor/<slug>               // 티켓 없는 정리 작업
   hotfix/<slug>                 // 긴급 핫픽스
   ```
6. stage 최신본에서 분기:
   ```
   git fetch origin
   git checkout -b <branch> origin/stage
   ```
7. `git status`로 확인 후 새 브랜치 이름과 베이스 SHA를 보고합니다.

## 반드시 지킬 규칙

- 베이스는 항상 `stage`에서 분기한다 — master/main은 프로덕션이라 작업 분기 대상이 아니고, 다른 feature 브랜치에서 따면 머지 시 의도치 않은 변경이 섞입니다.
- task/bug 작업에는 티켓 번호를 요구한다 — 트래커와 코드 추적성이 깨지면 후속 히스토리 조사가 불가능해집니다.
- 같은 이름의 기존 브랜치는 강제 리셋하지 않는다 — 사용자의 미완료 작업일 수 있습니다. 슬러그 변형(`-v2`, 더 구체적 단어)이나 사용자 확인을 먼저 받습니다.
- 자동 push 하지 않는다 — 첫 push는 사용자 결정 또는 PR 생성 시점입니다.

## 기본 규칙

- 슬러그가 길어지면 뒤쪽 단어부터 자른다 — 앞 단어가 보통 더 구체적이라 의미를 덜 잃습니다.
- 티켓이 정말 없는 task/bug라면 `refactor/`나 `hotfix/`로 재분류 가능한지 먼저 확인한다 — task/bug 라벨은 티켓 추적성을 전제로 합니다.

## 예시

- 입력: "Implement GPS tracking core logic"
  출력: `gps-tracking-core`
- 입력: "Remaining Storage Popup"
  출력: `remaining-storage-popup`
- 입력: "Pixel 10 crash on launch"
  출력: `pixel10-crash`
- 입력: "Guest control enable issue"
  출력: `guest-control-enable`
