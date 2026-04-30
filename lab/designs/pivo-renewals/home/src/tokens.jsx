/* Pivo Track design tokens — shared across variants
   Keep accent + neutrals consistent so canvas reads as one system. */

const PIVO = {
  // Reds — anchored on the screenshot's vivid coral-red
  red:        '#FF2E4D',
  redDeep:    '#E11733',
  redSoft:    '#FF4F6B',
  redGlow:    'rgba(255, 46, 77, 0.35)',
  // Neutrals
  ink:        '#0B0B0E',
  ink2:       '#15151A',
  ink3:       '#1E1E24',
  line:       'rgba(255,255,255,0.08)',
  line2:      'rgba(255,255,255,0.14)',
  white:      '#FFFFFF',
  dim:        'rgba(255,255,255,0.62)',
  dim2:       'rgba(255,255,255,0.42)',
  // Light surface (for one variant)
  paper:      '#F6F6F4',
  paperInk:   '#0B0B0E',
  paperDim:   'rgba(11,11,14,0.55)',
  paperLine:  'rgba(11,11,14,0.08)',
};

// Frame dims — every artboard is the same iPhone size
const FRAME_W = 390;
const FRAME_H = 844;

const FONT = `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;
const MONO = `'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

window.PIVO = PIVO;
window.FRAME_W = FRAME_W;
window.FRAME_H = FRAME_H;
window.FONT = FONT;
window.MONO = MONO;
