/* V4 — Cinematic Hero (LIGHT)
   라이트 페이퍼 톤. hero 영상은 색감 유지(콘텐츠 자체는 어두울 수 있음),
   하단 chrome과 strip 영역만 라이트. */

function V4Hero({ accent = PIVO.red, mode = 'grid' }) {
  const strip = [
    { h: 200, d: '01:12' },
    { h: 38,  d: '00:24' },
    { h: 158, d: '02:04' },
    { h: 312, d: '00:36' },
    { h: 96,  d: '00:48' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: PIVO.paper, position: 'relative', color: PIVO.paperInk, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Hero — fills upper 56% */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '56%' }}>
        <MediaTile hue={12} ratio="" radius={0} style={{ height: '100%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 60%, rgba(246,246,244,1) 100%)' }}/>
      </div>

      <DynamicIsland/>
      <StatusBar dark={true}/>

      {/* Top row — brand + actions over hero */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 999, background: `linear-gradient(135deg, ${accent}, #FF6A3D)` }}/>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>Pivo Track</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[Icon.search(18), Icon.bell(18)].map((ic, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)', display: 'grid', placeItems: 'center' }}>{ic}</div>
          ))}
        </div>
      </div>

      {/* Hero meta — over hero, white text */}
      <div style={{ position: 'absolute', top: '32%', left: 0, right: 0, padding: '0 26px', color: '#fff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: accent, fontSize: 10, fontFamily: MONO, fontWeight: 700, letterSpacing: 0.6 }}>
          ● LATEST
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.8, marginTop: 12, lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>승마 트레이닝<br/>라운드 03</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', fontFamily: MONO, marginTop: 8 }}>오늘 14:22 · 06:04 · 4K · POD A1</div>
      </div>

      {/* CTA row — sits on light area */}
      <div style={{ position: 'absolute', top: '54%', left: 0, right: 0, padding: '0 22px', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 50, borderRadius: 14, background: PIVO.paperInk, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700 }}>
          {Icon.play(13, '#fff')} 재생
        </div>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: '#fff', border: `1px solid ${PIVO.paperLine}`, display: 'grid', placeItems: 'center', color: PIVO.paperInk }}>
          {Icon.bolt(16)}
        </div>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: '#fff', border: `1px solid ${PIVO.paperLine}`, display: 'grid', placeItems: 'center', color: PIVO.paperInk }}>
          {Icon.sparkle(15)}
        </div>
      </div>

      {/* Strip */}
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 22px', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>이어서 보기</div>
          <div style={{ fontSize: 11, color: PIVO.paperDim, fontFamily: MONO }}>{strip.length} · {248}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 22px', overflow: 'hidden' }}>
          {strip.map((s, i) => (
            <div key={i} style={{ flexShrink: 0, width: 96 }}>
              <MediaTile hue={s.h} duration={s.d} ratio="3 / 4" radius={10}/>
            </div>
          ))}
        </div>
      </div>

      <TabBar dark={false} accent={accent}/>
      <HomeIndicator dark={false}/>
    </div>
  );
}

window.V4Hero = V4Hero;
