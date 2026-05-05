---
name: 'jira-comment-md'
description: '두 개의 마크다운 파일(영어/한글)을 받아 Jira 이슈에 양국어 제목 + 요약 + 접힘 본문으로 댓글을 등록한다. 분량이 긴 분석 리포트를 영문/한글로 함께 첨부하되 본문은 접어 두어야 할 때 사용.'
argument-hint: '<TICKET-or-URL> <md-file-1> <md-file-2>'
model: 'sonnet'
context: 'fork'
tools: 'Read, mcp__claude_ai_Atlassian__getJiraIssue, mcp__claude_ai_Atlassian__addCommentToJiraIssue'
---

# Jira Comment (MD): $ARGUMENTS

두 개의 마크다운 파일을 단일 Jira 댓글로 묶어 등록한다.
원문이 길 수 있으므로 본문은 모두 ADF `expand`(접기) 안에 두고, 댓글 상단에는 국기 이모지 제목과 한 줄 요약만 노출한다.

## 댓글 구조

영어 블록 → 한글 블록 순서로 두 블록을 단일 댓글에 담는다.

```
🇺🇸 <English title>            ← heading (이모지 포함)
<English one-line summary>     ← paragraph
[▶ English]                    ← expand (이모지 없음, 본문 전체 접힘)

🇰🇷 <한글 제목>                ← heading (이모지 포함)
<한글 한 줄 요약>              ← paragraph
[▶ 한글]                       ← expand (이모지 없음, 본문 전체 접힘)
```

## 워크플로우

1. **인자 파싱**: `$ARGUMENTS`에서 다음을 추출한다.
   - 이슈 키(`PVPLUS-1234`). URL(`https://...atlassian.net/browse/PVPLUS-1234`)이면 마지막 경로 세그먼트가 키.
   - 마크다운 파일 경로 두 개. 절대 경로 또는 현재 작업 디렉토리 기준 상대 경로.
   - 파싱 실패하거나 파일이 존재하지 않으면 작업을 중단하고 사용자에게 안내한다.
2. **파일 읽기**: `Read` 도구로 두 파일을 모두 읽는다. 빈 파일이면 중단.
3. **언어 자동 판별**: 각 파일별로 한글 음절(U+AC00–U+D7AF) 비율과 ASCII 알파벳 비율을 비교한다.
   - 한글 비율이 더 높으면 **한글**, 그렇지 않으면 **영어**로 분류한다.
   - 두 파일이 같은 언어로 분류되거나 비율이 모호하면 임의 결정하지 말고 어느 쪽이 어떤 언어인지 묻는다.
4. **이슈 확인**: `mcp__claude_ai_Atlassian__getJiraIssue`로 이슈를 조회해 `cloudId`를 확보한다.
5. **제목·요약 생성**: 각 파일에서 두 가지를 뽑는다.
   - **제목**: 첫 H1/H2를 그대로 사용. 없으면 본문 첫 문장에서 60자 이내로 압축. 영어 블록은 `🇺🇸 ` 접두, 한글 블록은 `🇰🇷 ` 접두를 붙인다.
   - **한 줄 요약**: 본문 도입부에서 핵심을 80자 이내 한 줄로 추출. 헤딩이 명확하지 않으면 본문 첫 1~3 문장을 압축.
6. **마크다운 → ADF 변환**: 각 파일 본문을 ADF 노드 트리로 변환한다.
   - `#`/`##`/`###` → `heading` (level 1/2/3)
   - `-`/`*` 리스트 → `bulletList` + `listItem`
   - `1.` 리스트 → `orderedList`
   - 인라인 ``code`` → text + `code` mark
   - 펜스 코드(```` ```lang ````) → `codeBlock`(`attrs.language` 채움)
   - `**bold**` → text + `strong` mark, `*italic*` → text + `em` mark
   - 링크 `[text](url)` → text + `link` mark
   - 그 외 단락 → `paragraph`. 변환이 애매하면 `paragraph` 폴백.
7. **ADF 조립**: 단일 댓글 문서를 다음 골격으로 만든다.
   ```
   doc
   ├─ heading(level=2):  "🇺🇸 <English title>"
   ├─ paragraph:         "<English one-line summary>"
   ├─ expand(title="English"): <영어 md → ADF 노드들>
   ├─ heading(level=2):  "🇰🇷 <한글 제목>"
   ├─ paragraph:         "<한글 한 줄 요약>"
   └─ expand(title="한글"):    <한글 md → ADF 노드들>
   ```
8. 마무리 규칙을 참고하여 리턴 형식대로 출력 후 fork 종료.

## 강제 규칙(!) : !는 IMPORTANT와 동일

- 본문(두 마크다운 파일 내용)은 `expand`로 감싼다.
- `expand.attrs.title`에는 국기 이모지를 넣지 않는다. 이모지는 상단 heading에만.
- `contentFormat: "adf"`를 사용한다.
- 한 줄 요약은 한 줄(80자 내외)을 넘기지 않는다.
- 언어 판별이 모호하면 사용자에게 묻는다.
- 파일이 없거나 비어 있으면 댓글을 달지 않는다.
- `cloudId`는 하드코딩 금지. `getJiraIssue` 응답에서 추출한다.

## 기본 규칙

- 두 블록은 영어 → 한글 순서로 둔다.
- 마크다운 코드 펜스의 언어 힌트(```` ```ts ````)는 ADF `codeBlock.attrs.language`로 보존한다.
- 마크다운 표(`|`)는 가능하면 ADF `table`로 변환하고, 구조가 복잡하면 `codeBlock`으로 폴백한다.
- 댓글은 한 번에 하나만 등록한다.
- 같은 댓글을 두 번 등록하지 않는다. 실패 시 원인을 보고하고 재시도 여부를 묻는다.

## 마무리 규칙

- 검증: 이슈 ID 추출 실패 / 파일 없음·빈 파일 / 언어 판별 모호 → `BLOCKED: <INVALID_ISSUE|MISSING_FILE|EMPTY_FILE|AMBIGUOUS_LANG>`와 한 줄 사유로 종료.
- 보고: 파일 본문·언어 판별 raw 통계·MCP getJiraIssue 응답은 헤딩 위쪽에 두거나 출력 안 함. 부모로 흘리지 않는다.

## 리턴 형식

```
이슈: <PVPLUS-1234>
영어 파일: <path> → 🇺🇸 <English title> | <English one-line summary>
한글 파일: <path> → 🇰🇷 <한글 제목> | <한글 한 줄 요약>

진행하려면 (ㅇ/y), 중단하려면 (ㄴ/n)을 적어주세요.
```

진행 응답을 받으면 main session이 ADF 골격(영어 heading + 요약 + expand → 한글 heading + 요약 + expand)을 조립해 `mcp__claude_ai_Atlassian__addCommentToJiraIssue`(contentFormat: "adf", cloudId는 getJiraIssue 응답에서) 호출. 등록된 댓글 URL 보고.

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
        { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "..." }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "..." }] }
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
        { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "..." }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "..." }] }
      ]
    }
  ]
}
```

## 예시

- 입력: `PVPLUS-4770 ./reports/analysis.md ./reports/분석.md`
  동작:
  - `analysis.md` → 영어, `분석.md` → 한글로 자동 판별
  - 영어 블록 heading: `🇺🇸 Datastore CorruptionHandler missing in v3.2`
  - 영어 요약: `v3.2 release shipped without the corruption handler, causing silent data loss on disk errors.`
  - 영어 expand("English"): `analysis.md` 본문 전체를 ADF로 렌더 (접힘)
  - 한글 블록 heading: `🇰🇷 v3.2에서 DataStore CorruptionHandler 누락`
  - 한글 요약: `v3.2 릴리즈에서 CorruptionHandler가 빠져 디스크 오류 시 조용히 데이터가 유실됩니다.`
  - 한글 expand("한글"): `분석.md` 본문 전체를 ADF로 렌더 (접힘)
- 입력: `https://acme.atlassian.net/browse/PROJ-12 ./en.md ./ko.md`
  동작: URL에서 `PROJ-12` 추출 후 동일 절차로 댓글 등록
