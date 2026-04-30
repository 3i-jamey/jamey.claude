/* App shell — Design Canvas with all 5 variants + Tweaks */

const { useState, useEffect } = React;

const TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#FF2E4D",
  "mode": "grid"
}/*EDITMODE-END*/;

const ACCENTS = [
  { id: 'red',     value: '#FF2E4D', label: 'Pivo Red' },
  { id: 'coral',   value: '#FF6A3D', label: 'Coral'    },
  { id: 'magenta', value: '#E91E63', label: 'Magenta'  },
  { id: 'electric',value: '#5B5BFF', label: 'Electric' },
  { id: 'lime',    value: '#B8E034', label: 'Lime'     },
];

function ArtboardWrap({ children }) {
  // Wrap each iPhone-style frame in our own bezel for consistency.
  return (
    <div style={{
      width: FRAME_W, height: FRAME_H,
      borderRadius: 48, overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 30px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
    }}>
      {children}
    </div>
  );
}

function App() {
  const [tw, setTw] = useTweaks(TWEAKS);
  const accent = tw.accent;
  const mode = tw.mode;

  const variants = [
    { id: 'v1', label: 'A · 현재 (기준점)',     comp: V1Current },
    { id: 'v2', label: 'B · Stories Feed',     comp: V2Stories },
    { id: 'v3', label: 'C · Bento',            comp: V3Bento   },
    { id: 'v4', label: 'D · Cinematic Hero',   comp: V4Hero    },
    { id: 'v5', label: 'E · Activity Feed',    comp: V5Feed    },
  ];

  return (
    <>
      <DesignCanvas
        title="Pivo Track · Home Renewal"
        subtitle="기존 갤러리 홈 → 모던한 5개 시안. 액센트와 그리드/리스트는 Tweaks로 조절"
      >
        <DCSection
          id="reference"
          title="Reference"
          subtitle="현재 홈 화면을 토큰화해서 재현 — 비교 기준점"
        >
          <DCArtboard id="v1" label={variants[0].label} width={FRAME_W} height={FRAME_H}>
            <ArtboardWrap><V1Current accent={accent} mode={mode}/></ArtboardWrap>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="proposals"
          title="Renewal proposals"
          subtitle="레이아웃 축으로 4가지 방향 — 영상 중심 / 대시보드 / 시네마틱 / 타임라인"
        >
          {variants.slice(1).map(v => (
            <DCArtboard key={v.id} id={v.id} label={v.label} width={FRAME_W} height={FRAME_H}>
              <ArtboardWrap>
                <v.comp accent={accent} mode={mode}/>
              </ArtboardWrap>
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {ACCENTS.map(a => (
              <div key={a.id}
                onClick={() => setTw('accent', a.value)}
                title={a.label}
                style={{
                  aspectRatio: '1',
                  borderRadius: 10,
                  background: a.value,
                  cursor: 'pointer',
                  outline: tw.accent === a.value ? '2px solid #fff' : '2px solid transparent',
                  outlineOffset: 2,
                  transition: 'outline-color 0.15s',
                }}
              />
            ))}
          </div>
          <TweakColor label="커스텀" value={tw.accent} onChange={v => setTw('accent', v)}/>
        </TweakSection>

        <TweakSection title="Layout">
          <TweakRadio
            label="그리드 / 리스트"
            value={tw.mode}
            options={[
              { value: 'grid', label: 'Grid' },
              { value: 'list', label: 'List' },
            ]}
            onChange={v => setTw('mode', v)}
          />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.4 }}>
            B(Stories Feed) 시안의 하단 영상 영역에 적용됩니다.
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function mount() {
  const el = document.getElementById('root');
  if (!el) { requestAnimationFrame(mount); return; }
  ReactDOM.createRoot(el).render(<App />);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
