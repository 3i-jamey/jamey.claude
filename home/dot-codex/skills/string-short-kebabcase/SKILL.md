---
name: string-short-kebabcase
description: 자유 문구(티켓 제목·이슈 요약 등)를 3~4단어 이내의 짧은 kebab-case 슬러그로 변환할 때 호출. git 브랜치명·폴더명·파일명 등 짧은 식별자를 만들어야 하는 상황에서 사용.
---

# 짧은 kebab-case 슬러그 만들기: $ARGUMENTS

자유 문구에서 핵심 키워드만 추출해 3~4단어 이내의 짧은 kebab-case 식별자를 만든다. git 브랜치명·폴더명으로 쓰일 수 있도록 짧고, 가독성이 있어야 한다.

## 워크플로우

1. 입력 문자열을 받는다. 없으면 호출자에게 요청한다.
2. 핵심 명사/동사만 남기고 다음을 모두 제거한다:
   - 관사(a, an, the), 전치사(on, in, of, for, to, with, from, by, ...), 접속사(and, or)
   - 동명사·진행형 수식("Investigating ...", "compared to stage" 등 부수적 설명)
   - 버전 번호, 회사·플랫폼명 등 맥락에서 생략 가능한 토큰
3. 남은 토큰을 소문자 영숫자로 정규화한다(공백/구두점 → `-`, 연속된 `-` 압축, 양끝 `-` 제거).
4. **3~4단어**로 줄인다. 핵심 주체(무엇을) + 핵심 행위/현상(어떻게) 위주로 남긴다.
5. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 스킬 실행을 마친다. 사용자 응답은 받지 않는다.

## 반드시 지킬 규칙

- 출력은 **3~4단어 이내**로 제한한다.
- 출력은 `[a-z0-9-]+` 만 포함한다.
- 슬러그 한 줄만 출력한다. 설명·따옴표·코드펜스를 붙이지 않는다.
- 의미가 사라질 정도로 줄이지 않는다.

## 기본 규칙

- 원문이 짧고 의미가 명확하면 그대로 kebab-case로만 변환한다.
- 의미를 해치지 않는 선에서 합성어는 한 단어로 붙인다(예: "Auto Zoom" → `autozoom`).
- 동의어 중 짧은 쪽을 고른다(예: "vibration and jittering" → `jitter`).
- 4단어로도 모호하면 가장 식별력 있는 명사 1개를 남기고 수식어를 버린다.

## 마무리 규칙

- 검증: 입력이 비어 있거나 정규화 후 토큰이 0개 → `BLOCKED: EMPTY_INPUT`로 종료.
- 보고: 후보 토큰·중간 정규화 단계는 헤딩 위쪽에 두거나 출력 안 함.
- 결과: 리턴 형식대로 슬러그 한 줄만 둔다 (`[a-z0-9-]+`). 설명·따옴표·코드펜스·사용자 확인 안내 모두 붙이지 않는다.

## 예시

- 입력: `Horse Model Separation`
  출력: `horse-model-separation`
- 입력: `Auto Zoom Vibration and Bounding Box Jittering on Horse Model`
  출력: `autozoom-jitter-horse`
- 입력: `Investigating Horse 3.1 tracking slowdown compared to stage`
  출력: `horse-tracking-slowdown`
