---
name: base-format
description: Codex용 SKILL.md를 새로 만들 때 사용하는 기준 템플릿입니다. 새 스킬의 frontmatter, 워크플로우, 규칙, 검증/보고 형식을 일관되게 잡아야 할 때 사용.
---

# Codex Skill Template

이 파일은 새 Codex 스킬을 만들 때 복사해서 쓰는 기준 템플릿입니다. 실제 스킬을 만들 때는 placeholder와 작성 안내를 모두 제거하고, 스킬이 실제로 필요한 절차와 규칙만 남깁니다.

## Frontmatter

Codex가 스킬을 발견하고 호출 판단에 쓰는 필드는 `name`과 `description`입니다. 추가 메타데이터가 필요하면 `metadata` 아래에 두되, 호출 판단에 기대지 않습니다.

```yaml
---
name: <skill-id>
description: <Codex가 이 스킬을 언제 사용해야 하는지 한 문장으로 설명>
metadata:
  short-description: <선택: UI에 표시할 짧은 설명>
---
```

## 본문 구조

```markdown
# <스킬 제목>

<이 스킬이 맡는 일과 입력을 해석하는 방식. 1-3문장.>

## 워크플로우

1. <첫 단계: 입력 확인 또는 필요한 컨텍스트 수집>
2. <핵심 처리>
3. <검증>
4. <결과 보고>

## 반드시 지킬 규칙

- <위반하면 중단해야 하는 규칙>
- <파괴적/위험한 행동의 확인 조건>

## 기본 규칙

- <명시적 사유가 없으면 따르는 기본 동작>
- <로컬 프로젝트 관례와 충돌할 때의 우선순위>

## 마무리 규칙

- 검증: <어떤 조건을 확인하고, 실패 시 어떻게 보고할지>
- 보고: <최종 응답에 포함할 내용과 생략할 raw 로그/중간 결과>
```

## 작성 원칙

- 스킬은 Codex가 이미 알고 있는 일반 지식보다, 이 프로젝트·팀·워크플로우에 특화된 절차를 담는다.
- `model`, `context`, `tools`, `argument-hint` 같은 Claude 전용 frontmatter는 쓰지 않는다.
- 다른 스킬을 언급할 때는 `$skill-name` 형식을 사용한다.
- 프로젝트 지침 파일은 `AGENTS.md`와 `CONTRIBUTING.md`를 우선 확인한다.
- MCP 도구 이름은 현재 Codex 환경의 실제 namespace를 사용한다. 예: Jira는 `mcp__jira__...`.
- 긴 참고자료, 예시, 스크립트는 필요할 때만 `references/`, `scripts/`, `assets/`에 분리한다.

## agents/openai.yaml

스킬 목록 UI에 표시할 정보가 필요하면 `agents/openai.yaml`을 추가합니다.

```yaml
interface:
  display_name: "<표시 이름>"
  short_description: "<25-64자 내외의 짧은 설명>"
  default_prompt: "Use $<skill-id> to <example task>."
```
