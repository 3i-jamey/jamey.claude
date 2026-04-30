// Pivo settings icons — drawn inline so we can color them with currentColor.

function IconPerson({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconLock({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="15.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}
function IconCloud({ size = 22, accent }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 18h11a4 4 0 00.6-7.95A6 6 0 007 9.5 4 4 0 007 18z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      {accent && <path d="M11 13v3M9.5 14.5l1.5-1.5 1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  );
}
function IconCloudUp({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 18h11a4 4 0 00.6-7.95A6 6 0 007 9.5 4 4 0 007 18z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 15v-4M10 13l2-2 2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCrown({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 8l3 9h12l3-9-5 3-4-6-4 6-5-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="3" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="21" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="5" r="1.2" fill="currentColor"/>
    </svg>
  );
}
function IconDevice({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 14a7 7 0 0114 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 14a4 4 0 018 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="14" r="1.4" fill="currentColor"/>
      <rect x="6" y="16" width="12" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function IconPivoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.4" fill="currentColor"/>
    </svg>
  );
}
function IconRefresh({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 11a8 8 0 0114-5l2-2v6h-6l2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 13a8 8 0 01-14 5l-2 2v-6h6l-2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconVideo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M17 10l4-2v8l-4-2v-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function IconAI({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 5h4M5 5v4M19 5h-4M19 5v4M5 19h4M5 19v-4M19 19h-4M19 19v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="0.8" fill="currentColor"/>
    </svg>
  );
}
function IconWifi({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 9c5-4 13-4 18 0M6 13c4-3 8-3 12 0M9 17c2-1.5 4-1.5 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="20" r="1.4" fill="currentColor"/>
    </svg>
  );
}
function IconHelp({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1.1" fill="currentColor"/>
    </svg>
  );
}
function IconPencil({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 20l4.5-1 11-11-3.5-3.5-11 11L4 20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M14 6.5l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconShield({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconDoc({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 3h8l5 5v13H6V3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 13h7M9 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconPlay({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.06)"/>
      <path d="M10 8l7 4-7 4V8z" fill={'#5A5B66'}/>
    </svg>
  );
}
function IconHamburger({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconCheck({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBattery({ size = 22, pct = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="8" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="20.5" y="11" width="1.5" height="3" rx="0.6" fill="currentColor"/>
      <rect x="3.5" y="9.5" width={14 * (pct/100)} height="6" rx="1" fill="currentColor"/>
    </svg>
  );
}

Object.assign(window, {
  IconPerson, IconLock, IconCloud, IconCloudUp, IconCrown, IconDevice, IconPivoMark,
  IconRefresh, IconVideo, IconAI, IconWifi, IconHelp, IconPencil, IconShield, IconDoc,
  IconPlay, IconHamburger, IconCheck, IconArrowRight, IconBattery,
});
