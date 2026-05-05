---
name: 'translator-md'
description: '마크다운 파일(.md/.mdx)을 다른 언어로 번역한다. frontmatter 식별자 키·코드블록·인라인 코드·링크 URL·이미지 src·HTML 주석은 보존하고 사용자 향(向) 텍스트만 번역. ko↔en 페어 디렉토리(예: lab/.../ko ↔ lab/.../en)가 있으면 자동 매핑. 비-마크다운은 `translator-text`, 자동 라우팅은 `translator-file`.'
argument-hint: '<source.md> [target.md] [target-lang]'
model: 'sonnet'
context: 'fork'
tools: 'Bash, Read, Write'
---

# 마크다운 파일 번역: $ARGUMENTS

이 스킬은 **마크다운 파일 한 개를 다른 언어로 번역**해 새 파일로 쓰고, main session으로는 **3줄 요약만** 리턴한다. 마크다운 문법 요소(frontmatter 키, fenced/inline 코드, 링크 URL, 이미지 src, HTML 주석, 헤딩 앵커)는 모두 보존하고 **사람이 읽는 산문 텍스트만** 번역한다.

## 워크플로우

1. 인자 파싱: `$ARGUMENTS`에서 `source`(필수), `target`(선택), `target-lang`(선택, `ko`/`en`)을 구분한다. `source`가 없으면 `BLOCKED: NO_INPUT`로 종료.
2. 병렬로 실행:
   - `Read` source 파일 전체
   - `Bash`로 `test -e <source>` (존재 확인 — 단순 형태만, 이외 호출 금지)
3. 확장자 검사: source 확장자가 `.md` / `.mdx`가 아니면 `BLOCKED: NOT_MARKDOWN` 로 종료. (일반 텍스트는 `translator-text`, 자동 라우팅은 `translator-file`.)
4. 언어 감지:
   - frontmatter `description` 또는 본문 첫 산문 단락에서 한글 비율로 판정 (한글 ≥ 30% → `ko`, 그 외 → `en`).
   - `target-lang` 미지정 시 감지된 언어와 반대로 토글 (`ko`→`en`, `en`→`ko`).
5. target 경로 결정 (없을 때):
   - source 경로에 `/ko/` 또는 `/en/` 세그먼트가 있으면 짝 디렉토리로 치환 (예: `lab/practices/gstack/ko/foo/SKILL.md` → `lab/practices/gstack/en/foo/SKILL.md`).
   - 위 패턴이 없으면 `<dir>/<basename>.<target-lang>.<ext>`.
6. 충돌 검사:
   - source == target → `BLOCKED: SAME_PATH`
   - target 파일이 이미 존재 → `BLOCKED: TARGET_EXISTS` (사용자가 직접 정리하거나 다른 경로 지정).
7. 번역 본문 생성. 보존 규칙(아래 "강제 규칙")을 모두 적용한다.
8. `Write`로 target에 저장.
9. 마무리 규칙을 참고해 리턴 형식대로 3줄 요약을 출력하고 fork 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- fenced code block(```` ``` ````) 내용은 한 글자도 변경하지 않는다 — 코드·주석·언어 라벨 모두.
- inline code(`` ` ``) 내용은 변경하지 않는다.
- 링크 `[text](url)`의 URL은 보존하고 표시 텍스트만 번역한다.
- 이미지 `![alt](src)`의 src는 보존하고 alt만 번역한다.
- HTML 주석 `<!-- ... -->`은 변경·삭제하지 않는다 — 가이드성 텍스트라도 그대로 둔다.
- 헤딩 앵커(`{#id}`, `[heading-anchor]`) 식별자는 변경하지 않는다.
- frontmatter 키 자체와 식별자성 값(`name`, `type`, `model`, `context`, `agent`, `tools`, `argument-hint`의 변수 토큰)은 변경하지 않는다.
- 원본 파일을 덮어쓰지 않는다.
- target 파일이 이미 있으면 덮어쓰지 않는다.
- 본문 일부만 번역하고 끝내지 않는다 — 끝까지 처리한다.
- 번역 본문·중간 추론·전체 diff를 리턴 형식 밖으로 출력하지 않는다.
- 사용자 응답을 받지 않는다 — fork 단독으로 끝낸다.

## 기본 규칙

- frontmatter의 `description`, `argument-hint`의 자연어 부분은 번역한다.
- 줄 수·빈 줄·들여쓰기 구조를 보존한다.
- 톤(존댓말/반말, 격식 수준)을 원문에 맞춘다.
- 동일 용어는 파일 전체에서 일관되게 번역한다.
- 표·리스트·인용 블록의 구조 마커(`|`, `-`, `>`)는 보존한다.
- target-lang 미지정 시 `ko`↔`en` 토글한다.
- 번역어가 모호한 기술 용어는 원어를 괄호로 병기한다 (예: "포크(fork)").

## 마무리 규칙

- 검증: 인자 누락 / 원본 미존재 / 비-마크다운 확장자 / 경로 충돌 / 본문 미완료 → `BLOCKED: <NO_INPUT|SOURCE_MISSING|NOT_MARKDOWN|SAME_PATH|TARGET_EXISTS|INCOMPLETE>`와 한 줄 사유로 종료.
- 보고: 번역 본문 전체·언어 감지 비율·문단별 매핑 같은 중간 산출물은 헤딩 위쪽에만 두거나 출력하지 않는다. 부모 컨텍스트로 흘리지 않는다.
- 결과: 리턴 형식 그대로만 main session에 노출한다.

## 리턴 형식

```
번역됨: <source> → <target> (<src-lang>→<tgt-lang>)
- <요약 1: 이 파일이 무엇에 관한 문서인지 한 줄>
- <요약 2: 핵심 내용·구조 한 줄>
- <요약 3: 보존한 특이 항목 또는 주의점 한 줄>
```

리턴 형식은 정확히 4줄(헤더 1 + 불릿 3)만 출력한다. 번역 본문, 차이점 나열, 진행 로그는 포함하지 않는다.
