/* V1 — "현재" reference: 원본 갤러리 화면을 토큰화해서 그대로 재현
   비교 기준점이자 "지금 이 상태"를 보여주기 위한 시안 */

function V1Current({ accent = PIVO.red, mode = 'grid' }) {
  const tabs = ['전체보기', '동영상', '사진'];
  const [tab, setTab] = React.useState('전체보기');
  const tiles = [
    { h: 22,  d: '06:04', l: 'CLIP_001' },
    { h: 96,  d: '00:08', l: 'CLIP_002' },
    { h: 18,  d: '01:02', l: 'CLIP_003' },
    { h: 220, d: '00:06', l: 'CLIP_004' },
    { h: 220, d: '00:06', l: 'CLIP_005' },
    { h: 220, d: '00:05', l: 'CLIP_006' },
    { h: 220, d: '00:06', l: 'CLIP_007' },
    { h: 220, d: '00:04', l: 'CLIP_008' },
    { h: 38,  d: '00:32', l: 'CLIP_009' },
    { h: 200, d: '01:18', l: 'CLIP_010' },
    { h: 178, d: '00:42', l: 'CLIP_011' },
    { h: 158, d: '00:54', l: 'CLIP_012' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', position: 'relative', color: PIVO.paperInk, fontFamily: FONT }}>
      <DynamicIsland/>
      <StatusBar dark={false}/>
      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.6 }}>갤러리</div>
          <div style={{
            width: 38, height: 38, borderRadius: 999,
            background: `linear-gradient(135deg, ${accent}, #FF6A3D)`,
          }}/>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          {tabs.map(t => (
            <div key={t} onClick={() => setTab(t)} style={{
              padding: '8px 16px', borderRadius: 999,
              fontSize: 14, fontWeight: 600,
              background: tab === t ? accent : '#F0F0EE',
              color: tab === t ? '#fff' : PIVO.paperInk,
              cursor: 'pointer',
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 16 }}>
          {tiles.map((t, i) => (
            <MediaTile key={i} hue={t.h} duration={t.d} ratio="1" radius={6} dark={true}/>
          ))}
        </div>
      </div>
      <TabBar dark={false} accent={accent}/>
      <HomeIndicator dark={false}/>
    </div>
  );
}

window.V1Current = V1Current;
