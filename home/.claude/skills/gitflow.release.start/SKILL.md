---
name: gitflow.release.start
description: git flow release 브랜치를 새로 만듭니다. stage에서 release/{VERSION}을 분기하고, 버전 파일을 갱신한 뒤 버전 bump 커밋을 만들고 리모트에 푸시합니다. 사용자가 새 릴리즈를 시작하거나 코드프리즈에 들어갈 때 사용.
argument-hint: "[선택: 1.19.0 — 생략 시 다음 마이너 제안]"
model: haiku
context: fork
---

# 릴리즈 시작: $ARGUMENTS

`git flow release start` 흐름을 자동화합니다. 입력 버전은 `v` 없는 정규형(`1.19.0`)으로 다루고, 브랜치는 `release/{VERSION}` 형태로 만듭니다.

## 워크플로우

1. `git status` / `git branch --show-current` / `git fetch origin --tags` 병렬 실행으로 현재 상태 확인.
2. 현재 버전 읽기: `app/version.properties`(`VERSION_NAME`, `VERSION_CODE`) 우선, 없으면 `package.json`의 `version`.
3. 새 버전 결정:
   - `$ARGUMENTS`가 있으면 `v` 접두사 제거 후 `MAJOR.MINOR.PATCH` 검증.
   - 없으면 다음 마이너를 제안하고 사용자에게 확인.
   - 같거나 낮은 버전이면 멈춘다.
4. 사전 검증:
   - 워킹 트리 더러우면 멈춤.
   - 현재 브랜치가 stage가 아니면 `git checkout stage && git pull origin stage`.
   - `release/{VERSION}` 브랜치가 로컬/리모트 어디에든 있으면 멈춤.
5. 릴리즈 브랜치 생성:
   ```
   git flow release start {VERSION}
   ```
6. 버전 파일 업데이트 (발견된 것만, 그 외는 건드리지 않음):
   - `app/version.properties`: `VERSION_NAME={VERSION}`, `VERSION_CODE` +1.
   - `package.json`: `version`을 `{VERSION}`으로.
7. 커밋 & 푸시:
   ```
   git add app/version.properties   # 또는 package.json
   git commit -m "🔖: Version Update {VERSION} ( {VERSION_CODE} )"
   git push -u origin release/{VERSION}
   ```
   `package.json`만이면 메시지에서 `( {VERSION_CODE} )` 부분 생략.
8. 결과 보고: 새 브랜치명, 갱신된 버전, 커밋 SHA.

## 반드시 지킬 규칙

- 버전 파일 외 다른 파일을 수정하지 않는다 — 릴리즈 시작 커밋에 다른 변경이 섞이면 changelog가 오염된다.
- 같은 이름의 release 브랜치가 이미 있으면 덮어쓰지 않는다 — 다른 사람의 진행 중인 릴리즈일 수 있다.
- force push / 훅 우회를 쓰지 않는다 — 사용자가 명시 요청한 경우만 예외.
- 버전 다운그레이드/동일 버전을 허용하지 않는다 — semver 역행은 패키지 매니저·CI 캐시를 깬다.

## 기본 규칙

- 입력의 `v` 접두사는 제거해서 보관한다 — 내부적으로 항상 v 없는 형태(`1.19.0`)만 다룬다.
- 파일 안의 `VERSION_NAME` / `package.json` `version` 필드는 v 없이 저장한다 — semver 도구가 v 접두사를 파싱하지 못한다.
- 버전 bump 커밋은 `🔖:` 형식만 사용한다 — 이 프로젝트의 버전 업데이트 전용 컨벤션.
- CI/배포 트리거를 가정하지 않는다 — 후속 단계는 사용자에게 안내만.
