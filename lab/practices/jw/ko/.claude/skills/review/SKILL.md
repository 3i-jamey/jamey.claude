---
name: review
description: 최근 변경된 코드의 아키텍처 준수, 컨벤션 준수, Spec 일치를 검토. 구현 단계 완료 후 사용.
disable-model-invocation: true
argument-hint: "[step-name or file-list]"
---

# Code Review: $ARGUMENTS

## 워크플로우

**Agent — code-review** (Explore):
`.claude/agents/workflow/code-review.md`의 지시를 읽고 실행.

대상 파일: $ARGUMENTS
특정 파일이 주어지지 않으면, 현재 구현 단계에서 변경된 모든 파일을 검토.

## 리뷰 후

1. 리뷰 결과 표시 (PASS / FAIL / PASS WITH FLAGS)
2. 이슈가 발견되면 심각도와 파일 위치와 함께 나열
3. 자동 수정하지 말 것 — 발견사항을 제시하고 사용자 결정을 기다림
