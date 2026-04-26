# jamey.claude

개인 Claude Code 자산(스킬·에이전트)과 참고 자료를 한 저장소에서 관리한다.
배포는 `home/`을 `$HOME`에 심볼릭 링크하는 방식 — 저장소를 수정하면 곧바로 Claude Code에 반영된다.

## 구조

```
home/.claude/
  skills/    # 슬래시 커맨드로 호출하는 스킬
    base/                       # SKILL.md 템플릿 (복사해서 시작)
    git.branch / git.commit / git.review
    github.pr.create / github.pr.comment.android
  agents/    # @agent-<name>으로 위임할 서브에이전트
    base/                       # AGENT.md 템플릿
    git/

lab/         # 저장소 안에서만 참고하는 자료 (배포 대상 아님)
  practices/ # 외부 프랙티스 — gstack·superpowers는 submodule, jw는 매뉴얼
  roles/     # 역할별 메모

ln           # 심볼릭 링크할 경로 목록
ln.sh        # ln 항목을 home/ → $HOME 으로 연결하는 배포 스크립트
```

## 배포

```sh
./ln.sh
```

`ln`에 적힌 경로(현재 `.claude/skills`)를 `home/<path>` → `$HOME/<path>`로 심볼릭 링크한다.
이미 같은 타깃이면 `ok`, 다른 곳을 가리키거나 일반 파일이면 `skip`, 깨진 링크는 자동 복구한다.
새 경로를 배포하려면 `ln`에 한 줄 추가 후 다시 실행.

## 새 스킬 / 에이전트 만들기

- 스킬: `home/.claude/skills/base/SKILL.md`를 복사해 `home/.claude/skills/<skill-id>/SKILL.md`로 저장.
- 에이전트: `home/.claude/agents/base/AGENT.md`를 복사해 `home/.claude/agents/<agent-id>/AGENT.md`로 저장.

각 `base/` 템플릿 상단 HTML 주석에 frontmatter 필드, 섹션 구조, 작성 컨벤션이 모두 들어 있다.
새 파일을 만들 때는 가시 안내(💡 블록)와 주석을 지우고 커밋.

## Submodule

`lab/practices/` 아래 외부 레퍼런스가 submodule로 등록되어 있다. 처음 클론하거나 업데이트할 때:

```sh
git submodule update --init --recursive
```
