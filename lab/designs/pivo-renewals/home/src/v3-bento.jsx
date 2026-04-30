/* V3 — Bento (LIGHT)
   라이트 페이퍼 톤. 비대칭 그리드 대시보드. */

function V3Bento({ accent = PIVO.red, mode = 'grid' }) {
  return (
    <div style={{ width: '100%', height: '100%', background: PIVO.paper, position: 'relative', color: PIVO.paperInk, fontFamily: FONT, overflow: 'hidden' }}>
      <DynamicIsland/>
      <StatusBar dark={false}/>

      <div style={{ padding: '6px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4 }}>Pivo Track</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${PIVO.paperLine}` }}>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: '#1B9D58' }}/>
          <span style={{ fontSize: 11, fontFamily: MONO, color: PIVO.paperDim }}>POD · 84%</span>
        </div>
      </div>

      {/* Bento grid */}
      <div style={{
        marginTop: 18, padding: '0 18px',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: '78px',
        gap: 8,
      }}>
        {/* Hero — 최근 영상 */}
        <div style={{ gridColumn: 'span 6', gridRow: 'span 3', position: 'relative', borderRadius: 18, overflow: 'hidden' }}>
          <MediaTile hue={12} ratio="" radius={18} style={{ position: 'absolute', inset: 0 }} showStripes={true}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7))' }}/>
          <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 8px', borderRadius: 999, background: accent, color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: MONO, letterSpacing: 0.5 }}>● 방금 촬영</div>
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, color: '#fff' }}>
            <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.15 }}>승마 트레이닝 · 라운드 3</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontFamily: MONO, marginTop: 4 }}>06:04 · 4K · 추적 정확도 98%</div>
          </div>
          <div style={{ position: 'absolute', bottom: 14, right: 14, width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.25)' }}>
            {Icon.play(14)}
          </div>
        </div>

        {/* Quick — 빠른 촬영 */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2', borderRadius: 18, padding: 14, background: `linear-gradient(140deg, ${accent}, #FF6A3D)`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, fontFamily: MONO, letterSpacing: 0.4 }}>QUICK</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6, lineHeight: 1.15 }}>지금 바로<br/>촬영</div>
          <div style={{ position: 'absolute', bottom: 12, right: 12, width: 36, height: 36, borderRadius: 999, background: 'rgba(0,0,0,0.25)', display: 'grid', placeItems: 'center' }}>
            {Icon.cam(18, '#fff')}
          </div>
        </div>

        {/* Stat — 이번주 */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2', borderRadius: 18, padding: 14, background: '#fff', border: `1px solid ${PIVO.paperLine}` }}>
          <div style={{ fontSize: 11, fontFamily: MONO, color: PIVO.paperDim, letterSpacing: 0.4 }}>THIS WEEK</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, marginTop: 6 }}>12<span style={{ fontSize: 14, color: PIVO.paperDim, marginLeft: 4 }}>clips</span></div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8, alignItems: 'flex-end', height: 22 }}>
            {[8, 14, 6, 18, 22, 11, 16].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h, borderRadius: 2, background: i === 4 ? accent : 'rgba(11,11,14,0.12)' }}/>
            ))}
          </div>
        </div>

        {/* 3-up small thumbs */}
        <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
          <MediaTile hue={200} duration="00:24" ratio="" radius={14} style={{ height: '100%' }}/>
        </div>
        <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
          <MediaTile hue={158} duration="01:08" ratio="" radius={14} style={{ height: '100%' }}/>
        </div>
        <div style={{ gridColumn: 'span 2', gridRow: 'span 2', borderRadius: 14, background: '#fff', border: `1px solid ${PIVO.paperLine}`, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ color: accent }}>{Icon.sparkle(16, accent)}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>코치<br/>리뷰 1건</div>
            <div style={{ fontSize: 10, color: PIVO.paperDim, fontFamily: MONO, marginTop: 4 }}>NEW</div>
          </div>
        </div>
      </div>

      <TabBar dark={false} accent={accent}/>
      <HomeIndicator dark={false}/>
    </div>
  );
}

window.V3Bento = V3Bento;
