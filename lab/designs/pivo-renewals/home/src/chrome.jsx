/* Shared phone chrome — status bar, tab bar, FAB.
   Used inside every variant artboard so they line up visually. */

function StatusBar({ dark = true, time = '12:38' }) {
  const fg = dark ? '#fff' : '#0B0B0E';
  return (
    <div style={{
      height: 52, padding: '0 28px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      paddingBottom: 4,
      fontFamily: FONT, fontWeight: 600, fontSize: 15, color: fg,
    }}>
      <div>{time}</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.95 }}>
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={fg}>
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
        </svg>
        {/* battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={fg} strokeOpacity="0.5"/>
          <rect x="2" y="2" width="13" height="8" rx="1.5" fill={fg}/>
          <rect x="23.5" y="4" width="2" height="4" rx="1" fill={fg} fillOpacity="0.5"/>
          <text x="11" y="9" fontSize="7" fontWeight="700" fontFamily={FONT} fill={dark ? '#000' : '#fff'} textAnchor="middle">70</text>
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{
      position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
      width: 122, height: 36, borderRadius: 22, background: '#000', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 10px',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        background: 'linear-gradient(135deg, #FF2E4D, #FF7A30)',
        boxShadow: '0 0 0 1.5px rgba(255,255,255,0.06)',
      }}/>
      <div style={{ display: 'flex', gap: 3 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.4)' }}/>
        ))}
      </div>
    </div>
  );
}

function HomeIndicator({ dark = true }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0,
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 999,
        background: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.3)',
      }}/>
    </div>
  );
}

/* Bottom nav with center FAB — matches original screenshot's structure */
function TabBar({ dark = true, accent = PIVO.red, active = 'home', label = { home: '홈', coach: '코치' } }) {
  const bg = dark ? 'rgba(15,15,18,0.85)' : 'rgba(255,255,255,0.92)';
  const ink = dark ? '#fff' : '#0B0B0E';
  const dim = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const activeColor = accent;
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 92,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 78,
        background: bg, backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}/>
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', padding: '0 56px',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: active === 'home' ? activeColor : dim }}>
          {active === 'home' ? Icon.homeFill(24, activeColor) : Icon.home(24)}
          <div style={{ fontSize: 11, fontWeight: 600, fontFamily: FONT }}>{label.home}</div>
        </div>
        <div style={{ width: 64 }}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: active === 'coach' ? activeColor : dim }}>
          {Icon.coach(24)}
          <div style={{ fontSize: 11, fontWeight: 600, fontFamily: FONT }}>{label.coach}</div>
        </div>
      </div>
      {/* FAB */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        width: 64, height: 64, borderRadius: 999,
        background: `linear-gradient(135deg, ${accent} 0%, #FF6A3D 100%)`,
        boxShadow: `0 12px 28px ${PIVO.redGlow}, 0 0 0 4px ${dark ? '#0c0c0e' : '#fff'}`,
        display: 'grid', placeItems: 'center',
      }}>
        {Icon.plus(28)}
      </div>
    </div>
  );
}

window.StatusBar = StatusBar;
window.DynamicIsland = DynamicIsland;
window.HomeIndicator = HomeIndicator;
window.TabBar = TabBar;
