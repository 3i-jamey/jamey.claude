---
name: design
description: 디자인 패널을 호출해 Spec 토픽을 다관점 전문가 시점에서 검토. 디자인 대화 중 사용.
disable-model-invocation: true
argument-hint: "[topic or Spec section to review]"
---

# Design Review: $ARGUMENTS

## 워크플로우

### Step 1: 컨텍스트 수집

1. `$ARGUMENTS`가 특정 Spec 파일/섹션을 가리키면 읽는다.
2. 대화 토픽이라면, 이번 세션의 핵심 디자인 결정을 추출한다.
3. `.claude/memory/architecture.md`를 읽어 기존 시스템 컨텍스트를 파악.

### Step 2: 디자인 패널 리뷰

**Agent — design-review** (Plan):
`.claude/agents/workflow/design-review.md`의 지시를 읽고 실행.
토픽/Spec 섹션과 관련 컨텍스트를 입력으로 제공.

### Step 3: 결과 제시

사용자에게 보여줄 것:
1. 개별 전문가 의견 (verdict + 핵심 포인트만, 전체 리포트 아님)
2. 패널 종합 (consensus, tensions, priority recommendations)
3. 사용자 결정이 필요한 미해결 질문

권고를 자동 적용하지 말 것. 무엇을 수용할지는 사용자가 결정한다.
