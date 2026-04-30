/* V5 — Activity Feed
   라이트 톤(페이퍼). 시간순 활동 피드 — 촬영, 코치 리뷰, 디바이스 알림이 한 흐름.
   "오늘"의 행동을 강조하는 미니멀 + 클린 톤. */

function V5Feed({ accent = PIVO.red, mode = 'grid' }) {
  const items = [
    {
      kind: 'clip', time: '14:22', title: '승마 트레이닝 · 라운드 3',
      meta: '06:04 · 4K · 정확도 98%', hue: 12, dur: '06:04',
    },
    {
      kind: 'coach', time: '13:40',
      title: '코치 윤서연 · 리뷰 1건', meta: '자세 교정 포인트 3개',
    },
    {
      kind: 'clip', time: '11:08', title: '아침 라이딩',
      meta: '01:12 · 1080p · 정확도 94%', hue: 200, dur: '01:12',
    },
    {
      kind: 'system', time: '09:30',
      title: 'Pivo Pod 펌웨어 2.3.1', meta: '추적 안정성 향상',
    },
    {
      kind: 'clip', time: '어제',
      title: '오후 세션 · 라운드 2', meta: '02:04 · 4K', hue: 158, dur: '02:04',
    },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: PIVO.paper, position: 'relative', color: PIVO.paperInk, fontFamily: FONT }}>
      <DynamicIsland/>
      <StatusBar dark={false}/>

      {/* Header */}
      <div style={{ padding: '6px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: MONO, color: PIVO.paperDim, letterSpacing: 0.6 }}>2026 · 04 · 29</div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6, marginTop: 4 }}>오늘</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: `linear-gradient(135deg, ${accent}, #FF6A3D)` }}/>
        </div>
        {/* compact stats */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[
            { l: '촬영', v: '3', s: 'clips' },
            { l: '시간', v: '00:42', s: 'total' },
            { l: '리뷰', v: '1', s: 'new' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '10px 12px', borderRadius: 14, background: '#fff', border: `1px solid ${PIVO.paperLine}` }}>
              <div style={{ fontSize: 10, fontFamily: MONO, color: PIVO.paperDim, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.l}</div>
              <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3, marginTop: 2 }}>{s.v}</div>
              <div style={{ fontSize: 10, fontFamily: MONO, color: PIVO.paperDim, marginTop: 1 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ marginTop: 22, padding: '0 24px' }}>
        <div style={{ fontSize: 11, fontFamily: MONO, color: PIVO.paperDim, letterSpacing: 0.6, textTransform: 'uppercase' }}>활동</div>
        <div style={{ marginTop: 10, position: 'relative' }}>
          {/* timeline rail */}
          <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 1, background: PIVO.paperLine }}/>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 14, position: 'relative' }}>
              <div style={{
                width: 27, height: 27, borderRadius: 999, flexShrink: 0,
                background: it.kind === 'clip' ? accent : it.kind === 'coach' ? '#0B0B0E' : '#fff',
                border: it.kind === 'system' ? `1px solid ${PIVO.paperLine}` : 'none',
                color: it.kind === 'system' ? PIVO.paperInk : '#fff',
                display: 'grid', placeItems: 'center', marginTop: 2,
                zIndex: 1,
              }}>
                {it.kind === 'clip' && Icon.cam(13, '#fff')}
                {it.kind === 'coach' && Icon.sparkle(11, '#fff')}
                {it.kind === 'system' && Icon.device(13)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{it.title}</div>
                  <div style={{ fontSize: 10, fontFamily: MONO, color: PIVO.paperDim }}>{it.time}</div>
                </div>
                <div style={{ fontSize: 11, color: PIVO.paperDim, marginTop: 2, fontFamily: MONO }}>{it.meta}</div>
                {it.kind === 'clip' && (
                  <div style={{ marginTop: 8 }}>
                    <MediaTile hue={it.hue} duration={it.dur} ratio="16 / 9" radius={10} dark={true} showPlay={i===0}/>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar dark={false} accent={accent}/>
      <HomeIndicator dark={false}/>
    </div>
  );
}

window.V5Feed = V5Feed;
