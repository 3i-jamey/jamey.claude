// V2 Screen — 나의 피보 (메인). Dark hero with active device + bento grid for everything else.

function ScreenMyPivoV2({ onNav, accent = V2_RED }) {
  const [frontCam, setFrontCam] = React.useState(false);

  return (
    <PhoneV2>
      {/* Dark hero band */}
      <div style={{
        background: V2_GRAD_HERO,
        color: '#fff',
        position: 'relative',
        paddingBottom: 88,
        flexShrink: 0,
      }}>
        {/* Decorative blob */}
        <div style={{
          position: 'absolute', top: -40, right: -60, width: 240, height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,37,68,0.45) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -40, width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(135,42,255,0.35) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />

        <StatusV2 dark />
        <BigHeader
          dark
          eyebrow="My pivo"
          title="안녕하세요,"
          sub="Jamey 님"
          onBack={() => onNav && onNav('back')}
          right={
            <button style={{
              width: 40, height: 40, borderRadius: 999, border: 0, cursor: 'pointer',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2"/>
                <path d="M12 6a6 6 0 016 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill="#fff"/>
              </svg>
            </button>
          }
        />
      </div>

      {/* Scroll body — overlaps hero */}
      <div style={{
        flex: 1, overflow: 'auto', background: V2_PAPER,
        marginTop: -68, borderRadius: '28px 28px 0 0',
        padding: '24px 16px 40px', position: 'relative', zIndex: 1,
      }}>
        {/* Active device card — overlaps */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: '18px 18px 16px',
          boxShadow: '0 12px 32px rgba(15,17,23,0.08)',
          display: 'flex', gap: 14, alignItems: 'center',
          marginBottom: 12,
        }}>
          <PodV2 size={84} accent />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: V2_TEAL,
                boxShadow: `0 0 0 3px ${V2_TEAL}30`,
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: V2_TEAL, letterSpacing: 0.4 }}>연결됨</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: V2_INK, marginTop: 4 }}>Pivo Plus</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, color: V2_INK3 }}>
              <span>🔋 78%</span>
              <span>📶 강함</span>
            </div>
          </div>
        </div>

        {/* Mini device chips */}
        <div style={{ display: 'flex', gap: 8, padding: '4px 2px 18px', overflowX: 'auto' }}>
          <MiniDevice name="Pivo Tour" off />
          <MiniDevice name="Studio Pod" off />
          <button style={{
            padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
            background: '#fff', border: `1.5px dashed ${V2_LINE}`,
            color: V2_INK2, fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
          }}>+ 기기 추가</button>
        </div>

        {/* 계정 — bento style 2-up */}
        <SectionTitle>Account</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <BentoTile
            onClick={() => onNav('account')}
            icon={<IconPerson />}
            tint={V2_RED}
            label="계정 관리"
            value="Jamey Jeong"
            sub="jamey.jeong@3i.ai"
          />
          <BentoTile
            onClick={() => onNav('password')}
            icon={<IconLock />}
            tint={V2_RED}
            label="비밀번호"
            value="변경하기"
            sub="마지막 변경 90일 전"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8, marginTop: 8 }}>
          <BentoTile
            big
            onClick={() => onNav('cloud-info')}
            icon={<IconCloud />}
            tint={V2_RED}
            label="피보 클라우드"
            value="0.01 / 3 GB"
            progress={0.3}
          />
          <BentoTile
            onClick={() => onNav('subscription')}
            tint={V2_PURPLE}
            icon={<IconCrown />}
            label="구독"
            value="Free"
            sub="업그레이드"
            highlight
          />
        </div>

        {/* App section as cards */}
        <SectionTitle>App</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(15,17,23,0.04)',
        }}>
          <CardRow icon={<IconDevice />} accent={V2_AMBER} label="내 기기 관리"
                   sub="3대 등록됨" value={<Chev color={V2_INK4} />}
                   onClick={() => onNav('devices')} />
          <CardRow icon={<IconRefresh />} accent={V2_AMBER} label="전면 카메라 사용"
                   sub="셀피 촬영시 자동 전환" value={<ToggleV2 on={frontCam} onChange={setFrontCam} />} />
          <CardRow icon={<IconVideo />} accent={V2_AMBER} label="해상도"
                   sub="4K · 30fps" value={<Chev color={V2_INK4} />} onClick={() => onNav('resolution')} />
          <CardRow icon={<IconAI />} accent={V2_AMBER} label="AI 말 감지"
                   sub="대화 자동 캡션" value={<Chev color={V2_INK4} />} onClick={() => onNav('ai')} />
          <CardRow icon={<IconWifi />} accent={V2_AMBER} label="네트워크 품질 테스트"
                   sub="Wi-Fi 신호 진단" value={<Chev color={V2_INK4} />} />
          <CardRow icon={<IconPivoMark />} accent={V2_AMBER} label="앱 버전"
                   sub="최신 버전" value={<span style={{ color: V2_INK3, fontSize: 12 }}>1.20.0</span>} />
        </div>

        {/* Help — quiet bottom */}
        <SectionTitle>Support</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(15,17,23,0.04)',
        }}>
          <CardRow icon={<IconHelp />} accent={V2_BLUE} label="고객지원" sub="FAQ · 이메일 문의" value={<Chev color={V2_INK4} />} />
          <CardRow icon={<IconPencil />} accent={V2_BLUE} label="문제 신고" value={<Chev color={V2_INK4} />} />
          <CardRow icon={<IconShield />} accent={V2_BLUE} label="개인정보 보호정책" value={<Chev color={V2_INK4} />} />
          <CardRow icon={<IconDoc />} accent={V2_BLUE} label="사용 약관" value={<Chev color={V2_INK4} />} />
        </div>

        <div style={{ height: 14 }} />
        <button style={{
          width: '100%', height: 52, borderRadius: 18, border: 0, cursor: 'pointer',
          background: '#fff', color: V2_INK2, fontFamily: 'inherit',
          fontWeight: 600, fontSize: 15,
          boxShadow: '0 1px 2px rgba(15,17,23,0.04)',
        }}>로그아웃</button>
      </div>
    </PhoneV2>
  );
}

function MiniDevice({ name, off }) {
  return (
    <div style={{
      flexShrink: 0, padding: '6px 10px 6px 6px', borderRadius: 999,
      background: '#fff', display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', background: '#0F1117',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PodV2 size={20} faded={off} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: V2_INK, whiteSpace: 'nowrap' }}>{name}</span>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: off ? '#C8C9CD' : V2_TEAL, marginRight: 2,
      }} />
    </div>
  );
}

function BentoTile({ icon, tint, label, value, sub, onClick, progress, highlight, big }) {
  return (
    <button onClick={onClick} style={{
      background: highlight
        ? 'linear-gradient(135deg, #FFF1F4 0%, #F4E6FF 100%)'
        : '#fff',
      borderRadius: 18, padding: '14px 16px', cursor: 'pointer',
      border: 0, textAlign: 'left', fontFamily: 'inherit',
      boxShadow: '0 1px 2px rgba(15,17,23,0.04)',
      display: 'flex', flexDirection: 'column', gap: 8, minHeight: big ? 110 : 92,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          width: 32, height: 32, borderRadius: 10,
          background: `${tint}15`, color: tint,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</span>
        <Chev color={V2_INK4} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: V2_INK3, fontWeight: 600, letterSpacing: 0.2 }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: V2_INK, marginTop: 2 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: V2_INK3, marginTop: 2 }}>{sub}</div>}
      </div>
      {progress != null && (
        <div style={{ width: '100%', height: 4, borderRadius: 2, background: '#EDEEF2', overflow: 'hidden' }}>
          <div style={{ width: `${progress * 100}%`, height: '100%', background: tint }} />
        </div>
      )}
    </button>
  );
}

Object.assign(window, { ScreenMyPivoV2, BentoTile });
