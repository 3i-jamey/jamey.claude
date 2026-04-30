// V2 — 내 기기 관리, 나의 구독

function ScreenDevicesV2({ onNav }) {
  return (
    <PhoneV2 dark>
      <StatusV2 dark />
      <BigHeader
        dark
        eyebrow="Devices"
        title="내 기기"
        sub="3대 등록 · 1대 연결됨"
        onBack={() => onNav('back')}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>

        {/* Active hero */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236,37,68,0.18) 0%, rgba(135,42,255,0.14) 100%)',
          borderRadius: 24, padding: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 160, height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,37,68,0.4) 0%, transparent 65%)',
            filter: 'blur(10px)',
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                background: 'rgba(2,228,142,0.15)', color: V2_TEAL,
                fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: V2_TEAL }} />
                LIVE · 연결됨
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginTop: 10, letterSpacing: -0.5 }}>Pivo Plus</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>SN · PVP-2024-0042</div>
            </div>
            <PodV2 size={92} accent />
          </div>

          {/* metric ring */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 18 }}>
            <MetricTile label="배터리" value="78%" color={V2_TEAL} dark />
            <MetricTile label="펌웨어" value="2.4.1" color="#fff" dark />
            <MetricTile label="신호" value="강함" color="#71B7FF" dark />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{
              flex: 1, padding: '12px', borderRadius: 14, border: 0, cursor: 'pointer',
              background: '#fff', color: V2_INK,
              fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
            }}>펌웨어 업데이트</button>
            <button style={{
              flex: 1, padding: '12px', borderRadius: 14, border: 0, cursor: 'pointer',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
            }}>연결 해제</button>
          </div>
        </div>

        <SectionTitle dark>저장된 기기</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SavedDeviceCard name="Pivo Tour" sub="스튜디오 · 어제 연결" />
          <SavedDeviceCard name="Pivo Max" sub="3일 전 연결" />
        </div>

        <button style={{
          width: '100%', marginTop: 12, padding: '16px', borderRadius: 18,
          background: 'transparent', border: '1.5px dashed rgba(255,255,255,0.25)',
          color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
          fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 18, fontWeight: 300 }}>+</span> 새 기기 페어링
        </button>
      </div>
    </PhoneV2>
  );
}

function MetricTile({ label, value, color, dark }) {
  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.08)' : V2_PAPER,
      borderRadius: 12, padding: '10px 12px',
    }}>
      <div style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.5)' : V2_INK3, fontWeight: 600, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function SavedDeviceCard({ name, sub }) {
  return (
    <div style={{
      padding: '14px 16px', borderRadius: 16,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PodV2 size={32} faded />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{name}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{sub}</div>
      </div>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>대기</span>
    </div>
  );
}

function ScreenSubscriptionV2({ onNav }) {
  const [plan, setPlan] = React.useState('premium');
  const [billing, setBilling] = React.useState('monthly');

  const plans = {
    free:    { name: 'Free',         price: 0,     priceY: 0,      features: ['3 GB 클라우드', 'HD 다운로드', '기본 트래킹'] },
    premium: { name: 'Premium',      price: 9900,  priceY: 99000,  features: ['50 GB 클라우드', '4K 무손실', 'AI 자동 편집', '광고 제거'], highlight: true },
    pro:     { name: 'Premium Pro',  price: 19900, priceY: 199000, features: ['500 GB 클라우드', '동시 4기기', 'RAW 영상', '팀 워크스페이스'] },
  };
  const cur = plans[plan];

  return (
    <PhoneV2>
      <StatusV2 />
      <BigHeader eyebrow="Membership" title="나의 구독" onBack={() => onNav('back')} />

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>

        {/* Hero comparison strip */}
        <div style={{
          background: V2_GRAD_RED, color: '#fff',
          borderRadius: 24, padding: '20px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 14px 30px rgba(236,37,68,0.28)',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -30, fontSize: 90, opacity: 0.15,
            fontWeight: 900,
          }}>♛</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, opacity: 0.85 }}>
            CURRENT PLAN
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 4, letterSpacing: -0.5 }}>Free</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Premium으로 업그레이드하고 50배 더 많은 저장 공간을 얻으세요</div>
        </div>

        {/* Billing toggle */}
        <div style={{
          marginTop: 18, padding: 4, borderRadius: 999, background: V2_PAPER,
          display: 'flex', position: 'relative',
        }}>
          {[
            { id: 'monthly', label: '월간' },
            { id: 'yearly',  label: '연간 (-17%)' },
          ].map(b => (
            <button key={b.id} onClick={() => setBilling(b.id)} style={{
              flex: 1, padding: '10px', borderRadius: 999, border: 0, cursor: 'pointer',
              background: billing === b.id ? '#fff' : 'transparent',
              color: billing === b.id ? V2_INK : V2_INK3,
              fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
              boxShadow: billing === b.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}>{b.label}</button>
          ))}
        </div>

        <SectionTitle>플랜 선택</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(plans).map(([id, p]) => (
            <PlanCardV2
              key={id} id={id} plan={p}
              selected={plan === id}
              onSelect={() => setPlan(id)}
              billing={billing}
            />
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryCTA>
            {plan === 'free' ? '현재 플랜 유지' : `${cur.name} 시작하기 · 7일 무료`}
          </PrimaryCTA>
        </div>

        <p style={{
          margin: '14px 4px 0', fontSize: 11, color: V2_INK3, textAlign: 'center', lineHeight: 1.6,
        }}>
          7일 무료 체험 · 언제든 해지 가능 · 첫 결제 24시간 전까지 해지 시 비용 청구되지 않음
        </p>
      </div>
    </PhoneV2>
  );
}

function PlanCardV2({ id, plan, selected, onSelect, billing }) {
  const price = billing === 'yearly' ? Math.round(plan.priceY / 12) : plan.price;
  return (
    <button onClick={onSelect} style={{
      background: selected && plan.highlight
        ? 'linear-gradient(135deg, #FFF1F4 0%, #F4E6FF 100%)'
        : '#fff',
      borderRadius: 18, padding: '16px 18px', cursor: 'pointer',
      border: selected ? `2px solid ${V2_RED}` : `1px solid ${V2_LINE}`,
      textAlign: 'left', position: 'relative', fontFamily: 'inherit',
    }}>
      {plan.highlight && (
        <span style={{
          position: 'absolute', top: -10, right: 16,
          background: V2_GRAD_RED_FLAT, color: '#fff',
          padding: '4px 10px', borderRadius: 999,
          fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
        }}>BEST</span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            border: `2px solid ${selected ? V2_RED : V2_LINE}`,
            background: selected ? V2_RED : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>{selected && <IconCheck size={12} />}</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: V2_INK }}>{plan.name}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: V2_INK }}>
            {price === 0 ? '무료' : `₩${price.toLocaleString()}`}
          </span>
          {price > 0 && <span style={{ fontSize: 11, color: V2_INK3, fontWeight: 500 }}> /월</span>}
        </div>
      </div>
      <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px 12px' }}>
        {plan.features.map(f => (
          <li key={f} style={{
            display: 'flex', gap: 5, fontSize: 12, color: V2_INK2, alignItems: 'center', fontWeight: 500,
          }}>
            <span style={{ color: plan.highlight ? V2_RED : V2_TEAL, display: 'inline-flex' }}>
              <IconCheck size={12} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </button>
  );
}

Object.assign(window, { ScreenDevicesV2, ScreenSubscriptionV2 });
