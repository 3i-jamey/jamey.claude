/* Striped placeholder thumbnails — represent video clips.
   Each tile gets a unique hue + label so they're distinguishable
   without being literal SVG drawings. */

function MediaTile({
  hue = 12,        // 0-360 — color seed
  label,           // optional mono caption ("CLIP_001")
  duration,        // optional "00:42"
  ratio = '1',     // css aspect-ratio
  radius = 14,
  dark = true,
  showStripes = true,
  showPlay = false,
  badge,           // top-left small chip
  intensity = 1,   // saturation multiplier
  style = {},
}) {
  const sat = 44 * intensity;
  const l1 = dark ? 56 : 84;
  const l2 = dark ? 68 : 93;
  const stripeFg = dark ? `hsla(${hue}, ${sat}%, ${l1+12}%, 0.40)` : `hsla(${hue}, ${sat}%, ${l1-4}%, 0.18)`;
  const bg = `linear-gradient(135deg, hsl(${hue} ${sat}% ${l1}%) 0%, hsl(${(hue+20)%360} ${sat-4}% ${l2}%) 100%)`;
  const stripeBg = showStripes
    ? `repeating-linear-gradient(135deg, transparent 0 14px, ${stripeFg} 14px 15px), ${bg}`
    : bg;

  return (
    <div style={{
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: 'hidden',
      background: stripeBg,
      boxShadow: dark
        ? 'inset 0 0 0 1px rgba(255,255,255,0.04)'
        : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {label && (
        <div style={{
          position: 'absolute', left: 8, bottom: 8,
          fontFamily: MONO, fontSize: 9, letterSpacing: 0.4,
          color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.6)',
          textTransform: 'uppercase',
        }}>{label}</div>
      )}
      {duration && (
        <div style={{
          position: 'absolute', right: 8, bottom: 8,
          padding: '2px 6px', borderRadius: 6,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          fontFamily: MONO, fontSize: 10, letterSpacing: 0.3,
          color: '#fff', fontWeight: 500,
        }}>{duration}</div>
      )}
      {badge && (
        <div style={{
          position: 'absolute', left: 8, top: 8,
          padding: '3px 7px', borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          fontFamily: MONO, fontSize: 9, letterSpacing: 0.4,
          color: '#fff', fontWeight: 500,
          textTransform: 'uppercase',
        }}>{badge}</div>
      )}
      {showPlay && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid', placeItems: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            display: 'grid', placeItems: 'center',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '11px solid #fff',
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              marginLeft: 3,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// Curated palette of hues so a row of tiles feels coherent.
// Slightly desaturated tones = "real" looking thumbnails.
const HUES = [12, 28, 200, 158, 38, 220, 18, 96, 178, 312, 46, 8];

window.MediaTile = MediaTile;
window.HUES = HUES;
