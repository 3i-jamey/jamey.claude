---
name: 'translator-file'
description: '임의 파일 한 개를 받아 확장자를 보고 적절한 번역 워커로 분기하는 라우터. `.md`/`.mdx` → `translator-md`, 그 외 → `translator-text`. 어떤 번역 스킬을 써야 할지 모를 때 또는 자동 라우팅이 필요할 때 사용. 직접 번역은 하지 않는다.'
argument-hint: '<source> [target] [target-lang]'
model: 'haiku'
tools: 'Bash, Skill'
---

# 파일 번역 라우터: $ARGUMENTS

이 스킬은 **자체 번역을 하지 않는다**. 입력 파일의 확장자만 보고 두 워커 중 하나에 인자를 그대로 전달해 호출한다. 번역·언어 감지·경로 결정·요약 출력은 모두 호출된 워커가 담당한다.

분기 규칙:
- `.md` / `.mdx` (대소문자 무시) → `translator-md`
- 그 외 모든 확장자 → `translator-text`

## 워크플로우

1. 인자 파싱: `$ARGUMENTS`에서 `source`(필수), `target`(선택), `target-lang`(선택)을 토큰으로 분리한다. `source`가 없으면 `BLOCKED: NO_INPUT`로 종료.
2. `Bash`로 source 존재·종류 확인:
   - `test -e <source>` 실패 → `BLOCKED: SOURCE_MISSING`
   - `test -d <source>` 성공(디렉토리) → `BLOCKED: NOT_A_FILE`
3. 확장자 추출: `<source>`의 마지막 `.` 뒤 토큰을 소문자로 정규화한다. `.` 자체가 없으면 빈 문자열.
4. 분기 결정:
   - 확장자가 `md` 또는 `mdx` → 워커 = `translator-md`
   - 그 외 (빈 확장자 포함) → 워커 = `translator-text`
5. 라우팅 한 줄 출력 (선택): `→ <워커명>` 한 줄만. 그 외 설명·헤더 금지.
6. `Skill` 도구로 결정된 워커를 호출하고 원래 받은 `$ARGUMENTS`를 그대로 전달한다.
7. 워커가 리턴한 4줄(헤더 1 + 불릿 3)을 가공 없이 그대로 노출하고 종료. 추가 헤더·요약·주석을 붙이지 않는다.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 자체적으로 파일을 읽거나 쓰지 않는다 — Read/Write 권한 없음.
- 자체 번역하지 않는다.
- 인자를 변형·보완·재정렬해서 워커에 넘기지 않는다 — 받은 그대로 전달.
- 워커 출력에 헤더·푸터·요약·이모지를 추가하지 않는다.
- 워커가 `BLOCKED: …`를 반환해도 메시지를 덮거나 풀어 쓰지 않는다 — 그대로 노출.
- 사용자 응답을 받지 않는다.

## 기본 규칙

- 확장자 비교는 대소문자를 무시한다 (`.MD` = `.md`).
- 점이 여러 번 들어간 파일(`notes.draft.txt`)은 마지막 점 뒤만 본다 (`txt`).
- 확장자 없는 파일은 `translator-text`로 보낸다.

## 마무리 규칙

- 검증: 인자 누락 / source 미존재 / source가 디렉토리 → `BLOCKED: <NO_INPUT|SOURCE_MISSING|NOT_A_FILE>`와 한 줄 사유로 종료.
- 보고: 라우팅 결정 외 중간 추론은 출력하지 않는다.
- 결과: 워커의 리턴 형식이 그대로 main session에 노출된다. 라우터는 추가 출력하지 않는다.

## 예시

- 입력: `lab/practices/gstack/ko/learn/SKILL.md`
  분기: `translator-md`
- 입력: `notes/release-2026-01.txt`
  분기: `translator-text`
- 입력: `caption.SRT`
  분기: `translator-text` (대소문자 무시 → `srt`)
- 입력: `Makefile` (확장자 없음)
  분기: `translator-text`
