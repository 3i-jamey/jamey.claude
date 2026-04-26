---
name: update
description: 마지막 Spec 버전 이후 변경된 코드를 확인하고 Spec 파일을 현재 코드베이스 상태에 맞게 갱신.
disable-model-invocation: true
argument-hint: "[scope hint, e.g. 'auth refactor' or 'new API endpoints']"
---

# Spec Update: $ARGUMENTS

## 워크플로우

### Step 1 — 변경사항 식별

마지막 Spec 갱신 이후 변경된 것을 판단:
- 최근 편집이 있는 활성 대화 안이라면, 그 변경사항을 사용.
- 아니면, 마지막 Spec changelog 날짜 이후의 git history와 비교.

**의미 있는** 변경 목록을 수집 (포맷팅, 이름 변경, 주석만 편집은 건너뛰기).

### Step 2 — Spec에서 오래된 참조 스캔

**Explore** 에이전트를 스폰해 모든 `Documents/Spec/*.md` 파일에서 변경된 시스템에 대한 참조를 검색. 각 변경에 대해, Spec이:
- 제거된 필드, 클래스, 설정을 참조하는지
- 더 이상 코드와 일치하지 않는 동작을 묘사하는지
- 새로 추가된 시스템에 대한 문서가 누락되었는지 확인.

### Step 3 — 발견사항 제시

사용자에게 요약 표 표시:

```
| Spec File | Line | Issue | Proposed Fix |
|-----------|------|-------|--------------|
```

오래된 것이 없으면 "Spec is up to date" 보고 후 정지.

### Step 4 — 갱신 적용 (사용자 확정 후)

1. 편집 전에 각 대상 Spec 파일과 컨벤션 파일을 읽는다 (Spec Writing Rule).
2. 오래된 섹션만 편집 — 주변 구조 보존.
3. 정확히: 구체적 숫자, enum 값, 클래스 이름 사용.
4. `Spec.md`의 버전 올림 (1 증가).
5. `00_Changelog.md`에 날짜와 요약과 함께 changelog 항목 추가.

### 스코프 힌트

`$ARGUMENTS`가 제공되면 그 영역에 스캔 집중. 비어 있으면 광범위하게 스캔.
