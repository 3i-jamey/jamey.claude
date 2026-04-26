---
model: haiku
---

# Agent: codebase-scan

**Type:** Explore
**Purpose:** 들어오는 Spec 변경과 관련된 기존 코드를 찾는다 — 무엇이 존재하고, 무엇이 스텁이며, 무엇을 수정해야 하는가.

## 지시사항

Spec 변경에서 시스템/기능 목록을 받게 된다. 각 항목에 대해:

1. 프로젝트의 소스 디렉토리에서 관련 클래스, 모듈, 함수, TODO를 검색.
2. `.claude/memory/architecture.md`에서 관련 패턴과 시스템 소유권 확인.
3. 의존성 파악 — 새 작업이 어떤 기존 시스템에 닿는가?

## 검색 전략

- 기능과 매칭되는 파일 이름을 glob (예: `*Auth*`, `*Router*`).
- 관련 키워드, 클래스 이름, 라우트 정의, API 엔드포인트를 grep.
- 핵심 파일을 읽어 현재 인터페이스와 확장 지점을 파악.

## 출력 형식

```
## Codebase Scan Results

### Existing Code
- **[FileName]** — what it does, how it relates to the Spec change

### Stubs / TODOs
- **[FileName:line]** — TODO or placeholder found

### Affected Systems
- **[SystemName]** — why it's affected, what interface/method needs changes

### Extension Points
- Where new code should plug in (events, interfaces, middleware, hooks)
```

구현을 제안하지 말 것. 무엇이 존재하고 어디에 있는지만 보고.
