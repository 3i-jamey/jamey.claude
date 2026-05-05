---
name: 'gitflow-release-start'
description: 'git flow release 브랜치를 새로 만듭니다. stage에서 release/{VERSION}을 분기하고, 버전 파일을 갱신한 뒤 버전 bump 커밋을 만들고 리모트에 푸시합니다. 사용자가 새 릴리즈를 시작하거나 코드프리즈에 들어갈 때 사용.'
argument-hint: '[선택: 1.19.0 — 생략 시 다음 마이너 제안]'
model: 'haiku'
context: 'fork'
tools: 'Bash, Read, Edit'
---

# 릴리즈 시작: $ARGUMENTS

`git flow release start` 흐름을 자동화합니다. 입력 버전은 `v` 없는 정규형(`1.19.0`)으로 다루고, 브랜치는 `release/{VERSION}` 형태로 만듭니다.

## 워크플로우

1. `git status` / `git branch --show-current` / `git fetch origin --tags` 병렬 실행으로 현재 상태 확인.
2. 현재 버전 읽기: `app/version.properties`(`VERSION_NAME`, `VERSION_CODE`) 우선, 없으면 `package.json`의 `version`.
3. 새 버전 결정:
   - `$ARGUMENTS`가 있으면 `v` 접두사 제거 후 `MAJOR.MINOR.PATCH` 검증.
   - 없으면 다음 마이너를 제안 (사용자 확인은 리턴 형식에서 일괄 처리).
   - 같거나 낮은 버전이면 멈춘다.
4. 사전 검증:
   - 워킹 트리 더러우면 멈춤.
   - 현재 브랜치가 stage가 아니면 `git checkout stage && git pull origin stage`.
   - `release/{VERSION}` 브랜치가 로컬/리모트 어디에든 있으면 멈춤.
5. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 fork 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 버전 파일 외 다른 파일을 수정하지 않는다.
- 같은 이름의 release 브랜치가 있으면 덮어쓰지 않는다.
- force push / 훅 우회를 쓰지 않는다. 사용자가 명시 요청한 경우만 예외.
- 버전 다운그레이드/동일 버전을 허용하지 않는다.

## 기본 규칙

- 입력의 `v` 접두사는 제거해서 보관한다.
- 파일 안의 `VERSION_NAME` / `package.json` `version` 필드는 v 없이 저장한다.
- 버전 bump 커밋은 `🔖:` 형식만 사용한다.
- CI/배포 트리거를 가정하지 않는다. 후속 단계는 사용자에게 안내만.

## 마무리 규칙

- 검증: 워킹 트리 더러움 / 같은 release 브랜치 존재 / 버전 다운그레이드·동일 버전 → `BLOCKED: <DIRTY_TREE|BRANCH_EXISTS|INVALID_VERSION>`와 한 줄 사유로 종료.
- 보고: 현재 버전 추출 과정·검증 로그는 헤딩 위쪽에 두거나 출력 안 함. 부모로 흘리지 않는다.

## 리턴 형식

```
새 버전: <VERSION>
새 브랜치: release/<VERSION>
변경 파일: <app/version.properties 또는 package.json — VERSION_NAME / version 필드 갱신, VERSION_CODE +1>
커밋 메시지: 🔖: Version Update <VERSION> ( <VERSION_CODE> )

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 main session이 `git flow release start <VERSION>` → 버전 파일 수정 → `git add` + 커밋 → `git push -u origin release/<VERSION>` 순으로 실행. 새 브랜치명·갱신된 버전·커밋 SHA 보고.
