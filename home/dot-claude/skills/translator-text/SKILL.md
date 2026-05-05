---
name: 'translator-text'
description: '마크다운이 아닌 일반 텍스트 파일(.txt, .srt, .vtt, .log 등)을 다른 언어로 번역한다. 줄 수·빈 줄·들여쓰기·자막 타임스탬프·URL/경로 토큰을 보존하는 단순 번역. 마크다운(.md/.mdx)은 `translator-md`, 자동 라우팅은 `translator-file`.'
argument-hint: '<source> [target] [target-lang]'
model: 'sonnet'
context: 'fork'
tools: 'Bash, Read, Write'
---

# 일반 텍스트 파일 번역: $ARGUMENTS

이 스킬은 **마크다운이 아닌 평문 텍스트 파일 한 개**를 다른 언어로 번역해 새 파일로 쓰고, main session으로는 **3줄 요약만** 리턴한다. 마크다운 의미 분석은 하지 않는다 — 줄 단위 구조와 식별자 토큰(URL, 파일 경로, 자막 타임스탬프 등)만 보존한 채 산문을 번역한다.

## 워크플로우

1. 인자 파싱: `$ARGUMENTS`에서 `source`(필수), `target`(선택), `target-lang`(선택, `ko`/`en`)을 구분한다. `source`가 없으면 `BLOCKED: NO_INPUT`로 종료.
2. 확장자 검사: source 확장자가 `.md` / `.mdx`이면 `BLOCKED: USE_TRANSLATOR_MD`로 종료한다 (마크다운은 `translator-md`로).
3. 병렬로 실행:
   - `Read` source 파일 전체
   - `Bash`로 `test -e <source>` (존재 확인 — 단순 형태만, 이외 호출 금지)
1. 언어 감지: 본문에서 한글 비율로 판정 (한글 ≥ 30% → `ko`, 그 외 → `en`). `target-lang` 미지정 시 반대로 토글.
2. target 경로 결정 (없을 때) — 모든 경로 조작은 모델이 직접 문자열로 계산한다. `Bash` 호출이나 shell parameter expansion(`${VAR%...}`, `${VAR##*.}`, `basename`, `dirname` 등) 사용 금지.
   - 확장자가 있으면 `<dir>/<basename>.<target-lang>.<ext>` (예: `notes.txt` → `notes.en.txt`). basename·확장자 분리는 source 문자열에서 마지막 `/` 이후, 마지막 `.` 이전을 모델이 직접 잘라낸다.
   - 확장자가 없으면 `<source>.<target-lang>`.
6. 충돌 검사:
   - source == target → `BLOCKED: SAME_PATH`
   - target 파일이 이미 존재 → `BLOCKED: TARGET_EXISTS`
7. 파일 형식 분기:
   - **자막(`.srt`, `.vtt`)**: 번호 단독 라인, 타임스탬프 라인(`-->` 포함), `WEBVTT` 헤더, `NOTE`/`STYLE`/`REGION` 블록은 그대로 두고 자막 텍스트만 번역.
   - **그 외 평문**: 줄 단위로 번역하되 빈 줄 위치·들여쓰기·줄 수를 유지한다.
8. `Write`로 target에 저장.
9. 마무리 규칙을 참고해 리턴 형식대로 3줄 요약을 출력하고 fork 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 줄 수와 빈 줄 위치를 원본과 동일하게 유지한다.
- 들여쓰기(스페이스/탭)를 보존한다.
- 자막 파일의 번호 라인·타임스탬프 라인·`WEBVTT`/`NOTE`/`STYLE` 헤더는 변경하지 않는다.
- URL(`http://`, `https://`, `ftp://`), 이메일, 파일 경로(`/`로 시작하거나 확장자 포함), 환경변수(`$VAR`), 명령줄 토큰(`--flag`)은 변경하지 않는다.
- 마크다운 확장자(`.md`/`.mdx`)는 처리하지 않는다 — 즉시 BLOCK.
- 원본 파일을 덮어쓰지 않는다.
- target 파일이 이미 있으면 덮어쓰지 않는다.
- 본문 일부만 번역하고 끝내지 않는다 — 끝까지 처리한다.
- 번역 본문·중간 추론·전체 diff를 리턴 형식 밖으로 출력하지 않는다.
- 사용자 응답을 받지 않는다 — fork 단독으로 끝낸다.

## 기본 규칙

- 톤(존댓말/반말, 격식 수준)은 원문에 맞춘다.
- 동일 용어는 파일 전체에서 일관되게 번역한다.
- 한 줄에 여러 문장이 있어도 줄을 합치거나 나누지 않는다.
- target-lang 미지정 시 `ko`↔`en` 토글한다.
- 번역어가 모호한 기술 용어는 원어를 괄호로 병기한다.
- 의미가 없는 장식 문자열(`====`, `----`, ASCII art)은 그대로 둔다.

## 마무리 규칙

- 검증: 인자 누락 / 원본 미존재 / 마크다운 확장자 / 경로 충돌 / 본문 미완료 → `BLOCKED: <NO_INPUT|SOURCE_MISSING|USE_TRANSLATOR_MD|SAME_PATH|TARGET_EXISTS|INCOMPLETE>`와 한 줄 사유로 종료.
- 보고: 번역 본문 전체·언어 감지 비율·라인별 매핑 같은 중간 산출물은 헤딩 위쪽에만 두거나 출력하지 않는다. 부모 컨텍스트로 흘리지 않는다.
- 결과: 리턴 형식 그대로만 main session에 노출한다.

## 리턴 형식

```
번역됨: <source> → <target> (<src-lang>→<tgt-lang>)
- <요약 1: 이 파일이 무엇에 관한 텍스트인지 한 줄>
- <요약 2: 핵심 내용·길이·구조 한 줄>
- <요약 3: 보존한 특이 항목(타임스탬프·URL 등) 또는 주의점 한 줄>
```

리턴 형식은 정확히 4줄(헤더 1 + 불릿 3)만 출력한다. 번역 본문, 차이점 나열, 진행 로그는 포함하지 않는다.
