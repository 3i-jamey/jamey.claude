/* V2 — Stories Feed (LIGHT)
   라이트 페이퍼 톤. 상단 큰 가로 캐러셀 + 디바이스 상태 + 그리드. */

function V2Stories({ accent = PIVO.red, mode = 'grid' }) {
  const stories = [
    { h: 12,  d: '00:48', t: '오늘 · 14:22' },
    { h: 200, d: '01:12', t: '오늘 · 11:08' },
    { h: 38,  d: '00:24', t: '어제'        },
    { h: 158, d: '02:04', t: '어제'        },
    { h: 312, d: '00:36', t: '4월 27일'    },
  ];
  const grid = [
    { h: 18,  d: '00:42' }, { h: 220, d: '00:18' }, { h: 96, d: '01:08' },
    { h: 178, d: '00:24' }, { h: 28,  d: '00:54' }, { h: 46, d: '00:32' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: PIVO.paper, position: 'relative', color: PIVO.paperInk, fontFamily: FONT }}>
      <DynamicIsland/>
      <StatusBar dark={false}/>

      {/* Header */}
      <div style={{ padding: '10px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: PIVO.paperDim, fontFamily: MONO, letterSpacing: 0.6, textTransform: 'uppercase' }}>HOME</div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, marginTop: 2 }}>안녕하세요, 도윤님</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', border: `1px solid ${PIVO.paperLine}`, display: 'grid', placeItems: 'center', color: PIVO.paperDim }}>
            {Icon.search(18)}
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', border: `1px solid ${PIVO.paperLine}`, display: 'grid', placeItems: 'center', color: PIVO.paperDim, position: 'relative' }}>
            {Icon.bell(18)}
            <div style={{ position: 'absolute', top: 9, right: 10, width: 6, height: 6, borderRadius: 999, background: accent }}/>
          </div>
        </div>
      </div>

      {/* Device status pill */}
      <div style={{ margin: '20px 22px 0', padding: '12px 14px', borderRadius: 16,
        background: '#fff', display: 'flex', alignItems: 'center', gap: 12,
        border: `1px solid ${PIVO.paperLine}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8F8EE', display: 'grid', placeItems: 'center', color: '#1B9D58' }}>
          {Icon.device(18)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Pivo Pod 연결됨</div>
          <div style={{ fontSize: 11, color: PIVO.paperDim, fontFamily: MONO, marginTop: 2 }}>BAT 84% · FW 2.3.1</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, background: '#E8F8EE', color: '#1B9D58', fontSize: 11, fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: '#1B9D58' }}/>
          준비됨
        </div>
      </div>

      {/* Recent — horizontal */}
      <div style={{ marginTop: 22, padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 17, fontWeight: 700 }}>최근 촬영</div>
        <div style={{ fontSize: 12, color: PIVO.paperDim, display: 'flex', alignItems: 'center', gap: 4 }}>
          전체보기 {Icon.arrowR(12, PIVO.paperDim)}
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 10, padding: '0 22px', overflow: 'hidden' }}>
        {stories.map((s, i) => (
          <div key={i} style={{ flexShrink: 0, width: 132 }}>
            <MediaTile hue={s.h} duration={s.d} ratio="3 / 4" radius={14} showPlay={i===0} badge={i===0 ? 'NEW' : null}/>
            <div style={{ fontSize: 11, color: PIVO.paperDim, marginTop: 6, fontFamily: MONO }}>{s.t}</div>
          </div>
        ))}
      </div>

      {/* All grid teaser */}
      <div style={{ marginTop: 22, padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 17, fontWeight: 700 }}>모든 영상</div>
        <div style={{ fontSize: 12, color: PIVO.paperDim, fontFamily: MONO }}>248 CLIPS</div>
      </div>
      <div style={{
        marginTop: 12, padding: '0 22px',
        display: 'grid', gridTemplateColumns: mode === 'list' ? '1fr' : 'repeat(3, 1fr)', gap: mode === 'list' ? 8 : 4,
      }}>
        {grid.map((t, i) => mode === 'list' ? (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0' }}>
            <MediaTile hue={t.h} duration={t.d} ratio="16 / 10" radius={8} style={{ width: 84 }}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>CLIP_{String(i+10).padStart(3,'0')}</div>
              <div style={{ fontSize: 11, color: PIVO.paperDim, fontFamily: MONO }}>{t.d}</div>
            </div>
          </div>
        ) : (
          <MediaTile key={i} hue={t.h} duration={t.d} ratio="1" radius={8}/>
        ))}
      </div>

      <TabBar dark={false} accent={accent}/>
      <HomeIndicator dark={false}/>
    </div>
  );
}

window.V2Stories = V2Stories;
