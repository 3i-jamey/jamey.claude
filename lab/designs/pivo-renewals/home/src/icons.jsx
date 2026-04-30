/* Inline SVG icons — minimal, monoline */

const Icon = {
  home: (size = 22, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/>
    </svg>
  ),
  homeFill: (size = 22, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M11.3 3.4 3 10.3a1 1 0 0 0-.4.8V20a1 1 0 0 0 1 1h5v-6a2 2 0 0 1 4 0v6h6a1 1 0 0 0 1-1v-8.9a1 1 0 0 0-.4-.8L12.7 3.4a1 1 0 0 0-1.4 0Z"/>
    </svg>
  ),
  coach: (size = 22, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  plus: (size = 28, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  cam: (size = 22, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.2-1.6a2 2 0 0 1 1.6-.8h3.4a2 2 0 0 1 1.6.8L16.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <circle cx="12" cy="12.5" r="3.5"/>
    </svg>
  ),
  play: (size = 14, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M7 4.5v15a1 1 0 0 0 1.55.83l11.6-7.5a1 1 0 0 0 0-1.66l-11.6-7.5A1 1 0 0 0 7 4.5Z"/>
    </svg>
  ),
  search: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  bolt: (size = 16, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z"/>
    </svg>
  ),
  bell: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10a6 6 0 0 1 12 0v4l1.5 2.5h-15L6 14z"/><path d="M10 19a2 2 0 0 0 4 0"/>
    </svg>
  ),
  device: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="17" r="1.2" fill={color} stroke="none"/>
    </svg>
  ),
  arrowR: (size = 16, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  grid: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/>
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/>
    </svg>
  ),
  list: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  ),
  sparkle: (size = 16, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.5 13.6 9l6.4 1.6L13.6 12l-1.6 6.5L10.4 12 4 10.6 10.4 9z"/>
    </svg>
  ),
};

window.Icon = Icon;
