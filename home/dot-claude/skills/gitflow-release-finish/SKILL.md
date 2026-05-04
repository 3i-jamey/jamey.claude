---
name: gitflow-release-finish
description: git flow 릴리즈 브랜치를 마무리합니다. release/{VERSION}을 master와 stage에 머지하고 버전 태그를 만든 뒤 리모트로 푸시합니다. 사용자가 릴리즈를 닫거나 배포 직전 마무리를 요청할 때 사용.
argument-hint: "[선택: 1.19.0 — 생략 시 현재 release 브랜치 자동 감지]"
model: haiku
context: fork
tools: Bash, Read
---

# 릴리즈 마무리: $ARGUMENTS

`git flow release finish` 흐름을 자동화합니다. **머지 → 태깅 → 푸시 → 보고**를 한 턴에 처리하고, 충돌이나 위험 신호가 보이면 즉시 멈춥니다.

## 워크플로우

1. `git status` / `git branch --show-current` / `git fetch origin --tags` 병렬 실행으로 현재 상태 확인.
2. 버전 결정 (정규화 결과는 v 없는 형태):
   - `$ARGUMENTS`가 있으면 `v` 제거.
   - 없으면 현재 브랜치가 `release/*`인지 확인 후 거기서 추출.
   - 모호하면 `git branch --list 'release/*'`로 후보 보여주고 확인.
3. 사전 검증:
   - 워킹 트리 더러우면 멈춤.
   - `release/{VERSION}` 브랜치가 로컬에 있는지 확인. origin에만 있으면 체크아웃.
   - 태그 `v{VERSION}`이 있으면 멈춤.
4. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 fork 종료.

## 반드시 지킬 규칙

- 머지 충돌이 발생하면 중단하고 충돌 파일을 보고한다.
- 태그가 있으면 덮어쓰지 않는다.
- force push / 훅 우회를 쓰지 않는다. 사용자가 명시 요청한 경우만 예외.
- 워킹 트리가 더러운 상태로 진행하지 않는다.
- 리모트 `release/*` 브랜치를 자동 삭제하지 않는다.

## 기본 규칙

- 입력의 `v` 접두사는 제거해서 보관한다.
- master/stage 동기화는 fast-forward만. fast-forward 불가면 사용자에게 보고.
- 푸시는 master → stage → tags 순.
- 릴리즈 노트/changelog를 자동 편집하지 않는다.

## 마무리 규칙

- 검증: 워킹 트리 더러움 / 태그 `v{VERSION}` 존재 / master·stage fast-forward 불가 / 머지 충돌 가능성 → `BLOCKED: <DIRTY_TREE|TAG_EXISTS|NON_FF|MERGE_CONFLICT_RISK>`와 한 줄 사유로 종료.
- 보고: 검증 로그·차이 요약은 헤딩 위쪽에 두거나 출력 안 함. 부모로 흘리지 않는다.

## 리턴 형식

```
버전: <VERSION>
태그: v<VERSION>
머지 흐름: release/<VERSION> → master, → stage
푸시 순서: master → stage → tags
master/stage fast-forward 동기화 필요 여부: <yes|no>

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 main session이 (필요 시 master/stage fast-forward) → `git flow release finish <VERSION> -m "v<VERSION>"` → `git push origin master` → `git push origin stage` → `git push origin --tags` 실행. 머지 충돌 발생 시 즉시 중단·충돌 파일 보고. 머지된 브랜치/SHA, 태그, 리모트 release 브랜치 삭제 여부 안내(자동 삭제 안 함). UI 파일(`*Fragment.kt`·`*Activity.kt`·`*Screen.kt`·`*Body.kt`·`*Container.kt`·`*Dialog.kt`) 포함 시 화면 문서 업데이트 필요 여부 안내.
