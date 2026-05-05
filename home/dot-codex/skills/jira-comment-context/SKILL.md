---
name: 'jira-comment-context'
description: '현재 대화 컨텍스트를 `analyzer-context`로 요약한 뒤 Jira 이슈에 영어→한글 순의 양국어 댓글(국기 제목 + 한 줄 요약 + 접힘 본문)로 등록한다. 분석/요약 로직은 analyzer-context가 단일 출처. 이 스킬은 ADF 변환·MCP 호출만 담당.'
---

# Jira Comment: 사용자 요청

현재 대화의 맥락을 Jira 이슈에 단일 댓글로 기록한다. **분석·요약은 `analyzer-context`에 위임**하고, 이 스킬은 그 출력(주제·한 줄 요약·내용)을 받아 Jira ADF 댓글 구조로 변환·POST한다.

## 댓글 구조

```
🇺🇸 <English title>            ← heading (이모지 포함)
<English one-line summary>     ← paragraph
[▶ Open Report]                ← expand (이모지 없음, 본문 접힘)

🇰🇷 <한글 제목>                ← heading (이모지 포함)
<한글 한 줄 요약>              ← paragraph
[▶ 리포트 열기]                ← expand (이모지 없음, 본문 접힘)
```

## 워크플로우

1. **이슈 ID 추출**: `사용자 요청`에서 이슈 키를 파싱한다.
   - URL 형식(`https://...atlassian.net/browse/PVPLUS-1234`) → 마지막 경로 세그먼트 추출
   - ID 형식(`PVPLUS-1234`) → 그대로 사용
   - 파싱 실패 시 작업을 중단하고 올바른 형식을 안내한다.
2. **이슈 확인**: `Jira/Atlassian issue 조회 도구`로 이슈를 조회해 `cloudId`를 확보한다. Codex 환경에 노출된 Jira/Atlassian connector 이름에 맞춰 사용한다.
3. **컨텍스트 분석**: 관련 Codex skill로 `analyzer-context`를 호출한다 (인자 없음 — 현재 대화를 분석).
   - 응답이 `BLOCKED: EMPTY_CONTEXT`이면 본 스킬도 `BLOCKED: EMPTY_CONTEXT`로 종료.
4. **분석 출력 파싱**: analyzer-context 응답에서 `## 한글(ko)`와 `## English(en)` 두 블록을 분리하고, 각 블록에서 다음 세 섹션을 추출한다.
   - 한국어: `### 주제`, `### 한 줄 요약`, `### 내용`
   - 영어: `### Topic`, `### Summary`, `### Content`
5. **Jira 형식으로 변환**:
   - **제목**: 각 언어 블록의 `Topic`/`주제`를 60자 이내로 잘라 `🇺🇸 ` / `🇰🇷 ` 접두 추가.
   - **한 줄 요약**: 각 언어 블록의 `Summary`/`한 줄 요약`을 그대로 paragraph로 사용 (80자 넘으면 자르기).
   - **본문 (expand 안)**: 각 언어 블록의 `Content`/`내용` markdown을 ADF 노드로 변환해 expand 안에 그대로 담는다.
     - 단락 → `paragraph`
     - 불릿 리스트 → `bulletList` + `listItem`
     - 코드 펜스(```` ``` ````) → `codeBlock` (`attrs.language` 지정)
     - 인라인 코드(`` ` ``) → text mark `code`
     - 강조(`**`) → text mark `strong`
   - 내용은 재해석·요약하지 않는다 — analyzer 출력 그대로 보존.
   - **expand `title`**: 영어 블록은 `Open Report`, 한글 블록은 `리포트 열기` (고정).
6. **댓글 순서**: ADF 본문은 **영어 → 한글** 순으로 배치 (analyzer는 한글→영어 순으로 주지만 Jira 댓글은 영어 먼저).
7. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 컨텍스트 분석은 직접 하지 않는다 — 반드시 `analyzer-context`를 호출한다.
- 댓글 본문은 analyzer-context의 `내용`/`Content` 섹션을 그대로 ADF로 변환한 것만 사용한다 (재해석·재요약·항목 추가 금지).
- 본문은 `expand`로 접어 둔다.
- `expand.attrs.title`에는 국기 이모지를 넣지 않는다. 이모지는 상단 heading에만.
- expand `title`은 영어 `Open Report` / 한글 `리포트 열기`로 고정.
- `contentFormat: "adf"`를 사용한다.
- 두 블록은 영어 → 한글 순서로 배치한다.
- `cloudId`는 `getJiraIssue` 응답에서 가져온다. 하드코딩 금지.
- 이슈 ID를 추출하지 못하면 댓글을 달지 않고 사용자에게 알린다.
- analyzer-context가 `BLOCKED`를 반환하면 그대로 BLOCK으로 전파.

## 기본 규칙

- 댓글은 한 번에 하나만 등록한다. 영어 블록 + 한글 블록을 단일 댓글에 묶는다.
- expand 본문 길이는 analyzer가 정한 분량(보통 1~3 단락)을 그대로 따른다 — 강제 압축·확장 금지.
- 같은 댓글을 두 번 등록하지 않는다. 실패 시 원인을 보고하고 재시도 여부를 묻는다.

## 마무리 규칙

- 검증: 이슈 ID 추출 실패 / analyzer-context BLOCK / cloudId 미확보 → `BLOCKED: <INVALID_ISSUE|EMPTY_CONTEXT|NO_CLOUD_ID>`와 한 줄 사유로 종료.
- 보고: MCP getJiraIssue raw 응답·analyzer-context 전체 출력·중간 변환 과정은 헤딩 위쪽에 두거나 출력 안 함.

## 리턴 형식

```
이슈: <PVPLUS-1234>
🇺🇸 <English title> | <English one-line summary>
🇰🇷 <한글 제목> | <한글 한 줄 요약>

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 ADF 골격(영어 heading + 요약 + expand[내용 ADF] → 한글 heading + 요약 + expand)을 조립해 `Jira/Atlassian 댓글 등록 도구`(contentFormat: "adf", cloudId는 getJiraIssue 응답에서) 호출. 등록된 댓글 URL 보고.

## 출력 포맷 (ADF 골격)

```json
{
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "🇺🇸 English title..." }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "English one-line summary..." }]
    },
    {
      "type": "expand",
      "attrs": { "title": "Open Report" },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "First paragraph of Content..." }] },
        {
          "type": "bulletList",
          "content": [
            { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "bullet only when listing helps" }] }] }
          ]
        },
        { "type": "codeBlock", "attrs": { "language": "kotlin" }, "content": [{ "type": "text", "text": "// only when code is essential" }] }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "🇰🇷 한글 제목..." }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "한글 한 줄 요약..." }]
    },
    {
      "type": "expand",
      "attrs": { "title": "리포트 열기" },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "내용 첫 단락..." }] }
      ]
    }
  ]
}
```
