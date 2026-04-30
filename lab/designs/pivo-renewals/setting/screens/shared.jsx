// Shared tokens, helpers, and primitive components for the Pivo settings screens.

const PIVO_INK = '#313340';
const PIVO_INK2 = '#5A5B66';
const PIVO_INK3 = '#83848C';
const PIVO_INK4 = '#ACADB2';
const PIVO_LINE = '#D5D6D8';
const PIVO_LINE_SOFT = '#EAEAEB';
const PIVO_BG = '#F7F7F7';
const PIVO_RED = '#EC2544';
const PIVO_RED_700 = '#BA1832';
const PIVO_RED_50 = '#FEEBEF';
const PLUS_BLUE = '#1745E8';
const PLUS_BLUE_50 = '#EDF1FE';
const PURPLE = '#872AFF';
const ORANGE = '#F8673E';
const AMBER = '#FFAC33';
const TEAL = '#02E48E';

const GRAD_PIVO_PURPLE = 'linear-gradient(135deg, #EC2544 0%, #872AFF 100%)';
const GRAD_WARM = 'linear-gradient(135deg, #FBB656 0%, #F46363 100%)';
const GRAD_BLUE = 'linear-gradient(135deg, #7CA3EE 0%, #872AFF 100%)';
const GRAD_MINT = 'linear-gradient(135deg, #37CBA8 0%, #719AF2 100%)';

// ── Top nav (Korean text supported) ──
function NavBar({ title, onBack, right }) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center', padding: '0 12px',
      background: '#fff', position: 'relative', flexShrink: 0,
      borderBottom: `1px solid ${PIVO_LINE_SOFT}`,
    }}>
      {onBack !== undefined && (
        <button onClick={onBack} style={{
          background: 'none', border: 0, cursor: 'pointer', padding: 8, marginLeft: -4,
          color: PIVO_INK, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
            <path d="M9.5 1L1.5 9l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'Caros Soft, Poppins, system-ui',
          fontWeight: 700, fontSize: 17, color: PIVO_INK,
        }}>{title}</span>
      </div>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

// ── Status bar (iOS) ──
function StatusBar({ time = '12:15' }) {
  return (
    <div style={{
      height: 47, display: 'flex', justifyContent: 'space-between',
      alignItems: 'flex-end', padding: '0 28px 8px',
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
      color: '#000', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontWeight: 590, fontSize: 16 }}>{time}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M3 3l18 18M5 12c0-3 2-5 5-6m4 0c1 0 2 .3 3 1M5 6l-2 2 2 2 2-2-2-2zM12 1.5c-3 0-5 1-7 3l2 2c1-1 3-2 5-2s4 1 5 2l2-2c-2-2-4-3-7-3z" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="18" height="11" viewBox="0 0 19 12" fill="none">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="#000"/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="#000"/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="#000"/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="#000"/>
        </svg>
        <span style={{ fontWeight: 590, fontSize: 14 }}>LTE</span>
        <div style={{
          width: 28, height: 13, borderRadius: 4, background: '#000',
          color: '#fff', fontSize: 9, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: -0.3,
        }}>72</div>
      </div>
    </div>
  );
}

// Section label like "계정", "앱"
function SectionLabel({ children, color = PIVO_INK3 }) {
  return (
    <div style={{
      fontFamily: 'Caros Soft, system-ui',
      fontWeight: 500, fontSize: 13, color,
      padding: '20px 24px 8px',
    }}>{children}</div>
  );
}

// Settings row
function Row({ icon, iconColor, label, value, onClick, last, hint, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', background: '#fff', border: 0, cursor: onClick ? 'pointer' : 'default',
      padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
      borderBottom: last ? 'none' : `1px solid ${PIVO_LINE_SOFT}`,
      fontFamily: 'Caros Soft, system-ui', textAlign: 'left',
      opacity: disabled ? 0.5 : 1,
    }}>
      {icon && (
        <span style={{
          width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: iconColor, flexShrink: 0,
        }}>{icon}</span>
      )}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 500, fontSize: 15, color: PIVO_INK, display: 'flex', alignItems: 'center', gap: 4 }}>
          {label}
          {hint}
        </span>
      </span>
      {value !== undefined && (
        <span style={{
          fontWeight: 400, fontSize: 14, color: PIVO_INK3,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>{value}</span>
      )}
    </button>
  );
}

// Chevron
function Chev({ color = PIVO_INK4 }) {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ marginLeft: 4 }}>
      <path d="M1 1l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={PIVO_INK4} strokeWidth="1.2"/>
      <circle cx="7" cy="4" r="0.8" fill={PIVO_INK4}/>
      <path d="M7 6.5v4" stroke={PIVO_INK4} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function Toggle({ on, onChange, accent = PIVO_RED }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: 51, height: 31, borderRadius: 999, border: 0, padding: 0, cursor: 'pointer',
      background: on ? accent : '#E0E0E0',
      position: 'relative', transition: 'background .18s', flexShrink: 0,
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 22 : 2, width: 27, height: 27,
        borderRadius: '50%', background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.2)',
        transition: 'left .18s',
      }} />
    </button>
  );
}

// Primary pill button with red→pink→purple gradient
function GradButton({ children, onClick, style, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', height: 56, borderRadius: 999, border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
      background: 'linear-gradient(90deg, #EC2544 0%, #E83A6E 50%, #B97AE6 100%)',
      color: '#fff', fontFamily: 'Caros Soft, system-ui', fontWeight: 700, fontSize: 17,
      letterSpacing: 0.2, opacity: disabled ? 0.5 : 1,
      boxShadow: '0 8px 24px rgba(236,37,68,0.28)',
      ...style,
    }}>{children}</button>
  );
}

// Outlined pill button
function OutlineButton({ children, onClick, color = PIVO_RED, style, trailing }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 52, borderRadius: 999, cursor: 'pointer',
      background: '#fff', border: `1.5px solid ${color}`, color,
      fontFamily: 'Caros Soft, system-ui', fontWeight: 700, fontSize: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      position: 'relative',
      ...style,
    }}>
      <span>{children}</span>
      {trailing && (
        <span style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          width: 26, height: 26, borderRadius: '50%', background: color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{trailing}</span>
      )}
    </button>
  );
}

// Phone shell — just a rounded white surface with status bar
function Phone({ children, width = 390, height = 844, style }) {
  return (
    <div style={{
      width, height, background: '#fff', borderRadius: 44,
      boxShadow: '0 30px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
      overflow: 'hidden', position: 'relative',
      fontFamily: 'Caros Soft, Poppins, system-ui',
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Pivo pod illustration (used in device cards) ──
function PivoPod({ scale = 1, accent = false, size = 'md' }) {
  const w = size === 'sm' ? 78 : 96;
  const h = size === 'sm' ? 96 : 118;
  return (
    <div style={{
      width: w, height: h, position: 'relative',
      transform: `scale(${scale})`,
    }}>
      {/* top bracket */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: w * 0.85, height: 8, background: '#1a1a1a',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
      }} />
      {/* arms */}
      <div style={{
        position: 'absolute', top: 4, left: '12%', width: 4, height: 18,
        background: '#1a1a1a', borderRadius: 2,
      }} />
      <div style={{
        position: 'absolute', top: 4, right: '12%', width: 4, height: 18,
        background: '#1a1a1a', borderRadius: 2,
      }} />
      {/* head body — squat cylinder */}
      <div style={{
        position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
        width: w * 0.78, height: h * 0.55,
        background: 'radial-gradient(ellipse at 30% 30%, #4a4a4a 0%, #1a1a1a 50%, #050505 100%)',
        borderRadius: w * 0.18,
      }}>
        {/* red ring (only on accent variant) */}
        {accent && (
          <div style={{
            position: 'absolute', top: '38%', left: 0, right: 0, height: 1.5,
            background: PIVO_RED,
          }} />
        )}
        {/* lens */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: w * 0.32, height: w * 0.32, borderRadius: '50%',
          background: '#0a0a0a', border: '1.5px solid #2a2a2a',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '50%', height: '50%', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #555 0%, #111 100%)',
          }} />
        </div>
      </div>
      {/* base */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: w * 0.92, height: h * 0.18,
        background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: '12px 12px 18px 18px',
      }} />
    </div>
  );
}

// progress bar
function ProgressBar({ pct, color = PLUS_BLUE, height = 6 }) {
  return (
    <div style={{
      width: '100%', height, borderRadius: 999,
      background: '#E5E7EB', overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%', borderRadius: 999,
        background: color, transition: 'width .4s ease',
      }} />
    </div>
  );
}

Object.assign(window, {
  PIVO_INK, PIVO_INK2, PIVO_INK3, PIVO_INK4, PIVO_LINE, PIVO_LINE_SOFT,
  PIVO_BG, PIVO_RED, PIVO_RED_700, PIVO_RED_50, PLUS_BLUE, PLUS_BLUE_50,
  PURPLE, ORANGE, AMBER, TEAL,
  GRAD_PIVO_PURPLE, GRAD_WARM, GRAD_BLUE, GRAD_MINT,
  NavBar, StatusBar, SectionLabel, Row, Chev, InfoIcon, Toggle,
  GradButton, OutlineButton, Phone, PivoPod, ProgressBar,
});
