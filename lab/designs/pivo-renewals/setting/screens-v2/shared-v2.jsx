// V2 — Pivo settings, fully reimagined visual language.
// Same 8 screens, same information, very different design.

const V2_INK = '#0F1117';
const V2_INK2 = '#3F4252';
const V2_INK3 = '#7A7E8E';
const V2_INK4 = '#B5B7C2';
const V2_LINE = '#E8E9EE';
const V2_PAPER = '#F4F5F8';
const V2_RED = '#EC2544';
const V2_RED_BR = '#FF3D60';
const V2_BLUE = '#1745E8';
const V2_PURPLE = '#872AFF';
const V2_AMBER = '#FFAC33';
const V2_TEAL = '#02E48E';

const V2_GRAD_HERO = 'linear-gradient(140deg, #0F1117 0%, #1B1F2E 60%, #2A1A3F 100%)';
const V2_GRAD_RED = 'linear-gradient(135deg, #FF6B6B 0%, #EC2544 50%, #872AFF 100%)';
const V2_GRAD_RED_FLAT = 'linear-gradient(135deg, #FF3D60 0%, #B91A50 100%)';

// ── Phone shell (same shape, no overflow clip — can do bleeds) ──
function PhoneV2({ children, dark }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 44,
      boxShadow: '0 30px 60px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
      overflow: 'hidden', position: 'relative',
      fontFamily: 'Caros Soft, Poppins, system-ui',
      display: 'flex', flexDirection: 'column',
      background: dark ? V2_INK : '#fff',
    }}>{children}</div>
  );
}

// ── Status bar variants ──
function StatusV2({ dark, time = '12:15' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      height: 47, display: 'flex', justifyContent: 'space-between',
      alignItems: 'flex-end', padding: '0 28px 8px', flexShrink: 0,
      fontFamily: '-apple-system, "SF Pro Text", system-ui', color: c,
    }}>
      <span style={{ fontWeight: 590, fontSize: 16 }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="18" height="11" viewBox="0 0 19 12" fill="none">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <span style={{ fontWeight: 590, fontSize: 14 }}>LTE</span>
        <div style={{
          width: 28, height: 13, borderRadius: 4, background: c,
          color: dark ? '#000' : '#fff', fontSize: 9, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: -0.3,
        }}>72</div>
      </div>
    </div>
  );
}

// ── Big "Page header" — replaces tiny iOS nav title ──
function BigHeader({ eyebrow, title, sub, onBack, dark, right }) {
  const fg = dark ? '#fff' : V2_INK;
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : V2_INK3;
  return (
    <div style={{ padding: '8px 24px 28px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {onBack ? (
          <button onClick={onBack} style={{
            width: 40, height: 40, borderRadius: 999, border: 0, cursor: 'pointer',
            background: dark ? 'rgba(255,255,255,0.08)' : V2_PAPER,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <div style={{ width: 40 }} />}
        {right || <div style={{ width: 40 }} />}
      </div>
      <div>
        {eyebrow && (
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
            color: dark ? V2_RED_BR : V2_RED, textTransform: 'uppercase', marginBottom: 6,
          }}>{eyebrow}</div>
        )}
        <h1 style={{
          margin: 0, fontWeight: 700, fontSize: 34, lineHeight: 1.05,
          letterSpacing: -0.8, color: fg,
        }}>{title}</h1>
        {sub && (
          <div style={{
            marginTop: 6, fontSize: 14, color: fg2, fontWeight: 500,
          }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

// ── New row: card-shaped, with iconified leading + more breathing room ──
function CardRow({ icon, label, sub, value, onClick, dark, accent }) {
  const fg = dark ? '#fff' : V2_INK;
  const fg2 = dark ? 'rgba(255,255,255,0.5)' : V2_INK3;
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderRadius: 16, border: 0,
      background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
      cursor: onClick ? 'pointer' : 'default', textAlign: 'left',
      fontFamily: 'inherit',
    }}>
      {icon && (
        <span style={{
          width: 40, height: 40, borderRadius: 12,
          background: accent ? `${accent}15` : (dark ? 'rgba(255,255,255,0.06)' : V2_PAPER),
          color: accent || (dark ? '#fff' : V2_INK),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{icon}</span>
      )}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: fg }}>{label}</span>
        {sub && <span style={{ fontSize: 12, color: fg2, marginTop: 1 }}>{sub}</span>}
      </span>
      {typeof value === 'string' || typeof value === 'number' ? (
        <span style={{ fontSize: 13, color: fg2, fontWeight: 500 }}>{value}</span>
      ) : value}
    </button>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <div style={{
      padding: '8px 28px 12px', fontSize: 11, fontWeight: 700,
      color: dark ? 'rgba(255,255,255,0.4)' : V2_INK3,
      textTransform: 'uppercase', letterSpacing: 1.4,
    }}>{children}</div>
  );
}

function ToggleV2({ on, onChange, accent = V2_RED }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 999, border: 0, padding: 2, cursor: 'pointer',
      background: on ? accent : '#D6D8DD', position: 'relative',
      transition: 'background .18s', flexShrink: 0,
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20,
        borderRadius: '50%', background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)', transition: 'left .18s',
      }} />
    </button>
  );
}

// ── Pill / chip ──
function PillV2({ children, dark, on, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 999, border: 0, cursor: 'pointer',
      background: on ? (accent || V2_INK) : (dark ? 'rgba(255,255,255,0.08)' : V2_PAPER),
      color: on ? '#fff' : (dark ? '#fff' : V2_INK),
      fontFamily: 'inherit', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

// ── Big rounded "primary" CTA — flat, brand red ──
function PrimaryCTA({ children, onClick, full = true, style, dark }) {
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto', height: 56, padding: '0 28px',
      borderRadius: 18, border: 0, cursor: 'pointer',
      background: V2_RED, color: '#fff',
      fontFamily: 'inherit', fontWeight: 700, fontSize: 16,
      boxShadow: dark ? 'none' : '0 8px 22px rgba(236,37,68,0.32)',
      ...style,
    }}>{children}</button>
  );
}

// ── New Pod illustration: more abstract, brand-aligned ──
function PodV2({ size = 110, accent, faded }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 110 120" style={{ filter: faded ? 'grayscale(0.4) opacity(0.6)' : 'none' }}>
      <defs>
        <radialGradient id={`pod-${accent ? 'a' : 'b'}`} cx="0.4" cy="0.3">
          <stop offset="0%" stopColor="#5a5a5a"/>
          <stop offset="55%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#000"/>
        </radialGradient>
      </defs>
      {/* arms */}
      <rect x="20" y="6" width="4" height="20" rx="2" fill="#1a1a1a"/>
      <rect x="86" y="6" width="4" height="20" rx="2" fill="#1a1a1a"/>
      <path d="M22 8 Q55 -2 88 8" stroke="#1a1a1a" strokeWidth="3.5" fill="none"/>
      {/* head */}
      <rect x="14" y="22" width="82" height="62" rx="14" fill={`url(#pod-${accent ? 'a' : 'b'})`}/>
      {accent && <rect x="14" y="46" width="82" height="2" fill={V2_RED}/>}
      {/* lens */}
      <circle cx="55" cy="55" r="16" fill="#0a0a0a"/>
      <circle cx="55" cy="55" r="12" fill="#000" stroke="#2c2c2c" strokeWidth="1.5"/>
      <circle cx="51" cy="51" r="3" fill="#444"/>
      {/* base */}
      <rect x="18" y="84" width="74" height="22" rx="10" fill="url(#pod-b)"/>
      <rect x="22" y="100" width="66" height="6" rx="3" fill="#0a0a0a"/>
    </svg>
  );
}

function Chev({ color = '#B5B7C2', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5 2l5 5-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Object.assign(window, {
  V2_INK, V2_INK2, V2_INK3, V2_INK4, V2_LINE, V2_PAPER,
  V2_RED, V2_RED_BR, V2_BLUE, V2_PURPLE, V2_AMBER, V2_TEAL,
  V2_GRAD_HERO, V2_GRAD_RED, V2_GRAD_RED_FLAT,
  PhoneV2, StatusV2, BigHeader, CardRow, SectionTitle, ToggleV2, PillV2, PrimaryCTA, PodV2, Chev,
});
