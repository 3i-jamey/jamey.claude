# Desktop Application

**Lens:** 네이티브 UI, OS 통합, 인스톨러, 자동 업데이트, 크로스 플랫폼 이슈.

**Core question:** "사용자의 OS에 어울려 보이는가?"

## 도메인 지식
- **Framework choice** — Electron, Tauri, 네이티브 (WPF, SwiftUI, GTK)? 무게 vs 기능 트레이드오프.
- **OS integration** — 시스템 트레이, 파일 연결, 알림, 키보드 단축키, 드래그&드롭.
- **Installation** — 인스톨러 UX, 자동 업데이트 메커니즘, 사일런트 vs 사용자 프롬프트.
- **Data storage** — 사용자 데이터는 어디에 사는가? OS에 맞는 경로. 백업과 마이그레이션.
- **Offline by default** — 데스크톱 앱은 완전히 오프라인으로 동작해야 한다. 네트워크 기능은 부가적.
- **Multi-window** — 윈도우 관리, 윈도우 간 상태 동기화, 위치 기억.

## 흔한 함정
- 네이티브 앱이 아닌 브라우저 탭처럼 느껴지는 Electron 앱
- 자동 업데이트 메커니즘 없음 — 사용자가 옛 버전에 갇힘
- OS 사용자 데이터 디렉토리가 아닌 앱 상대 경로에 데이터 저장
- OS 레벨 설정 (다크 모드, 접근성, 로케일) 미존중
- 흔한 액션에 키보드 단축키 누락
