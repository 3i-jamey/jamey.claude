---
name: 'base-format'
description: 'Codex용 SKILL.md 작성 템플릿입니다. 새 Codex skill을 만들거나 기존 Claude skill을 Codex 형식으로 옮길 때 name/description frontmatter와 본문 구조의 기준으로 사용합니다.'
---

# Codex Skill 템플릿

이 파일은 새 Codex skill을 만들 때 복사해서 쓰는 기준 템플릿입니다.
Codex는 frontmatter의 `name`과 `description`을 보고 skill 사용 여부를 판단하므로, 그 외 Claude 전용 필드는 넣지 않습니다.

## 작성 절차

1. 이 디렉터리를 복사해 `skills/<skill-id>/SKILL.md`를 만든다.
2. frontmatter의 `name`을 실제 skill 이름으로 바꾼다.
3. `description`에 무엇을 하는지와 언제 사용해야 하는지를 한 문장으로 적는다.
4. 본문에는 Codex가 실제 수행할 절차, 규칙, 출력 형식만 남긴다.
5. 새 skill에 필요하지 않은 섹션과 주석은 삭제한다.

## Frontmatter 규칙

- `name`과 `description`만 둔다.
- `name`은 kebab-case로 쓴다.
- `description`에는 트리거 조건을 반드시 포함한다.
- `argument-hint`, `model`, `context`, `tools` 같은 Claude 전용 필드는 쓰지 않는다.
- 도구 제약이 필요하면 frontmatter가 아니라 본문 규칙에 적는다.

## 본문 구조

필수 구조:

```markdown
# <자연어 제목>

<이 skill의 목적과 사용자 요청 해석 기준을 1~3문장으로 설명한다.>

## 워크플로우

1. <입력과 현재 상태를 확인한다.>
2. <작업을 수행한다.>
3. <검증한다.>
4. <결과를 보고한다.>

## 강제 규칙(!) : !는 IMPORTANT와 동일

- <반드시 지킬 규칙>
- <하지 말아야 할 행동>
```

필요할 때만 추가:

````markdown
## 기본 규칙

- <명시적 사유 없으면 따르는 기본 동작>

## 마무리 규칙

- <성공/차단/검증 결과를 어떻게 보고할지>

## 리턴 형식

```text
<사용자에게 보여줄 최종 출력 형식>
```
````

## Codex 표현 규칙

- 파일 검색은 `rg` 또는 `rg --files`를 우선한다.
- 파일 읽기/수정/쓰기처럼 Codex가 수행할 행동을 자연어로 적고, Claude 전용 도구명(`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`)에 의존하지 않는다.
- 프로젝트 규칙은 `AGENTS.md`와 `CONTRIBUTING.md`를 기준으로 삼는다.
- 외부 서비스 도구는 `Jira/Atlassian issue 조회 도구`처럼 Codex 환경에 노출된 connector/MCP 이름에 맞춰 사용할 수 있게 일반화한다.
- 사용자 확인이 필요한 단계는 `리턴 형식`에 명확히 적는다.

## 작성 원칙

- 한 단계에는 한 가지 일만 둔다.
- 병렬 가능한 확인은 "병렬로 실행"처럼 명시한다.
- 같은 규칙을 여러 섹션에 반복하지 않는다.
- 출력 형식이 중요하면 예시를 코드블록으로 둔다.
- 본문은 다른 Codex 인스턴스가 바로 따라 할 수 있을 만큼 구체적으로 쓰되, 이미 Codex가 아는 일반 설명은 줄인다.
