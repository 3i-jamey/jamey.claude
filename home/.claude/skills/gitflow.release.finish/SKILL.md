---
name: gitflow.release.finish
description: git flow 릴리즈 브랜치를 마무리합니다. release/{VERSION}을 master와 stage에 머지하고 버전 태그를 만든 뒤 리모트로 푸시합니다. 사용자가 릴리즈를 닫거나 배포 직전 마무리를 요청할 때 사용.
argument-hint: "[선택: 1.19.0 — 생략 시 현재 release 브랜치 자동 감지]"
model: haiku
context: fork
---

# 릴리즈 마무리: $ARGUMENTS

`git flow release finish` 흐름을 자동화합니다. **머지 → 태깅 → 푸시 → 보고**를 한 턴에 처리하고, 충돌이나 위험 신호가 보이면 즉시 멈춥니다.

## 워크플로우

1. `git status` / `git branch --show-current` / `git fetch origin --tags` 병렬 실행으로 현재 상태 확인.
2. 버전 결정 (정규화 결과는 v 없는 형태):
   - `$ARGUMENTS`가 있으면 `v` 제거.
   - 없으면 현재 브랜치가 `release/*`인지 확인 → 거기서 추출.
   - 모호하면 `git branch --list 'release/*'`로 후보 보여주고 사용자에게 확인.
3. 사전 검증:
   - 워킹 트리 더러우면 멈춤.
   - `release/{VERSION}` 브랜치가 로컬에 있는지 확인. origin에만 있으면 체크아웃.
   - 태그 `v{VERSION}`이 이미 있으면 멈춤.
   - master/stage에 origin 변경이 있으면 사용자 동의 후 fast-forward 동기화.
4. 마무리 실행:
   ```
   git flow release finish {VERSION} -m "v{VERSION}"
   ```
   자동으로: `release/{VERSION}` → master 머지, 태그 생성, → stage 머지, 로컬 release 브랜치 삭제.
5. 푸시 (순차):
   ```
   git push origin master
   git push origin stage
   git push origin --tags
   ```
6. 결과 보고: 머지된 브랜치/SHA, 생성된 태그, 현재 브랜치, 리모트 release 브랜치 삭제 여부 안내(자동 삭제 안 함). UI 파일(`*Fragment.kt`·`*Activity.kt`·`*Screen.kt`·`*Body.kt`·`*Container.kt`·`*Dialog.kt`)이 포함됐다면 화면 문서 업데이트 필요 여부 안내.

## 반드시 지킬 규칙

- 머지 충돌이 발생하면 즉시 중단하고 충돌 파일을 보고한다 — 릴리즈 머지 충돌은 도메인 판단이 필요해 자동 해결하지 않는다.
- 태그가 이미 존재하면 덮어쓰지 않는다 — 배포 추적성·롤백 기준이 깨진다.
- force push / 훅 우회를 쓰지 않는다 — 사용자가 명시 요청한 경우만 예외.
- 워킹 트리가 더러운 상태로 진행하지 않는다 — 머지 도중 의도치 않은 변경이 섞인다.
- 리모트 `release/*` 브랜치를 자동 삭제하지 않는다 — CI/리뷰 메타데이터가 남아 있을 수 있다.

## 기본 규칙

- 입력의 `v` 접두사는 제거해서 보관한다 — 내부적으로 항상 v 없는 형태만 다룬다.
- master/stage 동기화는 fast-forward만 — 머지 커밋이 새로 생기면 release 머지 그래프가 지저분해진다. fast-forward 불가면 사용자에게 보고.
- 푸시는 master → stage → tags 순 — 태그가 master 도달 전에 공개되면 CI 트리거가 비정상 상태에서 돈다.
- 릴리즈 노트/changelog를 자동 편집하지 않는다 — 별도 스킬의 책임.
