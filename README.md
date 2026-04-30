# jamey.claude

개인 Claude Code 자산(스킬·에이전트)과 디자인·학습 자료를 한 저장소에서 관리한다.
배포는 `home/`을 `$HOME`에 심볼릭 링크하는 dotfiles 방식 — 저장소를 수정하면 곧바로 Claude Code에 반영된다.

## 구조

```
home/.claude/
  skills/                          # 슬래시 커맨드(/skill-id)로 호출하는 스킬
    base.format/                   # SKILL.md 템플릿
    git.branch / git.commit / git.review
    gitflow.release.start / gitflow.release.finish
    github.pr.create / github.pr.comment.android
    jira.comment.context / jira.comment.md
    string.short.kebab
  agents/                          # @agent-<name>으로 위임할 서브에이전트
    base/                          # AGENT.md 템플릿
    git/

lab/                               # 저장소 안에서만 참고 (배포 안 됨)
  practices/                       # 외부 학습 레퍼런스
    andrej-karpathy-skills/{en,ko} # submodule
    gstack/{en,ko}                 # submodule
    superpowers/{en,ko}            # submodule
    jw/                            # 매뉴얼 (PDF + en/ko 자료)
  designs/                         # 디자인 작업물
    pivo-design-system/            # 폰트(CarosSoft, Poppins) + Figma 링크
    pivo-renewals/                 # Pivo 홈/설정 화면 리뉴얼 시안

ln                                 # 심볼릭 링크할 경로 목록
ln.sh                              # ln 항목을 home/ → $HOME 으로 연결
.gitmodules                        # submodule 정의
.gitattributes                     # *.fig LFS 추적 (현재 .fig는 추적 제외)
```

## 배포

```sh
./ln.sh
```

`ln`에 적힌 경로(현재 `.claude/agents`, `.claude/skills`)를 `home/<path>` → `$HOME/<path>`로 심볼릭 링크한다.
이미 같은 타깃이면 `ok`, 다른 곳을 가리키거나 일반 파일이면 `skip`, 깨진 링크는 자동 복구한다.
새 경로를 배포하려면 `ln`에 한 줄 추가 후 다시 실행.

## 스킬

| 스킬 | 용도 |
|---|---|
| `base.format` | SKILL.md 작성 템플릿 (복사해서 새 스킬 시작) |
| `git.branch` | 티켓 기반 브랜치 생성 (통합 브랜치에서 분기) |
| `git.commit` | Conventional Commits 형식 커밋 작성 |
| `git.review` | 커밋·푸시·PR 전 자기 점검 |
| `gitflow.release.start` | release 브랜치 분기 + 버전 bump |
| `gitflow.release.finish` | release 머지·태깅·푸시 |
| `github.pr.create` | stage 베이스 PR 생성 |
| `github.pr.comment.android` | Android 시니어 관점 PR 코드리뷰 |
| `jira.comment.context` | 현재 대화를 양국어 Jira 댓글로 등록 |
| `jira.comment.md` | 마크다운 파일 두 개를 양국어 Jira 댓글로 등록 |
| `string.short.kebab` | 자유 문구 → 짧은 kebab-case 슬러그 |

## 에이전트

- `base` — AGENT.md 템플릿
- `git` — git 흐름(브랜치/커밋/PR/머지) 위임용 시니어 에이전트

## 새 스킬·에이전트 만들기

- 스킬: `home/.claude/skills/base.format/SKILL.md`를 복사해 `home/.claude/skills/<skill-id>/SKILL.md`로 저장.
- 에이전트: `home/.claude/agents/base/AGENT.md`를 복사해 `home/.claude/agents/<agent-id>/AGENT.md`로 저장.

각 템플릿 상단 HTML 주석에 frontmatter 필드, 섹션 구조, 작성 컨벤션이 모두 들어 있다.
새 파일을 만들 때는 가시 안내(💡 블록)와 모든 주석을 지우고 커밋.

## Submodule

`lab/practices/` 아래 외부 레퍼런스가 submodule로 등록되어 있다 (현재 6개 — andrej-karpathy-skills·gstack·superpowers의 en/ko). 처음 클론하거나 업데이트할 때:

```sh
git submodule update --init --recursive
```
