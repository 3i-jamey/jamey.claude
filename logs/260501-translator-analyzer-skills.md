---
title: Translator·Analyzer 스킬 설계, 네임스페이스 통일, 그리고 컨텍스트 분석기 narrative 스타일 전환
date: 2026-05-01
---

## 한글(ko)

### 주제
Translator·Analyzer 스킬 설계, 네임스페이스 통일, 그리고 컨텍스트 분석기 narrative 스타일 전환

### 한 줄 요약
스킬 네임스페이스를 agent-first(`translator.*`, `shortener.*`, `analyzer.*`)로 통일하고 분석기·포매터 분리 패턴을 정착시킨 뒤, 분석기 출력을 카테고리 나열에서 narrative 산문으로 다시 손봤다.

### 내용
처음엔 마크다운 번역 스킬 하나(`translation.file`)로 시작했지만, 빠르게 네임스페이스 컨벤션 토론으로 번졌다. `translation.file` → `file.translate` → `md.translate` + `file.translate` 분리 → `translator.*` 3개로 재구성(라우터 1 + 워커 2)까지 거쳐, 기존 5개 네임스페이스(`git.*`, `github.*`, `jira.*` 등)가 전부 agent-first 명사라는 사실을 확인한 뒤 `translator.md` / `translator.text` / `translator.file` 구조로 확정. `translator.file`은 직접 번역하지 않고 확장자만 보고 `.md`/`.mdx` → `translator.md`, 그 외 → `translator.text`로 분기하는 라우터.

이어서 `string.short.kebab`이 유일한 operand-first outlier로 드러나 `shortener.kebab`으로 rename. 이 과정에서 `git.branch`의 cross-ref 오타(`string.short.kebabcase`)도 함께 정리.

세 번째 분기점: "현재 컨텍스트를 md로 저장"하는 스킬을 만들려다 `recorder.context.md`를 잠깐 생성했지만, *"포맷·I/O는 ad-hoc으로 충분, 분석만 스킬로"* 라고 판단해 즉시 삭제. 대신 순수 분석기 `analyzer.context`만 남기고 ad-hoc 저장 컨벤션은 메모리(`feedback_skill_design.md`, `feedback_context_md_save.md`)에 저장. 이 패턴은 미래의 `slack.message.context`, `notion.page.context` 등에서도 그대로 재사용 가능.

분석기 패턴의 첫 응용으로 `jira.comment.context`를 리팩토링 — 자체 분석 로직을 제거하고 `analyzer.context`에 위임, 본인은 ADF 변환·MCP 호출만 담당. PVPLUS-5051(comment 73209)에 첫 댓글 등록 성공.

마지막으로 PVPLUS-4770의 댓글 스타일(역할 prefix 기반 narrative — `Root cause:`, `Crash path:`, `Fix:`)과 비교했을 때 기존 analyzer 출력이 사실 단편으로 끊어 보인다는 피드백. 카테고리(`결정/작업/열린이슈`) 강제 분리를 제거하고 `### 주제` + `### 한 줄 요약` + `### 내용`(자유 형식 산문) 구조로 재설계. 블록 헤더도 `## ko`/`## en` → `## 한글(ko)`/`## English(en)` 변경. `expand` 라벨은 기존 `Open Report` / `리포트 열기` 유지. `analyzer.context` / `jira.comment.context` / 메모리 3개 파일 동시 갱신.

남은 일: 모든 변경 사항 git commit 미실행. `shortener.kebab` / `translator.md` / `translator.file` 동작 테스트 미완. PVPLUS-5051에 새 스타일로 다시 댓글 달아 PVPLUS-4770과 비교해 봄직함.

---

## English(en)

### Topic
Translator/analyzer skill design, namespace unification, and shift to narrative-style context summarization

### Summary
Unified skill namespaces to agent-first (`translator.*`, `shortener.*`, `analyzer.*`), established the analyzer-vs-formatter separation pattern, then reshaped the analyzer's output from categorical bullets to narrative prose.

### Content
The session started with a single markdown translator skill (`translation.file`), but quickly expanded into a naming-convention debate. The name evolved through `translation.file` → `file.translate` → splitting into `md.translate` + `file.translate` → finally settling on three skills (`translator.md`, `translator.text`, `translator.file`) once we confirmed all five existing namespaces (`git.*`, `github.*`, `jira.*`, etc.) follow an agent-first noun pattern. `translator.file` does no translation itself — it routes by extension: `.md`/`.mdx` → `translator.md`, else → `translator.text`.

This exposed `string.short.kebab` as the lone operand-first outlier, so it was renamed to `shortener.kebab`. The cross-reference fix in `git.branch` (along with a typo `string.short.kebabcase` → `shortener.kebab`) came along with it.

Third branch point: an attempt to build a "save current context to md" skill led to creating `recorder.context.md` — and immediately deleting it, after deciding *"analysis belongs in a skill; format and I/O can be ad-hoc."* The pure analyzer `analyzer.context` was kept; the ad-hoc save convention was committed to memory (`feedback_skill_design.md`, `feedback_context_md_save.md`). The same pattern can be reused for future `slack.message.context`, `notion.page.context`, etc.

The first application of this analyzer pattern was a refactor of `jira.comment.context`: its own analysis logic was removed and delegated to `analyzer.context`, leaving only ADF transformation and the MCP call. The first end-to-end test posted comment 73209 to PVPLUS-5051 successfully.

Finally, comparing that comment to PVPLUS-4770 (which uses role-prefixed narrative — `Root cause:`, `Crash path:`, `Fix:`), the existing analyzer output was noted to read as disconnected facts. The fix: drop the rigid categories (`결정/작업/열린이슈`) and reshape `analyzer.context` output around `### 주제` + `### 한 줄 요약` + `### 내용` (free-form prose). Block headers also changed from `## ko`/`## en` to `## 한글(ko)`/`## English(en)`. The `expand` titles `Open Report` / `리포트 열기` were kept. Three files were updated together: `analyzer.context`, `jira.comment.context`, and the memory convention.

Open: nothing has been committed yet. `shortener.kebab` / `translator.md` / `translator.file` still untested. Re-posting on PVPLUS-5051 with the new style would let us compare directly against PVPLUS-4770.
