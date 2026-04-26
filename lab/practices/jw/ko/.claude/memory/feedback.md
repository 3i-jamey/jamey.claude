---
name: 사용자 피드백 및 워크플로우 선호도
description: Claude가 작업에 어떻게 접근해야 하는지에 대한 통합 피드백 — 자율성, 의견, 워크플로우 스타일
type: feedback
---

## 단계별 승인 받지 말 것
phase 단계 사이에서 사용자 승인을 기다리지 않는다. 모든 단계를 순차 실행하고 끝에서 보고한다.

**Why:** 단계별 승인은 구현을 불필요하게 느리게 만든다.
**How to apply:** phase 프롬프트를 실행할 때 멈추지 않고 모든 단계를 끝까지 진행. 에러나 모호함으로 막혔을 때만 정지.

## 아키텍처적 의견을 공유할 것
Spec 변경을 검토할 때 (예: `/new-phase` 중) 사실 보고만 하지 말고 의견이 담긴 개인 분석 섹션을 포함한다.

**Why:** 잠재적 이슈, 트레이드오프, 디자인 우려를 구현에 들어가기 전에 잡아낸다.
**How to apply:** `.claude/agents/workflow/phase-planner.md`에 내장 — planner가 모든 phase 프롬프트 앞에 `## Claude's Opinion` 섹션을 출력한다.

## 메모리 파일은 프로젝트 .claude/memory/에
모든 메모리 파일은 프로젝트 레벨의 `.claude/memory/` 디렉토리에 둔다. 글로벌 `~/.claude/` 경로에는 절대 두지 않는다.

**Why:** 메모리를 프로젝트와 함께 두어 컴퓨터 간 동기화를 보장한다.
**How to apply:** 메모리 파일은 항상 `.claude/memory/`에 쓴다.

## 메모리 업데이트 전에 완료된 phase 프롬프트를 archive로
코드 리뷰가 통과한 후, phase 프롬프트를 `archive/`로 옮기고 phase 로그나 MEMORY.md 업데이트 전에 CLAUDE.md의 경로를 갱신한다.

**Why:** CLAUDE.md에 오래된 경로 참조가 남는 것을 방지한다.
**How to apply:** phase 후 워크플로우의 첫 액션은: 프롬프트를 `archive/`로 이동, CLAUDE.md 경로 갱신. 그다음 phase 로그와 메모리 업데이트.
