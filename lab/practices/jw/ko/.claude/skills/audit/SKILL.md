---
name: audit
description: 전체 프로젝트 헬스 감사 — Spec 동기화, 코드 일치, 메모리 신선도, 아키텍처 위반, 보류 작업.
disable-model-invocation: true
argument-hint: "[optional: focus area, e.g. 'auth' or 'database']"
---

# Project Audit: $ARGUMENTS

모든 프로젝트 레이어에 걸쳐 종합 헬스 체크 실행. `$ARGUMENTS`가 제공되면 그 영역에 집중. 아니면 전체 감사.

## 워크플로우

가능한 곳에서 다음 검사들을 병렬 실행 후 결과를 종합.

### 1. 상태 확인
다음 파일들을 읽고 현재 상태를 추출:
- `.claude/MEMORY.md` — 현재 phase, Spec 버전
- `.claude/memory/spec-tracking.md` — 마지막으로 검토된 Spec 버전
- `Documents/Spec/00_Changelog.md` — 최신 Spec 버전
- `Documents/Spec/00_IssueLog.md` — 활성 이슈

### 2. Spec ↔ 코드 동기화
**Explore** 에이전트 스폰:
- Spec 사양과 실제 코드 구현 비교
- 표시: spec에는 있지만 미구현, 구현되었지만 specced 안 됨, 값이 일치하지 않음
- 네이밍 확인: 코드의 클래스/메서드 이름이 Spec 용어와 일치하는가?

### 3. 아키텍처 리뷰
**Explore** 에이전트 스폰:
- CLAUDE.md 아키텍처 규칙을 코드베이스와 대조
- 관심사 분리 위반 (Input/Logic/Presentation 교차)
- 여러 서비스가 소유한 시스템
- N+1 쿼리, 무제한 fetch, 경계에서의 에러 처리 누락
- 지정된 패턴을 우회하는 시스템 간 통신

### 4. 메모리 신선도
- `MEMORY.md`의 Current State 줄이 실제 phase 표와 일치하는가?
- `memory/architecture.md`가 코드에 존재하는 시스템을 반영하는가?
- `memory/deferred.md`에 30일 넘은 항목이 있는가?
- `memory/lessons-learned.md`에 CLAUDE.md로 승격되어야 할 교훈 (3+ 발생)이 있는가?

### 5. 보류 작업
- 의존성이 충족되어 픽업할 수 있는 deferred 항목
- 마지막 검토 버전 이후 변경된 Spec 섹션
- `00_IssueLog.md`에서 처리되지 않은 오픈 이슈
- 코드베이스의 TODO/FIXME

## 출력 형식

```
# Project Audit Report

## Summary
Phase: [N] — [status]
Spec: v[current] (last reviewed: v[X]) [UP TO DATE / BEHIND BY N VERSIONS]
Active issues: [count]
Health: [GOOD / NEEDS ATTENTION / ACTION REQUIRED]

## Spec ↔ Code Sync
| Status | Item | Detail |
|--------|------|--------|
| DRIFT | [feature] | Spec says X, code does Y |
| UNIMPL | [feature] | Specced in Spec, not in code |
| UNDOC | [feature] | In code, not in Spec |

## Architecture Violations
- [SEVERITY] [file:line] — [violation description]

## Memory Health
- [STALE/OK] MEMORY.md — [detail]
- [STALE/OK] architecture.md — [detail]
- [ACTION] deferred.md — [N items older than 30 days]
- [ACTION] lessons-learned.md — [N candidates for promotion]

## Pending Work
- [N] deferred items ready for pickup
- [N] Spec versions behind
- [N] open issues
- [N] TODOs/FIXMEs in code

## Recommended Next Actions
1. [Most urgent action]
2. [Second priority]
3. [Third priority]
```

리포트는 간결하게. 문제를 표시하고, 자명한 수정은 설명하지 말 것.
