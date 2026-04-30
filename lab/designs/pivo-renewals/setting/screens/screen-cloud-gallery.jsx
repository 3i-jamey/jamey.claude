// Screen: 피보 클라우드 (Cloud Gallery / Lesson Gallery)

function ScreenCloudGallery({ onNav }) {
  const [tab, setTab] = React.useState('cloud');
  const [selectMode, setSelectMode] = React.useState(false);

  const todayItems = [
    { id: 1, color: '#9CA8AA', label: 'keyboard' },
    { id: 2, color: '#C5B79A', label: 'desk' },
    { id: 3, color: '#7C8E8B', label: 'plant' },
    { id: 4, color: '#A39689', label: 'coffee' },
  ];
  const yesterdayItems = [
    { id: 5, color: '#8FA3B8', label: 'sky' },
    { id: 6, color: '#B89E83', label: 'wood' },
  ];

  return (
    <Phone>
      <StatusBar />
      <NavBar title="피보 클라우드" onBack={() => onNav && onNav('back')} />

      {/* sub-toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px', background: '#fff', borderBottom: `1px solid ${PIVO_LINE_SOFT}`,
      }}>
        <button style={{
          background: 'none', border: 0, padding: 6, cursor: 'pointer', color: PIVO_INK,
        }}><IconHamburger /></button>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: '#EFEFF1',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: PIVO_INK3,
        }}><IconPerson size={18} /></div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#fff', padding: '0 18px' }}>
        {[{ id: 'cloud', label: 'Cloud Gallery' }, { id: 'lesson', label: 'Lesson Gallery' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '14px 0', background: 'none', border: 0,
            cursor: 'pointer', fontFamily: 'Caros Soft, system-ui',
            fontWeight: tab === t.id ? 700 : 500,
            fontSize: 15, color: tab === t.id ? PIVO_INK : PIVO_INK3,
            borderBottom: tab === t.id ? `2px solid ${PIVO_INK}` : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
        {/* select bar */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', padding: '12px 18px',
        }}>
          <button onClick={() => setSelectMode(!selectMode)} style={{
            padding: '10px 22px', borderRadius: 999, border: 0, cursor: 'pointer',
            background: selectMode ? PIVO_RED : '#2A2C39',
            color: '#fff', fontFamily: 'Caros Soft, system-ui',
            fontWeight: 700, fontSize: 14,
          }}>{selectMode ? 'Cancel' : 'Select'}</button>
        </div>

        {/* Today */}
        <DayGroup label="Today" items={todayItems} selectMode={selectMode} />
        <DayGroup label="Yesterday" items={yesterdayItems} selectMode={selectMode} />
        <div style={{ height: 32 }} />
      </div>

      {selectMode && (
        <div style={{
          padding: '12px 18px 24px', background: '#fff',
          borderTop: `1px solid ${PIVO_LINE_SOFT}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 13, color: PIVO_INK2, fontWeight: 500 }}>3개 선택됨</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <SmallPill>다운로드</SmallPill>
            <SmallPill danger>삭제</SmallPill>
          </div>
        </div>
      )}
    </Phone>
  );
}

function SmallPill({ children, danger }) {
  return (
    <button style={{
      padding: '8px 16px', borderRadius: 999, border: 0, cursor: 'pointer',
      background: danger ? PIVO_RED_50 : '#EFEFF1',
      color: danger ? PIVO_RED : PIVO_INK,
      fontWeight: 700, fontSize: 13,
    }}>{children}</button>
  );
}

function DayGroup({ label, items, selectMode }) {
  return (
    <div style={{ padding: '4px 18px 20px' }}>
      <div style={{ fontSize: 13, color: PIVO_INK3, fontWeight: 500, padding: '4px 0 10px' }}>{label}</div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
      }}>
        {items.map(item => (
          <ThumbCard key={item.id} item={item} selectMode={selectMode} />
        ))}
      </div>
    </div>
  );
}

function ThumbCard({ item, selectMode }) {
  const [sel, setSel] = React.useState(false);
  return (
    <button onClick={() => selectMode && setSel(!sel)} style={{
      aspectRatio: '1 / 1', borderRadius: 12, position: 'relative',
      background: `linear-gradient(135deg, ${item.color} 0%, ${shade(item.color, -20)} 100%)`,
      border: 0, padding: 0, cursor: 'pointer', overflow: 'hidden',
    }}>
      {/* fake content texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35,
        background: 'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.4) 0%, transparent 60%)',
      }} />
      {/* play badge */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      }}>
        <IconPlay size={36} />
      </div>
      {/* select badge */}
      {selectMode && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          width: 22, height: 22, borderRadius: '50%',
          background: sel ? PIVO_RED : 'rgba(255,255,255,0.85)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 1.5px rgba(255,255,255,0.9)',
        }}>{sel && <IconCheck size={14} />}</div>
      )}
      {/* duration */}
      <div style={{
        position: 'absolute', bottom: 6, right: 6,
        padding: '2px 6px', borderRadius: 4,
        background: 'rgba(0,0,0,0.6)',
        color: '#fff', fontSize: 10, fontWeight: 600,
      }}>0:{12 + item.id * 3}</div>
    </button>
  );
}

function shade(hex, p) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0,2),16) + p));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2,4),16) + p));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4,6),16) + p));
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

Object.assign(window, { ScreenCloudGallery });
