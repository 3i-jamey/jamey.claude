---
name: jira.comment.context
description: 현재 대화 컨텍스트의 분석·작업 결과를 요약해 Jira 이슈에 양국어 제목 + 요약 + 접힘 본문 형태로 댓글을 등록한다. 분석/조사 결과를 영문·한글 둘 다 남기고 상세는 접어 두어야 할 때 사용.
argument-hint: 'PVPLUS-0000 또는 https://...atlassian.net/browse/PVPLUS-0000'
model: sonnet
context: inherit
---

# Jira Comment: $ARGUMENTS

현재 대화에서 분석하거나 작업한 내용을 요약해 Jira 이슈에 댓글로 기록한다.
영어 블록 → 한글 블록 순서로 단일 댓글에 묶고, 각 블록은 국기 제목 + 한 줄 요약 + 접힘 상세로 구성한다.

## 댓글 구조

```
🇺🇸 <English title>            ← heading (이모지 포함)
<English one-line summary>     ← paragraph
[▶ English]                    ← expand (이모지 없음, 상세 접힘)

🇰🇷 <한글 제목>                ← heading (이모지 포함)
<한글 한 줄 요약>              ← paragraph
[▶ 한글]                       ← expand (이모지 없음, 상세 접힘)
```

## 워크플로우

1. **이슈 ID 추출**: `$ARGUMENTS`에서 이슈 키를 파싱한다.
   - URL 형식(`https://...atlassian.net/browse/PVPLUS-1234`) → 마지막 경로 세그먼트 추출
   - ID 형식(`PVPLUS-1234`) → 그대로 사용
   - 파싱 실패 시 작업을 중단하고 올바른 형식을 안내한다.
2. **이슈 확인**: `mcp__claude_ai_Atlassian_Rovo__getJiraIssue`로 이슈를 조회해 `cloudId`를 확보한다.
3. **컨텍스트 요약**: 현재 대화에서 핵심 내용을 뽑아 영어·한글 각각 두 가지를 작성한다.
   - **제목 한 줄**: 분석/작업의 핵심을 60자 이내. 영어 블록은 `🇺🇸 ` 접두, 한글 블록은 `🇰🇷 ` 접두를 붙인다.
   - **한 줄 요약**: 결론을 80자 이내 한 줄로.
   - **상세(접힘 안)**: 근본 원인 / 핵심 발견사항 / 수정 방법 또는 결론. bullet 5~10개 이내, 필요하면 단락·코드블록 사용.
4. **댓글 등록**: `mcp__claude_ai_Atlassian_Rovo__addCommentToJiraIssue` 호출.
   - `contentFormat: "adf"` 필수.
   - `cloudId`는 `getJiraIssue` 응답에서 가져온 값 사용.
5. **완료 보고**: 등록된 댓글 URL을 사용자에게 출력한다.

## 반드시 지킬 규칙

- 상세 본문은 반드시 `expand`로 접어 둔다 — 댓글이 길어져 이슈 화면을 잡아먹지 않게 한다.
- `expand.attrs.title`에는 국기 이모지를 넣지 않는다 — 이모지는 상단 heading에만. 펼친 화면이 깔끔해야 한다.
- `contentFormat: "adf"`를 사용한다 — markdown 포맷에는 `expand` 노드가 없다.
- 두 블록은 항상 영어 → 한글 순서로 배치한다 — 글로벌 가독성 우선.
- `cloudId`는 `getJiraIssue` 응답에서 가져온다 — 하드코딩 금지.
- 이슈 ID를 추출하지 못하면 댓글을 달지 않고 사용자에게 알린다.
- 대화 컨텍스트에 요약할 내용이 없으면 댓글을 달지 않고 이유를 알린다.

## 기본 규칙

- 댓글은 한 번에 하나만 등록한다 — 영어 블록 + 한글 블록을 단일 댓글에 묶는다.
- 요약은 간결하게 — 대화 본문을 그대로 옮기지 않고 핵심만 추출한다.
- 코드 스니펫이 필요하면 ADF `codeBlock` 노드를 사용한다.
- 같은 댓글을 두 번 등록하지 않는다 — 실패 시 원인을 보고하고 재시도 여부를 사용자에게 묻는다.

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
        {
          "type": "bulletList",
          "content": [
            {
              "type": "listItem",
              "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Detail bullet..." }] }]
            }
          ]
        }
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
        {
          "type": "bulletList",
          "content": [
            {
              "type": "listItem",
              "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "상세 항목..." }] }]
            }
          ]
        }
      ]
    }
  ]
}
```

## 예시

- 입력: `PVPLUS-4770`
  동작: 현재 대화의 DataStore CorruptionHandler 누락 분석을 요약
  - 영어 heading: `🇺🇸 DataStore CorruptionHandler missing in v3.2`
  - 영어 요약: `v3.2 release shipped without the corruption handler, causing silent data loss on disk errors.`
  - 영어 expand("English"): 근본 원인·재현 경로·수정 제안 bullet
  - 한글 heading: `🇰🇷 v3.2에서 DataStore CorruptionHandler 누락`
  - 한글 요약: `v3.2 릴리즈에서 CorruptionHandler가 빠져 디스크 오류 시 조용히 데이터가 유실됩니다.`
  - 한글 expand("한글"): 근본 원인·재현 경로·수정 제안 bullet
