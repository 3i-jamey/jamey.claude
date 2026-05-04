#!/bin/sh
# ln 파일의 각 경로를 home/ 에서 $HOME 으로 심볼릭 링크 연결
# ln 항목 형식: <SRC>:<DST> — home/<SRC> → ~/<DST>
set -e

# 스크립트가 있는 디렉토리를 저장소 루트로 사용
REPO="$(cd "$(dirname "$0")" && pwd)"
SRC="$REPO/home"

ensure_link() {
  src="$SRC/$1"
  dst="$HOME/$2"

  # 이미 심볼릭 링크 → 정상/다른 곳/깨짐 분기
  if [ -L "$dst" ]; then
    if [ -e "$dst" ]; then
      target=$(readlink "$dst")
      if [ "$target" = "$src" ]; then
        echo "ok:   $dst"
      else
        echo "skip: $dst (symlink → $target)"
      fi
    else
      # 깨진 링크는 제거 후 재생성
      rm "$dst"
      mkdir -p "$(dirname "$dst")"
      ln -s "$src" "$dst"
      echo "fix:  $dst -> $src (was broken)"
    fi
    return
  fi

  # 일반 파일/디렉토리는 안전상 덮어쓰지 않고 skip
  if [ -e "$dst" ]; then
    echo "skip: $dst (exists)"
    return
  fi

  mkdir -p "$(dirname "$dst")"
  ln -s "$src" "$dst"
  echo "link: $dst -> $src"
}

# `|| [ -n "$line" ]`: 마지막 줄에 개행 없어도 처리
while read -r line || [ -n "$line" ]; do
  # 빈 줄 / 주석 라인 무시
  case "$line" in ''|\#*) continue ;; esac
  src_path="${line%%:*}"
  dst_path="${line#*:}"
  # 콜론이 없으면 src=dst 로 폴백
  [ "$src_path" = "$line" ] && dst_path="$src_path"
  ensure_link "$src_path" "$dst_path"
done < "$REPO/ln"
