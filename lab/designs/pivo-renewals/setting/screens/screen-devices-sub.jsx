// Screens: 내 기기 관리, 나의 구독 (Free / Premium 비교)

function ScreenDevices({ onNav }) {
  const [active, setActive] = React.useState(0);
  return (
    <Phone>
      <StatusBar />
      <NavBar title="내 기기 관리" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', background: PIVO_BG, padding: '20px 16px 32px' }}>

        {/* Hero device */}
        <div style={{
          background: '#fff', borderRadius: 18, padding: '24px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 16,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: PIVO_RED, letterSpacing: 0.5 }}>● 연결됨</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: PIVO_INK, marginTop: 2 }}>Pivo Plus</div>
              <div style={{ fontSize: 12, color: PIVO_INK3, marginTop: 2 }}>SN · PVP-2024-0042</div>
            </div>
            <div style={{ width: 88 }}>
              <PivoPod accent />
            </div>
          </div>

          {/* stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <Stat label="배터리" value="78%" color={TEAL} />
            <Stat label="펌웨어" value="2.4.1" color={PIVO_INK} />
            <Stat label="신호" value="강함" color={PLUS_BLUE} />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <ActionPill icon="↻" label="펌웨어 업데이트" />
            <ActionPill icon="✕" label="연결 해제" danger />
          </div>
        </div>

        {/* Saved devices list */}
        <SectionLabel>저장된 기기</SectionLabel>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
          <DeviceRow name="Pivo Tour (스튜디오)" sub="마지막 연결 · 어제" connected={false} />
          <DeviceRow name="Pivo Max" sub="마지막 연결 · 3일 전" connected={false} last />
        </div>

        {/* Add */}
        <div style={{ marginTop: 16 }}>
          <button style={{
            width: '100%', height: 52, borderRadius: 14,
            background: '#fff', border: `1.5px dashed ${PIVO_LINE}`,
            cursor: 'pointer', color: PIVO_INK2,
            fontFamily: 'Caros Soft, system-ui', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 18, fontWeight: 300 }}>+</span> 새 기기 페어링
          </button>
        </div>
      </div>
    </Phone>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      background: PIVO_BG, borderRadius: 10, padding: '10px 12px',
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <span style={{ fontSize: 11, color: PIVO_INK3, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}

function ActionPill({ icon, label, danger }) {
  return (
    <button style={{
      flex: 1, height: 38, borderRadius: 999, border: 0, cursor: 'pointer',
      background: danger ? PIVO_RED_50 : '#EDF1FE',
      color: danger ? PIVO_RED : PLUS_BLUE,
      fontFamily: 'Caros Soft, system-ui', fontWeight: 700, fontSize: 13,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>{label}
    </button>
  );
}

function DeviceRow({ name, sub, connected, last }) {
  return (
    <div style={{
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: last ? 'none' : `1px solid ${PIVO_LINE_SOFT}`,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: '#F4F4F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: PIVO_INK2,
      }}><IconDevice size={22} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: PIVO_INK }}>{name}</div>
        <div style={{ fontSize: 11, color: PIVO_INK3 }}>{sub}</div>
      </div>
      <span style={{
        fontSize: 11, fontWeight: 600,
        color: connected ? TEAL : PIVO_INK3,
      }}>{connected ? '연결됨' : '대기'}</span>
    </div>
  );
}

// ── 나의 구독 ──
function ScreenSubscription({ onNav }) {
  const [plan, setPlan] = React.useState('premium');
  return (
    <Phone>
      <StatusBar />
      <NavBar title="나의 구독" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', background: PIVO_BG, padding: '20px 16px 32px' }}>

        {/* Current plan */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '18px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, color: PIVO_INK3, fontWeight: 500 }}>현재 플랜</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PIVO_INK, marginTop: 2 }}>Free</div>
            <div style={{ fontSize: 12, color: PIVO_INK2, marginTop: 4 }}>2026.04.29 가입</div>
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #EAEAEB 0%, #C8C9CD 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}><IconCrown size={28} /></div>
        </div>

        <SectionLabel>플랜 변경</SectionLabel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PlanCard
            tier="Free"
            price="0"
            current
            features={['3 GB 클라우드 저장', 'HD 영상 다운로드', '기본 트래킹']}
            selected={plan === 'free'}
            onSelect={() => setPlan('free')}
          />
          <PlanCard
            tier="Premium"
            price="9,900"
            highlight
            features={['50 GB 클라우드 저장', '4K 무손실 다운로드', 'AI 자동 편집', '광고 제거', '우선 고객 지원']}
            selected={plan === 'premium'}
            onSelect={() => setPlan('premium')}
            badge="추천"
          />
          <PlanCard
            tier="Premium Pro"
            price="19,900"
            features={['500 GB 클라우드', '동시 4기기 연결', 'RAW 영상', '팀 워크스페이스']}
            selected={plan === 'pro'}
            onSelect={() => setPlan('pro')}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <GradButton disabled={plan === 'free'}>
            {plan === 'free' ? '현재 플랜 유지' : `${plan === 'premium' ? 'Premium' : 'Premium Pro'} 시작하기`}
          </GradButton>
        </div>

        <p style={{
          margin: '14px 4px 0', fontSize: 11, color: PIVO_INK3, textAlign: 'center',
          lineHeight: 1.6,
        }}>
          7일 무료 체험. 언제든 해지 가능.<br/>
          첫 결제 24시간 전까지 해지 시 비용이 청구되지 않습니다.
        </p>
      </div>
    </Phone>
  );
}

function PlanCard({ tier, price, features, selected, onSelect, current, highlight, badge }) {
  return (
    <button onClick={onSelect} style={{
      background: highlight && selected
        ? 'linear-gradient(135deg, #FFF5F7 0%, #FFEFFF 100%)'
        : '#fff',
      borderRadius: 16, padding: '16px 18px', cursor: 'pointer',
      border: selected ? `2px solid ${PIVO_RED}` : `1px solid ${PIVO_LINE_SOFT}`,
      textAlign: 'left', position: 'relative',
      display: 'flex', flexDirection: 'column', gap: 10,
      fontFamily: 'Caros Soft, system-ui',
    }}>
      {badge && (
        <span style={{
          position: 'absolute', top: -10, right: 16,
          background: 'linear-gradient(90deg, #EC2544, #B97AE6)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '4px 10px', borderRadius: 999,
          letterSpacing: 0.4,
        }}>{badge}</span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: PIVO_INK }}>{tier}</span>
          {current && (
            <span style={{
              padding: '2px 8px', borderRadius: 999,
              background: '#EAEAEB', color: PIVO_INK2,
              fontSize: 10, fontWeight: 600,
            }}>현재</span>
          )}
        </div>
        <div>
          <span style={{ fontSize: 18, fontWeight: 700, color: PIVO_INK }}>₩{price}</span>
          <span style={{ fontSize: 12, color: PIVO_INK3, fontWeight: 500 }}>/월</span>
        </div>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {features.map(f => (
          <li key={f} style={{
            display: 'flex', gap: 8, fontSize: 13, color: PIVO_INK2, alignItems: 'center',
          }}>
            <span style={{ color: highlight ? PIVO_RED : TEAL, display: 'inline-flex' }}>
              <IconCheck size={14} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </button>
  );
}

Object.assign(window, { ScreenDevices, ScreenSubscription });
