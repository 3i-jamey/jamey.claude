# Phase [N]: [Single-Word Name]

## Spec 출처
- **Sections:** [이 phase를 이끄는 `Documents/Spec/` 파일과 섹션 번호 목록]
- **Spec version:** v[X]

## 개요
[1-2문장: 이 phase가 무엇을 달성하고 왜 하는지]

---

## 단계

### Step 0: 체크포인트
- phase 사전 스냅샷 생성: 프로젝트의 핵심 디렉토리 (CLAUDE.md `Checkpoint Directories` 참고)를 `.claude/checkpoints/checkpoint-phase[N].zip`으로 압축.
- 이 phase의 체크포인트가 이미 있으면 덮어쓴다.
- 파일 크기 보고. 승인 기다리지 말고 진행.

### Step 1: [제목]
- **[MODIFY/NEW] [FileName]**:
    - [요건 1]
    - [요건 2]
- **Tests:** [추가/업데이트할 테스트]
- **Verify:** [동작 확인 방법]

### Step 2: [제목]
- ...

### Step N-1: 테스트 실행
- 프로젝트 테스트 스위트 실행 (명령어는 CLAUDE.md `Testing` 섹션 참고).
- 테스트 실패 시, 실패한 테스트 또는 원인이 된 코드를 수정한다.
- 모든 테스트가 통과할 때까지 코드 리뷰로 넘어가지 않는다.

### Step N (최종): 코드 리뷰
- 이 phase에서 변경된 모든 파일에 대해 code-review 에이전트 (`.claude/agents/workflow/code-review.md`) 실행.
- HIGH/MED 이슈 수정.
- 리뷰 결과를 사용자에게 보고.

---

## Notes to Spec
[Spec과의 차이, spec이 다루지 않는 구현 결정, 미해결 질문. phase 완료 후 자동으로 Spec에 동기화된다. 해당 없으면 이 섹션 제거.]

---

## 워크플로우
단계를 순차적으로 실행한다. 사용자 승인을 기다리지 않고 다음 단계로 진행한다.
